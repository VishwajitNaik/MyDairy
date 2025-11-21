"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SpotlightSection() {
  const spotlightImgRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    spotlightImgRefs.current = spotlightImgRefs.current.slice(0, 4);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: () => window.innerHeight * 6,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      // optional if you see offset issues when used inside a pinned container:
      pinnedContainer: sectionRef.current.parentElement || undefined,

      onUpdate: (self) => {
        const progress = self.progress;

        const initialRotations = [8, -6, 7, -5];
        const phaseOneStartOffsets = [0, 0.08, 0.16, 0.24];
        const spotlightImgFinalPos = [
          [-180, -120],
          [160, -140],
          [-200, 120],
          [180, 100],
        ];

        spotlightImgRefs.current.forEach((img, index) => {
          if (!img) return;

          const initialRotation = initialRotations[index];
          const phase1Start = phaseOneStartOffsets[index];
          const phase1End = Math.min(
            phase1Start + (0.35 - phase1Start) * 0.9,
            0.35
          );

          let x = 0;
          let y;
          let rotation;

          if (progress < phase1Start) {
            y = 150;
            rotation = initialRotation;
          } else if (progress < phase1End) {
            let phase1Progress;

            if (progress >= phase1End) {
              phase1Progress = 1;
            } else {
              const linearProgress =
                (progress - phase1Start) / (phase1End - phase1Start);
              phase1Progress = 1 - Math.pow(1 - linearProgress, 2);
            }

            y = 150 - phase1Progress * 200;
            rotation = initialRotation;
          } else {
            y = 0;
            rotation = initialRotation;
          }

          const phaseTwoStartOffsets = [0.4, 0.45, 0.5, 0.55];
          const phase2Start = phaseTwoStartOffsets[index];
          const phase2End = Math.min(
            phase2Start + (0.85 - phase2Start) * 0.9,
            0.85
          );

          const finalX = spotlightImgFinalPos[index][0];
          const finalY = spotlightImgFinalPos[index][1];

          if (progress >= phase2Start && progress < 0.95) {
            let phase2Progress;

            if (progress >= phase2End) {
              phase2Progress = 1;
            } else {
              const linearProgress =
                (progress - phase2Start) / (phase2End - phase2Start);
              phase2Progress = 1 - Math.pow(1 - linearProgress, 2);
            }

            x = phase2Progress * finalX;
            y = phase2Progress * finalY;
            rotation = initialRotation * (1 - phase2Progress);
          } else if (progress >= 0.95) {
            x = finalX;
            y = finalY;
            rotation = 0;
          }

          gsap.set(img, {
            x: x + "%",
            y: y + "%",
            rotation: rotation,
            scale: progress > 0.9 ? 0.9 : 1,
          });
        });
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const addToRefs = (el, index) => {
    if (el && !spotlightImgRefs.current.includes(el)) {
      spotlightImgRefs.current[index] = el;
    }
  };

  return (
    <div className="relative h-[700vh] w-full">
      {/* pinned spotlight area */}
      <div
        ref={sectionRef}
        className="spotlight-section relative h-screen w-full overflow-hidden bg-zinc-50 dark:bg-black"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute">
            <Image
              ref={(el) => addToRefs(el, 0)}
              src="https://picsum.photos/600/400"
              width={600}
              height={400}
              alt="Dummy Image 1"
              className="rounded-xl shadow-xl"
            />
          </div>

          <div className="absolute">
            <Image
              ref={(el) => addToRefs(el, 1)}
              src="https://picsum.photos/600/400"
              width={600}
              height={400}
              alt="Dummy Image 2"
              className="rounded-xl shadow-xl"
            />
          </div>

          <div className="absolute">
            <Image
              ref={(el) => addToRefs(el, 2)}
              src="https://picsum.photos/600/400"
              width={600}
              height={400}
              alt="Dummy Image 3"
              className="rounded-xl shadow-xl"
            />
          </div>

          <div className="absolute">
            <Image
              ref={(el) => addToRefs(el, 3)}
              src="https://picsum.photos/600/400"
              width={600}
              height={400}
              alt="Dummy Image 4"
              className="rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
