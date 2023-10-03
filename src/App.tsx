import Cronograma, { IColums, ITasks } from "./components/Cronograma";

function App() {
  //Ejemplo de tareas
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
      columns: {
        money: "200",
        text: "Aqui texto",
      },
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
      notes: [
        {
          startDate: new Date("02/10/2023"),
          endDate: new Date("02/11/2023"),
          title: "Fecha de pago",
        },
      ],
    },
  ];

  //Ejemplo de columnas
  const columns: IColums[] = [
    {
      key: "money",
      name: "Columna Monto",
      type: "money",
    },
    {
      key: "text",
      name: "Columna Texto",
    },
  ];

  return (
    <>
      <Cronograma tasks={tasks} columns={columns} />
    </>
  );
}

export default App;
