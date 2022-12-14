import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Button, FAB, Icon, lightColors, ListItem } from "@rneui/themed";
import { NavigationContext } from "@react-navigation/native";

const CardPropuesta = ({}) => {
	const navigation = useContext(NavigationContext);
	return (
		<View style={{ paddingHorizontal: 20, paddingVertical: 10, overflow: "visible" }}>
			<ListItem containerStyle={{ elevation: 5, borderRadius: 10 }}>
				<ListItem.Content>
					<ListItem.Title style={{ color: "black", fontWeight: "bold", marginBottom: 10 }}>
						Nombre de usuario
					</ListItem.Title>
					<ListItem.Subtitle style={{ color: "black", marginRight: 10 }}>Precio (Cantidad) </ListItem.Subtitle>
				</ListItem.Content>
				<View>
					<Icon
						name="edit"
						size={24}
						iconStyle={{ borderRadius: 32, padding: 4 }}
						onPress={() => navigation.navigate("PropuestaFormulario", { mode: "editar" })}
					/>
				</View>
			</ListItem>
		</View>
	);
};

export default CardPropuesta;
