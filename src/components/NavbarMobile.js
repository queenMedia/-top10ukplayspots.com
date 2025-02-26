class NavbarMobile extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const tailwindCDN = document.createElement("link");
    tailwindCDN.rel = "stylesheet";
    tailwindCDN.href = "/public/styles/output.css";
    shadow.appendChild(tailwindCDN);

    const isLanding = this.getAttribute("is-landing") === "true";

    const container = document.createElement("div");
    const html = String.raw;
    container.innerHTML = html`
      <style>
        :host {
          display: block;
        }

        .bg-menu-navbar {
          background-image: linear-gradient(
              rgba(0, 0, 0, 0.9),
              rgba(0, 0, 0, 0.5)
            ),
            url("/public/assets/navbar/navbar-bg.jpeg");
          background-size: cover;
          background-position: center;
        }
      </style>

      <header
        class="flex items-center justify-center lg:hidden fixed z-50 shadow-[0px_10px_50px_-30px_#00000024] w-full px-4 sm:px-6 md:px-8 lg:px-10 bg-[#FFFFFF]"
      >
        <nav
          class="flex z-50 relative justify-between h-[80px] bg-[#FFFFFF] sm:w-[640px] md:w-[768px] w-full"
        >
          <div class="text-lg flex gap-4 items-center">
            <a
              class="flex items-center gap-2"
              href="${isLanding ? "#home-section" : "index.html"}"
            >
              <img
                class="object-contain w-[40px]"
                src="/public/assets/navbar/logo.webp"
                alt=""
                id="logo-mobile"
                title=""
              />
            </a>
          </div>
          <div
            id="menu-icon-container"
            class="flex items-center justify-center"
          >
            <div>
              <img
                src="/public/assets/navbar/menu-icon.webp"
                class="size-8 object-contain"
                id="menu-icon"
                alt="Menu icon"
              />
            </div>
          </div>
        </nav>

        <div
          id="menu"
          class="bg-menu-navbar bg-black -translate-x-[768px] min-h-[800px] w-full h-screen shadow-md transition-all ease-in-out duration-200 flex flex-col gap-12 justify-center absolute z-50 top-0 right-0 left-0 md:hidden text-[#FFFFFF] px-8 navbar-menu"
        >
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIgMmM1LjUzIDAgMTAgNC40NyAxMCAxMHMtNC40NyAxMC0xMCAxMFMyIDE3LjUzIDIgMTJTNi40NyAyIDEyIDJtMy41OSA1TDEyIDEwLjU5TDguNDEgN0w3IDguNDFMMTAuNTkgMTJMNyAxNS41OUw4LjQxIDE3TDEyIDEzLjQxTDE1LjU5IDE3TDE3IDE1LjU5TDEzLjQxIDEyTDE3IDguNDF6Ii8+PC9zdmc+"
            class="fixed top-0 right-0 m-4 size-8 object-contain"
            id="close-icon"
            alt=""
          />
          <ul class="flex flex-col gap-10 w-full">
            <li class="w-full">
              <a
                href="${isLanding ? "#home-section" : "index.html"}"
                class="text-lg flex items-center justify-between"
              >
                <span>Home</span>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik04LjAyNSAyMkw2LjI1IDIwLjIyNUwxNC40NzUgMTJMNi4yNSAzLjc3NUw4LjAyNSAybDEwIDEweiIvPjwvc3ZnPg=="
                  alt="Arrow icon"
                  class="w-5 h-5 object-contain"
                />
              </a>
            </li>
            <li class="w-full">
              <a
                href="${isLanding
                  ? "#about-section"
                  : "index.html#about-section"}"
                class="text-lg flex items-center justify-between"
              >
                <span>About Us</span>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik04LjAyNSAyMkw2LjI1IDIwLjIyNUwxNC40NzUgMTJMNi4yNSAzLjc3NUw4LjAyNSAybDEwIDEweiIvPjwvc3ZnPg=="
                  alt="Arrow icon"
                  class="w-5 h-5 object-contain"
                />
              </a>
            </li>
            <li class="w-full">
              <a
                href="${isLanding
                  ? "#why-us-section"
                  : "index.html#why-us-section"}"
                class="text-lg flex items-center justify-between"
              >
                <span>Why Us?</span>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik04LjAyNSAyMkw2LjI1IDIwLjIyNUwxNC40NzUgMTJMNi4yNSAzLjc3NUw4LjAyNSAybDEwIDEweiIvPjwvc3ZnPg=="
                  alt="Arrow icon"
                  class="w-5 h-5 object-contain"
                />
              </a>
            </li>
            <li class="w-full">
              <a
                href="${isLanding
                  ? "#top-10-section"
                  : "index.html#top-10-section"}"
                class="text-lg flex items-center justify-between"
              >
                <span>Top 10</span>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Ik04LjAyNSAyMkw2LjI1IDIwLjIyNUwxNC40NzUgMTJMNi4yNSAzLjc3NUw4LjAyNSAybDEwIDEweiIvPjwvc3ZnPg=="
                  alt="Arrow icon"
                  class="w-5 h-5 object-contain"
                />
              </a>
            </li>
          </ul>
        </div>
      </header>
    `;

    shadow.appendChild(container);

    this.menu = shadow.querySelector("#menu");
    this.menuIcon = shadow.querySelector("#menu-icon");
    this.closeIcon = shadow.getElementById("close-icon");

    const menuLinks = shadow.querySelectorAll("a");
    menuLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });

    this.menuIcon.addEventListener("click", () => this.toggleMenu());
    this.closeIcon.addEventListener("click", () => this.toggleMenu());
  }

  static get observedAttributes() {
    return ["is-landing"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "is-landing") {
      this.updateIsLanding(newValue);
    }
  }

  toggleMenu() {
    this.menu.classList.toggle("-translate-x-[768px]");
  }

  closeMenu() {
    this.menu.classList.add("-translate-x-[768px]");
  }
}

customElements.define("navbar-mobile", NavbarMobile);
