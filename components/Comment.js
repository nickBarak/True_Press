import { convertDate, copyToClipboard } from '../Functions';
import CommentInputs from './CommentInputs';
import { useState, useEffect } from 'react';
import 'isomorphic-unfetch';
import { client } from '../URLs';

function Comment({
	comment: {
		picture,
		name,
		email,
		content,
		post_date,
		id,
		parent,
		replies,
		articleTitle,
	},
	articleID,
	followers,
	depth = 0,
}) {
	const [replyMessage, setReplyMessage] = useState(null);
	const [following, setFollowing] = useState(false);
	const [currentUserEmail, setCurrentUserEmail] = useState(null);

	useEffect(_ => {
		setCurrentUserEmail(sessionStorage.getItem('email'));
		setFollowing(followers.includes(currentUserEmail));
	}, []);

	return (
		<>
			<div id={id} className="comment">
				<span
					style={{
						maxWidth: '6rem',
						fontSize: '.775rem',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						marginRight: '1rem',
					}}>
					<img
						className={`${
							parent ? 'comment-child-img' : 'comment-img'
						}`}
						src={
							picture ||
							'https://secure.gravatar.com/avatar/004ce453a2b46792c3e04146555a35b3?s=64&d=mm&r=g'
						}
						alt="user"
					/>
					<div
						style={{
							// color: '#00B38F',
							color: 'var(--link-hover)',
							fontSize: '13px',
							textAlign: 'center',
							maxWidth: '5rem',
							wordWrap: 'break-word',
							overflowWrap: 'break-word',
						}}>
						{name}
					</div>
				</span>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div className="row">
						<span style={{ fontSize: parent ? '14px' : '19px' }}>
							{name}
						</span>
						<span
							onClick={_ =>
								copyToClipboard(content) ||
								alert('Comment copied to clipboard')
							}>
							<i className="fas fa-link"></i>
						</span>
					</div>
					<div>{content}</div>
					<div className="row" style={{ justifySelf: 'flex-end' }}>
						{/* Toggle showing input box to reply to this comment */}
						<button
							style={{ whiteSpace: 'nowrap' }}
							onClick={e => {
								let {
									style,
								} = e.currentTarget.parentElement.parentElement.children[4];
								style.maxHeight =
									style.maxHeight === '100%' ? 0 : '100%';
								style.transform =
									style.transform === 'scaleY(1)'
										? 'scaleY(0)'
										: 'scaleY(1)';
							}}>
							{!parent ? <i className="far fa-comments"></i> : ''}{' '}
							Reply
						</button>
						<span>
							<span
								style={{
									color: '#999',
									fontSize: '.75rem',
									display: 'flex',
									flexWrap: 'nowrap',
									whiteSpace: 'nowrap',
								}}>
								{email === currentUserEmail && (
									<button
										onClick={e => {
											fetch(
												client + '/api/delete-comment',
												{
													method: 'DELETE',
													headers: {
														'Content-Type':
															'application/json',
													},
													body: JSON.stringify({
														id,
														article_id: articleID,
														email: currentUserEmail,
													}),
												}
											)
												.then(_ =>
													/* maintain scroll position */
													document.location.reload()
												)
												.catch(e => console.log(e));
										}}
										style={{
											color: 'white',
											backgroundColor: '#ff4848',
											border: 'none',
											marginRight: '.4rem',
										}}
										onMouseOver={e => {
											e.target.style.backgroundColor =
												'#ff2d2d';
										}}
										onMouseOut={e => {
											e.target.style.backgroundColor =
												'#ff4848';
										}}>
										Delete
									</button>
								)}
								<i
									className="far fa-clock"
									style={{
										marginRight: '.325rem',
										transform: 'translateY(1px)',
									}}></i>
								{convertDate(post_date)}
								{/* Toggle showing replies to this comment */}
								{replies.length ? (
									<i
										style={{
											color: 'var(--link-hover)',
											marginLeft: '.325rem',
											cursor: 'pointer',
											transition:
												'transform 300ms ease-out',
										}}
										className="fas fa-chevron-up"
										onClick={e => {
											let {
												style,
											} = e.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1];
											style.maxHeight =
												style.maxHeight &&
												style.maxHeight === '0px'
													? '100%'
													: 0;
											style.transform =
												style.transform === 'scaleY(0)'
													? 'scaleY(1)'
													: 'scaleY(0)';

											e.currentTarget.style.transform =
												e.currentTarget.style
													.transform ===
												'rotateX(180deg)'
													? 'rotateX(0)'
													: 'rotateX(180deg)';
										}}></i>
								) : (
									''
								)}
							</span>
						</span>
					</div>
					<strong
						style={{
							color:
								replyMessage === 'New user created'
									? 'green'
									: 'red',
						}}>
						{replyMessage}
					</strong>
					<div
						style={{
							transform: 'scaleY(0)',
							transformOrigin: 'top',
							transition:
								'transform 150ms ease-out, max-height 150ms ease-out',
							maxHeight: 0,
						}}>
						<CommentInputs
							following={following}
							setMessage={setReplyMessage}
							articleID={articleID}
							parent={id}
							articleTitle={articleTitle}
							embedded
						/>
					</div>
				</div>
			</div>

			<ul className="replies">
				{replies.map((reply, i) => (
					<li key={reply.id}>
						<Comment
							comment={reply}
							followers={followers}
							articleID={articleID}
							articleTitle={articleTitle}
							depth={depth + 1}
						/>
					</li>
				))}
			</ul>

			<style jsx>{`
				.comment {
					display: flex;
					height: 100%;
					${/* Every reply shorter than parent (up to 6) */ ''}
					${!depth
						? 'margin-bottom: .85rem'
						: depth === 1
						? 'width: 95%; margin-left: 5%'
						: depth === 2
						? 'width: 90%; margin-left: 10%'
						: depth === 3
						? 'width: 85%; margin-left: 15%'
						: depth === 4
						? 'width: 80%; margin-left: 20%'
						: depth === 5
						? 'width: 75%; margin-left: 15%'
						: depth === 6
						? 'width: 70%; margin-left: 30%'
						: ''};
				}

				img {
					object-fit: fill;
					box-shadow: 0 0 2px 2px #d8d8d8;
					margin-bottom: 0.5rem;
				}

				i {
					color: #999;
				}

				.row {
					display: flex;
					justify-content: space-between;
				}

				.comment > div {
					${parent
						? 'background-color: #f3f3f3; margin-bottom: .75rem;'
						: ''}
					padding: .75rem;
					font-size: 0.85rem;
					width: 100%;
				}

				.comment > div > div:nth-child(1) span {
					color: var(--link-hover);
					font-size: 1.1rem;
				}

				.comment > div > div:nth-child(2) {
					margin-top: 2rem;
					margin-bottom: 1rem;
				}

				button {
					margin-left: 0.75rem;
					color: var(--link-hover);
					border: 1px solid var(--link-hover);
					padding: 0.3rem 0.55rem;
					font-size: 0.75rem;
					cursor: pointer;
				}

				button i {
					color: var(--link-hover);
					margin-right: 0.175rem;
				}

				button:hover,
				button:hover i {
					color: white;
					background-color: var(--link-hover);
				}

				.comment > div > div:nth-child(1) > span:nth-child(2) {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 1.5rem;
					height: 1.5rem;
					cursor: pointer;
					font-size: 0.9rem;
				}

				.comment > div > div:nth-child(1) > span:nth-child(2):hover,
				.comment > div > div:nth-child(1) > span:nth-child(2):hover i {
					background-color: var(--link-hover);
					color: white;
				}

				.post-comment-button {
					background-color: #555;
					color: white;
					font-size: 0.925rem;
					padding: 0.5rem 1.25rem;
					cursor: pointer;
					border: none;
				}

				.post-comment-button:hover,
				.post-comment-button:focus {
					background-color: #404040;
				}

				.replies {
					display: block;
					transform-origin: top;
					transition: max-height 400ms ease-in-out,
						transform 400ms ease-in-out;
				}

				.replies li {
					margin-bottom: 0.4rem;
				}
			`}</style>
		</>
	);
}

export default Comment;
