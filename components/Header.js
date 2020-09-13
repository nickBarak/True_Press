import Nav from './Nav';
import MobileNav from './MobileNav';
import Link from 'next/link';
import { useState } from 'react';
import lipsum from '../data/lipsum';

function Header() {
	const [scrollY, setScrollY] = useState(0);

	return (
		<>
			<div className="header">
				<div className="full-logo">
					<Link href="/">
						<a>
							TRUE{' '}
							<img
								className="logo"
								src="/img/true-press-logo-1.png"
								alt="logo"
							/>{' '}
							PRESS
						</a>
					</Link>
				</div>
				<div className="under-logo">
					<span>
						{new Date().toLocaleDateString('default', {
							weekday: 'long',
							month: 'long',
							year: 'numeric',
							day: 'numeric',
						})}
					</span>
					<div>NO BIAS | NO FLUFF | REAL REPORTING</div>
					<span>
						<a href="#">
							<i className="fab fa-facebook-square"></i>
						</a>
						<a href="#">
							<i className="fab fa-twitter"></i>
						</a>
						<a href="#">
							<i className="fab fa-instagram"></i>
						</a>
					</span>
				</div>
				<Nav />
				
				<Link href="/articles/1843">
					<a className="banner">
						<span>
							LIVE: {lipsum.slice(58, 58 + `Updates on Coronavirus in Santa Barbara
							County, on UCSB Operations`.length)}
						</span>
						<span className="banner-read-more">
							Click to read more
						</span>
					</a>
				</Link>
			</div>

			<div className="header-mobile">
				<MobileNav scrollY={scrollY} />
				<span className="full-logo">
					<Link href="/">
						<a>
							TRUE
							<img
								className="logo"
								src="/img/true-press-logo-1.png"
								alt="logo"
							/>
							PRESS
						</a>
					</Link>
				</span>
				<span className="hamburger-nav">
					<span
						style={{
							position: 'absolute',
							bottom: '-12px',
							left: 0,
							height: '28px',
							width: '32px',
							cursor: 'pointer',
						}}
						onClick={_ => {
							setScrollY(window.scrollY);
							window.scrollTo(0, 0);
							document.getElementsByClassName(
								'header-mobile'
							)[0].style.position = 'absolute';
							document.getElementsByClassName(
								'nav-mobile'
							)[0].style.transform = 'translateX(0)';
							document.getElementById(
								'__next'
							).children[2].children[0].style.display = 'none';
						}}
					/>
				</span>
			</div>

			<style jsx>{`
				* {
					font-family: Lato, sans-serif;
				}

				.logo {
					width: 5.5rem;
					height: 6.5rem;
				}

				.full-logo {
					text-align: center;
					margin-bottom: .5rem;
					transform: translateY(-.6rem);
				}

				.full-logo img {
					transform: translateY(1.4rem);
					border-radius: 6px;
				}

				.full-logo a {
					font-size: 4.5rem;
					font-family: Times New Roman, Georgia, Serif;
					color: black;
				}

				.under-logo {
					position: relative;
					text-align: center;
					font-size: 0.825rem;
					padding: 4px;
				}

				.under-logo span {
					position: absolute;
				}

				.under-logo span:nth-child(1) {
					left: 5px;
				}

				.under-logo span:nth-child(3) {
					right: 8px;
					top: 4px;
				}

				.under-logo::before,
				.under-logo::after {
					width: 100%;
					content: '';
					position: absolute;
					left: 0;
				}

				.under-logo::before {
					background-color: var(--theme-blue);
					height: 1px;
					top: 0;
				}

				.under-logo::after {
					height: 3px;
					bottom: 0;
					background-color: var(--theme-gold);
				}

				i {
					font-size: 1rem;
					margin-left: 0.5rem;
					color: gray;
					transition: color 200ms ease-in;
					cursor: pointer;
				}

				i:hover {
					color: black;
				}

				.header-mobile {
					width: calc(100% + 1rem);
					transform: translateX(-.5rem);
					border-bottom: 2px solid black;
					justify-content: space-around;
					align-items: center;
					position: sticky;
					position: -webkit-sticky;
					background-color: white;
					top: 0;
					z-index: 50;
					padding: 0 0.45rem;
				}

				.header-mobile .full-logo {
					width: 80%;
					text-align: left;
					display: flex;
					align-items: flex-start;
					transform: translateY(0);
				}

				.header-mobile .full-logo a {
					font-size: 1.75rem;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 0 0.55rem;
					margin-top: 0.65rem;
				}

				.header-mobile .logo {
					object-fit: fill;
					width: 3rem;
					height: 3rem;
					transform: translateY(-.15rem);
				}

				.hamburger-nav {
					height: 3px;
					width: 27px;
					border-radius: 15px;
					background-color: black;
					position: relative;
				}

				.hamburger-nav::before,
				.hamburger-nav::after {
					content: '';
					width: 100%;
					border-radius: 15px;
					height: 3px;
					background-color: black;
					position: absolute;
				}

				.hamburger-nav::before {
					top: -8px;
				}

				.hamburger-nav::after {
					bottom: -8px;
					left: 0;
				}

				.banner {
					display: flex;
					flex-direction: column;
					padding: 0.75rem;
					color: white;
					background-color: var(--theme-blue);
					text-align: center;
				}
			`}</style>
		</>
	);
}

export default Header;
