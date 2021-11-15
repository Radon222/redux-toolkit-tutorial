export const TodoItem = ({id, text, comleted, removeTodo, toggleTodoComplete}) => {
    return (
        <li>
            <input
              type='checkbox'
              checked={comleted}
              onChange={() => toggleTodoComplete(id)}
            />
            <span>{text}</span>
            <span className='delete' onClick={() => removeTodo(id)}>
              &times;
            </span>
        </li>
    )
}
