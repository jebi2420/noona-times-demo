
const API_KEY = '3b7b6f23e8bc401fa30252d944a39d1f';
let news =[]
const getLatestNews = async () => {
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-demo.netlify.app/top-headlines`);
    console.log("url",url)
    const response =  await fetch(url)
    console.log("response",response)
    const data = await response.json();
     news = data.articles; // 뉴스만 따로 뽑아서 보기
    console.log("data",news)
};
getLatestNews();
