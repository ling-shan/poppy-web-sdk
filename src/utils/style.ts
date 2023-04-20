import { StyleBundle } from "../data/Style";

export function hasCustomizedStyles() {
  return !!window.document.getElementById('poppy-themes');
}

export function insertCustomizedStyles(styleBundle: StyleBundle) {
  if (hasCustomizedStyles()) {
    return;
  }
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
  styleElement.id = 'poppy-themes';
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
