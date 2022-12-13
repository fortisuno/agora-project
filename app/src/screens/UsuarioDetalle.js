import { ScrollView, Text, View, Image} from "react-native";
import React from "react";
import { Button, Divider, Input } from "@rneui/themed";
import { Badge} from '@rneui/themed';

import styles from "../styles";

const UsuarioDetalle = () => {
	return (
		<ScrollView contentContainerStyle={styles.scrollContainer}>
		<Text style={styles.sectionTitle}>Usuario detalle</Text>
			<View style={styles.centeredContainer}>
				<Image
					style={{ width: 120, height: 120, marginVertical: 5 }}
					source={{ uri: "https://cdn-icons-png.flaticon.com/128/3135/3135768.png" }}
				/>
				<Badge value="Cliente" status="primary" />
				<Input placeholder="Nombre" label="Nombre" />
				<Input placeholder="Ubicación" label="Ubicación" />
				<Input placeholder="correo@gmail.com" label="Correo" />
				<Input placeholder="+52 5511223344" label="Teléfono" />
				<Button title="Actualizar cuenta" containerStyle={{ width: "100%" }} />
				<Button title="Cambiar contraseña" containerStyle={{ width: "100%" }} type="clear" />
			</View>
	</ScrollView>
	);
};

export default UsuarioDetalle;