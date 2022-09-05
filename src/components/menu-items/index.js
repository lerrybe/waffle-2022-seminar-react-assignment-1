import MenuItem from "../menu-item";

const MenuItems = ({ menuItems }) => {
  return (
    <ul>
      {menuItems &&
        menuItems.map(({ id, name, price }) => (
          <MenuItem key={id} id={id} name={name} price={price} />
        ))}
    </ul>
  );
};

export default MenuItems;
