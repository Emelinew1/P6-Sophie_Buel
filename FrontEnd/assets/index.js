"use strict";
// !----------------------------- Constants
const body = document.querySelector("body");
const filters = document.querySelector(".filters");

// !----------------------------- Global variables
let allWorks = [];
let allCategories = [];

// !----------------------------- Functions
const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => allWorks = data);
};

const getCategories = async () => {
  await fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => allCategories = data);
};

const initGallery = () => {
  createGallery(allWorks);
};

//!------------- Function for creating the gallery 
const createGallery = (gallery) => {
  let portfolio = document.getElementById("portfolio");

  let newGallery = document.createElement("div");
  newGallery.classList.add("gallery");

  gallery.forEach((work) => {
    const figure      = document.createElement("figure");
    const img         = document.createElement("img");
    const figcaption  = document.createElement("figcaption");

    img.src                = work.imageUrl;
    figcaption.textContent = work.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    newGallery.appendChild(figure);
  });

  portfolio.appendChild(newGallery);
};

// ! ------------- Function for creating filters



// !----------------------------- General functions
const fetchData = async () => {
  await getWorks();
  await getCategories();
  initGallery();
};

fetchData();