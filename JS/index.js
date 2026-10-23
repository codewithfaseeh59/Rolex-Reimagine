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
            return {
                top: 0, left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.querySelector("#wrapper").style.transform
            ? "transform"
            : "fixed",
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

// Resolved once the 3D model has loaded (or failed), so the loader lifts as soon as the hero is ready.
const MAX_WATCH_START = 1200;
let markAssetsReady;
const assetsReady = new Promise((resolve) => { markAssetsReady = resolve; });

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

    const minShown = new Promise((resolve) => setTimeout(resolve, MIN_SHOW));
    const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT));
    Promise.race([assetsReady, timeout]).then(() => minShown).then(finish);
}

function headerScrollEffect() {
    const header = document.querySelector(".main-header");
    locoScroll.on("scroll", ({ scroll }) => {
        if (scroll.y > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
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
        mx = e.clientX;
        my = e.clientY;
        cursor.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
        wake();
    });

    document.querySelectorAll("a, button, .watch-card").forEach(el => {
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

function initWatch() {
    const canvas = document.getElementById("watch-canvas");

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0.5, 4);


    const ambient = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(-5, -2, -5);
    scene.add(rimLight);
    const pointLight = new THREE.PointLight(0xffffff, 0.8, 20);
    pointLight.position.set(0, 3, 3);
    scene.add(pointLight);

    // Idle spin renders at ~30fps; dragging, scrolling and resizing render at full rate.
    let needsRender = true;
    let lastFrame = 0;
    let isDragging = false;
    let idleRotation = true;
    let previousMouseX = 0;
    let previousMouseY = 0;

    canvas.addEventListener("mousedown", (e) => {
        isDragging = true;
        idleRotation = false;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });
    window.addEventListener("mouseup", () => {
        isDragging = false;
        idleRotation = true;
    });
    window.addEventListener("mousemove", (e) => {
        if (!isDragging || !watchModel) return;
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        watchModel.rotation.y += deltaX * 0.01;
        watchModel.rotation.x += deltaY * 0.01;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
        needsRender = true;
    });

    let watchModel = null;
    const loader = new THREE.GLTFLoader();
    loader.load(
        "./Assets/Watch-Model/aurelian.glb",
        (gltf) => {
            watchModel = gltf.scene;

            const box = new THREE.Box3().setFromObject(watchModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            watchModel.position.sub(center);
            watchModel.scale.setScalar(1.8 / maxDim);

            scene.add(watchModel);
            needsRender = true;
            gsap.to(canvas, { opacity: 1, duration: 0.6 });
            if (!reduceMotion) initWatchScroll();
            markAssetsReady();
        },
        undefined,
        (err) => {
            console.warn("Model load error:", err);
            markAssetsReady();
        }
    );

    function initWatchScroll() {
        const parts = [];
        watchModel.traverse((child) => {
            if (child.isMesh) {
                child.userData.originalPos = child.position.clone();
                child.userData.explodeDir = new THREE.Vector3(
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 4
                );
                parts.push(child);
            }
        });

        ScrollTrigger.create({
            trigger: "#hero-section",
            scroller: "#wrapper",
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
                if (!watchModel) return;

                watchModel.rotation.y = self.progress * Math.PI * 2;

                const explodeProgress = Math.max(0, (self.progress - 0.5) * 2);
                parts.forEach((part) => {
                    part.position.x = part.userData.originalPos.x + part.userData.explodeDir.x * explodeProgress;
                    part.position.y = part.userData.originalPos.y + part.userData.explodeDir.y * explodeProgress;
                    part.position.z = part.userData.originalPos.z + part.userData.explodeDir.z * explodeProgress;
                });

                camera.position.z = 6 - self.progress * 1.5;
                needsRender = true;
            }
        });
    }

    // Skip rendering while the hero is scrolled out of view.
    let heroVisible = true;
    new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        needsRender = true;
    }).observe(canvas);

    function animate(time) {
        requestAnimationFrame(animate);
        if (!heroVisible) {
            lastFrame = time;
            return;
        }
        const delta = Math.min(time - lastFrame, 100);
        const idleSpin = watchModel && idleRotation && !reduceMotion;
        if (!needsRender && !(idleSpin && delta >= 33)) return;
        lastFrame = time;
        if (idleSpin) watchModel.rotation.y += 0.00018 * delta;
        needsRender = false;
        renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        needsRender = true;
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
                    val: target,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate() {
                        el.textContent = Math.floor(this.targets()[0].val) + suffix;
                    }
                });
            }
        });
    });
}

function craftSteps() {
    const craftImgs = [
        "./Assets/Images/craft-1.webp",
        "./Assets/Images/craft-2.webp",
        "./Assets/Images/craft-3.webp",
        "./Assets/Images/craft-4.webp",
    ];

    document.querySelectorAll(".craft-step").forEach((step, i) => {
        ScrollTrigger.create({
            trigger: step,
            scroller: "#wrapper",
            start: "top 60%",
            onEnter: () => {
                document.querySelectorAll(".craft-step").forEach(s => s.classList.remove("active"));
                step.classList.add("active");
                const img = document.querySelector(".craft-image");
                gsap.to(img, {
                    opacity: 0, duration: 0.3,
                    onComplete: () => {
                        img.src = craftImgs[i];
                        gsap.to(img, { opacity: 0.7, duration: 0.4 });
                    }
                });
            }
        });
    });
}

// The 3D scene is the heaviest startup work: build it once the hero text has started to paint.
let watchStarted = false;
function startWatch() {
    if (watchStarted) return;
    watchStarted = true;
    requestAnimationFrame(() => setTimeout(initWatch, 0));
}

function gsapAnimations() {
    gsap.from(".hero-eyebrow",    { opacity: 0, y: 20, duration: 1,   delay: 0.5, ease: "power3.out" });
    gsap.from(".hero-title",      { opacity: 0, y: 40, duration: 1.2, delay: 0.8, ease: "power3.out", onStart: startWatch });
    gsap.from(".hero-subtitle",   { opacity: 0, y: 20, duration: 1,   delay: 1.2, ease: "power3.out" });
    gsap.from(".hero-scroll-hint",{ opacity: 0,        duration: 1,   delay: 1.6, ease: "power2.out" });

    gsap.utils.toArray([
        ".watch-card",
        ".about-left",
        ".about-right",
        ".stat-item",
        ".quote-text",
        ".quote-author",
        ".craft-step",
        ".section-title",
        ".section-label",
    ]).forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                scroller: "#wrapper",
                start: "top 88%",
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out"
        });
    });
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

locoScrollAnime();
loaderAnime();
headerScrollEffect();
initCursor();
statsCounter();
craftSteps();
gsapAnimations();
initHamburger();

setTimeout(startWatch, MAX_WATCH_START);
