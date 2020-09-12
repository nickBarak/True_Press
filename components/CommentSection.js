import 'isomorphic-unfetch';
import { useState, useEffect } from 'react';
import Comment from './Comment';
import CommentInputs from './CommentInputs';
import { client } from '../URLs';

function CommentSection({
	articleID,
	articleTitle,
}) {
	const [commentMessage, setCommentMessage] = useState('');
	const [following, setFollowing] = useState(false);
	const [comments, setComments] = useState([]);
	const [followers, setFollowers] = useState([]);

	/* Has user signed in and are they following this article? */
	useEffect(_ => {
		/* Other data pre-rendered, this data dynamic */
		fetch(client + '/api/fetch-article-data?id=' + articleID)
			.then(res => res.json())
			.then(({ comments, followers }) => {
				setComments(comments.sort(
					({ post_date: a }, { post_date: b }) => a - b
				));
				setFollowing(followers.includes(sessionStorage.getItem('email')));
				setFollowers(followers);
			})
			.catch(e => setCommentMessage('Error fetching data') || console.log(e));
	}, []);

	return (
		<>
			<div className="comment-section">
				<div>
					<span style={{ position: 'relative' }}>
						{comments.length}
						<span
							style={{
								width: 0,
								height: 0,
								borderStyle: 'solid',
								borderWidth: '8px 0 1px 12px',
								borderColor:
									'#666666 transparent transparent transparent',
								position: 'absolute',
								right: 0,
								bottom: '-8px',
							}}
						/>
					</span>
					<span>Leave a Reply</span>
				</div>
				<strong
					style={{
						color:
							commentMessage === 'New user created'
								? 'green'
								: 'red',
						fontSize: '1.15rem',
					}}>
					{commentMessage}
				</strong>
				<CommentInputs
					setMessage={setCommentMessage}
					articleID={articleID}
					following={following}
					firstComment={comments.length === 0}
					articleTitle={articleTitle}
					mainInput
				/>
				<div
					style={{
						display: 'flex',
						marginTop: '3rem',
						justifyContent: 'space-between',
						maxWidth: '55rem',
					}}>
					<ul className="icons">
						<li
							key="0"
							style={{ marginBottom: '.15rem', marginRight: 0 }}>
							<i className="fas fa-align-left"></i>
							<span
								style={{
									marginLeft: '.5rem',
									marginRight: '.2rem',
									fontSize: '1rem',
								}}>
								{comments.filter(({email}) => email !== 'deleted').length}
							</span>
						</li>
						<li key="1">
							<i className="far fa-comments"></i>
							<span
								style={{
									marginBottom: '.15rem',
									marginLeft: '.5rem',
									fontSize: '1rem',
								}}>
								{(_ => {
									let commentCount = 0;
									let count = level => {
										level.forEach(
											({ email, replies }) =>
												(email !== 'deleted' && commentCount++ < 0) ||
												(replies.length &&
													count(replies))
										);
									};
									comments.forEach(({ replies }) =>
										count(replies)
									);
									return commentCount;
								})()}
							</span>
						</li>
						<li
							style={{
								marginLeft: '.2rem',
								marginBottom: '.15rem',
							}}
							key="2">
							<i className="fas fa-rss"></i>
							<span
								style={{
									marginLeft: '.5rem',
									fontSize: '1rem',
								}}>
								{followers.length}
							</span>
						</li>
						<li key="3" style={{ marginLeft: '.65rem' }}>
							<i
								className="fas fa-bolt"
								style={{ cursor: 'pointer' }}
								onClick={_ => {
									fetch(client + `/api/most-reacted-comment?article=${articleID}`)
										.then(res => res.json())
										.then(id => {
											document.getElementById(id).scrollIntoView();
											setTimeout(_=> window.scrollTo(0, window.scrollY - (window.innerWidth > 650
												? 5 : 60)), 500);
										});
								}}></i>
						</li>
						<li key="4" style={{ marginLeft: '.65rem' }}>
							<i
								className="fab fa-hotjar"
								style={{ cursor: 'pointer' }}
								onClick={_ => {
									fetch(client + `/api/hottest-comment?article=${articleID}`)
										.then(res => res.json())
										.then(id => {
											document.getElementById(id).scrollIntoView();
											setTimeout(_=> window.scrollTo(0, window.scrollY - (window.innerWidth > 650
												? 5 : 60)), 500);
										});
								}}></i>
						</li>
					</ul>
					<span className="comment-authors">
						<i className="fas fa-user-circle"></i>
						<span style={{ color: '#666' }}>
							{(_ => {
								let checked = [];
								let count = level => {
									level.forEach(
										({ email, replies }) =>
											checked.push(email) &&
											count(replies)
									);
								};
								count(comments);
								return new Set(checked.filter(email => email !== 'deleted')).size;
							})()}
						</span>
					</span>
				</div>
				<ul className="comments">
					{comments.map(comment => (
						<li key={comment.id}>
							<Comment
								comment={comment}
								followers={followers}
								articleID={articleID}
								articleTitle={articleTitle}
							/>
						</li>
					))}
				</ul>
			</div>

			<style jsx>{`
				.comment-section > div:nth-child(1) {
					position: relative;
					display: flex;
					margin-bottom: 4rem;
				}

				.comment-section > div:nth-child(1)::after {
					position: absolute;
					content: '';
					background-color: lightgray;
					width: 100%;
					bottom: -1.25rem;
					height: 1px;
					left: 0;
				}

				.comment-section > div:nth-child(1) > span {
					margin-right: 0.9rem;
					font-size: 1.3rem;
				}

				.comment-section > div:nth-child(1) > span:nth-child(1) {
					background-color: #666;
					padding: 0.325rem 1rem;
					font-size: 1rem;
					color: white;
				}

				li {
					margin: 0 0.5rem;
					display: flex;
					align-items: center;
				}

				.comment-section > div:nth-child(2)::after {
					content: '';
					background-color: lightgray;
					width: 100%;
					height: 1px;
					position: absolute;
					bottom: -0.95rem;
				}

				.icons {
					display: flex;
					position: relative;
					width: 9.5rem;
				}

				.icons li {
					margin: 0 0.75rem;
					color: #666;
					font-size: 1.05rem;
				}

				.icons li:nth-child(1) i {
					transform: rotateZ(3.15rad);
				}

				.icons li::before {
					border-radius: 8px;
					background-color: #555;
					text-align: center;
					font-size: 0.75rem;
					padding: 0.65rem 0;
					width: 14rem;
					left: 2%;
					top: -160%;
					color: white;
					position: absolute;
					display: none;
				}

				.icons li:hover::before {
					display: block;
				}

				.icons li:nth-child(4) i {
					color: #ffba20;
				}
				.icons li:nth-child(4) i:hover {
					color: #ffa600;
				}

				.icons li:nth-child(5) i {
					color: #ff785b;
				}
				.icons li:nth-child(5) i:hover {
					color: #fc5844;
				}

				.icons li:nth-child(1)::before {
					content: 'Comment threads';
				}
				.icons li:nth-child(2)::before {
					content: 'Thread replies';
				}
				.icons li:nth-child(3)::before {
					content: 'Followers';
				}
				.icons li:nth-child(4)::before {
					content: 'Most reacted comment';
				}
				.icons li:nth-child(5)::before {
					content: 'Hottest comment thread';
				}

				.fa-user-circle {
					color: #999;
					font-size: 1.75rem;
					margin-right: 0.6rem;
				}

				.comment-authors {
					display: flex;
					align-items: center;
					position: relative;
				}

				.comment-authors::before {
					border-radius: 8px;
					background-color: #555;
					text-align: center;
					font-size: 0.75rem;
					padding: 0.65rem 0;
					width: 14rem;
					left: -10.8rem;
					top: -160%;
					color: white;
					position: absolute;
					display: none;
					content: 'Comment authors';
				}

				.comment-authors:hover::before {
					display: block;
				}

				.comments {
					position: relative;
					margin-top: 3rem;
				}

				.comments::before {
					background-color: #f7f7f7;
					height: 1.25rem;
					width: 100%;
					content: '';
					position: absolute;
					top: -2rem;
				}

				.comments li {
					display: block;
					margin-bottom: 1.25rem;
				}
			`}</style>
		</>
	);
}

export default CommentSection;
