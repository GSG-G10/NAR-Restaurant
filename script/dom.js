const generateElement = (tag, className, parentNode) => {
  const tagName = document.createElement(tag);
  tagName.classList.add(className);
  parentNode.appendChild(tagName);
  return tagName;
};

const generateHtmlSection = (sectionName) => {
  const mainSection = document.querySelector(".main-section");

  const nameSection = generateElement("section", sectionName, mainSection);
  nameSection.id = `${sectionName}`;
  const sectionTitle = generateElement("h2", "title", nameSection);

  sectionTitle.textContent = `${sectionName} Recipe`;

  const searchForm = generateElement("div", "search-form", nameSection);

  const inputSearch = generateElement("input", "food-input", searchForm);
  inputSearch.placeholder = `Enter the name of the ${sectionName}`;
  inputSearch.type = "text";
  const buttonSearch = generateElement("button", "search-btn", searchForm);
  buttonSearch.type = "submit";
  buttonSearch.textContent = "Search";
  const cards = generateElement("div", "container", nameSection);
};

generateHtmlSection("meal");
generateHtmlSection("drink");

const createCards = (
  url,
  title,
  category,
  recipe,
  videoLink,
  sectionNum,
  isVideo
) => {
  const cards = document.querySelectorAll(".container");
  const card = generateElement("div", "card", cards[sectionNum]);
  const imgContainer = generateElement("div", "img-container", card);
  const cardImg = generateElement("img", "card-img", imgContainer);
  cardImg.src = url;
  cardImg.alt = `${title} ${category}`;
  const detailsContainer = generateElement("div", "details-container", card);
  const cardName = generateElement("p", "card-name", detailsContainer);
  cardName.textContent = title;
  const cardCategory = generateElement("p", "card-category", detailsContainer);
  cardCategory.textContent = category;
  const cardRecipe = generateElement("p", "card-recipe", detailsContainer);
  cardRecipe.textContent = recipe;
  if (isVideo) {
    const cardVideo = generateElement("a", "card-video", detailsContainer);
    cardVideo.href = videoLink;
    cardVideo.target = "_blank";
    const videoIcon = generateElement("i", "fab", cardVideo);
    videoIcon.classList.add("fa-youtube");
  }
};

const displayData = () => {
  const submit = document.querySelectorAll(".search-btn");
  const input = document.querySelectorAll(".food-input");
  submit[0].addEventListener("click", () => {
    if (input[0].value.trim() !== "") {
      input[0].style.cssText = "border:none";
      const cards = document.querySelectorAll(".container");
      cards[0].textContent = "";
      request(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input[0].value.trim()}`,
        (error, data) => {
          if (error) {
            return handleMessage("meal", error);
          }
          if (!data.meals) {
            return handleMessage("meal", "No data to show");
          }
          for (let i = 0; i < Math.min(6, data.meals.length); i++) {
            createCards(
              data.meals[i].strMealThumb,
              data.meals[i].strMeal,
              data.meals[i].strCategory,
              data.meals[i].strInstructions,
              data.meals[i].strYoutube,
              0,
              true
            );
          }
        },
        (loading) => {
          document.querySelector(".meal .container").textContent = loading
            ? "loading..."
            : "";
        }
      );
    } else {
      input[0].style.cssText = "border: 3px solid var(--primaryColor);";
    }
  });

  //  EVent listener for drink
  submit[1].addEventListener("click", () => {
    if (input[1].value.trim() !== "") {
      input[1].style.cssText = "border:none";
      const cards = document.querySelectorAll(".container");
      cards[1].textContent = "";
      request(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input[1].value.trim()}`,
        (error, data) => {
          if (error) {
            return handleMessage("drink", error);
          }
          if (!data.drinks) {
            return handleMessage("drink", "No data to show");
          }
          for (let i = 0; i < Math.min(6, data.drinks.length); i++) {
            createCards(
              data.drinks[i].strDrinkThumb,
              data.drinks[i].strDrink,
              data.drinks[i].strCategory,
              data.drinks[i].strInstructions,
              "",
              1,
              false
            );
          }
        },
        (loading) => {
          document.querySelector(".drink .container").textContent = loading
            ? "loading..."
            : "";
        }
      );
    } else {
      input[1].style.cssText = "border: 3px solid var(--primaryColor);";
    }
  });
};

displayData();
const handleMessage = (className, message) => {
  document.querySelector(`.${className} .container`).textContent = message;
};
