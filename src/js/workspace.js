import Component from './component';

export default class Workspace extends Component {
  constructor(container, template) {
    super(container, template);

    this._searchCallback = null;
    this._handleSearch = this._handleSearch.bind(this);
    this._setListener();
  }

  searchCallback(fn) {
    this._searchCallback = fn;
  }

  setData(data) {
    this._element.querySelector('.user__avatar').src = data.photo_200_orig;
    this._element.querySelector(
      '.user__text_name',
    ).textContent = `${data.first_name} ${data.last_name}`;
    this._element.querySelector('.user__text_friends-num').textContent =
      data.counters.friends;
  }

  get searchInput() {
    return this._element.querySelector('.user__search-input').value;
  }

  _handleSearch(e) {
    e.preventDefault();
    if (typeof this._searchCallback === 'function') {
      return this._searchCallback(this.searchInput);
    }
  }

  _setListener() {
    this._element
      .querySelector('.button_section_lead')
      .addEventListener('click', this._handleSearch);
  }
}
