import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule para directivas como *ngFor
import { IonicModule } from '@ionic/angular'; // Importar IonicModule para componentes de Ionic

// Definir el tipo personalizado para los días
type Dia = {
  fecha: string;
  fase: string;
  tipo: string;
  nawal: string;
};

@Component({
  selector: 'app-calendario',
  standalone: true, // Componente standalone
  imports: [CommonModule, IonicModule], // Importar módulos necesarios
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  // Declarar la estructura de datos para los meses
  meses: { nombre: string; dias: Dia[] }[] = []; // Lista de meses, cada uno con una lista de días tipo Dia

  constructor() {
    this.generarCalendario(); // Llamar a la función para crear el calendario
  }

  // Método para generar el calendario de 13 meses con 28 días cada uno
  generarCalendario() {
    for (let i = 0; i < 13; i++) {
      // Crear un mes con nombre y lista de días
      let mes = { nombre: `Mes ${i + 1}`, dias: [] as Dia[] }; // Declarar explícitamente el tipo Dia[] en dias
      for (let j = 1; j <= 28; j++) {
        // Añadir cada día con datos predeterminados (se pueden modificar después)
        mes.dias.push({
          fecha: `${j}/Mes ${i + 1}`,
          fase: 'Luna Nueva', // Ejemplo de fase lunar (reemplazar con cálculo real más adelante)
          tipo: 'Hoja', // Ejemplo de tipo biodinámico (personalizable después)
          nawal: 'I’X', // Ejemplo de dato maya (se puede reemplazar con lógica dinámica)
        });
      }
      // Añadir el mes generado al array principal
      this.meses.push(mes);
    }
  }
}
