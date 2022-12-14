import { ScrollView, View } from "react-native";
import React from "react";
import { Avatar, Button, darkColors, Divider, FAB, lightColors, ListItem, Text, useTheme } from "@rneui/themed";
import * as Base from "@rneui/base";
import styles from "../styles";
import { Icon } from "@rneui/base";
import CardPedido from "../components/Card/CardPedido";
import { useAuthContext } from "../components/AuthContext";
import { useDataContext } from "../components/DataContext";

const list = [
	{
		title: "Appointments",
		icon: "av-timer"
	},
	{
		title: "Trips",
		icon: "flight-takeoff"
	}
];

const Inicio = ({ navigation }) => {
	const { theme } = useTheme();
	const { data } = useDataContext();
	const [pedidos, setPedidos] = React.useState([]);

	React.useEffect(() => {
		// Hacer fetch de pedidos (Metodo GET de api/pedidos)
	}, []);

	return (
		<View style={[styles.screenProps, { padding: 0 }]}>
			<ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
				{pedidos.map((pedido, index) => (
					<CardPedido key={pedido.id} onPress={() => navigation.navigate("PedidoDetalle", { id: pedido.id })} />
				))}
			</ScrollView>
			<FAB
				icon={<Icon name="add" color="white" />}
				placement="right"
				onPress={() => navigation.navigate("PedidoFormulario", { mode: "crear" })}
			/>
		</View>
	);
};

export default Inicio;
