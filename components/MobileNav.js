import categories from '../data/categories';
import { uuid } from 'uuidv4';
import Link from 'next/link';
import { convertToPath } from '../Functions';
import { useRouter } from 'next/router';

function MobileNav({ scrollY }) {
	const router = useRouter();

	return (
		<>
			<div className="nav-mobile">
				<div
					style={{
						position: 'relative',
						fontSize: '1.75rem',
						borderBottom: '1px solid #333',
						fontWeight: 'bold',
						padding: '1.5rem .8rem',
					}}>
					<Link href="/">
						<a
							onClick={e => {
								e.target.parentElement.parentElement.style.transform =
									'translateX(-100vw)';
							}}>
							True Press News
						</a>
					</Link>
					<span
						className="nav-mobile-button"
						onClick={e => {
							document.getElementsByClassName(
								'header-mobile'
							)[0].style.position = 'sticky';
							window.scrollTo(0, scrollY);
							e.target.parentElement.parentElement.style.transform =
								'translateX(-100vw)';
							document.getElementById(
								'__next'
							).children[2].children[0].style.display = 'flex';
							[
								...e.currentTarget.parentElement.parentElement
									.children[1].children,
							].forEach(child => {
								if (
									child.children.length &&
									child.children[0].children.length
								) {
									child.children[1].style.maxHeight = '0px';
									child.children[0].children[1].children[0].style.transform =
										'rotateX(0)';
								}
							});
						}}></span>
				</div>

				<ul>
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
					].map(category => {
						let isAbout = category.title === 'About';
						return (
							<li key={uuid()}>
								{category.subcategories ? (
									<>
										<div>
											<Link
												href={
													isAbout
														? '/about'
														: `/categories/${convertToPath(
																category.title
														  )}`
												}>
												<a
													style={{ width: '90%' }}
													onClick={e => {
														e.target.parentElement.parentElement.parentElement.style.transform =
															'translateX(-100vw)';
													}}>
													{category.title}
												</a>
											</Link>
											{category.subcategories && (
												<span
													style={{
														width: '2rem',
														height: '2rem',
													}}
													onClick={e => {
														e.currentTarget.children[0].style.transform =
															e.currentTarget
																.children[0]
																.style
																.transform ===
															'rotateX(180deg)'
																? 'rotateX(0)'
																: 'rotateX(180deg)';
														e.currentTarget.parentElement.parentElement.children[1].style.maxHeight =
															e.currentTarget
																.parentElement
																.parentElement
																.children[1]
																.style
																.maxHeight ===
															'0px'
																? isAbout
																	? '8rem'
																	: category.maxHeight
																: '0px';
													}}>
													<i
														className="fas fa-caret-down"
														style={{
															transition:
																'transform 150ms ease-in',
															color: 'white',
															fontSize: '2rem',
														}}></i>
												</span>
											)}
										</div>
										<ul
											style={{
												overflow: 'hidden',
												maxHeight: 0,
												transformOrigin: 'top',
												transition:
													'max-height 350ms ease-in-out',
											}}>
											{category.subcategories.map(
												subcategory => (
													<li key={uuid()}>
														<Link
															href={
																isAbout
																	? `/about/${
																			Object.values(
																				subcategory
																			)[0]
																	  }`
																	: `/categories/${convertToPath(
																			category.title
																	  )}/${convertToPath(
																			subcategory
																	  )}`
															}>
															<a
																style={{
																	fontSize:
																		'1rem',
																}}>
																{isAbout
																	? Object.keys(
																			subcategory
																	  )[0]
																	: subcategory}
															</a>
														</Link>
													</li>
												)
											)}
										</ul>
									</>
								) : (
									<Link href={category.link}>
										<a>{category.title}</a>
									</Link>
								)}
							</li>
						);
					})}
					<li key="-1" style={{ flexDirection: 'row' }}>
						<i
							className="fas fa-search"
							style={{ transform: 'translateY(3px)' }}
							onClick={e =>
								e.target.parentElement.children[1].children[0]
									.value &&
								router.push(
									'/search/' +
										convertToPath(
											e.target.parentElement.children[1]
												.children[0].value
										)
								)
							}></i>
						<form
							style={{ width: '70%' }}
							onSubmit={e => {
								router.push(
									'/search/' +
										convertToPath(
											e.target.children[0].value
										)
								);
							}}>
							{' '}
							<input
								placeholder="Looking for something?"
								style={{
									height: '1.65rem',
									width: '100%',
									padding: '.3rem .3rem',
									marginLeft: '.75rem',
								}}
							/>{' '}
						</form>
					</li>
				</ul>
			</div>

			<style jsx>{`
				.nav-mobile {
					background-color: #212121;
					color: white;
					display: flex;
					flex-direction: column;
					position: absolute;
					top: 0;
					left: .5rem;
					right: .5rem;
					transform: translateX(-120%);
					transition: transform 210ms ease-out;
					z-index: 20;
				}

				.nav-mobile-button {
					position: absolute;
					top: 1.4rem;
					right: 1rem;
					height: 2.25rem;
					width: 2.25rem;
					background-color: white;
					color: black;
					cursor: pointer;
					border-radius: 2px;
				}

				.nav-mobile-button::before,
				.nav-mobile-button::after {
					content: '';
					position: absolute;
					background-color: black;
					width: 70%;
					height: 4px;
					top: 45%;
					left: 16%;
					border-radius: 20px;
				}

				.nav-mobile-button::before {
					transform: rotateZ(45deg);
				}

				.nav-mobile-button::after {
					transform: rotateZ(-45deg);
				}

				.nav-mobile > ul > li {
					border-bottom: 1px solid #333;
					padding: 1.1rem 0.8rem;
					font-size: 1.25rem;
					cursor: pointer;
					display: flex;
					flex-direction: column;
				}

				.nav-mobile > ul > li > div {
					display: flex;
				}

				a {
					cursor: pointer;
					color: white;
				}
			`}</style>
		</>
	);
}

export default MobileNav;
