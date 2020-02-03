import Component from './component';

export default class Usercard extends Component {
  setData(data) {
    this._element.querySelector('.user-card__avatar').src = data.photo_100;
    this._element.querySelector(
      '.user-card__name',
    ).textContent = `${data.first_name} ${data.last_name}`;
  }
}
