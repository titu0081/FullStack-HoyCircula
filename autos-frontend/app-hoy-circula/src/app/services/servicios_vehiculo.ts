import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Vehiculo,
  VehiculoRespuesta,
  VehiculoOperacionRespuesta,
} from '../model/vehiculo.model';

@Injectable({ providedIn: 'root' })
export class ServiciosVehiculo {
  constructor(private http: HttpClient) {}

  private ruta: string = environment.apiUrl + '/auto';

  servicioGet(complemento: string): Observable<VehiculoRespuesta> {
    return this.http.get<VehiculoRespuesta>(`${this.ruta}${complemento}`);
  }

  servicioPost(
    complemento: string,
    vehiculo: Vehiculo,
  ): Observable<VehiculoOperacionRespuesta> {
    return this.http.post<VehiculoOperacionRespuesta>(
      `${this.ruta}${complemento}`,
      vehiculo,
    );
  }

  servicioPut(
    complemento: string,
    id: string,
    vehiculo: Partial<Vehiculo>,
  ): Observable<VehiculoOperacionRespuesta> {
    return this.http.put<VehiculoOperacionRespuesta>(
      `${this.ruta}${complemento}/${id}`,
      vehiculo,
    );
  }

  servicioDelete(
    complemento: string,
    id: string,
  ): Observable<VehiculoOperacionRespuesta> {
    return this.http.delete<VehiculoOperacionRespuesta>(
      `${this.ruta}${complemento}/${id}`,
    );
  }
}
