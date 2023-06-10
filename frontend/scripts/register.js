document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.querySelector('button')
    loginButton.addEventListener('click', (event) => {
        event.preventDefault()
        const loginData = document.getElementById('loginData')
        const name = loginData[0].value;
        const email = loginData[1].value;
        const password = loginData[2].value;
        login(email, password)
    })
})
const login = async (email, password) => {
    console.log("User: " + email)
    console.log("Password: " + password)
    
}