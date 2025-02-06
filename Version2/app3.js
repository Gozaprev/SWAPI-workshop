const imgPeople = document.getElementById('people-link');
const imgShips = document.getElementById('ships-link');
const imgPlanets = document.getElementById('planets-link');
const tableContainer = document.getElementById('table-container');
const existingButtons = document.getElementsByClassName('pagination-button');

let currentPage = 1;
let totalPages = 0;
let currentEndpoint = '';

document.addEventListener('DOMContentLoaded', () => {
    imgPeople.addEventListener('click', () => {
        currentPage = 1; // Reset to the first page
        fetchDataFunc('people', currentPage);
    });
    imgShips.addEventListener('click', () => {
        currentPage = 1; // Reset to the first page
        fetchDataFunc('starships', currentPage);
    });
    imgPlanets.addEventListener('click', () => {
        currentPage = 1; // Reset to the first page
        fetchDataFunc('planets', currentPage);
    });
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

// const fetchDataFunc = async (endpoint, page) => {
//     const url = `https://swapi.dev/api/${endpoint}/?page=${page}`;
//     document.getElementById('spinner').style.display = 'block';
//     document.getElementById('error-message').style.display = 'none';

    // try {
    //     const response = await fetch(url);
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     console.log(data);
    //     currentEndpoint = endpoint; // Update the current endpoint
    //     totalPages = Math.ceil(data.count / 10); // Calculate total pages based on count

    //     if (endpoint === 'people') {
    //         displayPeople(data.results);
    //     } else if (endpoint === 'starships') {
    //         displayShips(data.results);
    //     } else if (endpoint === 'planets') {
    //         displayPlanets(data.results); 

    //     }

    //     // endpoint === 'people' ? displayPeople(data.results) : displayShips(data.results);
    // } catch (error) {
    //     console.error('Error fetching data:', error);
    //     displayErrorMessage(`Something went wrong. The error is: ${error}`); 
    // } finally {
    //     // Hide the spinner after the request is complete
    //     document.getElementById('spinner').style.display = 'none';
    // }

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log(data);
//         currentEndpoint = endpoint; 
//         totalPages = Math.ceil(data.count / 10); 

//         if (endpoint === 'people') {
//             displayPeople(data.results);
//         } else if (endpoint === 'starships') {
//             displayShips(data.results);
//         } else if (endpoint === 'planets') {
//             displayPlanets(data.results);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         displayErrorMessage(`Something went wrong. The error is: ${error}`);
//     } finally {
        
//         document.getElementById('spinner').style.display = 'none';
//     }
// }

const fetchDataFunc = async (endpoint, page) => {
    const url = `https://swapi.dev/api/${endpoint}/?page=${page}`;
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('The requested resource was not found. Please check the endpoint.');
            }
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
    } catch (error) {
        console.error('Error fetching data:', error);
        displayErrorMessage(`Something went wrong. The error is: ${error.message}`); 
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

// }



///////////////////////////////////////////////////////////////////////////////////////////////

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

//     people.forEach(person => {
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
//     });

//     tableContainer.appendChild(table);
//     createPaginationButtons();
// }

// function displayShips(ships) {
//     tableContainer.innerHTML = '';
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

//     ships.forEach(ship => {
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
//     });

//     tableContainer.appendChild(table);
//     createPaginationButtons();
// }

// function displayPlanets(planets) {
//     tableContainer.innerHTML = '';
//     const table = document.createElement('table');
//     table.innerHTML = `
//             <tr>
//                 <th>Planet Name</th>
//                 <th>Population</th>
//                 <th>Climate</th>
//                 <th>Gravity</th>
//                 <th>Terrain</th>
//             </tr>
//         `;

//     planets.forEach(planet => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//                 <td>${planet.name}</td>
//                 <td>${planet.population}</td>
//                 <td>${planet.climate}</td>
//                 <td>${planet.gravity}</td>
//                 <td>${planet.terrain}</td>
//             `;
//         table.appendChild(row);
//     });

//     tableContainer.appendChild(table);
//     createPaginationButtons();
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////


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
//         <tbody>
//             ${people.map(person => `
//                 <tr>
//                     <td>${person.name}</td>
//                     <td>${person.height}</td>
//                     <td>${person.mass}</td>
//                     <td>${person.gender}</td>
//                     <td>${person.birth_year}</td>
//                     <td>${person.films.length}</td>
//                 </tr>
//             `).join('')}
//         </tbody>
//     `;
//     tableContainer.appendChild(table);
//     createPaginationButtons();
// }

// function displayShips(ships) {
//     tableContainer.innerHTML = '';
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
//         <tbody>
//             ${ships.map(ship => `
//                 <tr>
//                     <td>${ship.name}</td>
//                     <td>${ship.model}</td>
//                     <td>${ship.manufacturer}</td>
//                     <td>${ship.cost_in_credits}</td>
//                     <td>${ship.crew}</td>
//                     <td>${ship.passengers}</td>
//                     <td>${ship.starship_class}</td>
//                 </tr>
//             `).join('')}
//         </tbody>
//     `;
//     tableContainer.appendChild(table);
//     createPaginationButtons();
// }

// function displayPlanets(planets) {
//     tableContainer.innerHTML = '';
//     const table = document.createElement('table');
//     table.innerHTML = `
//         <tr>
//             <th>Planet Name</th>
//             <th>Population</th>
//             <th>Climate</th>
//             <th>Gravity</th>
//             <th>Terrain</th>
//         </tr>
//         <tbody>
//             ${planets.map(planet => `
//                 <tr>
//                     <td>${planet.name}</td>
//                     <td>${planet.population}</td>
//                     <td>${planet.climate}</td>
//                     <td>${planet.gravity}</td>
//                     <td>${planet.terrain}</td>
//                 </tr>
//             `).join('')}
//         </tbody>
//     `;
//     tableContainer.appendChild(table);
//     createPaginationButtons();
// }

///////////////////////////////////////////////////////////////////////////////////////////////////

function displayData(data, headers) {
    tableContainer.innerHTML = '';
    const table = document.createElement('table');
    
    // Create table headers
    const headerRow = headers.map(header => `<th>${header}</th>`).join('');
    table.innerHTML = `<tr>${headerRow}</tr><tbody>${data.map(item => {
        // Create a row for each item based on the headers
        return `<tr>${headers.map(header => `<td>${item[header.toLowerCase().replace(/ /g, '_')] || ''}</td>`).join('')}</tr>`;
    }).join('')}</tbody>`;
    
    tableContainer.appendChild(table);
    createPaginationButtons();
}

function displayPeople(people) {
    const headers = ['Name', 'Height (cm)', 'Mass (kg)', 'Gender', 'Birth Year', 'Appearances'];
    displayData(people.map(person => ({
        name: person.name,
        height: person.height,
        mass: person.mass,
        gender: person.gender,
        birth_year: person.birth_year,
        appearances: person.films.length
    })), headers);
}

function displayShips(ships) {
    const headers = ['Name', 'Model', 'Manufacturer', 'Cost (credits)', 'Crew', 'Passengers', 'Class'];
    displayData(ships.map(ship => ({
        name: ship.name,
        model: ship.model,
        manufacturer: ship.manufacturer,
        cost_in_credits: ship.cost_in_credits,
        crew: ship.crew,
        passengers: ship.passengers,
        starship_class: ship.starship_class
    })), headers);
}

function displayPlanets(planets) {
    const headers = ['Planet Name', 'Population', 'Climate', 'Gravity', 'Terrain'];
    displayData(planets.map(planet => ({
        name: planet.name,
        population: planet.population,
        climate: planet.climate,
        gravity: planet.gravity,
        terrain: planet.terrain
    })), headers);
}

//////////////////////////////////////////////////////////////////////////////////////////////

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
