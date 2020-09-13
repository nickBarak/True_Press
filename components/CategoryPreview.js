import Link from 'next/link';
import { convertDate, convertToPath, formatSentence } from '../Functions';
import { uuid } from 'uuidv4';
import lipsum from '../data/lipsum';
import faultyPicsumIDs from '../data/faultyPicsumIDs';

/* Displays 3 most recent articles in category */
function CategoryPreview({ category: { title, articles } }) {
	return (
		<div className="category-preview">
			<Link href={`/categories/${convertToPath(title)}`}>
				<label>{title}</label>
			</Link>
			<ul>
				{articles.map((article, i) => (
					<li key={uuid()}>
						<div style={{ fontWeight: 600, fontSize: '1.2rem' }}>
							<Link href={`/articles/${article.id}`}>
								<a className="article-preview-title">
								{formatSentence(lipsum.slice(article.id % 800, article.id % 800 + article.title.length))}
								</a>
							</Link>
						</div>
						<div className="date-and-author">
							{convertDate(article.publish_date)} by{' '}
							<Link href={`/authors/${article.author.id}`}>
								<a className="article-preview-author">
									{`Sample Author ${article.author.id}`}
								</a>
							</Link>
						</div>
						<div className="category-preview-details">
							<div style={{ display: 'flex' }}>
								<span
									className="category-preview-img picture-container"
									style={{ marginRight: '.25rem' }}>
									<picture>
										<source
											srcSet={!faultyPicsumIDs.includes(article.id % 1000)
												? `https://picsum.photos/id/${article.id % 1000}/200`
												: `/img/nexus-logo.png`
											}
										/>
										<source
											srcSet="/img/nexus-logo.png"
											type="image/png"
										/>
										<Link href={`/articles/${article.id}`}>
											<img
												className="category-preview-img"
												alt="thumbnail"
											/>
										</Link>
									</picture>
								</span>
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										marginLeft: '.4rem',
										fontSize: '.9rem',
									}}>
									<span>
									{formatSentence(lipsum.slice(article.id % 800, article.id % 800 + article.description.length))}
									</span>
									<Link href={`/articles/${article.id}`}>
										<a className="read-more">read more</a>
									</Link>
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
			<style jsx>{`
				ul {
					display: flex;
					flex-direction: column;
					position: relative;
				}


				${/* right-side soft-border */ ''}


				li {
					padding: 1rem;
					position: relative;
				}

				li:nth-child(1)::after,
				li:nth-child(2)::after {
					position: absolute;
					content: '';
					height: 2px;
					width: 100%;
					left: 0;
					bottom: -.2rem;
					background-color: #ddd;
				}

				label {
					position: relative;
					font-size: 1.75rem;
					padding: 5px 0 5px 1.5rem;
					display: block;
					font-weight: 600;
					cursor: pointer;
					z-index: 2;
					background: linear-gradient(to bottom, #242424, #333);
					box-shadow: 0px 2px 4px #282828;
					width: calc(100% + .9rem);
					transform: translateX(-.45rem);
				}

				

				.article-preview-title {
					color: white;
				}

				.date-and-author,
				.article-preview-author {
					color: #050505;
				}
				.article-preview-author {
					font-style: italic;
				}

				a:hover {
					color: var(--link-hover);
				}

				img {
					cursor: pointer;
					transition: transform 100ms ease-out;
				}

				img:hover {
					transform: scale(1.175);
				}
			`}</style>
		</div>
	);
}

export default CategoryPreview;
