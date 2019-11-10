const urlSearchParams =  window.location.search.slice(1).split('&').reduce( (p, c) => {
    const [key, value] = c.split('=')
    return {
      ...p,
      [key]: value
    }
  }, {})

export const MAP_API_KEY = urlSearchParams.mapApiKey || window.localStorage.getItem('mapApiKey') || '' // should be moved to BE
export const BACKEND_API_ENDPOINT = urlSearchParams.apiEndpoint || window.localStorage.getItem('apiEndpoint') || 'https://please-set-api-endpoint-by-setting-localStorage-with-key-apiEndpoint'
export const CSS_MOBILE_BREAKPOINT = 700