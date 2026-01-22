const dia_restriccion = require("../model/dias_restriccion.model");

module.exports = {
	async consultarDiasRestriccionTodos(ctx) {
		try {
			const repository =
				ctx.service.dataSource.getRepository(dia_restriccion);
			const result = await repository.find();

			if (result && result.length > 0) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se encontraron restricciones para ese día",
				};
			}
		} catch (error) {
			console.error("❌ Error en consultarDiasRestriccion:", error);
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async consultarDiasRestriccionXId(ctx) {
		try {
			const repo = ctx.service.dataSource.getRepository(dia_restriccion);
			const diaRestriccionEncontrado = await repo.findOne({
				where: { id_dia: Number(ctx.params.id) },
			});

			if (diaRestriccionEncontrado) {
				return { codigo: 0, data: diaRestriccionEncontrado, error: "" };
			} else {
				return { codigo: -1, data: null, error: "Auto no encontrado" };
			}
		} catch (error) {
			console.error("❌ Error en consultarAutosXId:", error);
			return { codigo: -1, data: null, error: error.message };
		}
	},

	async insertarDiaRestriccion(ctx) {
		try {
			const repository =
				ctx.service.dataSource.getRepository(dia_restriccion);
			const diaRestriccionData = ctx.params;
			let elemento = await repository.create(diaRestriccionData);
			console.log(elemento);
			const result = await repository.save(diaRestriccionData);
			if (result) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se pudo insertar el dia nuevo",
				};
			}
		} catch (error) {
			console.error("❌ Error en insertarDiaRestriccion:", error);
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async actualizarDiaRestriccion(ctx) {
		try {
			const repository =
				ctx.service.dataSource.getRepository(dia_restriccion);
			const diaRestriccionData = ctx.params;
			const result = await repository.save(diaRestriccionData);

			if (result) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se pudo actualizar el dia nuevo",
				};
			}
		} catch (error) {
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async eliminarDiaRestriccion(ctx) {
		try {
			const repository =
				ctx.service.dataSource.getRepository(dia_restriccion);
			const { id_dia_restriccion } = ctx.params;
			const eliminarDiaRestriccion = await repository.findOneBy({
				id_dia_restriccion,
			});
			if (eliminarDiaRestriccion) {
				return { codigo: 0, data: eliminarDiaRestriccion, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se elimino el dia envíado",
				};
			}
		} catch (error) {
			return { codigo: -1, data: [], error: error.message };
		}
	},
};
