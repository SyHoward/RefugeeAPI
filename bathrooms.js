const baseURL = 'https://www.refugerestrooms.org/api/v1/restrooms/search.json'
let url;

// search form
const stateInput = document.querySelector('.state');
const unisexInput = document.querySelector('.unisex');
const adaInput = document.querySelector('.ADA');
const searchForm = document.querySelector('form');

// boolean values
let unisexValue = false;
let adaValue = false;

// results nav
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

// results section
const section = document.querySelector('section');

// pagination
let pageNumber = 1;
let displayNav = false;

// event listeners
searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', previousPage);
adaInput.addEventListener('change', function() {
    if (this.checked) {
        adaValue = true;
        console.log(adaValue)
    } else {
        adaValue = false;
        console.log(adaValue)
    }
});
unisexInput.addEventListener('change', function() {
    if (this.checked) {
        unisexValue = true;
        console.log(unisexValue)
    } else {
        unisexValue = false;
        console.log(unisexValue)
    }
    }
);

// fetch url
function fetchResults(e) {
    e.preventDefault();
    url = baseURL + '?&page=' + pageNumber + '&per_page=12&offset=0' + '&ada=' + adaValue + '&unisex=' + unisexValue + '&query=' + stateInput.value;
    console.log(url);

// https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=10&offset=0&ada=true&unisex=true&query=indiana

// fetch function
fetch(url)
    .then(function(results) {
    console.log(results)
    return results.json();
    }) 
    .then(function(json) {
        console.log(json)
        displayResults(json);
    });
}
// refreshing display 
function displayResults(json) {
    console.log("DisplayResults", json);
    let bathrooms = json;

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }
    if(bathrooms.length === 0) {
        console.log('No results');
    } else {
        for(let i = 0; i < bathrooms.length; i++) {
            let heading = document.createElement('h2');
            let city = document.createElement('p');
            let street = document.createElement('p');
            let directions = document.createElement('p');
            let state = document.createElement('p')
            let container = document.createElement('div')
            

            // ! link to google map with coordinates info?

            let current = bathrooms[i];
            console.log("current:", current);

            section.appendChild(container);
            container.appendChild(heading);
            container.appendChild(city);
            container.appendChild(state);
            container.appendChild(street);
            container.appendChild(directions);

            heading.textContent = bathrooms[i].name;
            city.textContent = 'City: ' + bathrooms[i].city;
            street.textContent = 'Address: ' +bathrooms[i].street;
            directions.textContent = 'Directions: ' +bathrooms[i].directions;
            state.textContent = 'State: ' +bathrooms[i].state;
            // };
        };
    }   

if(bathrooms.length === 12) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
};

// nav functions
function nextPage(e) {
    pageNumber++;
    fetchResults(e);
};

function previousPage(e) {
    if(pageNumber > 1) {
        pageNumber--;
    } else {
    return;
    }
    fetchResults(e);
};
