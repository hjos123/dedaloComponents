import { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./styles.module.css";

interface ICabeceras {
  anio: number;
  mes: number;
  dia: number;
  semana: number;
  label: string;
  fecha: Date;
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
  const tasks: ITasks[] = [
    {
      id: "1",
      title: "Tarea prueba 1",
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
    },
    {
      id: "2",
      title: "Tarea prueba 2",
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
      title: "Tarea prueba 3",
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
      title: "Tarea prueba 4",
      startDate: new Date("02/10/2023"),
      endDate: new Date("02/11/2023"),
    },
  ];

  const getSemana = (fecha: Date) => {
    const d = new Date(fecha);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    const weekNumber = Math.ceil(
      ((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
    );
    return weekNumber;
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

    for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
      const semana = getSemana(startDate);
      newFechas.push({
        anio: startDate.getFullYear(),
        mes: startDate.getMonth() + 1,
        dia: startDate.getDate(),
        semana: semana,
        fecha: new Date(JSON.parse(JSON.stringify(startDate.getTime()))),
        label: "Semana " + semana,
      });
    }
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
          <header></header>
          <div className={styles.panelSecciones}>
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
        </div>
        <ScrollContainer style={{ width: "100%" }}>
          <div className={styles.panelCalendario}>
            <table>
              <thead>
                <tr>
                  {fechas.map((f, ke1) => (
                    <th key={ke1}>{f.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tasks.map(
                  (task, k) =>
                    !hideIdTasks.includes(task.idTask || "") && (
                      <tr key={k}>
                        {fechas.map((fecha, ke2) => (
                          <td key={ke2}>
                            {fecha.fecha >= task.startDate &&
                              fecha.fecha <= task.endDate && (
                                <span>
                                  {task.notes?.map(
                                    (n, ke3) =>
                                      fecha.fecha >= n.startDate &&
                                      fecha.fecha <= n.endDate && (
                                        <article key={ke3}>{n.title}</article>
                                      )
                                  )}
                                </span>
                              )}
                          </td>
                        ))}
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </ScrollContainer>
      </div>
    </div>
  );
};

export default Cronograma;
