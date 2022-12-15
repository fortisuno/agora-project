import { ActivityIndicator, ScrollView, View } from "react-native";
import React from "react";
import { Avatar, Button, darkColors, Divider, FAB, lightColors, ListItem, Text, useTheme } from "@rneui/themed";
import * as Base from "@rneui/base";
import styles from "../styles";
import { Icon } from "@rneui/base";
import CardPedido from "../components/Card/CardPedido";
import { useAuthContext } from "../components/AuthContext";
import { useDataContext } from "../components/DataContext";
import { getAll } from "../api";

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
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "FETCH_DATA":
					return {
						...prevState,
						isLoading: true
					};
				case "DATA_FOUNDED":
					return {
						...prevState,
						isLoading: false,
						data: action.payload
					};
				case "FETCH_ERROR":
					return {
						...prevState,
						isLoading: false,
						data: []
					};
			}
		},
		{
			isLoading: true,
			data: []
		}
	);

	React.useEffect(() => {
		const fetchData = async () => {
			dispatch({ type: "FETCH_DATA" });
			try {
				const payload = await getAll("pedidos");
				dispatch({ type: "DATA_FOUNDED", payload });
			} catch (error) {
				dispatch({ type: "FETCH_ERROR" });
			}
		};

		fetchData();
	}, []);

	return (
		<View
			style={
				state.isLoading
					? [styles.screenProps, styles.centeredProps, { padding: 0 }]
					: [styles.screenProps, { padding: 0 }]
			}
		>
			{state.isLoading ? (
				<ActivityIndicator size={64} color={theme.colors.primary} />
			) : (
				<ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
					{state.data.map((pedido) => (
						<CardPedido
							key={pedido.id}
							data={pedido}
							onPress={() => navigation.navigate("PedidoDetalle", pedido)}
						/>
					))}
				</ScrollView>
			)}
			<FAB
				icon={<Icon name="add" color="white" />}
				placement="right"
				onPress={() => navigation.navigate("PedidoFormulario", { mode: "crear" })}
			/>
		</View>
	);
};

export default Inicio;
