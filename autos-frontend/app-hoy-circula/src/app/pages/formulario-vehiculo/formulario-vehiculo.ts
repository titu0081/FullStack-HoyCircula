import { Component } from '@angular/core';
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
export class FormularioVehiculo {
  tituloPaginaIngreso: string = 'Ingresar Vehículo';
  tituloPaginaEdicion: string = 'Editar Vehículo';
  tituloPagina: string = this.tituloPaginaIngreso;
  formularioVehiculo: FormGroup;
  nombreBoton: string = 'Guardar Vehículo';
  placaMaxLength: number = 8;
  anioModeloMaxLength: number = 4;
  chasisMaxLength: number = 17;

  constructor(
    private router: Router,
    private form: FormBuilder,
    private serviciosVehiculo: ServiciosVehiculo,
  ) {
    this.formularioVehiculo = this.form.group({
      id: [''],
      placa: [
        '',
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
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
      chasis: ['', Validators.required],
      propietario: ['', Validators.required],
    });
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
      placa: nuevoVehiculo.placa,
      modelo: nuevoVehiculo.modelo,
      color: nuevoVehiculo.color,
      anio_modelo: nuevoVehiculo.anio_modelo,
      chasis: nuevoVehiculo.chasis,
      propietario: nuevoVehiculo.propietario,
    };

    let idState = true;
    const peticion = idState
      ? this.serviciosVehiculo.servicioPut(
          'auto/actualizarAuto',
          nuevoVehiculo.id,
          datosVehiculo,
        )
      : this.serviciosVehiculo.servicioPost('auto/insertarAuto', datosVehiculo);
    peticion.subscribe({
      next: (respuestaVehiculo) => {
        if (respuestaVehiculo.codigo === 0 && respuestaVehiculo.data) {
          Swal.fire({
            title: 'Ingreso correcto',
            text: 'Vehículo ingresado exitosamente',
            icon: 'success',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          }).then((result) => {
            if (result.isConfirmed) {
              this.reiniciarFormulario();
              this.volverPaginaPrincipal();
            }
          });
        } else {
          Swal.fire({
            title: 'Ocurrio un error',
            text: 'Vehículo no fue ingresado',
            icon: 'error',
            buttonsStyling: false,
            customClass: {
              confirmButton: 'btn btn-primary',
            },
          });
        }
      },
      error: (error) => {
        console.error('Error guardando vehiculo', error);
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
}
