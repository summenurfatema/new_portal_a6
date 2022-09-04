

//---------------------------- Load Categories--------------------------//

const loadCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url)
        const data = await res.json()

        displayCategories(data.data.news_category);
    }
    catch (error) {
        loadCategories([]);
    }

}

//-------------------------------display catagory----------------------------//


const displayCategories = (categories) => {
    console.log(categories)
    const categoryContainer = document.getElementById('category-container');

    for (const category of categories) {

        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `${category.category_name}`;
        categoryDiv.onclick = function () {
            loadArticles(`${category.category_id}`)
            toggleSpiner(true)
        }
        categoryContainer.appendChild(categoryDiv);

    }

}


// ------------------------------Load All Articals----------------------------------//


const loadArticles = async (category_id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        const res = await fetch(url)
        const data = await res.json()
        displayArticles(data.data);
    } catch (error) {
        loadArticles([])
    }
}

// -----------------------------Display All Article------------------------//

const displayArticles = (articles) => {

    //------Sort------//

    articles.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    const number = document.getElementById('number-of-news')
    if (articles.length !== 0) {
        number.innerText = articles.length + ' ' + 'News found';
    }

    else { number.innerText = 'No news available' }

    const articleContainer = document.getElementById('article-container');
    articleContainer.textContent = '';


    for (const article of articles) {

        const articleDiv = document.createElement('div')
        articleDiv.classList.add('col')

        articleDiv.innerHTML = `

        <div class="card m-3">
            <img src="${article.thumbnail_url}" class="card-img-top h-50" alt="...">
        <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p id="description" class="title-text mb-3">${article.details}</p>


        <div class="d-flex">

            <div class="d-flex">
                <div>
                    <img style="width:50px;height:50px" class="border rounded-circle" src="${article.author.img}">
                </div>

                <div>
                    <p>${article.author.name}</p>
                    <p>${article.author.published_date}</p>
                </div>
            </div>


            <div><p><i class="fa-sharp fa-solid fa-eye"></i>${article.total_view}</p></div>

            <div class="ms-4">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star-half-stroke"></i>
            </div>
                
        </div>

        <button onclick="openModal('${article._id}')" type="button" class="btn btn-info text-white fw-semibold mt-1"
        data-bs-toggle="modal" data-bs-target="#exampleModal">
        See details
    </button>

        </div>        
`;
        articleContainer.appendChild(articleDiv)
    }

    toggleSpiner(false)

}
//-------------------------Modal Section----------------------------------//

const openModal = async (news_id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`
        const res = await fetch(url)
        const data = await res.json()

        displayModal(data);

    } catch (error) {
        console.log(error)
    }
}


const displayModal = newses => {

    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = ` ${newses.data[0].title}`
    const modalBody = document.getElementById('modal-body1');


    // ----------------All error handle for null value------------------//

    if (newses.data[0].author.name === '' || newses.data[0].author.name === null) {
        newses.data[0].author.name = 'No Author found'

    }
    if (newses.data[0].total_view === null) {
        newses.data[0].total_view = 'No data available'

    }
    if (newses.data[0].author.published_date === null) {
        newses.data[0].author.published_date = 'No date available'
    }
    if (newses.data[0].title === null || newses.data[0].title === ' ') {
        newses.data[0].title = 'No title available'

    }


    modalBody.innerHTML = `
    <img class="w-100"  src="${newses.data[0].image_url}"
    
    <p>Title : ${newses.data[0].title}</p>
    <p>Author name : ${newses.data[0].author.name} </p>
    <p>Published date & time : ${newses.data[0].author.published_date} </p>
    <p>Total view : ${newses.data[0].total_view} </p>
    <p>Details of this news : ${newses.data[0].details}</p>
    
      `

}

//-------------------------Spinner Function------------------------------//

const toggleSpiner = (isloading) => {
    const loader = document.getElementById('loader');

    if (isloading == true) {
        loader.classList.remove('d-none')
    }
    else { loader.classList.add('d-none') }
}




loadCategories()
loadArticles("01")


