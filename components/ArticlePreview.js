import Link from 'next/link';
import { convertDate, formatSentence } from '../Functions';
import lipsum from '../data/lipsum';
import faultyPicsumIDs from '../data/faultyPicsumIDs';

/* Displays image on variable side */
function ArticlePreview({ article, imageLeft, labyrinth }) {
	return (
		<>
			<div className="article-preview">
				{imageLeft && (
					<span className="picture-container-5px">
						<picture>
							<source srcSet={!faultyPicsumIDs.includes(article.id % 1000)
									? `https://picsum.photos/id/${article.id % 1000}/200`
									: `/img/true-press-logo-1.png`
								} />
							<source
								srcSet="/img/true-press-logo-1.png"
								type="image/png"
							/>
							<Link href={`/articles/${article.id}`}>
								<img alt="thumbnail" />
							</Link>
						</picture>
					</span>
				)}
				<div className="article-preview-words">
					<div>
						<Link href={`/articles/${article.id}`}>
							<a
								className={`article-preview-title${
									labyrinth ? ' labyrinth-title' : ''
								}`}>
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
					<div>
						{formatSentence(lipsum.slice(article.author.id % 800, article.author.id % 800 + article.description.length))}
					</div>
					<Link href={`/articles/${article.id}`}>
						<a className="read-more">read more</a>
					</Link>
				</div>
				{!imageLeft && (
					<span className="picture-container-5px">
						<picture>
							<source srcSet={!faultyPicsumIDs.includes(article.id % 1000)
									? `https://picsum.photos/id/${article.id % 1000}/200`
									: `/img/true-press-logo-1.png`
								} />
							<source
								srcSet="/img/true-press-logo-1.png"
								type="image/png"
							/>
							<Link href={`/articles/${article.id}`}>
								<img alt="thumbnail" />
							</Link>
						</picture>
					</span>
				)}
			</div>

			<div className="article-preview-mobile">
				<span className="picture-container">
					<picture>
						<source srcSet={!faultyPicsumIDs.includes(article.id % 1000)
										? `https://picsum.photos/id/${article.id % 1000}/200`
										: `/img/true-press-logo-1.png`
									} />
						<source
							srcSet="/img/true-press-logo-1.png"
							type="image/png"
						/>
						<Link href={`/articles/${article.id}`}>
							<img alt="thumbnail" style={{ maxWidth: '100%' }} />
						</Link>
					</picture>
				</span>
				<div className="article-preview-words">
					<div>
						<Link href={`/articles/${article.id}`}>
							<a
								className={`article-preview-title${
									labyrinth ? ' labyrinth-title' : ''
								}`}>
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
					{/* <div>{article.description}</div>
					<Link href={`/articles/${article.id}`}>
						<a className="read-more">read more</a>
					</Link> */}
				</div>
			</div>

			{/* Labyrinth has slightly different formatting (thinner and always with image to left) */}
			<style jsx>{`
				.article-preview {
					margin: 2.5rem 0;
					padding: .9rem;
					justify-content: flex-end;
					position: relative;
					background: linear-gradient(${!imageLeft ? 'to right' : 'to left'}, #161616, #222);
				}

				.article-preview-mobile {
					margin: 2.5rem 0;
					position: relative;
					flex-direction: column;
					align-items: center;
				}

				.article-preview-mobile .article-preview-words {
					margin-top: 0.4rem;
					margin-left: 0;
				}

				.article-preview-mobile::after {
					content: '';
					width: 100%;
					height: 2px;
					background-color: #111;
					position: absolute;
					bottom: -0.65rem;
					left: 0;
				}

				.article-preview::after {
					content: '';
					position: absolute;
					background-color: var(--theme-gold);
					height: 2px;
					width: 87.5%;
					bottom: -1.25rem;
					left: ${imageLeft ? 0 : '12.5%'};
				}

				.article-preview-words {
					display: flex;
					flex-direction: column;
					margin: 0 0.75rem;
					width: ${labyrinth ? '100%' : '80%'};
				}

				.article-prevew .artilce-preview-words {
					${imageLeft ? '' : 'align-items: flex-end'};
				}

				.article-preview-title {
					color: white;
					font-weight: 600;
				}

				.article-preview-author {
					color: #222;
					font-style: italic;
				}

				a:hover {
					color: var(--link-hover);
				}

				img {
					cursor: pointer;
					transition: transform 100ms ease-out;
				}

				.article-preview img:hover {
					transform: scale(1.2);
				}

				.date-and-author, .article-preview-author {
					color: darkgray;
				}
			`}</style>
		</>
	);
}

export default ArticlePreview;
