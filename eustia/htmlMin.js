var regSpace = />(\s+)|(\s+)</mg;

htmlMin = function (html)
{
    return html.replace(regSpace, function (match)
    {
        if (match[0] === '>') return '> ';

        return ' <';
    });
};