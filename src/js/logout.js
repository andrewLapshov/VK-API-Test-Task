import Component from './component';

export default class Logout extends Component {
  constructor(container, template) {
    super(container, template);

    this._logoutCallback = null;
    this._handleLogout = this._handleLogout.bind(this);
    this._setListener();
  }

  logoutCallback(fn) {
    this._logoutCallback = fn;
  }

  _handleLogout() {
    if (typeof this._logoutCallback === 'function') {
      return this._logoutCallback(this);
    }
  }

  _setListener() {
    this._element.addEventListener('click', this._handleLogout);
  }
}
