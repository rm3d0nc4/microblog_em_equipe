import { DataTypes, Model } from "sequelize";
import db from "../db";

class SComment extends Model {}
SComment.init({
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, 
{
  sequelize: db,
  modelName: 'SComment',
  tableName: 'SComment',
  timestamps: false
});

export default SComment;