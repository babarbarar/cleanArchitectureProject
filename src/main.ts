import express from "express";
import { validateCpf } from "./CpfValidator";
const app = express();
app.use(express.json());

const products = [
	{ productId: '001', productDescription: 'Fork', productAmount: 50 },
	{ productId: '002', productDescription: 'Spoon', productAmount: 60 },
	{ productId: '003', productDescription: 'Knife', productAmount: 55 },
]

const cupons = [
	{ cuponCode: 'APP10', cuponPercentage: 10},
]

app.post("/checkout", function (req, res) {
	const isValidCpf = validateCpf(req.body.cpf);
	if (!isValidCpf) {
		return res.status(422).json({
			message: "Invalid cpf!"
		});
	}
	let total = 0;
	for (const iten of req.body.itens ) {
		const product = products.find (
			(product) => product.productId === iten.productId
		);
		if (product) {
			total += product.productAmount * iten.productQuantity;
		} else {
			return res.status(422).json({
				message: "Product not found."
			});
		}
	}
	if (req.body.cupon) {
		const cupon = cupons.find(cupon => cupon.cuponCode === req.body.cupon);
		if ( cupon ) {
			total -= (total * cupon.cuponPercentage)/100;
		}
	}
	res.json({
		total
	});
});

app.listen(3000);