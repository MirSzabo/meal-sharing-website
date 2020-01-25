  const handleInput = event => {
    const input = document.getElementById("myInput");
    let inputValue = input.value;
    closeAllLists();
    if (!!inputValue) {
      currentFocus = -1;
      let autocomplete = document.createElement("div");
      autocomplete.setAttribute("id", "autocomplete-list");
      autocomplete.setAttribute("class", "autocomplete-items");
      input.parentNode.appendChild(autocomplete);
      fetch(`/api/meals?title=${inputValue}`)
        .then(res => res.json())
        .then(arr => {
          for (let i = 0; i < arr.length; i++) {
            let suggestion = arr[i].title;
            let itemDiv = document.createElement("div");
            let ix = suggestion.toLowerCase().indexOf(inputValue.toLowerCase());
            itemDiv.innerHTML = `${suggestion.slice(
              0,
              ix
            )}<strong>${suggestion.slice(
              ix,
              ix + inputValue.length
            )}</strong>${suggestion.slice(
              ix + inputValue.length,
              suggestion.length
            )}`;
            itemDiv.innerHTML += `<input type='hidden' mealid="${arr[i].id}" value="${suggestion}">`;
            itemDiv.addEventListener("click", event => {
              const value = event.target.getElementsByTagName("input")[0].value;
              input.value = value;
              input.setAttribute("mealid", arr[i].id);
              const searchForm = document.getElementById("search-form");
              searchForm.setAttribute(
                "action",
                `/meals${
                  !!document.getElementById("myInput") &&
                  document.getElementById("myInput").hasAttribute("mealid")
                    ? "/".concat(
                        Number(
                          document
                            .getElementById("myInput")
                            .getAttribute("mealid")
                        )
                      )
                    : ""
                }`
              );
              closeAllLists();
            });
            autocompleteList.appendChild(itemDiv);
          }
        });
    } else {
      return false;
    }
  };
  const keyDown = event => {
      const autoComplete = document.getElementById("autocomplete-list");
      if (autoComplete) {autoComplete = autoComplete.getElementsByTagName("div");}
      if (event.keyCode == 40) {
        currentFocus++;
        addActive(autoComplete);
      } else if (event.keyCode == 38) { //up
        currentFocus--;
        addActive(autoComplete);
      } else if (event.keyCode == 13) {
        event.preventDefault();
        if (currentFocus > -1) {
          if (autoComplete) autoComplete[currentFocus].click();
        }
      }
  };

   let currentFocus;

  const addActive = items => {
    if (!!items) {
      removeActive(items);
      if (currentFocus >= items.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = items.length - 1;
      items[currentFocus].classList.add("autocomplete-active");
    } else {
      return false;
    }
  };

 const removeActive = items => {
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete-active");
    }
  }

  const closeAllLists = element => {
    const input = document.getElementById("myInput");
    const items = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < items.length; i++) {
      if (element != items[i] && element != input) {
        items[i].parentNode.removeChild(items[i]);
    }
  }
};

const renderMealSearch = () => {
  let formHTML = `
      <div class="autocomplete">
          <input id="myInput" class="search__input" name="search" type="text" placeholder="Search meals">
      </div>
      <input type="submit" value="Search" class="btn btn-secondary">
      `;

  let searchContainer = document.createElement("div");
  searchContainer.setAttribute("id", "search-container");
  searchContainer.innerHTML = formHTML;
  const searchBar = document.getElementById("search-form");
  searchBar.appendChild(searchContainer);
  let input = document.getElementById("myInput");
  input.addEventListener("input", event => {
    handleInput(event);
  });
  input.addEventListener("keydown", event => {
    handleKeyDown(event);
  });
  document.addEventListener("click", event => {
    closeAllLists(event.target);
  });
};

export { renderMealSearch };
