import { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./styles.module.css";

interface ICabeceras {
  anio: number;
  mes: number;
  dia: number;
  semana: number;
  label: string;
}

interface INote {
  startDate: Date;
  endDate: Date;
  title: string | JSX.Element[];
}

interface ITasks {
  startDate: Date;
  endDate: Date;
  id: string;
  title: string | JSX.Element[];
  notes?: INote[];
  idTask?: string;
  columns?: { [key: string]: string | number };
  isTaskMain?: boolean;
}

// interface IColums {
//   key: string;
//   name: string;
// }

// interface IProps {
//   tasks: ITasks[];
//   columns?: IColums[];
//   typeShow?: 'mes' | 'anio' | 'semana'
// }

const Cronograma = () => {
  const [hideIdTasks, setHideIdTasks] = useState<string[]>([]);
  const [fechas, setFechas] = useState<ICabeceras[]>([]);
  const typeShow = "mes";
  const tasks: ITasks[] = [
    {
      id: "1",
      title: "Tarea prueba 1",
      startDate: new Date("01/01/2023"),
      endDate: new Date("01/10/2023"),
      isTaskMain: true,
    },
    {
      id: "2",
      title: "Tarea prueba 2",
      startDate: new Date("01/01/2023"),
      endDate: new Date("01/05/2023"),
      idTask: "1",
    },
    {
      id: "3",
      title: "Tarea prueba 3",
      startDate: new Date("01/05/2023"),
      endDate: new Date("01/10/2023"),
      idTask: "1",
    },
    {
      id: "4",
      title: "Tarea prueba 4",
      startDate: new Date("01/10/2023"),
      endDate: new Date("01/11/2023"),
    },
  ];

  const getSemana = (fecha: Date) => {
    const date = new Date(fecha);
    date.setHours(0, 0, 0, 0);
    //date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    const firstWeek = new Date(date.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((date.valueOf() - firstWeek.valueOf()) / 86400000 + 1) / 7
    );
    return weekNumber > 52 ? 52 : weekNumber;
  };

  useEffect(() => {
    let newFechas = [];

    const endDate = tasks.reduce(function (accumulator: Date, curValue) {
      if (curValue.endDate >= accumulator) {
        accumulator = curValue.endDate;
      }
      return accumulator;
    }, new Date("01/01/1960"));

    const startDate = tasks.reduce(function (accumulator: Date, curValue) {
      if (curValue.startDate <= accumulator) {
        accumulator = curValue.startDate;
      }
      return accumulator;
    }, endDate);

    for (const i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
      const semana = getSemana(i);
      newFechas.push({
        anio: i.getFullYear(),
        mes: i.getMonth() + 1,
        dia: i.getDate(),
        semana: semana,
        label: 'Semana ' + semana,
      });
    }

    console.log(newFechas);
    
    setFechas(newFechas);
  }, []);

  const handleChangeVisible = (id: string) => {
    const findTask = hideIdTasks.some((item) => item === id);
    if (findTask) {
      const filterTasks = hideIdTasks.filter((item) => item !== id);
      setHideIdTasks(filterTasks);
      return;
    }
    setHideIdTasks([...hideIdTasks, id]);
  };

  return (
    <div style={{ padding: 10 }}>
      <div className={styles.panelPrincipal}>
        <div className={styles.panelTareas}>
          <section
            style={{ borderBottom: "2px solid rgba(0, 0, 0, 0.1)" }}
          ></section>
          {tasks.map(
            (task, k) =>
              !hideIdTasks.includes(task.idTask || "") && (
                <section key={k}>
                  <span>
                    {task.isTaskMain && (
                      <ArrowDropDownIcon
                        onClick={() => handleChangeVisible(task.id)}
                      />
                    )}
                  </span>
                  {task.title}
                </section>
              )
          )}
        </div>
        <div className={styles.panelCalendario}>
          <table className={styles.panelCalendario}>
            <thead></thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cronograma;
