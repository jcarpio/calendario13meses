import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Custom type for day structure
type Dia = {
  fecha: string; // Date in the calendar
  fase: string;  // Lunar phase with emoji
  tipo: string;  // Biodynamic type with emoji
  nawal: string; // Maya information
};

// Simulated data for biodynamic calendar
const biodinamicoDatos = [
  { fecha: '1/1', tipo: 'Raíz', emoji: '🌱' },
  { fecha: '2/1', tipo: 'Hoja', emoji: '🌿' },
  { fecha: '3/1', tipo: 'Flor', emoji: '🌸' },
  { fecha: '4/1', tipo: 'Fruto', emoji: '🍎' },
  { fecha: '5/1', tipo: 'No Favorable', emoji: '⛔' },
];

// Simulated data for the Maya calendar
const mayaDatos = [
  { fecha: '1/1', nawal: 'I’X' },
  { fecha: '2/1', nawal: 'IMOX' },
  { fecha: '3/1', nawal: 'KIEJ' },
  { fecha: '4/1', nawal: 'KAN' },
  { fecha: '5/1', nawal: 'KAME' },
];

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  // Main structure for months and days
  meses: { nombre: string; dias: Dia[] }[] = [];
  startDate = new Date(2024, 11, 29); // Start date for the lunar calendar (December 29, 2024)

  constructor() {
    this.generarCalendario();
  }

  generarCalendario() {
    // Loop through 13 months
    for (let i = 0; i < 13; i++) {
      let mes = { nombre: `Mes ${i + 1}`, dias: [] as Dia[] };

      // Loop through 28 days per month
      for (let j = 1; j <= 28; j++) {
        // Calculate the date for each day
        const fecha = new Date(this.startDate);
        fecha.setDate(this.startDate.getDate() + (i * 28) + (j - 1));

        // Get biodynamic information
        const tipoDia = biodinamicoDatos.find((d) => d.fecha === `${j}/${i + 1}`);
        const tipo = tipoDia ? `${tipoDia.emoji} ${tipoDia.tipo}` : 'Desconocido';

        // Get Maya information
        const datoMaya = mayaDatos.find((d) => d.fecha === `${j}/${i + 1}`);
        const nawal = datoMaya ? datoMaya.nawal : 'Desconocido';

        // Calculate lunar phase
        const { faseTexto, faseEmoji } = this.calcularFaseLunar(fecha);

        // Push the day to the month
        mes.dias.push({
          fecha: `${j}/Mes ${i + 1}`,
          fase: `${faseEmoji} ${faseTexto}`,
          tipo: tipo,
          nawal: nawal,
        });
      }

      this.meses.push(mes);
    }
  }

  // Calculate lunar phase based on date
  calcularFaseLunar(fecha: Date): { faseTexto: string; faseEmoji: string } {
    const cicloLunar = 29.53; // Lunar cycle in days
    const diasDesdeInicio = Math.floor((fecha.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24)); // Days since start
    const fase = (diasDesdeInicio % cicloLunar) / cicloLunar; // Phase as fraction of cycle

    // Determine phase and emoji
    if (fase < 0.03 || fase > 0.97) return { faseTexto: 'Luna Nueva', faseEmoji: '🌑' };
    if (fase < 0.22) return { faseTexto: 'Creciente', faseEmoji: '🌒' };
    if (fase < 0.28) return { faseTexto: 'Cuarto Creciente', faseEmoji: '🌓' };
    if (fase < 0.47) return { faseTexto: 'Gibosa Creciente', faseEmoji: '🌔' };
    if (fase < 0.53) return { faseTexto: 'Luna Llena', faseEmoji: '🌕' };
    if (fase < 0.72) return { faseTexto: 'Gibosa Menguante', faseEmoji: '🌖' };
    if (fase < 0.78) return { faseTexto: 'Cuarto Menguante', faseEmoji: '🌗' };
    return { faseTexto: 'Menguante', faseEmoji: '🌘' };
  }
}
