import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

import { getImagesByQuery } from "./js/pixabay-api.js";

import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
    loadMore
} from "./js/render-functions.js";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit)

loadMore.addEventListener("click", handleClick)


