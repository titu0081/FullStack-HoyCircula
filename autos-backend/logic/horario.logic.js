const horario = require("../model/horario.model");

module.exports = {
	async consultarHorariosTodos(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(horario);
			const result = await repository.find();

			if (result && result.length > 0) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se encontraron horarios",
				};
			}
		} catch (error) {
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async consultarHorarioXId(ctx) {
		try {
			const repo = ctx.service.dataSource.getRepository(horario);
			const horarioEncontrado = await repo.findOne({
				where: { id_horario: Number(ctx.params.id_horario) },
			});

			if (horarioEncontrado) {
				return { codigo: 0, data: horarioEncontrado, error: "" };
			} else {
				return {
					codigo: -1,
					data: null,
					error: "Horario no encontrado",
				};
			}
		} catch (error) {
			console.error("❌ Error en consultarHorarioXId:", error);
			return { codigo: -1, data: null, error: error.message };
		}
	},

	async consultarHorariosXId(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(horario);
			const horarioFound = await repository.findOne({
				where: { id_horario: Number(ctx.params.id_horario) },
			});

			if (!horarioFound) {
				return {
					codigo: -1,
					data: null,
					error: "Horario no encontrado",
				};
			}
			return { codigo: 0, data: horarioFound, error: "" };
		} catch (error) {
			console.error("❌ Error en consultarHorariosTodos:", error);
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async insertarHorario(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(horario);
			const horarioData = ctx.params;
			let elemento = await repository.create(horarioData);
			console.log(elemento);
			const result = await repository.save(horarioData);
			if (result) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se pudo insertar el horario",
				};
			}
		} catch (error) {
			console.error("❌ Error en insertarHorario:", error);
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async actualizarHorario(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(horario);
			const horarioData = ctx.params;
			const result = await repository.save(horarioData);

			if (result) {
				return { codigo: 0, data: result, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se pudo actualizar el horario",
				};
			}
		} catch (error) {
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async eliminarHorario(ctx) {
		try {
			const repository = ctx.service.dataSource.getRepository(horario);
			const { id_horario } = ctx.params;
			const eliminarHorario = await repository.findOneBy({ id_horario });
			if (eliminarHorario) {
				return { codigo: 0, data: eliminarHorario, error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "No se elimino el horario",
				};
			}
		} catch (error) {
			return { codigo: -1, data: [], error: error.message };
		}
	},
};
