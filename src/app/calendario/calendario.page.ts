import nawalesData from '../../assets/data/nawales.json';
import numerosData from '../../assets/data/numeros.json';
import fasesLunaresData from '../../assets/data/fases-lunares.json';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

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
export class CalendarioPage {
  meses: { nombre: string; dias: Dia[] }[] = [];
  startDate = new Date(2024, 11, 30); // Primera luna nueva

  // Datos cargados desde JSON
  nawalesInfo: { [key: string]: NawalInfo } = {};
  numerosInfo: { [key: number]: NumeroInfo } = {};
  fasesLunares2025: Date[] = [];

  constructor(private http: HttpClient) {
    this.cargarDatos();
  }

  cargarDatos() {
    // Cargar datos desde los JSON
    this.http.get<{ [key: string]: NawalInfo }>('assets/data/nawales.json').subscribe(data => {
      this.nawalesInfo = data; // Asigna directamente el objeto cargado desde el JSON
    });

    this.http.get<NumeroInfo[]>('assets/data/numeros.json').subscribe(data => {
      this.numerosInfo = data.reduce((acc, item, index) => ({ ...acc, [index + 1]: item }), {});
    });

    this.http.get<string[]>('assets/data/fases-lunares.json').subscribe(data => {
      this.fasesLunares2025 = data.map(fecha => new Date(fecha)); // Convertir a Date
      this.generarCalendario(); // Generar el calendario después de cargar los datos
    });
  }

  generarCalendario() {
    let currentDate = new Date(this.startDate); // Primera luna nueva
    let mayaDayNumber = 1; // Ciclo Maya comienza en 1
    let nahualIndex = 10;  // Empieza en "Batz"

    for (let mesIndex = 1; mesIndex <= 13; mesIndex++) {
      let mes = { nombre: `Mes ${mesIndex}`, dias: [] as Dia[] };

      // Calcular los días en el mes
      const inicio = this.fasesLunares2025[mesIndex - 1];
      const fin = this.fasesLunares2025[mesIndex];
      const diasMes = Math.floor((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));

      for (let j = 0; j < diasMes; j++) { // Evita repetir días
        const fecha = new Date(currentDate);
        const gregoriana = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        const { faseTexto, faseEmoji, posicion } = this.calcularFaseLunar(fecha);
        const biodinamico = this.calcularBiodinamico(faseTexto);

        const nahualNombre = nahuales[nahualIndex]; // Obtener el nombre del nahual

        mes.dias.push({
          fecha: `${j + 1}/Mes ${mesIndex}`,
          gregoriana: gregoriana,
          fase: `${faseEmoji} ${faseTexto}`,
          posicion: posicion,
          tipo: biodinamico,
          biodinamico: biodinamico,
          maya: `${mayaDayNumber} ${nahualNombre}`,
          nawal: this.nawalesInfo[nahualNombre], // Acceder al objeto directamente
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

    let faseTexto = '';
    let faseEmoji = '';

    if (fase < 0.03 || fase > 0.97) {
      faseTexto = 'Luna Nueva';
      faseEmoji = '🌑';
    } else if (fase < 0.22) {
      faseTexto = 'Creciente';
      faseEmoji = '🌒';
    } else if (fase < 0.28) {
      faseTexto = 'Cuarto Creciente';
      faseEmoji = '🌓';
    } else if (fase < 0.47) {
      faseTexto = 'Gibosa Creciente';
      faseEmoji = '🌔';
    } else if (fase < 0.53) {
      faseTexto = 'Luna Llena';
      faseEmoji = '🌕';
    } else if (fase < 0.72) {
      faseTexto = 'Gibosa Menguante';
      faseEmoji = '🌖';
    } else if (fase < 0.78) {
      faseTexto = 'Cuarto Menguante';
      faseEmoji = '🌗';
    } else {
      faseTexto = 'Menguante';
      faseEmoji = '🌘';
    }

    return { faseTexto, faseEmoji, posicion: 'Ascendente ⬆️' };
  }

  calcularBiodinamico(fase: string): string {
    if (fase.includes('Nueva') || fase.includes('Creciente')) return '🌿 Hoja';
    if (fase.includes('Llena')) return '🌸 Flor';
    return '🌱 Raíz';
  }
}
