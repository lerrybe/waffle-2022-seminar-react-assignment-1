import MenuItem from "../menu-item";

const MenuItems = ({ menuItems, selectedMenu, handleOpenDetail }) => {
  return (
    <ul>
      {menuItems?.map((menuItem) => (
        <MenuItem
          key={menuItem.id}
          menuItem={menuItem}
          selectedMenu={selectedMenu}
          handleOpenDetail={handleOpenDetail}
        />
      ))}
    </ul>
  );
};

export default MenuItems;
