import Users from '../DataBase/Data-Users.js';
import Seats from '../DataBase/Data-Seats.js';

class UsersService {
  async getAllUsers() {
    return await Users.findAll();
  }

  async AddUserToDB(userData) {
    try {
      // בדיקה אם המשתמש כבר קיים במערכת לפי שם
      const existingUser = await Users.findOne({
        where: { name: userData.name }
      });

      if (existingUser) {
        const error = new Error(" המשתמש הזה כבר רכש 3 מקומות ואינו יכול לרכוש יותר ");
        error.status = 400;
        throw error;
      }

      // יצירת משתמש חדש
      const newUser = await Users.create({
        name: userData.name,
        birthdate: userData.birthdate,
        totalPrice: userData.totalPrice,
        imagePath: userData.imagePath,
        selectedSeats: userData.selectedSeats, 
      });

      // עדכון מושבים שנבחרו
      const seatUpdates = userData.selectedSeats.map(seatId => {
        return Seats.update(
          { color: 'yellow' },
          { where: { id: seatId } }
        );
      });

      await Promise.all(seatUpdates);

      // קבלת מידע על המושבים המעודכנים
      const updatedSeats = await Seats.findAll({
        where: { id: userData.selectedSeats }
      });

      // החזרת המידע ללקוח
      return { user: newUser, updatedSeats };
      
    } catch (error) {
      console.error('שגיאה ביצירת משתמש חדש:', error);
      error.status = error.status || 500;
      throw error;
    }
  }
}

export default new UsersService();
