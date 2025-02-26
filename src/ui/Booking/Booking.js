class BookingPage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.casino = null;
    this.casinoName = null;
    this.error = false;
    this.isLoading = false;
    this.container = document.createElement("div");
    this.shadow.appendChild(this.container);
    this.setupStyles();
  }

  setupStyles() {
    const styles = document.createElement("link");
    styles.rel = "stylesheet";
    styles.href = "/public/styles/output.css";
    this.shadow.appendChild(styles);

    const customStyles = document.createElement("style");
    customStyles.textContent = `
              .loader {
                border: 4px solid #f3f3f3;
                border-radius: 50%;
                border-top: 4px solid #3498db;
                width: 40px;
                height: 40px;
                animation: spin 1s linear infinite;
              }
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `;
    this.shadow.appendChild(customStyles);
  }

  async connectedCallback() {
    await this.fetchBookingInfo();
  }

  async fetchBookingInfo() {
    try {
      this.isLoading = true;
      this.render();

      const urlParams = new URLSearchParams(window.location.search);
      const casinoID = urlParams.get("casino-id");
      const casinoName = urlParams.get("casino-name");

      if (!casinoID || !casinoName) {
        this.casino = "";
        this.casinoName = "";
      }

      this.casino = casinoID;
      this.casinoName = casinoName;
    } catch (error) {
      console.error("Error fetching booking info:", error);
      this.error = true;
      this.casino = null;
    } finally {
      this.isLoading = false;
      this.render();
    }
  }

  render() {
    const content = /*html*/ `
              <main class="flex flex-col items-center justify-center gap-4 overflow-x-hidden min-h-[85vh] py-12">
                ${
                  this.isLoading
                    ? /*html*/ `
                        <div class="flex justify-center items-center min-h-[400px]">
                            <div class="loader"></div>
                        </div>`
                    : this.error
                    ? /*html*/ `
                        <div class="flex justify-center items-center min-h-[400px]">
                            Error loading booking information
                        </div>`
                    : /*html*/ `
                      <booking-form-element></booking-form-element>`
                }
              </main>
            `;

    this.container.innerHTML = content;

    if (!this.isLoading && !this.error) {
      const bookingForm = this.container.querySelector("booking-form-element");

      if (bookingForm) {
        try {
          bookingForm.bookingInfo = {
            casinoSelected: this.casino,
            casinoName: this.casinoName,
          };
        } catch (error) {
          console.error("Error setting booking form info:", error);
          this.error = true;
          this.render();
        }
      }
    }
  }
}

customElements.define("booking-page", BookingPage);
