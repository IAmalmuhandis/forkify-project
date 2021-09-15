import uniqid from "uniqid";
import { elements } from "../views/base";
export default class list {
  constructor() {
    this.items = [];
  }
  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
    this.items.push(item);
    this.persistData();
    return item;
  }
  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    // [2,4,8] splice(1,1) -> returns 4, original array is [2,8]
    // [2,4,8] slice(1,2) -> returns 4, original array is [2,4,8]
    this.items.splice(index, 1);
    this.persistData();
  }
  updateCount(id, newCount) {
    this.items.find((el) => el.id === id).count = newCount;
  }
  deleteAllItem() {
    this.items = [];
  }
  addManuallyList() {
    const item = {
      id: uniqid(),
      count: elements.countInput.value,
      unit: elements.unitInput.value,
      ingredient: elements.ingredientInput.value,
    };
    this.items.push(item);
    return item;
  }
  persistData() {
    localStorage.setItem("items", JSON.stringify(this.items));
  }
  readStorage() {
    const storage = JSON.parse(localStorage.getItem("items"));
    // restoring likes from local storage
    if (storage) this.items = storage;
  }
}
