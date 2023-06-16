const getUserName = async (userId) => {
    const response = await fetch(`http://localhost:3000/users/${userId}/`);

    if(response.ok) {
        const user = await response.json()
        return user.name;
    } else {
        return 'Usuário não localizado'
    }
}