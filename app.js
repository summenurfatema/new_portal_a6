

//---------------------------- Load Categories--------------------------//

const loadCategory = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url)
        const data = await res.json()

        displayCategories(data.data.news_category);
    }
    catch (error) {
        loadCategory([]);
    }

}

//-------------------------------display catagory----------------------------//


const displayCategories = (categories) => {
    console.log(categories)
    const categoryContainer = document.getElementById('category-container');

    for (const category of categories) {
        console.log(category)

        const categoryDiv = document.createElement('div');

        categoryDiv.innerHTML = `${category.category_name}`;
        categoryDiv.onclick = function () {
            loadArticals(`${category.category_id}`)
            toggleSpiner(true)
        }
        categoryContainer.appendChild(categoryDiv);

    }

}


// ------------------------------Load All Articals----------------------------------//


const loadArticals = async (category_id) => {

    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
        const res = await fetch(url)
        const data = await res.json()
        displayArticals(data.data);
    } catch (error) {
        loadArticals([])
    }
}

// -----------------------------Display All Article------------------------//

const displayArticals = (articals) => {

    //------Sort------//

    articals.sort(function (a, b) {
        return b.total_view - a.total_view;
    });

    const number = document.getElementById('number-of-news')
    if (articals.length !== 0) {
        number.innerText = articals.length + ' ' + 'News found';
    }

    else { number.innerText = 'No news available' }

    const artContainer = document.getElementById('article-container');
    artContainer.textContent = '';


    for (const article of articals) {

        const artDiv = document.createElement('div')
        artDiv.classList.add('col')

        artDiv.innerHTML = `

        <div class="card m-3">
            <img src="${article.thumbnail_url}" class="card-img-top h-50" alt="...">
        <div class="card-body">
            <h5 class="card-title">${article.title}</h5>
            <p id="des" class="title-text mb-3">${article.details}</p>


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
        artContainer.appendChild(artDiv)
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
    const modalbody = document.getElementById('modal-body1');


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


    modalbody.innerHTML = `
    <img class="w-100"  src="${newses.data[0].image_url}"
    
    <p>Title : ${newses.data[0].title}</p>
    <p>Author name : ${newses.data[0].author.name} </p>
    <p>Publish date & time : ${newses.data[0].author.published_date} </p>
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




loadCategory()
loadArticals("01")


