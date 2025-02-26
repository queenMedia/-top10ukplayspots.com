class WhyChoose extends HTMLElement {
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
              Why choose
              <span class="font-medium">our top 10?</span>
            </h2>

            <ul class="flex flex-col gap-4 font-Poppins">
              <li class="flex flex-col gap-4 ">
                <h5 class="text-lg text-red xl:text-xl xl:font-light">
                  The know-how behind our casino curatorship.
                </h5>
                <p class="xl:text-lg xl:font-light">
                  Currently it is quite easy to get lost through tons of search
                  results when looking for trusted information to nail the right
                  choice for your leisure.  If you are looking for the right
                  choices for a brilliant night out, or if you are considering
                  options when you visit the UK, this is the right hub to narrow
                  down your options and find the top casinos worth visiting.
                </p>
                <p class="xl:text-lg xl:font-light">
                  <span class="font-medium">top10ukplayspots.com</span>
                  is meant to ease your entertainment experience with a
                  comprehensive ranking of the top brick-and-mortar casinos in
                  the country. Labelling these venues that way, to differ from
                  those casinos that may be virtual or online. We offer you real
                  places that you can enjoy in person in several cities from the
                  United Kingdom.
                </p>
                <p class="xl:text-lg xl:font-light">
                  Our platform includes different English and Scottish locations
                  from the capital city of London town, all the way through the
                  Midlands, Manchester, Ayr, Leeds, Brighton, Newcastle and
                  more, to offer a diverse range of the top casinos available.
                  Furthermore, our ranking includes information from reliable
                  frequent casino guest reviews, and the aid of expert
                  croupiers, professional dealers, event managers, and
                  connoisseurs in the industry, ensuring that you get the best
                  insights just for you.
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

customElements.define("why-choose-section", WhyChoose);
