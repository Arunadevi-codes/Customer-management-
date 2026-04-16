//  $2b$10$Et0v7WsubGlaOUCxqTWyf.YUlZXErdJMOn2gD.WAvMG1TDsvp9uaW 
// $2b$10$iMY.1KDwpXLHs8iKTS5CFOqobAw2Bom4CaP4rJ.9LZvBZ8EjMwOrm 
 const bcrypt = require("bcryptjs");

bcrypt.hash("admin123", 10).then(hash => {
  console.log(hash);
});