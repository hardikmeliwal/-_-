const form = document.querySelector("#recipe-form");
let recipes = [];

function handleSubmit(event) {
  // Prevent default form submission behavior
  event.preventDefault();
  // Get recipe name, ingredients, and method input values
  const nameInput = document.querySelector("#recipe-name");
  const ingrInput = document.querySelector("#recipe-ingredients");
  const methodInput = document.querySelector("#recipe-method");
  const name = nameInput.value.trim();
  const ingredients = ingrInput.value.trim().split(",").map(i => i.trim());
  const method = methodInput.value.trim();

  if (name && ingredients.length > 0 && method) {
    const newRecipe = { name, ingredients, method };
    recipes.push(newRecipe);
    // Reset the form inputs
    nameInput.value = "";
    ingrInput.value = "";
    methodInput.value = "";
    // Update the list of recipes
    displayRecipes();
  }
}
function displayRecipes() {
  const recipeList = document.querySelector("#recipe-list");
  const noRecipes = document.getElementById("no-recipes");

  recipeList.innerHTML = "";
  noRecipes.style.display = recipes.length > 0 ? "none" : "flex";

  recipes.forEach((recipe, index) => {
    const recipeDiv = document.createElement("div");
    recipeDiv.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong></p>
      <ul>
        ${recipe.ingredients.map(ingr => `<li>${ingr}</li>`).join("")}
      </ul>
      <p><strong>Method:</strong></p>
      <p>${recipe.method}</p>
      <button class="edit-button" data-index="${index}">Edit</button>
      <button class="delete-button" data-index="${index}">Delete</button>
    `;
    recipeDiv.classList.add("recipe");
    recipeList.appendChild(recipeDiv);
  });
}

function handleEdit(event) {
  const index = event.target.dataset.index;
  const recipe = recipes[index];

  // Set the values of the form inputs to the current recipe's values
  const nameInput = document.querySelector("#recipe-name");
  const ingrInput = document.querySelector("#recipe-ingredients");
  const methodInput = document.querySelector("#recipe-method");
  nameInput.value = recipe.name;
  ingrInput.value = recipe.ingredients.join(", ");
  methodInput.value = recipe.method;

  // Remove the recipe from the array
  recipes.splice(index, 1);

  // Update the list of recipes
  displayRecipes();
}

function handleDelete(event) {
  const index = event.target.dataset.index;
  recipes.splice(index, 1);
  displayRecipes();
}

form.addEventListener("submit", handleSubmit);
document.querySelector("#recipe-list").addEventListener("click", event => {
  if (event.target.classList.contains("edit-button")) {
    handleEdit(event);
  } else if (event.target.classList.contains("delete-button")) {
    handleDelete(event);
  }
});

displayRecipes();