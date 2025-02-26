class Wrapper extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const tailwindCDN = document.createElement("link");
    tailwindCDN.rel = "stylesheet";
    tailwindCDN.href = "/public/styles/output.css";
    shadow.appendChild(tailwindCDN);

    this.wrapper = document.createElement("div");
    this.wrapper.className =
      "sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-3 sm:px-6 md:px-8 lg:px-10 text-white text-center bg-red-800";

    const slot = document.createElement("slot");
    this.wrapper.appendChild(slot);

    shadow.appendChild(this.wrapper);
  }

  static get observedAttributes() {
    return ["moreclasses"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "moreclasses") {
      this.updateClasses(newValue);
    }
  }

  updateClasses(newClasses) {
    const baseClasses =
      "sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1300px] w-full px-3 sm:px-6 md:px-8 lg:px-10 text-white text-center";
    this.wrapper.className = `${baseClasses} ${newClasses || ""}`;
  }
}

customElements.define("wrapper-component", Wrapper);
