const typeorm = require("typeorm");

module.exports = new typeorm.EntitySchema({
	name: "dias_restriccion",
	tableName: "dias_restriccion",
	columns: {
		id_dias: {
			type: "int",
			primary: true,
			generated: true,
		},
		dia: {
			type: "varchar",
			length: 10,
		},
		primeraPlaca: {
			type: "int",
		},
		segundaPlaca: {
			type: "int",
		},
	},
});
