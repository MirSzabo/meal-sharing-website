function renderMeals() {
  fetch("/api/meals")
    .then(res => res.json())
   // .then(console.log);
   .then(data => {
     data.map(item => {
       const list = document.getElementById("meals");
       const checkItem = document.createElement("li");
       checkItem.innerHTML = `<input type="checkbox" value=${item.id}>${item.title}</input>`;
       list.appendChild(checkItem);
     })
   })
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
          <ul class"side-nav">
            <li class="side-nav__item>
              <a href="/meals"></a>
                <a href="/meals" class="side-nav__link">Meals</a>
            </li>
            <li class="side-nav__item>
              <a href="/reviews"></a>
                <a href="/reviews" class="side-nav__link">Add Meal</a>
            </li>
            <li class="side-nav__item>
              <a href="/reviews"></a>
                <a href="/reviews" class="side-nav__link">Reviews</a>
            </li>
            </li>
            <li class="side-nav__item>
              <a href="/reviews"></a>
                <a href="/reviews" class="side-nav__link">Write us</a>
            </li>
          </ul>
          <div class="legal">
            &copy 2020 by Miroslava Szabo. All rights reserved.
            <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </div>
        </nav>
        <main class="meal-view"> 
          <ul id="meals" class="meals"></ul>
        </main>
      </div>
    </div>
  </body>
  `;
  renderMeals();
}

export default homeRouter;
