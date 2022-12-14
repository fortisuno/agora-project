import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Button, Divider, Input } from "@rneui/themed";

import styles from "../styles";

const Filtro = () => {
	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<Text style={styles.sectionTitle}>Filtros</Text>
				<View style={styles.defaultContainer}>
					<Input placeholder="Min" label="Presupuesto" />
					<Input placeholder="Max" label="Presupuesto" />
					<Input placeholder="Todas" label="Ubicación" />
					<Input placeholder="Todas" label="Categorías" />
					<Button title="Guardar cambios" containerStyle={{ width: "100%" }} />
					<Button title="Cancelar" containerStyle={{ width: "100%" }} type="clear" />
				</View>
		</ScrollView>
	);
};

export default Filtro;