import { queryDB } from '../../../../../db';
import ArticleDisplay from '../../../../../components/ArticleDisplay';
import Layout from '../../../../../layouts';
import { convertToPath, convertFromPath } from '../../../../../Functions';
import { convertSubcategory } from '../../../../../data/categories';

export async function getStaticPaths() {
	let categories = await queryDB(
			"SELECT title, subcategories FROM categories WHERE title <> 'Headlines' AND title <> 'Education' AND title <> 'Politics'"
		),
		/* Generates path for all subcategories of all categories and as many pages as is needed for each subcategory (10 articles per page) */
		paths = categories
			.reduce(
				(acc, category) => [
					...acc,
					...Object.entries(
						category.subcategories
					).map(([_, val], i) =>
						new Array(Math.ceil(val.length / 10))
							.fill(true)
							.map((_, j) => ({
								params: {
									category: convertToPath(category.title),
									subcategory: convertToPath((category === 'Multimedia' ? 'media' : category.title)+'-subcat-'+(i+1)),
									page: String(j + 1),
								},
							}))
					),
				],
				[]
			)
			.reduce((acc, cur) => [...acc, ...cur], []);

	return { paths, fallback: false };
}

export async function getStaticProps({
	params: { category, subcategory, page },
}) {
	let trueSubcategory = convertSubcategory(convertFromPath(category), convertFromPath(subcategory));
	let [
			subcategories,
		] = await queryDB(
			'SELECT subcategories FROM categories WHERE title = $1',
			[convertFromPath(category)]
		),
		articles = await queryDB(
			`SELECT * FROM articles WHERE id = ANY($1) ORDER BY publish_date DESC OFFSET ${
				(Number(page) - 1) * 10
			} ROWS FETCH NEXT 10 ROWS ONLY`,
			[subcategories.subcategories[trueSubcategory]]
		);

	return {
		props: JSON.parse(
			JSON.stringify({
				heading: convertFromPath(subcategory),
				articles,
				footerData: {
					page: Number(page),
					route: '/categories/' + category + '/' + subcategory,
					highestPage: Math.ceil(
						subcategories.subcategories[
							trueSubcategory
						].length / 10
					),
				},
			})
		),
	};
}

/* Very similar to /categories/[category]/[subcategory] and /authors/[id] routes */
/* Shows previews for all articles in a subcategory by most recent (10 per page) */
function Subcategory({ heading, articles, footerData }) {
	return (
		<Layout footerData={footerData}>
			<ArticleDisplay
				type={'subcategory'}
				heading={heading}
				articles={articles}
				page={footerData.page}
			/>
		</Layout>
	);
}

export default Subcategory;
