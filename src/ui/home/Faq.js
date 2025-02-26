// First, create the AccordionItem component
class AccordionItem extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.isOpen = false;
  }

  static get observedAttributes() {
    return ["title"];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  addEventListeners() {
    const button = this.shadow.querySelector("button");
    button.addEventListener("click", () => {
      // Si el elemento actual está cerrado
      if (!this.isOpen) {
        // Cerrar todos los elementos
        const allAccordionItems =
          this.getRootNode().host.shadowRoot.querySelectorAll("accordion-item");
        allAccordionItems.forEach((item) => {
          if (item !== this && item.isOpen) {
            item.closeItem();
          }
        });

        // Abrir el elemento actual
        this.isOpen = true;
      } else {
        // Si el elemento actual está abierto, solo lo cerramos
        this.isOpen = false;
      }

      this.updateState();
    });
  }

  closeItem() {
    this.isOpen = false;
    this.updateState();
  }

  updateState() {
    const button = this.shadow.querySelector("button");
    const content = this.shadow.querySelector(".content");
    const arrow = this.shadow.querySelector(".arrow");

    if (this.isOpen) {
      content.style.maxHeight = `${content.scrollHeight}px`;
      button.classList.add("active");
      arrow.style.transform = "rotate(180deg)";
    } else {
      content.style.maxHeight = "0";
      button.classList.remove("active");
      arrow.style.transform = "rotate(0deg)";
    }
  }

  render() {
    const title = this.getAttribute("title") || "";

    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          margin-bottom: 1rem;
        }

        button {
          width: 100%;
          padding: 1rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #374151;
          font-size: 1.125rem;
          text-align: left;
          transition: all 0.3s ease;
        }

        button.active {
          color: #ef4444;
        }

        .arrow {
          width: 20px;
          height: 20px;
          transition: transform 0.3s ease;
          fill: currentColor;
        }

        .content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          padding: 0 2rem;
        }

        ::slotted(*) {
          margin: 1rem 0;
          color: #0F0F0F;
          font-size: 1rem;
          line-height: 1.5;
        }
      </style>

      <button>
        <svg class="arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
          <path fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M36 18L24 30L12 18" />
        </svg>
        <span>${title}</span>
      </button>

      <div class="content text-[#0F0F0F]">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("accordion-item", AccordionItem);

// Update the Faq component
class Faq extends HTMLElement {
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
      <section class="flex justify-center items-center mb-[50px] font-Poppins">
        <div
          class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10 h-full flex justify-center items-center"
        >
          <div class="flex flex-col gap-6 w-full">
            <h2
              class="font-light font-Forma text-3xl lg:text-3xl xl:text-4xl tracking-wider"
            >
              Keep in mind that before you explore our casino array, there's so
              much more amenities and details we include about this top casino
              ranking, including:
            </h2>
            <article class="flex flex-col w-full">
              <accordion-item title="Do casinos ask for an ID to access?">
                <p class="xl:text-lg">
                  Yes, you can learn to play traditional and electronic casino
                  games with the aid of each casinos’ croupiers and staff.
                </p>
              </accordion-item>

              <accordion-item title="What makes your ranking unique?">
                <p class="xl:text-lg">
                  Including the most detailed information from each casino, and
                  exclusive deals to book a visit to the top UK venues, we
                  provide you with unique options and opportunities you won’t
                  find anywhere else.
                </p>
              </accordion-item>

              <accordion-item
                title="Can I book a casino visit through your platform?"
              >
                <p class="xl:text-lg">
                  Certainly you can lock down our unique offers and make a
                  casino visit reservation through our website. It only takes
                  providing us your contact information, and one of our expert
                  representatives will contact you within 24 hours to confirm
                  your booking.
                </p>
              </accordion-item>

              <accordion-item
                title="What are the dress codes in the UK casinos?"
              >
                <p class="xl:text-lg">
                  Several venues welcome you with a smart casual dressing.
                  Still, top tier venues may call for a more formal attire. Feel
                  free to contact us if you have any questions about dress codes
                  at each casino.
                </p>
              </accordion-item>

              <accordion-item
                title="Is it required to become a member of the casinos?"
              >
                <p class="xl:text-lg">
                  Some casinos provide loyalty programmes as an optional
                  service, but not all of them require you to join to access
                  their venues. Those who do, offer an easy and quick process to
                  complete on site.
                </p>
              </accordion-item>

              <accordion-item title="Do all venues offer parking?">
                <p class="xl:text-lg">
                  Some casinos include parking facilities, whether those are
                  proprietary or external, but not all of them provide this
                  service. Please contact our 24/7 support staff to confirm
                  availability at each venue.
                </p>
              </accordion-item>

              <accordion-item
                title="Are all the traditional games available at the UK venues?"
              >
                <p class="xl:text-lg">
                  Some casinos include classic table games like Blackjack,
                  Roulette, Poker and more table games, just as the latest slot
                  machines and electronic games. Feel free to contact us to
                  confirm each venue gaming array.
                </p>
              </accordion-item>
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

customElements.define("faq-section", Faq);
