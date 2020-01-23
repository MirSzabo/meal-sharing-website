// --------- HELPER FUNCTIONS
const closeAllLists = element => {
    // Closes all autocomplete lists in the document,
    // except the one passed as argument
    const myInput = document.getElementById("myInput");
    let items = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < items.length; i++) {
      if (element != items[i] && element != myInput) {
        items[i].parentNode.removeChild(items[i]);
      }
    }
  };
  
  const removeActive = items => {
    // Remove the active class from all items
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove("autocomplete-active");
    }
  };
  
  let currentFocus;
  
  const addActive = items => {
    // Classify a single list item as active
    // based on the value of the currentFocus variable
    if (!!items) {
      removeActive(items);
      if (currentFocus >= items.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = items.length - 1;
      items[currentFocus].classList.add("autocomplete-active");
    } else {
      return false;
    }
  };
  
  const handleInput = e => {
    // Executed when something is written in the search bar
    const myInput = document.getElementById("myInput");
    let val = myInput.value;
    closeAllLists();
    if (!!val) {
      currentFocus = -1; // No active item at present
      let autocompleteList = document.createElement("div");
      autocompleteList.setAttribute("id", "autocomplete-list");
      autocompleteList.setAttribute("class", "autocomplete-items");
      myInput.parentNode.appendChild(autocompleteList);
      fetch(`/api/meals?title=${val}`)
        .then(res => res.json())
        .then(arr => {
          for (let i = 0; i < arr.length; i++) {
            let suggestion = arr[i].title;
            let itemDiv = document.createElement("div");
            let ix = suggestion.toLowerCase().indexOf(val.toLowerCase());
            itemDiv.innerHTML = `${suggestion.slice(
              0,
              ix
            )}<strong>${suggestion.slice(
              ix,
              ix + val.length
            )}</strong>${suggestion.slice(
              ix + val.length,
              suggestion.length
            )}`;
            itemDiv.innerHTML += `<input type='hidden' mealid="${arr[i].id}" value="${suggestion}">`;
            itemDiv.addEventListener("click", e => {
              // Insert the value in the text field
              const value = e.target.getElementsByTagName("input")[0].value;
              myInput.value = value;
              myInput.setAttribute("mealid", arr[i].id);
              const searchForm = document.getElementById("search-form");
              // Change the form action
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
  
  const handleKeyDown = e => {
    let autocompleteList = document.getElementById("autocomplete-list");
    if (autocompleteList) {
      autocompleteList = autocompleteList.getElementsByTagName("div");
    }
    if (e.keyCode == 40) {
      // Arrow down pressed: select as active the next item in the list
      currentFocus++;
      addActive(autocompleteList);
    } else if (e.keyCode == 38) {
      // Arrow up pressed: select as active the previous item in the list
      currentFocus--;
      addActive(autocompleteList);
    } else if (e.keyCode == 13) {
      // Enter pressed: prevent the form from submitting
      // and simulate a click on the active item
      e.preventDefault();
      if (currentFocus > -1) {
        if (autocompleteList) autocompleteList[currentFocus].click();
      }
    }
  };
  
  // --------- RENDER SEARCH FORM AND ADD EVENT LISTENERS
  const renderMealSearch = () => {
    let formHTML = `
        <form id="search-form" autocomplete="off" method="GET" action="/meals">
        <div class="autocomplete">
            <input id="myInput" type="text" placeholder="Dish name">
        </div>
        <input type="submit" value="Search" class="btn btn-secondary">
        </form>
        `;
  
    let searchContainer = document.createElement("div");
    searchContainer.setAttribute("id", "search-container");
    searchContainer.innerHTML = formHTML;
    root.appendChild(searchContainer);
  
    let myInput = document.getElementById("myInput");
    myInput.addEventListener("input", e => {
      handleInput(e);
    });
    myInput.addEventListener("keydown", e => {
      handleKeyDown(e);
    });
    document.addEventListener("click", e => {
      closeAllLists(e.target);
    });
  };
  
  export { renderMealSearch };