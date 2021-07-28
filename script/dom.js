// Create Element and append it to his parent
const generateElement = (tag, className, parentNode) => {
  const tagName = document.createElement(tag);
  tagName.classList.add(className);
  parentNode.appendChild(tagName);
  return tagName;
};


const generateHtmlSection = (sectionName) => {
  const mainSection = document.querySelector(".main-section");
  
  const nameSection = generateElement("section", sectionName, mainSection);
  
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
  
}


generateHtmlSection("meal")
generateHtmlSection("drink")

const createCards = (url, title, category, recipe, videoLink, sectionNum) => {
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
  if (sectionNum == 0) {
    const cardVideo = generateElement("a", "card-video", detailsContainer);
    cardVideo.href = videoLink;
    const videoIcon = generateElement("i", "fab", cardVideo);
    videoIcon.classList.add("fa-youtube");
  }
};

const displayData = () => {
  const submit = document.querySelectorAll(".search-btn");
  const input = document.querySelectorAll(".food-input");
  submit.forEach((ele, index) => {
    ele.addEventListener("click", () => {
      if (input[index].value != "") {
        input[index].style.cssText = "border:none";
        const cards = document.querySelectorAll(".container");
        if (index === 0) {
          cards[0].textContent=''
          request(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${input[index].value}`,
            (data) => {
              for (let i = 0; i < 6; i++) {
                createCards(
                  data.meals[i].strMealThumb,
                  data.meals[i].strMeal,
                  data.meals[i].strCategory,
                  data.meals[i].strInstructions,
                  data.meals[i].strYoutube,
                  0
                );
              }
            }
          );
        } else {
          cards[1].textContent=''
          request(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input[index].value}`,
            (data) => {
  
              for (let i = 0; i < 6; i++) {
                createCards(
                  data.drinks[i].strDrinkThumb,
                  data.drinks[i].strDrink,
                  data.drinks[i].strCategory,
                  data.drinks[i].strInstructions,
                  "",
                  1
                );
              }
            }
          );
        }
       } else {
         input[index].style.cssText = "border: 3px solid var(--primaryColor);";


       }
    });
  });
};
displayData();

