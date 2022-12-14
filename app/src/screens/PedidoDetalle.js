import { View, Text } from "react-native";
import React from "react";
import styles from "../styles";
import PedidoDetalleProveedor from "../components/Pedidos/PedidoDetalleProveedor";
import PedidoDetalleCliente from "../components/Pedidos/PedidoDetalleCliente";

const PedidoDetalle = () => {
	// UserContext {...user, tipo: "Cliente" | "Proveedor"}

	const tipo = "Proveedor"; // Viene del context

	return (
		<View style={styles.defaultContainer}>
			<Text>Pedido detalle</Text>
		</View>
	);
};

export default PedidoDetalle;
