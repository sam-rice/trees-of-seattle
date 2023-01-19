const rootServerURL: string = "https://radiant-harbor-65607.herokuapp.com/v1/trees"

export const fetchAllTrees = () => {
  return fetch(rootServerURL)
}

export const getCoordinates = (query: string) => {
  return fetch(`https://api.geoapify.com/v1/geocode/search?text=${query}%20Seattle%20WA%20USA&apiKey=18e7ab79ca46494ab3da1a3f545a4cc2`)
}

export const postTree = (settings: any) => {
  return fetch(rootServerURL, settings)
}