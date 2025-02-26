class CardCasino extends HTMLElement {
  constructor() {
    super();
    this.state = {
      casino: null,
      isLoading: false,
      error: null,
      _cachedCasinos: null,
    };

    this.shadow = this.attachShadow({ mode: "open" });
    this.contentContainer = document.createElement("section");
    this.contentContainer.className = "casino-container";
    this._initializeComponent();
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.contentContainer.addEventListener("click", async (e) => {
      const composedPath = e.composedPath();
      const anchor = composedPath.find(
        (el) => el.tagName === "A" && el.href?.includes("#")
      );

      if (anchor) {
        e.preventDefault();
        const brickSection = document.querySelector("top-10-section");
        const shadowRoot = brickSection.shadowRoot;

        console.log(shadowRoot);

        const sectionId = anchor.getAttribute("href").replace("#", "");
        const targetSection = shadowRoot.getElementById(sectionId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  _initializeComponent() {
    this._addStyles("/public/styles/output.css");
    this.shadow.appendChild(this.contentContainer);
  }

  _addStyles(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    this.shadow.appendChild(link);
  }

  static get observedAttributes() {
    return [
      "index",
      "casino",
      "id",
      "bestFor",
      "features",
      "icon",
      "openDaily",
    ];
  }

  get icon() {
    return this.getAttribute("icon");
  }

  get index() {
    return parseInt(this.getAttribute("index"), 10);
  }

  get casino() {
    return this.getAttribute("casino");
  }

  get id() {
    return this.getAttribute("id");
  }

  get bestFor() {
    return this.getAttribute("bestFor");
  }

  get features() {
    return this.getAttribute("features");
  }

  get openDaily() {
    return this.getAttribute("openDaily");
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  async connectedCallback() {
    this.setState({
      casino: {
        icon: this.icon,
        index: this.index,
        casino: this.casino,
        id: this.id,
        bestFor: this.bestFor,
        features: this.features,
        openDaily: this.openDaily,
      },
    });

    const article = document.createElement("article");
    article.id = `casino-${this.id}`;
    article.className = "w-full bg-white";
    this.contentContainer.appendChild(article);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._shouldUpdate(oldValue, newValue)) {
      this.setState({
        casino: {
          ...this.state.casino,
          [name]: newValue,
        },
      });
    }
  }

  disconnectedCallback() {
    this.state._cachedCasinos = null;
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
    const { casino } = this.state;
    if (!casino) return "";

    return `
      <article class="bg-white rounded-lg shadow-lg p-4 mx-auto min-h-[320px] w-[300px] lg:w-[350px] font-Poppins hover:scale-[.98] transition-all duration-200">
        <div class="mb-6">
          <img src=${casino.icon} class="h-6 w-6 object-contain"> 
        </div>

        
        <h2 class="text-lg xl:text-xl mb-4 font-light">
          <span>${casino.index}.</span>
          ${casino.casino}
        </h2>

        
        <div class="space-y-1.5 mb-4 font-light text-md">
          <p class="text-[#0F0F0FBF]">${casino.bestFor}</p>
          <p class="text-[#0F0F0FBF]">${casino.features}</p>
          <p class="text-[#0F0F0FBF]">Open Daily ${casino.openDaily}</p>
        </div>

        
        <a href="#casino-${casino.id}" class="inline-flex items-center text-lg text-red transition-colors">
          Know More
          <svg class="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14m-7-7l7 7-7 7" />
          </svg>
        </a>
      </article>
    `;
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
    const template = isLoading
      ? this._getLoadingTemplate()
      : error
      ? this._getErrorTemplate()
      : this._getCasinoTemplate();

    this.contentContainer.innerHTML = template;
  }
}

customElements.define("casino-card", CardCasino);
