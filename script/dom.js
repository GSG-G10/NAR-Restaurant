const cards = document.querySelectorAll(".container");
// Create Element and append it to his parent
const generateElement = (tag, className, parentNode) => {
  const tagName = document.createElement(tag);
  tagName.classList.add(className);
  parentNode.appendChild(tagName);
  return tagName;
};
// Create Card function (to display api data in html file )
const createCards = (url, title, category, recipe, videoLink, sectionNum) => {
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
