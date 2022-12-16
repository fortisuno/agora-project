import { View, Text, Linking } from "react-native";
import React, { useContext } from "react";
import { Button, FAB, Icon, lightColors, ListItem } from "@rneui/themed";
import { NavigationContext } from "@react-navigation/native";
import { useDataContext } from "../DataContext";

const CardPropuesta = ({ data }) => {
	const navigation = useContext(NavigationContext);
	const session = useDataContext();

	const { monto, cantidad, unidad, pedidoId, id, usuario } = data;

	return (
		<View style={{ paddingHorizontal: 20, paddingVertical: 10, overflow: "visible" }}>
			<ListItem containerStyle={{ elevation: 5, borderRadius: 10 }}>
				<ListItem.Content>
					<ListItem.Title style={{ color: "black", fontWeight: "bold", marginBottom: 10 }}>
						{usuario.displayName}
					</ListItem.Title>
					<ListItem.Subtitle style={{ color: "black", marginRight: 10 }}>
						${monto} ({cantidad} {unidad})
					</ListItem.Subtitle>
				</ListItem.Content>
				<View style={{ flexDirection: "row" }}>
					{session.data.tipo === "cliente" && (
						<>
							<Icon
								name="mail"
								size={24}
								iconStyle={{ borderRadius: 32, padding: 4 }}
								containerStyle={{ marginRight: 10 }}
								onPress={() => Linking.openURL(`mailto:${data.email}?subject=Me interesa tu propuesta`)}
							/>
							<Icon
								name="phone"
								size={24}
								iconStyle={{ borderRadius: 32, padding: 4 }}
								containerStyle={{ marginRight: 10 }}
								onPress={async () => Linking.openURL(`tel:${data.phoneNumber}`)}
							/>
							<Icon
								name="logo-whatsapp"
								type="ionicon"
								size={24}
								iconStyle={{ borderRadius: 32, padding: 4 }}
								onPress={async () =>
									Linking.openURL(`https://wa.me/${data.phoneNumber}?text=Me interesa tu propuesta`)
								}
							/>
						</>
					)}
					{usuario.id === session.data.uid && (
						<Icon
							name="edit"
							size={24}
							iconStyle={{ borderRadius: 32, padding: 4 }}
							onPress={() =>
								navigation.navigate("PropuestaFormulario", {
									mode: "editar",
									data: { monto, cantidad, unidad, pedidoId, id }
								})
							}
						/>
					)}
				</View>
			</ListItem>
		</View>
	);
};

export default CardPropuesta;
