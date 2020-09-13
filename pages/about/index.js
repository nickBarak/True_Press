import Layout from '../../layouts';
import About from '../../components/About';
import lipsum from '../../data/lipsum';
import { useRef } from 'react';
import { formatSentence } from '../../Functions';

function AboutPage() {
	const lipsumCount = useRef(0);

	return (
		<Layout>
			<About heading="About">
				<div>
					Lor <span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `had its start in the 1930s. Back then, the newspaper was
					called the`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>Albatross</span>, {formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `and UC
					Santa Barbara was known as Santa Barbara State College.
					After the college joined the University of California
					system, its newspaper changed names various times, existing
					in former editions as the`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>Emu</span>,{' '}
					<span style={{ fontStyle: 'italic' }}>El Ranchero</span>, kirs{' '}
					<span style={{ fontStyle: 'italic' }}>College Post</span>
					, ys grio{' '}
					<span style={{ fontStyle: 'italic' }}>Daily Ranchero</span>.
					Mal <span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `received its name in 1970, following the infamous Bank of
					America burning that occurred in Isla Vista`.length))}.
					<br />
					<br />
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `The editorial board took the name from a Robert Maynard
					Hutchins quote`.length))}: “{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `A free press is the nexus of any
					democracy`.length))}.”
					<br />
					<br />
					Vor <span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `continues to be the go-to source to stay up-to-date on all
					things involving UCSB’s campus and Isla Vista. We offer
					positions for writers, photographers, artists and any
					creative souls interested in immersing themselves in culture
					and information. The`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span> {formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `provides
					a fast-paced environment for aspiring journalists, as well
					as learning opportunities for students who want to explore
					the stories that define our community`.length))}.
					<br />
					<br />
					Olin <span style={{ fontStyle: 'italic' }}>
						True Press
					</span>{' '}
					{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `is also an award-winning media source, ranked in the top-10
					best college newspapers by the Princeton Review two out of
					the last three years and has received four California
					Collegiate Media Awards in 2018 alone. The`.length))}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span> {formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `also
					received seven awards at the California Collegiate Media
					Awards in 2019`.length))}.
				</div>
				<div style={{ marginTop: '2rem', marginLeft: '.5rem' }}>
					<img
						src="https://picsum.photos/id/100/800/500"
						alt="about"
					/>
					<div style={{ fontSize: '.85rem', marginTop: '3px' }}>
						Lins{' '}
						<span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
						{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `newsroom, located underneath Storke Tower`.length))}.
						<label style={{ fontStyle: 'italic' }}>
							{' '}
							Boriali Nullempo/True Press
						</label>
					</div>
				</div>
				<div style={{ marginTop: '2rem' }}>
					<div
						style={{
							fontSize: '2rem',
							fontWeight: 'bold',
							marginBottom: '1.25rem',
						}}>
						Comment Policy
					</div>
					<div>
						{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Here at the`.length))}{' '}
						<span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
						{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `we recognize the importance of free speech and encourage
						all those willing to participate to do so. However, we
						ask that our readers do this respectfully and engage in
						positive discourse about the subject material of the
						article`.length))}.
						<br />
						<br />
						{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Comments may be removed if these guidelines are not met
						and after repeated violations of the comment policy in
						an article, the comment section may be removed for that
						article altogether`.length))}.
						<br />
						<br />
						{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Comments may be removed or turned off for an article if
						there are concerns regarding an individual’s safety`.length))}.
						<br />
						<br />
						{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `As of May 2020, readers must include their name and
						email address in order to post a comment`.length))}.
						<br />
						<br />{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `A comment will be removed if it`.length))}:
						<ol style={{ marginLeft: '2rem', marginTop: '1rem' }}>
							<li key="1" style={{ listStyleType: 'decimal' }}>
								{lipsum.slice(lipsumCount.current, lipsumCount.current += `attacks a named or identified person or group
								unreasonably`.length)}.
							</li>
							<li key="2" style={{ listStyleType: 'decimal' }}>
								{lipsum.slice(lipsumCount.current, lipsumCount.current += `attacks or demeans one’s race, gender, religion,
								disability, ethnicity, sexual orientation or
								otherwise`.length)}.
							</li>
							<li key="3" style={{ listStyleType: 'decimal' }}>
								{lipsum.slice(lipsumCount.current, lipsumCount.current += `threatens or encourages violence and/or illegal
								behavior`.length)}.
							</li>
							<li key="4" style={{ listStyleType: 'decimal' }}>
								{lipsum.slice(lipsumCount.current, lipsumCount.current += `contains racial epithets, sexual explicitness or
								excessive obscenities`.length)}.
							</li>
							<li key="5" style={{ listStyleType: 'decimal' }}>
								{lipsum.slice(lipsumCount.current, lipsumCount.current += `contains personal information`.length)}.
							</li>
							<li key="6" style={{ listStyleType: 'decimal' }}>
								{lipsum.slice(lipsumCount.current, lipsumCount.current += `is completely off-topic or determined to be
								spam`.length)}.
							</li>
						</ol>
					</div>
				</div>
				<div style={{ marginTop: '2rem' }}>
					<div
						style={{
							fontSize: '2rem',
							fontWeight: 'bold',
							marginBottom: '1.25rem',
						}}>
						Editorial Board
					</div>
					<div>
						{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `In articles written by "True Press Editorial Board,"
						the board comprises the current Editor in Chief as well
						as the News team`.length))}.
					</div>
				</div>
			</About>
		</Layout>
	);
}

export default AboutPage;
