import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import styles from "../styles";
import ReadOnly from "../components/ReadOnly";
import CardPropuesta from "../components/Card/CardPropuesta";
import { FAB, Icon, lightColors } from "@rneui/themed";

const PedidoDetalle = ({ navigation, route }) => {
	// const { userProfile } = useContext(AuthContext);

	// const { tipo } = userProfile;
	const [pedido, setPedido] = React.useState(null);

	const pepidoInfo = {
		titulo: "Frutas para evento"
	};

	React.useEffect(() => {
		// Hacer fetch del pedido usanto el pedidoId (Metodo GET de api/pedidos/:id)
		// const pedidoId = route.params.id;
		const pedidoId = "asdasds";
	}, []);

	return (
		<View style={[styles.screenProps, { padding: 0 }]}>
			<ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
				<View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
					<ReadOnly label="Titulo" value={pedido.titulo} />
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
				placement="right"
				onPress={() => navigation.navigate("PropuestaFormulario", { mode: "crear" })}
			/>
		</View>
	);
};

export default PedidoDetalle;
