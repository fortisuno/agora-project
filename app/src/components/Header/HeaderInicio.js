import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Avatar, Button, Divider, Icon, lightColors } from "@rneui/themed";
import { NavigationContext } from "@react-navigation/native";
import { useAuthContext } from "../AuthContext";
import { useDataContext } from "../DataContext";

const HeaderInicio = () => {
	const { data } = useDataContext();
	const navigation = useContext(NavigationContext);
	const handleFilter = () => {
		navigation.navigate("Filtro");
	};
	const handleProfile = () => {
		navigation.navigate("UsuarioDetalle");
	};
	return (
		<>
			<Icon name="tune" size={24} iconStyle={{ borderRadius: 32, padding: 4 }} onPress={handleFilter} />
			<Divider orientation="vertical" color="white" width={16} insetType="middle" />
			<Avatar title={data.avatar} rounded onPress={handleProfile} />
		</>
	);
};

export default HeaderInicio;
