require("dotenv").config();

module.exports = {
	user: process.env.db_user,
	password: process.env.db_password,
	server: process.env.db_server,
	port: Number(process.env.db_port),
	database: process.env.db_name,
	options: {
		encrypt: false,
		trustServerCertificate: true,
	},
};
