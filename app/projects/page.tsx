import Image from "next/image";
import Navbar from "../components/Navbar";

// Example project data (replace with your own or import from a data file)
const projects = [
  {
    title: "Interactive Mural Map",
    description: "A web app for exploring public art locations with custom markers and galleries. Currently uses a static JSON file for map data, with plans to upgrade to a full API and database for dynamic updates—demonstrating my goal to become a full stack developer.",
    image: "/images/projects/Muralsproject.png",
    alt: "Screenshot of Interactive Mural Map",
    github: "https://github.com/leahmartin-maker/leahmartin-portfolio-public/blob/main/public/murals.json",
    demo: "https://leahmartin-portfolio-public.vercel.app/murals"
  },
  // --- PLACEHOLDER PROJECTS BELOW ---
  {
    title: "Sea Turtle Migration-Coming Soon", // Edit this title
    description:
      "Sea Turtle Migration is a 3D interactive experience where you choose between three different sea turtles and swim through the ocean to reach their nesting sites. Along the journey, you’ll learn about each species’ predators, environment, migration routes, and real-world data. All 3D assets and environments are custom-built in Blender. This project is in development, with a focus on educational storytelling and conservation.", // Edit this description
    image: "/images/blenderproject.png", // Replace with your image path
    alt: "Sea Turtle Migration project screenshot", // Edit alt text for accessibility
    github: "https://github.com/leahmartin-maker/leahmartin-portfolio-public/blob/main/app/turtle-explorer/page.tsx", // Replace with your repo or file link
    
  },
  {
    title: "Personal Portfolio Website", // Edit this title
    description: "A custom-built portfolio website showcasing my art, coding projects, and conservation work. Built with Next.js and React, it features responsive design, accessible navigation, and dynamic project listings. This site demonstrates my skills in frontend development, accessibility, and deployment, and serves as a central hub for my creative and technical journey", // Edit this description
    image: "/images/Screenshotmainsite.png", // Replace with your image path
    alt: "Personal Portfolio Website screenshot", // Edit alt text for accessibility
    github: "https://github.com/leahmartin-maker/leahmartin-portfolio-public", // Replace with your repo or file link
    demo: "https://leahmartin-portfolio-public.vercel.app/" // Replace with your demo link
  },
];

export default function ProjectsPage() {
  // Calculate days since January 2, 2026
  const codingStartDate = new Date('2026-01-02');
  const today = new Date();
  // Calculate difference in milliseconds, then convert to days
  const daysSinceStart = Math.floor((today.getTime() - codingStartDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8 text-sea-life">Projects</h1>
        <div className="mb-4 flex items-center gap-3">
          <span className="text-lg font-semibold text-sea-life" aria-label={`Day ${daysSinceStart} of my Coding Journey`}>
            Day <span className="text-coral font-bold">{daysSinceStart}</span> of my Coding Journey
          </span>
          {/* Real World Context: This counter shows your rapid progress to other developers and recruiters. */}
        </div>
        <p className="mb-12 text-lg text-gray-700 max-w-2xl">
          A selection of my creative and technical work, blending art, code, and conservation. Click a project to learn more or view the code.
        </p>
        <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <article key={idx} className="bg-white rounded-lg shadow-lg border-l-4 border-coral flex flex-col h-full" aria-label={project.title}>
              <div className="relative w-full h-48 rounded-t-lg overflow-hidden">
                <Image src={project.image} alt={project.alt} fill className="object-cover" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-2xl font-bold text-coral mb-2">{project.title}</h2>
                <p className="text-gray-700 mb-4 flex-1">{project.description}</p>
                <div className="flex gap-4 mt-auto">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="bg-coral text-white px-4 py-2 rounded font-semibold hover:bg-coral/90 transition-colors" aria-label={`View demo of ${project.title}`}>Demo</a>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-sea-life text-white px-4 py-2 rounded font-semibold hover:bg-sea-life/90 transition-colors" aria-label={`View code for ${project.title}`}>Code</a>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  )
}

