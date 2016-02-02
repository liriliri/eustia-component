var cheerio = require('cheerio'),
    _ = require('./util');

module.exports = _.Class({
    initialize: function (src)
    {
        this.src = src;
        this.result = '';
        this.requires = [];
        this.styles = '';
    },
    parse: function ()
    {
        var src = this.src,
            srcForCheerio = this.transTemplateToScript(src),
            $ = cheerio.load(srcForCheerio);

        var self = this;

        $.root().children().each(function ()
        {
            var $this = $(this);

            switch (this.tagName)
            {
                case 'require': return self.require($this);
                case 'script': return self.script($this);
                case 'style': return self.style($this);
            }
        });

        this.formatRequires();
        this.prependRequire();
        this.prependStyle();

        return this.result;
    },
    transTemplateToScript: function (src)
    {
        src = src.replace(/<template\s+id="(\w+)">/g, '<script id="$1" type="text/template">');
        src = src.replace(/<\/template>/g, '</script>');

        return src;
    },
    prependRequire: function ()
    {
        var requires = this.requires.join(' ');

        if (_.trim(requires) === '') return;

        this.prepend('_(\'' + requires + '\');\n\n');
    },
    prependStyle: function ()
    {
        if (_.trim(this.styles) === '') return;

        this.prepend('var style = \'' + _.jsEncode(this.styles) + '\';\n\n');
    },
    prepend: function (str)
    {
        this.result = str + this.result;
    },
    append: function (str)
    {
        this.result += str;
    },
    formatRequires: function ()
    {
        var requires = this.requires;

        requires = _.map(requires, function (val) { return _.trim(val) });
        requires = _.unique(requires);

        this.requires = requires;
    },
    require: function ($dom)
    {
        var requires = $dom.text().split(/\s+/);

        this.requires = this.requires.concat(requires);
    },
    style: function ($dom)
    {
        var style = _.trim(_.cssMin($dom.text()));

        this.styles += ' ' + style;
    },
    script: function ($dom)
    {
        $dom.attr('type') === 'text/template' ? this.template($dom) : this.js($dom);
    },
    template: function ($dom)
    {
        var html = _.trim(_.htmlMin($dom.text()));

        this.append('var ' + $dom.attr('id') + ' = \'' + _.jsEncode(html) + '\';\n\n');
    },
    js: function ($dom)
    {
        this.append($dom.text());
    }
});