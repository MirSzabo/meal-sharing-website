function mealsId(req, router) {
  console.log(req.param.id);

  fetch("/api/meals/" + req.param.id)
    .then(res => res.json())
    .then(data => {
      data
        .filter(item => {
          return item.id == req.param.id;
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
          <div class="meal__description">${item.description}</div>
          <div class="meal__location">${item.location}</div>
          <div class="meal__price">${item.price} DKK</div>
        </div> 
       </div>`;
          ulMeals.appendChild(liMeal);
        });
    });

  document.body.innerHTML = `
  <body>
    <div class="container">
      <header>
        <h1>meal sharing 
          <img class="logo" alt="logo" src="../../../public/logo.svg">
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
        <img class="main_picture" src= "../../../public/eat-together.jpg">
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
          </ul>
          <div class="legal">
            &copy 2020 by Miroslava Szabo. All rights reserved.
            <div class="legal__icons">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
          </div>
        </nav>
        <main class="main-view">
          <div class="meal-description">
            <ul id="meals" class="meals-list"></ul>
          </div>
          <div class="create-meal">
            <h3>Book this Meal</h3>
              <form method="POST" action="api/meals/">
                <input type="text" id="name" name="name" placeholder="Name">
                <input type="tel" id="phonenumber" name="phonenumber" placeholder="Phone number">
                <input type="email" id="email" name="email" placeholder="Email">
                <input type="button" id="newBookingButton" value="send" >
                <p id="message"></p>
              </form>
            </div>
        </main>
      </div>
    </div>
  </body>
  `;

  const button = document.getElementById("newBookingButton");
  button.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const phonenumber = document.getElementById("phonenumber").value;
    const email = document.getElementById("email").value;
    const mealId = req.param.id;

    const data = {
      name,
      phonenumber,
      email,
      mealId
    };
    if (name !== "" && phonenumber !== "" && email !== "") {
      fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          message.innerHTML = ` Thank you for your order.`;
          name.value = "";
          phonenumber.value = "";
          email.value = "";
        });
    } else {
      message.innerHTML = `Please, fill in all the collumns.`;
    }
  });
}

export default mealsId;
