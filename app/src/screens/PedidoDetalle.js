import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import styles from "../styles";
import ReadOnly from "../components/ReadOnly";
import CardPropuesta from "../components/Card/CardPropuesta";
import { FAB, Icon, lightColors, useTheme } from "@rneui/themed";
import { Categorias } from "../models/Categorias";
import { useDataContext } from "../components/DataContext";
import { Ubicaciones } from "../models/Ubicaciones";
import { getAll } from "../api";
import { useIsFocused } from "@react-navigation/core";

const PedidoDetalle = ({ navigation, route }) => {
	const { data } = route.params;
	const { theme } = useTheme();
	const usuario = useDataContext();
	const isFocused = useIsFocused();

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case "FETCH_DATA":
					return {
						...prevState,
						isLoading: true
					};
				case "DATA_FOUNDED":
					return {
						...prevState,
						isLoading: false,
						data: action.payload
					};
				case "FETCH_ERROR":
					return {
						...prevState,
						isLoading: false,
						data: []
					};
			}
		},
		{
			isLoading: true,
			data: []
		}
	);

	React.useEffect(() => {
		if (isFocused) {
			const fetchData = async () => {
				dispatch({ type: "FETCH_DATA" });
				try {
					const propuestas = await getAll("propuestas", `pedidoId=${data.id}`);
					dispatch({ type: "DATA_FOUNDED", payload: propuestas || [] });
				} catch (error) {
					dispatch({ type: "FETCH_ERROR" });
				}
			};

			fetchData();
		}
	}, [isFocused]);

	return (
		<View style={[styles.screenProps, { padding: 0 }]}>
			<ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
				<View style={{ marginBottom: 30, paddingHorizontal: 20 }}>
					<ReadOnly label="Titulo" value={data.titulo} />
					<ReadOnly label="Cliente" value={data.usuario.displayName} />
					<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
						<ReadOnly label="Presupuesto" value={data.presupuesto} width="50%" />
						<ReadOnly label="Cantidad" value={`${data.cantidad} ${data.unidad}`} width="50%" />
						<ReadOnly label="Categoría" value={Categorias[data.categoria]} width="50%" />
						<ReadOnly label="Ubicación" value={data.ubicacion} width="50%" />
					</View>
				</View>
				<View>
					<Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, paddingHorizontal: 20 }}>
						Propuestas
					</Text>
					{state.isLoading ? (
						<ActivityIndicator size={64} color={theme.colors.primary} />
					) : (
						state.data.map((propuesta) => <CardPropuesta key={propuesta.id} data={propuesta} />)
					)}
				</View>
			</ScrollView>
			{usuario.data.tipo === "proveedor" &&
				!state.data.some((propuesta) => propuesta.usuario.id === usuario.data.uid) && (
					<FAB
						title="Crear propuesta"
						placement="right"
						onPress={() =>
							navigation.navigate("PropuestaFormulario", {
								mode: "crear",
								data: { monto: "", cantidad: "", unidad: "", pedidoId: data.id }
							})
						}
					/>
				)}
		</View>
	);
};

export default PedidoDetalle;
