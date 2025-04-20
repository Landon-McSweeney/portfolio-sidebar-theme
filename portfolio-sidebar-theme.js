import { html, css, LitElement } from 'lit';
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

export class PortfolioSidebarTheme extends DDD(LitElement) {
  static get tag() {
    return 'portfolio-sidebar-theme';
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }

        nav {
          width: 80px;
          background-color: var(--ddd-theme-default-blue, #002a5c);
          color: white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding-top: 2rem;
        }

        main {
          flex: 1;
          overflow-y: auto;
          scroll-behavior: smooth;
        }

        button {
          background: none;
          border: none;
          color: white;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          cursor: pointer;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }

        #scrollTopBtn {
          position: fixed;
          bottom: 16px;
          right: 16px;
          z-index: 100;
          background-color: var(--ddd-theme-default-blue, #002a5c);
          color: white;
          border: none;
          padding: 10px 12px;
          border-radius: 50%;
          font-size: 1rem;
          cursor: pointer;
        }
      `
    ];
  }

  constructor() {
    super();
    this.sections = ['about', 'projects', 'skills', 'contact', 'extra'];
  }

  firstUpdated() {
    // Scroll to hash if present on load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      this.scrollToSection(hash);
    }
  }

  scrollToSection(id) {
    const el = this.renderRoot.querySelector(`#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.pushState(null, '', `#${id}`);
    }
  }

  render() {
    return html`
      <nav>
        ${this.sections.map(
          section => html`
            <button @click="${() => this.scrollToSection(section)}">
              ${section.toUpperCase()}
            </button>
          `
        )}
      </nav>
      <main>
        <slot></slot>
      </main>
      <button id="scrollTopBtn" @click="${() => this.scrollToSection(this.sections[0])}">↑</button>
    `;
  }
}

customElements.define(PortfolioSidebarTheme.tag, PortfolioSidebarTheme);
