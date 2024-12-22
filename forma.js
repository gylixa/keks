document.addEventListener('DOMContentLoaded', function () {
    const movieForm = document.getElementById('movieForm');
    const movieTableBody = document.querySelector('#movieTable tbody');
    const localStorageKey = 'movies';

    function loadMovies() {
        const storedMovies = localStorage.getItem(localStorageKey);
        if (storedMovies) {
            const movies = JSON.parse(storedMovies);
            movies.forEach(movie => addMovieToTable(movie));
        }
    }

    function addMovieToTable(movie) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td>${movie.country}</td>
            <td>${movie.genre}</td>
            <td>${movie.description}</td>
             <td>${movie.review}</td>
        `;
        movieTableBody.appendChild(newRow);
    }

    function saveMovies() {
        const rows = movieTableBody.querySelectorAll('tr');
        const movies = Array.from(rows).map(row => {
            return {
                title: row.cells[0].textContent,
                year: row.cells[1].textContent,
                country: row.cells[2].textContent,
                 genre: row.cells[3].textContent,
                description: row.cells[4].textContent,
                review: row.cells[5].textContent
            };
        });
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
