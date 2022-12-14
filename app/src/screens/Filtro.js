import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Button, Input, lightColors } from "@rneui/themed";
import styles from "../styles";

const Filtro = () => {
	return (
		<ScrollView contentContainerStyle={styles.screenProps}>
			<View style={{ flexDirection: "row" }}>
				<Input placeholder="Min" label="Presupuesto" containerStyle={{ width: "50%" }} />
				<Input placeholder="Max" label=" " containerStyle={{ width: "50%" }} />
			</View>
			<Input placeholder="Todas" label="Ubicación" />
			<Input placeholder="Todas" label="Categoría" />
			<Button title="Guardar cambios" containerStyle={{ width: "100%" }} />
			<Button
				title="Cancelar"
				titleStyle={{ color: lightColors.error }}
				containerStyle={{ width: "100%" }}
				type="clear"
			/>
		</ScrollView>
	);
};

export default Filtro;
