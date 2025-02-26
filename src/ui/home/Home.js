class Home extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    this.wrapper = document.createElement("div");
  }

  setupStyles(urlStyleSheet) {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = urlStyleSheet;
    this.shadow.appendChild(style);
  }

  addStyles() {
    this.setupStyles("/public/styles/output.css");
  }

  render() {
    const html = String.raw;

    this.wrapper.innerHTML = html`
      <style>
        .home-section {
          min-height: max-content;
        }
        @media (min-width: 1524px) {
          .home-section {
            height: calc(100vh);
          }
        }

        @media (min-width: 1024px) {
          .home-section {
            height: calc(100vh);
            min-height: 600px;
          }
        }

        .overlay {
          background-image: linear-gradient(
              rgba(253, 239, 241, 0.97),
              rgba(253, 239, 241, 0.97)
            ),
            url("/public/assets/home/overlay.webp");
        }
      </style>

      <section class="home-section flex justify-center items-center">
        <div
          class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10 h-full flex justify-center items-center mt-[130px] lg:mt-[80px]"
        >
          <div
            class="flex flex-col gap-1.5 lg:gap-2 xl:gap-4 w-full max-w-[600px] lg:flex-row lg:min-w-full h-max lg:h-[500px] xl:h-[550px]"
          >
            <article class="relative lg:w-7/12 xl:w-8/12">
              <div class="absolute -top-1 flex flex-col font-Forma">
                <h1
                  class="w-fit bg-white rounded-tl-2xl rounded-br-2xl text-2xl lg:text-3xl xl:text-4xl font-light pr-2"
                >
                  <span class="font-medium">Top 10</span>
                  Brick-And-Mortar
                </h1>
                <h2
                  class="w-fit bg-white rounded-br-2xl text-2xl lg:text-3xl xl:text-4xl font-light pr-2 pt-2"
                >
                  <span class="font-medium">UK Casinos</span>
                  For 2025
                </h2>
              </div>

              <img
                src="/public/assets/home/hero.webp"
                class="rounded-2xl object-cover h-full w-full"
                alt="Casino gaming floor"
                title="Casino gaming floor"
              />

              <a
                href="#top-10-section"
                class="bg-[#FFFFFF] rounded-2xl p-1.5 absolute -bottom-6 -right-0.5 lg:-bottom-0.5 z-40"
              >
                <img
                  src="/public/assets/home/arrow.webp"
                  class="size-10 object-contain"
                  alt="Casino roulette"
                  title="Casino roulette"
                />
              </a>
            </article>

            <div
              class="flex flex-col lg:w-5/12 xl:w-4/12 h-full justify-between lg:gap-4"
            >
              <article
                class="relative py-10 px-3 overlay flex flex-col gap-6 rounded-2xl overflow-hidden font-Poppins"
              >
                <a
                  href="#top-10-section"
                  class="bg-[#FFFFFF] hidden rounded-2xl p-1.5 absolute -top-0.5 -right-0.5 lg:-bottom-0.5 lg:block h-fit"
                >
                  <img
                    src="/public/assets/home/arrow.webp"
                    class="size-10 object-contain"
                    alt=""
                  />
                </a>

                <div class="rounded-xl border-2 w-fit border-red py-1 px-2">
                  <span class="text-red font-light xl:text-lg"
                    >#BestUKCasinos</span
                  >
                </div>
                <p class="font-light xl:text-lg xl:font-light">
                  Get The
                  <span class="font-medium">Most Reliable Insights</span>
                  For Your Next Gaming Adventure.
                </p>

                <p class="font-medium text-lg xl:text-xl">
                  Obtain unique offers, discover the amenities and indulge in
                  the luxury.
                </p>
              </article>

              <article class="hidden lg:block relative">
                <div
                  class="p-1.5 absolute -bottom-0.5 bg-[#FFFFFF] -left-0.5 rounded-2xl"
                >
                  <div
                    class="rounded-xl border-2 w-fit border-red py-1 px-2 bg-[#FFFFFF]"
                  >
                    <span class="text-red font-light xl:text-lg"
                      >#BestUKCasinos</span
                    >
                  </div>
                </div>
                <img
                  src="/public/assets/home/hero-2.webp"
                  class="rounded-2xl"
                  alt=""
                />
              </article>
            </div>
          </div>
        </div>
      </section>
    `;

    this.shadow.appendChild(this.wrapper);
  }

  connectedCallback() {
    this.addStyles();
    this.render();
  }
}

customElements.define("home-section", Home);
