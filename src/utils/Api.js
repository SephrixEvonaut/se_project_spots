class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getAppInfo() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }
  // ^^ this.getUserData()

  _handleServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._handleServerResponse);
  }

  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET", // Or GET, PUT, DELETE, etc.
      headers: this._headers,
      //   "Content-Type": "application/json",
      //   Authorization: "87951084-7ce3-4dbf-9da4-614a45cf5e07",
      //
    }).then(this._handleServerResponse);
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      // Send the data in the body as a JSON string.
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleServerResponse);
  }

  // utils/Api.js (inside your Api class)
  editUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._handleServerResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleServerResponse);
  }

  deleteCards({ isLiked, _id }) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        isLiked,
        _id,
      }),
    }).then(this._handleServerResponse);
  }

  handleLikeClick({ isLiked, _id }) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._handleServerResponse);
  }
}
export default Api;
