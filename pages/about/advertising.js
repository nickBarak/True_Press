import Layout from '../../layouts';
import Link from 'next/link';
import About from '../../components/About';
import lipsum from '../../data/lipsum';
import { useRef } from 'react';
import { formatSentence } from '../../Functions';

function Advertising() {
	const lipsumCount = useRef(0);

	return (
		<Layout>
			<About heading="Advertising">
				<div>
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Thank you for your interest in advertising with the`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span>. {formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `As
					you’ll see, it pays to reach out to UCSB students, and no
					matter your budget, our student sales representatives can
					put together an effective advertising strategy for you`.length))}.
					<br />
					<br />
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Every day, the`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>
						True Press
					</span>{' '}
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `reaches UCSB’s 22,218 students — plus more than 6,000
					full-time faculty and staff. Our competitive advertising
					rates make the`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span> {formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `your best
					value to reach the Central Coast’s most desirable consumer
					audience`.length))}.
					<br />
					<br />
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Did you know that a 2008 survey of`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span> {formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `readers
					shows that 60 percent of undergraduates have personal
					expense incomes of at least $300 a month — and UCSB students
					spend their disposable funds in ways that will benefit your
					business`.length))}:
					<ul style={{ margin: '1rem 0 1rem 2rem' }}>
						<li key="0" style={{ listStyleType: 'disc' }}>
							94% {lipsum.slice(lipsumCount.current, lipsumCount.current += `go out to a restaurant at least once a month,
							and two-thirds spend at least $300 a year dining
							out`.length)}.
						</li>
						<li key="1" style={{ listStyleType: 'disc' }}>
							85% {lipsum.slice(lipsumCount.current, lipsumCount.current += `plan to buy a computer, digital camera, stereo
							system, iPod, MP3 player, or other electronic item
							in the next 12 months`.length)}.
						</li>
						<li key="2" style={{ listStyleType: 'disc' }}>
							79% {lipsum.slice(lipsumCount.current, lipsumCount.current += `spend money on spas, beauty treatments or other
							personal care each month`.length)}.
						</li>
						<li key="3" style={{ listStyleType: 'disc' }}>
							75% {lipsum.slice(lipsumCount.current, lipsumCount.current += `buy clothes at least once a month`.length)}.
						</li>
						<li key="4" style={{ listStyleType: 'disc' }}>
							63% {lipsum.slice(lipsumCount.current, lipsumCount.current += `spend money in bars or night clubs in a typical
							month`.length)}.
						</li>
					</ul>
				</div>
				<div>
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `No artwork? No problem. Our designers are happy to work with
					you to create custom print and online advertisements. For
					all advertising inquiries, call (805) 893-3828`.length))}.
					<br />
					<br />
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Please see our “Rates and Services” and “Classified Ads”
					pages for more information, or click`.length))}{' '}
					<Link href="">
						<a style={{ color: 'var(--link-hover)' }}>here</a>
					</Link>{' '}
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `to download a printable PDF of our Rate Card`.length))}.
					<br />
					<br />
				</div>
				{/* <img
					src="https://i2.wp.com/dailynexus.com/wp-content/uploads/2019/10/Rate-Card-2019-2020-1_Page_1-792x1024.jpg?resize=792%2C1024"
					alt="advertising"
				/>
				<img
					src="https://i1.wp.com/dailynexus.com/wp-content/uploads/2019/10/Rate-Card-2019-2020-1_Page_2-792x1024.jpg?resize=792%2C1024"
					alt="advertising"
				/>
				<img
					src="https://i2.wp.com/dailynexus.com/wp-content/uploads/2019/10/Rate-Card-2019-2020-1_Page_3-792x1024.jpg?resize=792%2C1024"
					alt="advertising"
				/>
				<img
					src="https://i2.wp.com/dailynexus.com/wp-content/uploads/2019/10/Rate-Card-2019-2020-1_Page_4-792x1024.jpg?resize=792%2C1024"
					alt="advertising"
				/> */}
				<ul>
					<li>
						<div
							style={{
								fontWeight: 'bold',
								textDecoration: 'underline',
								fontSize: '1.05rem',
							}}>
							LINEATI RONI:
						</div>
						<div>
							$XX.XX pin lores — Arialos ito tellitorusien
							<br />
							wasiti belliden ito locali menmar.
						</div>
					</li>
					<li>
						<div
							style={{
								fontWeight: 'bold',
								textDecoration: 'underline',
								fontSize: '1.05rem',
							}}>
							COPUTI RONI:
						</div>
						<div>
							$XX.XX pin lores — Arialos ito menmar
							<br />
							derialis, coolifus, oniferusien ato illiparti.
						</div>
					</li>
					<li>
						<div
							style={{
								fontWeight: 'bold',
								textDecoration: 'underline',
								fontSize: '1.05rem',
							}}>
							NOTERI UN TELLIBEN RONI:
						</div>
						<div>
							$XX.XX pin lores —
							<br />
							Arialos ito ausi origus,
							<br />
							nun iferus tellitorusien.
							<br />
							$XX.XX pin lores — Arialos ito ausi eneral
							<br />
							telitorusien.
						</div>
					</li>
					<li>
						<div
							style={{
								fontWeight: 'bold',
								textDecoration: 'underline',
								fontSize: '1.05rem',
							}}>
							MALIFUS RONI:
						</div>
						<div>
							$XX.XX pin lores — Arialos ito menmar
							<br />
							derialis, coolifus, ato oniferusien.
						</div>
					</li>
					<li>
						<div
							style={{
								fontWeight: 'bold',
								textDecoration: 'underline',
								fontSize: '1.05rem',
							}}>
							VALIOSI RONI:
						</div>
						<div>$XX.XX pin lores</div>
					</li>
					<li>
						<div
							style={{
								fontWeight: 'bold',
								textDecoration: 'underline',
								fontSize: '1.05rem',
							}}>
							SESTI DU PIOR:
						</div>
						<div>
							Tu Sesti — $XXX pin lores
							<br />
							Foreli Non Sesti — $XXX
						</div>
					</li>
				</ul>

				<style jsx>{`
					li {
						margin-top: 1.5rem;
					}
				`}</style>
			</About>
		</Layout>
	);
}

export default Advertising;
