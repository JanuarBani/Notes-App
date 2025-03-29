class Footer extends HTMLElement {
  static get observedAttributes() {
    return ["footer-text", "footer-link"];
  }

  constructor() {
    super();
    this._style = document.createElement("style");
    this.attachShadow({ mode: "open" });
  }

  // Atribut footer-text
  set footerText(value) {
    const hasChange = this.getAttribute("footer-text") !== value;
    if (hasChange) {
      this.setAttribute("footer-text", value);
    }
  }

  get footerText() {
    return this.getAttribute("footer-text") || "Default Footer Text";
  }

  // Atribut footer-link
  set footerLink(value) {
    const hasChange = this.getAttribute("footer-link") !== value;
    if (hasChange) {
      this.setAttribute("footer-link", value);
    }
  }

  get footerLink() {
    return this.getAttribute("footer-link") || "https://www.dbs.com.sg";
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
        .footer {
          background-color: rgba(248, 248, 248, 0.8);
          backdrop-filter: blur(8px);
          text-align: center;
          font-size: 14px;
          color: black;
          border-top: 1px solid #e0e0e0;
          padding: 20px 0;
          position: absolute;
          width: 100%;
          left: 0;
        }
    
        .footer a {
          color: #4caf50;
          text-decoration: none;
        }
    
        .footer a:hover {
          text-decoration: underline;
        }
    
        @media (max-width: 768px) {
          .footer {
            font-size: 12px;
            padding: 10px 0;
          }
    
          .footer a {
            font-size: 12px;
          }
        }
    
        @media (max-width: 480px) {
          .footer {
            font-size: 10px; 
            padding: 8px 0;  
          }
    
          .footer a {
            font-size: 10px; 
          }
        }

        @media (min-width: 769px) {
          body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .footer {
            font-size: 16px; 
            padding: 15px 0;
          }

          .footer a {
            font-size: 14px;
          }
        }
      `;
  }

  render() {
    this.updateStyle();
    if (!this.shadowRoot.querySelector("style")) {
      this.shadowRoot.appendChild(this._style);
    }

    if (!this.shadowRoot.querySelector("footer")) {
      this.shadowRoot.innerHTML += `
          <footer class="footer">
            <p>${this.footerText} <a href="${this.footerLink}" target="_blank" rel="noopener noreferrer">Coding Camp Powered by DBS Foundation</a></p>
          </footer>
        `;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "footer-text" || name === "footer-link") {
      this.render();
    }
  }
}

customElements.define("footer-element", Footer);
