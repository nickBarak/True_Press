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
                    LOWER(content) LIKE LOWER('% ${req.query.value} %')`

		);
		const authorArticleIDs = await queryDB(
			`SELECT articles FROM authors
			WHERE
				LOWER(name) LIKE LOWER('% ${req.query.value} %')
				OR LOWER(name) LIKE LOWER('${req.query.value} %')
				OR LOWER(name) LIKE LOWER('% ${req.query.value}')`
		);
		const authorResults = await queryDB(
            `SELECT
                id,
                title,
                category,
                subcategory,
                publish_date,
                description,
                content,
                author
            FROM articles
            WHERE id = ANY($1)`,
			[authorArticleIDs.reduce((acc, cur) => [...acc, ...cur.articles], [])]
		);
		res.json(
			results
				? authorResults
					? [...results, ...authorResults]
					: results
				: authorResults
				? authorResults
				: []
		);
	} catch (e) {
		console.log(e);
	}
}