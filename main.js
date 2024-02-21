
const API_KEY = '3b7b6f23e8bc401fa30252d944a39d1f';
let newsList =[]
// 1. 버튼들에 클릭 이벤트 주기
const menus = document.querySelectorAll(".menus button") // array로 menus 들고 오기
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))

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

// 2. 카테고리별 뉴스 가져오기
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase(); // 이벤트가 발생한 요소 읽어오기
    console.log("category", category);
    const url = new URL(`https://noona-times-demo.netlify.app/top-headlines?category=${category}`)
    const response =  await fetch(url)
    const data = await response.json();
    console.log("ddd", data);
    newsList = data.articles;
    // 3. 그 뉴스를 보여주기
    render();
}

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
    ).join('');
    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

const getNewsByKeyword = () => {

}

