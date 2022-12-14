String.prototype.toCapitalize = function () {
	return this.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
};
