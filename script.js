window.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const heroTitleContainer = document.querySelector(".hero-title-container ");
  const HeroTitle = new SplitText(".hero-title", { type: "chars" });
  const headerTitle = new SplitText(".header-title", { type: "words"  });

  const rlt = gsap.timeline({
     scrollTrigger: {
            trigger: ".hero-sub-title", 
            start: "top 80%",
            end: "+=100",
            toggleActions: "play reverse play reverse",
            markers: true
        } 
  })
 rlt.to(headerTitle.words,{
        x: 0,
        opacity:1,
        stagger: 0.04,
        });

  const descriptionDetailsSection = new SplitText(
    ".description-details-section",
    { type: "lines, words" }
  );

  const cursor = document.querySelector(".custom-cursor");
  const cursorDot = document.querySelector(".cursor-dot");

  const cursorText = document.querySelector(".cursor-text");

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  gsap.ticker.add(() => {
    const speed = 0.2;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;

    gsap.set(cursor, {
      x: cursorX - cursor.offsetWidth / 2,
      y: cursorY - cursor.offsetHeight / 2,
    });
  });

  const hoverElements = document.querySelectorAll("a, button, .project");

  hoverElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });

    el.addEventListener("mousedown", () => {
      cursor.classList.add("click");
    });

    el.addEventListener("mouseup", () => {
      cursor.classList.remove("click");
    });
  });

  document.addEventListener("mouseleave", () => {
    gsap.to(cursorDot, { opacity: 0, duration: 0.2 });
  });

  document.addEventListener("mouseenter", () => {
    gsap.to(cursorDot, { opacity: 1, duration: 0.2 });
  });

  const progressBar = document.querySelector(".progress-bar");
  const projectsList = document.querySelector(".projects-list");

  const contactMirror = document.querySelector(".some-images");

  const projects = document.querySelectorAll(".project");

  projects.forEach((project) => {
    project.addEventListener("mouseenter", () => {
      cursor.classList.add("view");
      cursorText.textContent = "VIEW";
    });

    project.addEventListener("mouseleave", () => {
      cursor.classList.remove("view");
      cursorText.textContent = "";
    });
  });

  const projectCounter = document.querySelector(".project-counter");
  const heroSubTitle = gsap.utils.toArray(".hero-sub-title");

  const horizontalSection = projectsList.parentElement;

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });

  const tl = gsap.timeline();

  tl.to(heroTitleContainer, {
    delay: 1,
    clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
  })
    .to(HeroTitle.chars, {
      y: 0,
      ease: "power4.out",
      stagger: {
        amount: 0.6,
      },
    })
    .to(heroSubTitle, {
      opacity: 1,
      duration: 0.4,
      stagger: 0.2,
    });

  gsap.to(descriptionDetailsSection.words, {
    y: 0,
    duration: 0.6,
    opacity: 1,
    ease: "power4.out",
    stagger: 0.01,
    scrollTrigger: {
      trigger: ".role",
      start: "top center",
      end: "end botton",

      toggleActions: "play none none reverse",
      //   markers: true,
    },
  });

  gsap.to(".description-details-2", {
    delay: 1,
    duration: 0.4,
    opacity: 1,
    scrollTrigger: {
      trigger: ".description-details-2",
      start: "top center",
      end: "end botton",
      //   markers: true,
      toggleActions: "play none none reverse",
    },
  });

  const sh = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: horizontalSection,
      start: "top top",
      end: () =>
        `+=${
          projectsList.scrollWidth -
          horizontalSection.offsetWidth +
          window.innerHeight
        }`,
      pin: true,
      scrub: 1,
      // markers: true,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      pinSpacing: true,
      onUpdate: (self) => {
        gsap.to(progressBar, {
          width: `${100 * self.progress}%`,
          duration: 0.1,
          ease: "none",
        });

        const currentProject = Math.min(
          Math.ceil(self.progress * projects.length),
          projects.length
        );
        const activeProject = currentProject === 0 ? 1 : currentProject;
        projectCounter.textContent = `[${activeProject}/${projects.length}]`;
      },
    },
  });

  sh.to(projectsList, {
    x: () => -(projectsList.scrollWidth - window.innerWidth),
    ease: "none",
  });

  const cmt = gsap.timeline({
    scrollTrigger: {
      trigger: ".contact-mirror",
      pin: true,
      scrub: true,
      // markers: true,
      end: "+=700vw",
    },
  });

  cmt.to(".some-images > img", {
    yPercent: `40px`,
    clipPath: ` polygon(0% 0%, 100% 0%, 100% 90%, 0% 90%)`,
    duration: 0.4,
    stagger: 0.05,
  });
});
