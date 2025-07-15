export default class Todo {
  constructor({ id, name, completed, date }, selector, counter) {
    this._id = id;
    this._name = name;
    this._completed = completed;
    if (date !== "") {
      this._date = new Date(date);
      this._date.setMinutes(
        this._date.getMinutes() + this._date.getTimezoneOffset()
      );
    }
    this._selector = selector;
    this._counter = counter;
  }

  _setEventListeners() {
    this._todoDelete.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
    this._checkbox.addEventListener("click", () => {
      this._handleCheckboxClick();
    });
  }

  _handleCheckboxClick() {
    this._completed = !this._completed;
    this._checkbox.checked = this._completed;
    this._counter.updateCompleted(this._completed);
  }

  _handleDeleteButtonClick() {
    this._element.remove();
    this._counter.updateTotal(false);
    if (this._completed) {
      this._counter.updateCompleted(false);
    }
  }

  _getTemplate() {
    const template = document.querySelector(this._selector);
    return template.content.querySelector(".todo").cloneNode(true);
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
    this._checkbox = this._element.querySelector(".todo__completed");
    this._checkbox.checked = this._completed;
    this._checkbox.id = `todo-${this._id}`;
    this._checkboxLabel = this._element.querySelector(".todo__label");
    this._checkboxLabel.setAttribute("for", `todo-${this._id}`);
    this._todoDelete = this._element.querySelector(".todo__delete-btn");
    this._elementName = this._element.querySelector(".todo__name");
    this._elementName.textContent = this._name;
    this._elementDate = this._element.querySelector(".todo__date");
    if (this._date) this._elementDate.textContent = this._formatDate();
    this._setEventListeners();
    return this._element;
  }
}
