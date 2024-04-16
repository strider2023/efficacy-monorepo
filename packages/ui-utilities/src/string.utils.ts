export const getProccessedString = (originalString: string, params: any) => {
    const urlParams = extractValuesInCurlyBraces(originalString);
    let paramsMap: Record<string, string> = {};
    for (const p of urlParams) {
        paramsMap[p] = params[p];
    }
    return replaceValuesInCurlyBraces(originalString, paramsMap);
}

export const extractValuesInCurlyBraces = (inputString: string) => {
    const regex = /{([^}]+)}/g;
    const matches = inputString.match(regex);
    if (matches) {
        return matches.map(match => match.slice(1, -1));
    } else {
        return [];
    }
}

export const replaceValuesInCurlyBraces = (inputString: string, valueMap: Record<string, string>) => {
    return inputString.replace(/\{([^}]+)\}/g, function (match, key) {
        return valueMap[key.trim()] || match;
    });
}

export const camelCaseToHumanReadable = (camelCaseString: string) => {
    // Replace capitals with spaces followed by the lowercase version of the letter
    // Then capitalize the first letter
    return camelCaseString
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, function (str) { return str.toUpperCase(); });
}