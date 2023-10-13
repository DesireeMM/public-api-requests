// Get and display 12 random users

async function getUsers(url) {
    try {
        const response = fetch(url);
        const userJSON = (await response).json();
        const randomUsers = (await userJSON).results;
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
    //               obj.location.city, obj.location.state, obj.location.country, obj.logcation.postcode
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
        document.querySelector('#gallery').insertAdjacentHTML('beforeend', userHTML);
    })

}
getUsers('https://randomuser.me/api/?results=12');