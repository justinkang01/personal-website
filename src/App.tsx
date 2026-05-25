import { Box } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
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
      <section id="hero">
        <HeroSection
          ownerName="Justin Kang"
          tagline="Software engineer. Keyboard enthusiast. Home cook."
        />
      </section>
      <section id="about">
        <AboutSection
          bio="Hi, I'm Justin! I'm a software engineer who loves building things, both in code and in the kitchen."
          desc="Currently at Amazon Ads, I build large-scale distributed systems that process billions of events. From building data pipelines on Spark with AWS EMR to full-stack advertising features, I've interacted with the full cohort of software engineering skills. I've also led platform expansions to international markets, cut infrastructure costs by over $1M/year, and shipped an AI-powered knowledge base that made onboarding dramatically faster. I care about systems that are reliable, observable, and built to scale."
          avatarSrc="/images/avatar.jpg"
        />
      </section>
      <section id="portfolio" style={{ scrollMarginTop: '64px' }}>
        <PortfolioSection projects={projects} />
      </section>
      <section id="contact">
        <ContactSection
          email="justinkang01@gmail.com"
          profiles={[
            { label: 'GitHub', url: 'https://github.com/justinkang01', icon: <GitHubIcon /> },
            {
              label: 'LinkedIn',
              url: 'https://linkedin.com/in/justin-joonha-kang',
              icon: <LinkedInIcon />,
            },
          ]}
        />
      </section>
      <EasterEggTrigger />
    </Box>
  );
}
