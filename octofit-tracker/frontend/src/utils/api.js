export const getCodespaceName = () => {
  const envValue = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (envValue) {
    return envValue;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname || '';
    const codespaceMatch = hostname.match(/^([a-z0-9-]+)-(?:5173|8000)\.app\.github\.dev$/i);
    if (codespaceMatch) {
      return codespaceMatch[1];
    }
  }

  return '';
};

export const getApiBaseUrl = () => {
  const codespaceName = getCodespaceName();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const buildApiUrl = (resource) => {
  const normalizedResource = (resource || '').replace(/^\/+|\/+$/g, '');
  const baseUrl = getApiBaseUrl();

  if (!normalizedResource) {
    return `${baseUrl}/api/`;
  }

  return `${baseUrl}/api/${normalizedResource}/`;
};

export const getResourceItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  if (Array.isArray(payload.items)) {
    return payload.items;
  }

  if (Array.isArray(payload.results)) {
    return payload.results;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload.data && Array.isArray(payload.data.items)) {
    return payload.data.items;
  }

  if (payload.data && Array.isArray(payload.data.results)) {
    return payload.data.results;
  }

  return [];
};
