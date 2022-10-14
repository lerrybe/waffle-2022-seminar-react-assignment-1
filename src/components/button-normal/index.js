import "./button-normal.css";

const ButtonNormal = ({ type, text, handleClick, bgColor }) => {
  return (
    <button
      onClick={handleClick}
      type={type || "button"}
      className="button-normal"
      style={{ backgroundColor: bgColor ? bgColor : "#fff" }}
    >
      {text}
    </button>
  );
};

export default ButtonNormal;
