const loadCatData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCatData(data.data.news_category);
    }
    catch (error) {
        console.log(error);

    }

}

const loadData = async (catID) => {
    toggleSpinner(true);
    const urlOfNews = `https://openapi.programming-hero.com/api/news/category/${catID}`;
    try {
        const res = await fetch(urlOfNews);
        const data = await res.json();
        const datas = data.data.sort((a, b) => (parseFloat(b.total_view) || 0) - (parseFloat(a.total_view) || 0));
        displayData(datas);
    }
    catch (error) {
        console.log(error);
    }
}

// display data details with modals---------
const loadDetailsNews = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayDetail(data.data);
}

const displayDetail = data => {
    const modalTitle = document.getElementById('newsModalLabel');
    modalTitle.innerText = `News: 
    ${data[0].details}`;
    const newsOtherDetails = document.getElementById('news-other-details');
    newsOtherDetails.innerHTML = `
    <p>Rating:${data[0].rating.number}</p>
    <p>Published Date:${data[0].author.published_date}</p>`

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
        <button onclick="loadData('${category.category_id}')" type="button" class="btn  menu-btn btn-secondary">${category.category_name}</button>`;

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
            newsDiv.classList.add('row', 'g-0', 'mb-4', 'news-card');
            newsDiv.innerHTML = `
            
                        <div class="col-md-4">
                            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h3 class="card-title">${news.title}</h3>
                                <p class="card-text">${news.details.length > 100 ? news.details.slice(0, 100) + '...' : news.details}.</p>
    
                                <div class="d-flex mt-5 justify-content-between align-items-center">
                                    <div class="d-flex  align-items-center ml-0">
                                        <img class="author-img" src="${news.author.img}" alt="" srcset="">
                                        <h5>${news.author.name === null ? "No Data" : news.author.name}</h5>
                                    </div>
                                    <div>
                                        <h4 >Views : ${news.total_view === null ? "No Viwers Data" : news.total_view}</h4>
                                    </div>
                                    <button onclick="loadDetailsNews('${news._id}')" class="btn btn-dark" data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        Show News Details
                                    </button>
                                </div>
                            </div>
                        `;
            newsContainer.appendChild(newsDiv);
        })
    }
    toggleSpinner(false);

}
//loadinggggg spinner-----------
const toggleSpinner = isloading => {
    const loaderSection = document.getElementById('loader');
    if (isloading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

loadCatData();
