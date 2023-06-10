document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.querySelector('button')
    registerButton.addEventListener('click', (event) => {
        event.preventDefault()
        const loginData = document.getElementById('loginData')
        const name = loginData[0].value;
        const email = loginData[1].value;
        const password = loginData[2].value;
        register(name, email, password)
    })
})
const register = async (name, email, password) => {
    const data = {
        "name": `${name}`,
        "email": `${email}`,
        "password": `${password}`
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(`http://localhost:3000/register/`, options);
    
    if (response.ok) {
        console.log("Usuario cadastrado")
    }
}