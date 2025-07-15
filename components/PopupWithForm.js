import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupCallback) {
    super(popupSelector);
    this._popupCallback = popupCallback;
  }

  _getInputValues() {
    // Get all field elements
    this._inputList = this._popup.querySelectorAll(".popup__input");

    // Create an empty object
    this._formValues = {};

    // Add the values of the fields to this object
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // Return the values object
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._popupCallback(inputValues);
      this.close();
    });
  }
}
