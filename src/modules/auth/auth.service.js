const bcrypt = require('bcrypt');
const userService = require('../users/user.service');
const { generateToken } = require('../../config/jwt');

class AuthService {
  async register(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userService.createUser({
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
  }

  async login(email, password) {
    const user = await userService.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({
      userId: user.id,
      email: user.email
    });

    return { token };
  }
}

module.exports = new AuthService();