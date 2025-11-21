"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutPage2 from "./Components/AboutUs";
import HorizontalSlider from "./Components/HorizontalSlider";
import ProductPage from "./Components/autoRotation";
import MilkProcess from "./Components/MilkProcess";
import KeyMilestones from "./Components/keyMilleStone";
import Dispatch from "./Components/dispatch";
import HeroCarousel from "./Components/CaurasalImage"; // Import the new component
// import ProductShowcase from "./Components/ProductShowcase";
import ContactUs from "./Components/COntactUs";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pagesRef = useRef([]);
  const containerRef = useRef(null);
  const navbarRef = useRef(null);
  const mainTriggerRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);

  // Scroll to specific page using ScrollTrigger start/end mapping
  const scrollToPage = (pageNum) => {
    const pagesCount = pagesRef.current.filter(Boolean).length || 9;
    // clamp
    const pageIndex = Math.max(0, Math.min(pageNum - 1, pagesCount - 1));

    // If we have the main trigger, compute pixel position using its numeric start/end
    const trig = mainTriggerRef.current;
    if (trig && typeof trig.start === "number" && typeof trig.end === "number") {
      const start = trig.start;
      const end = trig.end;
      // progress fraction across pinned scroll for target page
      const progress = pagesCount > 1 ? pageIndex / (pagesCount - 1) : 0;
      const target = start + progress * (end - start);
      window.scrollTo({ top: Math.round(target), behavior: "smooth" });
      return;
    }

    // Fallback (if trigger not ready): approximate by window height
    const pageHeight = window.innerHeight;
    const targetFallback = pageHeight * pageIndex;
    window.scrollTo({ top: targetFallback, behavior: "smooth" });
  };

  // Up = NEXT (go forward), Down = PREV (go backward) — as requested
  const goNextPage = () => {
    setCurrentPage((prev) => {
      const next = Math.min(prev + 1, 9);
      if (next !== prev) scrollToPage(next);
      return next;
    });
  };

  const goPrevPage = () => {
    setCurrentPage((prev) => {
      const next = Math.max(prev - 1, 1);
      if (next !== prev) scrollToPage(next);
      return next;
    });
  };

  useEffect(() => {
    pagesRef.current = pagesRef.current.slice(0, 9);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const pages = pagesRef.current.filter(Boolean);
    const totalPages = pages.length;

    // ---------------- NAVBAR SHOW/HIDE ON SCROLL ----------------
    let lastScroll = 0;

    const showNavbar = () => gsap.to(navbarRef.current, { y: 0, duration: 0.3 });
    const hideNavbar = () => gsap.to(navbarRef.current, { y: -100, duration: 0.3 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const sc = self.scroll();
        if (sc > lastScroll) hideNavbar();
        else showNavbar();
        lastScroll = sc;
      },
    });

    // ---------------- RESPONSIVE PAGE DIMENSIONS ----------------
    const setDimensions = () => {
      const isMobile = window.innerWidth < 768;
      pages.forEach((page) => {
        if (isMobile) {
          gsap.set(page, { width: "95vw", height: "95vh", x: "2.5%", y: "2.5%" });
        } else {
          gsap.set(page, { width: "85vw", height: "90vh", x: "7.5%", y: "5%" });
        }
      });
    };

    setDimensions();
    window.addEventListener("resize", setDimensions);

    // ---------------- INITIAL PAGE STATE ----------------
    gsap.set(pages, { opacity: 0, scale: 0.9, rotation: 45 });
    if (pages[0]) gsap.set(pages[0], { opacity: 1, scale: 1, rotation: 0 });

    for (let i = 1; i < pages.length; i++) {
      gsap.set(pages[i], { opacity: 0, y: "150%", rotation: -45 });
    }

    // ---------------- MAIN PAGE TRANSITION SYSTEM ----------------
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: `+=${totalPages * 200}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,

      onUpdate: (self) => {
        const progress = self.progress;

        // Custom mapping giving more space to page 3 (horizontal slider)
        let activeIndex;
        if (progress < 0.15) {
          activeIndex = 0; // Page 1
        } else if (progress < 0.25) {
          activeIndex = 1; // Page 2
        } else if (progress < 0.75) {
          activeIndex = 2; // Page 3 (Horizontal Slider)
        } else if (progress < 0.80) {
          activeIndex = 3; // Page 4
        } else if (progress < 0.85) {
          activeIndex = 4; // Page 5
        } else if (progress < 0.90) {
          activeIndex = 5; // Page 6
        } else if (progress < 0.95) {
          activeIndex = 6; // Page 7
        } else if (progress < 0.98) {
          activeIndex = 7; // Page 8
        } else {
          activeIndex = 8; // Page 9
        }

        const newPage = activeIndex + 1;
        // update state only when changed (prevents excessive rerenders)
        setCurrentPage((prev) => (prev === newPage ? prev : newPage));

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
          } else if (index === activeIndex - 1 && activeIndex > 0) {
            gsap.to(page, {
              y: "-150%",
              rotation: 45,
              opacity: 0,
              scale: 0.8,
              duration: 0.8,
            });
          } else if (index < activeIndex - 1) {
            gsap.set(page, { y: "-150%", opacity: 0, rotation: 45 });
          } else if (index > activeIndex) {
            gsap.set(page, { y: "150%", opacity: 0, rotation: -45 });
          }
        });
      },
    });

    // store trigger so button handlers can compute correct pixel positions
    mainTriggerRef.current = trigger;

    return () => {
      trigger.kill();
      mainTriggerRef.current = null;
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  const addToRefs = (el, index) => {
    if (el && !pagesRef.current.includes(el)) {
      pagesRef.current[index] = el;
    }
  };

  // ---------------- PAGE DATA ----------------
  const pages = [
    {
      id: 1,
      color: "bg-gradient-to-br from-red-600 to-red-800",
      title: "Welcome to Our Dairy",
      content: "Experience the journey of pure dairy products",
    },
    {
      id: 2,
      color: "bg-gradient-to-br from-blue-600 to-blue-800",
      title: "Page 2 - About Us",
      content: "Company information and history",
    },
    {
      id: 3,
      color: "bg-gradient-to-br from-green-600 to-green-800",
      title: "Page 3 - Horizontal Slider",
      content: "Interactive card slider - Scroll horizontally to navigate",
    },
    {
      id: 4,
      color: "bg-gradient-to-br from-purple-600 to-purple-800",
      title: "Page 4 - Products",
      content: "Interactive product showcase",
    },
    {
      id: 5,
      color: "bg-gradient-to-br from-yellow-600 to-yellow-800",
      title: "Page 5",
      content: "More vertical pages",
    },
    {
      id: 6,
      color: "bg-gradient-to-br from-orange-600 to-orange-800",
      title: "Page 6",
      content: "Keep scrolling down",
    },
    {
      id: 7,
      color: "bg-gradient-to-br from-pink-600 to-pink-800",
      title: "Page 7",
      content: "Almost there",
    },
    {
      id: 8,
      color: "bg-gradient-to-br from-cyan-600 to-cyan-800",
      title: "Page 8",
      content: "Penultimate page",
    },
    {
      id: 9,
      color: "bg-gradient-to-br from-lime-600 to-lime-800",
      title: "Page 9",
      content: "Final destination",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* ---------------- NAVBAR ---------------- */}
      <nav
        ref={navbarRef}
        className="fixed top-10 bg-gray-800 w-[85%] left-[7%] rounded-2xl z-[999] 
        bg-black/80 backdrop-blur-md shadow-md border border-white/10
        px-[7.5%] py-4 flex justify-between items-center"
      >
        <h1 className="text-white text-xl font-bold">Dairy Delights</h1>
        <div className="flex gap-6 text-white font-medium">
          <span className="text-green-400">Page {currentPage}/9</span>
          <a href="#" className="hover:text-green-400">
            Home
          </a>
          <a href="#" className="hover:text-green-400">
            About
          </a>
          <a href="#" className="hover:text-green-400">
            Contact
          </a>
        </div>
      </nav>

      {/* ---------------- VERTICAL ARROWS - FIXED --------------- */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-6">
        {/* UP - NEXT PAGE */}
        <button
          onClick={goNextPage}
          disabled={currentPage >= pages.length}
          className="w-14 h-14 flex items-center justify-center bg-black/70 text-white 
          border border-white/20 rounded-full text-3xl hover:bg-white hover:text-black transition
          disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ↑
        </button>

        {/* DOWN - PREVIOUS PAGE */}
        <button
          onClick={goPrevPage}
          disabled={currentPage <= 1}
          className="w-14 h-14 flex items-center justify-center bg-black/70 text-white 
          border border-white/20 rounded-full text-3xl hover:bg-white hover:text-black transition
          disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ↓
        </button>
      </div>

      {/* ---------------- COLOR PAGE STACK ---------------- */}
      <div ref={containerRef} className="relative" style={{ height: `${pages.length * 200}vh` }}>
        {pages.map((page, index) => (
          <div
            key={page.id}
            ref={(el) => addToRefs(el, index)}
            className={`absolute inset-0 flex items-center justify-center 
            rounded-3xl shadow-2xl ${page.color}`}
            style={{ zIndex: pages.length - index, marginTop: "80px" }}
          >
            {/* PAGE 1 - HERO CAROUSEL */}
            {page.id === 1 ? (
              <HeroCarousel active={currentPage === 1} />
            ) : page.id === 2 ? (
              /* PAGE 2 - ABOUT US */
              <AboutPage2 active={currentPage === 2} />
            ) : page.id === 3 ? (
              /* PAGE 3 - HORIZONTAL SLIDER */
              <div className="w-full h-full p-8">
                <HorizontalSlider />
              </div>
            ) : page.id === 4 ? (
              /* PAGE 4 - PRODUCT SHOWCASE */
              <div className="w-full h-full p-8">
                <ProductPage active={currentPage === 4} />
              </div>
            ) : page.id === 5 ? (
              /* PAGE 5 - MILK PROCESS */
              <div className="w-full h-full p-8">
                <MilkProcess active={currentPage === 5} />
              </div>
            ) : page.id === 6 ? (
              /* PAGE 6 - KEY MILESTONES */
              <div className="w-full h-full p-8">
                <KeyMilestones active={currentPage === 6} />
              </div>
            ) : page.id === 7 ? (
              /* PAGE 7 - DISPATCH */
              <div className="w-full h-full p-8">
                <Dispatch active={currentPage === 7} />
              </div>
            ) : page.id === 8 ? (
              /* PAGE 8 - PRODUCT SHOWCASE */
              <div  className="w-full h-full p-8">
                {/* <ProductShowcase active={currentPage === 8} /> */}
                <ContactUs active={currentPage === 8} />
              </div>
            ) : 
            (
              /* OTHER PAGES */
              <div className="text-center">
                <h1 className="text-white text-5xl font-extrabold drop-shadow-lg mb-4">
                  {page.title}
                </h1>
                <p className="text-white/80 text-2xl">{page.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="h-screen flex items-center justify-center text-white text-4xl">🎉 End of Pages</div>
    </div>
  );
}
// "use client";

// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// export default function Home() {
//   const spotlightImgRefs = useRef([]);
  
//   // Initialize refs array
//   useEffect(() => {
//     spotlightImgRefs.current = spotlightImgRefs.current.slice(0, 4);
//   }, []);

//   useEffect(() => {
//     // Create ScrollTrigger for spotlight effect
//     const scrollTrigger = ScrollTrigger.create({
//       trigger: ".spotlight-section",
//       start: "top top",
//       end: `${window.innerHeight * 6}px`,
//       pin: true,
//       pinSpacing: true,
//       scrub: 1,
      
//       onUpdate: (self) => {
//         const progress = self.progress;

//         const initialRotations = [8, -6, 7, -5];
//         const phaseOneStartOffsets = [0, 0.08, 0.16, 0.24]; // Faster sequential start
//         const spotlightImgFinalPos = [
//           [-180, -120],  // Much wider spread
//           [160, -140],
//           [-200, 120],
//           [180, 100],
//         ];

//         spotlightImgRefs.current.forEach((img, index) => {
//           if (!img) return;

//           const initialRotation = initialRotations[index];
//           const phase1Start = phaseOneStartOffsets[index];
//           const phase1End = Math.min(phase1Start + (0.35 - phase1Start) * 0.9, 0.35); // Faster first phase

//           let x = 0;
//           let y, rotation;

//           if (progress < phase1Start) {
//             y = 150;  // Start further below
//             rotation = initialRotation;
//           } else if (progress < phase1End) {
//             let phase1Progress;

//             if (progress >= phase1End) {
//               phase1Progress = 1;
//             } else {
//               const linearProgress = (progress - phase1Start) / (phase1End - phase1Start);
//               phase1Progress = 1 - Math.pow(1 - linearProgress, 2); // Faster easing
//             }

//             y = 150 - phase1Progress * 200;
//             rotation = initialRotation;
//           } else {
//             y = 0;
//             rotation = initialRotation;
//           }

//           const phaseTwoStartOffsets = [0.4, 0.45, 0.5, 0.55]; // Earlier second phase
//           const phase2Start = phaseTwoStartOffsets[index];
//           const phase2End = Math.min(phase2Start + (0.85 - phase2Start) * 0.9, 0.85);

//           const [finalX, finalY] = spotlightImgFinalPos[index];

//           if (progress >= phase2Start && progress < 0.95) {
//             let phase2Progress;

//             if (progress >= phase2End) {
//               phase2Progress = 1;
//             } else {
//               const linearProgress = (progress - phase2Start) / (phase2End - phase2Start);
//               phase2Progress = 1 - Math.pow(1 - linearProgress, 2); // Faster easing
//             }

//             x = 0 + phase2Progress * finalX;
//             y = 0 + phase2Progress * finalY;
//             rotation = initialRotation * (1 - phase2Progress);
//           } else if (progress >= 0.95) {
//             x = finalX;
//             y = finalY;
//             rotation = 0;
//           }

//           gsap.set(img, {
//             x: x + "%",
//             y: y + "%",
//             rotation: rotation,
//             scale: progress > 0.9 ? 0.9 : 1 // Slight scale down when spread out
//           });
//         });
//       }
//     });

//     return () => {
//       if (scrollTrigger) scrollTrigger.kill();
//     };
//   }, []);

//   // Helper function to add ref to array
//   const addToRefs = (el, index) => {
//     if (el && !spotlightImgRefs.current.includes(el)) {
//       spotlightImgRefs.current[index] = el;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 space-y-16">
      
//       <div className="flex items-center justify-center py-16">
//         <h1 className="text-4xl font-bold text-center">Scroll Down 👇</h1>
//       </div>

//       {/* Spotlight Section with Smaller Cards */}
//       <div className="spotlight-section relative h-screen w-full overflow-hidden">
//         <div className="absolute inset-0 flex items-center justify-center">
//           {/* Smaller Image 1 */}
//           <div className="absolute">
//             <Image
//               ref={(el) => addToRefs(el, 0)}
//               src="https://picsum.photos/600/400"
//               width={600}
//               height={400}
//               alt="Dummy Image 1"
//               className="rounded-xl shadow-xl"
//             />
//           </div>

//           {/* Smaller Image 2 */}
//           <div className="absolute">
//             <Image
//               ref={(el) => addToRefs(el, 1)}
//               src="https://picsum.photos/600/400"
//               width={600}
//               height={400}
//               alt="Dummy Image 2"
//               className="rounded-xl shadow-xl"
//             />
//           </div>

//           {/* Smaller Image 3 */}
//           <div className="absolute">
//             <Image
//               ref={(el) => addToRefs(el, 2)}
//               src="https://picsum.photos/600/400"
//               width={600}
//               height={400}
//               alt="Dummy Image 3"
//               className="rounded-xl shadow-xl"
//             />
//           </div>

//           {/* Smaller Image 4 */}
//           <div className="absolute">
//             <Image
//               ref={(el) => addToRefs(el, 3)}
//               src="https://picsum.photos/600/400"
//               width={600}
//               height={400}
//               alt="Dummy Image 4"
//               className="rounded-xl shadow-xl"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Additional content after spotlight section */}
//       <div className="flex items-center justify-center py-16">
//         <h2 className="text-3xl font-bold text-center">Continue Scrolling 👇</h2>
//       </div>

//       {/* Regular smaller images outside spotlight effect */}
//       <div className="flex items-center justify-center">
//         <div className="w-full max-w-2xl">
//           <Image
//             src="https://picsum.photos/600/400"
//             width={600}
//             height={400}
//             alt="Dummy Image 5"
//             className="rounded-xl shadow-xl w-full h-auto"
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-center">
//         <div className="w-full max-w-2xl">
//           <Image
//             src="https://picsum.photos/600/400"
//             width={600}
//             height={400}
//             alt="Dummy Image 6"
//             className="rounded-xl shadow-xl w-full h-auto"
//           />
//         </div>
//       </div>

//       <div className="flex items-center justify-center py-16">
//         <h2 className="text-3xl font-bold text-center">That's All! 🎉</h2>
//       </div>
//     </div>
//   );
// }

