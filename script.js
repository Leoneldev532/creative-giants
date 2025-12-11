window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin);

  const heroMainTextArray = gsap.utils.toArray(".hero-main-text");
  const videoSection2Item = gsap.utils.toArray(
    ".video-section-2-item:not(:first-child)"
  );

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: "vertical",
    gestureDirection: "vertical",
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const scrambleTextAnimate = gsap.utils.toArray([
    ".t-r",
    ".t-c",
    ".t-l",
    ".t-b",
    ".t-t",
  ]);

  heroMainTextArray.forEach((element, index) => {
    gsap.set(element, {
      y: 400,
    });
  });

  gsap.set(".hero-main-container", {
    overflow: "hidden",
  });

  gsap.set([".card-inside-r-letter", ".card-inside-e-letter"], {
    opacity: "0",
    clipPath: `polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)`,
  });

  gsap.set([".t-r", ".t-c", ".t-l", ".t-t", ".t-b"], {
    opacity: 0,
  });

  const tl = gsap.timeline();
  const rltxt = gsap.timeline();

  lenis.stop();

  tl.to(".hero-main-container", {
    opacity: 1,
  })
    .to([".t-r", ".t-l", ".t-b", ".t-t"], {
      delay: 0.6,
      opacity: 1,
      mixBlendMode: "difference",
    })
    .to(heroMainTextArray, {
      delay: 0.3,
      y: 0,
      duration: 0.6,
      ease: "power2.inOut",
      stagger: {
        amount: 0.2,
      },
      onComplete: () => {
        gsap.set(".hero-main-container", {
          overflow: "auto",
          width: "100%",
          height: "100%",
        });

        gsap.set(".hero-main-container", {
          overflow: "hidden",
        });
      },
    })
    .to(
      [
        ".hero-main-text:nth-child(1)",
        ".hero-main-text:nth-child(2)",
        ".hero-main-text:nth-child(3)",
      ],
      {
        top: "-30%",
        stagger: {
          amount: 0.2,
        },
      }
    )
    .to(
      [
        ".hero-main-text:nth-child(4)",
        ".hero-main-text:nth-child(5)",
        ".hero-main-text:nth-child(6)",
      ],
      {
        top: "24.50%",
        stagger: {
          amount: 0.2,
        },
      },
      "<"
    )

    .to([".hero-main-text:nth-child(1)", ".hero-main-text:nth-child(2)"], {
      xPercent: (index) => -240 * (index / 5.5 + 1),
      stagger: {
        amount: 0.02,
      },
    })

    .to(
      [".hero-main-text:nth-child(3)"],
      {
        xPercent: 300,
      },
      "<"
    )

    .to(
      [".hero-main-text:nth-child(4)"],
      {
        xPercent: -500,
      },
      "<"
    )
    .to(
      [".hero-main-text:nth-child(5)"],
      {
        xPercent: -120,
      },
      "<"
    )
    .to(
      ".card-inside-r-letter",
      {
        opacity: 1,
        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
      },
      "<"
    )
    .to(
      ".card-inside-e-letter",
      {
        opacity: 1,
        clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
      },
      "<"
    )
    .to(".t-c", {
      opacity: 1,
      onComplete: () => {
        scrambleTextAnimate.forEach((element, index) => {
          const originalText = element.textContent;

          function createShiftedVersions(text, count = 10) {
            let result = "";
            for (let i = 0; i < count; i++) {
              const shifted =
                text.slice(i % text.length) + text.slice(0, i % text.length);
              result += shifted;
            }
            return result;
          }

          const shiftedChars = createShiftedVersions(originalText);

          gsap.to(element, {
            scrambleText: {
              text: originalText,
              chars: shiftedChars,
              revealDelay: 0.2,
              speed: 0.4,
            },
            delay: index * 0.4,
          });
        });

        lenis.start();
      },
    });

  let previousIndex = 0;
  const titleVideo = document.querySelector(".title-video");
  const tabItemsTitleVideo = ["Rodeo", "Checkhrah", "Shadow", "Vaggah"];

  const rl = gsap.timeline({
    scrollTrigger: {
      trigger: ".video-section-2",
      start: "top top",
      end: "+=2000",
      scrub: 1,
      pin: true,
      onUpdate: (self) => {
        const currentProject = Math.min(
          Math.floor(self.progress * videoSection2Item.length),
          videoSection2Item.length - 1
        );

        if (currentProject !== previousIndex) {
          previousIndex = currentProject;

          gsap.to(titleVideo, {
            scrambleText: {
              text: tabItemsTitleVideo[currentProject],
              speed: 0.3,
              duration: 0.2,
            },
          });
        }
      },
    },
  });

  videoSection2Item.forEach((item) => {
    rl.fromTo(
      item,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0, 0% 0%)",
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
      }
    );
  });
});
