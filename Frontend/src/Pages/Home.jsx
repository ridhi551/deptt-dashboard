import { HeroHighlightDemo } from "../components/HeroHighlightDemo";
import { LayoutGridDemo } from "../components/LayoutGridDemo";
import ContactUS from "../components/ContactUS";
import { InfiniteMovingCardsDemo } from "../components/Testimonials";
const Home = () => {
  return (
    <div>
      <div>
        <HeroHighlightDemo />
      </div>
      <div id="about">
        <LayoutGridDemo />
      </div>
      <div
        id="testimonials"
        className="py-10 lg:py-20 max-w-7xl mx-auto w-full"
      >
        <h1 className="text-lg lg:text-2xl font-bold">Testimonials</h1>
        <InfiniteMovingCardsDemo />
      </div>
      <div id="contact">
        <ContactUS />
      </div>
    </div>
  );
};

export default Home;
