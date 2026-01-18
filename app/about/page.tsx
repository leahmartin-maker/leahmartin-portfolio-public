import Navbar from '../Navbar';
import Image from 'next/image';
import FloatingBubbles from '../components/FloatingBubbles';

export default function About() {
  return (
    <div className="min-h-screen bg-stucco">
      <Navbar />
      
      {/* Floating Bubbles Background Animation */}
      <FloatingBubbles />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-sea-life/70 via-sunset-yellow/30 to-coral/80 py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-sea-life mb-6 font-[family-name:var(--font-handwriting)]">
            From Canvas to Code
          </h1>
          <p className="text-gray-800 text-2xl leading-relaxed">
            I'm Leah — a self-taught muralist who fell in love with code. 
            I paint walls and build the web experiences to showcase them.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-16 space-y-16">
        
        {/* The Art Journey */}
        <section>
          <h2 className="text-4xl font-bold text-coral mb-6">The Art Journey</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              I taught myself to paint the same way I teach myself everything — through complete hyperfixation. 
              In 2018, I started spending hours upon hours per day watching YouTube videos and practicing. 
              By 2020, I was fully immersed in painting.
            </p>
            <p>
              In April 2021, I quit my day job as a server at Hardknocks and put my first painting in a gallery. 
              <strong> It sold in less than 6 hours.</strong> The gallery owner's reaction was eye-opening — 
              this wasn't just a hobby anymore.
            </p>
            <p>
              I kept telling everyone I knew that I wanted to paint murals. Giant works of art were my passion. 
              Through word of mouth, I landed my first client, and boom — 
              <strong> my first mural on Dyna Street was born.</strong>
            </p>
            <p>
              That first mural changed everything. I went on to paint for city halls, police departments, 
              schools, and community centers — including the aquatic center mural used for Earth Day awareness. 
              My work has been featured on KIII news multiple times. Word of mouth became my business model, 
              and still is today.
            </p>
          </div>
        </section>

        {/* The Plot Twist */}
        <section className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-sea-life">
          <h2 className="text-4xl font-bold text-sea-life mb-6">The Plot Twist</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              In October 2025, I decided to enter the tech field. I completed Google's IT Support Professional 
              Certificate by January 2026, then immediately started learning to code.
            </p>
            <p>
              I wanted a way to use my artistic side in tech, but I had no idea what was possible. 
              Now I'm obsessed with everything you can build — interactive maps, animations, 
              augmented reality overlays on physical murals.
            </p>
            <p>
              <strong>Here's the honest part:</strong> I'm learning with AI assistance, and I know some people 
              have opinions about that. But here's what I also know — I didn't have formal art training either, 
              and I became an artist. I build things that work, they're beautiful, and I can explain every piece 
              of this site. 
            </p>
            <p>
              With enough time and practice, I can do or be anything I set my mind to. 
              That's how I approached art, and that's how I'm approaching code.
            </p>
          </div>
        </section>

        {/* What Drives Me */}
        <section>
          <h2 className="text-4xl font-bold text-sunset-yellow mb-6">What Drives Me Now</h2>
          <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
            <p>
              I'm not interested in static images or just decorating pages. I want to <strong>create things 
              people can interact with.</strong> Things that surprise them, teach them, or make them care 
              about something they didn't care about before.
            </p>
            <p>
              I love sea turtles. I want cleaner oceans. I want to help solve Corpus Christi's water problems. 
              I want to raise money for ocean conservation and research. And I believe technology — 
              done right — can make people care about these issues without them feeling like they're 
              being lectured.
            </p>
            <p>
              That's what social media figured out early on: if you make it user-friendly and engaging, 
              people will use it. I want to apply that thinking to environmental causes, to art accessibility, 
              to making tech feel less intimidating for people who think "coding isn't for them."
            </p>
          </div>
        </section>

        {/* Work Together */}
        <section className="bg-gradient-to-br from-sea-life/10 to-coral/10 p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-coral mb-6">Let's Work Together</h2>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              Serving the Coastal Bend area.
            </p>
            
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-coral">
              <h3 className="text-2xl font-bold text-coral mb-3">Commissions</h3>
              <p>
                I take on commissioned murals for businesses, residential projects, and public spaces. 
                Let's talk about bringing your vision to life on a large scale.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-sunset-yellow">
              <h3 className="text-2xl font-bold text-sunset-yellow mb-3">Non-Profit Program</h3>
              <p>
                <strong>I paint 4 free murals per year for non-profit organizations.</strong>
              </p>
              <p className="mt-2">
                If you have "use it or lose it" funds, I'll help you spend them. You tell me your budget, 
                and I'll create murals or interactive installations for your space. Any funds not directly 
                used for materials or travel get donated to a charitable organization within your field.
              </p>
              <p className="mt-2 text-coral font-semibold">
                This is how I give back while doing what I love.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center py-12">
          <h2 className="text-4xl font-bold text-sea-life mb-4">Ready to Create Something?</h2>
          <p className="text-gray-700 text-xl mb-8">
            Whether it's a mural, an interactive experience, or a wild idea you're not sure is possible — let's talk.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-coral hover:bg-coral/90 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg transition-all hover:scale-105"
          >
            Get In Touch
          </a>
        </section>

      </div>
    </div>
  );
}
