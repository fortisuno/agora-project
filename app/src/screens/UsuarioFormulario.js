import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "../styles";
import { Input, Button, lightColors } from "@rneui/themed";
const UsuarioFormulario = ({ navigation, route }) => {
	const handleCrearUsuario = () => {
		navigation.goBack();
	};

	const handleBack = () => {
		navigation.goBack();
	};

	return (
		<ScrollView contentContainerStyle={styles.screenProps}>
			<Input label="Nombres" placeholder="ej. Pablo" />
			<Input label="Apellido Paterno" placeholder="ej. Gomez" />
			<Input label="Apellido Materno" placeholder="ej. Morales" />
			<Input label="Tipo de usuario" placeholder="Cliente | Proveedor" />
			<Input label="Ubicación" placeholder="ej. Ciudad de México" />
			<Input label="Correo electrónico" placeholder="ejemplo@correo.com" />
			<Input label="Teléfono" placeholder="5511223344" />
			<Input label="Contraseña" placeholder="Abc123" secureTextEntry={true} />
			<Input label="Confirmar contraseña" placeholder="Abc123" secureTextEntry={true} />
			<Button title="Crear usuario" containerStyle={{ width: "100%" }} onPress={handleCrearUsuario} />
			<Button
				title={route.params.mode === "editar" ? "Eliminar" : "Cancelar"}
				titleStyle={{ color: lightColors.error }}
				containerStyle={{ width: "100%" }}
				type="clear"
				onPress={handleBack}
			/>
		</ScrollView>
	);
};

export default UsuarioFormulario;
