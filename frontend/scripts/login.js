document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('button')
    loginButton.addEventListener('click', (event) => {
        event.preventDefault()
        const loginData = document.getElementById('loginData')
        const email = loginData[0].value;
        const password = loginData[1].value;
        login(email, password)
    })
})
const login = async (email, password) => {
    console.log("User: " + email)
    console.log("Password: " + password)
    
}