import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Definir tipos personalizados
type Dia = {
  fecha: string;
  fase: string;
  tipo: string;
  nawal: string;
};

// Datos simulados para calendario biodinámico
const biodinamicoDatos = [
  { fecha: '1/1', tipo: 'Raíz', emoji: '🌱' },
  { fecha: '2/1', tipo: 'Hoja', emoji: '🌿' },
  { fecha: '3/1', tipo: 'Flor', emoji: '🌸' },
  { fecha: '4/1', tipo: 'Fruto', emoji: '🍎' },
  { fecha: '5/1', tipo: 'No Favorable', emoji: '⛔' },
];

// Datos simulados para el calendario maya
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
  meses: { nombre: string; dias: Dia[] }[] = [];

  constructor() {
    this.generarCalendario();
  }

  generarCalendario() {
    for (let i = 0; i < 13; i++) {
      let mes = { nombre: `Mes ${i + 1}`, dias: [] as Dia[] };

      for (let j = 1; j <= 28; j++) {
        // Obtener información biodinámica
        const tipoDia = biodinamicoDatos.find((d) => d.fecha === `${j}/${i + 1}`);
        const tipo = tipoDia ? `${tipoDia.emoji} ${tipoDia.tipo}` : 'Desconocido';

        // Obtener información maya
        const datoMaya = mayaDatos.find((d) => d.fecha === `${j}/${i + 1}`);
        const nawal = datoMaya ? datoMaya.nawal : 'Desconocido';

        // Calcular fase lunar
        const { faseTexto, faseEmoji } = this.calcularFaseLunar(j, i + 1, 2025);

        // Añadir día al mes
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

  // Algoritmo mejorado para calcular la fase lunar
  calcularFaseLunar(dia: number, mes: number, anio: number): { faseTexto: string; faseEmoji: string } {
    const fecha = new Date(anio, mes - 1, dia);
    const timestamp = fecha.getTime() / 1000 / 86400; // Días desde el 1 de enero de 1970
    const epoch = 2444238.5; // Epoch juliana
    const daysSinceNew = timestamp - epoch; // Días desde la última luna nueva
    const lunarCycle = 29.53058867; // Duración de un ciclo lunar

    const phase = ((daysSinceNew / lunarCycle) + 0.5) % 1; // Fase como porcentaje del ciclo lunar

    // Determinar fase lunar y emoji
    if (phase < 0.03 || phase > 0.97) return { faseTexto: 'Luna Nueva', faseEmoji: '🌑' };
    if (phase < 0.22) return { faseTexto: 'Creciente', faseEmoji: '🌒' };
    if (phase < 0.28) return { faseTexto: 'Cuarto Creciente', faseEmoji: '🌓' };
    if (phase < 0.47) return { faseTexto: 'Gibosa Creciente', faseEmoji: '🌔' };
    if (phase < 0.53) return { faseTexto: 'Luna Llena', faseEmoji: '🌕' };
    if (phase < 0.72) return { faseTexto: 'Gibosa Menguante', faseEmoji: '🌖' };
    if (phase < 0.78) return { faseTexto: 'Cuarto Menguante', faseEmoji: '🌗' };
    return { faseTexto: 'Menguante', faseEmoji: '🌘' };
  }
}
