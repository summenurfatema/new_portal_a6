console.log('clicked')

// load category

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
// display catagory
const displayCategories = (categories) => {
    console.log(categories)
    const categoryContainer = document.getElementById('category-container');

    for (const category of categories) {


        const categoryDiv = document.createElement('div');


        categoryDiv.innerHTML = `${category.category_name}`;
        categoryDiv.onclick = function () {
            loadArticals(`${category.category_id}`)
        }
        categoryContainer.appendChild(categoryDiv);


    }


}


//  load articals
const loadArticals = async (category_id) => {

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.data)
    displayArticals(data.data);
}


const displayArticals = (articals) => {
    console.log(articals)

    const number = document.getElementById('number-of-news')
    if (articals.length !== 0) {
        number.innerText = articals.length + ' ' + 'News has founded';
    }

    else { number.innerText = 'No news available' }

    const artContainer = document.getElementById('art-div');
    artContainer.textContent = '';


    for (const article of articals) {
        console.log(article)

        const artDiv = document.createElement('div');
        artDiv.classList.add('col');
        artDiv.innerHTML = `

             <div class="card"  style="width:800px;height:270px">

                    <div class="d-flex p-2">

                        <div  style="width:300px;height:270px"> <img src="${article.thumbnail_url}" class="w-100 h-100 p-3" alt="..."></div>

                         <div class="card-body" style="width:500px">
                         <h5 class="card-title mb-3">${article.title}</h5>
                         <p id="des" class="card-text mb-3">${article.details}</p
                        </div>

                        <div class="d-flex ">

           <div>
            <img style="width:50px;height:50px" class="border rounded-circle" src="${article.author.img}"></div>
    

               <div>
               <p>${article.author.name}</p >
        <p>${article.author.published_date}</p>
               </div >

               <div class="me-5"><p><i class="fa-sharp fa-solid fa-eye"></i>15M</p></div>

               <div>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star-half-stroke"></i>
               </div>

             
               
          

               </div >

               <button onclick="openModal('${article._id}')" type="button" class="btn btn-info mt-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
               See details
              </button>
             </div >
             </div >

    `;
        artContainer.appendChild(artDiv)
    }



}
//details

const openModal = async (news_id) => {
    //console.log(news_id)
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    const res = await fetch(url)
    const data = await res.json()

    displayModal(data);
}
const displayModal = newses => {

    console.log(newses.data[0])
    // for (newses of news) {
    //     console.log(news)



    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = 'hi'
    const modalbody = document.getElementById('modal-body1');

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
//}
loadCategory()
loadArticals("01")


