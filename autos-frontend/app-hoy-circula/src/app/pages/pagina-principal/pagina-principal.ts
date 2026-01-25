import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosVehiculo } from '../../services/servicios_vehiculo';
import { Vehiculo } from '../../model/vehiculo.model';
import { MatTooltip } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var bootstrap: any;

@Component({
  selector: 'app-pagina-principal',
  imports: [MatTooltip, FormsModule, CommonModule],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.scss',
  standalone: true,
})
export class PaginaPrincipal {
  constructor(
    private servicioVehiculo: ServiciosVehiculo,
    private router: Router,
  ) {}

  vehiculos: Vehiculo[] = [];
  tituloModal: string = '';
  fechaActual: Date = new Date();
  consulta = {
    id_auto: '',
    fecha: '',
    hora: '',
  };
  @ViewChild('consultaForm') consultaForm!: NgForm;

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculos = [];
    this.servicioVehiculo.servicioGet('/consultarAutosTodos').subscribe({
      next: (respuesta) => {
        console.log('Respuesta del servicio:', respuesta);
        if (respuesta.codigo === 0) {
          this.vehiculos = respuesta.data;
        } else {
          Swal.fire({
            title: 'Ocurrio un error',
            text: respuesta.error!,
            icon: 'error',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          });
        }
      },
      error: (error) => {
        console.error('Error al cargar vehículos:', error);
        Swal.fire({
          title: 'Ocurrio un error',
          text: 'No se pudieron cargar los vehículos. ' + error.message,
          icon: 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        });
      },
    });
  }

  nuevaConsulta(id_auto?: number) {
    this.tituloModal = 'Consulta de Hoy Circula ';

    if (id_auto !== undefined) {
      this.consulta.id_auto = id_auto.toString();
    } else {
      this.resetearConsulta();
    }
  }

  resetearConsulta() {
    this.consultaForm.resetForm({
      id_auto: '',
      fecha: '',
      hora: '',
    });
  }

  nuevoVehiculo() {
    this.router.navigate(['/formulario-vehiculo']);
  }

  editarVehiculo(vehiculo: Vehiculo) {
    this.router.navigate(['/formulario-vehiculo'], {
      state: { vehiculoEditar: vehiculo },
    });
  }

  eliminarVehiculo(vehiculo: Vehiculo) {
    if (!vehiculo.id_auto) {
      Swal.fire({
        title: 'Vehículo sin ID',
        icon: 'error',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      });
      return;
    }

    Swal.fire({
      title: '¿Eliminar vehículo?',
      text: `¿Está seguro de eliminar el vehículo con placa ${vehiculo.placa}?`,
      icon: 'warning',
      showCancelButton: true,
      buttonsStyling: false,
      confirmButtonText: 'Eliminar vehículo',
      cancelButtonText: 'Cancelar',
      customClass: {
        confirmButton: 'btn btn-danger me-1',
        cancelButton: 'btn btn-secondary',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioVehiculo
          .servicioDelete('/eliminarAuto', vehiculo.id_auto!)
          .subscribe({
            next: (respuestaVehiculo) => {
              if (respuestaVehiculo.codigo === 0) {
                console.log('Vehículo eliminado', respuestaVehiculo.data);
                Swal.fire({
                  title: 'Eliminado',
                  text: 'Vehículo eliminado exitosamente',
                  icon: 'success',
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.cargarVehiculos();
                  }
                });
              } else {
                Swal.fire({
                  title: 'Ocurrio un error',
                  text:
                    respuestaVehiculo.error ||
                    'No se pudo eliminar el vehículo',
                  icon: 'error',
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: 'btn btn-primary',
                  },
                });
              }
            },
            error: (error) => {
              Swal.fire({
                title: 'Ocurrio un error',
                text: 'No se pudo eliminar el vehículo. ' + error.message,
                icon: 'error',
                buttonsStyling: false,
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
              });
            },
          });
      }
    });
  }

  consultarHoyCircula() {
    if (this.consultaForm.invalid) {
      this.consultaForm.form.markAllAsTouched();
      return;
    }

    const consultaHoyCircula: horarioConsulta = {
      id_auto: Number(this.consulta.id_auto),
      fecha: this.consulta.fecha,
      hora: this.consulta.hora,
    };

    this.servicioVehiculo
      .servicioPostHorario('/consultarHoyCircula', consultaHoyCircula)
      .subscribe({
        next: (respuestaCircula) => {
          if (respuestaCircula.codigo === 0) {
            this.mostrarSwalConsulta(
              'Vehículo SÍ circula',
              respuestaCircula.data,
              'success',
            );
          }

          if (respuestaCircula.codigo === 1) {
            this.mostrarSwalConsulta(
              'Vehículo NO circula',
              respuestaCircula.data,
              'warning',
            );
          }

          if (respuestaCircula.codigo === -1) {
            this.mostrarSwalConsulta('Error', respuestaCircula.error, 'error');
          }
        },
        error: (error) => {
          Swal.fire({
            title: 'Ocurrio un error',
            text: 'No se pudo ejecutar la consulta. ' + error.message,
            icon: 'error',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          });
        },
      });
  }

  mostrarSwalConsulta(titulo: string, texto: string, icono: any) {
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono,
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-primary',
      },
    }).then(() => {
      this.cerrarModalConsulta();
      this.consultaForm.resetForm();
      this.cargarVehiculos();
    });
  }

  cerrarModalConsulta() {
    const modalElement = document.getElementById('consultaModal');
    if (modalElement) {
      const modalInstance =
        bootstrap.Modal.getInstance(modalElement) ||
        new bootstrap.Modal(modalElement);

      modalInstance.hide();
    }
  }
}
