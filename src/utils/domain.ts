const clientDomain = process.env.REACT_APP_POPPY_CLIENT_DOMAIN ??
  (window as any).POPPY_CLIENT_DOMAIN ??
  window.location.host;

export function getClientDomain() {
  return clientDomain;
}
