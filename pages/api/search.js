import { queryDB } from '../../db';

export default async function (req, res) {
	try {
		const results = await queryDB(
			`SELECT * FROM
                (SELECT DISTINCT ON
                    (id) id,
                    title,
                    category,
                    subcategory,
                    publish_date,
                    description,
                    content,
                    author
                FROM articles) x
                WHERE
                    LOWER(title) LIKE LOWER('% ${req.query.value}%')
                    OR LOWER(title) LIKE LOWER('${req.query.value} %')
                    OR LOWER(title) LIKE LOWER('% ${req.query.value}')
                    OR LOWER(description) LIKE LOWER('% ${req.query.value} %')
                    OR LOWER(description) LIKE LOWER('${req.query.value} %')
                    OR LOWER(description) LIKE LOWER('% ${req.query.value}')
                    OR LOWER(category) = LOWER('${req.query.value}')
                    OR LOWER(subcategory) = LOWER('${req.query.value}')`
		);
		res.json( results || [] );
	} catch (e) {
		console.log(e);
	}
}
