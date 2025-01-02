import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Interface for Nawal Information
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

// Interface for Number Information
interface NumeroInfo {
  fuerza: string;
}

// Day structure
type Dia = {
  fecha: string;
  gregoriana: string;
  fase: string;
  posicion: string;
  tipo: string;
  maya: string;
  nawal: NawalInfo;
  numero: NumeroInfo;
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

// Nawal Information
const nawalesInfo: { [key: string]: NawalInfo } = {
  "Batz": {
    nombre: "B'atz'",
    significado: "Energía del hilo del tiempo y la creación",
    nombreKiche: "B'ATZ'",
    nombreYucateco: "CHUEN",
    nombreMexica: "OZOMAHTLI",
    polaridad: "Este",
    elemento: "Fuego",
    cuerpo: "Espiritual",
    nawalAnimal: "Mono",
    lugaresEnergeticos: "Bosques y selvas",
    partesCuerpo: "Manos y dedos",
    coloresEnergeticos: "Rojo y Azul",
    piedra: "Coral",
    metal: "Oro",
  },
  "E": {
    nombre: "E",
    significado: "Energía del camino y el destino",
    nombreKiche: "E",
    nombreYucateco: "EB'",
    nombreMexica: "MALINALLI",
    polaridad: "Norte",
    elemento: "Tierra",
    cuerpo: "Mental",
    nawalAnimal: "Perro",
    lugaresEnergeticos: "Caminos y senderos",
    partesCuerpo: "Pies y piernas",
    coloresEnergeticos: "Blanco y Verde",
    piedra: "Esmeralda",
    metal: "Plata",
  },
  "Aj": {
    nombre: "Aj",
    significado: "Energía de la casa y la protección",
    nombreKiche: "AJ",
    nombreYucateco: "BEN",
    nombreMexica: "ACATL",
    polaridad: "Oeste",
    elemento: "Fuego",
    cuerpo: "Físico",
    nawalAnimal: "Caña",
    lugaresEnergeticos: "Hogares y templos",
    partesCuerpo: "Columna vertebral",
    coloresEnergeticos: "Rojo y Amarillo",
    piedra: "Rubí",
    metal: "Cobre",
  },
  "Ix": {
    nombre: "Ix",
    significado: "Energía de la magia y el poder de la tierra",
    nombreKiche: "IX",
    nombreYucateco: "IX",
    nombreMexica: "OCELOTL",
    polaridad: "Sur",
    elemento: "Tierra",
    cuerpo: "Espiritual",
    nawalAnimal: "Jaguar",
    lugaresEnergeticos: "Montañas y cuevas",
    partesCuerpo: "Piel",
    coloresEnergeticos: "Negro y Verde",
    piedra: "Jade",
    metal: "Plata",
  },
  "Tzikin": {
    nombre: "Tz'ikin",
    significado: "Energía de la visión y la abundancia",
    nombreKiche: "TZ'IKIN",
    nombreYucateco: "MEN",
    nombreMexica: "CUAUHTLI",
    polaridad: "Este",
    elemento: "Aire",
    cuerpo: "Mental",
    nawalAnimal: "Águila",
    lugaresEnergeticos: "Cielos abiertos y montañas",
    partesCuerpo: "Ojos",
    coloresEnergeticos: "Azul y Amarillo",
    piedra: "Zafiro",
    metal: "Oro",
  },
  "Ajmaq": {
    nombre: "Ajmaq",
    significado: "Energía del perdón y la introspección",
    nombreKiche: "AJMAQ",
    nombreYucateco: "CIB",
    nombreMexica: "COATL",
    polaridad: "Norte",
    elemento: "Agua",
    cuerpo: "Emocional",
    nawalAnimal: "Búho",
    lugaresEnergeticos: "Cuevas y lagunas",
    partesCuerpo: "Cerebro",
    coloresEnergeticos: "Blanco y Negro",
    piedra: "Hematita",
    metal: "Plomo",
  },
  "Noj": {
    nombre: "N'oj",
    significado: "Conocimiento y sabiduría",
    nombreKiche: "NO'J",
    nombreYucateco: "KAB'AN",
    nombreMexica: "OLLIN",
    polaridad: "Occidente",
    elemento: "Tierra",
    cuerpo: "Físico",
    nawalAnimal: "El pájaro Carpintero",
    lugaresEnergeticos: "Bosque tropical y frío, lagos, montañas y nubes",
    partesCuerpo: "Cerebro y glándula pineal",
    coloresEnergeticos: "Negro y Azul",
    piedra: "Azabache",
    metal: "Acero",
  },
  "Tijax": {
    nombre: "Tijax",
    significado: "Energía de la sanación y el sacrificio",
    nombreKiche: "TIJAX",
    nombreYucateco: "ETZ'NAB'",
    nombreMexica: "TECPATL",
    polaridad: "Sur",
    elemento: "Aire",
    cuerpo: "Mental",
    nawalAnimal: "Pez espada",
    lugaresEnergeticos: "Ríos y lagos",
    partesCuerpo: "Hígado",
    coloresEnergeticos: "Blanco y Azul",
    piedra: "Diamante",
    metal: "Plata",
  },
  "Kawok": {
    nombre: "Kawoq",
    significado: "Energía de la tormenta y la fertilidad",
    nombreKiche: "KAWOQ",
    nombreYucateco: "KAUAK",
    nombreMexica: "QUIAHUITL",
    polaridad: "Oeste",
    elemento: "Agua",
    cuerpo: "Emocional",
    nawalAnimal: "Tortuga",
    lugaresEnergeticos: "Mares y lluvias",
    partesCuerpo: "Piel y sistema linfático",
    coloresEnergeticos: "Azul y Gris",
    piedra: "Perla",
    metal: "Mercurio",
  },
  "Ajpu": {
    nombre: "Ajpu",
    significado: "Energía del sol y el héroe espiritual",
    nombreKiche: "AJPU",
    nombreYucateco: "AHAU",
    nombreMexica: "Xochitl",
    polaridad: "Este",
    elemento: "Fuego",
    cuerpo: "Espiritual",
    nawalAnimal: "Guerrero",
    lugaresEnergeticos: "Templos y montañas",
    partesCuerpo: "Corazón y alma",
    coloresEnergeticos: "Dorado y Rojo",
    piedra: "Topacio",
    metal: "Oro",
  },
"Imox": {
    nombre: "Imox",
    significado: "Energía de lo inusual y lo inesperado",
    nombreKiche: "IMOX",
    nombreYucateco: "IMIX",
    nombreMexica: "CIPACTLI",
    polaridad: "Este",
    elemento: "Agua",
    cuerpo: "Emocional",
    nawalAnimal: "Cocodrilo",
    lugaresEnergeticos: "Ríos, lagos y océanos",
    partesCuerpo: "Cerebro y sistema nervioso",
    coloresEnergeticos: "Rojo y Negro",
    piedra: "Ópalo",
    metal: "Plata",
  },
  "Iq": {
    nombre: "Iq'",
    significado: "Energía del viento y la comunicación",
    nombreKiche: "IQ'",
    nombreYucateco: "IK'",
    nombreMexica: "EHECATL",
    polaridad: "Norte",
    elemento: "Aire",
    cuerpo: "Mental",
    nawalAnimal: "Colibrí",
    lugaresEnergeticos: "Montañas y cielos abiertos",
    partesCuerpo: "Pulmones y sistema respiratorio",
    coloresEnergeticos: "Blanco y Azul",
    piedra: "Aguamarina",
    metal: "Mercurio",
  },
  "Akabal": {
    nombre: "Ak'ab'al",
    significado: "Energía del amanecer y los nuevos comienzos",
    nombreKiche: "AK'AB'AL",
    nombreYucateco: "AK'BAL",
    nombreMexica: "CALLI",
    polaridad: "Oeste",
    elemento: "Tierra",
    cuerpo: "Físico",
    nawalAnimal: "Murciélago",
    lugaresEnergeticos: "Cuevas y lugares oscuros",
    partesCuerpo: "Oídos y sistema auditivo",
    coloresEnergeticos: "Negro y Blanco",
    piedra: "Obsidiana",
    metal: "Hierro",
  },
  "Kat": {
    nombre: "K'at",
    significado: "Energía de la red y la captura",
    nombreKiche: "K'AT",
    nombreYucateco: "KAN",
    nombreMexica: "COATL",
    polaridad: "Sur",
    elemento: "Fuego",
    cuerpo: "Espiritual",
    nawalAnimal: "Lagarto",
    lugaresEnergeticos: "Selvas y bosques densos",
    partesCuerpo: "Sistema digestivo",
    coloresEnergeticos: "Amarillo y Verde",
    piedra: "Jade",
    metal: "Oro",
  },
  "Kan": {
    nombre: "Kan",
    significado: "Energía de la serpiente y la sabiduría ancestral",
    nombreKiche: "KAN",
    nombreYucateco: "CHIKCHAN",
    nombreMexica: "CUAUHTLI",
    polaridad: "Este",
    elemento: "Agua",
    cuerpo: "Emocional",
    nawalAnimal: "Serpiente",
    lugaresEnergeticos: "Ríos y cascadas",
    partesCuerpo: "Sistema circulatorio",
    coloresEnergeticos: "Verde y Azul",
    piedra: "Turquesa",
    metal: "Cobre",
  },
  "Keme": {
    nombre: "Kame",
    significado: "Energía de la muerte y la transformación",
    nombreKiche: "KAME",
    nombreYucateco: "KIMI",
    nombreMexica: "MIQUIZTLI",
    polaridad: "Norte",
    elemento: "Aire",
    cuerpo: "Mental",
    nawalAnimal: "Búho",
    lugaresEnergeticos: "Cementerios y lugares sagrados",
    partesCuerpo: "Huesos y dientes",
    coloresEnergeticos: "Blanco y Negro",
    piedra: "Hematita",
    metal: "Plomo",
  },
  "Kiej": {
    nombre: "Kej",
    significado: "Energía del venado y la armonía con la naturaleza",
    nombreKiche: "KEJ",
    nombreYucateco: "MANIK'",
    nombreMexica: "MAZATL",
    polaridad: "Oeste",
    elemento: "Tierra",
    cuerpo: "Físico",
    nawalAnimal: "Venado",
    lugaresEnergeticos: "Bosques y montañas",
    partesCuerpo: "Piernas y pies",
    coloresEnergeticos: "Rojo y Marrón",
    piedra: "Granate",
    metal: "Hierro",
  },
  "Qanil": {
    nombre: "Q'anil",
    significado: "Energía de la semilla y la creación",
    nombreKiche: "Q'ANIL",
    nombreYucateco: "LAMAT",
    nombreMexica: "TOCHTLI",
    polaridad: "Sur",
    elemento: "Fuego",
    cuerpo: "Espiritual",
    nawalAnimal: "Conejo",
    lugaresEnergeticos: "Campos de cultivo y jardines",
    partesCuerpo: "Órganos reproductivos",
    coloresEnergeticos: "Amarillo y Naranja",
    piedra: "Citrino",
    metal: "Oro",
  },
  "Toj": {
    nombre: "Toj",
    significado: "Energía del pago y la retribución",
    nombreKiche: "TOJ",
    nombreYucateco: "MULUK",
    nombreMexica: "ATL",
    polaridad: "Este",
    elemento: "Agua",
    cuerpo: "Emocional",
    nawalAnimal: "Pato",
    lugaresEnergeticos: "Lagos y lagunas",
    partesCuerpo: "Riñones y vejiga",
    coloresEnergeticos: "Azul y Verde",
    piedra: "Lapislázuli",
    metal: "Plata",
  },
  "Tzi": {
    nombre: "Tz'i'",
    significado: "Energía de la justicia y la autoridad",
    nombreKiche: "TZ'I'",
    nombreYucateco: "OK",
    nombreMexica: "ITZCUINTLI",
    polaridad: "Norte",
    elemento: "Tierra",
    cuerpo: "Mental",
    nawalAnimal: "Perro",
    lugaresEnergeticos: "Campos de batalla y tribunales",
    partesCuerpo: "Corazón",
    coloresEnergeticos: "Negro y Gris",
    piedra: "Onix",
    metal: "Plata",
  }
};

// Numbers Information
const numerosInfo: { [key: number]: NumeroInfo } = {
  1: { fuerza: "Todo, Unidad, Absoluto" },
  2: { fuerza: "Dualidad, Parejas, Cooperación" },
  3: { fuerza: "Movimiento, Creatividad, Expansión" },
  4: { fuerza: "Estabilidad, Base, Orden" },
  5: { fuerza: "Acción, Libertad, Cambio" },
  6: { fuerza: "Equilibrio, Justicia, Unión" },
  7: { fuerza: "Reflexión, Análisis, Meditación" },
  8: { fuerza: "Abundancia, Armonía, Poder Material" },
  9: { fuerza: "Cierre, Finalización, Cumplimiento" },
  10: { fuerza: "Manifestación, Liderazgo, Autoridad" },
  11: { fuerza: "Desintegración, Liberación, Transformación" },
  12: { fuerza: "Comprensión, Experiencia, Conocimiento Colectivo" },
  13: { fuerza: "Trascendencia, Espiritualidad, Final Sagrado" }
};

const fasesLunares2025 = [
  { fecha: '2025-01-06', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-01-14', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-01-21', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-01-29', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-02-05', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-02-13', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-02-19', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-02-27', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-03-06', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-03-14', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-03-21', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-03-29', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-04-05', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-04-13', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-04-19', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-04-27', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-05-04', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-05-12', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-05-19', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-05-27', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-06-03', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-06-11', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-06-17', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-06-25', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-07-02', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-07-10', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-07-17', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-07-25', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-08-01', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-08-09', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-08-16', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-08-24', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-08-31', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-09-07', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-09-14', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-09-22', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-09-29', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-10-07', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-10-14', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-10-22', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-10-29', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-11-05', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-11-12', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-11-20', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-11-27', fase: 'Cuarto Creciente', emoji: '🌓' },
  { fecha: '2025-12-05', fase: 'Luna Llena', emoji: '🌕' },
  { fecha: '2025-12-12', fase: 'Cuarto Menguante', emoji: '🌗' },
  { fecha: '2025-12-20', fase: 'Luna Nueva', emoji: '🌑' },
  { fecha: '2025-12-27', fase: 'Cuarto Creciente', emoji: '🌓' },
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
  startDate = new Date(2025, 0, 6); // Primera fase lunar en 2025 (Cuarto Creciente)

  constructor() {
    this.generarCalendario();
  }

  // Generate the calendar
  generarCalendario() {
    let currentDate = new Date(this.startDate);
    let mayaDayNumber = 1;
    let nahualIndex = 10;

    for (let mesIndex = 1; mesIndex <= 13; mesIndex++) {
      let mes = { nombre: `Mes ${mesIndex}`, dias: [] as Dia[] };
      let diasMes = this.calcularDiasEnMes(currentDate);

      for (let j = 1; j <= diasMes; j++) {
        const fecha = new Date(currentDate);
        const gregoriana = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
        const tipoIndex = (j - 1) % biodinamicoTipos.length;
        const tipo = `${biodinamicoTipos[tipoIndex].emoji} ${biodinamicoTipos[tipoIndex].tipo}`;
        const maya = `${mayaDayNumber} ${nahuales[nahualIndex]}`;
        const { faseTexto, faseEmoji } = this.obtenerFaseLunar(currentDate);
        const posicion = this.calcularPosicionLunar(currentDate);
        const infoNumero = numerosInfo[mayaDayNumber] || { fuerza: '' };

        mes.dias.push({
          fecha: `${j}/Mes ${mesIndex}`,
          gregoriana,
          fase: `${faseEmoji} ${faseTexto}`,
          posicion,
          tipo,
          maya,
          nawal: nawalesInfo[nahuales[nahualIndex]],
          numero: infoNumero,
        });

        currentDate.setDate(currentDate.getDate() + 1);
        mayaDayNumber = (mayaDayNumber % 13) + 1;
        nahualIndex = (nahualIndex + 1) % 20;
      }

      this.meses.push(mes);
    }
  }

  // Obtener la fase lunar basada en las fechas reales
  obtenerFaseLunar(fecha: Date): { faseTexto: string; faseEmoji: string } {
    const fechaStr = fecha.toISOString().split('T')[0];
    const fase = fasesLunares2025.find(f => f.fecha === fechaStr);
    return fase ? { faseTexto: fase.fase, faseEmoji: fase.emoji } : { faseTexto: 'Desconocida', faseEmoji: '❓' };
  }

  // Determina si la luna es ascendente o descendente
  calcularPosicionLunar(fecha: Date): string {
    const declinacion = Math.sin(((fecha.getDate() / 29.53) * 2 * Math.PI));
    return declinacion > 0 ? 'Ascendente ⬆️' : 'Descendente ⬇️';
  }

  // Calcular días en un mes lunar
  calcularDiasEnMes(fecha: Date): number {
    return 29 + ((fecha.getMonth() % 2 === 0) ? 1 : 0);
  }
}
