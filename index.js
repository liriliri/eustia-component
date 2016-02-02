var HtmlConverter = require('./lib/HtmlConverter');

module.exports = function ()
{
    return function (src)
    {
        return new HtmlConverter(src).parse();
    };
};
