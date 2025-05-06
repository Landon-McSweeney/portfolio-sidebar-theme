import { html, css, LitElement } from 'lit';

export class PortfolioSidebarTheme extends LitElement {
  static get tag() {
    return 'portfolio-sidebar-theme';
  }

  static styles = css`
    :host {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    nav {
      width: 100px;
      background-color: #2d3e50;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3rem;
      color: white;
      padding-top: 2rem;
    }

    main {
      flex: 1;
      overflow-y: auto;
      scroll-behavior: smooth;
      position: relative;
    }

    button {
      background: none;
      border: none;
      color: inherit;
      font: inherit;
      cursor: pointer;
      writing-mode: vertical-rl;
      text-orientation: upright;
      letter-spacing: 0.1em;
      font-size: 0.8rem;
      padding: 0;
    }

    button:focus {
      outline: 2px solid white;
      outline-offset: 2px;
    }

    #scrollToTop {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      background-color: #4392f1;
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 30px;
      font-size: 1rem;
      cursor: pointer;
      display: none;
    }
  `;

  constructor() {
    super();
    this.sections = ['about', 'cv', 'research', 'contact', 'extra'];
  }

  firstUpdated() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      this.scrollToSection(hash);
    }
    const scrollBtn = this.shadowRoot.getElementById('scrollToTop');
    const mainSlot = this.shadowRoot.querySelector('main');

    if (scrollBtn && mainSlot) {
      mainSlot.addEventListener('scroll', () => {
        scrollBtn.style.display = mainSlot.scrollTop > 300 ? 'block' : 'none';
      });

      scrollBtn.addEventListener('click', () => {
        mainSlot.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  scrollToSection(id) {
    const el = this.renderRoot.querySelector(`#${id}`) || document.getElementById(id);
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
            <button @click="${() => this.scrollToSection(section)}">${section.toUpperCase()}</button>
          `
        )}
      </nav>
      <main>
        <slot></slot>
        <button id="scrollToTop" title="Back to Top">↑ Top</button>
      </main>
    `;
  }
}

customElements.define(PortfolioSidebarTheme.tag, PortfolioSidebarTheme);
