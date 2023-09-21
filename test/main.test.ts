import axios from "axios";

// To prevent axios to throw an exeption when status != 200
axios.defaults.validateStatus = function () {
	return true;
}

test("Should not continue when cpf is invalid", async function () {
	const input = {
		cpf: '987.654.321-01'
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Invalid cpf!");
});

test("Should not continue make an order when product is invalid", async function () {
	const input = {
		cpf: '144.796.170-60',
		itens: [
			{ productId: '008', productQuantity: 1 }
		],
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	expect(response.status).toBe(422);
	const output = response.data;
	expect(output.message).toBe("Product not found.");
});

test("Should register an order with 3 products when cpf valid", async function () {
	const input = {
		cpf: '144.796.170-60',
		itens: [
			{ productId: '001', productQuantity: 1 },
			{ productId: '002', productQuantity: 1 },
			{ productId: '003', productQuantity: 1 }
		],
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(165);
});

test("Should register an order with 3 products with descount cupom", async function () {
	const input = {
		cpf: '144.796.170-60',
		itens: [
			{ productId: '001', productQuantity: 1 },
			{ productId: '002', productQuantity: 1 },
			{ productId: '003', productQuantity: 1 }
		],
		cupon: 'APP10',
	};
	const response = await axios.post("http://localhost:3000/checkout", input)
	const output = response.data;
	expect(output.total).toBe(148.5);
});