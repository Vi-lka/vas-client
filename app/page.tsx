import About from "./(main-page-blocks)/About";
import AboutBento from "./(main-page-blocks)/AboutBento";
import Directions from "./(main-page-blocks)/Directions";
import Hero from "./(main-page-blocks)/Hero";
import Materials from "./(main-page-blocks)/Materials";
import Place from "./(main-page-blocks)/Place";
import Programm from "./(main-page-blocks)/Programm";

export default function Home() {

  return (
    <main className="flex min-h-screen max-w-screen-xl mx-auto flex-col items-center justify-between">
      <Hero />
      <About />
      <AboutBento />
      <Directions />
      <Programm />
      <Place />
      <Materials />
    </main>
  );
}
