import axios from "axios";

// To prevent axios to throw an exeption when status != 200
axios.defaults.validateStatus = function () {
	return true;
}

test("Should not continue when cpf is invalid", async function () {
	const input = {
		cpf: "987.654.321-01"
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Invalid cpf!");
});

test("Should continue when cpf is valid", async function () {
	const input = {
		cpf: "144.796.170-60"
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(200);
});