import { useState, useEffect } from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./styles.module.css";
import { ICabeceras, IColums, ITasks } from "./interfaces";
import { formatMoney, getSemana, obtenerColorAleatorio } from "./Utils";

interface IProps {
  tasks: ITasks[];
  columns?: IColums[];
}

const Cronograma = ({ tasks, columns }: IProps) => {
  const [hideIdTasks, setHideIdTasks] = useState<string[]>([]);
  const [fechas, setFechas] = useState<ICabeceras[]>([]);
  const [tempCol, setTempCol] = useState("");

  useEffect(() => {
    let newFechas = [];

    const endDate = tasks.reduce(function (accumulator: Date, curValue) {
      if (curValue.endDate >= accumulator) {
        accumulator = curValue.endDate;
      }
      return accumulator;
    }, new Date("01/01/1800"));

    const startDate = tasks.reduce(function (accumulator: Date, curValue) {
      if (curValue.startDate <= accumulator) {
        accumulator = curValue.startDate;
      }
      return accumulator;
    }, endDate);

    for (
      let i = new Date(JSON.parse(JSON.stringify(startDate)));
      i <= endDate;
      i.setDate(i.getDate() + 1)
    ) {
      const semana = getSemana(i);
      newFechas.push({
        anio: i.getFullYear(),
        mes: i.getMonth() + 1,
        dia: i.getDate(),
        semana: semana,
        fecha: new Date(i.getTime()),
        label: new Date(i.getTime()).toLocaleDateString(),
      });
    }
    setFechas(newFechas);

    if (columns) {
      let coltemp = "";
      columns.forEach(() => {
        coltemp = coltemp + "1fr ";
      });
      setTempCol(coltemp);
    }

    tasks.forEach((item) => {
      item.bgColor = item.bgColor ? item.bgColor : obtenerColorAleatorio();
    });
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

        {columns && (
          <div className={styles.panelColumnas}>
            <header style={{ gridTemplateColumns: tempCol }}>
              {columns.map((col, key) => (
                <div key={key}>{col.name}</div>
              ))}
            </header>
            <div>
              {tasks.map(
                (task, ke1) =>
                  !hideIdTasks.includes(task.idTask || "") && (
                    <section key={ke1} style={{ gridTemplateColumns: tempCol }}>
                      {columns.map((col, ke2) => (
                        <div key={ke2}>
                          {task.columns
                            ? col.type === "money"
                              ? formatMoney.format(
                                  Number(task.columns[col.key])
                                )
                              : task.columns[col.key]
                            : ""}
                        </div>
                      ))}
                    </section>
                  )
              )}
            </div>
          </div>
        )}

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
                                <span
                                  style={{
                                    background: task.bgColor,
                                  }}
                                >
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
