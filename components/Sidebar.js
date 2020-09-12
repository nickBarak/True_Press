import Link from 'next/link';
import { uuid } from 'uuidv4';
import lipsum from '../data/lipsum';
import { useRef } from 'react';

// const newsletterURL =
	// 'https://dailynexus.us19.list-manage.com/subscribe?u=c7afb6c46dbbdcd7bb0bd8919&id=7220084bdc';
const facebookURL = 'https://www.facebook.com/dailynexus/';
// const archivesURL = 'https://dailynexus.com/archives/';

const twitterURLS = {
	main:
		'https://twitter.com/dailynexus?ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Eprofile%3Adailynexus&ref_url=https%3A%2F%2Fdailynexus.com%2Fcategory%2Fartsweek%2F',
	embed:
		'https://publish.twitter.com/?url=https%3A%2F%2Ftwitter.com%2Fdailynexus&ref_src=twsrc%5Etfw%7Ctwcamp%5Eembeddedtimeline%7Ctwterm%5Eprofile%3Adailynexus&ref_url=https%3A%2F%2Fdailynexus.com%2Fcategory%2Fartsweek%2F#',
};

function Sidebar() {
	const lipsumCount = useRef(0);

	return (
		<>
			<ul className="sidebar">
				<li key="0">
					<div>Ad Space</div>
				</li>
				<li
					key="1"
					style={{
						border: '2px solid #555',
						margin: '.5rem 0 .75rem 0',
					}}>
					<img
						src="/img/covid-chart.png"
						alt="covid chart"
						style={{ width: '95%' }}
					/>
				</li>
				<li key="2">
					<div className="comic-of-the-week-title">
						Featured Photography
					</div>
					<hr />
					<br />
					<Link href={`/articles/8081`}>
						<div className="comic-of-the-week">
							<img
								src={`https://picsum.photos/id/${8081 % 1000}/200/300`}
								alt="comic"
							/>
						</div>
					</Link>
				</li>
				<li key="3">
					{' '}
						<button className="newsletter-button" onClick={_=> alert('Imagine being taken to the Newsletter Sign-up page')}>
							Subscribe to our Newsletter
						</button>{' '}
				</li>
				{/* Sometimes doesn't show for unknown reason */}
				<li key="4">
					<div style={{ height: '34.5rem', overflowY: 'scroll' }}>
						<a
							className="twitter-timeline"
							href="https://twitter.com/dailynexus?ref_src=twsrc%5Etfw">
							Tweets by dailynexus
						</a>
						<script
							async
							src="https://platform.twitter.com/widgets.js"
							charSet="utf-8"></script>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							fontSize: '.8rem',
							margin: '1rem 0',
						}}>
						<Link href={twitterURLS.embed}>
							<a style={{ color: 'var(--link-hover)' }}>Embed</a>
						</Link>
						<Link href={twitterURLS.main}>
							<a style={{ color: 'var(--link-hover)' }}>
								View on Twitter
							</a>
						</Link>
					</div>
				</li>
				<li key="5">
					{' '}
					<Link href={facebookURL}>
						<button className="facebook-button">
							<i className="fab fa-facebook-f"></i> Like us on
							Facebook
						</button>
					</Link>{' '}
				</li>
				<li key="6">
					{' '}
					<div style={{ textAlign: 'center', fontWeight: '900', fontSize: '2.15rem' }}>VIEW ARCHIVES</div>
					<div style={{ textAlign: 'center', fontSize: '1.05rem', fontWeight: 'bold', lineHeight: '1.75rem', letterSpacing: '3px', borderBottom: '3px solid black' }}>SINCE 2020</div>
					<img src="https://img.favpng.com/2/2/14/computer-icons-magazine-newspaper-book-png-favpng-1iv9BKujQHtXQRGqfz7QwEZLD_t.jpg" alt="archives" onClick={_=> alert('Image being taken to the print archives')} style={{ cursor: 'pointer' }} />
				</li>
				<li key="7">
					<div
						style={{
							textAlign: 'center',
							fontWeight: 'bold',
							fontSize: '1.55rem',
							marginTop: '1.5rem',
							marginBottom: '.6rem',
						}}>
						WEEKLY HOROSCOPES
					</div>
					<div
						style={{
							textAlign: 'center',
							color: '#333',
							fontSize: '1.35rem',
							fontWeight: 'bold',
						}}>
						by{' '}
							<span style={{ color: 'var(--link-hover)', cursor: 'pointer' }} onClick={_=> alert('Imagine being taken to the Twitter page of the Opinion department')}>
								@mocknexopinion
							</span>
					</div>
					<br />
					<hr />
					<br />
					<div
						style={{
							color: '#333',
							textAlign: 'center',
							fontSize: '1.35rem',
							fontWeight: 'bold',
						}}>
						The Signs as Dummy Text
					</div>
					<br />
					<hr />
					<br />
					<ul>
						{[
							{
								Aries: [
									'March 21 - April 19',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Yerba mate chocolate truffles'.length),
								],
							},
							{
								Taurus: [
									'April 20 - May 20',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'triple chocolate cake'.length),
								],
							},
							{
								Gemini: [
									'May 21 - June 20',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Fireball pumpkin pie'.length),
								],
							},
							{
								Cancer: [
									'June 21 - July 22',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Bucket of ice water'.length),
								],
							},
							{ Leo: ['July 23 - August 22', "S'mores"] },
							{
								Virgo: [
									'August 23 - September 22',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Vodka mocha bundt cake'.length),
								],
							},
							{
								Libra: [
									'September 23 - October 22',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Chocolate-covered almonds'.length),
								],
							},
							{
								Scorpio: [
									'October 23 - November 21',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Frozen yogurt with Hot Cheeto topping'.length),
								],
							},
							{
								Sagittarius: [
									'November 22 - December 21',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Jar of mayonnaise'.length),
								],
							},
							{
								Capricorn: [
									'December 22 - January 19',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Rum cake'.length),
								],
							},
							{
								Aquarius: [
									'January 20 - February 18',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Oatmeal raisin cookies'.length),
								],
							},
							{
								Pisces: [
									'February 19 - March 20',
									lipsum.slice(lipsumCount.current, lipsumCount.current += 'Raspberry cheesecake'.length),
								],
							},
						].map((sign, i) => {
							let [[name, [dates, horoscope]]] = Object.entries(
								sign
							);
							return (
								<li
									key={uuid()}
									style={{
										display: 'flex',
										margin: '1rem 0',
									}}>
									<div>
										<img
											style={{
												width: '4rem',
												height: '4rem',
												marginRight: '.5rem',
											}}
											src={`/img/horoscopes/${name.toLowerCase()}.svg`}
											alt="sign"
										/>
									</div>
									<div>
										<div
											style={{
												fontWeight: 'bold',
												textTransform: 'uppercase',
											}}>
											{name}
										</div>
										<div
											style={{
												fontSize: '.75rem',
												color: '#4b4b4b',
												fontWeight: '600',
												marginBottom: '.5rem',
												marginTop: '.2rem',
											}}>
											{dates}
										</div>
										<div
											style={{
												color: 'var(--link-hover)',
											}}>
											{horoscope}
										</div>
									</div>
								</li>
							);
						})}
					</ul>
				</li>
			</ul>

			<style jsx>{`
				.comic-of-the-week-title {
					font-weight: bold;
					font-size: 1.5rem;
					text-align: center;
					margin-bottom: 0.5rem;
				}

				.comic-of-the-week img {
					object-fit: cover;
					width: 100%;
					height: 100%;
					position: relative;
				}

				.comic-of-the-week {
					position: relative;
					cursor: pointer;
				}

				.comic-of-the-week::before {
					position: absolute;
					top: 0;
					right: 0;
					bottom: 0;
					left: 0;
					content: 'Peace in Wilderness';
					color: white;
					background-color: rgba(0, 0, 0, 0.5);
					display: flex;
					justify-content: center;
					align-items: center;
					z-index: 2;
				}

				.newsletter-button {
					background-color: var(--theme-gold);
					color: white;
					width: 92.5%;
					border-radius: 4px;
					border: none;
					padding: 0.75rem;
					margin: 1rem 0.75rem;
					text-align: center;
					cursor: pointer;
					border: 2px solid var(--theme-gold);
				}

				.newsletter-button:hover {
					background-color: white;
					color: black;
				}

				.facebook-button {
					background-color: #445aa4;
					width: 95%;
					cursor: pointer;
					margin: 1.5rem 0.5rem 3rem 0.5rem;
					box-shadow: none;
					padding: 0.6rem;
					color: white;
					text-align: center;
					border-radius: 5px;
					border: 2px solid #445aa4;
				}

				.facebook-button:hover {
					background-color: white;
					color: #445aa4;
				}
			`}</style>
		</>
	);
}

export default Sidebar;
