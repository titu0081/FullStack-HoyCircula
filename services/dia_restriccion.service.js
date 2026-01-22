const DbMixin = require("../mixins/db.mixin");
const diasLogic = require("../logic/dias_restriccion.logic");

module.exports = {
	name: "diasRestriccion",
	mixins: [DbMixin],

	actions: {
		consultarDiasRestriccion: {
			rest: {
				method: "GET",
				path: "/consultarDiasRestriccionTodos",
			},
			params: {},
			async handler(ctx) {
				let result = await diasLogic.consultarDiasRestriccionTodos(ctx);
				return result;
			},
		},

		consultarDiasRestriccionXId: {
			rest: {
				method: "GET",
				path: "/consultarDiasRestriccionXId/:id",
			},
			params: {},
			async handler(ctx) {
				let result = await diasLogic.consultarDiasRestriccionXId(ctx);
				return result;
			},
		},

		insertarDiaRestriccion: {
			rest: {
				method: "POST",
				path: "/insertarDiaRestriccion",
			},
			params: {},
			async handler(ctx) {
				let result = await diasLogic.insertarDiaRestriccion(ctx);
				return result;
			},
		},

		actualizarDiaRestriccion: {
			rest: {
				method: "PUT",
				path: "/actualizarDiaRestriccion",
			},
			params: {},
			async handler(ctx) {
				let result = await diasLogic.actualizarDiaRestriccion(ctx);
				return result;
			},
		},

		eliminarDiaRestriccion: {
			rest: {
				method: "DELETE",
				path: "/eliminarDiaRestriccion",
			},
			params: {},
			async handler(ctx) {
				let result = await diasLogic.eliminarDiaRestriccion(ctx);
				return result;
			},
		},
	},
};
