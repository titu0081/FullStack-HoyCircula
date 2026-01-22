const typeorm = require("typeorm");
const auto = require("../model/auto.model");
const horario = require("../model/horario.model");
const dia_restriccion = require("../model/dias_restriccion.model");
require("dotenv").config();

const dataSource = new typeorm.DataSource({
	type: "mssql",
	host: process.env.db_server,
	port: parseInt(process.env.db_port),
	username: process.env.db_user,
	password: process.env.db_password,
	database: process.env.db_database,
	options: { encrypt: false, trustedConnection: true },
	entities: [auto, dia_restriccion, horario],
});

module.exports = dataSource;
