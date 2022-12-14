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
import Loading from "./src/screens/Loading";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "./src/components/AuthContext";
import { DataContext } from "./src/components/DataContext";

const Stack = createNativeStackNavigator();

const usuarios = [];

function App() {
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "RESTORE_payload":
					return {
						...prevState,
						data: action.payload,
						isLoading: false
					};
				case "SIGN_IN":
					return {
						...prevState,
						isSignout: false,
						data: action.payload
					};
				case "SIGN_OUT":
					return {
						...prevState,
						isSignout: true,
						data: null
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			data: null
		}
	);

	React.useEffect(() => {
		const bootstrapAsync = async () => {
			let data;

			try {
				data = await SecureStore.getItemAsync("data", { keychainAccessible: SecureStore.WHEN_UNLOCKED });
			} catch (e) {
				// Restoring payload failed
			}
			dispatch({ type: "RESTORE_payload", payload: JSON.parse(data) });
		};

		bootstrapAsync();
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async () => {
				const data = {
					id: "fa42a789-46a5-49d1-b19a-1c7d48dde6d3",
					nombre: "Juan",
					apellidoPaterno: "Perez",
					apellidoMaterno: "Gonzalez",
					displayName: "Juan Perez Gonzalez",
					avatar: "JP",
					phoneNumber: "+525511223344",
					email: "ejemplo@email.com",
					tipo: "cliente",
					ubicacion: "DF"
				};
				try {
					await SecureStore.setItemAsync("data", JSON.stringify(data));
				} catch (e) {}
				dispatch({ type: "SIGN_IN", payload: data });
			},
			signOut: async () => {
				try {
					await SecureStore.deleteItemAsync("data");
				} catch (e) {}
				dispatch({ type: "SIGN_OUT" });
			},
			signUp: async () => {
				const data = {
					id: "fa42a789-46a5-49d1-b19a-1c7d48dde6d3",
					nombre: "Juan",
					apellidoPaterno: "Perez",
					apellidoMaterno: "Gonzalez",
					displayName: "Juan Perez Gonzalez",
					avatar: "JP",
					phoneNumber: "+525511223344",
					email: "ejemplo@email.com",
					tipo: "cliente",
					ubicacion: "DF"
				};
				try {
					await SecureStore.setItemAsync("data", JSON.stringify(data));
				} catch (e) {}
				dispatch({ type: "SIGN_IN", payload: data });
			}
		}),
		[]
	);

	return (
		<AuthContext.Provider value={authContext}>
			<DataContext.Provider value={state}>
				<ThemeProvider theme={theme}>
					<NavigationContainer>
						<Stack.Navigator
							screenOptions={{
								headerShadowVisible: false,
								headerTitleStyle: { fontSize: 24 }
							}}
						>
							{state.isLoading ? (
								<Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
							) : state.data == null ? (
								<Stack.Screen name="IniciarSesion" component={IniciarSesion} options={{ headerShown: false }} />
							) : (
								<>
									<Stack.Screen
										name="Inicio"
										component={Inicio}
										options={{ title: "Pedidos", headerRight: HeaderInicio }}
									/>
									<Stack.Screen name="Filtro" component={Filtro} options={{ title: "Filtrar pedidos" }} />
									<Stack.Screen
										name="PedidoDetalle"
										component={PedidoDetalle}
										options={{ title: "Detalles de pedido" }}
									/>
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
									<Stack.Screen
										name="UsuarioDetalle"
										component={UsuarioDetalle}
										options={{ title: "Perfil" }}
									/>
								</>
							)}
							<Stack.Group navigationKey={state.isSignout ? "guest" : "user"}>
								<Stack.Screen
									name="RecuperarContra"
									component={RecuperarContra}
									options={{ title: "Recuperar contraseña" }}
								/>
								<Stack.Screen
									name="UsuarioFormulario"
									component={UsuarioFormulario}
									options={({ route }) => ({ title: `${route.params.mode.toCapitalize()} usario` })}
								/>
							</Stack.Group>
						</Stack.Navigator>
					</NavigationContainer>
				</ThemeProvider>
			</DataContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
