// Grabbing the DOM
const imageContainer = document.querySelector('#image-container');
const loader =document.querySelector('#loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

const apiKey = '-QInthpbiW9HxUbgyxhcupStm89kKxmwBpB5lerGJV4'
let count = 3;
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Image Loaded Func
function imageLoaded () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 10;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// Helper function
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create elements for links and photos and add them to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create element (a)
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    })

    // Image element
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener
    img.addEventListener('load', imageLoaded);

    // Put image inside anchor
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from PAI
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    console.log(err)
  }
}

// Check to see if near the end of the page.
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
})

// on load
getPhotos()