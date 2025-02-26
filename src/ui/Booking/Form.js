class BookingFormElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.wrapper = document.createElement("section");
    this.wrapper.id = "booking-form-test";
    this.wrapper.classList.add(
      "section-animation",
      "w-full",
      "flex",
      "justify-center"
    );
    this.shadow.appendChild(this.wrapper);

    // Estado inicial
    this.countryInfo = {
      flag: "https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/GB.svg",
      callingCode: "+44",
    };
    this.selectedDates = "";
    this.guests = 1;
    this.rooms = 1;

    // Bindings
    this.handleGuestsDropdown = this.handleGuestsDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.updateGuestsAndRooms = this.updateGuestsAndRooms.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.wrapper.addEventListener("submit", (event) => {
      if (event.target.id === "bookingForm") {
        this.handleSubmit(event);
      }
    });

    this.loadExternalResources();
    this.setupStyles();
    this.fetchUserLocation();
  }

  loadExternalResources() {
    const iziToastCSS = document.createElement("link");
    iziToastCSS.rel = "stylesheet";
    iziToastCSS.href =
      "https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/css/iziToast.min.css";
    document.head.appendChild(iziToastCSS);

    const iziToastScript = document.createElement("script");
    iziToastScript.src =
      "https://cdnjs.cloudflare.com/ajax/libs/izitoast/1.4.0/js/iziToast.min.js";
    document.head.appendChild(iziToastScript);

    iziToastScript.onload = () => {
      window.iziToast.settings({
        timeout: 3000,
        position: "topRight",
      });
    };
  }

  connectedCallback() {
    const form = this.shadow.querySelector("#bookingForm");
    if (form) {
      form.removeEventListener("submit", this.handleSubmit);
      form.addEventListener("submit", this.handleSubmit);

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.handleSubmit(e);
        });
      }
    }
  }
  handleSubmit(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const form = this.shadow.querySelector("#bookingForm");
    if (!form) {
      console.error("Formulario no encontrado");
      return;
    }

    let isValid = true;
    const inputs = form.querySelectorAll("input, select");

    inputs.forEach((input) => {
      input.classList.remove("error");

      if (
        input.name === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
      ) {
        isValid = false;
        input.classList.add("error");
        iziToast.warning({
          message: "Invalid email address",
          position: "topRight",
        });
      }

      if (
        input.name === "firstName" &&
        (input.value.length < 3 || input.value.length > 50)
      ) {
        isValid = false;
        input.classList.add("error");
        iziToast.warning({
          message: "First name must be between 3 and 50 characters",
          position: "topRight",
        });
      }

      // Last name validation
      if (
        input.name === "lastName" &&
        (input.value.length < 3 || input.value.length > 60)
      ) {
        isValid = false;
        input.classList.add("error");
        iziToast.warning({
          message: "Last name must be between 3 and 60 characters",
          position: "topRight",
        });
      }

      // Phone validation
      if (input.name === "phone" && !/^\+\d[\d\s()-]{3,}$/.test(input.value)) {
        isValid = false;
        input.classList.add("error");
        iziToast.warning({
          message: "Invalid phone number",
          position: "topRight",
        });
      }

      if (input.name === "check-in" || input.name === "check-out") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkInDate = new Date(
          form.querySelector('input[name="check-in"]').value
        );
        const checkOutDate = new Date(
          form.querySelector('input[name="check-out"]').value
        );

        if (!checkInDate.getTime() || !checkOutDate.getTime()) {
          isValid = false;
          input.classList.add("error");
          iziToast.warning({
            message: "Please select both check-in and check-out dates",
            position: "topRight",
          });
        } else if (checkOutDate <= checkInDate) {
          isValid = false;
          input.classList.add("error");
          iziToast.warning({
            message: "Check-out date must be after check-in date",
            position: "topRight",
          });
        } else if (checkInDate < today) {
          isValid = false;
          input.classList.add("error");
          iziToast.warning({
            message: "Check-in date cannot be in the past",
            position: "topRight",
          });
        }
      }

      if (input.name === "hotel" && !input.value) {
        isValid = false;
        input.classList.add("error");
        iziToast.warning({
          message: "Please select a casino",
          position: "topRight",
        });
      }

      // Package validation
      if (input.name === "package" && !input.value) {
        isValid = false;
        input.classList.add("error");
        iziToast.warning({
          message: "Please select a package",
          position: "topRight",
        });
      }

      // Guests and rooms validation
      if (input.name === "guests") {
        const guests = parseInt(input.value);
        const rooms = parseInt(form.querySelector("#rooms").value);
        if (guests < 1) {
          isValid = false;
          input.classList.add("error");
          iziToast.warning({
            message: "There must be at least 1 guest",
            position: "topRight",
          });
        } else if (guests > rooms * 4) {
          isValid = false;
          input.classList.add("error");
          iziToast.warning({
            message: `Number of guests cannot exceed ${
              rooms * 4
            } for ${rooms} room(s)`,
            position: "topRight",
          });
        }
      }
    });

    if (isValid) {
      this.sendForm();
    }
  }

  async fetchUserLocation() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      this.countryInfo = {
        flag: `https://cdn.jsdelivr.net/npm/country-flag-icons/3x2/${data.country_code}.svg`,
        callingCode: data.country_calling_code,
      };

      this.updatePhoneInputs();
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  }

  updatePhoneInputs() {
    const phoneInputContainers = this.shadow.querySelectorAll(
      ".phone-input-container"
    );
    phoneInputContainers.forEach((container) => {
      const flagImg = container.querySelector("img");
      const phoneInput = container.querySelector('input[type="tel"]');

      if (flagImg) {
        flagImg.src = this.countryInfo.flag;
        flagImg.alt = `Country flag`;
      }

      if (phoneInput) {
        phoneInput.value = this.countryInfo.callingCode;
      }
    });
  }

  async sendForm() {
    const GOOGLE_ENPOINT =
      "https://script.google.com/macros/s/AKfycbw_ne9kCw0MCn12vGH4h6IN1kAyqksryk1c2vVuiXn7RteUMDRkvgYtDRu6kBXBZHEU/exec";

    const form = this.shadow.querySelector("#bookingForm");
    const submitBtn = this.shadow.querySelector("#submitButton");

    submitBtn.disabled = true;

    submitBtn.innerHTML = `
         <div
                    class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  ></div>
      `;

    const formData = new FormData(form);

    try {
      const params = new URLSearchParams();
      formData.forEach((value, key) => {
        params.append(key, value);
      });

      const response = await fetch(GOOGLE_ENPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (response.ok) {
        iziToast.success({
          message: "Form submitted successfully",
          position: "topRight",
        });

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Submit";
          form.reset();
          window.location.href = "thank-you.html";
        }, 3000);
      } else {
        iziToast.warning({
          message: "Error submitting form",
          position: "topRight",
        });
      }
    } catch (error) {
      console.error("Error sending form:", error);
    }
  }

  initializeEvents() {
    const form = this.shadow.querySelector("#bookingForm");
    if (form) {
      form.removeEventListener("submit", this.handleSubmit);
      form.addEventListener("submit", this.handleSubmit);

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.handleSubmit(e);
        });
      }
    }

    const toggleButton = this.shadow.querySelector("#guests-toggle");
    const incrementButtons = this.shadow.querySelectorAll(".increment");
    const decrementButtons = this.shadow.querySelectorAll(".decrement");

    if (toggleButton) {
      toggleButton.addEventListener("click", this.handleGuestsDropdown);
      document.addEventListener("click", this.handleClickOutside);
    }

    incrementButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const type = e.target.closest(".counter").querySelector("input").id;
        this.updateGuestsAndRooms(type, "increment");
      });
    });

    decrementButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const type = e.target.closest(".counter").querySelector("input").id;
        this.updateGuestsAndRooms(type, "decrement");
      });
    });
  }

  handleGuestsDropdown(event) {
    event.stopPropagation();
    const dropdown = this.shadow.querySelector(".dropdown-section");
    if (dropdown.classList.contains("hidden")) {
      dropdown.classList.remove("hidden");
      dropdown.classList.add("slide-down");
    } else {
      dropdown.classList.add("hidden");
      dropdown.classList.remove("slide-down");
    }
  }

  handleClickOutside(event) {
    const dropdown = this.shadow.querySelector(".dropdown-section");
    const button = this.shadow.querySelector("#guests-toggle");

    if (
      dropdown &&
      !dropdown.contains(event.target) &&
      !button.contains(event.target)
    ) {
      dropdown.classList.add("hidden");
      dropdown.classList.remove("slide-down");
    }
  }

  updateGuestsAndRooms(type, operation) {
    if (type === "guests") {
      if (operation === "increment" && this.guests < 12) {
        this.guests++;
      } else if (operation === "decrement" && this.guests > 1) {
        this.guests--;
      }
    } else if (type === "rooms") {
      if (operation === "increment" && this.rooms < 4) {
        this.rooms++;
      } else if (operation === "decrement" && this.rooms > 1) {
        this.rooms--;
      }
    }

    const guestsInput = this.shadow.querySelector("#guests");
    const roomsInput = this.shadow.querySelector("#rooms");
    const guestsLabel = this.shadow.querySelector("#guests-label");

    if (guestsInput && roomsInput && guestsLabel) {
      guestsInput.value = this.guests;
      roomsInput.value = this.rooms;
      guestsLabel.textContent = `${this.guests} ${
        this.guests > 1 ? "Guests" : "Guest"
      } & ${this.rooms} ${this.rooms > 1 ? "Rooms" : "Room"}`;
    }
  }
  setupStyles() {
    this.addStyles("/public/styles/output.css");
    this.addStyles("/public/styles/globals.css");
  }

  addStyles(urlStyleSheet) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = urlStyleSheet;
    this.shadow.appendChild(link);
  }

  set bookingInfo({ casinoSelected, casinoName }) {
    const html = String.raw;
    this.wrapper.innerHTML = html`
      <style>
        :host {
          display: block;
          width: 100%;
        }
        .phone-input-container {
          display: flex;
          align-items: center;
        }
        .phone-input-container .flag-container {
          display: flex;
          align-items: center;
          padding: 0 12px;
          border-right: 1px solid #e5e7eb;
        }
        .phone-input-container img {
          width: 24px !important;
          height: 16px !important;
          object-fit: cover;
          display: block;
        }
        .dropdown-section {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1rem;
          margin-top: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 50;
        }
        .counter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0;
        }
        .counter input {
          border: none;
          width: 3rem;
          text-align: center;
          font-size: 1rem;
        }
        .counter button {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 9999px;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .counter button:hover {
          background: #e5e7eb;
        }
        .counter button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .hidden {
          display: none;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-down {
          animation: slideDown 0.2s ease forwards;
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1em;
          padding-right: 2.5rem;
        }
        .error {
          border-color: #ef4444 !important;
          background-color: #fef2f2 !important;
        }
      </style>
      <section
        class="sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-4 sm:px-6 md:px-8 lg:px-10"
      >
        <div
          class="w-full flex flex-col items-center justify-center lg:flex-row mt-[110px] font-Poppins py-8"
        >
          <article
            class="w-full rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl lg:w-2/12 h-full lg:h-[500px] overflow-hidden"
          >
            <img
              src="/public/assets/booking.webp"
              class="object-cover h-full w-full max-h-[250px] lg:min-h-full"
              alt="Casino roulette"
              title="Casino roulette"
            />
          </article>

          <article
            class="flex flex-col gap-8 rounded-t-xl px-6 pt-10 shadow-[-11px_11px_20px_-10px_#00000024] rounded-lg lg:w-10/12 -mt-36 lg:mt-0 relative z-40 bg-white"
          >
            <div class="flex flex-col gap-4">
              <h2 class="text-xl xl:text-2xl font-normal text-red">
                Book Now A Top-Notch UK Casino Visit!
              </h2>
              <p class="text-[#02111B] xl:font-light xl:text-lg">
                Select your top venue of choice. Choose your package and provide
                us with your contact details. One of our representatives will be
                in touch with you as soon as possible to confirm your booking
                for your next casino adventure.
              </p>
            </div>

            <form
              id="bookingForm"
              class="w-full max-w-[500px] lg:max-w-[1400px] p-2 lg:p-5 self-center"
              novalidate
            >
              <div>
                <div class="flex gap-1 items-center mb-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjMDAwMDAwIiBkPSJNNy41IDYuNUM3LjUgOC45ODEgOS41MTkgMTEgMTIgMTFzNC41LTIuMDE5IDQuNS00LjVTMTQuNDgxIDIgMTIgMlM3LjUgNC4wMTkgNy41IDYuNU0yMCAyMWgxdi0xYzAtMy44NTktMy4xNDEtNy03LTdoLTRjLTMuODYgMC03IDMuMTQxLTcgN3YxeiIvPjwvc3ZnPg=="
                    alt=""
                    class="size-5 object-contain"
                  />
                  <h2 class="text-lg text-start font-light">Contact Info</h2>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <input
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    class="w-full lg:col-span-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow"
                    required
                  />
                  <input
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    class="w-full lg:col-span-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow"
                    required
                  />
                  <div
                    class="phone-input-container w-full lg:col-span-4 flex border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div
                      class="flag-container flex items-center px-3 border-r border-gray-200 w-3/12 max-w-[50px] xl:w-1/6"
                    >
                      <img
                        src="${this.countryInfo.flag}"
                        alt="Country flag"
                        class="w-6 h-4 object-contain"
                      />
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      value="${this.countryInfo.callingCode}"
                      class="flex-1 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow text-gray-500 w-9/12 xl:w-5/6"
                      oninput="this.value = this.value.replace(/(?!^)+/g, '').replace(/[^0-9()+]/g, '');"
                      required
                    />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    class="w-full lg:col-span-8 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow"
                    required
                  />
                </div>
              </div>

              <div class="mt-8">
                <div class="flex gap-2 items-center mb-4">
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDE0MDggMTQwOCI+PHBhdGggZmlsbD0iIzAwMDAwMCIgZD0iTTEzNzYgMzJxNDQgNTIgMTIgMTQ4dC0xMDggMTcybC0xNjEgMTYxbDE2MCA2OTZxNSAxOS0xMiAzM2wtMTI4IDk2cS03IDYtMTkgNnEtNCAwLTctMXEtMTUtMy0yMS0xNkw4MTMgODE5bC0yNTkgMjU5bDUzIDE5NHE1IDE3LTggMzFsLTk2IDk2cS05IDktMjMgOWgtMnEtMTUtMi0yNC0xM2wtMTg5LTI1MkwxMyA5NTRxLTExLTctMTMtMjNxLTEtMTMgOS0yNWw5Ni05N3E5LTkgMjMtOXE2IDAgOCAxbDE5NCA1M2wyNTktMjU5TDgxIDMxNnEtMTQtOC0xNy0yNHEtMi0xNiA5LTI3bDEyOC0xMjhxMTQtMTMgMzAtOGw2NjUgMTU5bDE2MC0xNjBxNzYtNzYgMTcyLTEwOHQxNDggMTIiLz48L3N2Zz4="
                    alt=""
                    class="size-4 object-contain"
                  />
                  <h2 class="text-lg text-start font-light">
                    Booking Information
                  </h2>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <select
                    name="hotel"
                    class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white truncate pr-8"
                    required
                  >
                    <option value="" disabled selected>
                      ${casinoSelected || "Select destination"}
                    </option>
                    <option
                      value="Les_Ambassadeurs_Casino"
                      ${casinoSelected === "Les_Ambassadeurs_Casino"
                        ? "selected"
                        : ""}
                    >
                      Top Casino in Mayfair London, UK Les Ambassadeurs Casino
                    </option>

                    <option
                      value="Manchester235"
                      ${casinoSelected === "Manchester235" ? "selected" : ""}
                    >
                      Manchester235
                    </option>
                    <option
                      value="Grosvenor_Casino_The_Victoria"
                      ${casinoSelected === "Grosvenor_Casino_The_Victoria"
                        ? "selected"
                        : ""}
                    >
                      Top Established Casino in London, UK Grosvenor Casino The
                      Victoria
                    </option>
                    <option
                      value="Napoleons_Casino_Manchester"
                      ${casinoSelected === "Napoleons_Casino_Manchester"
                        ? "selected"
                        : ""}
                    >
                      Top Casino in the centre of Manchester, UK Napoleons
                      Casino Manchester
                    </option>
                    <option
                      value="Genting_Casino_Bournemouth"
                      ${casinoSelected === "Genting_Casino_Bournemouth"
                        ? "selected"
                        : ""}
                    >
                      Top Casino in Bournemouth, UK Genting Casino
                    </option>
                    <option
                      value="Aspers_Casino_Newcastle"
                      ${casinoSelected === "Aspers_Casino_Newcastle"
                        ? "selected"
                        : ""}
                    >
                      Top Casino in Newcastle, UK Aspers Casino
                    </option>
                    <option
                      value="Victoria_Gate_Casino"
                      ${casinoSelected === "Victoria_Gate_Casino"
                        ? "selected"
                        : ""}
                    >
                      Top Casino in Leeds, UK Victoria Gate Casino
                    </option>
                    <option
                      value="Shaftesbury_Casino_West_Bromwich"
                      ${casinoSelected === "Shaftesbury_Casino_West_Bromwich"
                        ? "selected"
                        : ""}
                    >
                      Top Casino in the Midlands, UK Shaftesbury Casino West
                      Bromwich
                    </option>
                    <option
                      value="Buzz_Bingo_and_the_Slots_Room_Brighton"
                      ${casinoSelected ===
                      "Buzz_Bingo_and_the_Slots_Room_Brighton"
                        ? "selected"
                        : ""}
                    >
                      Top Bingo Club in Brighton, UK Buzz Bingo and the Slots
                      Room
                    </option>
                    <option
                      value="Admiral_Casino_Ayr"
                      ${casinoSelected === "Admiral_Casino_Ayr"
                        ? "selected"
                        : ""}
                    >
                      Top Slot Venue in West Scotland, Admiral Casino Ayr
                    </option>
                  </select>

                  <div class="relative">
                    <button
                      type="button"
                      id="guests-toggle"
                      class="w-full px-4 py-3 rounded-lg border border-gray-200 text-left text-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow flex justify-between items-center"
                    >
                      <span id="guests-label">1 Guest & 1 Room</span>
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div class="dropdown-section hidden">
                      <div class="counter border-b border-gray-200 pb-3">
                        <label for="rooms" class="font-semibold">Rooms:</label>
                        <div class="flex items-center gap-4">
                          <button type="button" class="decrement">-</button>
                          <input
                            type="text"
                            id="rooms"
                            name="rooms"
                            value="1"
                            min="1"
                            max="4"
                            readonly
                          />
                          <button type="button" class="increment">+</button>
                        </div>
                      </div>
                      <div class="counter pt-3">
                        <label for="guests" class="font-semibold"
                          >Guests:</label
                        >
                        <div class="flex items-center gap-4">
                          <button type="button" class="decrement">-</button>
                          <input
                            type="text"
                            id="guests"
                            name="guests"
                            value="1"
                            min="1"
                            max="12"
                            readonly
                          />
                          <button type="button" class="increment">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
                <div class="flex flex-col gap-1 relative w-full lg:grid-cols-2">
                  <label
                    for="check-in"
                    class="absolute text-sm font-[300] -top-6"
                    >Check-in date:</label
                  >
                  <input
                    name="check-in"
                    type="date"
                    class="w-full lg:col-span-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow"
                    required
                  />
                </div>

                <div class="flex flex-col gap-1 relative mt-6 lg:mt-0">
                  <label
                    for="check-out"
                    class="absolute text-sm font-[300] -top-6"
                    >Check-out date:</label
                  >
                  <input
                    name="check-out"
                    type="date"
                    class="w-full lg:col-span-4 px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow"
                    required
                  />
                </div>
              </div>

              <div class="mt-4 mb-6 py-4 flex justify-end">
                <button
                  type="submit"
                  id="submitButton"
                  class="w-full max-w-[350px] gradient px-6 py-2 bg-red rounded-lg font-semibold text-white hover:scale-95 transition-all duration-200 flex gap-2 items-center justify-center"
                >
                  <span class="mt-1">Submit</span>
                  <img
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xLjg0NiA3LjE1MWEuNzUuNzUgMCAwIDAtLjIyOCAxLjM3Nmw2LjUxNyAzLjkxNWw2LjIyLTQuMzU1YS43NS43NSAwIDAgMSAuODYgMS4yMjlsLTYuMjIgNC4zNTVsMS40NSA3LjQ2M2EuNzUuNzUgMCAwIDAgMS4zNzIuMjU2TDIyLjc5MiAzLjk0YS43NS43NSAwIDAgMC0uNzkzLTEuMTMzeiIgY2xpcC1ydWxlPSJldmVub2RkIi8+PC9zdmc+"
                    class="size-5 object-contain"
                    alt="Send icon"
                  />
                </button>
              </div>
            </form>
          </article>
        </div>
      </section>
    `;

    setTimeout(() => {
      this.initializeEvents();
    }, 0);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleClickOutside);
    const form = this.shadow.querySelector("#bookingForm");
    if (form) {
      form.removeEventListener("submit", this.handleSubmit);
    }
  }
}

customElements.define("booking-form-element", BookingFormElement);
