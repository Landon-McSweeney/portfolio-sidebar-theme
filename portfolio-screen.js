import { html, css, LitElement } from 'lit';

export class PortfolioScreen extends LitElement {
  static get tag() {
    return 'portfolio-screen';
  }

  static styles = css`
    :host {
      display: block;
      height: 100vh;
      box-sizing: border-box;
      padding: 0;
    }
  `;

  render() {
    return html`<slot></slot>`;
  }
}

customElements.define(PortfolioScreen.tag, PortfolioScreen);
