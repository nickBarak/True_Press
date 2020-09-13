import Link from 'next/link';
import AboutTheAuthor from '../../components/AboutTheAuthor';
import Related from '../../components/Related';
import CommentSection from '../../components/CommentSection';
import { convertDate, formatSentence } from '../../Functions';
import { queryDB } from '../../db';
import Layout from '../../layouts';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import lipsum from '../../data/lipsum';
import faultyPicsumIDs from '../../data/faultyPicsumIDs';

function Article({ article, author, related }) {
	const router = useRouter();
	if (router.isFallback)
		return <div>Loading page...</div>

	const imgID = useRef(0);
	const lipsumCount = useRef(0);

	/* Content styles must be added after render as article.content includes the HTML */
	useEffect(_ => {
		let contentDiv = document.getElementsByClassName(
			'single-post-content'
		)[0];

		function lipsumify(node) {
			if (node.hasChildNodes()) node.childNodes.forEach(lipsumify);
			else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 1 && node.textContent.trim() !== 'Share this:') {
				node.textContent = !/[\. ,]/.exec(lipsum[lipsumCount.current])
					? lipsum.slice(lipsumCount.current, lipsumCount.current += node.textContent.trim().length)
					: !/[\. ,]/.exec(lipsum[lipsumCount.current+1])
						? lipsum.slice(lipsumCount.current+1, lipsumCount.current += node.textContent.trim().length+1)
						: lipsum.slice(lipsumCount.current+2, lipsumCount.current += node.textContent.trim().length+2);
			} else if (node.textContent.trim() === 'Share this:' && node.parentElement) node.parentElement.style.marginTop = '.75rem';
		}
		lipsumify(contentDiv);
		
		[
			...contentDiv.getElementsByTagName('p'),
			...contentDiv.getElementsByTagName('span'),
		].forEach(p => {
			p.style.margin = '1rem 0';
			p.style.fontFamily = 'Lato';
			p.style.fontSize = '1.225rem';
			p.style.lineHeight = '150%';
			// p.style.textAlign = 'justify';
		});

		/* hide unwanted content */
		[
			document.getElementById('jp-relatedposts'),
			document.getElementsByClassName('saboxplugin-wrap')[0],
			document.getElementsByClassName('h5ab-print-button-container')[0],
		].forEach(el => {
			if (el) el.style.display = 'none';
		});

		/* Attempt to make any image collections look decent */
		document.getElementsByClassName(
			'single-post-content'
		)[0].style.fontFamily = 'Lato';
		document.getElementsByClassName(
			'single-post-content'
		)[0].style.textAlign = 'justify';
		[...document.getElementsByClassName('gallery-row')].forEach(gallery => {
			gallery.style.display = 'grid';
			gallery.style.gridTemplateColumns = 'repeat(3, 1fr)';
		});
		[...document.getElementsByClassName('tiled-gallery-caption')].forEach(
			caption => {
				caption.style.backgroundColor = 'rgb(230, 230, 230, .95)';
				caption.style.fontSize = '.75rem';
				caption.style.width = '100%';
				caption.style.padding = '.5rem';
				caption.style.position = 'absolute';
				caption.style.bottom = `3px`;
			}
		);
		[...document.getElementsByClassName('tiled-gallery-item')].forEach(
			item => {
				item.style.position = 'relative';
				item.children[1].style.transform = 'scaleY(0)';
				item.children[1].style.transition =
					'transform 190ms ease-in-out';
				item.children[1].style.transformOrigin = 'bottom';
				item.addEventListener('mouseover', e => {
					e.currentTarget.children[1].style.transform = 'scaleY(1)';
				});
				item.addEventListener('mouseout', e => {
					e.currentTarget.children[1].style.transform = 'scaleY(0)';
				});
			}
		);

		[...document.getElementsByClassName('sd-content')[0].children].forEach(
			ul => {
				ul.style.display = 'flex';
				ul.style.justifyContent = 'space-between';
				ul.style.width = '10rem';
				ul.style.marginTop = '.5rem';
			}
		);

		[...contentDiv.getElementsByTagName('img')].forEach(img => {
			let over1000 = ((article.id % 1000) + imgID.current) > 1000 ? 1 : -1;
			let photoID = (article.id % 1000) + imgID.current++ * over1000;
			img.srcset = !faultyPicsumIDs.includes(photoID)
				? `https://picsum.photos/id/${photoID}/200/300`
				: `https://picsum.photos/200/300`;
			img.style.objectFit = 'cover';
			img.style.border = '5px solid #828282'
		});
		[
			document.getElementsByClassName('article-page-content')[0],
			contentDiv,
			...contentDiv.getElementsByClassName('wp-caption'),
			...contentDiv.getElementsByTagName('a'),
			...contentDiv.getElementsByTagName('img'),
		].forEach(el => {
			el.style.maxWidth = '100%';
			if (el.tagName === 'a') alert(el.tagName);
		});
		[...document.getElementsByClassName('share-icon')].forEach(icon => {
			let [site] = [...icon.classList].filter(
					className =>
						className.startsWith('share-') &&
						className.slice(
							className.length - 5,
							className.length
						) !== '-icon'
				),
				el = document.createElement('i'),
				bgColor;
			site = site.split('-')[1];
			el.classList.add('fa');
			el.classList.add(`fa-${site}`);
			el.style.color = 'white';
			el.style.borderRadius = '50%';
			el.style.width = el.style.height = '2rem';
			el.style.display = 'flex';
			el.style.justifyContent = el.style.alignItems = 'center';
			el.style.cursor = 'pointer';
			switch (site) {
				default:
					break;
				case 'facebook':
					bgColor = 'rgba(24, 119, 242, 1)';
					break;
				case 'twitter':
					bgColor = 'rgba(0, 172, 238, 1)';
					break;
				case 'tumblr':
					bgColor = 'rgba(44, 71, 98, 1)';
					break;
				case 'reddit':
					bgColor = 'rgba(255, 0, 0, 1)';
					break;
			}
			el.style.backgroundColor = bgColor;
			el.addEventListener('mouseover', e => {
				e.target.style.backgroundColor =
					bgColor.slice(0, bgColor.length - 2) + '.75)';
			});
			el.addEventListener('mouseout', e => {
				e.target.style.backgroundColor = bgColor;
			});
			el.addEventListener('click', _ =>
				alert(
					`Imagine ${
						site[0].toUpperCase() + site.slice(1)
					} popping up`
				)
			);
			icon.replaceWith(el);
		});
	}, []);

	return (
		<>
			<Layout>
				<div className="article">
					<div className="article-page-subcategory">
						{article.subcategory}
					</div>
					<div className="article-page-details">
						<div className="article-page-title">
						{formatSentence(lipsum.slice(article.id % 800, article.id % 800 + article.title.length))}
						</div>
						<div>
							{(_ => {
								let date = new Date(article.publish_date);
								let at =
									date.getHours() === 0
										? ''
										: ` at ${date.getHours()}:${
												String(date.getMinutes())
													.length === 1
													? '0'
													: '' + date.getMinutes()
										  }${
												date.getHours() < 12
													? date.getHours() + ' am'
													: 24 -
													  date.getHours() +
													  ' pm'
										  }`;
								return convertDate(article.publish_date) + at;
							})()}{' '}
							by{' '}
							<Link href={`/authors/${author.id}`}>
								<a className="article-page-author-name">
									{`Sample Author ${author.id}`}
								</a>
							</Link>
						</div>
					</div>
					<div
						className="article-page-content"
						dangerouslySetInnerHTML={{ __html: article.content }}
					/>

					<AboutTheAuthor author={author} />
					<Related articles={related} />
					<CommentSection
						articleID={article.id}
						articleTitle={article.title}
					/>
				</div>
			</Layout>
		</>
	);
}

export async function getStaticPaths() {
	/* Pre-rendering all pages would exceed maximum bundle size for Heroku */
	let ids = await queryDB('SELECT id FROM articles ORDER BY publish_date'),
		paths = ids.slice(8080, ids.length).map(id => ({ params: { id: String(id.id) } }));

	return { paths, fallback: true };
}

export async function getStaticProps({ params: { id } }) {
	let [article] = await queryDB('SELECT * FROM articles WHERE id = $1', [id]),
		related = await queryDB('SELECT * FROM articles WHERE id = ANY($1)', [
			article.related,
		]),
		[author] = await queryDB('SELECT * FROM authors WHERE name = $1', [
			article.author.name,
		]);
	return { props: JSON.parse(JSON.stringify({ article, author, related })) };
}

export default Article;
