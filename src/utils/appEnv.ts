import urlSearchParams from "./urlSearchParams"
import { isWebModule } from "./webModuleProvider"

interface AppENV {
  prod: boolean
  test: boolean
  dev: boolean
  debug: boolean
  mock: boolean
  webModule: boolean
}

const appENV = (() => {
  return {
    prod: process.env.NODE_ENV === 'production',
    test: process.env.NODE_ENV === 'test',
    dev: process.env.NODE_ENV === 'development',
    debug: urlSearchParams.has('debug'),
    mock: urlSearchParams.has('mock'),
    webModule: isWebModule(),
  } as AppENV;
})();

export default appENV;
