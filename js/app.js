const loadCatData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCatData(data.data.news_category);
}

const loadData = async (catID) => {
    const urlOfNews = `https://openapi.programming-hero.com/api/news/category/${catID}`;
    const res = await fetch(urlOfNews);
    const data = await res.json();
    const datas = data.data.sort((a, b) => parseFloat(b.total_view) - parseFloat(a.total_view));
    displayData(datas);

}


//For displaying categories list as menu button------
const displayCatData = categories => {
    const newMenuDiv = document.getElementById('news-menu-section');
    categories.forEach(category => {
        // console.log(category.category_name);
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('col-lg');
        categoryDiv.classList.add('col-sm-12', 'buttons-mobile-view');
        categoryDiv.innerHTML = ` 
<button onclick="loadData('${category.category_id}')" type="button" class="btn menu-btn btn-secondary">${category.category_name}</button>`;

        newMenuDiv.appendChild(categoryDiv);

    });

}

//for displaying category id based data display
const displayData = newsDataByCatID => {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.textContent = '';
    const noNews = document.getElementById('no-found-msg');
    const totalNews = document.getElementById('result-number-section');

    // show news number and no news msg---------
    if (newsDataByCatID.length === 0) {
        noNews.classList.remove('d-none');
        totalNews.classList.add('d-none');
    }
    else {
        totalNews.classList.remove('d-none');
        noNews.classList.add('d-none')
        const newsNumber = document.getElementById('number-of-news');
        newsNumber.innerText = newsDataByCatID.length;

        newsDataByCatID.forEach(news => {
            // console.log(news._id)
            const newsDiv = document.createElement('div');
            newsDiv.classList.add('row', 'g-0');
            newsDiv.innerHTML = `
            <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">${news.title}</h3>
                                <p class="card-text">${news.details.length > 100 ? news.details.slice(0, 100) + '...' : news.details}.</p>
    
                                <div class="d-flex mt-3 justify-content-between align-items-center">
                                    <div class="d-flex  align-items-center ml-0">
                                        <img class="author-img" src="${news.author.img}" alt="" srcset="">
                                        <h5>${news.author.name === null ? "No Data" : news.author.name}</h5>
                                    </div>
                                    <div>
                                        <h5>Views : ${news.total_view === null ? "No Viwers Data" : news.total_view}</h5>
                                    </div>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        Show News Details
                                    </button>
                                </div>
                            </div>
                        </div>`;
            newsContainer.appendChild(newsDiv);
        })
    }

}


loadCatData();
