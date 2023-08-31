const loadCategories = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
        const data = await res.json();
        const videoCategory = data.data;
        displayPostCategories(videoCategory);
    } catch (err) {
        console.log(err);
    }
}

const displayPostCategories = (categories) => {
    const displayCategories = document.getElementById('display-categories');
    categories.forEach(categorie => {
        const { category_id, category } = categorie;
        const categoryli = document.createElement('li');
        categoryli.classList.add('text-gray-500', 'rounded-xl', 'hover:text-[#5d5fef]', 'hover:font-bold');
        categoryli.innerHTML = `
            <a href="#" onclick="loadCategoriesDetails('${category_id}')" class="bg-[#25252533] text-[#252525B2] active:text-white active:bg-[#FF1F3D] rounded px-5 py-[10px] font-medium text-[18px]">${category}</a>
        `;
        displayCategories.appendChild(categoryli);
    });
}

const loadCategoriesDetails = async (category_id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
        const data = await res.json();
        const videoPost = data.data;
        // console.log(videoPost);
        displayVideoPosts(videoPost);
    } catch (err) {
        console.log(err);
    }
}

const displayVideoPosts = posts => {
    const noContent = document.getElementById('no-content');
    const mostVisited = document.getElementById('most-visited');
    const displayContent = document.getElementById('display-content');

    loaddingSpinner(true);
    noContent.innerHTML = ``;
    mostVisited.innerHTML = ``;
    displayContent.innerHTML = ``;
    if (posts.length === 0) {
        displayContent.innerHTML = `
        <div class="flex justify-center items-center">
          <div class="text-center my-52">
            <img src="./img/Icon.png" alt="" class="mx-auto">
            <h2 class="text-[#171717] font-bold text-3xl mt-8">Oops!! Sorry, There is no <br>content here</h2>
          </div>
        </div>
        `;
    }
    posts.forEach(post => {
        // console.log(post);
        const { title, authors, thumbnail, others } = post;
        // console.log(authors);
        const { profile_name, profile_picture, verified} = authors[0];
        // console.log(profile_name, profile_picture, verified);
        const { posted_date, views } = others;

        const postDiv = document.createElement('div');
        postDiv.innerHTML = `
        <div class="card w-96 bg-base-100">
        <div class='relative'>
            <figure width="312px" height="150px">
                <img src="${thumbnail}" alt="Thumbnail" class='h-[200px] w-[312px]'/>
            </figure>
            <div class='absolute bg-[#171717] rounded bottom-2 right-11'>
                <h2 class="text-[10px] p-1 text-white">3hrs 56min ago</h2>
            </div>
        </div>
        <div class="card-body">
            <div class="flex">
                <div id="profile-icon">
                    <img class="w-10 h-10 rounded-full mt-2" src="${profile_picture}" alt="">
                </div>
                <div class="ml-3">
                <h2 class="card-title font-bold text-[#171717]">${title}</h2>
                <p>${profile_name ? profile_name : 'No author'} ${verified ? '<img class="inline-block" src="./img/badge.svg" alt="">' : ''}</p>
                <p>${views}</p>
                </div>
            </div>
            
        </div>
        </div>
        `;
        mostVisited.appendChild(postDiv);
    });
    loaddingSpinner(false);
}

const loaddingSpinner = isLoading => {
    const loadingButton = document.getElementById('lodding-button');
    if (isLoading) {
        loadingButton.classList.remove('hidden');
    } else {
        loadingButton.classList.add('hidden');
    }
}

loadCategories();
loadCategoriesDetails(1000);