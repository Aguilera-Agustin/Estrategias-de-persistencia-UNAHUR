const Sequelize = require("sequelize");

const database = {
  name: "",
  pasword: "",
  host: "",
  dialect: "mysql",
};

const sequelize = new Sequelize(
  database.name,
  database.pasword,
  database.pasword,
  {
    host: database.host,
    dialect: database.dialect,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log(
      `\nConexion establecida con la base de datos ${database.host} en ${database.host}`
    );
  })
  .catch((err) => {
    console.error(
      `\nNo se pudo establecer una conexion con la base de datos ${database.host} en ${database.host}, el error es:`,
      err
    );
  });

class Person extends Sequelize.Model {}

Person.init(
  {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    live: Sequelize.BOOLEAN,
  },
  { sequelize, modelName: "people" }
);

sequelize
  .sync()
  .then(() =>
    Person.create({
      firstName: "Agustin",
      lastName: "Aguilera",
      live: true,
    })
  )
  .then(() =>
    Person.create({
      firstName: "Juan",
      lastName: "Perez",
      live: false,
    })
  )
  .then(() =>
    Person.update({ firstName: "Paulo" }, { where: { firstName: "Juan" } })
  );
