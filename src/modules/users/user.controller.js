const userService = require('./user.service');

class UserController {
  async getPreferences(req, res) {
    try {
      const userId = req.user.userId;

      const user = await userService.getUserById(userId);

      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      res.status(200).json({
        preferences: user.preferences
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }

  async updatePreferences(req, res) {
    try {
      const userId = req.user.userId;
      const { categories, language, sources } = req.body;

      const updatedPreferences = await userService.updatePreferences(
        userId,
        { categories, language, sources }
      );

      res.status(200).json({
        message: 'Preferences updated',
        preferences: updatedPreferences
      });
    } catch (error) {
      res.status(400).json({
        message: error.message
      });
    }
  }
}

module.exports = new UserController();