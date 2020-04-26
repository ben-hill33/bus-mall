'use strict';

var allProducts = [];

// creates link to DOM elements
var imageOneEl = document.getElementById('image-1');
var imageTwoEl = document.getElementById('image-2');
var imageThreeEl = document.getElementById('image-3');
var divEl = document.getElementById('image-container');

//Tracks how many times a user has clicked on images
var clickTracker = 25;

//Constructor function
function Products(name, src){
  this.name = name;
  this.src = src;
  this.clicked = 0;

  allProducts.push(this);
}

//Create algorithm that will randomly generate 3 unique product images from the image directory and dsiplay them side by side in the browser.
//randomizer function
function randomizer(max){
  return Math.floor(Math.random() * max);
}

//creates a function that picks 3 numbers and randomly generate
function imageGenerator(){
  var pic1 = randomizer(allProducts.length);
  console.log(pic1);
  var pic2 = randomizer(allProducts.length);
  console.log(pic2);
  var pic3 = randomizer(allProducts.length);
  console.log(pic3);

  imageOneEl.src = allProducts[pic1].src;
  imageOneEl.title = allProducts[pic1].name;

  imageTwoEl.src = allProducts[pic2].src;
  imageTwoEl.title = allProducts[pic2].name;

  imageThreeEl.src = allProducts[pic3].src;
  imageThreeEl.title = allProducts[pic3].title;
}

//removes event listener when user clicks 25 times from clickTracker
function stopClicking(){
  divEl.removeEventListener('click', handleClick);
  divEl.textContent = '';
  console.log('done');
}

new Products('bag', 'img/bag.jpg');
new Products('banana', 'img/banana.jpg');
new Products('bathroom', 'img/bathroom.jpg');
new Products('boots', 'img/boots.jpg');
new Products('breakfast', 'img/breakfast.jpg');
new Products('bubblegum', 'img/bubblegum.jpg');
new Products('chair', 'img/chair.jpg');
new Products('cthulhu', 'img/cthulhu.jpg');
new Products('dog-duck', 'img/dog-duck.jpg');
new Products('dragon', 'img/dragon.jpg');
new Products('pen', 'img/pen.jpg');
new Products('pet-sweep', 'img/pet-sweep.jpg');
new Products('scissors', 'img/scissors.jpg');
new Products('shark', 'img/shark.jpg');
new Products('babysweep', 'img/sweep.png');
new Products('tauntaun', 'img/tauntaun.jpg');
new Products('unicorn', 'img/unicorn.jpg');
new Products('usb', 'img/usb.gif');
new Products('water-can', 'img/water-can.jpg');
new Products('wine-glass', 'img/wine-glass.jpg');

// Attach an event listener 
function handleClick(event){
  //increment our property 'clicked', and generate 3 new images
  var clickedImage = event.target.title;
  console.log(clickedImage);
  for(var i = 0; i < allProducts.length; i++){
    if(clickedImage === allProducts[i].name){
      allProducts[i].clicked++;
    }
  }
  clickTracker--;


  if(clickTracker === 0){
    stopClicking();
  }
  imageGenerator();
}

divEl.addEventListener('click', handleClick);

imageGenerator();
