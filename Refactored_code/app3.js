// const imgPeople = document.getElementById('people-link');
// const imgShips = document.getElementById('ships-link');
// const tableContainer = document.getElementById('table-container');
// const existingButtons = document.getElementsByClassName('pagination-button');

// let currentPage = 1; 
// let totalPages = 0; 
// let currentEndpoint = ''; 

// document.addEventListener('DOMContentLoaded', () => {
//     imgPeople.addEventListener('click', () => fetchData('people', currentPage));
//     imgShips.addEventListener('click', () => fetchData('starships', currentPage));
// });

// function fetchData(endpoint, page) {
//     const url = `https://swapi.dev/api/${endpoint}/?page=${page}`;

//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data);
//             currentEndpoint = endpoint; // Update the current endpoint
//             totalPages = Math.ceil(data.count / 10); // Calculate total pages based on count, so no need to slice like before

//             if (endpoint === 'people') {
//                 const limitedPeople = data.results; 
//                 // const limitedPeople = data.results.slice(0, 10); //Ogranicuva na 10 lugje
//                 displayPeople(limitedPeople);
//             } else if (endpoint === 'starships') {
//                 displayShips(data.results);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//         });
// }

// function displayPeople(people) {
//     tableContainer.innerHTML = ''; 
//     const table = document.createElement('table');
//     table.innerHTML = `
//         <tr>
//             <th>Name</th>
//             <th>Height (cm)</th>
//             <th>Mass (kg)</th>
//             <th>Gender</th>
//             <th>Birth Year</th>
//             <th>Appearances</th>
//         </tr>
//     `;

//     for (const person of people) {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${person.name}</td>
//             <td>${person.height}</td>
//             <td>${person.mass}</td>
//             <td>${person.gender}</td>
//             <td>${person.birth_year}</td>
//             <td>${person.films.length}</td>
//         `;
//         table.appendChild(row);
//     }

//     tableContainer.appendChild(table);
//     createPaginationButtons(); 
// }

// function displayShips(ships) {
//     tableContainer.innerHTML = ''; // If not cleared, only appends more data
//     const table = document.createElement('table');
//     table.innerHTML = `
//         <tr>
//             <th>Name</th>
//             <th>Model</th>
//             <th>Manufacturer</th>
//             <th>Cost (credits)</th>
//             <th>Crew</th>
//             <th>Passengers</th>
//             <th>Class</th>
//         </tr>
//     `;

//     for (const ship of ships) {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${ship.name}</td>
//             <td>${ship.model}</td>
//             <td>${ship.manufacturer}</td>
//             <td>${ship.cost_in_credits}</td>
//             <td>${ship.crew}</td>
//             <td>${ship.passengers}</td>
//             <td>${ship.starship_class}</td>
//         `;
//         table.appendChild(row);
//     }

//     tableContainer.appendChild(table);
//     createPaginationButtons(); 
// }

// function createPaginationButtons() {

//     while (existingButtons.length > 0) {
//         existingButtons[0].remove(); 
//     }


//     const prevButton = document.createElement('button');
//     prevButton.innerText = 'Previous';
//     prevButton.classList.add('pagination-button');
//     prevButton.disabled = currentPage <= 1; // Disable if on the first page
//     prevButton.addEventListener('click', () => changePage(-1));
//     tableContainer.appendChild(prevButton);


//     const nextButton = document.createElement('button');
//     nextButton.innerText = 'Next';
//     nextButton.classList.add('pagination-button');
//     nextButton.disabled = currentPage >= totalPages; // Disable if on the last page
//     nextButton.addEventListener('click', () => changePage(1));
//     tableContainer.appendChild(nextButton);
// }

// function changePage(direction) {
//     currentPage += direction; // Update the current page based on direction
//     fetchData(currentEndpoint, currentPage); // Fetch data for the new page
// }



const imgPeople = document.getElementById('people-link');
const imgShips = document.getElementById('ships-link');
const imgPlanets = document.getElementById('planets-link');
const tableContainer = document.getElementById('table-container');
const existingButtons = document.getElementsByClassName('pagination-button');

let currentPage = 1;
let totalPages = 0;
let currentEndpoint = '';

