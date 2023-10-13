// selected elements for later use
let RandomUsers = [];
const gallery = document.getElementById('gallery');

// Get and display 12 random users
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
    // randomUsers is an array of objects
    // thumbnail is at obj.picture.thumbnail (also has large and medium)
    // name is at obj.name.first, obj.name.last (also has title)
    // email is at obj.email
    // city is at objlocation.city
    // full address: obj.location.street.number + obj.location.street.name, 
    //               obj.location.city, obj.location.state, obj.location.country, obj.location.postcode
    randomUsers.forEach(user => {
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
        gallery.insertAdjacentHTML('beforeend', userHTML);
    })
}

// formatting functions
function formatCell(cell) {
    // regex formatting on user.cell
    return null;
}
function formatAddress(user) {
    const address = `${user.location.street.number} ${user.location.street.name}, 
                    ${user.location.city}, ${user.location.state} ${user.location.postcode}
                    `
    return address
}
function formatBirthday(dob){
    // regex formatting on user.dob.date
    return null;
}

function displayModal(user) {
    const userPhone = formatCell(user.cell);
    const userAddress = formatAddress(user);
    const userBirthday = formatBirthday(user.dob.date)
    const userData = {...user, 'cellphone': userPhone, 'fullAddress': userAddress, 'birthday': userBirthday}
    const modal = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.thumbnail}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${userData.cellphone}</p>
                <p class="modal-text">${userData.fullAddress}</p>
                <p class="modal-text">Birthday: ${userData.birthday}</p>
            </div>
        </div>
    </div>
    `
    gallery.insertAdjacentHTML('beforeend', modal);
    const closeBtn = document.querySelector('#modal-close-btn');
    closeBtn.addEventListener('click', () => {
        gallery.lastElementChild.remove();
    })
}

getUsers('https://randomuser.me/api/?results=12');

// event listeners
gallery.addEventListener('click', (evt) => {
    const card = evt.target.closest('.card');
    const userName = card.querySelector('#name').textContent;
    const user = randomUsers.find(user => {
        if (userName.includes(user.name.first) && userName.includes(user.name.last)) {
            return user;
        }
    });
    displayModal(user);
})