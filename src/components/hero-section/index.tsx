import HeroSection3dScene from "./components/threejs-scene"

export default function HeroSection() {
  return (
    <section className="flex gap-4 w-screen h-screen">
      <div className="flex-1">
        <HeroSection3dScene />
      </div>
      <div className="flex-1 flex flex-col justify-center items-start">
        <h1 className="text-5xl leading-loose mb-12">Hi, I am <span className="text-6xl font-bold text-orange-300">Brahim SADIK</span></h1>
        <p className="text-3xl leading-relaxed pr-4 mb-12">I am a Fullstack Web Developer With a Passion For Creating Beautiful and Interactive Web Applications.</p>
        <a href="#projects" className="border text-xl border-orange-300 px-12 py-2 rounded-sm font-bold text-orange-300 hover:bg-orange-300 hover:text-blue-950 transition-all hover:transition-all">See My Work</a>
      </div>
    </section>
  );
}
