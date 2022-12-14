import { ScrollView, View } from "react-native";
import React from "react";
import { Avatar, Button, darkColors, Divider, FAB, lightColors, ListItem, Text } from "@rneui/themed";
import * as Base from "@rneui/base";
import styles from "../styles";
import { Icon } from "@rneui/base";
import CardPedido from "../components/Card/CardPedido";

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
	return (
		<View style={[styles.screenProps, { padding: 0 }]}>
			<ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
				<CardPedido onPress={() => navigation.navigate("PedidoDetalle", { id: "1234567" })} />
			</ScrollView>
			<FAB
				icon={<Icon name="add" color="white" />}
				color={lightColors.primary}
				placement="right"
				onPress={() => navigation.navigate("PedidoFormulario", { mode: "crear" })}
			/>
		</View>
	);
};

export default Inicio;
