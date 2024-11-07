import { DataTypes } from 'sequelize';
import sequelize from '../../Config/DB.js';


const Users = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  selectedSeats: {
    type: DataTypes.JSON,  
    allowNull: false
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  imagePath: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export default Users;