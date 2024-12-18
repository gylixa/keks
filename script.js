document.addEventListener('DOMContentLoaded', () => {
    const filmsContainer = document.getElementById('films');
    const viewedList = document.getElementById('viewed-list');
    const likedList = document.getElementById('liked-list');
    let viewedFilms = loadFromLocalStorage('viewedFilms') || new Set();
    let likedFilms = loadFromLocalStorage('likedFilms') || new Set();

    filmsContainer.addEventListener('click', (event) => {
        if (event.target.tagName !== 'IMG') return; // Click only on images

        const film = event.target.closest('.film');
        const filmTitle = film.querySelector('p').textContent;
        const filmPoster = film.querySelector('img[alt="Фильм"]').src;
        const isViewed = event.target.alt === 'Просмотрено';
        const isLiked = event.target.alt === 'Понравилось';

        handleFilmClick(event, filmTitle, filmPoster, viewedFilms, likedFilms, viewedList, likedList, isViewed, isLiked);
    });

    function handleFilmClick(event, title, poster, viewedSet, likedSet, viewedList, likedList, isViewed, isLiked) {
        const img = event.target;
        const set = isViewed ? viewedSet : likedSet;
        const list = isViewed ? viewedList : likedList;
        const svg = isViewed ? 'pr.svg' : 'pon.svg';
        const activeSvg = isViewed ? 'pr_active.svg' : 'pon_active.svg';

        if (set.has(title)) {
            img.src = img.src.replace(activeSvg, svg);
            removeFilmFromList(title, list);
            set.delete(title);
        } else {
            img.src = img.src.replace(svg, activeSvg);
            addFilmToList(title, poster, list);
            set.add(title);
        }

        saveToLocalStorage('viewedFilms', viewedFilms);
        saveToLocalStorage('likedFilms', likedFilms);
    }

    function addFilmToList(title, poster, listContainer) {
        const filmDiv = document.createElement('div');
        filmDiv.classList.add('film');
        filmDiv.innerHTML = `
            <img src="${poster}" alt="Фильм" style="height: 300px;">
            <p>${title}</p>
        `;
        listContainer.querySelector('.films').appendChild(filmDiv);
    }

    function removeFilmFromList(title, listContainer) {
        const films = Array.from(listContainer.querySelectorAll('.film'));
        const filmToRemove = films.find(film => film.textContent.includes(title));
        if (filmToRemove) {
            listContainer.querySelector('.films').removeChild(filmToRemove);
        }
    }

    function loadFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? new Set(JSON.parse(data)) : new Set();
    }

    function saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(Array.from(data)));
    }

    function restoreFilms(filmSet, listContainer) {
        filmSet.forEach(title => {
            const film = Array.from(filmsContainer.querySelectorAll('.film')).find(f => f.querySelector('p').textContent === title);
            if (film) {
                const poster = film.querySelector('img[alt="Фильм"]').src;
                const imgViewed = film.querySelector('img[alt="Просмотрено"]');
                const imgLiked = film.querySelector('img[alt="Понравилось"]');

                if (filmSet === viewedFilms && !imgViewed.src.includes('pr_active.svg')) {
                    imgViewed.src = imgViewed.src.replace('pr.svg', 'pr_active.svg');
                }
                if (filmSet === likedFilms && !imgLiked.src.includes('pon_active.svg')) {
                    imgLiked.src = imgLiked.src.replace('pon.svg', 'pon_active.svg');
                }

                const existingFilm = listContainer.querySelectorAll('.films .film p').length > 0 && Array.from(listContainer.querySelectorAll('.films .film p')).find(p => p.textContent.trim() === title);
                if (!existingFilm) {
                    addFilmToList(title, poster, listContainer);
                }
            }
        });
    }

    restoreFilms(viewedFilms, viewedList);
    restoreFilms(likedFilms, likedList);
});

