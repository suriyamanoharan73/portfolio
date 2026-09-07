import smtplib
import ssl
import os
import html
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from pydantic import BaseModel, EmailStr, field_validator
from pydantic import StringConstraints
from typing import Annotated
from dotenv import load_dotenv

load_dotenv()

# ── Rate limiter ───────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── CORS ───────────────────────────────────────────────────────
_origins_env = os.getenv("ALLOWED_ORIGINS", "")
_extra = [o.strip() for o in _origins_env.split(",") if o.strip()]
ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    *_extra,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

# ── SMTP config ────────────────────────────────────────────────
SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", SMTP_EMAIL)


# ── Request model with length limits ──────────────────────────
class ContactForm(BaseModel):
    name:    Annotated[str, StringConstraints(min_length=1, max_length=100)]
    email:   EmailStr
    subject: Annotated[str, StringConstraints(min_length=1, max_length=150)]
    message: Annotated[str, StringConstraints(min_length=20, max_length=5000)]

    # Strip header-injection characters from fields that go into email headers
    @field_validator("name", "subject", mode="before")
    @classmethod
    def strip_newlines(cls, v: str) -> str:
        return v.replace("\r", "").replace("\n", " ").strip()

    @field_validator("message", mode="before")
    @classmethod
    def strip_message(cls, v: str) -> str:
        return v.strip()


def build_html_email(name: str, sender_email: str, subject: str, message: str) -> str:
    # Escape user content before embedding in HTML
    safe_name    = html.escape(name)
    safe_email   = html.escape(sender_email)
    safe_subject = html.escape(subject)
    safe_message = html.escape(message)

    return f"""<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f8; margin: 0; padding: 24px; }}
    .card {{ background: #fff; border-radius: 12px; max-width: 560px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }}
    .header {{ background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 32px 36px; }}
    .header h1 {{ color: #fff; margin: 0; font-size: 20px; font-weight: 700; }}
    .header p {{ color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px; }}
    .body {{ padding: 32px 36px; }}
    .field {{ margin-bottom: 20px; }}
    .label {{ font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #9ca3af; margin-bottom: 4px; }}
    .value {{ font-size: 15px; color: #111827; }}
    .message-box {{ background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap; }}
    .footer {{ padding: 20px 36px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Portfolio Message</h1>
      <p>Someone reached out via your portfolio contact form</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">From</div>
        <div class="value">{safe_name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:{safe_email}" style="color:#4f46e5;text-decoration:none;">{safe_email}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">{safe_subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">{safe_message}</div>
      </div>
    </div>
    <div class="footer">
      Sent from suriyaM portfolio &middot; Reply directly to {safe_email}
    </div>
  </div>
</body>
</html>"""


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact")
@limiter.limit("5/hour")
def contact(request: Request, form: ContactForm):
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        raise HTTPException(status_code=500, detail="Email service not configured")

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio] {form.subject}"
        msg["From"]    = SMTP_EMAIL
        msg["To"]      = RECIPIENT_EMAIL
        msg["Reply-To"] = str(form.email)

        plain = f"From: {form.name} <{form.email}>\nSubject: {form.subject}\n\n{form.message}"
        msg.attach(MIMEText(plain, "plain"))
        msg.attach(MIMEText(build_html_email(form.name, str(form.email), form.subject, form.message), "html"))

        context = ssl.create_default_context()
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.ehlo()
            server.starttls(context=context)
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.sendmail(SMTP_EMAIL, RECIPIENT_EMAIL, msg.as_string())

        return {"success": True, "message": "Email sent successfully"}

    except smtplib.SMTPAuthenticationError:
        raise HTTPException(status_code=500, detail="SMTP authentication failed. Check your email and app password.")
    except smtplib.SMTPException as e:
        raise HTTPException(status_code=500, detail=f"SMTP error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
