import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import SkillsTeaser from "@/components/skills/SkillsTeaser";
import FeaturedProjects from "@/components/featuredProjects/FeaturedProjects";
import ShareIdea from "@/components/shareIdea/ShareIdea";
import Landing from "@/components/landing/Landing";

export function Home() {
  return (
    <>
      <Landing />
      <Hero />
      <About />
      <SkillsTeaser />
      <FeaturedProjects />
      <ShareIdea />
    </>
  );
}
