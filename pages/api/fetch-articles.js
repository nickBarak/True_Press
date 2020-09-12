import { queryDB } from '../../db';

export default async function (req, res) {
	try {
		res.json(
			await queryDB(`SELECT * FROM articles WHERE id = ANY($1)`, [
				req.body.ids,
			])
		);
	} catch (e) {
		console.log(e);
	}
}
