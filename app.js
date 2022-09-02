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
        //loadCategory([]);
    }

}
// display catagory
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category-container');


    for (const category of categories) {
        // console.log(category.category_id);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerText = `${category.category_name}`;
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
    const artContainer = document.getElementById('art-div');
    artContainer.textContent = '';


    for (const article of articals) {
        console.log(article)

        const artDiv = document.createElement('div');
        artDiv.classList.add('col');
        artDiv.innerHTML = `
             <div class="card my-3"  style="width:800px;height:200px">
             <div class="d-flex">

              <div  style="width:300px;height:200px"> <img src="${article.thumbnail_url}" class="w-100 h-100" alt="..."></div>

               <div class="card-body" style="width:500px">
                 <h5 class="card-title mb-3">${article.title}</h5>
                 <p id="des" class="card-text mb-3">${article.details}</p
               </div>

               <div class="d-flex mt-4">

            <div class="me-3"><img style="width:50px;height:50px" class="border rounded-circle" src="${article.author.img}"></div>

               <div>
               <p>${article.author.name}</p>
               <p>${article.author.published_date}</p>
               </div>

               <div class="me-5"><p><i class="fa-sharp fa-solid fa-eye"></i>15M</p></div>

               <div>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star"></i>
               <i class="fa-solid fa-star-half-stroke"></i>
               </div>

               <div class="ms-4"><i class="fa-solid fa-arrow-right-long"></i></div>

               </div>


             </div>
             </div>

         `;
        artContainer.appendChild(artDiv)
    }



}


loadCategory()
displayArticals(04)