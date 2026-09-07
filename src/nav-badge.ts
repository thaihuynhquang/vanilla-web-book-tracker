import { calculateProgress } from "./progress";

export function updateNavBadge(): void {
  const badge = document.getElementById("badge-overall-pct");
  if (badge) badge.textContent = `${Math.round(calculateProgress().overallPct)}%`;
}
