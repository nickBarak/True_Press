import { queryDB } from '../../db';

export default async function (req, res) {
	try {
		const [
			comments,
		] = await queryDB(`SELECT comments FROM articles WHERE id = $1`, [
			req.query.article,
        ]);
        /* Find comment thread with most total comments */
		const findHottestThread = comments => {
			const commentCounts = [];
			for (let i = 0; i < comments.length; i++) {
				let commentCount = 1;
				const countComments = replies => {
					replies.forEach(({ replies }) => {
						commentCount++;
						countComments(replies);
					});
				};
				countComments(comments[i].replies);
				commentCounts[i] = commentCount;
			}
			return commentCounts.reduce(
				(acc, cur, i) => (acc[0] >= cur ? acc : [cur, i]),
				[0, 0]
			)[1];
		};

        const hottestThreadIndex = findHottestThread(comments.comments);
		res.json(JSON.stringify(comments.comments[hottestThreadIndex].id));
	} catch (e) {
		console.log(e);
	}
}
