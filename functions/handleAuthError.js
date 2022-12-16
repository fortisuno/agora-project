exports.handleAutherror = (error, data, defaultMessage) => {
	const { id, email, phoneNumber } = data;
	const httpsError = {
		status: "",
		message: ""
	};
	switch (error.code) {
		case "auth/email-already-exists":
			httpsError.status = 400;
			httpsError.message = `El email ${email} ya se encuentra registrado por otro usuario`;
			break;
		case "auth/phone-number-already-exists":
			httpsError.status = 400;
			httpsError.message = `El número de teléfono ${phoneNumber} ya se encuentra registrado por otro usuario`;
			break;
		case "auth/uid-already-exists":
			httpsError.status = 400;
			httpsError.message = "Hubo un error al registrar el usuario, por favor intente nuevamente";
			break;
		case "auth/user-not-found":
			httpsError.status = 404;
			httpsError.message = `El usuario ${id} no existe`;
			break;
		default:
			httpsError.status = 500;
			httpsError.message = defaultMessage;
			break;
	}
	return httpsError;
};
