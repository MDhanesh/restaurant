import "./style.css";
import img1 from "../Assets/Food.png";
import img2 from "../Assets/Take Away-pana.png";
import img3 from "../Assets/Eating together-amico.png";
import { useEffect, useState } from "react";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const img = [
    {
      src: img1,
      head: "WELCOME TO OUR RESTAURANT",
      p: "At [Restaurant Name], we are passionate about creating memorable dining experiences that tantalize your taste buds and delight your senses. Situated in the heart of [City Name], our restaurant offers a fusion of exquisite flavors, warm ambiance, and impeccable service, making it the perfect destination for casual gatherings, romantic dinners, and celebrations alike.",
    },
    {
      src: img2,
      head: "Private Dining and Events",
      p: "Planning a special event or gathering? Our restaurant offers private dining options tailored to your needs, whether it's an intimate dinner party, corporate luncheon, or wedding celebration. Let us create a customized menu and ambiance that will leave a lasting impression on you and your guests.",
    },
    {
      src: img3,
      head: "Beverage Selections",
      p: "Complement your meal with our carefully curated wine list featuring local and international varietals, handcrafted cocktails, and artisanal beers. Whether you're in the mood for a refreshing cocktail or a fine wine pairing, our knowledgeable staff will help you find the perfect libation to enhance your dining experience.",
    },
  ];
  //useeffect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Change '3' to the number of slides in your carousel
    }, 4000); // Change 3000 to your desired interval in milliseconds

    return () => {
      clearInterval(interval);
    };
  }, []);
  const goToSlide = (i) => {
    setCurrentIndex(i);
  };
  return (
    <div className="Hero_Start">
      <div className="Left_grid">
        <h1>{img[currentIndex]?.head}</h1>
        <p>{img[currentIndex]?.p}</p>
      </div>
      <div className="Right_Grid">
        <img src={img[currentIndex]?.src} alt="hero image" />
        <div className="controls">
          {img.map((_, i) => (
            <div
              key={i}
              className={`control-dot ${i === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
