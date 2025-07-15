import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (item) => {
  const todo = new Todo(item, "#todo-template", todoCounter);
  return todo.getView();
};

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.addItem(todo);
};

const todosList = new Section({
  items: initialTodos,
  renderer: (todo) => {
    renderTodo(todo);
  },
  containerSelector: ".todos__list",
});

const newTodoPopup = new PopupWithForm("#add-todo-popup", (input) => {
  const newTodo = { ...input, id: uuidv4(), completed: false };
  renderTodo(newTodo);
  todoCounter.updateTotal(true);
  formValidator.resetValidation();
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

addTodoButton.addEventListener("click", () => {
  newTodoPopup.open();
});

newTodoPopup.setEventListeners();

todosList.renderItems();
