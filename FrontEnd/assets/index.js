"use strict";

// !------------------------------------- Constants
const portfolio = document.getElementById("portfolio");
const filters = document.querySelector(".filters");

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
    deleteWork(work.id);
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
 * Filters works by category and updates the gallery.
 *
 * @param {string} categoryId - The category ID.
 */
const filterCategory = (categoryId) => {
  if (allWorks.length === 0) {
    // allWorks n'est pas encore chargé, ne faites rien.
    return;
  }

  const filteredGallery = categoryId === "0"
    ? allWorks
    : allWorks.filter(work => work.categoryId == categoryId);

  createGallery(filteredGallery);
};

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

// !--------------------------------------- User Functions
/**
 * Display the user profile by creating a gallery of all their works and
 * adding filters for sorting and filtering the works.
 *
 * @param {array} allWorks - An array of all the user's works.
 */
const displayUser = () => {
  createGallery(allWorks);
  createFilters();
};

// !--------------------------------------- Admin Functions
const displayAdmin = () => {
  createGallery(allWorks);
  addBanner();
  removeFilters();
  addModifyBtn();
  login();
};

// !--------------------------------------- Banner Functions
/**
 * Adds a banner to the page.
 */
const addBanner = () => {
  const banner = document.createElement("div");
  banner.classList.add("banner");

  const bannerTxt = document.createElement("a");
  bannerTxt.innerText = "Mode édition";

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");
  bannerTxt.appendChild(editIcon);

  banner.appendChild(bannerTxt);
  document.body.insertBefore(banner, document.body.firstChild);
};

// !--------------------------------------- Remove Filters
/**
 * Removes filters from the page.
 */
const removeFilters = () => {
  const filtersElements = document.querySelectorAll(".filters");

  filtersElements.forEach((filtersElement) => {
    filtersElement.innerHTML = "";
  });
};

// !--------------------------------------- Modify Button Functions
const addModifyBtn = () => {
  const modifyBtn = document.createElement("button");
  modifyBtn.classList.add("modify");

  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");

  modifyBtn.appendChild(editIcon);
  modifyBtn.appendChild(document.createTextNode(" modifier"));

  const portfolioTitle = document.getElementById("portfolioTitle");
  portfolioTitle.appendChild(modifyBtn);

  modifyBtn.addEventListener("click", setDeleteModal);
};

// !--------------------------------------- Modal Functions

/**
 * Sets up the delete modal by creating the necessary DOM elements and attaching event listeners.
 * 
 */
const setDeleteModal = () => {
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
};

/**
 * Sets up the create modal by creating and appending the necessary elements.
 */
const setCreateModal = () => {
  const modal = document.createElement("section");
  const iconModal = document.createElement("div");
  const arrowLeft = document.createElement("i");
  const iconClose = document.createElement("i");
  const titleModal = document.createElement("h3");

  const addPhoto = document.createElement("div");
  const iconeImg = document.createElement("i");

  const labelImg = document.createElement("label");
  labelImg.htmlFor = "image";

  const imgInput = document.createElement("input");
  imgInput.type = "file";
  imgInput.id = "image";
  imgInput.accept = ".jpg, .jpeg, .png";
  imgInput.style.display = "none"; 
  const addButton = document.createElement("input");
  addButton.type = "button";
  addButton.value = "+ Ajouter photo";
  

  const detailsImg = document.createElement("p");
  const form = document.createElement("form");

  const titleImg = document.createElement("label");
  titleImg.id = "label";
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
  const line = document.createElement("div");

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Valider";
  submitButton.id = "submit";

  titleModal.textContent = "Ajout photo";
  detailsImg.textContent = "jpg, png : 4mo max";

  document.body.classList.add("modal-open");
  modal.classList.add("modal");
  iconModal.classList.add("iconModal");
  arrowLeft.classList.add("fa-solid", "fa-arrow-left");
  iconClose.classList.add("fa-solid", "fa-xmark");
  iconeImg.classList.add("fa-regular", "fa-image");
  addPhoto.classList.add("add-photo");
  addButton.classList.add("img-input");
  line.classList.add("line");

  portfolio.appendChild(modal);
  modal.appendChild(iconModal);
  iconModal.appendChild(arrowLeft);
  iconModal.appendChild(iconClose);
  modal.appendChild(titleModal);
  modal.appendChild(addPhoto);
  addPhoto.appendChild(iconeImg);
  addPhoto.appendChild(labelImg);
  addPhoto.appendChild(imgInput);
  addPhoto.appendChild(addButton);
  addPhoto.appendChild(detailsImg);
  form.appendChild(titleImg);
  form.appendChild(inputTxt);
  form.appendChild(labelCat);
  form.appendChild(select);
  form.appendChild(line);
  form.appendChild(submitButton);
  modal.appendChild(form);

  addButton.addEventListener("click", () => {
    imgInput.click();
  });
  
  imgInput.addEventListener("change", workPreview);
  arrowLeft.addEventListener("click", setDeleteModal);
  iconClose.addEventListener("click", closeModal);


};

