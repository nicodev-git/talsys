export const getURLWithQueryParams = (base, params) => {
  const query = Object
    .entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
    
  return `${base}?${query}`
}


export const queryToObject = queryString => {
  const pairsString = queryString[0] === '?' ? queryString.slice(1) : queryString
  const pairs = pairsString
    .split('&')
    .map(str => str.split('=').map(decodeURIComponent))
  return pairs.reduce((acc, [key, value]) => key ? { ...acc, [key]: value } : acc, {})
}