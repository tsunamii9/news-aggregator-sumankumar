class UserService {
  constructor() {
    this.users = []; // temporary in-memory storage
  }

  async createUser(userData) {
    const existingUser = this.users.find(
      (user) => user.email === userData.email
    );

    if (existingUser) {
      throw new Error('User already exists');
    }

    const user = {
      ...userData,
      preferences: {
        categories: [],
        language: 'en',
        sources: []
      },
      readArticles: [],
      favoriteArticles: []
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email) {
    return this.users.find((user) => user.email === email);
  }


  async getUserById(id) {
    return this.users.find((user) => user.id === id);
  }

  async updatePreferences(userId, preferences) {
    const user = await this.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    user.preferences = {
      ...user.preferences,
      ...preferences
    };

    return user.preferences;
  }

  async markAsRead(userId, articleId) {
  const user = await this.getUserById(userId);
  if (!user) throw new Error('User not found');

  if (!user.readArticles.includes(articleId)) {
    user.readArticles.push(articleId);
  }

  return user.readArticles;
}

  async markAsFavorite(userId, articleId) {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');

    if (!user.favoriteArticles.includes(articleId)) {
      user.favoriteArticles.push(articleId);
    }

    return user.favoriteArticles;
  }

  async getReadArticles(userId) {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');
    return user.readArticles;
  }

  async getFavoriteArticles(userId) {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');
    return user.favoriteArticles;
  }
}

module.exports = new UserService();