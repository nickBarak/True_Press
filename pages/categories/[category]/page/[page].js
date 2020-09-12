import { queryDB } from '../../../../db';
import ArticleDisplay from '../../../../components/ArticleDisplay';
import Layout from '../../../../layouts';
import { convertToPath, convertFromPath } from '../../../../Functions';

export async function getStaticPaths() {
	let categories = await queryDB(
			"SELECT title, articles FROM categories WHERE title <> 'Labyrinth' AND title <> 'Headlines'"
		),
		/* Generates path for as many pages as needed (15 articles per page) */
		paths = categories.map(({ title, articles }) =>
			new Array(Math.ceil(articles.length / 15))
				.fill(true)
				.map((_, i) => ({
					params: {
						category: convertToPath(title),
						page: String(i + 1),
					},
				}))
		);
	paths = paths.reduce((acc, cur) => [...cur, ...acc], []);

	return { paths, fallback: false };
}

export async function getStaticProps({ params: { category, page } }) {
	let [
			articleIDs,
		] = await queryDB('SELECT articles FROM categories WHERE title = $1', [
			convertFromPath(category),
		]),
		articles = await queryDB(
			`SELECT * FROM articles WHERE id = ANY($1) ORDER BY publish_date DESC OFFSET ${
				(Number(page) - 1) * 15
			} ROWS FETCH NEXT 15 ROWS ONLY`,
			[articleIDs.articles]
		);

	return {
		props: JSON.parse(
			JSON.stringify({
				heading: convertFromPath(category),
				articles,
				footerData: {
					route: '/categories/' + category,
					page: Number(page),
					highestPage: Math.ceil(articleIDs.articles.length / 15),
				},
			})
		),
	};
}

/* Very similar to /categories/[category]/[subcategory] and /authors/[id] routes */
/* Shows previews for all articles in a category by most recent (15 per page) */
function Category({ heading, articles, footerData }) {
	return (
		<Layout footerData={footerData}>
			<ArticleDisplay
				type="category"
				heading={heading}
				articles={articles}
				page={footerData.page}
			/>
		</Layout>
	);
}

export default Category;
