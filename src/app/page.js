"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroCarousel from "./Components/CaurasalImage";
import NavigationBar from "./Components/Navbar"; // Updated import
import AboutPage2 from "./Components/AboutUs";
import HorizontalSlider from "./Components/HorizontalSlider";
import ProductPage from "./Components/autoRotation";
import MilkProcess from "./Components/MilkProcess";
import KeyMilestones from "./Components/keyMilleStone";
import Dispatch from "./Components/dispatch";
import ContactUs from "./Components/COntactUs";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pagesRef = useRef([]);
  const containerRef = useRef(null);
  const navbarRef = useRef(null);
  const mainTriggerRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);

  /* ------------------------------------------------------------------------
     BUTTON BASED PAGE SCROLL (NEW – stable logic)
  ------------------------------------------------------------------------ */

  const scrollToPage = (pageIndex) => {
    const trig = mainTriggerRef.current;
    const totalPages = pagesRef.current.length;

    if (!trig) return;

    const start = trig.start;
    const end = trig.end;

    const progress = pageIndex / (totalPages - 1);
    const target = start + progress * (end - start);

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  const goNextPage = () => {
    setCurrentPage((prev) => {
      const next = Math.min(prev + 1, pagesRef.current.length);
      scrollToPage(next - 1);
      return next;
    });
  };

  const goPrevPage = () => {
    setCurrentPage((prev) => {
      const next = Math.max(prev - 1, 1);
      scrollToPage(next - 1);
      return next;
    });
  };

  /* ------------------------------------------------------------------------
     INITIAL SETUP
  ------------------------------------------------------------------------ */
  useEffect(() => {
    pagesRef.current = pagesRef.current.slice(0, 9);
  }, []);

  /* ------------------------------------------------------------------------
     GSAP SCROLLTRIGGER SYSTEM
  ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!containerRef.current) return;

    const pages = pagesRef.current;

    /* ---------------- NAVBAR HIDE/SHOW (FIXED WORKING VERSION!) ---------------- */
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY) {
        // scrolling DOWN → hide navbar
        gsap.to(navbarRef.current, { y: -100, duration: 0.3 });
      } else {
        // scrolling UP → show navbar
        gsap.to(navbarRef.current, { y: 0, duration: 0.3 });
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);

    /* ---------------- GSAP INITIAL STATES ---------------- */
    gsap.set(pages, { opacity: 0, scale: 0.9, rotation: 45 });
    if (pages[0]) gsap.set(pages[0], { opacity: 1, scale: 1, rotation: 0 });

    for (let i = 1; i < pages.length; i++) {
      gsap.set(pages[i], { opacity: 0, y: "150%", rotation: -45 });
    }

    /* ---------------- MAIN PAGE TRANSITION ---------------- */
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${pages.length * 180}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,

      onUpdate: (self) => {
        const progress = self.progress;

        let activeIndex;
        if (progress < 0.12) activeIndex = 0;
        else if (progress < 0.25) activeIndex = 1;
        else if (progress < 0.40) activeIndex = 2;
        else if (progress < 0.50) activeIndex = 3;
        else if (progress < 0.60) activeIndex = 4;
        else if (progress < 0.70) activeIndex = 5;
        else if (progress < 0.80) activeIndex = 6;
        else if (progress < 0.90) activeIndex = 7;
        else activeIndex = 8;

        setCurrentPage(activeIndex + 1);

        const isMobile = window.innerWidth < 768;
        const targetY = isMobile ? "2.5%" : "5%";

        pages.forEach((page, index) => {
          if (index === activeIndex) {
            gsap.to(page, {
              y: targetY,
              rotation: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
            });
          } else if (index === activeIndex - 1) {
            gsap.to(page, {
              y: "-150%",
              rotation: 45,
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
            });
          } else if (index < activeIndex - 1) {
            gsap.set(page, { y: "-150%", opacity: 0, rotation: 45 });
          } else {
            gsap.set(page, { y: "150%", opacity: 0, rotation: -45 });
          }
        });
      },
    });

    mainTriggerRef.current = trigger;

    return () => {
      window.removeEventListener("scroll", handleScroll);
      trigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  /* ------------------------------------------------------------------------
     PAGE DATA
  ------------------------------------------------------------------------ */

  const pages = [
    { id: 1, color: "bg-gradient-to-br from-red-600 to-red-800" },
    { id: 2, color: "bg-gradient-to-br from-blue-600 to-blue-800" },
    { id: 3, color: "bg-gradient-to-br from-green-600 to-green-800" },
    { id: 4, color: "bg-gradient-to-br from-purple-600 to-purple-800" },
    { id: 5, color: "bg-gradient-to-br from-yellow-600 to-yellow-800" },
    { id: 6, color: "bg-gradient-to-br from-orange-600 to-orange-800" },
    { id: 7, color: "bg-gradient-to-br from-pink-600 to-pink-800" },
    { id: 8, color: "bg-gradient-to-br from-cyan-600 to-cyan-800" },
    { id: 9, color: "bg-gradient-to-br from-lime-600 to-lime-800" },
  ];

  /* ------------------------------------------------------------------------
     RENDER UI
  ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-black">
      {/* NAVBAR COMPONENT */}
      <NavigationBar 
        ref={navbarRef}
        currentPage={currentPage}
        onNavigate={scrollToPage}
      />

      {/* FIXED BUTTONS */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-6">
        <button
          onClick={goNextPage}
          className="w-14 h-14 flex items-center justify-center bg-black/70 text-white 
          border border-white/20 rounded-full text-3xl hover:bg-white hover:text-black transition
          backdrop-blur-sm hover:scale-110 active:scale-95"
        >
          ↑
        </button>

        <button
          onClick={goPrevPage}
          className="w-14 h-14 flex items-center justify-center bg-black/70 text-white 
          border border-white/20 rounded-full text-3xl hover:bg-white hover:text-black transition
          backdrop-blur-sm hover:scale-110 active:scale-95"
        >
          ↓
        </button>
      </div>

      {/* PAGE STACK */}
      <div ref={containerRef} className="relative" style={{ height: "100vh" }}>
        {pages.map((page, index) => (
          <div
            key={page.id}
            ref={(el) => (pagesRef.current[index] = el)}
            className={`absolute inset-0 flex items-center justify-center rounded-3xl shadow-2xl ${page.color}`}
            style={{
              zIndex: pages.length - index,
              width: "85vw",
              height: "90vh",
              margin: "80px auto 0 auto",  // SAME AS NAVBAR
              borderRadius: "30px",
              overflow: "hidden",
            }}
          >
            {/* PAGE 1 - HERO CAROUSEL */}
            {page.id === 1 ? (
              <HeroCarousel active={currentPage === 1} />
            )
              : page.id === 2 ? (
                <AboutPage2 active={currentPage === 2} />
              ) : page.id === 3 ? (
                <div className="w-full h-full p-8">
                  <HorizontalSlider />
                </div>
              ) : page.id === 4 ? (
                  <div className="w-full h-full p-8">
                    <ProductPage active={currentPage === 4} />
                  </div>
                ) : page.id === 5 ? (
                  <div className="w-full h-full p-8">
                    <MilkProcess active={currentPage === 5} />
                  </div>
                ) : page.id === 6 ? (
                  <div className="w-full h-full p-8">
                    <KeyMilestones active={currentPage === 6} />
                  </div>
                ) : page.id === 7 ? (
                  <div className="w-full h-full p-8">
                    <Dispatch active={currentPage === 7} />
                  </div>
                ) : page.id === 8 ? (
                  <div className="w-full h-full p-8">
                    <ContactUs active={currentPage === 8} />
                  </div>
                ) 
                : (
                  <div className="text-center">
                    <h1 className="text-white text-5xl font-extrabold drop-shadow-lg mb-4">
                      Thank You!
                    </h1>
                    <p className="text-white/80 text-2xl">Thanks for exploring Dairy Delights</p>
                  </div>
                )}
          </div>
        ))}
      </div>
    </div>
  );
}