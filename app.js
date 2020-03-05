let userNote = document.getElementById('user-note');
let plsAddNote = document.getElementById('plsAddNote');
const notesList = document.querySelector('#notes-list');
const title = document.querySelector('#mytitle');
const noNotes = document.createElement('p');
const clearBtn = document.getElementById('clearBtn');
noNotes.innerHTML = `You don't have any Notes</br><i class="fas fa-laugh-wink fa-3x"></i>`;
noNotes.classList.add('empty')
notesList.appendChild(noNotes)


//check if note List is empty

function checkNotes() {
    if (notesList.childElementCount > 1) {
        noNotes.style.display = "none";
        clearBtn.style.display = "block";

    } else {
        noNotes.style.display = "block";
        clearBtn.style.display = "none";
    }
}


document.addEventListener('DOMContentLoaded', localStorageOnLoad)





userNote.addEventListener("keyup", function (event) {
    // en ENter key ( enter key = 13)

    if (userNote.value != '') {
        if (event.keyCode === 13) {

            event.preventDefault();
            let userNoteText = userNote.value;
            // creat a  a div element
            let noteToAdd = document.createElement('div');
            noteToAdd.classList.add('single-note')
            noteToAdd.addEventListener('click', function (e) {
                noteToAdd.classList.toggle('line')
            })
            // adding the note inside the div as a paragraph
            noteToAdd.innerHTML = `<p class = "myparagraph" >${userNoteText}</p>`
            // create remove Btn
            let removeBtn = document.createElement('input');
            // setting the button settings 
            removeBtn.setAttribute("type", "button");
            removeBtn.setAttribute("value", "x");
            removeBtn.setAttribute("name", "");
            removeBtn.classList.add('btn', 'btn-primary')
            // adding the button & the note paragrapth inside  the div in the html file
            noteToAdd.appendChild(removeBtn);
            notesList.appendChild(noteToAdd);
            checkNotes()
            //
            removeBtn.addEventListener('click', function (e) {
                removeBtn.parentElement.remove();
                checkNotes()
                removeNoteFromStorage(e.target.parentElement.textContent)

            }) // clearing the note value
            userNote.value = "";

            checkNotes()
            // add to local storage

            addNoteLocalStorage(userNoteText);

        }
    } else {
        plsAddNote.style.display = 'flex';
        setTimeout(() => {
            plsAddNote.style.display = 'none';
        }, 800);
    }
});


// add notes to storage

function addNoteLocalStorage(userNoteText) {
    let notes = getNotesLocalStorage();
    // add the notes into the array
    notes.push(userNoteText);
    // 
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotesLocalStorage() {
    let notes;
    const notesLS = localStorage.getItem('notes');
    // gett he value , if null is returning then we creat an empty array

    if (notesLS === null) {
        notes = [];
    } else {
        notes = JSON.parse(notesLS);
    }
    return notes;

}

function localStorageOnLoad() {
    let notes = getNotesLocalStorage();
    // Loop throught storage 

    notes.forEach(function (note) {
        // creat a  a div element
        let noteToAdd = document.createElement('div');
        noteToAdd.classList.add('single-note')
        // adding the note inside the div as a paragraph
        noteToAdd.innerHTML = `<p class = "myparagraph" >${note}</p>`
        // create remove Btn
        let removeBtn = document.createElement('input');
        // setting the button settings 
        removeBtn.setAttribute("type", "button");
        removeBtn.setAttribute("value", "x");
        removeBtn.setAttribute("name", "");
        removeBtn.classList.add('btn', 'btn-primary')
        // adding the button & the note paragrapth inside  the div in the html file
        noteToAdd.appendChild(removeBtn);
        notesList.appendChild(noteToAdd);
        checkNotes()
        removeBtn.addEventListener('click', function (e) {
            removeBtn.parentElement.remove();
            checkNotes()
            removeNoteFromStorage(e.target.parentElement.textContent)
        })
    })


}

function removeNoteFromStorage(note) {
    localStorage.removeItem('notes', note);

}

// clear btn

clearBtn.addEventListener('click', function () {
    while (notesList.childElementCount > 1) {
        notesList.removeChild(notesList.lastChild);
    }
    localStorage.clear();
    checkNotes();

})