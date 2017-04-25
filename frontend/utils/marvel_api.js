

export const fetchAllHeros = (offset) => {
  return $.ajax({
    method: "GET",
    url: `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&limit=100&apikey=0069141e778cf08cbc7d97b4523a5239&ts=1&hash=b10880b9618b3cfe906b5304a59f8e03`,
  })
}





// naumov78: {
//   "apikey": "0069141e778cf08cbc7d97b4523a5239",
//   "ts": "1",
//   "hash": "b10880b9618b3cfe906b5304a59f8e03"
// url: `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&limit=100&apikey=0069141e778cf08cbc7d97b4523a5239&ts=1&hash=b10880b9618b3cfe906b5304a59f8e03`,
// }


// boby1

// apikey: "9bbc22241752cadb6d8f668e23e12f0a",
// private_key: "c60ced62f86f24d397b1b095a89815557aeb9711",
// hash: "4c21168ee62a605aef761e4156d48f3f"
// url: `https://gateway.marvel.com:443/v1/public/characters?offset=${offset}&limit=100&apikey=9bbc22241752cadb6d8f668e23e12f0a&ts=1&hash=4c21168ee62a605aef761e4156d48f3f`,
