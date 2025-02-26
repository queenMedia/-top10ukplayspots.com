class Footer extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    this.container = document.createElement("section");
    this.container.className = "section-animation flex justify-center";

    this.shadow.appendChild(this.container);

    this.setupStyles();
  }

  setupStyles() {
    this.addStyles("/public/styles/output.css");
    this.addStyles("/public/styles/globals.css");
  }

  addStyles(urlStyles) {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = urlStyles;
    this.shadow.appendChild(styles);
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const html = String.raw;
    this.container.innerHTML = html`
      <style>
        .footer-section {
          background-image: url("/public/assets/home/home-bg.webp");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      </style>

      <div class="w-full">
        <section class="flex items-center py-10 justify-center bg-[#02111B]">
          <div
            class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1400px] w-full px-3 sm:px-6 md:px-8 lg:px-10 relative"
          >
            <div
              class="flex flex-col lg:flex-row lg:justify-between lg:items-start items-center gap-10 font-Peridot"
            >
              <img
                src="/public/assets/footer/logo-footer.webp"
                class="absolute top-0 left-0 m-4 w-[150px] sm:w-[180px] md:w-[200px] xl:w-[250px] z-20"
                alt=""
              />
              <div class="flex flex-col gap-2 lg:w-3/12"></div>

              <div
                class="flex flex-col gap-6 text-white text-start font-light w-full lg:w-3/12"
              >
                <span class="font-bold">Company</span>
                <span>Name: Top 10 UK Play Spots</span>
                <span>
                  Email Address:
                  <a href="mailto:info@top10ukplayspots.com"
                    >info@top10ukplayspots.com</a
                  >
                </span>
                <span>
                  Support Email:
                  <a href="mailto:support@top10ukplayspots.com"
                    >support@top10ukplayspots.com</a
                  >
                </span>
                <span
                  >Address: Savile St E, Sheffield S4 7UQ, United Kingdom</span
                >
                <span>
                  Phone Number:
                  <a href="tel:+44 114 296 0099">+44 114 296 0099</a>
                </span>
              </div>

              <div
                class="flex flex-col gap-6 text-white w-full text-start font-light lg:w-2/12"
              >
                <span class="font-bold">Legals</span>
                <a href="terms-and-conditions.html">Terms and Conditions</a>
                <a href="privacy-policy.html">Privacy Policy</a>
                <a href="gambling-disclaimer.html">Gambling Disclaimer</a>
                <a href="contact-us.html">Contact Us</a>
                <a href="cookie-policy.html">Cookie Policy</a>
              </div>

              <div class="flex flex-col gap-6 w-full lg:w-3/12">
                <span class="font-bold text-white">Payments Methods</span>
                <div
                  class="grid grid-cols-3 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 gap-10 [&>img]:w-[67px]"
                >
                  <img
                    src="/public/assets/footer/amex-logo.webp"
                    alt="American Express logo"
                    title="American Express"
                    class="w-full"
                  />
                  <img
                    src="/public/assets/footer/apple-pay-logo.webp"
                    alt="Apple Pay logo"
                    title="Apple Pay"
                    class="w-full"
                  />
                  <img
                    src="/public/assets/footer/google-pay-logo.webp"
                    alt="Google Pay logo"
                    title="Google Pay"
                    class="w-full"
                  />
                  <img
                    src="/public/assets/footer/maestro-logo.webp"
                    alt="Maestro logo"
                    title="Maestro"
                    class="w-full"
                  />
                  <img
                    src="/public/assets/footer/mastercard-logo.webp"
                    alt="MasterCard logo"
                    title="MasterCard"
                    class="w-full"
                  />
                  <img
                    src="/public/assets/footer/visa-logo.webp"
                    alt="VISA logo"
                    title="VISA"
                    class="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="flex items-start py-10 justify-center bg-[#02111B]">
          <div
            class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1400px] w-full px-3 sm:px-6 md:px-8 lg:px-10"
          >
            <div
              class="flex flex-col w-full lg:flex-row lg:justify-between items-center lg:items-end gap-10"
            >
              <span class="w-full font-light text-right text-sm text-white"
                >2024 All rights reserved | Top 10 UK Play Spots</span
              >
            </div>
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define("footer-component", Footer);
