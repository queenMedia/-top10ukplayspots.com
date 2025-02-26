class Top10 extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.casinos = [];
    this.isLoading = false;
    this.error = null;

    this.container = document.createElement("div");
    this.shadow.appendChild(this.container);

    this.setupStyles();
  }

  setupStyles() {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = "/public/styles/output.css";
    this.shadow.appendChild(styles);
  }

  async connectedCallback() {
    await this.fetchCasinos();
  }

  async fetchCasinos() {
    try {
      this.isLoading = true;

      const response = await fetch("/data/casinos.json");

      const data = await response.json();

      for (const casino of data) {
        this.casinos.push({
          index: casino.index,
          casinoID: casino.info.id,
          casinoName: casino.info.name,
        });
      }
    } catch (err) {
      this.error = "Couldn't load casinos. Please try again later :(";
      console.error("Error fetching casinos:", err);
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  generateTop() {
    return this.casinos
      .map(
        (currentCasino, index) => /*html*/ `
          <style>
            div {
              scroll-margin-top: 120px;
            }
          </style>
            <div id="casino-${currentCasino.casinoID}">
              <casino-component casino-id=${currentCasino.casinoID} index=${index} casino-name=${currentCasino.casinoName}></casino-component>
            </div>
          `
      )
      .join("");
  }

  render() {
    const content = /*html*/ `
          <section class="flex items-center justify-center">
            <div class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10">
              <div class="flex flex-col items-center w-full gap-10 md:gap-10 lg:gap-14 xl:gap-16 justify-center">
                ${
                  this.isLoading
                    ? /*html*/ `
                        <div
                          class="m-12 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                          role="status"
                        >
                          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                        </div>
                      `
                    : this.error
                    ? /*html*/ `
                        <div class="text-red-500">${this.error}</div>
                      `
                    : /*html*/ `
                      <h2 class="font-light font-Forma text-3xl lg:text-3xl xl:text-4xl text-center w-full">
                            Dive Into
                            <span class="font-medium">The Top 10 Brick-And-Mortar</span>
                            UK Casinos
                      </h2>
                        ${this.generateTop()}
                      `
                }
              </div>
            </div>
          </section>
        `;

    this.container.innerHTML = content;
  }
}

customElements.define("top-10-section", Top10);
