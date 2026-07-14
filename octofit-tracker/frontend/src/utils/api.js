const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim();

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const buildApiUrl = (resource) => {
  const normalizedResource = resource.replace(/^\/+|\/+$/g, '');
  return `${getApiBaseUrl()}/api/${normalizedResource}/`;
};

export const getResourceItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};
