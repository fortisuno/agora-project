// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import { AuthContext } from "./src/components/AuthContext";
import { DataContext } from "./src/components/DataContext";
import { API_URL } from "@env";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "@firebase/auth";
import { auth } from "./src/firebase";
import { addOne, getById } from "./src/api";

const Stack = createNativeStackNavigator();

function App() {
	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "RESTORE_SESSION":
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
		const unsuscribe = onAuthStateChanged(auth, async (user) => {
			let payload = null;
			if (user != null) {
				const { uid, displayName, email, phoneNumber } = user;
				const data = await getById("usuarios", uid);
				payload = {
					uid,
					displayName,
					email,
					phoneNumber,
					...data
				};
			}
			dispatch({ type: "RESTORE_SESSION", payload });
		});

		return () => unsuscribe();
	}, []);

	const authContext = React.useMemo(
		() => ({
			signIn: async (email, password) => {
				try {
					const payload = await signInWithEmailAndPassword(auth, email, password);
					const { uid, displayName, phoneNumber } = payload.user;
					const data = await getById("usuarios", uid);
					dispatch({ type: "SIGN_IN", payload: { uid, displayName, email, phoneNumber, ...data } });
				} catch (e) {
					alert(JSON.stringify(e));
				}
			},
			signOut: async () => {
				try {
					await signOut(auth);
					dispatch({ type: "SIGN_OUT" });
				} catch (e) {
					alert(JSON.stringify(e));
				}
			},
			signUp: async (user) => {
				try {
					const { message } = await addOne("usuarios", user);
					const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
					const { uid, phoneNumber, email, displayName } = userCredential.user;
					const { password, ...content } = user;
					dispatch({ type: "SIGN_IN", payload: { ...content, phoneNumber, email, displayName, uid } });
					alert(message);
				} catch (e) {
					alert(JSON.stringify(e));
				}
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
							<Stack.Group navigationKey={state.data == null ? "guest" : "user"}>
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
