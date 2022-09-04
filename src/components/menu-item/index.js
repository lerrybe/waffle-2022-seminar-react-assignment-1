import "./menu-item.css";

const MenuItem = ({ id, name, price }) => {
  return (
    <div className="menu-item-wrapper">
      <span className="menu-item-id">{id}</span>
      <span className="menu-item-name">{name}</span>
      <span className="menu-item-price">{price}</span>
    </div>
  );
};

export default MenuItem;
