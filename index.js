// Generating an API_KEY from the website
const API_KEY ='api_key=3c1911e53f9b7a8ac5b0cadbed16bcb7';

// Generating a BASE_URL for the movies in the site
const BASE_URL ='https://api.themoviedb.org/3';

// Instructs the API_URL to fetch a list of movies sorted by popularity
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY; 

// Using a variable to fetch the movie poster image
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Defines the URL for searching movies within the database
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

// Retrieves the main container element where the movie data will be displayed
const main = document.getElementById('main');

// Gets the form element used for movie searches
const form = document.getElementById('form');

// Retrieves the input field for entering searched terms
const search = document.getElementById('search');

// A callback function that displays the movies sorted by popularity
displayMovies(API_URL);

// Function used to display movies from the database
function displayMovies(url){

    // Makes a get request using fetch
    fetch(url)
    .then(res => res.json())
    .then(data =>{
        console.log(data.results);
        getMovies(data.results);
    });
}

function getMovies(data){
    main.innerHTML = '';

    // Iterates through the array of movies and displays them
    data.forEach(movie => {

        // Object destructuring to destructure movie object properties for easy access
        const {title, poster_path, vote_average, overview} = movie;

        // Adding movie elements to the DOM
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');
        movieE1.innerHTML =`
            <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `;
        // Appends the created movie element to the main container in the DOM
        main.appendChild(movieE1);
    });
}

// Function used to assign different colors to the movie based on their ratings
function getColor(vote){
    // Iterates over the movie rating to assign them different colors depending on their rate
    if(vote >= 8){
        return "green";
    } else if(vote >= 5){
        return "red";
    } else {
        return "blue";
    }
}

// Adding an event listener to the form element   
form.addEventListener('submit', (e) =>{

    // Prevents the default form submission behavior to handle the search function
    e.preventDefault();
    const searchTerm = search.value;

    // Uses a conditional statement to display the search results
    if(searchTerm) {
        displayMovies(searchURL+'&query='+searchTerm);
    } else {
        displayMovies(API_URL);
    }
});