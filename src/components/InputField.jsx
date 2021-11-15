export const InputField = ({text, handleInput, handleSubmit}) => {
    return (
        <label>
        <input
          value={text}
          onChange={event => handleInput(event.currentTarget.value)}
        />
        <button onClick={handleSubmit}>Add Todo</button>
      </label>
    )
}
