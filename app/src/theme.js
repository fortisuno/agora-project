import { createTheme } from "@rneui/themed";

const colors = {
	light: "#f5f5f5"
};

export const app = {
	borderRadius: 10,
	baseSize: 10
};

const theme = createTheme({
	components: {
		Button: {
			radius: app.borderRadius,
			containerStyle: { marginVertical: app.baseSize / 2 },
			buttonStyle: { padding: app.baseSize }
		},
		Input: {
			selectionColor: "#111111",
			inputContainerStyle: {
				borderBottomWidth: 0,
				backgroundColor: colors.light,
				borderRadius: app.borderRadius,
				paddingHorizontal: app.baseSize,
				paddingVertical: app.baseSize / 2
			}
		}
	}
});

export default theme;
