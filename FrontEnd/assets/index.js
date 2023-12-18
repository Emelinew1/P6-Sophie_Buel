"use strict";

// !------------------------------------- Constants
const portfolio = document.getElementById("portfolio");
const filters = document.querySelector(".filters");
const token = localStorage.getItem("userToken");

// !-------------------------------------- Global variables
let allWorks = [];
let allCategories = [];

// !--------------------------------------- API Functions

/**
 * Retrieves all works from the API.
 *
 * @return {Promise<void>} Returns a promise resolving to undefined.
 */
const getWorks = async () => {
  const response = await fetch("http://localhost:5678/api/works");
  allWorks = await response.json();
};

/**
 * Retrieves the categories from the API.
 *
 * @return {Promise<void>} A promise that resolves once the categories are retrieved.
 */
const getCategories = async () => {
  const response = await fetch("http://localhost:5678/api/categories");
  allCategories = await response.json();
};

// !--------------------------------------- Gallery Functions

/**
 * Initializes the gallery.
 */
const initGallery = () => {
  createGallery(allWorks);
};

/**
 * Creates a gallery item element.
 *
 * @param {Object} work - The work object.
 * @return {HTMLLIElement} The gallery item element.
 */
const createGalleryItem = (work) => {
  const listItem = document.createElement("li");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const deleteIcon = document.createElement("i");

  img.src = work.imageUrl;
  deleteIcon.classList.add("fa-solid", "fa-trash-can");
  deleteIcon.addEventListener("click", () => {
      deleteWork(work.id, listItem);
  });

  figure.appendChild(img);
  figure.appendChild(deleteIcon);
  listItem.appendChild(figure);

  return listItem;
};

/**
 * Creates a gallery by adding a new div element with the class "gallery" to the DOM.
 * If an existing gallery already exists, it is removed before creating the new one.
 *
 * @param {Array} gallery - An array of objects representing the gallery items.
 */
const createGallery = (gallery) => {
  let existingGallery = document.querySelector(".gallery");
  if (existingGallery) {
    existingGallery.remove();
  }

  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");

  gallery.forEach((work) => {
    const listItem = createGalleryItem(work);
    newGallery.appendChild(listItem);
  });

  portfolio.appendChild(newGallery);
};

// !--------------------------------------- Filters Functions

/**
 * Creates filters and adds click event listeners.
 */
const createFilters = () => {
  filters.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "LI") {
      const categoryId = target.id.toLowerCase();
      filterCategory(categoryId);

      // Remove active class from all filters and add to the clicked one
      filters.querySelectorAll("li").forEach(li => li.classList.remove("active"));
      target.classList.add("active");
    }
  });
};

/**
 * Filters works by category and updates the gallery.
 *
 * @param {string} categoryId - The category ID.
 */
const filterCategory = (categoryId) => {
  const filteredGallery = categoryId === "0"
    ? allWorks
    : allWorks.filter(work => work.categoryId == categoryId);

  createGallery(filteredGallery);
};

// !--------------------------------------- Banner Functions

/**
 * Adds a banner to the page.
 */
function addBanner() {
  const banner = document.createElement("div");
  banner.classList.add("banner");

  const bannerTxt = document.createElement("a");
  bannerTxt.innerText = "Mode édition";

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");
  bannerTxt.appendChild(editIcon);

  banner.appendChild(bannerTxt);
  document.body.insertBefore(banner, document.body.firstChild);
}

// !--------------------------------------- Modify Button Functions

/**
 * Removes filters from the page.
 */
function removeFilters() {
  const filtersElements = document.querySelectorAll(".filters");

  filtersElements.forEach((filtersElement) => {
    filtersElement.innerHTML = "";
  });
}

/**
 * Adds a modify button to the page.
 */
