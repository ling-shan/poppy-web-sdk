/// <reference types="react-scripts" />

declare module "path-browserify"

declare module "*.module.css" {
  const content: Record<string, string>;
  export default content;
}
