const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name:"Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",  
  },
  {
    name: "Restaurant terrace",
    link : "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",  
  },
  {
    name: "An outdoor cafe",
    link : "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",  
  },
  {
    name:"A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",  
  },
  {
    name:"Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",  
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",  
  },
];
// image generation variables
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

// image preview variables

const previewModal = document.querySelector("#preview-image-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption"); 
const previewCloseBtn = previewModal.querySelector(".modal__close-btn_type_preview");

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

// standard modal functionality
function openModal(modal) {
  modal.classList.add("modal_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}


  // event listeners for like
  // event listener for delete
  // handle image click to open modal
function getCardElement(data) {
const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  const cardLikeBtn = cardElement.querySelector(".card__like-button");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-button_active")
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;

    openModal(previewModal);

  });

  previewCloseBtn.addEventListener("click", () => {
    closeModal(previewModal);
  });

  return cardElement;
}

//function to handle image click
//function to handle like button click
//function to handle delete button click

function getPreviewModal(data){
const previewElement= previewModal.querySelector(".modal__image-container");



}

//event listeners 
editButton.addEventListener("click", function () {
    editProfileNameInput.value = profileNameEl.textContent;
    editProfileDescriptionInput.value = profileDescriptionEl.textContent;
    openModal(editModal);
});

editCloseButton.addEventListener("click", function() {
    closeModal(editModal);
});

newPostButton.addEventListener("click", function(){
    openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function() {
    closeModal(newPostModal);
});

function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    profileNameEl.textContent = editProfileNameInput.value;
    profileDescriptionEl.textContent = editProfileDescriptionInput.value;    
    closeModal(editModal);
}

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
    evt.preventDefault();
    
 const inputValues = {        // <---- this isnt a function, its a variable for the current function. Specifically an object that tracks my data input added from new post modal
        name: nameInput.value,
        link: linkInput.value, //wondering where these values came from? check your const variables from lines 50 and 51. 
  };

    cardElement = getCardElement(inputValues); // <---- this is a function that returns a card element, which is then assigned to the variable cardElement
    cardsList.prepend(cardElement);
    closeModal(newPostModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((card) => {
    const cardElement = getCardElement(card); 
    cardsList.append(cardElement);

});

