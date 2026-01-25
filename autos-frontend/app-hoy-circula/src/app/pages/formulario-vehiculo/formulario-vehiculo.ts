import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ServiciosVehiculo } from '../../services/servicios_vehiculo';
import { Vehiculo } from '../../model/vehiculo.model';

@Component({
  selector: 'app-formulario-vehiculo',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-vehiculo.html',
  styleUrl: './formulario-vehiculo.scss',
  standalone: true,
})
export class FormularioVehiculo implements OnInit {
  tituloPaginaIngreso: string = 'Ingresar Vehículo';
  tituloPaginaEdicion: string = 'Editar Vehículo';
  tituloPagina: string = this.tituloPaginaIngreso;
  formularioVehiculo: FormGroup;
  nombreBoton: string = 'Guardar Vehículo';
  placaMaxLength: number = 7;
  anioModeloMaxLength: number = 4;
  chasisMaxLength: number = 17;
  esEditar: boolean = false;
  vehiculoSeleccionado: Vehiculo | null = null;

  constructor(
    private router: Router,
    private form: FormBuilder,
    private serviciosVehiculo: ServiciosVehiculo,
  ) {
    this.formularioVehiculo = this.form.group({
      id_auto: [''],
      placa: [
        '',
        [Validators.required, Validators.minLength(7), Validators.maxLength(7)],
      ],
      modelo: ['', [Validators.required]],
      anio_modelo: [
        '',
        [
          Validators.required,
          Validators.min(1900),
          Validators.max(new Date().getFullYear()),
          Validators.pattern('^[0-9]{4}$'),
        ],
      ],
      color: ['', Validators.required],
      chasis: ['', [Validators.required, Validators.maxLength(17)]],
      propietario: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const state = history.state;
    console.log(state);

    if (state?.vehiculoEditar) {
      this.vehiculoSeleccionado = state.vehiculoEditar;
      this.esEditar = true;
      this.llenarFormularioParaEdicion();
    }
  }

  get id() {
    return this.formularioVehiculo.get('id');
  }
  get placa() {
    return this.formularioVehiculo.get('placa');
  }
  get marca() {
    return this.formularioVehiculo.get('marca');
  }
  get modelo() {
    return this.formularioVehiculo.get('modelo');
  }

  get anio_modelo() {
    return this.formularioVehiculo.get('anio_modelo');
  }

  get color() {
    return this.formularioVehiculo.get('color');
  }

  get chasis() {
    return this.formularioVehiculo.get('chasis');
  }

  get propietario() {
    return this.formularioVehiculo.get('propietario');
  }

  volverPaginaPrincipal() {
    this.router.navigate(['']);
  }

  guardarVehiculo() {
    if (this.formularioVehiculo.invalid) {
      this.formularioVehiculo.markAllAsTouched();
      return;
    }

    const nuevoVehiculo = this.formularioVehiculo.getRawValue();

    const datosVehiculo: Vehiculo = {
      placa: nuevoVehiculo.placa.trim().replace('-', '').toUpperCase(),
      modelo: nuevoVehiculo.modelo,
      color: nuevoVehiculo.color.trim(),
      anio_modelo: nuevoVehiculo.anio_modelo,
      chasis: nuevoVehiculo.chasis.trim(),
      propietario: nuevoVehiculo.propietario,
    };

    if (this.esEditar) {
      datosVehiculo.id_auto = nuevoVehiculo.id_auto;
    }

    const peticion = this.esEditar
      ? this.serviciosVehiculo.servicioPut('/actualizarAuto', datosVehiculo)
      : this.serviciosVehiculo.servicioPost('/insertarAuto', datosVehiculo);

    peticion.subscribe({
      next: (respuestaVehiculo) => {
        if (respuestaVehiculo.codigo === 0 && respuestaVehiculo.data) {
          if (!this.esEditar) {
            Swal.fire({
              title: 'Ingreso correcto',
              text: 'Vehículo ingresado exitosamente',
              icon: 'success',
              showCancelButton: true,
              buttonsStyling: false,
              cancelButtonText: 'Ingresar nuevo vehículo',
              confirmButtonText: 'Consultar vehículos',
              customClass: {
                confirmButton: 'btn btn-secondary me-1',
                cancelButton: 'btn btn-primary',
              },
            }).then((result) => {
              if (result.isConfirmed) {
                this.reiniciarFormulario();
                this.volverPaginaPrincipal();
              } else {
                this.reiniciarFormulario();
              }
            });
          } else {
            Swal.fire({
              title: 'Edición correcta',
              text: 'Vehículo editado exitosamente',
              icon: 'success',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-primary',
              },
            }).then((result) => {
              if (result.isConfirmed) {
                this.reiniciarFormulario();
                this.volverPaginaPrincipal();
              } else {
                this.volverPaginaPrincipal();
              }
            });
          }
        } else {
          if (!this.esEditar) {
            Swal.fire({
              title: 'Ocurrió un error',
              text: 'El vehículo no fue ingresado',
              icon: 'error',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-primary',
              },
            });
          } else {
            Swal.fire({
              title: 'Ocurrió un error',
              text: 'El vehículo no fue editado',
              icon: 'error',
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-primary',
              },
            });
          }
        }
      },
      error: (error) => {
        Swal.fire({
          title: 'Ocurrio un error',
          text: 'Vehículo no fue ingresado, ' + error.message,
          icon: 'error',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
        });
      },
    });
  }

  reiniciarFormulario() {
    this.formularioVehiculo.reset();
  }

  llenarFormularioParaEdicion() {
    if (this.vehiculoSeleccionado) {
      this.tituloPagina = this.tituloPaginaEdicion;
      this.nombreBoton = 'Guardar Cambios';
      this.formularioVehiculo.patchValue({
        id_auto: this.vehiculoSeleccionado.id_auto,
        placa: this.vehiculoSeleccionado.placa,
        modelo: this.vehiculoSeleccionado.modelo,
        anio_modelo: this.vehiculoSeleccionado.anio_modelo,
        color: this.vehiculoSeleccionado.color,
        chasis: this.vehiculoSeleccionado.chasis,
        propietario: this.vehiculoSeleccionado.propietario,
      });
    } else {
      return;
    }
  }
}
