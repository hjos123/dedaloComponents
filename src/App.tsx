import Cronograma from "./components/Cronograma";
import { columns, tasks } from "./components/Cronograma/Utils";

const App = () => {

  return (
    <>
      <Cronograma tasks={tasks} columns={columns} />
    </>
  );
}

export default App;
