import { View, Text, ScrollView } from "react-native";
import React from "react";
import styles from "../styles";
import ReadOnly from "../components/ReadOnly";
import CardPropuesta from "../components/Card/CardPropuesta";
import { FAB, Icon, lightColors } from "@rneui/themed";

const PedidoDetalle = ({ navigation }) => {
	// UserContext {...user, tipo: "Cliente" | "Proveedor"}

	const tipo = "Proveedor"; // Viene del context

	return (
		<View style={[styles.screenProps, { padding: 0 }]}>
			<ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
				<View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
					<ReadOnly label="Titulo" />
					<ReadOnly label="Cliente" />
					<View style={{ flexDirection: "row" }}>
						<ReadOnly label="Precio" width="50%" />
						<ReadOnly label="Cantidad" width="50%" />
					</View>
					<ReadOnly label="Categoría" />
					<ReadOnly label="Descripción" />
				</View>
				<View>
					<Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, paddingHorizontal: 20 }}>
						Propuestas
					</Text>
					<CardPropuesta />
				</View>
			</ScrollView>
			<FAB
				title="Crear propuesta"
				color={lightColors.primary}
				placement="right"
				onPress={() => navigation.navigate("PropuestaFormulario", { mode: "crear" })}
			/>
		</View>
	);
};

export default PedidoDetalle;
