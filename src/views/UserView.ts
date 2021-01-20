import User from "../models/User";

export default {
  render(user: User) {
    return ({
      id: user.id,
      name: user.name,
      description: user.description,
      photoUrl: user.photoUrl,
    });
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user));
  },

}