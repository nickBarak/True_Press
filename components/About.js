/* Applies consistent format for About pages */
function About({ heading, children }) {
	return (
		<div className="about" style={{ margin: '1rem 1rem 0 1rem' }}>
			<div
				style={{
					color: 'var(--link-hover)',
					fontSize: '2rem',
					marginBottom: '1.5rem',
					fontWeight: 'bold',
				}}>
				{heading}
			</div>
			{children}
		</div>
	);
}

export default About;
