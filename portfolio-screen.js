import { html, css, LitElement } from 'lit';
import { DDD } from '@haxtheweb/d-d-d/ddd.js';

export class PortfolioScreen extends DDD(LitElement) {
  static get tag() {
    return 'portfolio-screen';
  }

  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          height: 100vh;
          padding: 2rem;
          box-sizing: border-box;
        }
      `
    ];
  }

  constructor() {
    super();
    this.title = '';
  }

  render() {
    return html`
      <section>
        <slot></slot>
      </section>
    `;
  }
}

customElements.define(PortfolioScreen.tag, PortfolioScreen);
