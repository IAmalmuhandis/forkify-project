import Search from "./models/Search";
import * as searchView from "./views/searchView";
import Recipe from "./models/Recipe";
import { elements, renderLoader, clearLoader } from "./views/base";
/** global state of the app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // 1. Get query from view
  const query = searchView.getInput();
  if (query) {
    // 2. New search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4. Search for recipes
    await state.search.getResults();

    // 5. Render Results on UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace("#", "");
  console.log(id);
  if (id) {
    // prepare UI for changes

    // create new recipe object
    state.recipe = new Recipe(id);
    // get recipe data
    await state.recipe.getRecipe();
    // calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();
    // render recipe
    console.log(state.recipe);
  }
};

window.addEventListener("hashchange", controlRecipe);
