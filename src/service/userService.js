import { prisma } from '../config/database.js';

class UserService {
  /**
   * Obtiene un usuario por ID.
   * @param {number} userId - ID del usuario.
   * @returns {Promise<object>} - El usuario solicitado.
   */
  async getUser(userId) {
    return await prisma.user.findUnique({
      where: {
        id: Number(userId)
      },
      select: {
        id: true,
        username: true,
        ventas: true,
        categorias: true,
        products: true,
        providers: true
      }
    });
  }

  /**
    * Crea un nuevo usuario en la base de datos.
    * @param {string} username - Nombre de usuario.
    * @param {string} password - Contraseña del usuario.
    * @param {string} email - Email del usuario.
    * @returns {Promise<object>} - El usuario creado.
    */
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

  /**
    * Elimina un usuario de la base de datos.
    * @param {number} userId - ID del usuario.
    * @returns {Promise<void>} - Sin retorno.
    */
  async deleteUser(userId) {
    return await prisma.user.delete({
      where: { id: Number(userId) }
    });
  }
}

const userService = new UserService();
export { userService };
