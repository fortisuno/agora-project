import { View, Text } from "react-native";
import React from "react";
import styles from "../styles";

const PedidoDetalle = () => {
	// UserContext {...user, tipo: "Cliente" | "Proveedor"}

	const tipo = "Proveedor"; // Viene del context

	return (
		<View style={styles.defaultContainer}>
			{tipo === "Cliente" ? <PedidoDetalleCliente /> : <PedidoDetalleProveedor />}
		</View>
	);
};

export default PedidoDetalle;
