class TheUniqueness extends HTMLElement {
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
      <style></style>

      <section class="flex justify-center items-center">
        <div
          class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10 h-full flex justify-center items-center"
        >
          <div class="flex flex-col items-center gap-6">
            <h2
              class="font-light font-Forma text-3xl lg:text-3xl xl:text-4xl text-start w-full"
            >
              <span class="font-medium">Explore The Uniqueness</span>
              Of Our casino Selection, Including:
            </h2>

            <ul class="flex flex-col gap-4 font-Poppins">
              <li class="flex flex-col gap-1">
                <h5 class="text-lg text-red xl:text-xl xl:font-light">
                  First-Rate Casinos
                </h5>
                <p class="xl:text-lg xl:font-light">
                  Our platform includes the most exclusive and top-notch venues
                  that offer traditional and the latest casino gaming choices,
                  prime dining restaurants, and other services to complete your
                  leisure experience such as live entertainment or private
                  hiring.
                </p>
              </li>

              <li class="flex flex-col gap-1">
                <h5 class="text-lg text-red xl:text-xl xl:font-light">
                  Personalized packages.
                </h5>
                <p class="xl:text-lg xl:font-light">
                  When you book a casino through our site, one of our dedicated
                  representatives will get back to you as soon as possible after
                  receiving your contact details, to fine-tune and confirm your
                  selection.
                </p>
              </li>

              <li class="flex flex-col gap-1">
                <h5 class="text-lg text-red xl:text-xl xl:font-light">
                  Round airport transportation.
                </h5>
                <p class="xl:text-lg xl:font-light">
                  When traveling from overseas or within the United Kingdom, our
                  packages may include transportation from the airport to the
                  casino, or the other way around.
                </p>
              </li>

              <li class="flex flex-col gap-1">
                <h5 class="text-lg text-red xl:text-xl xl:font-light">
                  Trusted sources.
                </h5>
                <p class="xl:text-lg xl:font-light">
                  Our casino ranking is dedicated to offer you trusted insights
                  regarding each venue with the aid of experts in the gaming
                  industry, and frequent guest reviews.
                </p>
              </li>

              <li class="flex flex-col gap-1">
                <h5 class="text-lg text-red xl:text-xl xl:font-light">
                  Quick tours.
                </h5>
                <p class="xl:text-lg xl:font-light">
                  Fancy to take a quick tour for each venue in person? We can
                  arrange a quick preview visit as an option for your
                  convenience. It only takes to make a reservation to schedule
                  it as part of our unique services.
                </p>
              </li>
            </ul>
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

customElements.define("the-uniqueness-section", TheUniqueness);
