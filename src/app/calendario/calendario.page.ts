import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

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

// Fechas de lunas nuevas
const fasesLunares2025 = [
  new Date(2024, 11, 30), // Luna Nueva inicial (30/12/2024)
  new Date(2025, 0, 29),  // 29/01/2025
  new Date(2025, 1, 27),  // 27/02/2025
  new Date(2025, 2, 29),  // 29/03/2025
  new Date(2025, 3, 27),  // 27/04/2025
  new Date(2025, 4, 27),  // 27/05/2025
  new Date(2025, 5, 25),  // 25/06/2025
  new Date(2025, 6, 25),  // 25/07/2025
  new Date(2025, 7, 24),  // 24/08/2025
  new Date(2025, 8, 22),  // 22/09/2025
  new Date(2025, 9, 22),  // 22/10/2025
  new Date(2025, 10, 20), // 20/11/2025
  new Date(2025, 11, 20)  // 20/12/2025
];

// Información de Números
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
  13: { fuerza: "Trascendencia, Espiritualidad, Final Sagrado" },
};

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

  constructor() {
    this.generarCalendario();
  }

  generarCalendario() {
    let currentDate = new Date(this.startDate);
    let mayaDayNumber = 1;
    let nahualIndex = 10;

    for (let mesIndex = 1; mesIndex <= 13; mesIndex++) {
      let mes = { nombre: `Mes ${mesIndex}`, dias: [] as Dia[] };

      // Calcular días entre lunas nuevas
      const inicio = fasesLunares2025[mesIndex - 1];
      const fin = fasesLunares2025[mesIndex];
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
          nawal: {} as NawalInfo,
          numero: numerosInfo[mayaDayNumber],
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
    return { faseTexto: fases[Math.floor(fase * 5)], faseEmoji: fases[Math.floor(fase * 5)], posicion: 'Ascendente' };
  }

  calcularBiodinamico(fase: string): string {
    return fase.includes('Llena') ? '🌸 Flor' : '🌿 Hoja';
  }
}
