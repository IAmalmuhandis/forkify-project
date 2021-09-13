import axios from "axios";
export default class Recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/search?q=${this.id}`
      );
    } catch (error) {
      console.log(error);
    }
  }
}
