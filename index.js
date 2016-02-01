var cheerio = require('cheerio'),
    _ = require('./lib/util');

module.exports = function (options)
{
    return function (src)
    {
        var ret = '';

        src = src.replace(/<template\s+id="(\w+)">/g, '<script id="$1" type="text/template">');
        src = src.replace(/<\/template>/g, '</script>');

        var $ = cheerio.load(src);

        $.root().children().each(function ()
        {
            var $this = $(this);

            if (this.tagName === 'require') return ret += '_(\'' + _.trim($this.text()) + '\');\n';

            if (this.tagName === 'script')
            {
                if ($this.attr('type') === 'text/template')
                {
                    return ret += 'var ' + $this.attr('id') + ' = \'' +
                        _.jsEncode($this.text()) + '\';\n';
                }

                return ret += _.trim($this.text());
            }
        });

        return ret;
    };
};
