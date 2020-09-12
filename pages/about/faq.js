import Layout from '../../layouts';
import About from '../../components/About';
import lipsum from '../../data/lipsum';
import { useRef } from 'react';
import { formatSentence } from '../../Functions';

function FAQ() {
	const lipsumCount = useRef(0);

	return (
		<Layout>
			<About heading="FAQ">
				<ul>
					<li key="0">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `How often does the`.length)))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `print`.length))}?
						</div>
						<div>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `The newspaper prints on Thursday, with online
							content produced Monday through Friday during the
							regular school year except on university holidays.
							Typically, only one or two issues are published
							during the summer session`.length))}.
						</div>
					</li>
					<li key="1">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `How do I join the`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `staff`.length))}?
						</div>
						<div>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `The newspaper holds quarterly training sessions for
							those interested in joining the newspaper staff in
							the first few weeks of each quarter. No previous
							experience is required for most sections. After
							publishing a certain number of articles, which
							varies by section, a writer may be promoted to the
							position of staff writer at which point they will be
							paid per article`.length))}.
						</div>
					</li>
					<li key="2">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Who is in charge of the`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>
							?
						</div>
						<div>
							Ame{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `is an independent student-run publication. The
							editor-in-chief oversees the editorial content of
							the newspaper, while the managing editor oversees
							its fiscal operations`.length))}.
						</div>
					</li>
					<li key="3">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Where does the`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `receive its funding`.length))}?
						</div>
						<div>
							Pont{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `receives about two thirds of its funds from
							advertising revenue. The other one third is derived
							from a quarterly lock-in fee, which is voted upon by
							students every two years`.length))}.
						</div>
					</li>
					<li key="4">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `How do I submit an opinion piece`.length))}?
						</div>
						<div>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Opinion columns are 600 to 800 words long. The`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `will not print responses to responses. For example,
							if someone writes a response to an opinion piece, a
							second party may not write another letter in
							response to that secondary piece. This is to prevent
							constant back and forth arguments between readers so
							that we may continue to publish fresh and timely
							material. Readers should submit their pieces to`.length))}{' '}
							<span style={{ color: 'var(--link-hover)' }}>
								opinion@truepress.com
							</span>
							.
						</div>
					</li>
					<li key="5">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `What is the editorial policy for the opinion`.length))}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `section`.length))}?
						</div>
						<div>
							All submissions become property of the{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `and cannot be printed in other publications without
							permission. Opinion pieces may be edited for length
							and clarity. This is to allow the maximum amount of
							opinion pieces as possible. Brevity is appreciated`.length))}.
							<br />
							<br />
							Istu{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `will not publish press releases or pieces that
							solely serve to advertise an event or organization.
							The opinion page is for opinions, not ads. Also,
							since our focus is localized, we will not accept
							submissions from those outside of the community. We
							accept submissions from all UCSB staff, students and
							alumni, as well as those from residents living in
							Isla Vista, Goleta or Santa Barbara`.length))}.
						</div>
					</li>
					<li key="6">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `What is the`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								truepress.com
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `comment policy`.length))}?
						</div>
						<div>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `We encourage all of our readers to submit comments
							on our website. Comments made on`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								truepress.com
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `are not pre-moderated, but can be removed if they
							violate the policy that follows. Any comment may be
							used in the print edition of the Nexus, and we ask
							that you keep your comments brief and on topic`.length))}.
							<br />
							<br />
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `We will delete comments that`.length))}:
							<ul style={{ margin: '1rem 0 1rem 2rem' }}>
								<li
									key="1"
									style={{
										listStyleType: 'disc',
										margin: 0,
									}}>
									{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `attacks a named or identified person or`.length))}
									group unreasonably.
								</li>
								<li
									key="2"
									style={{
										listStyleType: 'disc',
										margin: 0,
									}}>
									{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `attacks or demeans one’s race, gender,`.length))}
									religion, disability, ethnicity, sexual
									orientation or otherwise.
								</li>
								<li
									key="3"
									style={{
										listStyleType: 'disc',
										margin: 0,
									}}>
									{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `threatens or encourages violence and/or`.length))}
									illegal behavior.
								</li>
								<li
									key="4"
									style={{
										listStyleType: 'disc',
										margin: 0,
									}}>
									{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `contains racial epithets, sexual`.length))}
									explicitness or excessive obscenities.
								</li>
								<li
									key="5"
									style={{
										listStyleType: 'disc',
										margin: 0,
									}}>
									{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `contains personal information.`.length))}
								</li>
								<li
									key="6"
									style={{
										listStyleType: 'disc',
										margin: 0,
									}}>
									{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `is completely off-topic or determined to `.length))}be
									spam.
								</li>
							</ul>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Comments may be removed or turned off for an article
							if there are concerns regarding an individual’s
							safety. As of May 2020, readers must provide their
							name and email address in order to post a comment`.length))}.
							<br />
							<br />
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `If you believe that your comment was deleted
							inappropriately, please email`.length))}{' '}
							<span style={{ color: 'var(--link-hover)' }}>
								news@truepress.com.
							</span>
						</div>
					</li>
					<li key="7">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `How do I submit a complaint, correction or`.length))}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `retraction request`.length))}?
						</div>
						<div>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `All requests can be e-mailed to the editor-in-chief
							at`.length))}{' '}
							<span style={{ color: 'var(--link-hover)' }}>
								eic@truepress.com
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `or delivered by phone at (805) 893-2691. If you
							believe a factual error was made in a`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `article, please call our office immediately. If a
							correction request is not made within a year of
							publication, it becomes exceedingly difficult for
							our staff to investigate your claim. As such, any
							request made after one year of publication will
							require the reader to provide the burden of proof`.length))}.
							<br />
							<br />
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `With regards to retraction requests, please know
							that these are rarely granted. For a retraction to
							occur, the article in question would have to contain
							more fallacy than fact or be wrong at its very core.
							As a newspaper, we are obligated to preserve these
							historical records. Once an issue is published, you
							cannot retract an opinion piece or a quote you
							willingly gave to a reporter. Police reports are
							also public record. We will not remove any article
							from our print or online editions unless severe
							factual errors have occurred. Personal reasons are
							not acceptable grounds for a retraction`.length))}.
						</div>
					</li>
					<li key="8">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `How do I purchase an advertisement`.length))}?
						</div>
						<div>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Interested parties can contact our advertising
							office by phone at (805) 893-3828 or email`.length))}{' '}
							<span style={{ color: 'var(--link-hover)' }}>
								production@truepress.com.
							</span>
						</div>
					</li>
					<li key="9">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `How do I pitch a story idea`.length))}?
						</div>
						<div>
							Posi{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `has several desk editors who are assigned to
							specific sections. The county news editor handles
							news pertaining to Isla Vista and Santa Barbara
							County, while the university news editor reports on
							news related to the campus and the University of
							California. The sports editors handle sports, and
							the Artsweek editors report on arts and
							entertainment`.length))}.
							<br />
							<br />
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Please call or e-mail your story ideas to these
							editors with a brief description. Also include any
							helpful contact information or press releases. All
							articles are written by`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								Nexus
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `staffers. We do not accept freelance work unless it
							is for the opinion page, which is welcome to all
							members of the community`.length))}.
						</div>
					</li>
					<li key="10">
						<div
							style={{
								fontWeight: 'bold',
								marginBottom: '.85rem',
							}}>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Where does the`.length))}{' '}
							<span style={{ fontStyle: 'italic' }}>
								True Press
							</span>{' '}
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `print`.length))}?
						</div>
						<div>
							{formatSentence(lipsum.slice(lipsumCount.current, lipsumCount.current += `Our newspaper is printed at the Santa Barbara
							News-Press printing facility located in Goleta`.length))}.
						</div>
					</li>

					<style jsx>{`
						li {
							margin-top: 1.5rem;
						}
					`}</style>
				</ul>
			</About>
		</Layout>
	);
}

export default FAQ;
