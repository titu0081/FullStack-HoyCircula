const DbMixin = require("../mixins/db.mixin");
const autoLogic = require("../logic/auto.logic");

module.exports = {
	name: "auto",
	mixins: [DbMixin],

	actions: {
		consultarAutosTodos: {
			rest: {
				method: "GET",
				path: "/consultarAutosTodos",
			},
			params: {},
			async handler(ctx) {
				let result = await autoLogic.consultarAutosTodos(ctx);
				return result;
			},
		},

		consultarAutosXId: {
			rest: {
				method: "GET",
				path: "/consultarAutosXId/:id",
			},
			params: {
				id: { type: "number", convert: true },
			},
			async handler(ctx) {
				let result = await autoLogic.consultarAutosXId(ctx);
				return result;
			},
		},

		insertarAuto: {
			rest: {
				method: "POST",
				path: "/insertarAuto",
			},
			params: {},
			async handler(ctx) {
				let result = await autoLogic.insertarAuto(ctx);
				return result;
			},
		},

		actualizarAuto: {
			rest: {
				method: "PUT",
				path: "/actualizarAuto",
			},
			params: {},
			async handler(ctx) {
				let result = await autoLogic.actualizarAuto(ctx);
				return result;
			},
		},

		eliminarAuto: {
			rest: {
				method: "DELETE",
				path: "/eliminarAuto/:id",
			},
			params: {
				id: { type: "number", convert: true },
			},
			async handler(ctx) {
				let result = await autoLogic.eliminarAuto(ctx);
				return result;
			},
		},
	},
};
