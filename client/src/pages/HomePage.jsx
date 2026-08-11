import HeroSection from "../sections/home/HeroSection";
import AboutSection from "../sections/home/AboutSection";
import ProjectsSection from "../sections/home/ProjectsSection";
import SkillsSection from "../sections/home/SkillsSection";
import ExperienceSection from "../sections/home/ExperienceSection";
import ContactSection from "../sections/home/ContactSection";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </div>
  );
}

export default HomePage;