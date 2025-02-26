class Services extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.wrapper = document.createElement("div");

    this.services = [
      {
        title: "World-class",
        description: "Restaurants and the finest cuisine services available.",
      },
      {
        title: "Relaxing",
        description: "And stylish bar lounges.",
      },
      {
        title: "Live shows, karaoke",
        description:
          "Nights, music tributes, casino tournaments, and more entertaining events at selected venues.",
      },
      {
        title: "Traditional casino",
        description: "games and live e-tables available at each casino.",
      },
      {
        title: "Loyalty",
        description:
          "Programmes for exclusive benefits available at most casinos.",
      },
    ];
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

  createServiceCard(service) {
    return `
        <article class="flex w-full max-w-md mb-4 pb-7 lg:pr-6 lg:flex-col font-Poppins">
          <div class="flex flex-row gap-4 w-5 lg:w-full lg:pb-4">
            <div class="h-[50px] pt-1.5 flex-col gap-2.5 border relative border-dashed border-[#e54e50] lg:hidden">
              <div class="w-5 h-5 bg-[#e54e50] rounded-[60px] absolute -right-2.5 -top-0.5"></div>
            </div>
             <div class="hidden w-full pt-1.5 flex-col gap-2.5 border-b relative border-dashed border-[#e54e50] lg:flex">
              <div class="w-5 h-5 bg-[#e54e50] rounded-[60px] absolute left-0 -top-0.5"></div>
            </div>
          </div>
          <div class="flex-1">
            <p class="font-bold text-lg lg:text-[22px]">${service.title}</p>
            <p class="text-sm lg:text-lg xl:font-light">${service.description}</p>
          </div>
        </article>
      `;
  }

  render() {
    const html = String.raw;

    this.wrapper.innerHTML = html`
      <style></style>
      <section
        class="flex justify-center items-center flex-col sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10 mx-auto font-Poppins"
      >
        <h2
          class="font-light font-Forma text-3xl lg:text-3xl xl:text-4xl text-center w-full pb-20"
        >
          <span class="font-medium">Services and Benefits</span>
          at our Casino Selection
        </h2>

        <div class="flex flex-col lg:flex-row justify-between">
          ${this.services
            .map((service) => this.createServiceCard(service))
            .join("")}
        </div>
        <p
          class="text-right text-[#02111b] text-xs font-normal font-['Poppins'] lg:text-base"
        >
          Offers won’t last forever, so make sure to secure your slot today for
          a memorable visit to the top casinos in the UK. Get an exclusive
          package by making your reservation with us.
        </p>
      </section>
    `;

    this.shadow.appendChild(this.wrapper);
  }

  connectedCallback() {
    this.addStyles();
    this.render();
  }
}

customElements.define("services-section", Services);
