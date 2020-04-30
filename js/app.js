'use strict';

var allProducts = [];
var noImgRepeat = [];

// creates link to DOM elements
var imageOneEl = document.getElementById('image-1');
var imageTwoEl = document.getElementById('image-2');
var imageThreeEl = document.getElementById('image-3');
var divEl = document.getElementById('image-container');
var listEl = document.getElementById('list');

//Tracks how many times a user has clicked on images
var clickTracker = 25;

//Constructor function
function Products(name, src) {
  this.name = name;
  this.src = src;
  this.clicked = 0;
  this.viewed = 0;

  allProducts.push(this);
}


//randomizer function
function randomizer(max) {
  return Math.floor(Math.random() * max);
}

//creates a function that picks 3 numbers and randomly generate
//while loops will prevent the same image from showing up twice in one vote or subsequent votes
function imageGenerator() {
  var pic1 = randomizer(allProducts.length);
  while (pic1 === noImgRepeat[0] || pic1 === noImgRepeat[1] || pic1 === noImgRepeat[2]) {
    pic1 = randomizer(allProducts.length);
  }
  var pic2 = randomizer(allProducts.length);
  while (pic2 === pic1 || pic2 === noImgRepeat[0] || pic2 === noImgRepeat[1] || pic2 === noImgRepeat[2]) {
    pic2 = randomizer(allProducts.length);
  }
  var pic3 = randomizer(allProducts.length);
  while (pic3 === pic2 || pic3 === noImgRepeat[0] || pic3 === noImgRepeat[1] || pic3 === noImgRepeat[2]) {
    pic3 = randomizer(allProducts.length);
  }

  imageOneEl.src = allProducts[pic1].src;
  imageOneEl.title = allProducts[pic1].name;

  imageTwoEl.src = allProducts[pic2].src;
  imageTwoEl.title = allProducts[pic2].name;

  imageThreeEl.src = allProducts[pic3].src;
  imageThreeEl.title = allProducts[pic3].title;

  allProducts[pic1].viewed++;
  allProducts[pic2].viewed++;
  allProducts[pic3].viewed++;

  noImgRepeat[0] = pic1;
  noImgRepeat[1] = pic2;
  noImgRepeat[2] = pic3;

}

function productList() {
  for (var i = 0; i < allProducts.length; i++) {
    var listResult = document.createElement('li');
    listResult.textContent = `${allProducts[i].name.toLowerCase()}: ${allProducts[i].clicked} votes`;
    listEl.appendChild(listResult);
    console.log(listResult);
  }
}

//removes event listener when user clicks 25 times from clickTracker
function stopClicking() {
  divEl.removeEventListener('click', handleClick);
  divEl.textContent = '';
  console.log('done');
}

function seedChartData() {
  var clickArray = [];
  var labelArray = [];
  var viewedArray = [];

  for (var i = 0; i < allProducts.length; i++){
    clickArray.push(allProducts[i].clicked);
    labelArray.push(allProducts[i].name);
    viewedArray.push(allProducts[i].viewed);
  }
  return [clickArray, labelArray, viewedArray];
}

function renderChart() {
  var ctx = document.getElementById('myChart');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: seedChartData()[1],
      datasets: [{
        label: '# of Votes',
        data: seedChartData()[0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: seedChartData()[2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1

      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

new Products('R2D2 Bag', 'img/bag.jpg');
new Products('Banana Slicer', 'img/banana.jpg');
new Products('Tablet/TP Dock', 'img/bathroom.jpg');
new Products('Wet-toe Rainboots', 'img/boots.jpg');
new Products('Breakfast Station', 'img/breakfast.jpg');
new Products('Meatball Bubblegum', 'img/bubblegum.jpg');
new Products('Non-comfort Chair', 'img/chair.jpg');
new Products('Lovecraft Child', 'img/cthulhu.jpg');
new Products('Dog McDuck', 'img/dog-duck.jpg');
new Products('Canned Dragon-cuisine', 'img/dragon.jpg');
new Products('Pen-cap Meal Ready', 'img/pen.jpg');
new Products('Floor Clean Shoes', 'img/pet-sweep.jpg');
new Products('Pizza Slice Scissors', 'img/scissors.jpg');
new Products('Shark Sleeping Bag', 'img/shark.jpg');
new Products('Infant Floor Tool', 'img/sweep.png');
new Products('Tauntaun Guts Blanket', 'img/tauntaun.jpg');
new Products('Unicorn Cuisine', 'img/unicorn.jpg');
new Products('Cthulhu Mouth USB', 'img/usb.gif');
new Products('Self-watering Water-can', 'img/water-can.jpg');
new Products('Easy-fill Wine-glass', 'img/wine-glass.jpg');

// Attach an event listener
function handleClick(event) {
  //increment our property 'clicked', and generate 3 new images
  var clickedImage = event.target.title;
  console.log(clickedImage);
  for (var i = 0; i < allProducts.length; i++) {
    if (clickedImage === allProducts[i].name) {
      allProducts[i].clicked++;
    }
  }
  clickTracker--;

  if (clickTracker === 0) {
    stopClicking();
    productList();
    renderChart();
  }
  imageGenerator();
}

divEl.addEventListener('click', handleClick);

imageGenerator();
