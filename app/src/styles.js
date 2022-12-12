import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center"
	},
	centeredContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "white",
		paddingHorizontal: 20
	},
	defaultContainer: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "flex-start",
		backgroundColor: "white",
		paddingHorizontal: 20
	}
});

export default styles;
