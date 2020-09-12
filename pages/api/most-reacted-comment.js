import { queryDB } from '../../db';

export default async function (req, res) {
	try {
		const [
			comments,
		] = await queryDB(`SELECT comments FROM articles WHERE id = $1`, [
			req.query.article,
        ]);
        const mostReactedComment = [comments.comments[0].id, comments.comments[0].replies.length];
        /* Find comment with most immediate replies */
		const findMostReactedComment = comments => {
			comments.forEach(comment => {
                if (comment.replies.length > mostReactedComment[1])
                    [mostReactedComment[0], mostReactedComment[1]] = [comment.id, comment.replies.length];
                findMostReactedComment(comment.replies);
            })
        };
        
        findMostReactedComment(comments.comments);
		res.json(JSON.stringify(mostReactedComment[0]));
	} catch (e) {
		console.log(e);
	}
}
