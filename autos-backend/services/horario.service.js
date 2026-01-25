const DbMixin = require("../mixins/db.mixin");
const horarioLogic = require("../logic/horario.logic");

module.exports = {
	name: "horario",
	mixins: [DbMixin],

	actions: {
		consultarHorariosTodos: {
			rest: {
				method: "GET",
				path: "/consultarHorariosTodos",
			},
			params: {},
			async handler(ctx) {
				let result = await horarioLogic.consultarHorariosTodos(ctx);
				return result;
			},
		},

		consultarHorariosXId: {
			rest: {
				method: "GET",
				path: "/consultarHorariosXId/:id",
			},
			params: {},
			async handler(ctx) {
				let result = await horarioLogic.consultarHorariosXId(ctx);
				return result;
			},
		},

		insertarHorario: {
			rest: {
				method: "POST",
				path: "/insertarHorario",
			},
			params: {},
			async handler(ctx) {
				let result = await horarioLogic.insertarHorario(ctx);
				return result;
			},
		},

		actualizarHorario: {
			rest: {
				method: "PUT",
				path: "/actualizarHorario",
			},
			params: {},
			async handler(ctx) {
				let result = await horarioLogic.actualizarHorario(ctx);
				return result;
			},
		},

		eliminarHorario: {
			rest: {
				method: "DELETE",
				path: "/eliminarHorario",
			},
			params: {},
			async handler(ctx) {
				let result = await horarioLogic.eliminarHorario(ctx);
				return result;
			},
		},

		consultarHorarioHoyCircula: {
			rest: {
				method: "POST",
				path: "/consultarHoyCircula",
			},
			params: {},
			async handler(ctx) {
				let result = await horarioLogic.consultarHorarioHoyCircula(ctx);
				return result;
			},
		},
	},
};
