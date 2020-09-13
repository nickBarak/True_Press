import { queryDB } from '../../db';
import ArticleDisplay from '../../components/ArticleDisplay';
import Layout from '../../layouts';

export async function getStaticPaths() {
	let ids = await queryDB('SELECT id FROM authors'),
		paths = ids.map(id => ({ params: { id: String(id.id) } }));

	return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
	let [author] = await queryDB('SELECT * FROM authors WHERE id = $1', [id]),
		articles = await queryDB(
			'SELECT * FROM articles WHERE author = $1 ORDER BY publish_date DESC FETCH FIRST 10 ROWS ONLY',
			[JSON.stringify({ id: Number(id), name: author.name })]
		);

	return {
		props: JSON.parse(
			JSON.stringify({
				author: `Sample Author ${author.id}`,
				articles,
				footerData: {
					page: 1,
					highestPage: Math.ceil(author.articles.length / 10),
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
