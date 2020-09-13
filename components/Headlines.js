import Link from 'next/link';
import { convertDate, formatSentence } from '../Functions';
import { uuid } from 'uuidv4';
import lipsum from '../data/lipsum';
import faultyPicsumIDs from '../data/faultyPicsumIDs';

/* Displays 4 articles, first is emphasized */
function Headlines({ articles }) {
	return (
		<>
			<div className="headlines">
				<ul>
					<li key={uuid()} style={{ width: '50%' }}>
						<Link href={`/articles/${articles[0].id}`}>
							<img
								style={{ border: '5px solid #828282', marginBottom: '2px' }}
								src={!faultyPicsumIDs.includes(articles[0].id % 1000)
									? `https://picsum.photos/id/${articles[0].id % 1000}/450/300`
									: `/img/true-press-logo-1.png`
								}
								alt="headline"
							/>
						</Link>
						<div className="category-and-date">
							<span className="article-preview-category">
								{articles[0].category} |
							</span>{' '}
							{convertDate(articles[0].publish_date)}
						</div>
						<Link href={`/articles/${articles[0].id}`}>
							<a className="article-preview-title">
							{formatSentence(lipsum.slice(articles[0].id % 800, articles[0].id % 800 + articles[0].title.length))}
							</a>
						</Link>
						<div className="date-and-author">
							by{' '}
							<Link href={`/authors/${articles[0].author.id}`}>
								<a className="article-preview-author">
									{`Sample Author ${articles[0].author.id}`}
								</a>
							</Link>
						</div>
						<div className="article-preview-description">
							{lipsum.slice(0, articles[0].description.length)}
						</div>
						<Link href={`/articles/${articles[0].id}`}>
							<a className="read-more">read more</a>
						</Link>
					</li>
					<li key={uuid()} style={{ width: '50%' }}>
						<ul>
							{articles.slice(1, 4).map((article, i) => (
								<li key={uuid()}>
									<div>
										<span className="article-preview-category">
											{article.category} |
										</span>{' '}
										{convertDate(article.publish_date)}
									</div>
									<Link href={`/articles/${article.id}`}>
										<a className="article-preview-title">
										{formatSentence(lipsum.slice(article.id % 800, article.id % 800 + article.title.length))}
										</a>
									</Link>
									<div className="date-and-author">
										by{' '}
										<Link
											href={`/authors/${article.author.id}`}>
											<a className="article-preview-author">
												{`Sample Author ${article.author.id}`}
											</a>
										</Link>
									</div>
									<div className="article-preview-description">
										{lipsum.slice(article.id % 800, article.id % 800 + article.description.length)}
									</div>
									<Link href={`/articles/${articles[0].id}`}>
										<a className="read-more">read more</a>
									</Link>
								</li>
							))}
						</ul>
					</li>
				</ul>
			</div>

			<div className="headlines-mobile">
				<ul>
					<li key={uuid()}>
						<Link href={`/articles/${articles[0].id}`}>
							<img
								src={!faultyPicsumIDs.includes(articles[0].id % 1000)
									? `https://picsum.photos/id/${articles[0].id % 1000}/200`
									: `/img/true-press-logo-1.png`
								}
								alt="headline"
								style={{ width: '99%', marginBottom: '.5rem', border: '4px solid #828282' }}
							/>
						</Link>
						<Link href={`/articles/${articles[0].id}`}>
							<a className="article-preview-title">
							{formatSentence(lipsum.slice(articles[0].id % 800, articles[0].id % 800 + articles[0].title.length))}
							</a>
						</Link>
						<div className="date-and-author">
							{convertDate(articles[0].publish_date)} by{' '}
							<Link href={`/authors/${articles[0].author.id}`}>
								<a className="article-preview-author">
									{`Sample Author ${articles[0].author.id}`}
								</a>
							</Link>
						</div>
						<div className="article-preview-description">
							{lipsum.slice(0, articles[0].description)}
						</div>
						<Link href={`/articles/${articles[0].id}`}>
							<a className="read-more">read more</a>
						</Link>
					</li>
					{articles.slice(1, 4).map((article, i) => (
						<li key={uuid()}>
							<Link href={`/articles/${article.id}`}>
								<a className="article-preview-title">
								{formatSentence(lipsum.slice(article.id % 800, article.id % 800 + article.title.length))}
								</a>
							</Link>
							<div className="date-and-author">
								{convertDate(article.publish_date)} by{' '}
								<Link
									href={`/authors/${article.author.id}`}>
									<a className="article-preview-author">
										{`Sample Author ${article.author.id}`}
									</a>
								</Link>
							</div>
							<div className="category-preview-details">
								<div className="article-preview-description">
									{lipsum.slice(0, article.description.length)}
								</div>
								<Link href={`/articles/${article.id}`}>
									<a className="read-more">read more</a>
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>

			<style jsx>{`
				.headlines, .headlines-mobile {
					background-color: #232323;
					margin-bottom: 1.25rem;
					padding: .25rem 1rem .0 1rem;
				}

				ul {
					display: flex;
				}

				li ul,
				.headlines-mobile ul {
					flex-direction: column;
				}

				li {
					margin: 0.5rem;
					position: relative;
					font-size: 0.9rem;
				}

				li div:nth-child(1) {
					margin-bottom: 3px;
				}

				li ul li:nth-child(1)::before,
				li ul li:nth-child(2)::before,
				.headlines-mobile ul li:nth-child(1)::before,
				.headlines-mobile ul li:nth-child(2)::before,
				.headlines-mobile ul li:nth-child(3)::before {
				content: '';
					height: 1px;
					width: 99%;
					left: 0;
					bottom: -0.5rem;
					background-color: #ddd;
					position: absolute;
				}

				.category-and-date {
					margin-top: 5px;
					margin-bottom: 3px;
				}

				.article-preview-title {
					font-weight: bold;
					font-size: 1.275rem;
				}

				.headlines .article-preview-title:hover {
					color: var(--theme-gold);
				}

				.article-preview-author:hover {
					color: var(--link-hover);
				}

				.article-preview-author {
					color: darkgray;
					font-style: italic;
				}

				.article-preview-category {
					font-weight: bold;
					font-size: 14px;
					text-transform: uppercase;
				}

				.date-and-author {
					color: darkgray;
					margin-top: 2px;
					margin-bottom: 7px;
				}

				.article-preview-description {
					margin-bottom: 2px;
				}

				ul li:nth-child(1) {
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
				}

				.read-more {
					color: gray;
				}
			`}</style>
		</>
	);
}

export default Headlines;
