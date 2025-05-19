export const tweetsOptions = {
  method: 'GET',
	port: null,
	path: '/search.php?query=cybertruck&search_type=Top',
	headers: {
    'x-rapidapi-key': 'd1a1a89a41mshc931911f5a33f7ap1d858bjsnfc9774e20f81',
    'x-rapidapi-host': 'twitter-api45.p.rapidapi.com',
  }
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};