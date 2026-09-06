import { registerRenderListener, unregisterRenderListener } from "../renderer";

export abstract class BookView extends HTMLElement {
  private boundRefresh = (): void => {
    if (!this.hidden) this.refresh();
  };

  connectedCallback(): void {
    registerRenderListener(this.boundRefresh);
    this.refresh();
  }

  disconnectedCallback(): void {
    unregisterRenderListener(this.boundRefresh);
  }

  abstract refresh(): void;
}
