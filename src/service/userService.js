import { prisma } from "../config/database.js";

// user service
class UserService {
  // get user
  async getUser(id) {
    return await prisma.user.findUnique({
      where: { id: Number(id) },
    });
  }

  // delete user
  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id: Number(id) },
    });
  }

  // update user
  async updateUser(id, data) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }
}

const userService = new UserService();
export { userService };
