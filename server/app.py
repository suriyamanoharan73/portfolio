import smtplib
import ssl
import os
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
    ],
    allow_methods=["POST", "GET"],
    allow_headers=["Content-Type"],
)

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", SMTP_EMAIL)


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


def build_html_email(name: str, sender_email: str, subject: str, message: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f8; margin: 0; padding: 24px; }}
        .card {{ background: #ffffff; border-radius: 12px; max-width: 560px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }}
        .header {{ background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%); padding: 32px 36px; }}
        .header h1 {{ color: #fff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.3px; }}
        .header p {{ color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px; }}
        .body {{ padding: 32px 36px; }}
        .field {{ margin-bottom: 20px; }}
        .label {{ font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: #9ca3af; margin-bottom: 4px; }}
        .value {{ font-size: 15px; color: #111827; }}
        .message-box {{ background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 4px; font-size: 15px; color: #374151; line-height: 1.6; white-space: pre-wrap; }}
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
            <div class="value">{name}</div>
          </div>
          <div class="field">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:{sender_email}" style="color:#4f46e5;text-decoration:none;">{sender_email}</a></div>
          </div>
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">{subject}</div>
          </div>
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">{message}</div>
          </div>
        </div>
        <div class="footer">
          Sent from suriyaM portfolio · Reply directly to {sender_email}
        </div>
      </div>
    </body>
    </html>
    """


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/contact")
def contact(form: ContactForm):
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        raise HTTPException(status_code=500, detail="Email service not configured")

    name = form.name.strip()
    sender_email = form.email
    subject = form.subject.strip()
    message = form.message.strip()

    if not all([name, subject, message]):
        raise HTTPException(status_code=400, detail="All fields are required")

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"[Portfolio] {subject}"
        msg["From"] = SMTP_EMAIL
        msg["To"] = RECIPIENT_EMAIL
        msg["Reply-To"] = sender_email

        msg.attach(MIMEText(f"From: {name} <{sender_email}>\nSubject: {subject}\n\n{message}", "plain"))
        msg.attach(MIMEText(build_html_email(name, sender_email, subject, message), "html"))

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
