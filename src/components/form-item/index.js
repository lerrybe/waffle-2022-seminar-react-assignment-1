import "./form-item.css";

const FormItem = ({
  name,
  type,
  label,
  content,
  required,
  placeholder,
  handleChangeContent,
}) => {
  return (
    <div className="form-wrapper">
      <label className="form-label">{label}</label>
      <input
        className="form-input"
        name={name}
        value={content}
        required={required}
        placeholder={placeholder}
        onChange={handleChangeContent}
        type={type === "password" ? "password" : "text"}
      />
      {label === "가격" && <span className="form-unit">{"원"}</span>}
    </div>
  );
};

export default FormItem;
