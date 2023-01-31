const FormRow = ({type, name, value, handleChange, labelText}) => {
  return (
    <div>
      <label htmlFor={name} className="form-label">
        {labelText ? labelText : name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={name}
        autoComplete="off"
        className="form-input"
      />
    </div>
  )
}
export default FormRow
