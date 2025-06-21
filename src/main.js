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

let currentPage = 1;
let totalImages = 0;
let currentQuery = "";

async function handleSubmit(event) {
    event.preventDefault();
    const query = event.target.elements.searchText.value.trim();

    if (!query) {
        iziToast.error({
            title: "Error",
            message: "Please enter a search query!"
        });
        return;
    }

    currentQuery = query;
    currentPage = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await getImagesByQuery(currentQuery, currentPage);
        totalImages = data.totalHits;

        if (data.hits.length === 0) {
            iziToast.info({ title: "No Results", message: "No images found." });
            return;
        }
        createGallery(data.hits);

        if (totalImages > currentPage * 15)
            showLoadMoreButton();

    } catch (error) {
       iziToast.error({ title: "Error", message: "Failed to fetch images." }); 
    } finally {
        hideLoader();
    }
}

async function handleClick() {
    currentPage++;
    hideLoadMoreButton();
    showLoader();
    try {
      const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    if (currentPage * 15 >= totalImages) {
      iziToast.info({
        title: "End of Results",
        message: "We're sorry, but you've reached the end of search results.",
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }

    scrollGallery();
  } catch (error) {
    iziToast.error({ title: "Error", message: "Failed to load more images." });
  } finally {
    hideLoader();
  }
}

function scrollGallery() {
  const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });  
    }
