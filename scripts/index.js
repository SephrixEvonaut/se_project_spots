// buttons
const editButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__new-post-button")

//edit profile modal info
const editModal = document.querySelector("#edit-profile-modal");
const editCloseButton = editModal.querySelector(".modal__close-btn");
const profileColumn = document.querySelector(".profile__column");
const profileNameEl = profileColumn.querySelector(".profile__title");
const profileDescriptionEl = profileColumn.querySelector(".profile__subtitle");
const editProfileForm = editModal.querySelector(".modal__form");
const editProfileNameInput = editModal.querySelector("#profile-name-input");
const editProfileDescriptionInput= editModal.querySelector("#profile-description-input")


// new post modal info 
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-btn");
const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = newPostModal.querySelector("#card-caption-input");
const linkInput = newPostModal.querySelector("#card-image-input");

//event listeners 
editButton.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    editModal.classList.add("modal_is-opened")
});

editCloseButton.addEventListener("click", function() {
    editModal.classList.remove("modal_is-opened")
});

newPostButton.addEventListener("click", function(){
    newPostModal.classList.add("modal_is-opened")
});

newPostCloseButton.addEventListener("click", function() {
    newPostModal.classList.remove("modal_is-opened")
});

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;    
    editModal.classList.remove("modal_is-opened");
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    console.log("New post added");
    console.log("New post caption");
    newPostModal.classList.remove("modal_is-opened");
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);
