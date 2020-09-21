const form = document.getElementById("film-form");
const titleElement = document.querySelector('#title');
const directorElement = document.querySelector('#director');
const urlElement = document.querySelector('#url');
const cardbody = document.querySelectorAll('.card-body')[1];
const clear = document.getElementById('clear-films')


// Loading all events

eventlisteners();

function eventlisteners() {
    form.addEventListener('submit',addFilm);
    document.addEventListener('DOMContentLoaded',function () {
       let films = Storage.getFilmsFromStorage();
       UI.loadAllFilms(films);
    });

    cardbody.addEventListener('click',deleteFilm);
    clear.addEventListener('click',clearAllFilms);
}
function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === '' || director === '' || url === ''){
        //Error
        UI.displayMessages('Fill in all blanks...','danger');
    }
    else{
        // New Film
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm); // Adding film to UI
        Storage.addFilmToStorage(newFilm); // Adding film to Storage
        UI.displayMessages('Film added successfully...','success');
    }


    UI.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();

}
function deleteFilm(e) {
    if (e.target.id === 'delete-film'){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        UI.displayMessages('Film successfully deleted...','success');
    }

}
function clearAllFilms(e) {
    if(e.target.id === 'clear-films'){
        if (confirm('Are you sure?')) {
            UI.clearAllFilmsFromUI();
            Storage.clearAllFilmsFromStorage();
        }
    }

}
