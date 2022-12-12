// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "@rneui/base";
import Inicio from "./src/screens/Inicio";
import PedidoDetalle from "./src/screens/PedidoDetalle";
import PedidoFormulario from "./src/screens/PedidoFormulario";
import UsuarioDetalle from "./src/screens/UsuarioDetalle";
import UsuarioFormulario from "./src/screens/UsuarioFormulario";
import Filtro from "./src/screens/Filtro";
import IniciarSesion from "./src/screens/IniciarSesion";
import { ThemeProvider } from "@rneui/themed";
import theme from "./src/theme";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="IniciarSesion" screenOptions={{ headerShadowVisible: false }}>
					<Stack.Screen name="IniciarSesion" component={IniciarSesion} options={{ headerShown: false }} />
					<Stack.Screen name="Inicio" component={Inicio} />
					<Stack.Screen name="Filtro" component={Filtro} />
					<Stack.Screen name="PedidoDetalle" component={PedidoDetalle} />
					<Stack.Screen name="PedidoFormulario" component={PedidoFormulario} />
					<Stack.Screen name="UsuarioDetalle" component={UsuarioDetalle} />
					<Stack.Screen name="UsuarioFormulario" component={UsuarioFormulario} />
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}

export default App;