function addModifyBtn() {
  const modifyBtn = document.createElement("button");
  modifyBtn.classList.add("modify");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");

  modifyBtn.appendChild(editIcon);
  modifyBtn.appendChild(document.createTextNode(" modifier"));

  const portfolioTitle = document.getElementById("portfolioTitle");
  portfolioTitle.appendChild(modifyBtn);

  modifyBtn.addEventListener("click", setDeleteModal);


// !--------------------------------------- Modal Functions
// Use const and let appropriately, and group variable declarations
function setDeleteModal() {
  const modal = document.createElement("section");
  const iconModal = document.createElement("div");
  const arrowLeft = document.createElement("i");
  const iconClose = document.createElement("i");
  const modalList = document.createElement("ul");
  const titleModal = document.createElement("h3");
  const line = document.createElement("div");
  const addImgBtn = document.createElement("button");


  arrowLeft.classList.remove("fa-arrow-left");
  modal.classList.add("modal");
  iconModal.classList.add("iconModal");
  iconClose.classList.add("fa-solid", "fa-xmark");
  line.classList.add("line");

  titleModal.textContent = "Galerie Photo";
  addImgBtn.textContent = "Ajouter une photo";
  

  portfolio.appendChild(modal);
  modal.appendChild(iconModal);

  iconModal.appendChild(arrowLeft);
  iconModal.appendChild(iconClose);
  modal.appendChild(titleModal);
  modal.appendChild(modalList);

  allWorks.forEach((work) => {
    const listItem = createGalleryItem(work);
    modalList.appendChild(listItem);
  });

  modal.appendChild(line);
  modal.appendChild(addImgBtn);

  iconClose.addEventListener("click", closeModal);
  addImgBtn.addEventListener("click", setCreateModal);

  document.body.classList.add("modal-open");
}

function setCreateModal() {
  const modal = document.createElement("section");
  const iconModal = document.createElement("div");
  const arrowLeft = document.createElement("i");
  const iconClose = document.createElement("i");
  const titleModal = document.createElement("h3");
  const form = document.createElement("form");
  const addPhoto = document.createElement("div");
  const iconeImg = document.createElement("i");
  const buttonImg = document.createElement("button");
  const detailsImg = document.createElement("p");
  const line = document.createElement("div");

  const titleImg = document.createElement("label");
  titleImg.htmlFor = "texte";
  titleImg.textContent = "Titre";
  const inputTxt = document.createElement("input");
  inputTxt.type = "text";
  inputTxt.id = "texte";
  inputTxt.name = "texte";

  const labelCat = document.createElement("label");
  labelCat.htmlFor = "menuDeroulant";
  labelCat.textContent = "Catégorie";
  const select = document.createElement("select");
  select.id = "categorie";
  select.name = "categorie";

  const options = ["Appartements", "Objets", "Hôtels & restaurants"];
  for (const optionText of options) {
    const option = document.createElement("option");
    option.value = optionText.toLowerCase().replace(" ", "");
    option.textContent = optionText;
    select.appendChild(option);
  }
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Valider";
  submitButton.id = "submit";

  document.body.classList.add("modal-open");
  modal.classList.add("modal");
  iconModal.classList.add("iconModal");
  arrowLeft.classList.add("fa-solid", "fa-arrow-left");
  iconClose.classList.add("fa-solid", "fa-xmark");
  iconeImg.classList.add("fa-regular", "fa-image");
  addPhoto.classList.add("add-photo");
  

  line.classList.add("line");

 
  titleModal.textContent = "Ajout photo";
  buttonImg.textContent = "+ Ajouter photo";
  detailsImg.textContent = "jpg, png : 4mo max";


  portfolio.appendChild(modal);
  modal.appendChild(iconModal);
  iconModal.appendChild(arrowLeft);
  iconModal.appendChild(iconClose);
  modal.appendChild(titleModal);
  modal.appendChild(addPhoto);
  addPhoto.appendChild(iconeImg);
  addPhoto.appendChild(buttonImg);
  addPhoto.appendChild(detailsImg);
  form.appendChild(titleImg);
  form.appendChild(inputTxt);
  form.appendChild(labelCat);
  form.appendChild(select);
  form.appendChild(line);
  form.appendChild(submitButton);
  modal.appendChild(form);

  arrowLeft.addEventListener("click", setDeleteModal);
  iconClose.addEventListener("click", closeModal);

}

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.remove();
  document.body.classList.remove("modal-open");
}
}

// !--------------------------------------- Delete work

const deleteWork = async (Id, listItem) => {

  try {
      const response = await fetch(`http://localhost:5678/api/works/${Id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
          }
      });

      if (response.ok) {
          listItem.remove();
      } else {
          const errorMessage = await response.text();
          console.error(`Une erreur est survenue: ${errorMessage}`);
      }
  } catch (error) {
      console.error("Veuillez vous reconnecter:", error);
  }
};

// !--------------------------------------- Initialization

/**
 * Fetches data and initializes the page.
 */
const fetchData = async () => {
  await getWorks();
  await getCategories();
  initGallery();
  createFilters();
    }

fetchData();
addBanner();
removeFilters();
addModifyBtn();