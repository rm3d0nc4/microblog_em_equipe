import { DataTypes, Model } from "sequelize";
import db from "../db";
import SPost from "./s_post";
import SComment from "./s_comment";

class SUser extends Model {}

SUser.init({
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
}, {
    sequelize: db,
    modelName: 'SUser',
    tableName: 'Susers'
});

SUser.hasMany(SPost)
SPost.belongsTo(SUser)

SUser.hasMany(SComment)
SComment.belongsTo(SUser)



export default SUser;