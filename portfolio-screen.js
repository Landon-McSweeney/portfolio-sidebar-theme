import { html, css, LitElement } from "lit";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";

export class PortfolioScreen extends DDD(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      id: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.title = "";
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          min-height: 100vh;
          padding: var(--ddd-spacing-4, 2rem);
          box-sizing: border-box;
        }

        h1 {
          font-size: var(--ddd-font-size-xxxl, 2.5rem);
          margin-bottom: var(--ddd-spacing-2, 1rem);
        }
      `,
    ];
  }

  render() {
    return html`
      <section>
        <h1>${this.title}</h1>
        <slot></slot>
      </section>
    `;
  }
}

customElements.define("portfolio-screen", PortfolioScreen);
