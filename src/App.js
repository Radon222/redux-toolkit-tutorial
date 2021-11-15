import { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.css';
import { InputField } from './components/InputField';
import { useDispatch } from 'react-redux';
import { addTodo } from './store/todoSlice';

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const addTask = () => {
    dispatch(addTodo({ text: text }));
    setText('')
  };
  return (
    <div className='App'>
      <InputField text={text} handleInput={setText} handleSubmit={addTask} />
      <TodoList />
    </div>
  );
}

export default App;
