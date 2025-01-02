import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Day structure
type Dia = {
  fecha: string;
  gregoriana: string;
  fase: string;
  tipo: string;
  maya: string;
};

// Biodynamic types
const biodinamicoTipos = [
  { tipo: 'Raíz', emoji: '🌱' },
  { tipo: 'Hoja', emoji: '🌿' },
  { tipo: 'Flor', emoji: '🌸' },
  { tipo: 'Fruto', emoji: '🍎' },
];

// Maya Tzolk'in Nahuales
const nahuales = [
  'Imox', 'Iq', 'Akabal', 'Kat', 'Kan', 'Keme', 'Kiej', 'Qanil', 'Toj', 'Tzi',
  'Batz', 'E', 'Aj', 'Ix', 'Tzikin', 'Ajmaq', 'Noj', 'Tijax', 'Kawok', 'Ajpu'
];

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  // Calendar data
  meses: { nombre: string; dias: Dia[] }[] = [];
  startDate = new Date(2024, 11, 29); // Initial date (Dec 29, 2024)
  cicloLunar = 29.53; // Average lunar cycle in days

  constructor() {
    this.generarCalendario();
  }

  // Generate the lunar calendar
  generarCalendario() {
    let currentDate = new Date(this.startDate); // Starting point
    let mayaDayNumber = 1; // Start with 1 (1 Batz)
    let nahualIndex = 10;  // Start with "Batz" (index 10)

    // Generate 13 lunar months
    for (let mesIndex = 1; mesIndex <= 13; mesIndex++) {
      let mes = { nombre: `Mes ${mesIndex}`, dias: [] as Dia[] };

      // Calculate days in the current lunar month
      const diasMes = this.calcularDiasEnMes(new Date(currentDate));

      for (let j = 1; j <= diasMes; j++) {
        // Gregorian date
        const fecha = new Date(currentDate);
        const gregoriana = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

        // Biodynamic type
        const tipoIndex = (j - 1) % biodinamicoTipos.length;
        const tipo = `${biodinamicoTipos[tipoIndex].emoji} ${biodinamicoTipos[tipoIndex].tipo}`;

        // Maya Tzolk'in date
        const maya = `${mayaDayNumber} ${nahuales[nahualIndex]}`;

        // Lunar phase
        const { faseTexto, faseEmoji } = this.calcularFaseLunar(currentDate);

        // Add the day
        mes.dias.push({
          fecha: `${j}/Mes ${mesIndex}`,
          gregoriana: gregoriana,
          fase: `${faseEmoji} ${faseTexto}`,
          tipo: tipo,
          maya: maya,
        });

        // Advance date
        currentDate.setDate(currentDate.getDate() + 1);

        // Update Maya cycles
        mayaDayNumber = (mayaDayNumber % 13) + 1; // Cycle through 1–13
        nahualIndex = (nahualIndex + 1) % 20;     // Cycle through 20 nahuales
      }

      // Push completed month
      this.meses.push(mes);

      // Move to the next new moon
      currentDate = this.encontrarProximaLunaNueva(new Date(currentDate));
    }
  }

  // Calculate days in the current lunar month
  calcularDiasEnMes(fecha: Date): number {
    const nextLunaNueva = this.encontrarProximaLunaNueva(new Date(fecha));
    const diasEnMes = Math.floor((nextLunaNueva.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return diasEnMes;
  }

  // Find next New Moon
  encontrarProximaLunaNueva(fecha: Date): Date {
    let proximaFecha = new Date(fecha);
    do {
      proximaFecha.setDate(proximaFecha.getDate() + 1);
    } while (!this.esLunaNueva(proximaFecha));
    return proximaFecha;
  }

  // Check if the date is a New Moon
  esLunaNueva(fecha: Date): boolean {
    const fase = this.calcularFaseLunar(fecha).faseTexto;
    return fase === 'Luna Nueva';
  }

  // Calculate lunar phase
  calcularFaseLunar(fecha: Date): { faseTexto: string; faseEmoji: string } {
    const diasDesdeInicio = Math.floor((fecha.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24));
    const fase = (diasDesdeInicio % this.cicloLunar) / this.cicloLunar;

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
