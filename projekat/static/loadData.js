async function loadData(url) {
     const table = document.getElementById('table_');
     const tableHead = table.tHead;
     const tableBody = table.getElementsByTagName('tbody')[0];


    const res = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    });

    const response = await res.json();

    keys = Object.keys(response.tableHeaders);
    keys.push('Actions');

    for (const text of keys) {

        const headerElement = document.createElement('th');
        headerElement.textContent = text;
        tableHead.appendChild(headerElement);
    }


    for (const row of response.rows) {
        const rowElement = document.createElement('tr');




        for (element of Object.values(response.tableHeaders)) {
            const cellElement = document.createElement('td');

            cellElement.textContent = row[element];

            rowElement.appendChild(cellElement);
           
        }

        const removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'btn btn-danger');
        removeButton.textContent = "Remove"
        removeButton.setAttribute('id', 'removeButton '+ row.id)
        rowElement.appendChild(removeButton);


        tableBody.appendChild(rowElement);


    }

    
    
}

