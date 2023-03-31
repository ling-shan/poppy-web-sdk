import browserifyPath from 'path-browserify'

export function normalize(path: string): string {
  return browserifyPath.normalize(path);
}

export function join(...paths:string[]): string {
  return browserifyPath.join(...paths);
}




