import React from "react";
import { Menu, IconButton } from "react-native-paper";

export default function CardMenu({
  visible,
  openMenu,
  closeMenu,
  onEdit,
  onDelete,
  textColor,
}) {
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          icon="dots-vertical"
          color={textColor}
          size={24}
          onPress={openMenu}
        />
      }
      contentStyle={{
        backgroundColor: "#AD94DB",
        borderRadius: 16,
      }}
    >
      <Menu.Item
        onPress={closeMenu}
        color={textColor}
        alignSelf="flex-end"
        leadingIcon="close"
      />
      <Menu.Item
        onPress={() => {
          onEdit();
          closeMenu();
        }}
        title="Editar"
      />
      <Menu.Item
        onPress={() => {
          onDelete();
          closeMenu();
        }}
        title="Excluir"
      />
    </Menu>
  );
}
