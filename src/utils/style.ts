import { StyleBundle } from "../data/Style";

export function hasCustomizedStyles() {
  return !!window.document.getElementById('poppy-themes');
}

export function getCustomizedStyleBundle() {
  const styleBundleEle = document.getElementById("poppy-themes");
  if (styleBundleEle) {
    try {
      const styleBundleJson = JSON.parse(styleBundleEle.innerText);
      return styleBundleJson;
    // eslint-disable-next-line no-empty
    } catch (err) {
    }
  }
  return null;
}

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
