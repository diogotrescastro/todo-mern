import './App.css';
import { useState, useEffect, useCallback } from 'react';
import { getTodos } from './services/todoAPI';
import Form from './components/Form'
import Task from './components/Task'

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState();
  const [,updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  // A função de forçar o update foi encontrada em https://www.ti-enxame.com/pt/javascript/como-forcar-o-componente-renderizar-novamente-com-ganchos-no-react/808436281/
  // Pois o react não estava rendedizando o filho após funções de ordenação.


  function setTodosFromAPI() {
    getTodos().then(todos => {
      setTodos(todos);     
    });
  }

  useEffect(() => {
    setTodosFromAPI();
  }, []);

  function setTodosSortRecents() {
    let todosSorted = todos;
    const result = todosSorted.sort((a, b) => {
      if(a.date > b.date) {
        return -1;
      } else {
        return true;
      }
    })
    setTodos(result);
    forceUpdate();
    console.log(todos);
  }

  function setTodosSortAz() {
    let todosSorted = todos;
    const result = todosSorted.sort((a, b) => {
      if(a.title < b.title) {
        return -1;
      } else {
        return true;
      }
    })
    setTodos(result);
    forceUpdate();
    console.log(todos);
    console.log(result);
  }

  function setTodosSortZa() {
    let todosSorted = todos;
    const result = todosSorted.sort((a, b) => {
      if(a.title > b.title) {
        return -1;
      } else {
        return true;
      }
    })
    setTodos(result);
    forceUpdate();
    console.log(todos);
    console.log(result);
  }

  const filteredTodos = filter? todos.filter(todo => todo.status === filter) : todos;


  return (
    <div className="App">
      {console.log(filteredTodos)}
       <h1> Lista de Tarefas </h1>
       <div className="filters">
       <span>Status</span>
         <button onClick={() => setFilter()}>Todas Tarefas</button>
         <button onClick={() => setFilter('pending')}>Pendentes</button>
         <button onClick={() => setFilter('progress')}>Em Andamento</button>
         <button onClick={() => setFilter('completed')}>Prontas</button>
       </div>
       <div className="sorted">
         <span>Ordenação</span>
         <button onClick={() => setTodosFromAPI()}>Data Descrescente</button>
         <button onClick={() => setTodosSortRecents()}>Data Crescente</button>
         <button onClick={() => setTodosSortAz()}>A-Z</button>
         <button onClick={() => setTodosSortZa()}>Z-A</button>
       </div>
       {filteredTodos.map((todo,index) => {
         console.log(todo.title)
         return (
           <div key={index}>
           <Task
              task = {todo}
              getTodos = {setTodosFromAPI}
              />
              </div>
         )
       })}
       <br/>
       <br/>
       <br/>
        <Form 
        getTodos= {setTodosFromAPI}
        />  
    </div>
  );
}

export default App;
