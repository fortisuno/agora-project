// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@rneui/base";
import Inicio from "./screens/Inicio";
import PedidoDetalle from "./screens/PedidoDetalle";
import PedidoFormulario from "./screens/PedidoFormulario";
import UsuarioDetalle from "./screens/UsuarioDetalle";
import UsuarioFormulario from "./screens/UsuarioFormulario";
import Filtro from "./screens/Filtro";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home">
				<Stack.Screen name="Inicio" component={Inicio} />
				<Stack.Screen name="Filtro" component={Filtro} />
				<Stack.Screen name="PedidoDetalle" component={PedidoDetalle} />
				<Stack.Screen name="PedidoFormulario" component={PedidoFormulario} />
				<Stack.Screen name="UsuarioDetalle" component={UsuarioDetalle} />
				<Stack.Screen name="UsuarioFormulario" component={UsuarioFormulario} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
