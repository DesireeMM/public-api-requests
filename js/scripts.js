// selected elements for later use
let RandomUsers = [];
const gallery = document.getElementById('gallery');
const searchBox = document.querySelector('.search-container');

// adding a search feature
searchBox.insertAdjacentHTML('beforeend', `<form id="emp-search" action="#" method="GET">
<input type="search" id="search-input" class="search-input" placeholder="Search...">
<input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`);

// GET and display 12 random users
async function getUsers(url) {
    try {
        const response = fetch(url);
        const userJSON = (await response).json();
        randomUsers = (await userJSON).results;
        displayUsers(randomUsers);
    } catch (error) {
        console.log('Something went wrong...', error);
    }
}

function displayUsers(randomUsers) {
    randomUsers.forEach(user => {
        gallery.insertAdjacentHTML('beforeend', getUserHTML(user));
    })
}

// formatting functions
function formatAddress(user) {
    const address = `${user.location.street.number} ${user.location.street.name}, 
                    ${user.location.city}, ${user.location.state} ${user.location.postcode}
                    `
    return address
}
function formatBirthday(dob){
    const dobRegex = /^(\d{4})-(\d{2})-(\d{2})/
    const birthday = dob.match(dobRegex);
    const formattedBirthday = `${birthday[2]}/${birthday[3]}/${birthday[1]}`
    return formattedBirthday;
}

// get HTML strings
function getUserHTML(user) {
    const userHTML = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="card-text">${user.email}</p>
                    <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
                </div>
            </div>
        `
    return userHTML;
}

function getModalHTML(user) {
    const userAddress = formatAddress(user);
    const userBirthday = formatBirthday(user.dob.date)
    const userData = {...user, 'fullAddress': userAddress, 'birthday': userBirthday}
    const modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.thumbnail}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${user.cell}</p>
                <p class="modal-text">${userData.fullAddress}</p>
                <p class="modal-text">Birthday: ${userData.birthday}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>
    `
    return modalHTML;
}

// function to get indexOf current modal user
function getModalIndex(user){
    return randomUsers.indexOf(user);
}

// function to display a modal container with clicked user's information
function displayModal(user) {
    const modal = getModalHTML(user);
    gallery.insertAdjacentHTML('beforeend', modal);
    
    // event listener to close modal
    const closeBtn = document.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', () => {
        gallery.lastElementChild.remove();
    })

    const currIndex = getModalIndex(user);
    // event listeners for prev/next buttons
    const prevBtn = document.getElementById('modal-prev');
    prevBtn.addEventListener('click', () => {
        if (currIndex - 1 >= 0) {
            gallery.lastElementChild.remove();
            displayModal(randomUsers[currIndex - 1]);
        } else {
            gallery.lastElementChild.remove();
            displayModal(randomUsers[11]);
        }
    })
    const nextBtn = document.getElementById('modal-next');
    nextBtn.addEventListener('click', () => {
        if (currIndex + 1 < randomUsers.length) {
            gallery.lastElementChild.remove();
            displayModal(randomUsers[currIndex + 1]);
        } else {
            gallery.lastElementChild.remove();
            displayModal(randomUsers[0]);
        }
    })
    
}

getUsers('https://randomuser.me/api/?nat=us&results=12');

// event listeners
gallery.addEventListener('click', (evt) => {
    const card = evt.target.closest('.card');
    if (card) {
        const userName = card.querySelector('#name').textContent;
        const user = randomUsers.find(user => {
            if (userName.includes(user.name.first) && userName.includes(user.name.last)) {
                return user;
            }
        });
        displayModal(user);
    }
})

document.getElementById('emp-search').onsubmit = (evt) => {
    evt.preventDefault();
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const filteredUsers = [];
    randomUsers.forEach(user => {
        if (user.name.first.toLowerCase().includes(searchInput) || user.name.last.toLowerCase().includes(searchInput)) {
            filteredUsers.push(user);
        }
    })
    gallery.innerHTML = '';
    if (filteredUsers.length > 0) {
        displayUsers(filteredUsers);
    } else {
        gallery.insertAdjacentHTML('afterbegin', `<h3>No employees match your search. Please try again.</h3>`)
    }
}

// things to address
// search related 
    // going back to all cards after searching
        // can go back by emptying the search input and clicking submit again
        // may be better to use keyup instead of submit?