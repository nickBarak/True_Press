import Link from 'next/link';
import { Waypoint } from 'react-waypoint';
import { uuid } from 'uuidv4';

function Footer({ footerData, toggleShowBottomAdListener }) {
	/* Defines pagination values (+/- max of 4 from current page) */
	if (footerData) {
		var { page, highestPage, route } = footerData,
			pageNav = [];
		for (
			let i = page > 5 ? page - 4 : 1;
			i <= page + 4 && i <= highestPage;
			i++
		) {
			pageNav.push(i);
		}
	}
	return (
		/* Hides bottom ad if overlapping footer */
		<Waypoint
			onEnter={toggleShowBottomAdListener}
			onLeave={toggleShowBottomAdListener}>
			<div className="footer">
				<ul>
					{/* If not on first page */}
					<li>
						<ul>
							{page > 1 && (
								<>
									<li
										style={{
											alignSelf: 'center',
											paddingTop: '.1rem',
										}}>
										<Link href={route}>
											<a className="paginator" style={{ fontSize: '1rem' }}>
												<span>«</span> First
											</a>
										</Link>
									</li>
									<li
										style={{
											alignSelf: 'center',
											paddingTop: '.1rem',
										}}>
										<Link
											href={
												page === 2
													? route
													: route +
													  `/page/${page - 1}`
											}>
											<a
											 	className="paginator"
												style={{
													fontSize: '1rem',
													margin: '0 .25rem 0 .5rem',
												}}>
												<span>‹</span> Prev
											</a>
										</Link>
									</li>
								</>
							)}
						</ul>
					</li>

					<li>
						<ul>
							{footerData &&
								footerData.highestPage > 1 &&
								pageNav.map((pageNum, i) => (
									<li key={uuid()}>
										<Link
											href={
												route +
												(pageNum === 1
													? ''
													: `/page/${pageNum}`)
											}>
											<a style={{ margin: '0 .15rem' }}>
												{pageNum === page ? (
													<strong
														style={{
															color: 'var(--theme-gold)',
															fontSize: '1.3rem',
														}}>
														{pageNum}
													</strong>
												) : (
													pageNum
												)}
											</a>
										</Link>
									</li>
								))}
						</ul>
					</li>

					{/* If not on last page */}
					<li>
						<ul>
							{page < highestPage && (
								<>
									<li
										style={{
											alignSelf: 'center',
											paddingTop: '.1rem',
										}}>
										<Link
											href={route + `/page/${page + 1}`}>
											<a
												className="paginator"
												style={{
													fontSize: '1rem',
													margin: '0 .5rem 0 .25rem',
												}}>
												Next <span>›</span>
											</a>
										</Link>
									</li>
									<li
										style={{
											alignSelf: 'center',
											paddingTop: '.1rem',
										}}>
										<Link
											href={
												route + `/page/${highestPage}`
											}>
											<a className="paginator" style={{ fontSize: '1rem' }}>
												Last <span>»</span>
											</a>
										</Link>
									</li>
								</>
							)}
						</ul>
					</li>
				</ul>
				<ul>
					{[
						['Home', '/'],
						['About', '/about'],
						['Advertising', '/about/advertising'],
						['FAQ', '/about/faq'],
						['Join Us', '/about/join'],
						['Legal Notices', '/about/legal-notices'],
						['Staff/Contact', '/about/staff-contact'],
					].map(([title, route], i) => (
						<li key={uuid()}>
							<Link href={route}>
								<a>{title}</a>
							</Link>
						</li>
					))}
				</ul>

				<style jsx>{`
					.footer {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						padding: 1.5rem 0;
						background-color: var(--theme-blue);
					}

					a {
						color: white;
					}

					ul {
						display: flex;
					}

					ul:nth-child(1) li ul {
						display: flex;
						align-items: flex-end;
					}

					ul:nth-child(1) {
						display: flex;
					}

					ul:nth-child(1) a {
						color: white;
					}

					ul:nth-child(2) {
						border: 2px solid var(--theme-gold);
						padding: 0.5rem 0.075rem;
						justify-content: space-around;
						margin: 0.75rem 0 0.85rem 0;
					}

					ul:nth-child(2) li {
						margin: 0 1.25rem;
						align-self: center;
						white-space: nowrap;
					}

					ul:nth-child(1) .paginator > span {
						color: var(--theme-gold);
					}
				`}</style>
			</div>
		</Waypoint>
	);
}

export default Footer;
