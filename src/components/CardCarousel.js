import React, { useRef, useState, useEffect } from "react";
import styles from "../styles/CardCarousel.module.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CardCarousel = ({ cards }) => {
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

        // Check if at the end
        const isAtEnd =
          !isScrollable || scrollLeft + clientWidth >= scrollWidth - 1;
        setIsAtEnd(isAtEnd);
      }
    };

    const updateScrollMetrics = () => {
      if (carouselRef.current) {
        const { scrollWidth, clientWidth } = carouselRef.current;

        console.log("Updated scroll metrics:", { scrollWidth, clientWidth });
        setIsAtStart(true); // Reset to initial state
        setIsAtEnd(scrollWidth <= clientWidth);
      }
    };

    const getScrollBarWidth = () => {
      if (carouselRef.current) {
        const { offsetWidth, clientWidth } = carouselRef.current;
        return offsetWidth - clientWidth;
      }
      return 0;
    };

    const handleResize = () => {
      updateScrollMetrics();
      console.log("Scrollbar width:", getScrollBarWidth());
    };

    // Attach scroll event listener
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener("scroll", handleScroll);
    }

    // Force initial metrics update
    setTimeout(updateScrollMetrics, 50); // Delay ensures layout is stabilized

    // Observe resizing for dynamic content changes
    const observer = new ResizeObserver(handleResize);
    if (carouselElement) {
      observer.observe(carouselElement);
    }

    // Listen for image load events to recalculate dimensions
    const handleImageLoad = () => updateScrollMetrics();
    carouselElement?.querySelectorAll("img").forEach((img) => {
      img.addEventListener("load", handleImageLoad);
    });

    // Initial log for scrollbar size
    console.log("Initial scrollbar width:", getScrollBarWidth());

    // Cleanup
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

      // Total width including margins
      const totalWidth = cardRef.current.offsetWidth + marginLeft + marginRight;
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
      className={styles["carousel-container"]}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
    >
      <div className={styles["carousel"]} ref={carouselRef}>
        {cards.map((card, index) => (
          <div
            className={styles["card"]}
            key={index}
            ref={index === 0 ? cardRef : null}
          >
            {card}
          </div>
        ))}
      </div>
      {!isAtStart && !hidden && (
        <ChevronLeftIcon
          className={`${styles["scroll-button"]} ${styles["left"]}`}
          onClick={scrollLeft}
        />
      )}
      {!isAtEnd && !hidden && (
        <ChevronRightIcon
          className={`${styles["scroll-button"]} ${styles["right"]}`}
          onClick={scrollRight}
        />
      )}
    </div>
  );
};

export default CardCarousel;
