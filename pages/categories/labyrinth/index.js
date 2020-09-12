import { queryDB } from '../../../db';
import ArticlePreview from '../../../components/ArticlePreview';
import Link from 'next/link';
import Footer from '../../../components/Footer';
import { uuid } from 'uuidv4';

export async function getStaticProps() {
	let [articleIDs] = await queryDB(
			"SELECT articles FROM categories WHERE title = 'Labyrinth'"
		),
		articles = await queryDB(
			'SELECT * FROM articles WHERE id = ANY($1) ORDER BY publish_date DESC FETCH FIRST 11 ROWS ONLY',
			[articleIDs.articles]
		);

	return {
		props: JSON.parse(
			JSON.stringify({
				articles,
				footerData: {
					page: 1,
					highestPage: Math.ceil(articleIDs.articles.length / 11),
					route: '/categories/labyrinth',
				},
			})
		),
	};
}

/* Differs from other categories (no layout, unique header and nav, custom article display, 11 articles per page) */
function Labyrinth({ articles, footerData }) {
	return (
		<>
			{/* <img
				className="labyrinth-logo"
				src="https://dailynexus.com/wp-content/themes/dailynexus/graphics/labyrinthmasthead.png"
				alt="labyrinth"
				style={{ width: '100%', height: '20rem', objectFit: 'fill', backgroundColor: 'beige', position: 'relative' }}
			/> */}
			<div style={{ width: '100%', height: '20rem', backgroundColor: 'beige', fontSize: '2.3rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<span style={{ fontFamily: 'Times New Roman, serif', color: '#393939', textAlign: 'center', height: 'auto', pointerEvents: 'none' }}>THE LABYRINTH</span>
			</div>
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
					<span style={{ color: 'black', cursor: 'pointer' }} onClick={_=> alert('Image being taken to the Associated Students Senate page of bills')}>
						A.S. Senate Bill Tracker
					</span>
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

				.labyrinth-logo::after {
					content: 'The Labyrinth';
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					background-color: beige;
					z-index: 2;
				}
			`}</style>
		</>
	);
}

export default Labyrinth;
