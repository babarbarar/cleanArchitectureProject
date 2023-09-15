import express from "express";
import { validateCpf } from "./CpfValidator";
const app = express();
app.use(express.json());

app.post("/checkout", function (req, res) {
	const isValidCpf = validateCpf(req.body.cpf);
	if (isValidCpf) {
		res.end();
	}
	res.status(422).json({
		message: "Invalid cpf!"
	});
});

app.listen(3000);