import "./form-item.css";

const FormItem = ({ label, placeholder, content }) => {
  return (
    <div className="form-wrapper">
      <span className="form-label">{label}</span>
      <input className="form-input" placeholder={placeholder} value={content} />
      {label === "가격" && <span className="form-unit">{"원"}</span>}
    </div>
  );
};

export default FormItem;
