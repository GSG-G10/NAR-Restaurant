const cards = document.querySelectorAll(".container");
function generateElement(tag, className, parentNode) {
  const tagName = document.createElement(tag);
  tagName.classList.add(className);
  parentNode.appendChild(tagName);
  return tagName;
}
function createCards(url, title, category, recipe, videoLink, sectionNum) {
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
}

function request (url,callback) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText)
      callback(data)
    }
  }
  xhr.open("GET", url)
  xhr.send()
}

(function getValueOfInput() {
  const submit = document.querySelectorAll(".search-btn");
  const input = document.querySelectorAll(".food-input");
  submit.forEach((ele,index) => {
    ele.addEventListener("click", () => {
      if (index === 0) {
        request(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input[index].value}`,(data)=>{

        })

      } else {
        request(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input[index].value}`,(data)=>{
        
        
        })
      }
    })
  })
})();