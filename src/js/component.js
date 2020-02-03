export default class Component {
  constructor(container, template) {
    this._container = container;
    this._element = document
      .querySelector(template)
      .content.cloneNode(true)
      .querySelector('.component');
    this._error = this._element.querySelector('.error-message') || null;
  }

  insertToDOM() {
    this._container.appendChild(this._element);
  }

  removeFromDOM() {
    this._element.remove();
  }

  toggleError(isError, errorText) {
    if (isError) {
      this._error.textContent = errorText;
    } else {
      this._error.textContent = '';
    }
  }
}
