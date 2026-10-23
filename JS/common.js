const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) gsap.globalTimeline.timeScale(50);

let locoScroll;

function locoScrollAnime() {
    locoScroll = new LocomotiveScroll({
        el: document.querySelector("#wrapper"),
        smooth: true,
        multiplier: 0.9,
        lerp: reduceMotion ? 1 : 0.07,
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy("#wrapper", {
        scrollTop(val) {
            return arguments.length
                ? locoScroll.scrollTo(val, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#wrapper").style.transform ? "transform" : "fixed",
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

function loaderAnime() {
    const loaderBar = document.getElementById("loader-bar");
    const loaderNum = document.getElementById("loader-num");
    const loader = document.getElementById("loader");

    const MIN_SHOW = 400;
    const MAX_WAIT = 1500;
    let prog = 0;
    let finished = false;

    function render(value) {
        loaderBar.style.transform = `scaleX(${value / 100})`;
        loaderNum.textContent = Math.floor(value) + "%";
    }

    const timer = setInterval(() => {
        prog += (90 - prog) * 0.12;
        render(prog);
    }, 50);

    function finish() {
        if (finished) return;
        finished = true;
        clearInterval(timer);
        render(100);
        gsap.to(loader, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
                loader.style.display = "none";
            }
        });
    }

    // Hide as soon as the page has loaded, but never keep visitors waiting past MAX_WAIT.
    const pageLoaded = new Promise((resolve) => {
        if (document.readyState === "complete") resolve();
        else window.addEventListener("load", resolve, { once: true });
    });
    const minShown = new Promise((resolve) => setTimeout(resolve, MIN_SHOW));
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT));
    Promise.race([pageLoaded, timeout]).then(() => minShown).then(finish);
}

function headerScrollEffect() {
    if (typeof locoScroll !== 'undefined' && locoScroll) {
        const header = document.querySelector(".main-header");
        locoScroll.on("scroll", ({ scroll }) => {
            scroll.y > 60 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
        });
    }
}

// Arriving on a page via a link such as about.html#philanthropy.
function scrollToHash() {
    const hash = window.location.hash;
    if (!hash || !document.querySelector(hash)) return;
    locoScroll.update();
    locoScroll.scrollTo(hash, { duration: 0, disableLerp: true });
}

function initCursor() {
    if (window.matchMedia("(hover: none)").matches) return;

    const cursor = document.getElementById("cursor");
    const follower = document.getElementById("cursor-follower");
    let fx = 0, fy = 0, mx = 0, my = 0;
    let scale = 1, targetScale = 1;
    let rafId = null;

    function animateFollower() {
        fx += (mx - fx) * 0.1;
        fy += (my - fy) * 0.1;
        scale += (targetScale - scale) * 0.2;
        follower.style.transform = `translate(${fx - 16}px, ${fy - 16}px) scale(${scale})`;
        const settled = Math.abs(mx - fx) < 0.1 && Math.abs(my - fy) < 0.1 && Math.abs(targetScale - scale) < 0.005;
        rafId = settled ? null : requestAnimationFrame(animateFollower);
    }

    function wake() {
        if (rafId === null) rafId = requestAnimationFrame(animateFollower);
    }

    document.addEventListener("mousemove", (e) => {
        mx = e.clientX; my = e.clientY;
        cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
        wake();
    });

    document.querySelectorAll("a, button, .watch-card, .retailer-card, .value-card").forEach(el => {
        el.addEventListener("mouseenter", () => {
            targetScale = 1.75;
            follower.style.opacity = "0.2";
            wake();
        });
        el.addEventListener("mouseleave", () => {
            targetScale = 1;
            follower.style.opacity = "0.5";
            wake();
        });
    });
}

function statsCounter() {
    document.querySelectorAll(".stat-num[data-count]").forEach((el) => {
        const target = +el.dataset.count;
        const suffix = el.dataset.suffix ?? "+";
        ScrollTrigger.create({
            trigger: el,
            scroller: "#wrapper",
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: target, duration: 2, ease: "power2.out",
                    onUpdate() { el.textContent = Math.floor(this.targets()[0].val) + suffix; }
                });
            }
        });
    });
}

function gsapScrollReveals() {
    gsap.utils.toArray([
        ".watch-card", ".value-card", ".retailer-card",
        ".timeline-item", ".process-step-content",
        ".section-title", ".section-label",
        ".founder-content", ".craft-intro-wrap",
        ".contact-info-item", ".about-left", ".about-right"
    ]).forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    scroller: "#wrapper",
                    start: "top 90%",
                    toggleActions: "play none none none",
                }
            }
        );
    });
}

function pageHeroAnime() {
    gsap.from(".hero-eyebrow",    { opacity: 0, y: 20, duration: 1,   delay: 0.5, ease: "power3.out" });
    gsap.from(".page-hero-title", { opacity: 0, y: 40, duration: 1.2, delay: 0.8, ease: "power3.out" });
}

function initHamburger() {
    const hamburger = document.getElementById("hamburger");
    const navbar = document.getElementById("navbar");
    const overlay = document.getElementById("nav-overlay");
    const icon = document.getElementById("ham-icon");

    if (hamburger && navbar && overlay && icon) {
        hamburger.addEventListener("click", () => {
            navbar.classList.toggle("open");
            overlay.classList.toggle("active");

            const isOpen = navbar.classList.contains("open");
            icon.className = isOpen ? "ri-close-large-fill" : "ri-menu-3-fill";
            hamburger.setAttribute("aria-expanded", String(isOpen));
        });

        overlay.addEventListener("click", () => {
            navbar.classList.remove("open");
            overlay.classList.remove("active");
            icon.className = "ri-menu-3-fill";
            hamburger.setAttribute("aria-expanded", "false");
        });
    }
}

const wrapper = document.querySelector("#wrapper");
const loader = document.getElementById("loader");

if (wrapper && loader) {
    locoScrollAnime();
    loaderAnime();
    headerScrollEffect();
    window.addEventListener("load", () => setTimeout(scrollToHash, 0), { once: true });
}

initCursor();
initHamburger();

if (document.querySelector(".stat-num[data-count]")) {
    statsCounter();
}

if (document.querySelector(".watch-card, .value-card, .timeline-item")) {
    gsapScrollReveals();
}

if (document.querySelector(".page-hero-title")) {
    pageHeroAnime();
}
