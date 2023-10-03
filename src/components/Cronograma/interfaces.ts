export interface ICabeceras {
  anio: number;
  mes: number;
  dia: number;
  semana: number;
  label: string;
  fecha: Date;
}

export interface INote {
  startDate: Date;
  endDate: Date;
  title: string | JSX.Element[];
}

export interface ITasks {
  startDate: Date;
  endDate: Date;
  id: string;
  title: string | JSX.Element[];
  bgColor?: string;
  notes?: INote[];
  idTask?: string;
  isTaskMain?: boolean;
  columns?: { [key: string]: string };
}

export interface IColums {
  key: string;
  name: string | JSX.Element[];
  type?: "money"; // Por defecto sera siempre Text o JSX Element
}
