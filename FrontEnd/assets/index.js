"use strict";

// -----------------------------Variables globales
const allgallery = document.querySelector(".gallery");
let categories = null;

// -----------------------------Récupération sur l'API
const getWorks = async () => {
    const [galleryResponse, categoriesResponse] = await Promise.all([
      fetch("http://localhost:5678/api/works")
      .then(res => res.json()),
      fetch("http://localhost:5678/api/categories")
      .then(res => res.json())
    ]);

    const works = galleryResponse;
    categories = categoriesResponse;

    // Ajout des travaux à la galerie
    createGallery(works);
};

getWorks();

//------------- Fonction pour créer la galerie à partir des travaux récupérés
const createGallery = (gallery) => {
  let portfolio = document.getElementById("portfolio");

  portfolio.innerHTML = '';

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