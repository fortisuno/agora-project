import { View, Text } from "react-native";
import React from "react";
import { Avatar, Badge, Chip, ListItem } from "@rneui/themed";
import TouchableScale from "react-native-touchable-scale";

const CardPedido = ({ onPress, data }) => {
	return (
		<View style={{ paddingHorizontal: 20, paddingVertical: 10, overflow: "visible" }}>
			<ListItem containerStyle={{ elevation: 5, borderRadius: 10 }} onPress={onPress}>
				<ListItem.Content>
					<ListItem.Title style={{ color: "black", fontWeight: "bold", marginBottom: 10 }}>
						{data.titulo}
					</ListItem.Title>
					<View style={{ flexDirection: "row" }}>
						<ListItem.Subtitle style={{ color: "black", marginRight: 10 }}>
							${data.presupuesto} ({data.cantidad} {data.unidad}){" "}
						</ListItem.Subtitle>
						<Badge value="Frutas" textStyle={{ fontWeight: "500" }} badgeStyle={{ paddingHorizontal: 4 }} />
					</View>
				</ListItem.Content>
				<ListItem.Chevron color="black" />
			</ListItem>
		</View>
	);
};

export default CardPedido;
