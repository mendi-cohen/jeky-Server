import { DataTypes } from 'sequelize';
import sequelize from '../../Config/DB.js';

const Seat = sequelize.define('Seat', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Seat;
