function init() {

    //Login
    document.getElementById('btnLogin').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            email: document.getElementById('emaillogin').value,
            password: document.getElementById('passwordlogin').value
        }

        fetch('http://127.0.0.1:8001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(el => {
                if (el.msg) {
                    alert(el.msg);
                }
                else {
                    document.cookie = `token=${el.token};SameSite=Lax`;
                    localStorage.setItem("token", el.token);
                }
            })

    })


    //Register
    document.getElementById('btnregister').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('nameregister').value,
            email: document.getElementById('emailregister').value,
            password: document.getElementById('passwordregister').value
        }

        fetch('http://127.0.0.1:8001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.status !== 200) {
                    alert('Username already taken');
                }
                return res.json();
            })
            .then(res => {
                console.log(res);
                document.cookie = `token=${res.token};SameSite=Lax`;
                localStorage.setItem("token", res.token);


            })


    })



}