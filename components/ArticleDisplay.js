import ArticlePreview from './ArticlePreview';
import { uuid } from 'uuidv4';

function ArticleDisplay({ type, heading, articles, searchData }) {
	return (
		<>
			<div
				className={type}
				style={{ marginRight: '2rem', marginLeft: '1rem' }}>
				<div
					className="category-heading"
					style={{
						textTransform: 'uppercase',
						marginTop: '1.35rem',
					}}>
					{heading}
				</div>

				{searchData && (
					<div
						className="search-results-header"
						style={{ marginTop: '.8rem' }}>
						<span
							style={{
								fontFamily: 'Arial, sans-serif',
								fontSize: '.8rem',
							}}>
							{/* Show loading, query time or error */}
							{!searchData.searchError ? (
								!searchData.loadingSearchResults ? (
									`${searchData.queryTime
										? `${searchData.resultCount} result${
										searchData.resultCount === 1 ? '' : 's'}`
										: 'Nothing so far'
									} (${searchData.queryTime ? `${searchData.queryTime} second${
										searchData.queryTime === 1 ? '' : 's'
									}` : 'waiting for more responses...'})`
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
									{searchData.searchError}
								</span>
							)}
						</span>
						<span>
							<span
								style={{
									fontSize: '.85rem',
									marginRight: '.25rem',
								}}>
								Sort by:{' '}
							</span>
							<select
								className="search-results-select"
								onChange={e => {
									searchData.setSortBy(
										e.target.selectedIndex
									);
								}}
								style={{ fontFamily: 'Arial, sans-serif' }}>
								<option key="0">Relevance</option>
								<option key="1">Date</option>
							</select>
						</span>
					</div>
				)}

				<ul>
					{articles.map((article, i) => (
						/* Alternates which side of preview displays image */
						<li key={uuid()}>
							{' '}
							<ArticlePreview
								article={article}
								imageLeft={!(i % 2)}
							/>{' '}
						</li>
					))}
				</ul>
			</div>

			<style jsx>{`
				.category-heading {
					position: relative;
				}

				.category-heading::before,
				.category-heading::after {
					content: '';
					width: 100%;
					height: 2px;
					background-color: var(--theme-gold);
					position: absolute;
					left: 0;
				}

				.category-heading::before {
					top: -5px;
				}

				.category-heading::after {
					bottom: -5px;
				}
			`}</style>
		</>
	);
}

export default ArticleDisplay;
