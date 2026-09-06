type RenderListener = () => void;

const listeners = new Set<RenderListener>();

export function registerRenderListener(listener: RenderListener): void {
  listeners.add(listener);
}

export function unregisterRenderListener(listener: RenderListener): void {
  listeners.delete(listener);
}

export function renderAll(): void {
  for (const listener of listeners) {
    listener();
  }
}
