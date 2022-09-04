import "./button-normal.css";

const ButtonNormal = ({ text, handleClick, bgColor }) => {
  return (
    <button
      className="button-normal"
      onClick={handleClick}
      style={{ backgroundColor: bgColor ? bgColor : "#fff" }}
    >
      {text}
    </button>
  );
};

export default ButtonNormal;
