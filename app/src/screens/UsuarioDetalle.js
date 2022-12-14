import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Chip, lightColors } from "@rneui/base";
import { Avatar, Button } from "@rneui/themed";
import ReadOnly from "../components/ReadOnly";
import styles from "../styles";

const UsuarioDetalle = ({ navigation }) => {
	const handleUpdate = () => {
		navigation.navigate("UsuarioFormulario", { mode: "editar" });
	};
	return (
		<ScrollView contentContainerStyle={[styles.screenProps, styles.topCenterProps, { paddingHorizontal: 30 }]}>
			<Avatar
				title="PG"
				rounded
				size={128}
				containerStyle={{ backgroundColor: lightColors.grey5, marginBottom: 16 }}
				titleStyle={{ color: lightColors.primary, fontWeight: "bold" }}
			/>
			<Chip title="Cliente" containerStyle={{ marginBottom: 32 }} />
			<ReadOnly lbel="Nombre" label="Nombre" />
			<ReadOnly lbel="Ubicación" label="Ubicación" />
			<ReadOnly lbel="correo@gmail.com" label="Correo" />
			<ReadOnly lbel="+52 5511223344" label="Teléfono" />
			<Button title="Actualizar cuenta" containerStyle={{ width: "100%" }} onPress={handleUpdate} />
			<Button title="Cambiar contraseña" containerStyle={{ width: "100%" }} type="clear" />
			<Button
				title="Eliminar cuenta"
				titleStyle={{ color: lightColors.error }}
				containerStyle={{ width: "100%" }}
				type="clear"
			/>
		</ScrollView>
	);
};

export default UsuarioDetalle;
