import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vehiculo, VehiculoRespuesta } from '../model/vehiculo.model';

@Injectable({ providedIn: 'root' })
export class ServiciosVehiculo {
  constructor(private http: HttpClient) {}

  private ruta: string = environment.apiUrl + '/auto';
  private rutaHorario: string = environment.apiUrl + '/horario';

  servicioGet(complemento: string): Observable<VehiculoRespuesta> {
    return this.http.get<VehiculoRespuesta>(`${this.ruta}${complemento}`);
  }

  servicioPost(
    complemento: string,
    vehiculo: Vehiculo,
  ): Observable<VehiculoRespuesta> {
    return this.http.post<VehiculoRespuesta>(
      `${this.ruta}${complemento}`,
      vehiculo,
    );
  }

  servicioPut(
    complemento: string,
    vehiculo: Partial<Vehiculo>,
  ): Observable<VehiculoRespuesta> {
    return this.http.put<VehiculoRespuesta>(
      `${this.ruta}${complemento}`,
      vehiculo,
    );
  }

  servicioDelete(
    complemento: string,
    id: number,
  ): Observable<VehiculoRespuesta> {
    return this.http.delete<VehiculoRespuesta>(
      `${this.ruta}${complemento}/${id}`,
    );
  }

  servicioPostHorario(
    complemento: string,
    horarioCircula: horarioConsulta,
  ): Observable<hoyCircula> {
    return this.http.post<hoyCircula>(
      `${this.rutaHorario}${complemento}`,
      horarioCircula,
    );
  }
}
