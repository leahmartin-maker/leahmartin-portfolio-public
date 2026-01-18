import Image from "next/image";

// Example project data (replace with your own or import from a data file)
const projects = [
  {
    title: "Interactive Mural Map",
    description: "A web app for exploring public art locations with custom markers and galleries.",
    image: "/images/projects/Muralsproject.png",
    alt: "Screenshot of Interactive Mural Map",
    github: "https://github.com/leahmartin-maker/mural-map",
    demo: "https://leahmartin-maker-github-io.vercel.app/murals"
  },
];

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-sea-life">Projects</h1>
      <p className="mb-12 text-lg text-gray-700 max-w-2xl">A selection of my creative and technical work, blending art, code, and conservation. Click a project to learn more or view the code.</p>
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
  );
}
