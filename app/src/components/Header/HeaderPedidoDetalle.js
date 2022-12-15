import { View, Text } from "react-native";
import React, { useContext } from "react";
import { NavigationContext, useRoute } from "@react-navigation/core";
import { useDataContext } from "../DataContext";
import { Icon } from "@rneui/themed";

const HeaderPedidoDetalle = () => {
	const { data } = useDataContext();
	const navigation = useContext(NavigationContext);
	const route = useRoute();

	const handleEditar = () => {
		const { titulo, presupuesto, cantidad, unidad, categoria, id } = route.params.data;
		navigation.navigate("PedidoFormulario", {
			mode: "editar",
			data: { titulo, presupuesto, cantidad, unidad, categoria, id }
		});
	};
	return (
		data.tipo === "cliente" && (
			<Icon name="edit" size={24} iconStyle={{ borderRadius: 32, padding: 4 }} onPress={handleEditar} />
		)
	);
};

export default HeaderPedidoDetalle;
