import { prisma } from '../config/database.js';

// user service
class UserService {
  // get user
  async getUser(userId) {
    return await prisma.user.findUnique({
      where: {
        id: Number(userId)
      },
      include: {
        ventas: true,
        categorias: true,
        products: true
      }
    });
  }

  // update user
  async updateUser(userId, data) {
    return await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });
  }

  // delete user
  async deleteUser(userId) {
    return await prisma.user.delete({
      where: { id: Number(userId) }
    });
  }
}

const userService = new UserService();
export { userService };
