class TopCards extends HTMLElement {
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

      const response = await fetch("/data/casinoCards.json");

      const data = await response.json();

      for (const casino of data) {
        this.casinos.push({
          icon: casino.icon,
          index: casino.index,
          casino: casino.casino,
          id: casino.id,
          bestFor: casino.bestFor,
          features: casino.features,
          openDaily: casino.openDaily,
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
    return `
        <div class="flex justify-center w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-6 items-start justify-items-center">
            ${this.casinos
              .map(
                (currentCasino) => /*html*/ `
                  <casino-card
                    icon="${currentCasino.icon}"
                    id="${currentCasino.id}"
                    casino="${currentCasino.casino}"
                    index="${currentCasino.index}"
                    bestFor="${currentCasino.bestFor}"
                    features="${currentCasino.features}"
                    openDaily="${currentCasino.openDaily}"
                  ></casino-card>
                `
              )
              .join("")}
          </div>
        </div>  
      `;
  }

  render() {
    const content = /*html*/ `
            <section class="section-animation flex items-center justify-center">
              <div class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10">
                <div class="flex flex-col items-center w-full gap-12 md:gap-14 lg:gap-16 justify-center">
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
                            Dive into the
                            <span class="font-medium">Top 10 Brick-and-Mortar</span>
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

customElements.define("top-10-cards-section", TopCards);
