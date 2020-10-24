import Link from 'next/link';
import { convertDate, formatSentence } from '../Functions';
import { uuid } from 'uuidv4';
import lipsum from '../data/lipsum';

function Related({ articles }) {
	return (
		<>
			<div className="related">
				<div>
					<span>Related</span>
				</div>
				<ul>
					{articles.map((article, i) => (
						<li key={uuid()}>
							<Link href={`/articles/${article.id}`}>
								<a onclick="setTimeout(() => window.location.reload(), 250);">{formatSentence(lipsum.slice(article.id % 800, article.id % 800 + article.title.length))}</a>
							</Link>
							<div>{convertDate(article.publish_date)}</div>
							<div>In "{article.category}"</div>
						</li>
					))}
				</ul>
			</div>

			<style jsx>{`
				.related {
					margin: 3rem 0;
				}

				.related > div:nth-child(1) {
					margin-bottom: 0.8rem;
				}

				.related > div:nth-child(1) > span {
					position: relative;
					font-size: 0.8rem;
					font-weight: 600;
				}

				.related > div:nth-child(1) > span::before {
					content: '';
					background-color: lightgray;
					height: 1px;
					position: absolute;
					width: 100%;
					top: -80%;
				}

				ul {
					display: flex;
				}

				li {
					display: flex;
					flex-direction: column;
					width: 25%;
					margin-right: 1.75rem;
				}

				li > div {
					color: darkgray;
					font-family: Georgia, serif;
					margin-bottom: 0 0.15rem;
					font-size: 0.9rem;
				}

				a {
					color: var(--link-hover);
					font-family: Georgia, serif;
					margin-bottom: 0.25rem;
					font-size: 0.965rem;
				}

				a:hover {
					text-decoration: underline;
				}
			`}</style>
		</>
	);
}

export default Related;
