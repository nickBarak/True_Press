import Link from 'next/link';
import { convertToPath, convertDate, formatSentence } from '../Functions';
import 'isomorphic-unfetch';
import { useState, useEffect, useRef } from 'react';
import { client } from '../URLs';
import { uuid } from 'uuidv4';
import categories from '../data/categories';
import faultyPicsumIDs from '../data/faultyPicsumIDs';
import lipsum from '../data/lipsum';

function Nav() {
	const [searchResults, setSearchResults] = useState([[], []]);
	const [searchError, setSearchError] = useState(null);
	const [queryTime, setQueryTime] = useState(0);
	const [sortBy, setSortBy] = useState(0);
	const [loadingSearchResults, setLoadingSearchResults] = useState(false);
	const [modalPage, setModalPage] = useState(1);
	const [modalPageSet, setModalPageSet] = useState(0);
	const timeouts = useRef({});

	useEffect(_ => {
		[...document.getElementsByClassName('nav-link-mobile')].forEach(
			link => {
				link.addEventListener('click', showSubcategories);
			}
		);
		document
			.getElementsByClassName('search')[0]
			.addEventListener('mouseover', e => {
				e.target.style.color = 'var(--link-hover)';
			});
		document
			.getElementsByClassName('search')[0]
			.addEventListener('mouseout', setColorToBlack);
	}, []);

	const setColorToBlack = e => {
		e.target.style.color = 'black';
	};

	function showSubcategories(e) {
		e.currentTarget.style.color = 'var(--link-hover)';
		timeouts.current[e.currentTarget.name] &&
			clearTimeout(timeouts.current[e.currentTarget.name]);
		let { style } = e.currentTarget.parentElement.children[2];
		style.opacity = 1;
		style.pointerEvents = 'auto';
		if (e.currentTarget.className.split(' ').includes('nav-link-mobile')) {
			e.currentTarget.removeEventListener('mouseout', setColorToBlack);
			e.currentTarget.removeEventListener('click', showSubcategories);
			e.currentTarget.addEventListener('click', hideSubcategories);
		}
	}

	function hideSubcategories(e) {
		e.currentTarget.style.color = 'black';
		let { style } = e.currentTarget.parentElement.children[2];
		timeouts.current[e.currentTarget.name] = setTimeout(_ => {
			style.opacity = 0;
			style.pointerEvents = 'none';
		}, 0);
		if (e.currentTarget.className.split(' ').includes('nav-link-mobile')) {
			e.currentTarget.addEventListener('mouseout', setColorToBlack);
			e.currentTarget.removeEventListener('click', hideSubcategories);
			e.currentTarget.addEventListener('click', showSubcategories);
		}
	}

	return (
		<div>
			<ul className="nav">
				{[
					...categories,
					/* About subcategories don't convert to appropriate path so path is provided here */
					{
						title: 'About',
						subcategories: [
							{ Advertising: 'advertising' },
							{ Donate: 'donate' },
							{ FAQ: 'faq' },
							{ 'Legal Notices': 'legal-notices' },
							{ 'Staff/Contact': 'staff-contact' },
						],
					},
				].map((category, i) => (
					<li key={uuid()}>
						{category.subcategories ? (
							<>
								{/* Show subcategory list on hover over nav item. Timeouts used as mechanism to persist subcategory list while hovering over subcategory list items and not the category nav item */}
								<Link
									href={`/categories/${category.title
										.toLowerCase()
										.replace(/ /g, '-')}`}>
									<>
										<a
											className="nav-link-full"
											name={category.title}
											onMouseOver={showSubcategories}
											onMouseOut={hideSubcategories}>
											{category.title}
										</a>
										<a
											className="nav-link-mobile"
											name={category.title}>
											{category.title}
										</a>
									</>
								</Link>
								<ul
									className="nav-subcategories"
									onMouseMove={_ =>
										timeouts.current[category.title] &&
										clearTimeout(
											timeouts.current[category.title]
										)
									}
									onMouseOut={e => {
										let { style } = e.currentTarget;
										timeouts.current[
											category.title
										] = setTimeout(_ => {
											style.opacity = 0;
											style.pointerEvents = 'none';
										}, 0);
									}}>
									{/* About subcategory items must be handled according to the unique structure of the subcategories property */}
									{category.subcategories.map(subcategory => (
										<li key={uuid()}>
											<Link
												href={
													category.title !== 'About'
														? `/categories/${convertToPath(
																category.title
														  )}/${convertToPath(
																subcategory
														  )}`
														: `/about/${
																Object.values(
																	subcategory
																)[0]
														  }`
												}>
												<a className="subcategory-link">
													{category.title !== 'About'
														? subcategory
														: Object.keys(
																subcategory
														  )[0]}
												</a>
											</Link>
										</li>
									))}
								</ul>
							</>
						) : (
							<Link href={category.link}>
								<a>{category.title}</a>
							</Link>
						)}
					</li>
				))}
				{/* Search tool. Click to open. Submit query with enter key. */}
				<li
					key="-2"
					style={{ position: 'relative', textTransform: 'none' }}>
					<i
						className="search fas fa-search"
						onClick={e => {
							let icon = e.currentTarget,
								{ style } = icon.parentElement.children[1],
								open = style.display !== 'none';
							if (open) {
								style.display = 'none';
								icon.style.color = 'black';
								icon.addEventListener(
									'mouseout',
									setColorToBlack
								);
							} else {
								style.display = 'block';
								icon.style.color = 'var(--link-hover)';
								icon.removeEventListener(
									'mouseout',
									setColorToBlack
								);
							}
						}}></i>
					<input
						type="text"
						placeholder="Looking for something?"
						style={{
							display: 'none',
							position: 'absolute',
							right: '150%',
							top: '-15%',
							padding: '.2rem .4rem',
						}}
						onKeyDown={e => {
							e.persist();
							e.keyCode === 13 &&
								(_ => {
									/* Track query time */
									let now = Date.now();
									setLoadingSearchResults(true);
									fetch(
										client +
											'/api/search?value=' +
											e.target.value
									)
										.then(res => res.json())
										.then(
											rows =>
												/* First index for sorting by relevance, second index for sorting by date. Need separate values to avoid overwrite and only sort once */
												setSearchResults([
													rows,
													[...rows].sort(
														(
															{ publish_date: a },
															{ publish_date: b }
														) =>
															new Date(b) -
															new Date(a)
													),
												]) ||
												setLoadingSearchResults(
													false
												) ||
												setQueryTime(
													(
														(Date.now() - now) /
														1000
													).toFixed(2)
												)
										)
										.catch(
											e =>
												console.log(e) ||
												setSearchError(
													'Error fetching results'
												)
										);

									/* Second call for lengthier queries */
									fetch(
										client +
											'/api/search-extended?value=' +
											e.target.value
									)
										.then(res => res.json())
										.then(
											rows =>
												setSearchResults([
													[...searchResults[0], ...rows],
													[...searchResults[1], ...rows].sort(
														(
															{ publish_date: a },
															{ publish_date: b }
														) =>
															new Date(b) -
															new Date(a)
													)
												])
										);

									/* Lower background opacity, raise modal opacity, prevent scrolling background while allowing scrolling of modal. Bottom ad remains visible (if it was) */
									let {
										style,
									} = document.getElementsByClassName(
										'search-results'
									)[0];
									document.getElementsByClassName(
										'modal-open'
									)[0].style.opacity = '.75';
									document.getElementsByClassName(
										'modal-open'
									)[0].style.pointerEvents = 'auto';
									document.body.style.overflow = 'hidden';
									style.pointerEvents = 'auto';
									style.opacity = 1;
									e.target.value = '';
								})();
						}}
					/>
				</li>
			</ul>

			{/* Leaves room for bottom ad */}
			<div className="search-results">
				<button
					className="search-results-button"
					onClick={e => {
						/* Restore pre-modal-open conditions */
						let { style } = document.getElementsByClassName(
							'search-results'
						)[0];
						style.opacity = 0;
						style.pointerEvents = 'none';
						document.getElementsByClassName(
							'modal-open'
						)[0].style.opacity = 0;
						document.getElementsByClassName(
							'modal-open'
						)[0].style.pointerEvents = 'none';
						document.body.style.overflow = 'visible';
						setSearchResults([[], []]);
						setSearchError(null);
						setModalPage(1);
						setModalPageSet(0);
						setSortBy(0);
						setQueryTime(0);
						e.target.parentElement.children[2].children[1].children[1].selectedIndex = 0;
					}}>
					x
				</button>
				<div className="search-results-header">
					<span
						style={{
							fontFamily: 'Arial, sans-serif',
							fontSize: '.85rem',
							color: 'white'
						}}>
						{/* Show loading, query time or error */}
						{!searchError ? (
							!loadingSearchResults ? (
								`${searchResults[0].length} result${
									searchResults[0].length === 1 ? '' : 's'
								} (${queryTime} second${
									queryTime === 1 ? '' : 's'
								})`
							) : (
								'Loading articles...'
							)
						) : (
							<span
								style={{
									color: 'red',
									fontWeight: 'bold',
									fontSize: '1.1rem',
								}}>
								{searchError}
							</span>
						)}
					</span>
					<span>
						<span
							style={{
								fontSize: '.85rem',
								marginRight: '.25rem',
								color: 'white'
							}}>
							Sort by:{' '}
						</span>
						<select
							className="search-results-select"
							onChange={e => {
								setSortBy(e.target.selectedIndex);
								setModalPage(1);
								setModalPageSet(0);
							}}
							style={{ fontFamily: 'Arial, sans-serif' }}>
							<option key="0">Relevance</option>
							<option key="1">Date</option>
						</select>
					</span>
				</div>

				{/* Display 10 articles with scroll: auto */}
				<ul
					style={{
						position: 'relative',
						height:
							'calc(100% - 2.25rem - 1.13px - 1.5rem - 2.25rem)',
						overflowY: 'auto',
					}}>
					{searchResults[sortBy]
						.slice((modalPage - 1) * 10, modalPage * 10)
						.map((result, i) => (
							<li key={uuid()} style={{ marginBottom: '.5rem' }}>
								<div
									style={{
										width: '100%',
										textAlign: 'center',
									}}>
									<Link href={'/articles/' + result.id}>
										<a
											style={{
												color: 'white',
												fontSize: '1rem',
												fontWeight: 'bold',
												fontFamily: 'Arial, sans-serif',
											}}>
											{formatSentence(lipsum.slice(result.id % 800, result.id % 800 + result.title.length))}
										</a>
									</Link>
								</div>
								<div
									style={{
										color: 'var(--link-hover)',
										fontSize: '13px',
										fontFamily: 'Arial, sans-serif',
										margin: '.2rem 0',
									}}>{`${client}/articles/${result.id}`}</div>
								<div style={{ display: 'flex' }}>
									<Link href={`/articles/${result.id}`}>
										<a>
											<picture>
												<source
													srcSet={
														!faultyPicsumIDs.includes(result.id % 1000)
															? `https://picsum.photos/id/${result.id % 1000}/200`
															: `/img/true-press-logo-1.png`
													}
												/>
												<source
													srcSet={
														'/img/true-press-logo-1.png'
													}
													type="image/png"
												/>
												<img alt="thumbnail" />
											</picture>
										</a>
									</Link>
									<span
										style={{
											fontSize: '13px',
											fontFamily: 'Arial, sans-serif',
											margin: '0 .5rem',
											color: 'darkgray'
										}}>
										<span
											style={{
												fontSize: '13px',
												fontFamily: 'Arial, sans-serif',
												color: 'white'
											}}>
											{convertDate(result.publish_date)}{' '}
											...{' '}
										</span>
										{result.description &&
											formatSentence(lipsum.slice(result.id % 800, result.id % 800 + Math.min(result.description.length, 300))) +
												(result.description.length > 300
													? '...'
													: '')}
									</span>
								</div>
							</li>
						))}
				</ul>

				{/* Modal pagination. Show max 25 page values (1 set) at once. */}
				<ul
					style={{
						marginTop: '1.25rem',
						display: 'flex',
						width: '100%',
						overflowX: 'auto',
						fontFamily: 'Arial, sans-serif',
					}}>
					{/* If not on first set, click to show previous set */}
					{modalPageSet > 0 && (
						<li
							key="-1"
							onClick={_ => setModalPageSet(modalPageSet - 1)}
							onMouseOver={e => {
								e.target.style.textDecoration = 'underline';
							}}
							onMouseOut={e => {
								e.target.style.textDecoration = 'none';
							}}
							style={{
								color: '#c0c0c0',
								margin: '0 .25rem',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'flex-end',
								fontFamily: 'Arial, sans-serif',
							}}>
							...
						</li>
					)}
					{new Array(
						Math.min(
							25,
							Math.ceil(searchResults[0].length / 10) -
								25 * modalPageSet
						)
					)
						.fill(true)
						.map((_, i) => {
							let page = modalPageSet * 25 + i + 1;
							return (
								<li
									key={uuid()}
									onClick={_ => setModalPage(page)}
									onMouseOver={e => {
										e.target.style.textDecoration =
											'underline';
									}}
									onMouseOut={e => {
										e.target.style.textDecoration = 'none';
									}}
									style={{
										color:
											modalPage === page
												? 'var(--theme-gold)'
												: '#c0c0c0',
										margin: '0 .25rem',
										cursor: 'pointer',
										fontSize:
											modalPage === page
												? '.95rem'
												: '.8rem',
										display: 'flex',
										alignItems: 'flex-end',
										fontFamily: 'Arial, sans-serif',
									}}>
									{page}
								</li>
							);
						})}

					{/* If not on last set, click to advance */}
					{Math.ceil(searchResults[0].length / 10) -
						25 * modalPageSet >
						25 && (
						<li
							key="25"
							onClick={_ => setModalPageSet(modalPageSet + 1)}
							onMouseOver={e => {
								e.target.style.textDecoration = 'underline';
							}}
							onMouseOut={e => {
								e.target.style.textDecoration = 'none';
							}}
							style={{
								color: '#c0c0c0',
								margin: '0 .25rem',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'flex-end',
								fontFamily: 'Arial, sans-serif',
							}}>
							...
						</li>
					)}
				</ul>
			</div>

			<div className="modal-open"></div>

			<style jsx>{`
				.nav {
					display: flex;
					justify-content: space-evenly;
					align-items: center;
					height: 3rem;
					text-transform: uppercase;
				}

				.nav li {
					position: relative;
				}

				.nav li:hover ul {
					max-height: 1000px;
				}

				a {
					color: black;
					font-family: Lato, sans-serif;
					cursor: pointer;
				}

				a:hover {
					color: var(--link-hover);
				}

				.nav-subcategories {
					padding: 1.25rem 0.6rem 0.5rem 0.6rem;
					font-weight: 300;
					background-color: #fff;
					opacity: 0;
					pointer-events: none;
					position: absolute;
					top: 85%;
					transition: opacity 250ms ease-in;
					font-size: 15px;
					z-index: 5;
				}

				.nav-subcategories li {
					margin-top: 7px;
					cursor: pointer;
				}

				.nav-subcategories li:nth-child(1) {
					margin-top: 0;
				}

				.nav-subcategories li:hover {
					color: var(--link-hover);
				}

				.subcategory-link {
					color: black;
				}

				.subcategory-link:hover {
					color: var(--link-hover);
				}

				.search {
					cursor: pointer;
				}

				.search:hover {
					color: var(--link-hover);
				}

				.search-results {
					font-family: Arial, sans-serif;
					font-size: 0.8rem;
					width: 75vw;
					${/* Leave room for bottom ad */ ''}
					height: calc(100vh - 3rem - 7rem - 1.75rem);
					position: fixed;
					top: 3rem;
					left: 12.5vw;
					background-color: #2f2f2f;
					padding: 2.25rem 2.25rem 0.5rem 2.25rem;
					z-index: 10;
					opacity: 0;
					pointer-events: none;
					transition: opacity 150ms ease-in;
					box-shadow: 0 0 8px 1px white;
				}

				.search-results img {
					border: 2px solid #828282;
					width: 65px;
					height: 65px;
					object-fit: fill;
					cursor: pointer;
				}

				.search-results-button {
					background-color: coral;
					cursor: pointer;
					border: 1px solid #aaa;
					color: white;
					font-size: 0.75rem;
					padding: 0 0.25rem;
					position: absolute;
					top: 5px;
					right: 5px;
				}

				.modal-open {
					position: fixed;
					background-color: #111;
					top: 0;
					left: 0;
					width: 100vw;
					height: 100vh;
					opacity: 0;
					pointer-events: none;
					z-index: 9;
					transition: opacity 150ms ease-in;
				}

				.nav-link-full,
				.nav-link-mobile {
					z-index: 3;
				}
			`}</style>
		</div>
	);
}

export default Nav;
