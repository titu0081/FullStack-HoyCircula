const horario = require("../model/horario.model");
const auto = require("../logic/auto.logic");
const diasRestriccion = require("../logic/dias_restriccion.logic");

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
				return { codigo: 0, data: [horarioEncontrado], error: "" };
			} else {
				return {
					codigo: -1,
					data: [],
					error: "Horario no encontrado",
				};
			}
		} catch (error) {
			console.error("❌ Error en consultarHorarioXId:", error);
			return { codigo: -1, data: [], error: error.message };
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
					data: [],
					error: "Horario no encontrado",
				};
			}
			return { codigo: 0, data: [horarioFound], error: "" };
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
				return { codigo: 0, data: [result], error: "" };
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
				return { codigo: 0, data: [result], error: "" };
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
			const id = Number(ctx.params.id);
			const horarioEncontrado = await repository.findOneBy({
				id_horario: id,
			});
			if (horarioEncontrado) {
				await repository.remove(horarioEncontrado);
				return {
					codigo: 0,
					data: [horarioEncontrado],
					error: "",
				};
			} else {
				return {
					codigo: -1,
					data: [],
					error: "Día de restricción no encontrado",
				};
			}
		} catch (error) {
			return { codigo: -1, data: [], error: error.message };
		}
	},

	async consultarHorarioHoyCircula(ctx) {
		const params = ctx.params;
		console.log(params);
		let resultadoFecha = this.validadorFecha(params.fecha, params.hora);
		if (resultadoFecha.codigo != 0) {
			return {
				codigo: -1,
				data: "",
				error: "La fecha y hora no pueden ser anteriores a la actual",
			};
		}

		let resultadoDiasRestriccion =
			await diasRestriccion.consultarDiasRestriccionTodos(ctx);

		if (resultadoDiasRestriccion.codigo != 0) {
			return {
				codigo: -1,
				data: "",
				error: "No existen días registrados para una restricción",
			};
		}
		console.log("Dias Restriccion ->", resultadoDiasRestriccion.data);

		const resultadoAuto = await auto.consultarAutosXId({
			...ctx,
			params: { id: params.id_auto },
		});

		if (resultadoAuto.codigo !== 0) {
			return {
				codigo: -1,
				data: "",
				error: "Auto no encontrado",
			};
		}
		console.log("Auto encontrado ->", resultadoAuto.data);

		const placa = resultadoAuto.data[0].placa;
		const ultimoDigito = Number(placa.slice(-1));

		const diaSemana = this.obtenerDiaSemana(params.fecha);

		if (diaSemana === "Sabado" || diaSemana === "Domingo") {
			return {
				codigo: 0,
				data: `El vehículo con placa ${placa} SÍ puede circular es fin de semana`,
				error: "",
			};
		}

		const restriccionDia = resultadoDiasRestriccion.data.find(
			(d) =>
				d.dia === diaSemana &&
				(d.primeraPlaca === ultimoDigito ||
					d.segundaPlaca === ultimoDigito),
		);

		if (!restriccionDia) {
			return {
				codigo: 0,
				data: `El vehículo con placa ${placa} SÍ puede circular`,
				error: "",
			};
		}

		let resultadoHorarios = await this.consultarHorariosTodos(ctx);

		if (resultadoHorarios.codigo !== 0) {
			return {
				codigo: -1,
				data: "",
				error: "No existen horarios configurados",
			};
		}
		const horas = resultadoHorarios.data[0];

		// convertir todo a minutos
		const horaVehiculo = this.horaAMinutos(params.hora);

		const amInicio = this.horaAMinutos(horas.primera_hora_am);
		const amFin = this.horaAMinutos(horas.segunda_hora_am);

		const pmInicio = this.horaAMinutos(horas.primera_hora_pm);
		const pmFin = this.horaAMinutos(horas.segunda_hora_pm);

		// validar AM
		if (horaVehiculo >= amInicio && horaVehiculo <= amFin) {
			return {
				codigo: 1,
				data: `El vehículo con placa ${placa} NO circula por el horario AM`,
				error: "",
			};
		}

		// validar PM
		if (horaVehiculo >= pmInicio && horaVehiculo <= pmFin) {
			return {
				codigo: 1,
				data: `El vehículo con placa ${placa} NO circula por el horario PM`,
				error: "",
			};
		}

		// fuera de horarios
		return {
			codigo: 0,
			data: `El vehículo con placa ${placa} SÍ puede circular`,
			error: "",
		};
	},

	validadorFecha(fecha, hora) {
		const fechaHoraInput = new Date(`${fecha}T${hora}`);
		const ahora = new Date();
		if (fechaHoraInput < ahora) {
			return {
				codigo: -1,
				data: "",
				error: "La fecha y hora no pueden ser anteriores a la actual",
			};
		} else {
			return {
				codigo: 0,
				data: "",
				error: "",
			};
		}
	},

	obtenerDiaSemana(fecha) {
		const dias = [
			"Domingo",
			"Lunes",
			"Martes",
			"Miercoles",
			"Jueves",
			"Viernes",
			"Sabado",
		];

		const date = new Date(fecha + "T00:00:00");
		return dias[date.getDay()];
	},

	horaAMinutos(hora) {
		const [h, m] = hora.split(":").map(Number);
		return h * 60 + m;
	},
};
