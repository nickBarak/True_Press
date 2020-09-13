/* Applies consistent format for About pages */
function About({ heading, children }) {
	return (
		<div className="about" style={{ margin: '1rem' }}>
			<div
				style={{
					color: 'var(--theme-gold)',
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
