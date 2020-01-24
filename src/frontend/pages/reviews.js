function renderReviews() {
  fetch("/api/reviews")
    .then(res => res.json())
    .then(data => {
      data.map(item => {
        const ulReviews = document.getElementById("reviews-list");
        const liReview = document.createElement("li");
        const dateFull = new Date(item.created_date);
          let dateFormated = dateFull.getDate() + "-" + (dateFull.getMonth() + 1) + "-" + dateFull.getFullYear();
        const rating = document.getElementById("review__rating");
        const starItem = document.createElement("div");

        liReview.innerHTML = `
        <figure class="review">
        <blockquote class="review__title">${item.title}</blockquote>
          <blockquote class="review__text">${item.description}</blockquote>
            <figcaption class="review__user">
              <img class="review__photo"
              src="https://source.unsplash.com/200x200?${item.name}"
              alt="${item.name}">
              <div class="review__user-box">
                <p class="review__user-name">${item.name}</p>
                <p class="review__user-date">${dateFormated}</p>
              </div>
              <div id="review__rating">${`&#9733;`.repeat(item.stars)}</div>
            </figcaption>
          </figure>`;
        ulReviews.appendChild(liReview);
      });
    });
}

function reviewRouter(req, router) {
  document.body.innerHTML = `
    <body>
      <div class="container">
        <header>
          <h1>meal sharing</h1>
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
          <img class="main_picture" src= "https://scontent-arn2-1.xx.fbcdn.net/v/t1.15752-9/s2048x2048/83024123_501274407027176_8535718304994557952_n.jpg?_nc_cat=103&_nc_ohc=Hc9CJSXf3ekAX97nqJY&_nc_ht=scontent-arn2-1.xx&_nc_tp=1002&oh=e3b0fa918c6ba557e551f78bf7b10218&oe=5ECD41F0">
        </div>
        <div class="content">
          <nav class="sidebar">
            <ul class="side-nav">
              <li class="side-nav__item">
                  <a href="/" class="side-nav__link">Home</a>
              </li>
              <li class="side-nav__item">
                  <a href="/meals" class="side-nav__link">Create a Meal</a>
              </li>
              <li class="side-nav__item side-nav__item--active">
                  <a href="/reviews" class="side-nav__link">Reviews</a>
              </li>
            </ul>
            <div class="legal">
              &copy 2020 by Miroslava Szabo. All rights reserved.
              <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            </div>
          </nav>
          <main class="main-view">
            <figure class="user-reviews__all">
              <ul id="reviews-list"></ul>
            </figure>
            <div class="create-review">
            <h3>Write a Review</h3>
              <form method="POST" action="api/meals/">
                <input type="text" id="name" name="name" placeholder="Name">
                <input type="text" id="title" name="title" placeholder="Title">
                <input type="text" id="description" name="description" placeholder="Description">
                <input type="text" id="meal_id" name="meal_id" placeholder="Meal ID">
                <input type="number" id="stars" name="stars" placeholder="Stars" min="1" max="5">
                <input type="button" id="newBookingButton" value="send" >
                <p id="message"></p>
              </form>
            </div>      
          </main>
        </div>
    </body>
    `;
  renderReviews();
}

export default reviewRouter;
