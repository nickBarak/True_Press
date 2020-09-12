import { queryDB } from '../../../../db';
import ArticlePreview from '../../../../components/ArticlePreview';
import Link from 'next/link';
import Footer from '../../../../components/Footer';
import { uuid } from 'uuidv4';

export async function getStaticPaths() {
	let [articles] = await queryDB(
			"SELECT articles FROM categories WHERE title = 'Labyrinth'"
		),
		/* Generates path for as many pages as needed (11 articles per page) */
		paths = new Array(Math.ceil(articles.articles.length / 11))
			.fill(true)
			.map((_, i) => ({ params: { page: String(i + 1) } }));

	return { paths, fallback: false };
}

export async function getStaticProps({ params: { page } }) {
	let [articleIDs] = await queryDB(
			"SELECT articles FROM categories WHERE title = 'Labyrinth'"
		),
		articles = await queryDB(
			`SELECT * FROM articles WHERE id = ANY($1) ORDER BY publish_date DESC OFFSET ${
				(Number(page) - 1) * 11
			} ROWS FETCH NEXT 11 ROWS ONLY`,
			[articleIDs.articles]
		);

	return {
		props: JSON.parse(
			JSON.stringify({
				articles,
				footerData: {
					page: Number(page),
					highestPage: Math.ceil(articleIDs.articles.length / 11),
					route: '/categories/labyrinth',
				},
			})
		),
	};
}

function Labyrinth({ articles, footerData }) {
	return (
		<>
			<img
				src="https://dailynexus.com/wp-content/themes/dailynexus/graphics/labyrinthmasthead.png"
				alt="labyrinth"
				style={{ width: '100%', height: '20rem', objectFit: 'fill', backgroundColor: 'beige' }}
			/>
			<div
				className="labyrinth-nav"
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					padding: '1rem 1.25rem 1.25rem 1.25rem',
					backgroundColor: 'beige',
					position: 'relative',
				}}>
				<span>
					<Link href="/">
						<a style={{ color: 'black', cursor: 'pointer' }}>
							Home
						</a>
					</Link>
				</span>
				<span>
					<Link href="https://dailynexus.com/2018-04-25/resolutions-on-the-table/">
						<a style={{ color: 'black', cursor: 'pointer' }}>
							A.S. Senate Bill Tracker
						</a>
					</Link>
					<Link href="/about">
						<a
							style={{
								color: 'black',
								marginLeft: '3rem',
								cursor: 'pointer',
							}}>
							About
						</a>
					</Link>
				</span>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<ul style={{ width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{articles.slice(0, 11).map((article, i) => (
						<li key={uuid()}>
							<ArticlePreview
								labyrinth
								article={article}
								imageLeft
							/>
						</li>
					))}
				</ul>
			</div>
			<Footer footerData={footerData} />

			<style jsx>{`
				.labyrinth-nav::before {
					content: '';
					background-color: beige;
					height: 5px;
					width: 100%;
					position: absolute;
					top: -5px;
					left: 0;
				}
			`}</style>
		</>
	);
}

export default Labyrinth;
