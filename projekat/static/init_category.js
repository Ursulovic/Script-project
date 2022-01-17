function init() {

    console.log(localStorage.getItem('token'));

    document.getElementById('addButton').addEventListener('click', e => {
        e.preventDefault();
        const data = {
            name: document.getElementById('catName').value,
            description: document.getElementById('catDesc').value,
            avg_weight: document.getElementById('catWeight').value,
            avg_price: document.getElementById('catPrice').value,
            tax: document.getElementById('catTax').value
        }


        fetch('http://127.0.0.1:8000/db/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,
            authorization: 'Bearer ' + localStorage.getItem('token')},
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status == 200) {location.reload();}
                else {
                    alert('Bad input or name already taken');
                }
            })

    })
}