import Component from './component';

export default class Intro extends Component {
  constructor(container, template) {
    super(container, template);

    this._loginCallback = null;
    this._handleLogin = this._handleLogin.bind(this);
    this._setListener();
  }

  loginCallback(fn) {
    this._loginCallback = fn;
  }

  _handleLogin() {
    if (typeof this._loginCallback === 'function') {
      return this._loginCallback(this);
    }
  }

  _setListener() {
    this._element
      .querySelector('.button_section_intro')
      .addEventListener('click', this._handleLogin);
  }
}
