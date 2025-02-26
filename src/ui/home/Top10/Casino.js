class Casino extends HTMLElement {
  constructor() {
    super();
    this.state = {
      casino: null,
      isLoading: false,
      error: null,
      _cachedCasinos: null,
      currentMainImage: 0,
      gridImages: [1, 2, 3, 4],
    };

    this.shadow = this.attachShadow({ mode: "open" });
    this.contentContainer = document.createElement("section");
    this.contentContainer.className = "casino-container";
    this._initializeComponent();
    this._setupEventListeners();
  }

  _initializeComponent() {
    this._addStyles("/public/styles/output.css");
    this._addStyles("/public/styles/globals.css");

    this.shadow.appendChild(this.contentContainer);
  }

  _addStyles(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;

    const style = document.createElement("style");
    style.textContent = `
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .fade-in {
            animation: fadeIn 0.2s ease-in-out;
          }
          .image-transition {
            transition: all 0.2s ease-in-out;
          }
            
        `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(link);
  }

  _setupEventListeners() {
    this.contentContainer.addEventListener("click", (e) => {
      const thumbnailImg = e.target.closest(".thumbnail-img");
      if (thumbnailImg) {
        const gridPosition = parseInt(thumbnailImg.dataset.position, 10);
        this._swapImages(gridPosition);
      }
    });
  }

  _swapImages(gridPosition) {
    const newGridImages = [...this.state.gridImages];
    const oldMainIndex = this.state.currentMainImage;
    const clickedImageIndex = newGridImages[gridPosition];

    this.setState({
      currentMainImage: clickedImageIndex,
      gridImages: newGridImages.map((index) =>
        index === clickedImageIndex ? oldMainIndex : index
      ),
    });
  }

  static get observedAttributes() {
    return ["casino-id", "index", "casino-name"];
  }

  get casinoId() {
    return this.getAttribute("casino-id");
  }

  get index() {
    return parseInt(this.getAttribute("index"), 10);
  }

  get casinoName() {
    return this.getAttribute("casino-name");
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  async connectedCallback() {
    const article = document.createElement("article");

    article.className = "w-full bg-white";
    this.appendChild(article);

    await this.fetchCasino();
  }

  disconnectedCallback() {
    this.state._cachedCasinos = null;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this._shouldUpdate(oldValue, newValue)) {
      this.fetchCasino();
    }
  }

  _shouldUpdate(oldValue, newValue) {
    return oldValue !== null && newValue !== null && oldValue !== newValue;
  }

  _parseError(error) {
    if (error.name === "TypeError") {
      return "Connection error. Please check your internet connection.";
    }
    if (error instanceof Error) {
      return `Error loading casino: ${error.message}`;
    }
    return "An unexpected error occurred. Please try again.";
  }

  _getLoadingTemplate() {
    return `
          <div class="flex items-center justify-center">
            <div
              class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        `;
  }

  _getErrorTemplate() {
    return `
          <div class="text-red-500 p-4 rounded-lg bg-red-50 border border-red-200">
            <p class="font-medium">${this.state.error}</p>
          </div>
        `;
  }

  _getCasinoTemplate() {
    const { casino, currentMainImage, gridImages } = this.state;
    if (!casino) return "";

    return `
      <article id=${casino.info.id} class="w-full bg-white font-Poppins">
        <header class="text-start flex flex-col gap-5">
          <h2 class="font-light font-Forma text-xl xl:text-2xl mb-4 tracking-widest">
                <span>${this.index + 1}. ${
      casino.info.name.split("," || ".")[0]
    },</span>
                <span class="font-medium">${
                  casino.info.name.split("," || ".")[1]
                }</span>
          </h2>
        </header>

        <div class="flex flex-col lg:flex-row gap-4 xl:gap-6">
          <article class="casino-gallery flex flex-col gap-4 mb-8 lg:h-[500px] lg:w-5/12 xl:w-4/12">
            <div class="main-image w-full h-5/6">
              <img
                src=${casino.gallery[currentMainImage].url}
                alt="${casino.gallery[0].metadata}"
                title="${casino.gallery[0].metadata}"
                class="w-full h-full max-h-[250px] lg:min-h-full object-cover rounded-lg fade-in image-transition"
              />
            </div>

            <div class="thumbnails flex lg:grid grid-cols-4 gap-4 w-full h-1/6">
              ${gridImages
                .map(
                  (imageIndex, position) => `
                  <div class="aspect-square w-full h-full">
                    <img
                      src=${casino.gallery[imageIndex].url}
                      alt="${
                        casino.gallery[imageIndex].metadata ||
                        `Casino image ${imageIndex + 1}`
                      }"
                      title="${
                        casino.gallery[imageIndex].metadata ||
                        `Casino image ${imageIndex + 1}`
                      }"
                      data-position="${position}"
                      class="thumbnail-img w-full h-full object-cover rounded-lg hover:scale-95 hover:cursor-pointer transition-all duration-150 fade-in image-transition"
                    >
                  </div>
                `
                )
                .join("")}
            </div>

            <div class="pricing mt-4 mb-4 text-end">
              <p class="font-medium leading-snug text-xs xl:text-xs">
                <span class="font-light">Casino package pricing per person:</span>
                Starting at ${casino.info.pricing.starting}, and up to ${
      casino.info.pricing.upTo
    }.
              </p>
            </div>
          </article>

          <article class="casino-content lg:w-7/12 xl:w-8/12">
            <div class="features flex flex-col gap-3 mb-6">
              <h4 class="font-semibold lg:font-medium xl:text-lg text-start">Features:</h4>
              <ul class="text-start font-light xl:text-lg flex flex-col gap-3">
                ${casino.info.features
                  .map(
                    (feature) => `
                      <li class="flex gap-2 items-center">
                        <img src="/public/assets/clover.webp" class="size-3 mb-1 object-contain" />
                        <p class="text-start ml-2 leading-snug">${feature}</p>
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            </div>

            <div class="descriptions space-y-3">
              <h4 class="font-semibold lg:font-medium xl:text-lg text-start">Description:</h4>
              <p class="text-start font-light leading-snug xl:text-lg">${
                casino.info.descriptions.mainDescription
              }</p>
              <p class="text-start font-light leading-snug xl:text-lg">${
                casino.info.descriptions.secondDescription
              }</p>
            </div>

            <a
              href="booking.html?casino-id=${casino.info.id}&casino-name=${
      casino.info.name
    }"
              class="w-full gap-4 lg:w-max lg:gap-8 bg-red mt-4 hover:scale-[.98] transition-all duration-200 text-white py-2 px-2 rounded-lg text-start flex items-center justify-between font-medium xl:py-1 xl:px-4"
            >
              <span class="mt-0.5">${casino.info.cta}</span>
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTYuMTUgMTNINXEtLjQyNSAwLS43MTItLjI4OFQ0IDEydC4yODgtLjcxMlQ1IDExaDExLjE1TDEzLjMgOC4xNXEtLjMtLjMtLjI4OC0uN3QuMjg4LS43cS4zLS4zLjcxMy0uMzEydC43MTIuMjg3TDE5LjMgMTEuM3EuMTUuMTUuMjEzLjMyNXQuMDYyLjM3NXQtLjA2Mi4zNzV0LS4yMTMuMzI1bC00LjU3NSA0LjU3NXEtLjMuMy0uNzEyLjI4OHQtLjcxMy0uMzEzcS0uMjc1LS4zLS4yODgtLjd0LjI4OC0uN3oiLz48L3N2Zz4="
                class="size-6 object-contain"
              />
            </a>
          </article>
        </div>
      </article>
    `;
  }

  async fetchCasino() {
    try {
      this.setState({ isLoading: true, error: null });

      if (this.state._cachedCasinos) {
        const casino = this.state._cachedCasinos[this.index];
        if (casino) {
          this.setState({ casino, isLoading: false });
          return;
        }
      }

      const response = await fetch("/data/casinos.json");

      console.log("response", response);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const casinos = await response.json();

      if (this.index < 0 || this.index >= casinos.length) {
        throw new Error(
          `Casino index ${this.index} is out of range (0-${casinos.length - 1})`
        );
      }

      this.setState({
        casino: casinos[this.index],
        _cachedCasinos: casinos,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error: this._parseError(error),
        isLoading: false,
      });
      console.error("Error fetching casino:", error);
    }
  }

  handleCasinoSelect(casinoId) {
    const event = new CustomEvent("casino-selected", {
      detail: { casinoId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  render() {
    const { isLoading, error } = this.state;
    this.contentContainer.innerHTML = isLoading
      ? this._getLoadingTemplate()
      : error
      ? this._getErrorTemplate()
      : this._getCasinoTemplate();
  }
}

customElements.define("casino-component", Casino);
