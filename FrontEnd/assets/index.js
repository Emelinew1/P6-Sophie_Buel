"use strict";

// !------------------------------------- Constants



// !-------------------------------------- Global variables
let allWorks = [];
let allCategories = [];
let modal = null;

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
  let portfolio = document.getElementById("portfolio");

  let existingGallery = document.querySelector(".gallery");
  if (existingGallery) {
    existingGallery.remove();
  }

  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");

  gallery.forEach((work) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
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
  const filters = document.querySelector(".filters");


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
  console.log("Filtering by category:", categoryId);

  const filteredGallery = categoryId === "0"
    ? allWorks 
    : allWorks.filter(work => work.categoryId == categoryId);

  createGallery(filteredGallery);
};

// !------------------------------------- Function for adding a banner

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

// !------------------------------------- Modal creation 



// !-------------------------------------  General functions
const fetchData = async () => {
  await getWorks();
  await getCategories();
  initGallery();
  createFilters();
};

fetchData();
addBanner();