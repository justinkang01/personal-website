import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PortfolioSection from './components/PortfolioSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import EasterEggTrigger from './components/EasterEggTrigger';
import { projects } from './data/projects';
import type { NavSection } from './types';

const NAV_SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Home' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export default function App() {
  return (
    <Box component="main">
      <Navbar sections={NAV_SECTIONS} />
      <section id="hero"><HeroSection ownerName="Justin Kang" tagline="Software engineer. Keyboard enthusiast. Home cook." /></section>
      <section id="portfolio"><PortfolioSection projects={projects} /></section>
      <section id="about">
        <AboutSection
          bio="Hi, I'm Justin — a software engineer who loves building things, both in code and in the kitchen."
          interests={['Guitar', 'Volleyball', 'Mechanical Keyboards', 'Cooking']}
          avatarSrc="/images/avatar.jpg"
        />
      </section>
      <section id="contact">
        <ContactSection
          email="justinkang@example.com"
          profiles={[
            { label: 'GitHub', url: 'https://github.com/justinkang01', icon: null },
            { label: 'LinkedIn', url: 'https://linkedin.com/in/justinkang', icon: null },
          ]}
        />
      </section>
      <EasterEggTrigger />
    </Box>
  );
}
