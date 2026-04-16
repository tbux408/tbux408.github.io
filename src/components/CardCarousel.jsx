import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CardCarousel = ({ cards, gapS = true }) => {
  const carouselRef = useRef(null);
  const cardRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setIsAtStart(scrollLeft <= 5);
        const isScrollable = scrollWidth > clientWidth;
        const atEnd = !isScrollable || scrollLeft + clientWidth >= scrollWidth - 1;
        setIsAtEnd(atEnd);
      }
    };

    const updateScrollMetrics = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;
        setIsAtStart(true);
        setIsAtEnd(scrollWidth <= clientWidth);
      }
    };

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("scroll", handleScroll);
    }

    setTimeout(updateScrollMetrics, 50);

    const observer = new ResizeObserver(() => updateScrollMetrics());
    if (carouselElement) observer.observe(carouselElement);

    const handleImageLoad = () => updateScrollMetrics();
    carouselElement?.querySelectorAll("img").forEach((img) => {
      img.addEventListener("load", handleImageLoad);
    });

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("scroll", handleScroll);
        carouselElement.querySelectorAll("img").forEach((img) => {
          img.removeEventListener("load", handleImageLoad);
        });
      }
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      const cardStyle = getComputedStyle(cardRef.current);
      const marginLeft = parseFloat(cardStyle.marginLeft);
      const marginRight = parseFloat(cardStyle.marginRight);
      const totalWidth = cardRef.current.offsetWidth + marginLeft + marginRight + 24;
      setCardWidth(totalWidth);
    }
  }, [cards]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <div
        className="scroll-none flex overflow-x-auto py-6"
        style={{
          paddingLeft: "clamp(1rem, 5vw, 4rem)",
          paddingRight: "clamp(1rem, 5vw, 4rem)",
          gap: gapS ? "1.5rem" : "0",
          scrollSnapType: "x mandatory",
        }}
        ref={carouselRef}
      >
        {cards.map((card, index) => (
          <div
            style={{ scrollSnapAlign: "center" }}
            key={index}
            ref={index === 0 ? cardRef : null}
          >
            {card}
          </div>
        ))}
      </div>

      {!isAtStart && !hidden && (
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#1e1e24cc] backdrop-blur-sm border border-line text-fg rounded-full p-1.5 cursor-pointer z-10 hover:bg-raised transition-colors"
          onClick={scrollLeft}
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {!isAtEnd && !hidden && (
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1e1e24cc] backdrop-blur-sm border border-line text-fg rounded-full p-1.5 cursor-pointer z-10 hover:bg-raised transition-colors"
          onClick={scrollRight}
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
};

export default CardCarousel;
