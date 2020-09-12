import Layout from '../../layouts';
import About from '../../components/About';
import lipsum from '../../data/lipsum';

function LegalNotices() {
	return (
		<Layout>
			<About heading="Legal Notices">
				<div>
					{lipsum.slice(0, `Copyright 2000-2015. All rights reserved. All content,
					including articles, photographs, graphics and design, is
					owned by the`.length+100)}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span> {lipsum.slice(`Copyright 2000-2015. All rights reserved. All content,
					including articles, photographs, graphics and design, is
					owned by the`.length+100, `at
					the University of California, Santa Barbara. No part of
					these documents may be reproduced, in part or in full, in
					print format or digital format, without express written
					permission from the`.length+100)}{' '}
					<span style={{ fontStyle: 'italic' }}>True Press</span>.
				</div>
			</About>
		</Layout>
	);
}

export default LegalNotices;
