import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = ({ children }) => {
  const scrollManager = useRef(null);
  const location = useLocation();
  console.log(location.pathname);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      const appearElements = document.querySelectorAll(".appear");

      appearElements.forEach((element) => {
        gsap.from(element, {
          x: 60,

          y: 1,
          duration: 1.5,
          opacity: 0,
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scroller: scrollManager.current,
            toggleActions: "restart play restart none",
            // scrub: true,
            // markers: true,
          },
        });
      });
    }, 100); // Adjust the delay as needed

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [children, location.pathname]);

  return (
    <div
      ref={scrollManager}
      style={{
        width: "100%",
        minHeight:
          location.pathname === "/login" || location.pathname === "/new-profile"
            ? "100vh"
            : "calc(100vh - 82px)",
        overflowY: "auto",
        backgroundColor: "#eee",
        position: "relative",
        padding: "10px",
        maxHeight: "calc(100vh - 82px)",
      }}
    >
      {children}
    </div>
  );
};

export default Wrapper;
