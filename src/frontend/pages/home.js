//import { renderMealSearch } from "./search";

function renderMeals() {
  fetch("/api/meals")
    .then(res => res.json())
    .then(data => {
      data
        .filter(item => {
          return item.id <= 21;
        })
        .map(item => {
          const ulMeals = document.getElementById("meals");
          const liMeal = document.createElement("li");

          liMeal.innerHTML = `
       <div class="meal">
       <div class="image-container">
        <img class="meal-image"
        src="https://source.unsplash.com/200x200?${item.title}"
        alt="${item.title}">
        </div>
        <div class="meal-container">                            
          <div class="meal__heading">${item.title}</div>
          <div class="meal__location">${item.location}</div>
          <div class="meal__price">${item.price} DKK</div>
          <a href="/meals/${item.id}" class="button">Book now</a>
        </div> 
       </div>`;
          ulMeals.appendChild(liMeal);
        });
    });
}

function renderReviews() {
  fetch("/api/reviews")
    .then(res => res.json())
    .then(data => {
      data
        .filter(item => {
          console.log(item.id);
          return item.id <= 31;
        })
        .map(item => {
          const ulReviews = document.getElementById("reviews-list");
          const liReview = document.createElement("li");

          const dateFull = new Date(item.created_date);
          let dateFormated = dateFull.getDate() + "-" + (dateFull.getMonth() + 1) + "-" + dateFull.getFullYear();

          liReview.innerHTML = `
      <figure class="review">
        <blockquote class="review__text">${item.description}</blockquote>
          <figcaption class="review__user">
            <img class="review__photo"
            src="https://source.unsplash.com/200x200?${item.name}"
            alt="${item.name}">
            <div class="review__user-box">
              <p class="review__user-name">${item.name}</p>
              <p class="review__user-date">${dateFormated}</p>
            </div>
            <div class="review__rating">${`&#9733;`.repeat(item.stars)}</div>
          </figcaption>
        </figure>`;
        ulReviews.appendChild(liReview);
        });
    });
}

function homeRouter(req, router) {
  document.body.innerHTML = `
  <body>
    <div class="container">
      <header>
        <h1>meal sharing </h1>
        <form id="search-form" class="search" autocomplete="off" method="GET" action="/meals">
          <input id="myInput" class="search__input" name="search" type="text" placeholder="Search meals">
        </form>
        <nav class="user-nav">
          <div class="user-nav__icon-box">
          <div>Location</div> 
          </div>
        </nav>
      </header>
      <div class="image-container">
      <h2>Meal sharing project</h2>
        <img class="main_picture" src= "https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/s2048x2048/83024123_501274407027176_8535718304994557952_n.jpg?_nc_cat=103&_nc_ohc=Hc9CJSXf3ekAX97nqJY&_nc_ht=scontent-arn2-1.xx&_nc_tp=1002&oh=e3b0fa918c6ba557e551f78bf7b10218&oe=5ECD41F0">
      </div>
      <div class="content">
        <nav class="sidebar">
          <ul class="side-nav">
            <li class="side-nav__item side-nav__item--active">
                <a href="/" class="side-nav__link">Home</a>
            </li>
            <li class="side-nav__item">
                <a href="/meals" class="side-nav__link">Create a Meal</a>
            </li>
            <li class="side-nav__item">
                <a href="/reviews" class="side-nav__link">Reviews</a>
            </li>
            </li>
          </ul>
          <div class="legal">
            &copy 2020 by Miroslava Szabo. All rights reserved.
            <div class="legal__icons">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </div>
        </nav>
        <main class="main-view">
          <div class="meal-description">
            <ul id="meals" class="meals-list"></ul>
            <a href="/meals" class="more-info">Show all<span>&rarr;</span></a>
          </div>
          <figure class="user-reviews">
            <ul id="reviews-list"></ul>
            <a href="/reviews" class="more-info">Show all<span>&rarr;</span></a>
          </figure>
        </main>
      </div>
    </div>
  </body>
  `;
  //renderMealSearch();
  renderMeals();
  renderReviews();
}

export default homeRouter;
