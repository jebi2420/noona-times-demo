const API_KEY = '3b7b6f23e8bc401fa30252d944a39d1f';
const getLatestNews = ()=>{
    const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    console.log("url: "+ url);
};
getLatestNews();

