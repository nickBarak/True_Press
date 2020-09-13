import Link from 'next/link';
import lipsum from '../data/lipsum';
import { formatSentence } from '../Functions';

function AboutTheAuthor({ author }) {
	return (
		<div className="about-the-author">
			<picture>
				<source srcSet={'/img/true-press-logo-1.png'} />
				<source srcSet="/img/true-press-logo.jpg" />
				<Link href={'/authors/' + author.id}>
					<img style={{ borderRadius: '6px' }} alt="author" />
				</Link>
			</picture>
			<div>
				<div>
					<Link href={`/authors/${author.id}`}>
						<a>{`Sample Author ${author.id}`}</a>
					</Link>
				</div>
				<div>
					{(author.biography === 'Not available' || !author.biography)
						? 'Biography not available'
						: formatSentence(lipsum.slice(author.id % 800, author.biography.length))
					}
				</div>
			</div>
			<style jsx>{`
				.about-the-author {
					display: flex;
					margin: 2rem 0;
				}

				picture {
					margin-right: 1.25rem;
					min-width: 6.5rem;
				}

				img {
					object-fit: contain;
					height: 6.5rem;
					cursor: pointer;
					border: none;
				}

				.about-the-author > div {
					display: flex;
					flex-direction: column;
				}

				.about-the-author > div > div:nth-child(1) {
					font-size: 1.2rem;
					margin-bottom: 0.5rem;
				}

				.about-the-author > div > div:nth-child(2) {
					font-size: 0.95rem;
				}

				a {
					color: var(--link-hover);
				}
			`}</style>
		</div>
	);
}

export default AboutTheAuthor;
