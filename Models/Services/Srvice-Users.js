import Users from '../DataBase/Data-Users.js';
import Seats from '../DataBase/Data-Seats.js';


class UsersService {
  async getAllUsers() {
    return await Users.findAll({
    });
}
  async AddUserToDB(userData) {
    try {
      const newUser = await Users.create({
        name: userData.name,
        birthdate: userData.birthdate,
        totalPrice: userData.totalPrice,
        imagePath: userData.imagePath,
        selectedSeats: userData.selectedSeats, 
      });
      const seatUpdates = userData.selectedSeats.map(seatId => {
        return Seats.update(
          { color: 'yellow' },  
          { where: { id: seatId } } 
        );
      });

      // המתן לכל העדכונים להסתיים
      await Promise.all(seatUpdates);

    
      const updatedSeats = await Seats.findAll({
        where: { id: userData.selectedSeats }
      });

      // החזרת המידע ללקוח
      return { user: newUser, updatedSeats };
    } catch (error) {
      console.error('שגיאה ביצירת משתמש חדש:', error); 
      throw error;
    }
  }

  
}

export default new UsersService();