const API_KEY = '3b7b6f23e8bc401fa30252d944a39d1f';
let newsList =[]

// 버튼들에 클릭 이벤트 주기
const menus = document.querySelectorAll(".menus button") // array로 menus 들고 오기
menus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))
const mobileMenus = document.querySelectorAll(".side-nav a")
mobileMenus.forEach(menu => menu.addEventListener("click", (event) => getNewsByCategory(event)))

// 전역변수 url
let url = new URL(`https://noona-times-demo.netlify.app/top-headlines`);

// pagenation을 위한 정보 변수들
let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;


// 뉴스 가져오기
const getNews = async () => {
    try {
        // url 뒤에다 추가로 페이지 정보를 붙여줌
        url.searchParams.set("page", page); // => &page=page
        url.searchParams.set("pageSize", pageSize); 

        const response = await fetch(url);
        const data = await response.json();

        // response 상태가 정상일 경우 
        if(response.status === 200){
            // 검색 결과가 없을 경우
            if(data.articles.length === 0){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults
            console.log(data)
            console.log(newsList)
            console.log(totalResults)
            render();
            pagiNationRender();
        }else{
            // 비정상일 경우 에러메시지를 보낸다
            throw new Error(data.message);
        }

    } catch(error){
        console.log("error: ", error.message);
        errorRender(error.message);
    }
}


// 카테고리별 뉴스 가져오기
const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase(); // 이벤트가 발생한 요소 읽어오기
    url = new URL(`https://noona-times-demo.netlify.app/top-headlines?category=${category}`)
    
    getNews()
}

// 키워드별 뉴스 가져오기
const getNewsByKeyword = async () => {
    let searchInput = document.getElementById("search-input");
    let keyword = searchInput.value;
    url = new URL(`https://noona-times-demo.netlify.app/top-headlines?q=${keyword}`);

    getNews();
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

const errorRender = (errorMessage) => {
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
    </div>`;

    document.getElementById("news-board").innerHTML = errorHTML;
}

// 페이지네이션
const pagiNationRender = () => {
    // totalResults
    // page
    // pageSize
    // groupSize
    // totalPages
    const totalPages = Math.ceil(totalResults / pageSize);
    // pageGroup
        const pageGroup = Math.ceil(page / groupSize);
    // lastPage
        let lastPage = pageGroup * groupSize;
        // 마지막 페이지 그룹이 그룹 사이즈보다 작은 경우 lastPage = totalPages
        if(lastPage > totalPages){
            lastPage = totalPages;
        }
    // firstPage
        // 0보다 작거나 같다면 그냥 1로 해주고 아니면 그대로 (첫번째 페이지가 -1이나 0이 될 수 없으니)
        let firstPage = lastPage - (groupSize - 1)<= 0 ? 1 : lastPage - (groupSize - 1);
        
        let paginationHTML = `<li class="page-item"><a class="page-link" href="#">Previous</a></li>`;

    for(let i = firstPage; i<=lastPage; i++){
        // 현재 보고 있는 페이지면 active
        paginationHTML += `<li class="page-item ${i===page?"active":''}"  onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    paginationHTML += ` <li class="page-item"><a class="page-link" href="#">Next</a></li>`

    document.querySelector(".pagination").innerHTML = paginationHTML;
    
    // <nav aria-label="Page navigation example">
    //     <ul class="pagination">
    //         <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //         <li class="page-item"><a class="page-link" href="#">1</a></li>
    //         <li class="page-item"><a class="page-link" href="#">2</a></li>
    //         <li class="page-item"><a class="page-link" href="#">3</a></li>
    //         <li class="page-item"><a class="page-link" href="#">Next</a></li>
    //     </ul>
    // </nav>

}

// 페이지네이션 클릭 시 해당 페이지로 넘어감
const moveToPage = (pageNum) => {
    page = pageNum;
    getNews();
}

getNews();

// 사이드 메뉴
let sideNav = document.getElementById("side-nav");
const openNav = () => sideNav.style.width = "250px";
const closeNav = () => sideNav.style.width = "0";

// search-input 토글
let searchInputBox = document.getElementById("search-input-box");
const toggleSearch = () => {
    if(searchInputBox.style.display === "none"){
        searchInputBox.style.display = "flex"
    }else{
        searchInputBox.style.display = "none"
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

