const imgPeople = document.getElementById('people-link');
const imgShips = document.getElementById('ships-link');
const tableContainer = document.getElementById('table-container');
const existingButtons = document.getElementsByClassName('pagination-button');

let currentPage = 1; 
let totalPages = 0; 
let currentEndpoint = ''; 

document.addEventListener('DOMContentLoaded', () => {
    imgPeople.addEventListener('click', () => fetchData('people', 1));
    imgShips.addEventListener('click', () => fetchData('starships', 1));
});

function fetchData(endpoint, page) {
    const url = `https://swapi.dev/api/${endpoint}/?page=${page}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            currentEndpoint = endpoint; // Update the current endpoint
            totalPages = Math.ceil(data.count / 10); // Calculate total pages based on count, so no need to slice like before

            if (endpoint === 'people') {
                const limitedPeople = data.results; 
                displayPeople(limitedPeople);
            } else if (endpoint === 'starships') {
                displayShips(data.results);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
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

    for (const person of people) {
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
    }

    tableContainer.appendChild(table);
    createPaginationButtons(); 
}

function displayShips(ships) {
    tableContainer.innerHTML = ''; // If not cleared, only appends more data
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

    for (const ship of ships) {
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
    }

    tableContainer.appendChild(table);
    createPaginationButtons(); 
}

// function createPaginationButtons() {
//     // Clear existing buttons if any
//     const existingButtons = document.querySelectorAll('.pagination-button');
//     existingButtons.forEach(button => button.remove());

//     // Create Previous button
//     const prevButton = document.createElement('button');
//     prevButton.innerText = 'Previous';
//     prevButton.classList.add('pagination-button');
//     prevButton.disabled = currentPage <= 1; // Disable if on the first page
//     prevButton.addEventListener('click', () => changePage(-1));
//     tableContainer.appendChild(prevButton);

//     // Create Next button
//     const nextButton = document.createElement('button');
//     nextButton.innerText = 'Next';
//     nextButton.classList.add('pagination-button');
//     nextButton.disabled = currentPage >= totalPages; // Disable if on the last page
//     nextButton.addEventListener('click', () => changePage(1));
//     tableContainer.appendChild(nextButton);
// }

//////////////////////////////////////////////////////////////


function createPaginationButtons() {
    // Clear existing buttons if any
    
    while (existingButtons.length > 0) {
        existingButtons[0].remove(); // Remove the first button until none are left
    }

    
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.classList.add('pagination-button');
    prevButton.disabled = currentPage <= 1; // Disable if on the first page
    prevButton.addEventListener('click', () => changePage(-1));
    tableContainer.appendChild(prevButton);

    
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.classList.add('pagination-button');
    nextButton.disabled = currentPage >= totalPages; // Disable if on the last page
    nextButton.addEventListener('click', () => changePage(1));
    tableContainer.appendChild(nextButton);
}

function changePage(direction) {
    currentPage += direction; // Update the current page based on direction
    fetchData(currentEndpoint, currentPage); // Fetch data for the new page
}

