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
       <div class="one-meal">
        <div>
          <img class="meal-image"
          src="https://source.unsplash.com/200x200?${item.title}"
          alt="${item.title}"
         </div>                             
        <div class="one-meal__heading">${item.title}</div>
        <div class="one-meal__location">${item.location}</div>
        <div class="one-meal__price">${item.price} DKK</div>
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
          const ulReviews = document.getElementById("reviews");
          const liReview = document.createElement("li");

          liReview.innerHTML = `
       <div class="one-review">
       <div class="one-review__description">${item.description}</div>
        <div>
          <img class="review-image"
          src="https://source.unsplash.com/200x200?${item.name}"
          alt="${item.name}"
         </div>                             
        <div class="one-review__name">${item.name}</div>
        <div class="one-review__date">${item.created_date}</div>
        <div class="one-review__stars">${item.stars}</div>
       </div>`;
        ulReviews.appendChild(liReview);
        });
    });
}

function homeRouter(req, router) {
  document.body.innerHTML = `
  <body>
    <div class="container">
      <header>
        <h1>meal sharing 
          <img class="logo" alt="logo" src="public/img/logo.svg">
        </h1>
        <form action="#" class="search">
          <input type="text" class="search__input" placeholder="Search meals">
        </form>
        <nav class="user-nav">
          <div class="user-nav__icon-box">
          <div>Location</div> 
          </div>
        </nav>
      </header>
      <div class="image-container">
      <h2>Meal sharing project</h2>
        <img class="main_picture" src= "public/img/eat-together.jpg">
      </div>
      <div class="content">
        <nav class="sidebar">
          <ul class="side-nav">
            <li class="side-nav__item">
                <a href="/" class="side-nav__link"><span>Home</span></a>
            </li>
            <li class="side-nav__item">
                <a href="/meals" class="side-nav__link">Create a Meal</a>
            </li>
            <li class="side-nav__item">
                <a href="/reviews" class="side-nav__link">Reviews</a>
            </li>
            </li>
            <li class="side-nav__item">
                <a href="/reviews" class="side-nav__link">Write us</a>
            </li>
          </ul>
          <div class="legal">
            &copy 2020 by Miroslava Szabo. All rights reserved.
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </div>
        </nav>
        <main class="main-view">
          <div class="meal-description">
            <ul id="meals" class="meals"></ul>
          </div>
          <figure class="user-reviews">
            <ul id="reviews" class="reviews"></ul>
          </figure>
        </main>
      </div>
    </div>
  </body>
  `;
  renderMeals();
  renderReviews();
}

export default homeRouter;
