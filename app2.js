const imgPeople = document.getElementById('people-link');
const imgShips = document.getElementById('ships-link');
const tableContainer = document.getElementById('table-container');

document.addEventListener('DOMContentLoaded', () => {


    imgPeople.addEventListener('click', () => fetchData('people'));
    imgShips.addEventListener('click', () => fetchData('starships'));
});



function fetchData(endpoint) {
    const url = `https://swapi.dev/api/${endpoint}/`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            if (endpoint === 'people') {

                const limitedPeople = data.results.slice(0, 10); //Ogranicuva na 10 lugje
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
    const tableContainer = document.getElementById('table-container');
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
}

