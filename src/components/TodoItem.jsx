import { useDispatch } from "react-redux";
import { removeTodo, toggleTodoComplete } from "../store/todoSlice";


export const TodoItem = ({id, text, comleted}) => {
  const dispatch = useDispatch();
    return (
        <li>
            <input
              type='checkbox'
              checked={comleted}
              onChange={() => dispatch(toggleTodoComplete({id}))}
            />
            <span>{text}</span>
            <span className='delete' onClick={() => dispatch(removeTodo({id}))}>
              &times;
            </span>
        </li>
    )
}