document.addEventListener('DOMContentLoaded', () => {
    imgPeople.addEventListener('click', () => fetchDataFunc('people', currentPage));
    imgShips.addEventListener('click', () => fetchDataFunc('starships', currentPage));
    imgPlanets.addEventListener('click', () => fetchDataFunc('planets', currentPage));
});

// async function fetchData(endpoint, page) {
//     const url = `https://swapi.dev/api/${endpoint}/?page=${page}`;

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data);
//         currentEndpoint = endpoint; // Update the current endpoint
//         totalPages = Math.ceil(data.count / 10); // Calculate total pages based on count

//         endpoint === 'people' ? displayPeople(data.results) : displayShips(data.results);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

const fetchDataFunc = async (endpoint, page) => {
    const url = `https://swapi.dev/api/${endpoint}/?page=${page}`;
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        currentEndpoint = endpoint; // Update the current endpoint
        totalPages = Math.ceil(data.count / 10); // Calculate total pages based on count

        if (endpoint === 'people') {
            displayPeople(data.results);
        } else if (endpoint === 'starships') {
            displayShips(data.results);
        } else if (endpoint === 'planets') {
            displayPlanets(data.results); 

        }

        // endpoint === 'people' ? displayPeople(data.results) : displayShips(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
        displayErrorMessage(`Something went wrong. The error is: ${error}`); 
    } finally {
        // Hide the spinner after the request is complete
        document.getElementById('spinner').style.display = 'none';
    }

}

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.innerText = message; // Set the error message
    errorMessageElement.style.display = 'block'; // Show the error message
    tableContainer.innerHTML = ''; // Clear the table container
}


function displayPeople(people) {
    tableContainer.innerHTML = '';
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Height (cm)</th>
            <th>Mass (kg)</th>
            <th>Gender</th>
            <th>Birth Year</th>
            <th>Appearances</th>
        </tr>
    `;

    people.forEach(person => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.name}</td>
            <td>${person.height}</td>
            <td>${person.mass}</td>
            <td>${person.gender}</td>
            <td>${person.birth_year}</td>
            <td>${person.films.length}</td>
        `;
        table.appendChild(row);
    });

    tableContainer.appendChild(table);
    createPaginationButtons();
}

function displayShips(ships) {
    tableContainer.innerHTML = '';
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Cost (credits)</th>
            <th>Crew</th>
            <th>Passengers</th>
            <th>Class</th>
        </tr>
    `;

    ships.forEach(ship => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ship.name}</td>
            <td>${ship.model}</td>
            <td>${ship.manufacturer}</td>
            <td>${ship.cost_in_credits}</td>
            <td>${ship.crew}</td>
            <td>${ship.passengers}</td>
            <td>${ship.starship_class}</td>
        `;
        table.appendChild(row);
    });

    tableContainer.appendChild(table);
    createPaginationButtons();
}

function displayPlanets(planets) {
    tableContainer.innerHTML = '';
    const table = document.createElement('table');
    table.innerHTML = `
            <tr>
                <th>Planet Name</th>
                <th>Population</th>
                <th>Climate</th>
                <th>Gravity</th>
                <th>Terrain</th>
            </tr>
        `;

    planets.forEach(planet => {
        const row = document.createElement('tr');
        row.innerHTML = `
                <td>${planet.name}</td>
                <td>${planet.population}</td>
                <td>${planet.climate}</td>
                <td>${planet.gravity}</td>
                <td>${planet.terrain}</td>
            `;
        table.appendChild(row);
    });

    tableContainer.appendChild(table);
    createPaginationButtons();
}

function createPaginationButtons() {
    while (existingButtons.length > 0) {
        existingButtons[0].remove();
    }

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.classList.add('pagination-button');
    prevButton.disabled = currentPage <= 1;
    prevButton.addEventListener('click', () => changePage(-1));
    tableContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.classList.add('pagination-button');
    nextButton.disabled = currentPage >= totalPages;
    nextButton.addEventListener('click', () => changePage(1));
    tableContainer.appendChild(nextButton);
}

function changePage(direction) {
    currentPage += direction;
    fetchDataFunc(currentEndpoint, currentPage);
}
