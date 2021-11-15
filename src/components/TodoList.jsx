import { TodoItem } from './TodoItem';
import { useSelector } from 'react-redux';

export const TodoList = () => {
  const todosList = useSelector(state => state.todosSlice.todosState);
  return (
    <ul>
      {todosList.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};
