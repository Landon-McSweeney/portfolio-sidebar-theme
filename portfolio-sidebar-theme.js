import { html, css, LitElement } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

export class PortfolioSidebarTheme extends DDD(LitElement) {
  static get properties() {
    return {
      currentScreen: { type: String },
    };
  }

  constructor() {
    super();
    this.currentScreen = "about";
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("hashchange", this._handleHashChange.bind(this));
    this._handleHashChange();
  }

  disconnectedCallback() {
    window.removeEventListener("hashchange", this._handleHashChange.bind(this));
    super.disconnectedCallback();
  }

  _handleHashChange() {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      this.currentScreen = hash;
      this._scrollToScreen(hash);
    }
  }

  _scrollToScreen(id) {
    const el = this.shadowRoot.querySelector(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  _scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  _handleSidebarClick(screen) {
    window.location.hash = screen;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          height: 100vh;
          overflow: hidden;
          --screen-padding: 2rem;
          font-family: var(--ddd-font-primary, sans-serif);
        }

        nav {
          width: 200px;
          background-color: var(--ddd-theme-default, #111);
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: var(--screen-padding);
        }

        nav button {
          margin: 0.5rem 0;
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          cursor: pointer;
          text-align: left;
        }

        nav button:hover {
          text-decoration: underline;
        }

        .screens {
          flex: 1;
          overflow-y: auto;
          scroll-behavior: smooth;
        }

        ::slotted(*) {
          min-height: 100vh;
          padding: var(--screen-padding);
        }
      `,
    ];
  }

  render() {
    return html`
      <nav>
        <button @click="${() => this._handleSidebarClick("about")}">About</button>
        <button @click="${() => this._handleSidebarClick("projects")}">Projects</button>
        <button @click="${() => this._handleSidebarClick("skills")}">Skills</button>
        <button @click="${() => this._handleSidebarClick("contact")}">Contact</button>
        <button @click="${() => this._handleSidebarClick("extra")}">Extra</button>
        <button @click="${this._scrollToTop}">↑ Top</button>
      </nav>
      <div class="screens">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define("portfolio-sidebar-theme", PortfolioSidebarTheme);
