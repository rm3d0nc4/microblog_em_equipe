import { DataTypes, Model } from "sequelize";
import db from "../db";

class SPost extends Model {}
SPost.init({
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, 
{
  sequelize: db,
  modelName: 'SPost',
  tableName: 'Sposts',
  timestamps: false
});

export default SPost;