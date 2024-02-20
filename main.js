
const API_KEY = '3b7b6f23e8bc401fa30252d944a39d1f';
let news =[]
const getLatestNews = async () => {
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines`);
    console.log("url",url)
    const response =  await fetch(url)
    console.log("response",response)
    const data = await response.json();
     news = data.articles; // 뉴스만 따로 뽑아서 보기
    console.log("data",news)
};
getLatestNews();
