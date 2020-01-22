function renderMeals() {
  fetch("/api/meals")
    .then(res => res.json())
    .then(data => {
      data
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
            <div class="meal__description">${item.description}</div>
            <div class="meal__location">${item.location}</div>
            <div class="meal__price">${item.price} DKK</div>
            <a href="/meals/${item.id}" class="button">Book now</a>
          </div> 
         </div>`;
        ulMeals.appendChild(liMeal);
      });
    });
}

function allMealsRouter(req, router) {
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
                  <a href="/" class="side-nav__link">Home</a>
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
              <ul id="meals" class="meals-list"></ul>
            </div>
            <div class="create-meal">
            <h3>Create a New Meal</h3>
              <form method="POST" action="api/meals/">
                <input type="text" id="title" name="title" placeholder="title">
                <input type="text" id="description" name="description" placeholder="description">
                <input type="text" id="location" name="location" placeholder="location">
                <input type="text" id="when" name="when" placeholder="when">
                <input type="text" id="max_reservations" name="reservations" placeholder="reservations">
                <input type="text" id="price" name="price" placeholder="price">
                <input type="button" id="newMealButton" value="send" >
                <p id="message"></p>
              </form>
            </div>
          </main>
        </div>
      </div>
    </body>
    `;
  renderMeals();

  const button = document.getElementById("newMealButton");
  button.addEventListener("click", () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const location = document.getElementById("location").value;
    const when = document.getElementById("when").value;
    const max_reservations = document.getElementById("max_reservations").value;
    const price = document.getElementById("price").value;

    const data = {
      title,
      description,
      location,
      when,
      max_reservations,
      price
    };

    fetch("/api/meals", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.text();
      })
      .then(text => {
        const message = document.getElementById("message");
        message.innerHTML = text;
      });
  });
}

export default allMealsRouter;
