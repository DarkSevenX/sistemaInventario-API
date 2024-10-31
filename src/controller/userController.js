import { userService } from '../service/userService.js';

class UserController {
  async getUser(req, res) {
    const userId = req.user.id;

    try {
      const user = await userService.getUser(userId);
      return !user
        ? res.status(404).json({ message: 'User not found' })
        : res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error getting user' });
    }
  }

  async updateUser(req, res) {
    const userId = req.user.id;
    const data = req.body;

    try {
      const updatedUser = await userService.updateUser(userId, data);
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return error.code === 'P2025'
        ? res.status(404).json({ message: 'User not found' })
        : res.status(500).json({ message: 'Error updating user' });
    }
  }

  async deleteUser(req, res) {
    const userId = req.user.id;

    try {
      await userService.deleteUser(userId);
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return error.code === 'P2025'
        ? res.status(404).json({ message: 'User not found' })
        : res.status(500).json({ message: 'Error deleting user' });
    }
  }
}

const userController = new UserController();
export { userController };
