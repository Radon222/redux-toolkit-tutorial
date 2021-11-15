import { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList';
import './App.css';
import { InputField } from './components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTodo, fetchTodos } from './store/todoSlice';

function App() {
  const [text, setText] = useState('');
  const { status, error } = useSelector(state => state.todosSlice);
  const dispatch = useDispatch();
  const handleAction = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText('');
    }
  };
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <div className='App'>
      <InputField
        text={text}
        handleInput={setText}
        handleSubmit={handleAction}
      />
      {status === 'loading' && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
