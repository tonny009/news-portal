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
    console.log(data.data);

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

// for displaying category id based data display
// const displayData =

loadCatData();
