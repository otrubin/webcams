export default class SortedSet {
  state = [];

  constructor(arr = []) {
    if (arr.length) {
      this.setFromArray(arr);
    }
  }

  add(value) {
    // если передан НЕ массив, делаем его массивом,
    // а затем, в обоих случаях объединяем с текущим state
    const arr = Array.isArray(value) ? this.state.concat(value) : this.state.concat([value]);
    // удаляем дубликаты при помощи Set
    this.state = Array.from(new Set(arr));
    // сортируем
    this.state.sort();
    return this;
  }

  delete(value) {
    const index = this.state.findIndex((item) => item === value);
    if (index === -1) {
      return false;
    }
    this.state.splice(index, 1);
    return true;
  }

  has(value) {
    return this.state.indexOf(value) > -1;
  }

  clear() {
    this.state = [];
  }

  size() {
    return this.state.length;
  }

  getAsArray() {
    return this.state;
  }

  setFromArray(arr) {
    this.state = arr.reduce((acc, item) => {
      if (acc.indexOf(item) === -1) {
        acc.push(item);
      }
      return acc;
    }, []);
    this.state.sort((item1, item2) => {
      if (item1.toLowerCase() > item2.toLowerCase()) {
        return 1;
      } if (item1.toLowerCase() < item2.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }
}
