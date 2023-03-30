import { StyleBundle } from "../data/Style";

export function insertCustomizedStyles(styleBundle: StyleBundle) {
  const cssContent = Object.keys(styleBundle)
  .filter(key => {
    if (!key) {
      return false;
    }
    if (!styleBundle[key]) {
      return false
    }
    return true;
  })
  .map(key => {
    return `--${key}: ${styleBundle[key] ?? ''};`
  }).join('');
  const styleElement = window.document.createElement('style') as HTMLStyleElement;
  styleElement.innerText = `:root {${cssContent}}`;
  window.document.head.appendChild(styleElement);
}

/**
 *
 *
 *
 *
 *
 */
