import { IColums, ITasks } from "./interfaces";

// Funcion para obtener el color aleatorio
export const obtenerColorAleatorio = () => {
  const r = Math.floor(Math.random() * 100) + 100; // Rango entre 100 y 200
  const g = Math.floor(Math.random() * 100) + 100; // Rango entre 100 y 200
  const b = Math.floor(Math.random() * 100) + 100; // Rango entre 100 y 200

  const color =
    "#" +
    r.toString(16).padStart(2, "0") +
    g.toString(16).padStart(2, "0") +
    b.toString(16).padStart(2, "0");

  return color;
};

//Funcion para el formato de moneda
export const formatMoney = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Funcion para obtener el numero de la semana
export const getSemana = (fecha: Date) => {
  const d = new Date(fecha);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(
    ((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
  );
  return weekNumber;
};

//Ejemplo de tareas
export const tasks: ITasks[] = [
  {
    id: "1",
    title: "Proveedor 1",
    startDate: new Date("02/01/2023"),
    endDate: new Date("02/10/2023"),
    isTaskMain: true,
    notes: [
      {
        startDate: new Date("02/02/2023"),
        endDate: new Date("02/02/2023"),
        title: "Fecha para subir factura",
      },
      {
        startDate: new Date("02/08/2023"),
        endDate: new Date("02/08/2023"),
        title: "Fecha de entrega",
      },
    ],
    columns: {
      money1: "2000",
      money2: "3000",
    },
  },
  {
    id: "2",
    title: "item 1",
    startDate: new Date("02/01/2023"),
    endDate: new Date("02/05/2023"),
    idTask: "1",
    notes: [
      {
        startDate: new Date("02/03/2023"),
        endDate: new Date("02/03/2023"),
        title: "Fecha de pago",
      },
    ],
  },
  {
    id: "3",
    title: "item 2",
    startDate: new Date("02/05/2023"),
    endDate: new Date("02/10/2023"),
    idTask: "1",
    notes: [
      {
        startDate: new Date("02/10/2023"),
        endDate: new Date("02/10/2023"),
        title: "Fecha de entrega",
      },
    ],
  },
  {
    id: "4",
    title: "Proveedor 2",
    startDate: new Date("02/10/2023"),
    endDate: new Date("02/14/2023"),
    isTaskMain: true,
    notes: [
      {
        startDate: new Date("02/10/2023"),
        endDate: new Date("02/11/2023"),
        title: "Fecha de pago",
      },
    ],
    columns: {
      money1: "2000",
      money2: "3000",
    },
  },
  {
    id: "5",
    title: "item 1",
    startDate: new Date("02/10/2023"),
    endDate: new Date("02/12/2023"),
    idTask: "4",
    notes: [
      {
        startDate: new Date("02/12/2023"),
        endDate: new Date("02/12/2023"),
        title: "Fecha de entrega",
      },
    ],
  },
  {
    id: "6",
    title: "item 2",
    startDate: new Date("02/12/2023"),
    endDate: new Date("02/14/2023"),
    idTask: "4",
    notes: [
      {
        startDate: new Date("02/14/2023"),
        endDate: new Date("02/14/2023"),
        title: "Fecha de entrega",
      },
    ],
  },
];

//Ejemplo de columnas
export const columns: IColums[] = [
  {
    key: "money1",
    name: "Monto Total",
    type: "money",
  },
  {
    key: "money2",
    name: "Monto Pagado",
    type: "money",
  },
];
