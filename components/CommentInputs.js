import 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { client } from '../URLs';

function CommentInputs({
	following,
	articleID,
	setMessage,
	parent,
	embedded,
	firstComment,
	mainInput,
	articleTitle,
}) {
	const [user, setUser] = useState(null);

	useEffect(_ => {
		sessionStorage.getItem('email') &&
			setUser({
				name: sessionStorage.getItem('name'),
				email: sessionStorage.getItem('email'),
			});
	}, []);

	async function postComment(
		e,
		formEl,
		setMessage,
		article_id,
		parent = null
	) {
		e.persist();
		e.preventDefault();
		let [content, name, email] = ['content', 'name', 'email'].map(
			(el, i) =>
				sessionStorage.getItem(el) ||
				formEl.children[i].children[1].value
					.replace(/^ *?/g, '')
					.replace(/ *?$/g, '')
		);
		if (!content) return;
		if ((!name && email) || (name && !email)) {
			return setMessage('There is an empty field');
		}
		if (!name && !email) {
			/* post is anonymous */
			name = 'anonymous';
			email = 'an@nymous.who';
		}
		let response = await fetch(client + '/api/post-comment', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				article_id,
				name,
				email,
				content,
				parent,
				post_date: Date.now(),
			}),
		});

		let status = await response.json(),
			msg;
		switch (status) {
			case 0:
				setMessage('');
				break;
			case 1:
				msg = 'Invalid email address';
				break;
			case 2:
				msg = 'This email is registered with a different name';
				break;
			case 3:
				msg = 'New user created';
				break;
			case 5:
				msg = 'Name not available';
				break;
			default:
				msg = 'Something went wrong';
				console.log(status);
		}
		msg && setMessage(msg);
		if (email !== 'an@nymous.who' && (!status || status === 3)) {
			sessionStorage.setItem('email', email);
			sessionStorage.setItem('name', name);
		}
		formEl.reset();

		/* maintain scroll position */
		document.location.reload();
	}

	async function followArticle(e) {
		e.persist();
		e.preventDefault();
		const form = e.currentTarget.parentElement.parentElement.parentElement;
		let email = user
				? user.email
				: e.currentTarget.parentElement.parentElement.children[1].value,
			name = user
				? user.name
				: e.currentTarget.parentElement.parentElement.parentElement
						.children[1].children[1].value;
		if (email && name) {
			let response = await fetch(client + '/api/follow-article', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						email,
						articleID,
						articleTitle,
						articleURL: client + '/articles/' + articleID,
						following,
					}),
				}),
				status = await response.json(),
				msg;
			switch (status) {
				case 0:
					setMessage('');
					break;
				case 1:
					msg = 'Invalid email address';
					break;
				case 2:
					msg = 'This email is registered with a different name';
					break;
				case 3:
					msg = 'New user created';
					break;
				case 5:
					msg = 'Name not available';
					break;
				case 6:
					msg = 'You\'re already following this article!';
					break;
				default:
					console.log(status);
					msg = 'Something went wrong';
			}
			msg && setMessage(msg);
			if (!status || status === 3) {
				if (!sessionStorage.getItem('email')) {
					sessionStorage.setItem('email', email);
					sessionStorage.setItem('name', name);
				}
				alert(
					`Your email has been ${
						following ? 'unsubscribed from' : 'subscribed to'
					} this article\'s comment activity`
				);
				form.reset();
				document.location.reload();
			}
		} else
			alert(
				`Enter your name and email in the corresponding boxes to follow this article`
			);
	}

	return (
		<>
			<form
				style={{
					position: 'relative',
					marginBottom: '2.35rem',
					marginTop: '1rem',
					maxWidth: '55rem',
				}}
				onSubmit={e =>
					postComment(
						e,
						e.currentTarget,
						setMessage,
						articleID,
						parent
					)
				}>
				<div
					style={{ position: 'relative' }}
					className="input-large-container">
					<img
						className="main-comment-input-large-img"
						src="https://secure.gravatar.com/avatar/?s=40&d=mm&r=g"
						alt="user"
					/>
					<input
						type="text"
						placeholder={`${
							firstComment ? 'Start' : 'Join'
						} the discussion...`}
					/>
				</div>
				<div
					style={{
						position: 'relative',
						display: user ? 'none' : 'block',
					}}>
					<i className="fas fa-user input-icon"></i>
					<input
						className="input-small"
						type="text"
						placeholder="Name*"
					/>
				</div>

				<div
					className="input-email-container"
					style={{
						position: 'relative',
						justifyContent: 'space-between',
					}}>
					<i className="fas fa-at input-icon"></i>
					<input
						className="input-small"
						type="text"
						placeholder="Email*"
					/>
					<span style={{ display: 'flex', alignItems: 'center' }}>
						{mainInput && (
							<span
								tabIndex={0}
								onFocus={e => {
									e.target.style.border = '1px solid black';
								}}
								onBlur={e => {
									e.target.style.border = 'none';
								}}
								onKeyDown={e =>
									e.keyCode === 13 && Simulate.click(e.target)
								}
								onClick={followArticle}
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									textAlign: 'center',
									height: '2rem',
									width: '2rem',
									marginRight: '.85rem',
								}}>
								<i
									className={`fas ${
										following ? 'fa-bell-slash' : 'fa-bell'
									}`}
									style={{
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: '#eee',
										width: '1.9rem',
										height: '1.9rem',
										color: '#999',
										border: '1px solid #ddd',
										cursor: 'pointer',
									}}></i>
							</span>
						)}
						<button className="post-comment-button">
							Post Comment
						</button>
					</span>
				</div>

				<style jsx>{`
					.post-comment-button {
						background-color: #222;
						color: #ddd;
						cursor: pointer;
						border: none;
						z-index: 2;
					}

					.post-comment-button:hover,
					.post-comment-button:focus {
						background-color: var(--theme-gold);
						color: #222;
					}

					input {
						background-color: #666;
						padding: 1.7rem 0.75rem 1.7rem 5rem;
						border: 2px solid #828282;
						color: white;
						font-family: monospace;
						margin-bottom: 0.6rem;
						font-size: ${embedded ? '.9rem' : '1rem'};
					}

					input::placeholder {
						color: #bbb;
					}

					.input-large-container input {
						width: 100%;
					}

					.input-large-container img {
						position: absolute;
						left: 1rem;
						box-shadow: 0 0 4px 2px #d8d8d8;
						border: none;
					}

					.input-small {
						font-size: 0.9rem;
						padding: 0.5rem 1.9rem;
						font-family: Lato;
					}

					.input-small:nth-child(2),
					.input-icon {
						${user ? 'visibility: hidden;' : ''}
					}

					.input-icon {
						color: #bbb;
						position: absolute;
						top: 0.65rem;
						left: 0.5rem;
					}
				`}</style>
			</form>
		</>
	);
}

export default CommentInputs;
