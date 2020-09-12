/* Converts datestrings to readable format (ex. January 1, 2020) */
export function convertDate(date) {
    let now = new Date(),
        secondsPast = (now.getTime() - date) / 1000;
    if (secondsPast < 60) {
        return parseInt(secondsPast) + ` second${parseInt(secondsPast) > 1 ? 's' : ''} ago`;
    }
    if (secondsPast < 3600) {
        return parseInt(secondsPast / 60) + ` minute${parseInt(secondsPast / 60) > 1 ? 's' : ''} ago`;
    }
    if (secondsPast <= 86400) {
        return parseInt(secondsPast / 3600) + ` hour${parseInt(secondsPast / 3600) > 1 ? 's' : ''} ago`;
    }
    return new Date(date).toLocaleDateString('default', { day: 'numeric', month: 'long', year: 'numeric' })
}

/* DB column value to URL compliant */
export function convertToPath(string) {
    return string.toLowerCase().replace(/ /g, '-').replace(/[:'!@#$%^*\(\)";{}\[\]\|~`<>\/\\?\.,]/g, '')
}

/* URL compliant value to DB column value */
export function convertFromPath(path) {
    return path.split('-').map((word, i, ary) =>
        word === 'previews' || word === 'columnsfeatures'
            ? word === 'previews' ? 'Previews:' : 'Columns/Features'
            : (i === 0 || i === ary.length - 1 || !['the', 'on', 'to', 'in', 'and', 'whats'].includes(word))
                ? !['tv', 'aj', 'cola', 'ucsb', 'uc'].includes(word)
                    ? word[0].toUpperCase() + word.slice(1)
                    : word.toUpperCase()
                : word === 'whats' ? 'What\'s' : word).join(' ')
}

/* Doesn't test if actually exists */
export function testEmail(email) {
    return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email)
}

export function copyToClipboard(text) {
    const el = document.createElement('input');
    el.value = text;
    el.style.visibility = 'none';
    el.style.height = 0;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
}

export function formatSentence(text) {
    if (!text) return '';
    text = text.toString();
    return (!/[\. ,]/.exec(text) || !text[1])
        ? text[0].toUpperCase() + ((text[1]) ? text[1].toLowerCase() + text.slice(2, text.length) : '')
        : (!/[\. ,]/.exec(text[1]) || !text[2])
            ? text[1].toUpperCase() + ((text[2]) ? text[2].toLowerCase() + text.slice(text[3], text.length) : '')
            : text[2].toUpperCase() + ((text[3]) ? text[3].toLowerCase() + text.slice(text[4], text.length) : '')
}