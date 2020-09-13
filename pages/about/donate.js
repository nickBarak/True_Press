import Layout from '../../layouts';
import Link from 'next/link';
import About from '../../components/About';
import lipsum from '../../data/lipsum';
import { useRef } from 'react';
import { formatSentence } from '../../Functions';

function Donate() {
	const lipsumCount = useRef(0);
	
	return (
		<Layout>
			<About heading="Donate">
				<Link href="#">
					<a
						style={{
							cursor: 'pointer',
							position: 'relative',
							display: 'flex',
							justifyContent: 'center',
						}}>
						<img
							src="https://picsum.photos/id/4/800/500"
							alt="donate"
						/>
						<span className="donate-banner">
							CLICK HERE TO DONATE
						</span>
					</a>
				</Link>
				<div>
					<br />
					<span style={{ fontStyle: 'italic' }}>True Press</span>
					, {formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `the historic and direct descendant of UCSB student news
					enterprises dating back nearly 100 years needs donations of
					any size in order to keep publishing, in print and on the
					web`.length))}.
					<br />
					<br />
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Like every other college newspaper, the`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span> is
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `fighting to survive in the new media era. UCSB student
					journalists, who spend countless hours digging out stories
					about the inner workings of the University and the
					activities and culture of Isla Vista, have recently expanded
					and upgraded their newsroom’s web site and online reporting
					working to tell the story of UCSB on multiple platforms.
					Just last year, we launched the Labyrinth, a new
					data-journalism section`.length))}.
					<br />
					<br />
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `The staff won national recognition for its minute-by-minute
					coverage of the tragedy of the killing spree that struck IV
					in 2014, just one example of the kind of its award-winning
					reporting, which connects the entire campus community.
					Journalists have also worked around the clock over the many
					natural disasters that plagued the area in recent years`.length))}.
					<br />
					<br />
					<span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `journalists receive no core funding from the University. Nor
					do they have the luxury of an academic journalism department
					to support their efforts. Its staff needs money for student
					salaries and professional development training, in addition
					to new equipment to gather, create and distribute its news,
					feature, opinion and sports content in the varied ways that
					its audience expects – through web, print, podcast and video
					presentations`.length))}.
					<br />
					<br />
				</div>
				<img
					src="https://picsum.photos/id/50/800/500"
					alt="donate"
				/>
				<div
					style={{
						fontSize: '2rem',
						fontWeight: 'bold',
						margin: '3.5rem 0 1.25rem 0',
					}}>
					The <span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `is the only independent news organization at UCSB`.length))}.
				</div>
				<div>
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Without its presence on campus, the campus and Santa Barbara
					will lose a major and essential resource for unbiased,
					agenda-free reporting`.length))}.
					<br />
					<br />
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Please give to keep the`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span> alive,
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `and always independent`.length))}.
				</div>
				<article>
					<section key="0">
						<div>MISSION</div>
						<div>
							The{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `is the student-run press of the University of
							California, Santa Barbara campus, and as such, we,
							the editors, place the interests and needs of the
							campus community above all else, and seek to provide
							meaningful and essential news, editorial and feature
							coverage to our readers. We feel that it is more
							than just a privilege to publish a student
							newspaper, but a duty demanded by a democratic
							society, thus we carry out our duty to the best of
							our abilities, following the high standards of
							professionalism as outlined in the American Society
							of Newspaper Editors’ Statement of Principles.
							Additionally, in alignment with the changing
							technological demands of the 21st century, we strive
							to produce accurate and engaging online content in a
							fashion that allows for more reach, engagement, and
							accessibility to student readers`.length))}.
						</div>
					</section>
					<section key="1">
						<div>HISTORY</div>
						<div>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Since the 1930s, the`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>True Press</span> –
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `under various other names – has been keeping tabs on
							UC Santa Barbara and the surrounding communities,
							breaking several noteworthy stories such as the 1986
							expose of Chancellor Robert Huttenback for his
							misappropriation of UC funds, to up-to-date,
							thorough coverage of the May 23, 2014 Isla Vista
							shootings, which gained the publication mentions in
							national and international publications. The`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>
							‘ {formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `name was coined by the paper’s 1970 to 1971
							editorial board in the wake of the 1970 Bank of
							America burning in Isla Vista, attributed from
							Robert Maynard Hutchins’ quote: “A free press is the
							True Press of any democracy.”`.length))}
						</div>
					</section>
					<section key="2">
						<div>SERVICES</div>
						<div>
							The{' '}
							<span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `provides timely, relevant and essential editorial
							and feature coverage to students as well as readers
							throughout the UCSB community and Santa Barbara
							County with fairness and accuracy, whether they are
							the views of the many or those of the few`.length))}.
							<br />
							<br />
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `We open our editorial pages to all opinions and make
							our views clear only in the editorial pages, from
							which editorial decisions are based only on
							substantiated facts`.length))}.
							<br />
							<br />
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `We defend the rights of any member of the university
							communities if those rights are abridged, and
							present all sides of the case. Because publishing a
							student newspaper is our duty, we carry out that
							duty following standards of professionalism as
							outlined in the American Society of Newspaper
							Editors’ Statement of Principles`.length))}.
						</div>
						<br />
						<Link href="#">
							<a
								style={{
									color: 'var(--link-hover)',
									fontWeight: 'bold',
								}}>
								Click here to be redirected to the donations
								page.
							</a>
						</Link>
					</section>
					<section key="3">
						<div>CONTACT INFORMATION</div>
						<ul>
							<li key="0">
								Editor-in-chief e-mail: eic@truepress.com
							</li>
							<li key="0">
								Website:{' '}
								<Link href="/">
									<a style={{ color: 'var(--link-hover)' }}>
										www.truepress.online
									</a>
								</Link>
							</li>
							<li key="0">
								Facebook:{' '}
								<Link href="#">
									<a style={{ color: 'var(--link-hover)' }}>
										https://www.facebook.com/truepress
									</a>
								</Link>
							</li>
							<li key="0">
								Twitter:{' '}
								<Link href="#">
									<a style={{ color: 'var(--link-hover)' }}>
										https://www.twitter.com/truepress
									</a>
								</Link>
							</li>
							<li key="0">
								Instagram:{' '}
								<Link href="#">
									<a style={{ color: 'var(--link-hover)' }}>
										https://www.instagram.com/truepress
									</a>
								</Link>
							</li>
						</ul>
					</section>
				</article>

				<style jsx>{`
					section {
						margin-top: 1.5rem;
					}

					section div:nth-child(1) {
						font-weight: 600;
						font-size: 1.2rem;
						margin-bottom: 1rem;
					}

					li {
						margin-bottom: 1rem;
					}
				`}</style>
			</About>
		</Layout>
	);
}

export default Donate;
