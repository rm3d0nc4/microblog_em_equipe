document.addEventListener('DOMContentLoaded', () => {
    const navigateToLoginButton = document.getElementById('navigate-to-login')
    const navigateToRegisterButton = document.getElementById('navigate-to-register')

    const loginForm = document.getElementById('login-form')
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const name = registerForm.querySelector('.name').value;
        const email = registerForm.querySelector('.email').value;
        const password = registerForm.querySelector('.password').value;
        await register(name, email, password)
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault()
        const email = loginForm.querySelector('.email').value;
        const password = loginForm.querySelector('.password').value;

        console.log(`${email}: ${password}`)
        await login(email, password)
    })

    navigateToRegisterButton.addEventListener('click', () => {
        changeForm(registerForm, loginForm)
    });

    navigateToLoginButton.addEventListener('click', () => {
        changeForm(loginForm, registerForm)
    });





    const changeForm = (form1, form2) => {
        form1.style.display = 'flex';
        form2.style.display = 'none';
    }
    
    
    const login = async (email, password) => {
        const data = {
            "email": email,
            "password": password
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }

        const response = await fetch('http://localhost:3000/login/', options);
        const body = await response.json();

        if(response.ok) {
            localStorage.setItem('access-token', body.accesToken)
            window.location.href = './blog.html';
        } else {
            alert(body.message);
        }
    }

    const register = async (name, email, password) => {
        const data = {
            "name": name,
            "email": email,
            "password": password
        }
    
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch(`http://localhost:3000/register/`, options);
        console.log(response)
        if (response.ok) {
            console.log("Usuário cadastrado");
            changeForm(loginForm, registerForm);
            
        } else {
            const body = await response.json();
            alert(body.message);
        }
    }
})


