class Partners extends HTMLElement {
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
          <div class="flex flex-col gap-6 w-full">
            <h2
              class="font-light font-Forma text-3xl lg:text-3xl xl:text-4xl text-center"
            >
              Our UK
              <span class="font-medium">Casino Partners</span>
            </h2>

            <article
              class="flex flex-wrap gap-x-4 justify-around items-center w-full sm:gap-6 md:gap-8 lg:gap-10 xl:gap-16 xl:justify-between"
            >
              <img
                src="/public/assets/partners/1.webp"
                class="size-12 object-contain xl:size-16"
                alt="Grosvenor Casino logo"
                title="Grosvenor Casino logo"
              />
              <img
                src="/public/assets/partners/2.webp"
                class="size-28 object-contain xl:size-32"
                alt="Genting Casino logotype"
                title="Genting Casino logotype"
              />
              <img
                src="/public/assets/partners/3.webp"
                class="size-20 object-contain xl:size-24"
                alt="Alea Casino logo"
                title="Alea Casino logo"
              />
              <img
                src="/public/assets/partners/4.webp"
                class="size-28 object-contain xl:size-32"
                alt="Napoleons casinos logotype"
                title="Napoleons casinos logotype"
              />
              <img
                src="/public/assets/partners/5.webp"
                class="size-28 object-contain xl:size-32"
                alt="Metropolitan Gaming Group logo"
                title="Metropolitan Gaming Group logo"
              />
              <img
                src="/public/assets/partners/6.webp"
                class="size-28 object-contain xl:size-32"
                alt="The Hippodrome Casino logo"
                title="The Hippodrome Casino logo"
              />
              <img
                src="/public/assets/partners/7.webp"
                class="size-28 object-contain xl:size-32"
                alt="Les Ambassadeurs logo"
                title="Les Ambassadeurs logo"
              />
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

customElements.define("partners-section", Partners);
