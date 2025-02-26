class HitJackpot extends HTMLElement {
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
      <section class="flex justify-center items-center">
        <div
          class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10 h-full flex justify-center items-center"
        >
          <div class="flex flex-col items-center gap-6 lg:flex-row-reverse">
            <article class="flex flex-col gap-6 lg:w-9/12">
              <h2
                class="font-light font-Forma text-3xl lg:text-3xl xl:text-4xl"
              >
                <span class="font-medium">Hit The Jackpot</span>
                Casino Partners Through Our Casino Selection
              </h2>

              <div
                class="flex flex-col gap-4 font-Poppins xl:text-lg xl:font-light"
              >
                <p>
                  Welcome to Top 10 UK Play Spots, your ultimate source of the
                  top brick-and-mortar casinos across the UK. Designed for
                  expert games, amateur customers, local and overseas guests
                  looking for exciting gaming experiences and the best
                  entertainment available, this platform provides you with a
                  comprehensive guide of details for each venue.
                </p>
                <p>
                  Make sure to get unparalleled offers to book your next
                  adventure to the top casino venues we have collected for your
                  convenience. Our ranking has been created to guarantee a wide
                  range of thrilling venues with an extensive diversity of
                  amenities and services for everyone.
                </p>
                <p>
                  We have arranged an extraordinary curatorship of the top
                  venues in the UK through the most trusted real-guest reviews,
                  and insights from experts in the casino industry. Truly
                  offering you the most complete ranking built with trusted
                  information to ensure you will have the best casino adventure
                  for your leisure.
                </p>
                <p>
                  We have arranged an extraordinary curatorship of the top
                  venues in the UK through the most trusted real-guest reviews,
                  and insights from experts in the casino industry. Truly
                  offering you the most complete ranking built with trusted
                  information to ensure you will have the best casino adventure
                  for your leisure.
                </p>
                <p>
                  Explore each venue’s amenities from their traditional casino
                  and electronic gaming options, to their drinking, dining and
                  entertainment options for a thrilling night out beyond
                  compare. Additionally with some casinos boasting live
                  entertainment, karaoke and themed nights, or hiring packages
                  for corporate meetings and private events. We have considered
                  the best services and offers so you can truly enjoy the best
                  casino experiences across the United Kingdom, let alone
                  worldwide.
                </p>
              </div>
            </article>

            <article
              class="flex flex-wrap gap-x-4 justify-around items-center w-full sm:gap-6 md:gap-8 lg:gap-10 xl:gap-16 lg:w-3/12 lg:h-[500px] relative"
            >
              <img
                src="/public/assets/jackpot.webp"
                class="object-cover h-full max-h-[250px] lg:min-h-full w-full rounded-lg"
                alt="Casino gameplay"
                title="Casino gameplay"
              />

              <div
                class="p-1.5 absolute -bottom-0.5 bg-white -right-0.5 rounded-tl-lg"
              >
                <a
                  href="#top-10-section"
                  class="flex gap-2 items-center rounded-xl border-2 w-fit border-red py-1 px-2 bg-white"
                >
                  <span class="font-light text-sm">Casino Destinations</span>
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDIxMTFCIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy40NyA1LjQ3YS43NS43NSAwIDAgMSAxLjA2IDBsNiA2YS43NS43NSAwIDAgMSAwIDEuMDZsLTYgNmEuNzUuNzUgMCAxIDEtMS4wNi0xLjA2bDQuNzItNC43Mkg0YS43NS43NSAwIDAgMSAwLTEuNWgxNC4xOWwtNC43Mi00LjcyYS43NS43NSAwIDAgMSAwLTEuMDYiIGNsaXAtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg=="
                    class="size-4 object-contain"
                    alt=""
                  />
                </a>
              </div>
            </article>
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

customElements.define("hitjackpot-section", HitJackpot);
