document.addEventListener('DOMContentLoaded', function () {
    const movieForm = document.getElementById('ponrav-movie-form');
    const movieTableBody = document.getElementById('ponrav-movie-table').querySelector('tbody');
    const localStorageKey = 'ponravMovies';

    function loadMovies() {
        const storedMovies = localStorage.getItem(localStorageKey);
        if (storedMovies) {
            const movies = JSON.parse(storedMovies);
            movies.forEach(addMovieToTable);
        }
    }

    function addMovieToTable(movie) {
        const newRow = movieTableBody.insertRow();
        newRow.insertCell().textContent = movie.title;
        newRow.insertCell().textContent = movie.year;
        newRow.insertCell().textContent = movie.country;
        newRow.insertCell().textContent = movie.genre;
        newRow.insertCell().textContent = movie.description;
        newRow.insertCell().textContent = movie.review;
    }

    function saveMovies() {
        const rows = movieTableBody.querySelectorAll('tr');
        const movies = Array.from(rows).map(row => ({
            title: row.cells[0].textContent,
            year: row.cells[1].textContent,
            country: row.cells[2].textContent,
            genre: row.cells[3].textContent,
            description: row.cells[4].textContent,
            review: row.cells[5].textContent
        }));
        localStorage.setItem(localStorageKey, JSON.stringify(movies));
    }

    loadMovies();

    movieForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const year = document.getElementById('year').value;
        const country = document.getElementById('country').value;
        const genre = document.getElementById('genre').value;
        const description = document.getElementById('description').value;
        const review = document.getElementById('review').value;

        const movie = { title, year, country, genre, description, review };
        addMovieToTable(movie);
        saveMovies();
        movieForm.reset();
    });
});

