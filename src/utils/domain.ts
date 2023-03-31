const clientDomain = (() => {
  let defultDomainUrl = window.location.host + window.location.pathname;
  if (defultDomainUrl.endsWith('/')) {
    defultDomainUrl = defultDomainUrl.slice(0, -1);
  }

  return (process.env.REACT_APP_POPPY_CLIENT_DOMAIN ??
  (window as any).POPPY_CLIENT_DOMAIN ??
  defultDomainUrl) as string;
})();

export function getClientDomain() {
  return clientDomain;
}
