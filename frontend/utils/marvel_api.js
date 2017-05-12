

export const fetchAllHeros = (offset) => {
  return $.ajax({
    method: "GET",
    url: `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&limit=100&apikey=0069141e778cf08cbc7d97b4523a5239&ts=1&hash=b10880b9618b3cfe906b5304a59f8e03`,
  })
}
