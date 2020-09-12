export const client = (process.env.NODE_ENV === 'production')
    ? 'https://www.truepress.online'
    : 'http://localhost:3000';

export default { client }