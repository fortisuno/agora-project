import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Avatar, Button, Divider, Icon, lightColors } from "@rneui/base";
import { NavigationContext } from "@react-navigation/native";

const HeaderInicio = () => {
	const navigation = useContext(NavigationContext);
	const handleFilter = () => {
		navigation.navigate("Filtro");
	};
	const handleProfile = () => {
		navigation.navigate("UsuarioDetalle");
	};
	return (
		<>
			<Icon
				name="tune"
				reverse
				color="white"
				reverseColor="black"
				size={16}
				iconStyle={{ fontSize: 24 }}
				onPress={handleFilter}
			/>
			<Divider orientation="vertical" color="white" width={8} insetType="middle" />
			<Avatar
				title="PG"
				rounded
				containerStyle={{ backgroundColor: lightColors.grey5 }}
				titleStyle={{ color: lightColors.primary, fontWeight: "bold" }}
				onPress={handleProfile}
			/>
		</>
	);
};

export default HeaderInicio;
