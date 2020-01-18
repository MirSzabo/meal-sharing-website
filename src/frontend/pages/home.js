function renderMeals() {
  fetch("/api/meals")
    .then(res => res.json())
    .then(console.log);
}

function homeRouter(req, router) {
  document.body.innerHTML = `
  <body>
  <div class="container">
    <header>
      <h1>meal sharing 
        <img class="logo" alt="logo" src="public/logo.svg">
      </h1>
      <form action="#" class="search">
        <input type="text" class="search__input" placeholder="Search meals">
        <button class="search__button>
          <svg class="search__icon">
            <img class="search__icon" src="public/search.svg"></img>
          </svg>
        </button>
      </form>

      <nav class="user-nav">
        <div class="user-nav__icon-box">
        <div>Location</div>
          <svg class="user-nav__icon">
            <use xlink:href="public/sprite.svg#icon-location"></use>
          </svg> 
        </div>
      </nav>

    </header>
    <div class="image-container">
    <h2>Meal sharing project</h2>
      <img class="main_picture" src= "public/eat-together.jpg">
    </div>
    <div class="content">
      <nav class="sidebar">
      Navigation
      <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      </nav>
      <main class="meal-view">main
      </main>
    </div>
  </div>
  
  
  <ul id="meals" class="meals"></ul>
  <ul class="menu">
  <li>Featured Meals</li>
    <li><a href="/api/meals">Check all meals you can share</a></li>
  </ul>
  </body>
  `;
  renderMeals();
}

export default homeRouter;