// !--------------------------------------- Close modal
const closeModal = () => {
  const modal = document.querySelector(".modal");
  modal.remove();
  document.body.classList.remove("modal-open");
};

// !--------------------------------------- Delete work
const deleteWork = async (Id) => {
  const token = localStorage.getItem("userToken");
  try {
    const response = await fetch(`http://localhost:5678/api/works/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert("Le travail a bien été supprimé");
      setDeleteModal();
    } else {
      const errorMessage = "Une erreur est survenue lors de la suppression du travail.";
      console.error(errorMessage);
    }
  } catch (error) {
    console.error("Veuillez vous connecter :", error);
  }
};

function displayPreview(file) {
  const previewContainer = document.querySelector(".add-photo");
  const previewImg = document.createElement("figure");
  previewImg.classList.add("img-preview");

  const reader = new FileReader();
  reader.addEventListener("load", () => {
    previewImg.innerHTML = `<img src="${reader.result}" alt="Preview">`;
    previewContainer.innerHTML = "";
    previewContainer.appendChild(previewImg);
  });

  reader.readAsDataURL(file);
}

// !--------------------------------------- Delete work
function workPreview(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  const showAlert = () => {
    alert("Veuillez sélectionner une image au format JPG, JPEG ou PNG, et dont la taille est inférieure à 4 Mo.");
  };

  if (file && validateWorkFile(file)) {
    displayPreview(file);
  } else {
    showAlert();
  }
}
  

const validateWorkFile = (file) => {
  const allowedTypes = new Set(["image/jpeg", "image/jpg", "image/png"]);
  const maxFileSize = 4 * 1024 * 1024;

  return allowedTypes.has(file.type) && file.size <= maxFileSize;
};


// !--------------------------------------- Add work
const addWork = () => {
  const formData = new FormData();
  const inputTxt = document.getElementById("texte"); // Add this line to get the input element
  formData.append("title", inputTxt.value);
  formData.append("category", select.value);
  formData.append("image", imgInput.files[0]);

  const token = localStorage.getItem("userToken");

  fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  })
    .then(res => {
      if (res.ok) {
        alert("Le travail a bien été ajouté");
        setDeleteModal();
      }
    });
};

// !--------------------------------------- Validate form


// !--------------------------------------- Reset Form


// !--------------------------------------- Log in
const login = () => {
  const log = document.getElementById("log");

  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    log.innerText = "logout";

    log.addEventListener("click", (event) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      log.innerText = "login";

      banner.remove();
      modifyBtn.remove();

      alert("Vous êtes déconnecté");
    });
  } else {
    log.innerText = "login";
  }
};

// !--------------------------------------- Initialization
/**
 * Initializes the application by fetching works and categories.
 * Checks if the user is logged in and displays the appropriate page.
 *
 * @return {Promise<void>} - A promise that resolves when the initialization is complete.
 */
const initialize = async () => {
  await getWorks();
  await getCategories();
  const userToken = localStorage.getItem("userToken");
  userToken ? displayAdmin() : displayUser();
};

initialize();
