
const API_KEY = '3b7b6f23e8bc401fa30252d944a39d1f';
let newsList =[]
const getLatestNews = async () => {
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    const url = new URL(`https://noona-times-demo.netlify.app/top-headlines`);
    console.log("url",url)
    const response =  await fetch(url)
    console.log("response",response)
    const data = await response.json();
    newsList = data.articles; // 뉴스만 따로 뽑아서 보기
    render();
    console.log("data",newsList)
};

const render = () => {
    const newsHTML = newsList.map(
        (news) => ` 
        <div class="news row">
        <div class="col-lg-4">
          <img
            src=${news.urlToImage}
            alt=""
            class="news-img-size"
          />
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${news.description}</p>
          <div>
            ${news.source.name} * ${news.publishedAt}
          </div>
        </div>
      </div>    
      `
    );
    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();