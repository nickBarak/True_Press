import { useRouter } from 'next/router';
import ArticleDisplay from '../../components/ArticleDisplay';
import Layout from '../../layouts';
import { convertFromPath } from '../../Functions';
import { useState, useEffect, useRef } from 'react';
import 'isomorphic-unfetch';
import { client } from '../../URLs';

function Search() {
	const router = useRouter();
	const [searchResults, setSearchResults] = useState([[], []]);
	const [sortBy, setSortBy] = useState(0);
	const [loadingSearchResults, setLoadingSearchResults] = useState(false);
	const [queryTime, setQueryTime] = useState(0);
	const [resultCount, setResultCount] = useState('Unknown');
	const [searchError, setSearchError] = useState(null);
	const [footerData, setFooterData] = useState({});
	const mounted = useRef(false);

	useEffect(
		_ => {
			if (!mounted.current) {
				mounted.current = true;
				return;
			}
			let ssSearchResults = JSON.parse(
				sessionStorage.getItem('s__EA__Rc_H_' + router.query.value.toLowerCase()));
			if (ssSearchResults) {
				setResultCount(ssSearchResults.length);
				setLoadingSearchResults(true);
				let now = Date.now();
				fetch(client + '/api/fetch-articles', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ ids: ssSearchResults.slice(0, 15) })
				})
					.then(res => res.json())
					.then(rows => {
						const rowsByRelevanceAndDate = [
							rows,
							[...rows].sort(
								({ publish_date: a }, { publish_date: b }) =>
									new Date(b) - new Date(a)
							),
						];
						setLoadingSearchResults(false);
						setSearchResults(rowsByRelevanceAndDate);
						setQueryTime(((Date.now() - now) / 1000).toFixed(2));
						setFooterData({
							page: 1,
							highestPage: Math.ceil(
								sessionStorage.getItem(
									's__EA__Rc_H_' + router.query.value.toLowerCase()
								).length / 15
							),
							route: '/search/' + router.query.value,
						});
					})
					.catch(
						e =>
							console.log(e) ||
							setSearchError('Error fetching results')
					);
			} else {
				let now = Date.now();
				setLoadingSearchResults(true);
				fetch(client + '/api/search?value=' + router.query.value)
					.then(res => res.json())
					.then(rows => {
						/* First index for sorting by relevance, second index for sorting by date. Need separate values to avoid overwrite and only sort once */
						const rowsByRelevanceAndDate = [
							rows,
							[...rows].sort(
								({ publish_date: a }, { publish_date: b }) =>
									new Date(b) - new Date(a)
							),
						];
						setResultCount(rows.length);
						setLoadingSearchResults(false);
						setSearchResults(rowsByRelevanceAndDate.map(rows => rows.slice(0, 15)));
						setQueryTime(((Date.now() - now) / 1000).toFixed(2));
						setFooterData({
							page: 1,
							highestPage: rows ? Math.ceil(rows.length / 15) : 1,
							route: '/search/' + router.query.value,
						});
						sessionStorage.setItem(
							's__EA__Rc_H_' + router.query.value.toLowerCase(),
							JSON.stringify(rows.map(({ id }) => id))
						);
					})
					.catch(
						e =>
							console.log(e) ||
							setSearchError('Error fetching results')
					);
			}
		},
		[mounted.current]
	);

	return (
		<Layout footerData={footerData}>
			<ArticleDisplay
				type="search-page"
				heading={`"${
					router.query.value
						? convertFromPath(router.query.value)
						: ''
				}"`}
				articles={searchResults[sortBy]}
				searchData={{
					loadingSearchResults,
					queryTime,
					resultCount,
					searchError,
					setSortBy
				}}
			/>
		</Layout>
	);
}

export default Search;
