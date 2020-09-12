import { queryDB } from '../../db';

export default async function (req, res) {
	try {
		res.json(
			(
				await queryDB(
					`SELECT comments, followers FROM articles WHERE id = $1`,
					[req.query.id]
				)
			)[0]
		);
	} catch (e) {
		console.log(e);
	}
}
