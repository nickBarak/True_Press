import { queryDB } from '../../../../db';
import ArticleDisplay from '../../../../components/ArticleDisplay';
import Layout from '../../../../layouts';

export async function getStaticPaths() {
	let authors = await queryDB('SELECT id, articles FROM authors'),
		paths = authors.reduce(
			(acc, { id, articles }) => [
				...acc,
				...new Array(Math.ceil(articles.length / 15))
					.fill(true)
					.map((_, i) => ({
						params: { id: String(id), page: String(i + 1) },
					})),
			],
			[]
		);

	return { paths, fallback: false };
}

export async function getStaticProps({ params: { id, page } }) {
	let [author] = await queryDB('SELECT * FROM authors WHERE id = $1', [id]),
		articles = await queryDB(
			`SELECT * FROM articles WHERE author = $1 ORDER BY publish_date DESC OFFSET ${
				(Number(page) - 1) * 15
			} ROWS FETCH NEXT 15 ROWS ONLY`,
			[JSON.stringify({ id: Number(id), name: author.name })]
		);

	return {
		props: JSON.parse(
			JSON.stringify({
				author: `Sample Author ${author.id}`,
				articles,
				footerData: {
					page: Number(page),
					highestPage: Math.ceil(author.articles.length / 15),
					route: '/authors/' + id,
				},
			})
		),
	};
}

/* Very similar to /categories/[category] and /categories/[category]/[subcategory] routes */
function Author({ author, articles, footerData }) {
	return (
		<Layout footerData={footerData}>
			<ArticleDisplay
				type="author-page"
				heading={author}
				articles={articles}
			/>
		</Layout>
	);
}

export default Author;
