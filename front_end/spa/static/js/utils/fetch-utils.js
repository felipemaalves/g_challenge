export function mountQueryString(queryJson) {
    let query = '';
    if (!queryJson || Object.keys(queryJson).length <= 0)
        return query;
    query += '?'
    Object.keys(queryJson).forEach( key => {
        if (query.length > 1) query += '&';
        query += key + '=' + queryJson[key];
    });
    return query;
}