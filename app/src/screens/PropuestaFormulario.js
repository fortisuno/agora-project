import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "../styles";
import { Button, Input, lightColors } from "@rneui/themed";

const PropuestaFormulario = ({ route }) => {
	return (
		<ScrollView contentContainerStyle={styles.screenProps}>
			<Input placeholder="Monto" label="Monto" />
			<Input placeholder="Cantidad" label="Cantidad" />
			<Input placeholder="Unidad" label="Unidad" />
			<Button title="Guardar" containerStyle={{ width: "100%" }} />
			<Button
				title={route.params.mode === "editar" ? "Eliminar" : "Cancelar"}
				titleStyle={{ color: lightColors.error }}
				containerStyle={{ width: "100%" }}
				type="clear"
			/>
		</ScrollView>
	);
};

export default PropuestaFormulario;
