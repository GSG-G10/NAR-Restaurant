const request = (url, callback) => {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data);
    }
  };
  xhr.open("GET", url);
  xhr.send();
};

const displayData = () => {
  const submit = document.querySelectorAll(".search-btn");
  const input = document.querySelectorAll(".food-input");
  submit.forEach((ele, index) => {
    ele.addEventListener("click", () => {
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
    });
  });
};
displayData();
