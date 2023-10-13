// Get and display 12 random users

async function getUsers(url) {
    try {
        const response = fetch(url);
        const randomUsers = (await response).json();
        console.log(randomUsers);
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

    
}
getUsers('https://randomuser.me/api/?results=12');