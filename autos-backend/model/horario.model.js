const typeorm = require("typeorm");

module.exports = new typeorm.EntitySchema({
	name: "horario",
	tableName: "horario",
	columns: {
		id_horario: {
			type: "int",
			primary: true,
			generated: true,
		},
		primera_hora_am: {
			type: "time",
		},
		segunda_hora_am: {
			type: "time",
		},
		primera_hora_pm: {
			type: "time",
		},
		segunda_hora_pm: {
			type: "time",
		},
	},
});
