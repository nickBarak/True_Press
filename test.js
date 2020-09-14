function convertToPath(string) {
    return string.toLowerCase().replace(/ /g, '-').replace(/[:'!@#$%^*\(\)";{}\[\]\|~`<>\/\\?\.,]/g, '')
}

console.log(convertToPath('Arts Subcat 3'));