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
import RecuperarContra from "./src/screens/RecuperarContra";
import HeaderInicio from "./src/components/Header/HeaderInicio";
import PropuestaFormulario from "./src/screens/PropuestaFormulario";
import "./src/utils/extensions";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="IniciarSesion"
					screenOptions={{
						headerShadowVisible: false,
						headerTitleStyle: { fontSize: 24 }
					}}
				>
					<Stack.Screen name="IniciarSesion" component={IniciarSesion} options={{ headerShown: false }} />
					<Stack.Screen
						name="RecuperarContra"
						component={RecuperarContra}
						options={{ title: "Recuperar contraseña" }}
					/>
					<Stack.Screen
						name="Inicio"
						component={Inicio}
						options={{ title: "Pedidos", headerRight: HeaderInicio }}
					/>
					<Stack.Screen name="Filtro" component={Filtro} options={{ title: "Filtrar pedidos" }} />
					<Stack.Screen name="PedidoDetalle" component={PedidoDetalle} options={{ title: "Detalles de pedido" }} />
					<Stack.Screen
						name="PedidoFormulario"
						component={PedidoFormulario}
						options={({ route }) => ({ title: `${route.params.mode.toCapitalize()} pedido` })}
					/>
					<Stack.Screen
						name="PropuestaFormulario"
						component={PropuestaFormulario}
						options={({ route }) => ({ title: `${route.params.mode.toCapitalize()} propuesta` })}
					/>
					<Stack.Screen name="UsuarioDetalle" component={UsuarioDetalle} options={{ title: "Perfil" }} />
					<Stack.Screen
						name="UsuarioFormulario"
						component={UsuarioFormulario}
						options={({ route }) => ({ title: `${route.params.mode.toCapitalize()} usario` })}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</ThemeProvider>
	);
}

export default App;
