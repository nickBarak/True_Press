import Layout from '../../layouts';
import Link from 'next/link';
import About from '../../components/About';
import lipsum from '../../data/lipsum';

function Join() {
	return (
		<Layout>
			<About heading="Join Us">
				<div>
					Lor <span style={{ fontStyle: 'italic' }}>True Press</span>{' '}
					{lipsum.slice(3, `is constantly seeking ambitious students who are interested
					in joining our staff. After attending a brief training
					session, students may be hired for paid positions as staff
					writers, photographers, artists, copy editors, web
					developers and more. For information, email the relevant
					section on`.length)}{' '}
					<Link href="/about/staff-contact">
						<a style={{ color: 'var(--link-hover)' }}>
							our contact
						</a>
					</Link>{' '}
					{/* page any time */}
					llam fringilla.
				</div>
			</About>
		</Layout>
	);
}

export default Join;
