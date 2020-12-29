import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modal";
import ChangeDisplayNameForm from "../Account/ChangeDisplayNameForm";
import ChangeEmailForm from "../Account/ChangeEmailForm";
import ChangePassword from "../Account/ChangePassword";

export default function AccountOptions(props) {
  const [showModal, setShowModal] = useState(false);
  const { userInfo, toastRef, setRealoadUserInfo } = props;
  const [renderCoponent, setRenderCoponent] = useState(null);

  const selectIdComponent = (key) => {
    switch (key) {
      case "displayName":
        setRenderCoponent(
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setRealoadUserInfo={setRealoadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "email":
        setRenderCoponent(
          <ChangeEmailForm
            email={userInfo.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setRealoadUserInfo={setRealoadUserInfo}
          />
        );
        setShowModal(true);
        break;
      case "password":
        setRenderCoponent(
          <ChangePassword setShowModal={setShowModal} toastRef={toastRef} />
        );
        setShowModal(true);
        break;
      default:
        setRenderCoponent(null);
        setShowModal(true);
        break;
    }
  };
  const menuOptions = generateOptions(selectIdComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem key={index} onPress={menu.onPress} bottomDivider>
          <Icon
            type={menu.iconType}
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
          />
          <ListItem.Content>
            <ListItem.Title>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron size={25} />
        </ListItem>
      ))}
      {renderCoponent && (
        <Modal isVisible={showModal} setVisible={setShowModal}>
          {renderCoponent}
        </Modal>
      )}
    </View>
  );
}

function generateOptions(selectIdComponent) {
  return [
    {
      title: "Camniar Nombre y Apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      onPress: () => {
        selectIdComponent("displayName");
      },
    },
    {
      title: "Camniar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      onPress: () => {
        selectIdComponent("email");
      },
    },
    {
      title: "Camniar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      onPress: () => {
        selectIdComponent("password");
      },
    },
  ];
}

const styles = StyleSheet.create({});
