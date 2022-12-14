import { ScrollView, View, Text } from "react-native";
import React from "react";
import { Button, Divider, Input, lightColors } from "@rneui/themed";

import styles from "../styles";

const PedidoFormulario = ({ navigation, route }) => {
	const [pedido, setPedido] = React.useState(null);

	const pepidoInfo = {
		titulo: "Frutas para evento"
	};

	React.useEffect(() => {
		// Hacer fetch del pedido usanto el pedidoId (Metodo GET de api/pedidos/:id)
		// const pedidoId = route.params.id;
		const pedidoId = "asdasds";
	}, []);

	const handleSave = () => {
		navigation.goBack();
	};

	const handleCancel = () => {
		navigation.goBack();
	};

	return (
		<ScrollView contentContainerStyle={[styles.screenProps]}>
			<View style={styles.defaultContainer}>
				<Input placeholder="Título" label="Título" />
				<Input placeholder="Presupuesto" label="Presupuesto" />
				<View style={{ flexDirection: "row" }}>
					<Input placeholder="Cantidad" label="Cantidad" containerStyle={{ width: "50%" }} />
					<Input placeholder="Unidad" label="Unidad" containerStyle={{ width: "50%" }} />
				</View>
				<Input placeholder="Categoría" label="Categoría" />
				<Input placeholder="Descripción" label="Descripción" />
				<Button title="Guardar" containerStyle={{ width: "100%" }} on onPress={handleSave} />
				<Button
					title={route.params.mode === "editar" ? "Eliminar" : "Cancelar"}
					titleStyle={{ color: lightColors.error }}
					containerStyle={{ width: "100%" }}
					type="clear"
					onPress={handleCancel}
				/>
			</View>
		</ScrollView>
	);
};

export default PedidoFormulario;
