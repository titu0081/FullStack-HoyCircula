"use strict";

const dataSource = require("../model/dataSource.js");

module.exports = {
	created() {
		this.dataSource = null;
	},

	async started() {
		try {
			if (!dataSource.isInitialized) {
				await dataSource.initialize();
			}
			this.dataSource = dataSource;
			this.logger.info("✅ Conexión a base de datos establecida");
		} catch (error) {
			this.logger.error("Error al conectar a la base de datos:", error);
			throw error;
		}
	},

	async stopped() {
		if (this.dataSource && this.dataSource.isInitialized) {
			await this.dataSource.destroy();
			this.logger.info("✅ Conexion a base de datos cerrada");
		}
	},
};
