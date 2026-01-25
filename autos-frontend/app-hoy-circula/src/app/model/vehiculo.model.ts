export interface Vehiculo {
  id_auto?: number;
  placa: string;
  color: string;
  modelo: string;
  propietario: string;
  anio_modelo: number;
  chasis: string;
}

export interface VehiculoRespuesta {
  codigo: number;
  data: Vehiculo[];
  error: string | null;
}
