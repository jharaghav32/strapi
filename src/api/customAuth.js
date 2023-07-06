// ./api/customAuth/controllers/customAuth.js
const { controller, post } = require('strapi').config.functions.router;

module.exports = controller({
  register: post('/custom-register', async (ctx) => {
    const { username, email, password, role } = ctx.request.body;

    try {
      // Retrieve the desired role
      const targetRole = await strapi.query('role', 'admin').findOne({ name: role });

      if (!targetRole) {
        return ctx.throw(404, 'Role not found');
      }

      // Create the user with the assigned role
      const user = await strapi.query('user', 'users-permissions').create({
        username,
        email,
        password,
        role: targetRole.id,
      });

      // Return the registered user
      ctx.send({ user });
    } catch (error) {
      // Handle any errors
      ctx.throw(500, 'An error occurred during user registration');
    }
  }),
});
