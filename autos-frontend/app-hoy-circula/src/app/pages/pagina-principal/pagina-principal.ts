import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosVehiculo } from '../../services/servicios_vehiculo';
import { Vehiculo } from '../../model/vehiculo.model';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-pagina-principal',
  imports: [MatTooltip],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.scss',
})
export class PaginaPrincipal {
  constructor(
    private servicioVehiculo: ServiciosVehiculo,
    private router: Router,
  ) {}

  vehiculos: Vehiculo[] = [];
  tituloModal: string = '';
  nuevaConsultaModal: boolean = false;
  fechaActual: Date = new Date();

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculos = [];
    this.servicioVehiculo
      .servicioGet('/consultarAutosTodos')
      .subscribe((respuesta) => {
        console.log('Respuesta del servicio:', respuesta);
        if (respuesta.codigo === 0) {
          this.vehiculos = respuesta.data;
        } else {
          console.error('Error al cargar vehículos:', respuesta.error);
        }
      });
  }

  nuevaConsulta() {
    this.nuevaConsultaModal = true;
    this.tituloModal = 'Consulta de Hoy Circula ';
  }

  nuevoVehiculo() {
    this.router.navigate(['/formulario-vehiculo']);
  }
}
