"use strict";

// !------------------------------------- Constants
const portfolio = document.getElementById("portfolio");
const filters = document.querySelector(".filters");

// !-------------------------------------- Global variables
let allWorks = [];
let allCategories = [];

// !---------------------------------------Functions

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

/**
 * Initializes the gallery.
 *
 * @param {Array} allWorks - An array containing all the works for the gallery.
 */
const initGallery = () => {
  createGallery(allWorks);
};

// !------------------------------------- Function for creating the gallery 
const createGallery = (gallery) => {
  let existingGallery = document.querySelector(".gallery");
  if (existingGallery) {
    existingGallery.remove();
  }

  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");

  gallery.forEach((work) => {
    const figure     = document.createElement("figure");
    const img        = document.createElement("img");
    const figcaption = document.createElement("figcaption");

    img.src = work.imageUrl;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    newGallery.appendChild(figure);
  });

  portfolio.appendChild(newGallery);
};


// !-------------------------------------  Function for creating filters
const createFilters = () => {
  filters.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName === "LI") {
      const categoryId = target.id.toLowerCase();
      filterCategory(categoryId);

      filters.querySelectorAll("li").forEach(li => li.classList.remove("active"));
      target.classList.add("active");
    }
  });
};

// !------------------------------------- Function for filtering works by category
const filterCategory = (categoryId) => {

  const filteredGallery = categoryId === "0"
    ? allWorks 
    : allWorks.filter(work => work.categoryId == categoryId);

  createGallery(filteredGallery);
};

// !------------------------------------- Banner

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
// Removes the filters
function removeFilters() {
  const filtersElements = document.querySelectorAll(".filters");

  filtersElements.forEach((filtersElement) => {
    filtersElement.innerHTML = "";
  });
}

// !------------------------------------- Modal creation 
function setDeleteModal() { 
  const modal = document.createElement("section");
  const iconModal = document.createElement("div");
  const iconClose = document.createElement("i");
  
  modal.classList.add("modal");
  iconClose.classList.add("fa-solid", "fa-xmark");
  
  portfolio.appendChild(modal);
  modal.appendChild(iconModal);
  iconModal.appendChild(iconClose);
}

/**
 * Adds a modify button to the DOM.
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
}

addModifyBtn();




// !-------------------------------------  General functions
const fetchData = async () => {
  await getWorks();
  await getCategories();
  initGallery();
  createFilters();
};

fetchData();
addBanner();
removeFilters()