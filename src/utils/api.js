  class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
    }
  
    getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: "GET",
        headers: this.headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        method: "GET",
        headers: this.headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    updateUserProfile(name, about) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name,
          about,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    updateAvatar(avatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    createCard(link, name) {
      return fetch(`${this.baseUrl}/cards`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          link,
          name,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    // addcards(data) {
    //   return fetch(`${this.baseUrl}/cards`, {
    //     method: "POST",
    //     headers: this.headers,
    //     body: JSON.stringify({
    //       name: data.name,
    //       link: data.link,
    //     }),
    //   })
    //     .then((res) => {
    //       if (res.ok) {
    //         return res.json();
    //       }
    //       return Promise.reject(`Error: ${res.status}`);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  
    deleteCard(cardId) {
      return fetch(`${this.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    addLike(cardId) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this.headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    removeLike(cardId) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this.headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    editProfile(data) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    editAvatarProfile(data) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          avatar: data.avatarLink,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Error: ${res.status}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    changeLikeCardStatus(cardId, like) {
      const method = like ? "PUT" : "DELETE";
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: method,
        headers: this.headers,
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject("Error: " + res.status);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

  export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/web-ptbr-cohort-12",
    headers: {
      authorization: "b3a308ed-c246-4b89-8cdf-bac76edb874d",
      "Content-Type": "application/json",
    },
  });

  export default Api;