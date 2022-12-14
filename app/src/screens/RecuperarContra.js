import { View } from "react-native";
import React from "react";
import styles from "../styles";
import { Input, Button, Text } from "@rneui/themed";

const RecuperarContra = ({ navigation }) => {
	const handleBack = () => {
		navigation.goBack();
	};
	return (
		<View style={[styles.screenProps, { paddingTop: 50 }]}>
			<Input placeholder="ejemplo@correo.com" label="Correo electrónico" />
			<Button title="Recuperar contraseña" containerStyle={{ width: "100%" }} onPress={handleBack} />
			<Button title="Cancelar" containerStyle={{ width: "100%" }} type="clear" onPress={handleBack} />
		</View>
	);
};

export default RecuperarContra;
