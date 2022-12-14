import { fonts } from "@rneui/base";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		backgroundColor: 'white'
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
	},
	sectionTitle: {	
		textAlign: 'left',
		marginTop: 10,
		marginBottom: 20,
		backgroundColor: 'white',
		fontSize: 28,
		fontWeight: 'bold',
		paddingHorizontal: 30
	},
	singleTitle: {
		textAlign: 'left',
		marginTop: 1,
		marginBottom: 1,
		backgroundColor: 'white',
		fontSize: 20,
		fontWeight: 'bold',
		paddingHorizontal: 20
	}
});

export default styles;
