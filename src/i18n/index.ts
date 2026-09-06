import { UI_STRINGS, type UIStringKey } from "./strings";
import { getLangState } from "../state/storage";

export function t(key: UIStringKey, params?: Record<string, string | number>): string {
  const lang = getLangState();
  let str: string = UI_STRINGS[lang][key] ?? UI_STRINGS.vi[key] ?? key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      str = str.replaceAll(`{${k}}`, String(v));
    }
  }
  return str;
}

export function plural(n: number, vi: string, enOne: string, enOther: string): string {
  const lang = getLangState();
  if (lang === "vi") return vi;
  return n === 1 ? enOne : enOther;
}
