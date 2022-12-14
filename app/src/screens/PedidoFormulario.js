import { ScrollView, View, Text } from "react-native";
import React from "react";
import { Button, Divider, Input } from "@rneui/themed";

import styles from "../styles";

const PedidoFormulario = () => {
	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<Text style={styles.sectionTitle}>Nuevo pedido</Text>
				<View style={styles.defaultContainer}>
					<Input placeholder="Título" label="Título" />
					<Input placeholder="Presupuesto" label="Presupuesto" />
					<Input placeholder="Cantidad" label="Cantidad" />
					<Input placeholder="Unidad" label="Unidad" />
					<Input placeholder="Categoría" label="Categoría" />
					<Input placeholder="Descripción" label="Descripción" />
					<Button title="Guardar" containerStyle={{ width: "100%" }} />
					<Button title="Cancelar" containerStyle={{ width: "100%" }} type="clear" />
				</View>
		</ScrollView>
	);
};

export default PedidoFormulario;
