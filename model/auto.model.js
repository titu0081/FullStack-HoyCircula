const typeorm = require("typeorm");

module.exports = new typeorm.EntitySchema({
	name: "auto",
	tableName: "auto",
	columns: {
		id_auto: {
			type: "int",
			primary: true,
			generated: true,
		},
		placa: {
			type: "varchar",
			length: 10,
		},
		color: {
			type: "varchar",
			length: 20,
		},
		modelo: {
			type: "varchar",
			length: 20,
		},
		propietario: {
			type: "varchar",
			length: 20,
		},
		anio_modelo: {
			type: "int",
		},
		chasis: {
			type: "varchar",
			length: 20,
		},
	},
});
