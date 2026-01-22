const auto = require("../model/auto.model");

module.exports = {
	async consultarAutosTodos(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(auto);
			const result = await repository.find();

			if (result && result.length > 0) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se encontraron autos",
				};
			}
		} catch (error) {
			console.error("❌ Error en consultarAutosTodos:", error);
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async consultarAutosXId(ctx) {
		try {
			const repo = ctx.service.dataSource.getRepository(auto);
			const autoEncontrado = await repo.findOne({
				where: { id_auto: Number(ctx.params.id) },
			});

			if (autoEncontrado) {
				return { codigo: 0, data: autoEncontrado, error: "" };
			} else {
				return { codigo: -1, data: null, error: "Auto no encontrado" };
			}
		} catch (error) {
			console.error("❌ Error en consultarAutosXId:", error);
			return { codigo: -1, data: null, error: error.message };
		}
	},

	async insertarAuto(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(auto);
			const autoData = ctx.params;
			let elemento = await repository.create(autoData);
			console.log(elemento);
			const result = await repository.save(autoData);
			if (result) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se pudo insertar el auto",
				};
			}
		} catch (error) {
			console.error("❌ Error en insertarAuto:", error);
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async actualizarAuto(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(auto);
			const autoData = ctx.params;
			const result = await repository.save(autoData);

			if (result) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se pudo actualizar el auto",
				};
			}
		} catch (error) {
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async eliminarAuto(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(auto);
			const { id_auto } = ctx.params;
			const eliminarAuto = await repository.findOneBy({ id_auto });
			if (eliminarAuto) {
				return { codigo: 0, data: eliminarAuto, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se elimino el auto",
				};
			}
		} catch (error) {
			return { codigo: -1, data: [], error: error.message };
		}
	},
};
