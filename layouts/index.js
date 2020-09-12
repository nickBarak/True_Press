import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';

function Layout({ footerData, children }) {
	const [showBottomAd, setShowBottomAd] = useState(true);

	function updateBottomAd() {
		document.getElementById(
			'__next'
		).children[2].children[0].style.display = showBottomAd
			? 'flex'
			: 'none';
	}

	/* Bottom ad set to display: none when overlapping footer */
	function toggleShowBottomAdListener() {
		setShowBottomAd(!showBottomAd);
		window.removeEventListener('scroll', updateBottomAd, false);
		window.addEventListener('scroll', updateBottomAd, false);
	}

	/* Bottom ad only appears after scrolling */
	useEffect(_ => toggleShowBottomAdListener(), []);

	return (
		<>
			<div
				style={{
					backgroundColor: '#111',
					color: '#fff',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-end',
				}}>
				{/* v Span won't show if class or id attached for unknown reason v */}
				<span
					style={{
						border: '2px dotted white',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderBottom: 'none',
					}}>
					<span>Ad Space</span>
				</span>
			</div>
			<div className="main">
				<Header />
				{/* Flexible styles to children div to fill page */}
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
					}}>
					<div className="sidebar-container">
						<Sidebar />
					</div>
					<div className="main-children">{children}</div>
				</div>
				{/* Bottom ad hidden if overlapping the footer */}
				<Footer
					footerData={footerData}
					toggleShowBottomAdListener={toggleShowBottomAdListener}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				{/* v Div won't show if class or id attached for unknown reason v */}
				<div
					style={{
						backgroundColor: '#eee',
						color: 'black',
						justifyContent: 'center',
						alignItems: 'center',
						position: 'fixed',
						bottom: 0,
						zIndex: 11,
						display: 'none',
						border: '1px solid black',
						borderBottom: 'none'
					}}>
					<span>Ad Space</span>
					<button
						className="bottom-ad-button"
						onClick={e => {
							e.target.parentElement.parentElement.style.display =
								'none';
						}}>
						x
					</button>
				</div>
			</div>

			<style jsx>{`
				* {
					font-family: Lato, sans-serif;
				}

				.bottom-ad-button {
					background-color: coral;
					cursor: pointer;
					border: 1px solid white;
					color: white;
					font-size: 0.75rem;
					padding: 0 0.25rem;
					position: absolute;
					top: 5px;
					right: 5px;
				}
			`}</style>
		</>
	);
}

export default Layout;
