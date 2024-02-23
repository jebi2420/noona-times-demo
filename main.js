
const API_KEY = '3b7b6f23e8bc401fa30252d944a39d1f';
let newsList =[]
// 버튼들에 클릭 이벤트 주기
const menus = document.querySelectorAll(".menus button") // array로 menus 들고 오기
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))
const mobileMenus = document.querySelectorAll(".side-nav a")
mobileMenus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))

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

// 카테고리별 뉴스 가져오기
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase(); // 이벤트가 발생한 요소 읽어오기
    console.log("category", category);
    const url = new URL(`https://noona-times-demo.netlify.app/top-headlines?category=${category}`)
    const response =  await fetch(url);
    const data = await response.json();
    console.log("ddd", data);
    newsList = data.articles;
    // 그 뉴스를 보여주기
    render();
}
// 키워드별 뉴스 가져오기
const getNewsByKeyword = async () => {
    let searchInput = document.getElementById("search-input");
    let keyword = searchInput.value;
    let url = new URL(`https://noona-times-demo.netlify.app/top-headlines?q=${keyword}`);
    let response = await fetch(url);
    let data = await response.json();
    newsList = data.articles;
    render();
    console.log("keyword data", data)
}

// 엔터 이벤트 
// if로 event리스너 할 수 있을듯..?
// const getNewsByKeywordEnter = async () => {
//     let searchInput = document.getElementById("search-input");
//     searchInput.addEventListener = ("keydown", async (e) => {
//         if(e.key === 'Enter'){
//             let keyword = searchInput.value;
//             let url = new URL(`https://noona-times-demo.netlify.app/top-headlines?q=${keyword}`);
//             let response = await fetch(url);
//             let data = await response.json();

//             console.log("keyword enter", data)
//         }
//     })
//}


    

// 화면 구현
const render = () => {
    const newsHTML = newsList.map(
        (news) => 
        ` 
        <div class="news row">
        <div class="col-lg-4">
          <img
            src="${news.urlToImage || "https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"}"
            alt=""
            class="news-img-size"
          />
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${truncateText(news.description, 200)}</p>
          <div>
            ${news.source.name || "no source"} * ${moment(news.publishedAt).fromNow()}
          </div>
        </div>
      </div>    
      `
    ).join('');
    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();

// 사이드 메뉴
let sideNav = document.getElementById("side-nav");
const openNav = () => sideNav.style.width = "250px";
const closeNav = () => sideNav.style.width = "0";

// search-input 토글
let searchInputBox = document.getElementById("search-input-box");
const toggleSearch = () => {
    if(searchInputBox.style.display === "none"){
        searchInputBox.style.display = "flex"
        console.log("flex")
    }else{
        searchInputBox.style.display = "none"
        console.log("else")
    }   
}

// 내용 200자 이상시 ... 표시
const truncateText = (text, maxLength) => {
    if(text){
        if(text.length > maxLength){
            return text.substring(0, maxLength) + "...";
        }else{
            return text;
        }
    }else{
        return "내용없음";
    }
}

