import { queryDB } from '../../db';

export default async function (req, res) {
	let { id, email, article_id } = req.body;
	try {
		let [
			articleComments,
		] = await queryDB('SELECT comments FROM articles WHERE id = $1', [
			article_id,
		]);
		let [
			userComments,
		] = await queryDB('SELECT comments FROM users WHERE email = $1', [
			email,
		]);
		function deleteComment(id, level) {
			return level.forEach(comment => {
				if (comment.id === id) {
					comment.content = comment.name = comment.email = 'deleted';
				} else deleteComment(id, comment.replies);
			});
		}
		deleteComment(id, articleComments.comments);
		deleteComment(id, userComments.comments);
		await queryDB('UPDATE articles SET comments = $1 WHERE id = $2', [
			articleComments.comments,
			article_id,
		]);
		await queryDB('UPDATE users SET comments = $1 WHERE email = $2', [
			userComments.comments,
			email,
		]);
		res.json(0);
	} catch (e) {
		console.log(e);
	}
}
