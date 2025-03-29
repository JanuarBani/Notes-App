class Navbar extends HTMLElement {
  static get observedAttributes() {
    return ["logo-img", "logo-alt", "home-link", "about-link", "contact-link"];
  }

  constructor() {
    super();
    this._style = document.createElement("style");
  }

  connectedCallback() {
    this.render();
  }

  set logoImg(value) {
    const hasChange = this.logoImg != value;
    if (hasChange) {
      this.removeAttribute("logo-img");
    }
    this.setAttribute("logo-img", value);
  }

  get logoImg() {
    return this.getAttribute("logo-img");
  }

  set logoAlt(value) {
    const hasChange = this.logoAlt != value;
    if (hasChange) {
      this.removeAttribute("logo-alt");
    }
    this.setAttribute("logo-alt", value);
  }

  get logoAlt() {
    return this.getAttribute("logo-alt");
  }

  set homeLink(value) {
    const hasChange = this.homeLink != value;
    if (hasChange) {
      this.removeAttribute("home-link");
    }
    this.setAttribute("home-link", value);
  }

  get homeLink() {
    return this.getAttribute("home-link");
  }

  set aboutLink(value) {
    const hasChange = this.aboutLink != value;
    if (hasChange) {
      this.removeAttribute("about-link");
    }
    this.setAttribute("about-link", value);
  }

  get aboutLink() {
    return this.getAttribute("about-link");
  }

  set contactLink(value) {
    const hasChange = this.contactLink != value;
    if (hasChange) {
      this.removeAttribute("contact-link");
    }
    this.setAttribute("contact-link", value);
  }

  get contactLink() {
    return this.getAttribute("contact-link");
  }

  updateStyle() {
    this._style.textContent = `
      .navbar {
        position: sticky;
        top: 0;
        backdrop-filter: blur(15px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        width: 100%;
        z-index: 1000;
      }

      .logo {
        display: flex;
        align-items: center;
      }

      .navbar .logo {
        font-size: 24px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-decoration: none;
      }

      .navbar .logo img {
        height: 40px;
      }

      .navbar ul {
        display: flex;
        list-style: none;
      }

      .navbar ul li {
        margin: 0 15px;
      }

      .navbar ul li a {
        text-decoration: none;
        font-size: 18px;
        transition: color 0.3s;
      }

      .navbar ul li a:hover {
        color: #4caf50;
      }
    `;
  }

  render() {
    this.emptyContent();
    this.updateStyle();

    this.appendChild(this._style);
    this.innerHTML += `
      <header class="navbar">
        <a href="#" class="logo">
          <img src="${this.logoImg}" alt="${this.logoAlt}" />
          Notes
        </a>
        <nav>
          <ul>
            <li><a href="${this.homeLink}" id="home">Home</a></li>
            <li><a href="${this.aboutLink}" id="about">About</a></li>
            <li><a href="${this.contactLink}" id="contact">Contact</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  emptyContent() {
    this.innerHTML = "";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "logo-img" || name === "logo-alt" || name === "home-link" || name === "about-link" || name === "contact-link") {
      this.render();
    }
  }
}

customElements.define("navbar-element", Navbar);
