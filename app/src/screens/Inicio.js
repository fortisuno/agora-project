import { View, Text } from "react-native";
import React from "react";
import { Button, Divider } from "@rneui/base";

const Inicio = ({ navigation }) => {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text style={{ marginBottom: 10 }}>Vistas de la app:</Text>
			<Button
				title="Mostrar Iniciar sesión"
				onPress={() => navigation.navigate("IniciarSesion")}
				containerStyle={{ marginVertical: 10 }}
				buttonStyle={{ borderRadius: 10 }}
			/>
			<Button
				title="Mostrar Filtro"
				onPress={() => navigation.navigate("Filtro")}
				containerStyle={{ marginVertical: 10 }}
				buttonStyle={{ borderRadius: 10 }}
			/>
			<Button
				title="Mostrar Pedido Detalle"
				onPress={() => navigation.navigate("PedidoDetalle")}
				containerStyle={{ marginVertical: 10 }}
				buttonStyle={{ borderRadius: 10 }}
			/>
			<Button
				title="Mostrar Usuario Detalle"
				onPress={() => navigation.navigate("UsuarioDetalle")}
				containerStyle={{ marginVertical: 10 }}
				buttonStyle={{ borderRadius: 10 }}
			/>
			<Button
				title="Mostrar Pedido Formulario"
				onPress={() => navigation.navigate("PedidoFormulario")}
				containerStyle={{ marginVertical: 10 }}
				buttonStyle={{ borderRadius: 10 }}
			/>
			<Button
				title="Mostrar Usuario Formulario"
				onPress={() => navigation.navigate("UsuarioFormulario")}
				containerStyle={{ marginVertical: 10 }}
				buttonStyle={{ borderRadius: 10 }}
			/>
		</View>
	);
};

export default Inicio;
