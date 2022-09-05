import MenuItem from "../menu-item";

const MenuItems = ({ menuItems, handleOpenDetail, selectedMenu }) => {
  return (
    <ul>
      {menuItems &&
        menuItems.map((menuItem) => (
          // 각 메뉴는 같은 이름을 가질 수 없다. -> key (O)
          <MenuItem
            key={menuItem.name}
            menuItem={menuItem}
            handleOpenDetail={handleOpenDetail}
            selectedMenu={selectedMenu}
          />
        ))}
    </ul>
  );
};

export default MenuItems;
