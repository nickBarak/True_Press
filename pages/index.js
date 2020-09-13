import Headlines from '../components/Headlines';
import CategoryPreview from '../components/CategoryPreview';
import { queryDB } from '../db';
import Layout from '../layouts';
import { uuid } from 'uuidv4';

function App({ categories, headlines }) {

	return (
		<>
			<Layout>
				<div className="home">
					<Headlines articles={headlines} />
					<div className="home-by-category"
						style={{
							fontSize: '1.5rem',
							fontWeight: 'bold',
						}}>
						By Category
					</div>
					<ul className="home-category-previews">
						{categories.map((category, i) =>
						<li key={uuid()} style={{
							[i % 2 ? 'marginRight' : 'marginLeft']: '1.75rem',
							border: '2px solid #eee',
							borderTop: 'none',
							background: 'linear-gradient(to right, #363636, #515151)'
						}}>
							<CategoryPreview category={category} />
						</li>
						)}
					</ul>
				</div>
			</Layout>
			<style jsx global>{`
				.home-category-previews {
					display: grid;
					row-gap: 4rem;
					column-gap: 3rem;
				}
			`}</style>
		</>
	);
}

export async function getStaticProps() {
	let [headlineIDs] = await queryDB(
			"SELECT articles FROM categories WHERE title = 'Headlines'"
		),
		headlines = await queryDB('SELECT * FROM articles WHERE id = ANY($1)', [
			headlineIDs.articles,
		]);

	let categories = [
			'Artsweek',
			'Multimedia',
			'News',
			'Nexustentialism',
			'On the Menu',
			'Opinion',
			'Science & Tech',
			'Sports',
		],
		articles;
	for (let i = 0; i < categories.length; i++) {
		articles = await queryDB(
			`SELECT * FROM articles WHERE category = '${categories[i]}' ORDER BY publish_date DESC FETCH FIRST 3 ROWS ONLY`
		);

		categories.splice(i, 1, {
			title: categories[i],
			articles
		});
	}

	return { props: JSON.parse(JSON.stringify({ categories, headlines })) };
}

export default App;
