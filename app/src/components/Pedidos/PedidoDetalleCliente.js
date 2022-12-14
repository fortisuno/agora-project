import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Input } from "@rneui/themed";

import PedidoInfo from "./PedidoInfo";

const PedidoDetalleCliente = () => {
	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<Text style={styles.sectionTitle}>Pedido detalle</Text>
			<View style={styles.defaultContainer}>
				<Input placeholder="Aguacate para evento" label="Título" />
				<Input placeholder="$" label="Presupuesto" />
				<Input placeholder="tn" label="Cantidad" />
				<Input placeholder="Todas" label="Categoría" />
				<Input placeholder="Descripción" label="Descripción" />
				<Text style={styles.singleTitle}>Propuestas</Text>
				<Card style={styles.cardContainer}>
					<Card.Title>Sofía Tovar</Card.Title>
					<Text style={styles.fonts} h3>
						$1000
					</Text>
					<Text style={styles.fonts}>1 tn</Text>
				</Card>
				<Card style={styles.cardContainer}>
					<Card.Title>Juan Mirafuentes</Card.Title>
					<Text style={styles.fonts} h3>
						$1000
					</Text>
					<Text style={styles.fonts}>1 tn</Text>
				</Card>
			</View>
		</ScrollView>
	);
};

export default PedidoDetalleCliente;
