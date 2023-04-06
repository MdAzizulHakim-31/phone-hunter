const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.innerText = '';
    // display 10 phones
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none')

    }

    // display no found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 mt-3 border border-info-subtle">
            <img src="${phone.image}" class="card-img-top p-4" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                
            </div>
        </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

// search button
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10)
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(10)
    }
});

// loading spinner section
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})


// showing details section
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p><h5><u>Brand</u>: </h5>${phone.brand} </p>
    <p><h5><u>Release Date</u>: </h5>${phone.releaseDate ? phone.releaseDate:'No information'} </p>
    <h5><u>Main Features</u>:</h5>
    <p>Chip set: ${phone.mainFeatures.chipSet} </p>
    <p>Display Size: ${phone.mainFeatures.displaySize} </p>
    <p>Memory: ${phone.mainFeatures.memory} </p>
    <h5><u>Sensors</u>: </h5>
    <p>${phone.mainFeatures.sensors} </p>
    <h5><u>Storage</u>: </h5>
    <p>${phone.mainFeatures.storage} </p>
    <h5><u>Others</u>: </h5>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth : 'No information'} </p>
    <p>GPS: ${phone.others ? phone.others.GPS : 'No information'} </p>
    <p>NFC: ${phone.others ? phone.others.NFC : 'No information'} </p>
    <p>Radio: ${phone.others ? phone.others.Radio : 'No information'} </p>
    <p>USB: ${phone.others ? phone.others.USB : 'No information'} </p>
    <p>WLAN: ${phone.others ? phone.others.WLAN : 'No information'} </p> 
    `

}
loadPhones('apple');

{/*
*/}