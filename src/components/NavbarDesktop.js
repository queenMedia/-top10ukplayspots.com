class NavbarDesktop extends HTMLElement {
  constructor() {
    const html = String.raw;
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.observers = new Map();

    const isLanding = this.getAttribute("is-landing") === "true";

    this.addStyles("/public/styles/output.css");
    this.addStyles("/public/styles/globals.css");

    const container = document.createElement("div");
    container.innerHTML = html`
      <style>
        :host {
          display: block;
        }

        .active {
          color: #153131;
          font-weight: bolder;
        }
      </style>

      <header
        class="hidden text-black justify-center items-center lg:flex fixed z-50 w-full bg-white font-Peridot shadow-sm"
      >
        <div
          class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-4 mt-4"
        >
          <nav
            class="flex justify-center items-center rounded-xl h-[80px] w-full bg-blue px-5"
          >
            <div class="flex items-center flex-grow-0">
              <div class="font-normal text-lg flex gap-2 items-center">
                <a
                  href="${isLanding ? "#home-section" : "index.html"}"
                  id="logo-link"
                >
                  <img
                    id="navbar-logo"
                    class="object-contain size-12 shrink-0"
                    src="/public/assets/navbar/logo.webp"
                    alt="Top 10 Uk Play Spots logo"
                    title="Top 10 Uk Play Spots"
                  />
                </a>

                <span class="font-Chicle text-2xl">Top 10 Uk Play Spots</span>
              </div>
            </div>

            <!-- Navigation Items -->
            <div class="flex items-center justify-center flex-grow">
              <div class="font-normal">
                <ul id="nav-items" class="flex justify-center gap-10 xl:gap-20">
                  <li
                    class="transition-all duration-200 nav-item"
                    id-nav="home-section"
                  >
                    <a href="${isLanding ? "#home-section" : "index.html"}"
                      >Home</a
                    >
                  </li>
                  <li
                    class="transition-all duration-200 nav-item"
                    id-nav="about-section"
                  >
                    <a
                      href="${isLanding
                        ? "#about-section"
                        : "index.html#about-section"}"
                      >About Us</a
                    >
                  </li>

                  <li
                    class="transition-all duration-200 nav-item"
                    id-nav="why-us-section"
                  >
                    <a
                      href="${isLanding
                        ? "#why-us-section"
                        : "index.html#why-us-section"}"
                      >Why Us?</a
                    >
                  </li>

                  <li
                    class="transition-all duration-200 nav-item"
                    id-nav="top-10-section"
                  >
                    <a
                      href="${isLanding
                        ? "#top-10-section"
                        : "index.html#top-10-section"}"
                      >Top 10</a
                    >
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex-grow-0">
              <a
                href="booking.html"
                class="gradient hover:scale-105 transition-all duration-200 py-3 px-5 rounded-xl text-white"
                id="logo-link"
              >
                <span class="font-medium">Contact Us</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    `;

    this.shadow.appendChild(container);

    this.header = this.shadow.querySelector("header");
    this.navItems = this.shadow.querySelectorAll(".nav-item");
    this.logoImg = this.shadow.querySelector("#navbar-logo");
    this.brandText = this.shadow.querySelector("span");

    this.updateActiveNavItem = this.updateActiveNavItem.bind(this);
    this.handleIntersection = this.handleIntersection.bind(this);
  }

  addStyles(urlStyleSheet) {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = urlStyleSheet;
    this.shadow.appendChild(style);
  }

  connectedCallback() {
    window.addEventListener("hashchange", this.updateActiveNavItem);
    window.addEventListener("load", () => {
      this.updateActiveNavItem();
      this.setupIntersectionObservers();
    });
    window.addEventListener("popstate", this.updateActiveNavItem);

    this.updateActiveNavItem();
    this.setupIntersectionObservers();
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this.updateActiveNavItem);
    window.removeEventListener("load", this.updateActiveNavItem);
    window.removeEventListener("popstate", this.updateActiveNavItem);

    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }

  setupIntersectionObservers() {
    const options = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    this.navItems.forEach((navItem) => {
      const sectionId = navItem.getAttribute("id-nav");
      const section = document.getElementById(sectionId);

      if (section && !this.observers.has(sectionId)) {
        const observer = new IntersectionObserver(
          (entries) => this.handleIntersection(entries, sectionId),
          options
        );

        observer.observe(section);
        this.observers.set(sectionId, observer);
      }
    });
  }

  handleIntersection(entries, sectionId) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.disableActiveItem();
        const navItem = this.shadow.querySelector(`[id-nav="${sectionId}"]`);
        if (navItem) {
          navItem.classList.add("active");

          const newUrl = `#${sectionId}`;
          if (window.location.hash !== newUrl) {
            history.replaceState(null, null, newUrl);
          }
        }
      }
    });
  }

  updateActiveNavItem() {
    this.disableActiveItem();

    const hash = window.location.hash;
    const path = window.location.pathname;
    const slicePath = path.split("/").pop() || "";

    if (hash) {
      const sectionId = hash.slice(1);
      const navItem = this.shadow.querySelector(`[id-nav="${sectionId}"]`);
      if (navItem) {
        navItem.classList.add("active");
        return;
      }
    }

    if (slicePath === "" || slicePath === "index.html") {
      const homeItem = this.shadow.querySelector('[id-nav="home-section"]');
      if (homeItem) {
        homeItem.classList.add("active");
      }
    } else {
      const navItem = this.shadow.querySelector(`[id-nav="${slicePath}"]`);
      if (navItem) {
        navItem.classList.add("active");
      }
    }
  }

  disableActiveItem() {
    const activeItem = this.shadow.querySelector(".nav-item.active");
    if (activeItem) {
      activeItem.classList.remove("active");
    }
  }
}

customElements.define("navbar-desktop", NavbarDesktop);
