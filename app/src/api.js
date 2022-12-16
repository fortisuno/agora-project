import { API_URL } from "@env";

export const addOne = async (collection, data) => {
	const res = await fetch(`${API_URL}/${collection}/add`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	return await res.json();
};

export const getAll = async (collection, queryParams) => {
	const res = await fetch(`${API_URL}/${collection}?${queryParams}`, {
		method: "GET"
	});
	return await res.json();
};

export const getById = async (collection, id) => {
	const res = await fetch(`${API_URL}/${collection}/${id}`, {
		method: "GET"
	});
	return await res.json();
};

export const updateById = async (collection, id, data) => {
	const res = await fetch(`${API_URL}/${collection}/${id}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});
	return await res.json();
};

export const deleteById = async (collection, id) => {
	const res = await fetch(`${API_URL}/${collection}/${id}`, {
		method: "DELETE"
	});
	return await res.json();
};
