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

    // Réaffectation des variables globales
    const works = galleryResponse;
    categories = categoriesResponse;

    // Ajout des travaux à la galerie
    createGallery(works);
};

getWorks();
