import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Philosophy from './components/Philosophy';
import Education from './components/Education';
import GithubSection from './components/Github';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <TechStack />
        <Projects />
        <Experience />
        <Philosophy />
        <Education />
        <GithubSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
