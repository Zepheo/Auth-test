const { role: Role, ROLES } = require('../db');

function initiateRoles() {
  Role.estimatedDocumentCount((error, count) => {
    if (!error && count === 0) {
      ROLES.forEach((r) => {
        new Role({
          name: r,
        }).save((err) => {
          if (err) {
            console.log('Create role error', err);
          }

          console.log(`added '${r}' to roles collection `);
        });
      });
    }
  });
}

module.exports = initiateRoles;
