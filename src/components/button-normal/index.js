import './button-normal.css';

function ButtonNormal({
  type, text, handleClick, bgColor,
}) {
  return (
    <button
      onClick={handleClick}
      type={type || 'button'}
      className="button-normal"
      style={{ backgroundColor: bgColor || '#fff' }}
    >
      {text}
    </button>
  );
}

export default ButtonNormal;
