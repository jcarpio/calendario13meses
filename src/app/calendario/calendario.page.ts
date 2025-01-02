import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Importación estática de los datos JSON
import nawalesData from '../../assets/data/nawales.json';
import numerosData from '../../assets/data/numeros.json';
import fasesLunaresData from '../../assets/data/fases-lunares.json';

// Interfaces
interface NawalInfo {
  nombre: string;
  significado: string;
  nombreKiche: string;
  nombreYucateco: string;
  nombreMexica: string;
  polaridad: string;
  elemento: string;
  cuerpo: string;
  nawalAnimal: string;
  lugaresEnergeticos: string;
  partesCuerpo: string;
  coloresEnergeticos: string;
  piedra: string;
  metal: string;
}

interface NumeroInfo {
  fuerza: string;
}

type Dia = {
  fecha: string;
  gregoriana: string;
  fase: string;
  posicion: string;
  tipo: string;
  biodinamico: string;
  maya: string;
  nawal: NawalInfo;
  numero: NumeroInfo;
};

// Datos para biodinámico
const biodinamicoTipos = [
  { tipo: 'Raíz', emoji: '🌱' },
  { tipo: 'Hoja', emoji: '🌿' },
  { tipo: 'Flor', emoji: '🌸' },
  { tipo: 'Fruto', emoji: '🍎' },
];

// Datos Nahuales
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
export class CalendarioPage implements OnInit {
  meses: { nombre: string; dias: Dia[] }[] = [];
  startDate = new Date(2024, 11, 30); // Primera luna nueva

  // Datos cargados desde JSON
  nawalesInfo: { [key: string]: NawalInfo } = nawalesData;
  numerosInfo: { [key: number]: NumeroInfo } = numerosData;
  fasesLunares: Date[] = fasesLunaresData.map((date: string) => new Date(date));

  constructor() {}

  ngOnInit() {
    this.generarCalendario();
  }

  generarCalendario() {
    let currentDate = new Date(this.startDate);
    let mayaDayNumber = 1;
    let nahualIndex = 10;

    for (let mesIndex = 1; mesIndex <= 13; mesIndex++) {
      let mes = { nombre: `Mes ${mesIndex}`, dias: [] as Dia[] };

      // Calcular días entre lunas nuevas
      const inicio = this.fasesLunares[mesIndex - 1];
      const fin = this.fasesLunares[mesIndex];
      const diasMes = Math.floor((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));

      for (let j = 0; j < diasMes; j++) { // Evita repetir días
        const fecha = new Date(currentDate);
        const gregoriana = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        const { faseTexto, faseEmoji, posicion } = this.calcularFaseLunar(fecha);
        const biodinamico = this.calcularBiodinamico(faseTexto);

        mes.dias.push({
          fecha: `${j + 1}/Mes ${mesIndex}`,
          gregoriana: gregoriana,
          fase: `${faseEmoji} ${faseTexto}`,
          posicion: posicion,
          tipo: biodinamico,
          biodinamico: biodinamico,
          maya: `${mayaDayNumber} ${nahuales[nahualIndex]}`,
          nawal: this.nawalesInfo[nahuales[nahualIndex]],
          numero: this.numerosInfo[mayaDayNumber],
        });

        currentDate.setDate(currentDate.getDate() + 1);
        mayaDayNumber = (mayaDayNumber % 13) + 1;
        nahualIndex = (nahualIndex + 1) % 20;
      }

      this.meses.push(mes);
    }
  }

  calcularFaseLunar(fecha: Date) {
    const cicloLunar = 29.53;
    const diasDesdeLunaNueva = (fecha.getTime() - this.startDate.getTime()) / (1000 * 60 * 60 * 24);
    const fase = (diasDesdeLunaNueva % cicloLunar) / cicloLunar;
    const fases = ['🌑 Nueva', '🌒 Creciente', '🌓 Cuarto', '🌕 Llena', '🌗 Menguante'];

    const faseIndex = Math.floor(fase * 5);
    return {
      faseTexto: fases[faseIndex],
      faseEmoji: fases[faseIndex],
      posicion: faseIndex < 3 ? 'Ascendente ⬆️' : 'Descendente ⬇️',
    };
  }

  calcularBiodinamico(fase: string): string {
    if (fase.includes('Nueva') || fase.includes('Creciente')) return '🌿 Hoja';
    if (fase.includes('Llena')) return '🌸 Flor';
    return '🌱 Raíz';
  }
}
