import { useDispatch } from "react-redux";
import { deleteTodo, toggleStatus } from "../store/todoSlice";


export const TodoItem = ({id, title, comleted}) => {
  const dispatch = useDispatch();
    return (
        <li>
            <input
              type='checkbox'
              checked={comleted}
              onChange={() => dispatch(toggleStatus(id))}
            />
            <span>{title}</span>
            <span className='delete' onClick={() => dispatch(deleteTodo(id))}>
              &times;
            </span>
        </li>
    )
}
