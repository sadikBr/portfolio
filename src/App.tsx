import Header from './components/header/index.tsx';
import HeroSection from './components/hero-section/index.tsx';
import AboutSection from './components/about-section/index.tsx';
import ExperiencesSection from './components/experiences-section/index.tsx';
import ProjectsSection from './components/projects-section/index.tsx';
import ContactSection from './components/contact-section/index.tsx';
import Footer from './components/footer/index.tsx';

function Portfolio() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default Portfolio;
