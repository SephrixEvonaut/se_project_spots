import Api from "../utils/Api.js";
import "./index.css";
import {
  enableValidation,
  settingsOriginal,
  resetValidation,
} from "../scripts/validation.js";
import { setButtonText } from "../utils/helpers.js";

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

const modals = document.querySelectorAll(".modal");
let currentCardId = null;

// image generation variables
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// image preview variables

const previewModal = document.querySelector("#preview-image-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

// buttons
const editButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__new-post-button");

//close buttons
const closeButtons = document.querySelectorAll(".modal__close-btn");

//

//edit profile modal info
const editModal = document.querySelector("#edit-profile-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");
const profileColumn = document.querySelector(".profile__column");
const profileNameEl = profileColumn.querySelector(".profile__title");
const profileDescriptionEl = profileColumn.querySelector(".profile__subtitle");
const editProfileForm = editModal.querySelector(".modal__form");
const editProfileNameInput = editModal.querySelector("#profile-name-input");
const editProfileDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

// edit avatar modal
const editAvatarModal = document.querySelector("#new-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");
const editAvatarLinkInput = editAvatarModal.querySelector("#card-image-input");
const editAvatarbutton = document.querySelector(".avatar__edit-button");

// new post modal info
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-btn");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = newPostModal.querySelector("#card-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");

// API class instantiation
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "41516374-91aa-4c7e-8eef-920426729e54",
    "Content-Type": "application/json",
  },
});

// standard modal functionality
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeOnEscape);
}

function closeOnEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".modal_is-opened"));
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeOnEscape);
}

// Delete card confirmation/cancellation modal setup

const deleteModal = document.querySelector("#delete-image-modal");
const modalDeleteBtn = document.querySelector(".modal__delete-btn");
const modalCancelBtn = document.querySelector(".modal__delete-cancel-btn");

function getCardElement(data, index) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  cardElement.id = data._id;
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const cardLikeBtn = cardElement.querySelector(".card__like-button");

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-button_active");
  }
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");
  cardDeleteBtn.id = data._id;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeBtn.addEventListener("click", (evt) => {
    handleLike(evt, data);
  });

  cardDeleteBtn.addEventListener("click", (e) => {
    console.log(e.target.id);
    currentCardId = e.target.id;
    openModal(deleteModal);

    let id = e.target.id;
    // cardElement.remove();
    modalDeleteBtn.addEventListener("click", () => {
      console.log(deleteModal);
      closeModal(deleteModal);
      console.log(currentCardId);

      let cardElementDelete = document.getElementById(`${id}`);
      console.log(cardElementDelete);
      api.deleteCards({ isLiked: false, _id: currentCardId });
      cardElementDelete.remove();
    });
  });

  const handleLike = (evt, data) => {
    console.log(data);
    const isLiked = evt.target.classList.contains("card__like-button_active");
    api
      .handleLikeClick({ isLiked, _id: data._id })
      .then(() => {
        cardLikeBtn.classList.toggle("card__like-button_active");
      })
      .catch(console.error);
  };

  modalCancelBtn.addEventListener("click", () => {
    console.log(deleteModal);
    closeModal(deleteModal);
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;

    openModal(previewModal);
  });

  return cardElement;
}

//event listeners
editButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  openModal(editModal);

  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settingsOriginal
  );
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");

  button.addEventListener("click", () => closeModal(popup));
});

modals.forEach((modal) => {
  modal.addEventListener("click", function (evt) {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

editAvatarbutton.addEventListener("click", function () {
  openModal(editAvatarModal);
});

function handleEditProfileSubmit(evt) {
  console.log("calling profile function");
  evt.preventDefault();
  const buttonElement = editProfileForm.querySelector(".modal__save-btn");
  setButtonText(buttonElement, true);
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then(() => {
      profileNameEl.textContent = editProfileNameInput.value;
      profileDescriptionEl.textContent = editProfileDescriptionInput.value;

      //  api call to edit in backend
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => setButtonText(buttonElement, false));
}

function handleCardDelete(evt) {
  console.log("calling profile function");
  evt.preventDefault();
  nameInput.textContent = nameInput.value;
  linkInput.src = linkInput.value;
  let buttonElement = document.querySelector(".modal__save-btn");
  setButtonText(buttonElement, true);
  api.editUserInfo({
    name: editProfileNameInput.value,
    about: editProfileDescriptionInput.value,
  });
  setButtonText(buttonElement, false);

  //  api call to edit in backend
  closeModal(editModal);
}

console.log("editprofileform", editProfileForm);

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleEditAvatarSubmit(evt) {
  evt.preventDefault();

  const avatar = editAvatarLinkInput.value.trim();
  const imageElement = document.querySelector(".profile__avatar");

  const saveBtn = editAvatarForm.querySelector(".modal__save-btn");

  setButtonText(saveBtn, true);

  api
    .editUserAvatar({ avatar })
    .then((user) => {
      console.log(user);
      imageElement.src = user.avatar ?? avatar;
      closeModal(editAvatarModal);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.error("Failed to update avatar:", err);
    })
    .finally(() => setButtonText(saveBtn, false));
}

editAvatarForm.addEventListener("submit", handleEditAvatarSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: nameInput.value,
    link: linkInput.value,
  };
  let buttonElement = document.querySelector(".modal__save-btn");
  let card_list = document.querySelectorAll(".card");
  let length = card_list.length;
  setButtonText(buttonElement, true);
  console.log(card_list, card_list.length);
  api
    .addCard(inputValues)
    .then((res) => {
      const cardElement = getCardElement(res); // <---- this is a function that returns a card element, which is then assigned to the variable cardElement
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
    })
    // also need to do it in api
    .catch(console.error)
    .finally(() => {
      setButtonText(buttonElement, false);
    });

  evt.target.reset();
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);
api.getInitialCards().then((res) => {
  res.forEach((card, index) => {
    const cardElement = getCardElement(card, index);
    cardsList.append(cardElement);
  });
});

api.getAppInfo().then(([userInfo, cards]) => {
  console.log(userInfo);
  const imageElement = document.querySelector(".profile__avatar");
  imageElement.src = userInfo.avatar;
  profileNameEl.textContent = userInfo.name;
  profileDescriptionEl.textContent = userInfo.about;

  cards.forEach((card) => {
    const cardElement = getCardElement(card);

    cardsList.append(cardElement);
  });
});

// api.deleteInitialCards();
enableValidation(settingsOriginal);
