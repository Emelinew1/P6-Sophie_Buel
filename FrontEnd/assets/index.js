"use strict";

// -----------------------------Global variables
const gallery = document.querySelector(".gallery");
let categories = null;

// -----------------------------API retrieval
const getWorks = async () => {
    const [galleryResponse, categoriesResponse] = await Promise.all([
        fetch("http://localhost:5678/api/works")
            .then(res => res.json()),
        fetch("http://localhost:5678/api/categories")
            .then(res => res.json())
    ]);

    const works = galleryResponse;
    categories = categoriesResponse;

    // Adding work to the gallery
    createGallery(works);
    createCategory();
};

getWorks();

//------------- Function for creating the gallery 
const createGallery = (gallery) => {
    let portfolio = document.getElementById("portfolio");

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

//-------------  Creates a category and adds it to the portfolio 
const createCategory = () => {
    const filter = document.createElement("div");
    filter.classList.add("filter");
    portfolio.appendChild(filter);

    filter.innerHTML =
        `<div class="button selected" id="0">Tous</div>` +
        categories
            .map(
                (category, index) =>
                    `<div class="button" id="${index + 1}">${category.name}</div>`
            )
            .join("");
  };

