export default class Todo {
  constructor(data, selector) {
    this._id = data.id;
    this._name = data.name;
    this._completed = data.completed;
    if (data.date !== "") {
      this._date = new Date(data.date);
      this._date.setMinutes(
        this._date.getMinutes() + this._date.getTimezoneOffset()
      );
    }
    this._selector = selector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".todo__delete-btn")
      .addEventListener("click", () => {
        this._handleDeleteButtonClick();
      });
    this._element
      .querySelector(".todo__completed")
      .addEventListener("click", () => {
        this._handleCheckboxClick();
      });
  }

  _handleCheckboxClick() {
    this._completed = !this._completed;
    this._element.querySelector(".todo__completed").checked = this._completed;
  }

  _handleDeleteButtonClick() {
    this._element.remove();
  }

  _getTemplate() {
    const todoElement = document
      .querySelector(this._selector)
      .content.querySelector(".todo")
      .cloneNode(true);

    return todoElement;
  }

  _formatDate() {
    return `Due: ${this._date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".todo__label").id = `todo-${this._id}`;
    this._element
      .querySelector(".todo__label")
      .setAttribute("for", `todo-${this._id}`);
    this._element.querySelector(".todo__name").textContent = this._name;
    if (this._date)
      this._element.querySelector(".todo__date").textContent =
        this._formatDate();
    const checkbox = this._element.querySelector(".todo__completed");
    checkbox.checked = this._completed;
    checkbox.id = `todo-${this._id}`;
    return this._element;
  }
}
