import Foodmenu from "./Foodmenu";
import Hero from "./Hero";

export default function Main({ setVal }) {
  return (
    <div>
      <Hero />
      <Foodmenu setVal={setVal} />
    </div>
  );
}
