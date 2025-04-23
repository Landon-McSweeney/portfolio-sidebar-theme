import { html, css, LitElement } from 'lit';

class WaveDivider extends LitElement {
  static styles = css`
    svg {
      width: 100%;
      display: block;
      height: auto;
    }
  `;

  render() {
    return html`
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path fill="#4392f1" d="M0,64L1440,0L1440,120L0,120Z"></path>
      </svg>
    `;
  }
}

customElements.define('wave-divider', WaveDivider);
