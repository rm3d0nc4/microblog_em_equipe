import { Sequelize } from "sequelize";

const db: Sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./src/databases/db.sqlite",
})

const checkConnection = async () => {
    try {
        await db.sync();
        await db.authenticate();
        console.log("Banco de dados inicializado")
    } catch (error) {
        console.log("Falha ao inicalizar banco de dados")
        
    }
}

checkConnection();

export default db;