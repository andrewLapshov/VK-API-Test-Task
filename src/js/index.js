import '../pages/index.css';
import Intro from './intro';
import Workspace from './workspace';
import Usercard from './user-card';
import Logout from './logout';
import error from './error';

const leadDOM = document.querySelector('.lead__container');

const introElement = new Intro(leadDOM, '.intro-template');
const workspaceElement = new Workspace(leadDOM, '.workspace-template');
const logoutElement = new Logout(
  document.querySelector('.header__container'),
  '.button-logout-template',
);

const getUserData = () => {
  VK.Api.call(
    'users.get',
    { fields: 'photo_200_orig, counters', v: '5.103' },
    r => {
      if (r.response) {
        if (document.querySelector('.lead__intro')) {
          introElement.toggleError(false);
          introElement.removeFromDOM();
        }
        workspaceElement.setData(r.response[0]);
        workspaceElement.insertToDOM();
        logoutElement.insertToDOM();
      }
    },
  );
};

VK.init({
  apiId: 7301755,
});

VK.Auth.getLoginStatus(res => {
  if (res.status === 'connected') {
    getUserData();
  } else {
    introElement.insertToDOM();
  }
});

introElement.loginCallback(() => {
  VK.Auth.login(res => {
    if (res.status === 'connected') {
      getUserData();
    } else if (res.status === 'not_authorized') {
      introElement.toggleError(true, error.notAuthorized);
    } else if (res.status === 'unknown') {
      introElement.toggleError(true, error.unknownUser);
    }
  }, VK.access.FRIENDS);
});

logoutElement.logoutCallback(() => {
  VK.Auth.logout(response => {
    if (response) {
      workspaceElement.toggleError(false);
      workspaceElement.removeFromDOM();
      logoutElement.removeFromDOM();
      introElement.insertToDOM();
    }
  });
});

workspaceElement.searchCallback(searchInput => {
  VK.Api.call(
    'friends.search',
    { q: searchInput, fields: 'photo_100', v: '5.103' },
    r => {
      const cardList = document.querySelector('.user-card-list');

      workspaceElement.toggleError(false);
      cardList.innerHTML = '';
      if (r.response.items.length > 0) {
        r.response.items.forEach(friendData => {
          const newFriendCard = new Usercard(cardList, '.user-card-template');
          newFriendCard.setData(friendData);
          newFriendCard.insertToDOM();
        });
      } else {
        cardList.textContent = error.noResults;
      }
    },
  );
});
