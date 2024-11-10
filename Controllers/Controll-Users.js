import UsersService from '../Models/Services/Srvice-Users.js';

class UsersController {
  async getAllUsers(req, res) {
    try {
      const Users = await UsersService.getAllUsers();
      res.json({ Users: Users });
    } catch (error) {
      console.error('שגיאה בשליפת המשתמשים:', error);
      res.status(500).json({ error: 'שגיאה בשליפת המשתמשים' });
    }
  }

  async AddUser(req, res) {
    try {
      const userData = {
        name: req.body.name,
        birthdate: req.body.birthdate,
        selectedSeats: JSON.parse(req.body.selectedSeats),
        totalPrice: req.body.totalPrice,
        imagePath: req.file ? req.file.path : null
      };

      const User = await UsersService.AddUserToDB(userData);
      res.json({ User: User });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default new UsersController();
