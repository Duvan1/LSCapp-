import React, { useState } from "react";
import { StyleSheet, View, ViewComponent } from "react-native";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validation";
import { reauthenticate } from "../../utils/api";

export default function ChangeEmailForm(props) {
  const { email, setShowModal, toastRef, setRealoadUserInfo } = props;
  const [formData, setFormData] = useState(defaultForm());
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    setError({});
    if (!formData.email || email === formData.email) {
      setError({
        email: "el email no ha cambiado ",
      });
    } else if (!validateEmail(formData.email)) {
      setError({
        email: "el email es incorrecto",
      });
    } else if (!password) {
      setError({
        password: "la contraseña es obligatoria",
      });
    } else {
      reauthenticate(formData.password)
        .then((response) => {})
        .catch(() => {
          setError({ password: "Contraseña incorrecta" });
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        defaultValue={email || ""}
        containerStyle={styles.input}
        placeholder="Correo electronico"
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChange={(e) => onChange(e, "email")}
        errorMessage={error.email}
      />
      <Input
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        placeholder="Password"
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: () => setShowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={error.password}
      />
      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
      />
    </View>
  );
}

function defaultForm() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnStyles: {
    backgroundColor: "#5fbdff",
  },
  btn: {
    backgroundColor: "#5fbdff",
  },
});
