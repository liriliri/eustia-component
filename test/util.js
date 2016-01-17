// Built by eustia.
(function(root, factory)
{
    if (typeof define === 'function' && define.amd)
    {
        define([], factory);
    } else if (typeof module === 'object' && module.exports)
    {
        module.exports = factory();
    } else { root._ = factory() }
}(this, function ()
{
    var _ = {};

    if (typeof window === 'object' && window._) _ = window._;

    /* ------------------------------ template ------------------------------ */

    var template;

    _.template = (function ()
    {
        // @TODO

        var regEvaluate = /<%([\s\S]+?)%>/g,
            regInterpolate = /<%=([\s\S]+?)%>/g,
            regEscape = /<%-([\s\S]+?)%>/g,
            regMatcher = RegExp([
                regEscape.source,
                regInterpolate.source,
                regEvaluate.source
            ].join('|') + '|$', 'g');

        var escapes = {
            "'":      "'",
            '\\':     '\\',
            '\r':     'r',
            '\n':     'n',
            '\u2028': 'u2028',
            '\u2029': 'u2029'
        };

        var regEscapeChar = /\\|'|\r|\n|\u2028|\u2029/g;

        var escapeChar = function(match) {
            return '\\' + escapes[match];
        };

        template = function (text) {
            var index = 0,
                source = "__p+='";

            text.replace(regMatcher, function (match, escape, interpolate, evaluate, offset) {
                source += text.slice(index, offset).replace(regEscapeChar, escapeChar);
                index = offset + match.length;

                if (escape) {
                    source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
                } else if (interpolate) {
                    source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
                } else if (evaluate) {
                    source += "';\n" + evaluate + "\n__p+='";
                }

                return match;
            });

            source += "';\n";
            source = 'with(obj||{}){\n' + source + '}\n';
            source = "var __t,__p='',__j=Array.prototype.join," +
                "print=function(){__p+=__j.call(arguments,'');};\n" +
                source + 'return __p;\n';

            var render = new Function('obj', 'util', source);

            return function (data) {
                return render.call(null, data, _);
            };
        };

        return template;
    })();

    /* ------------------------------ msg ------------------------------ */

    var msg;

    _.msg = (function ()
    {
        // This is the comment!
        var message = '\r\n<div class=\"msg\"><%=msg%></div>\r\n';
        var tpl = template(message);
        msg = function (str)
        {
            return tpl({ msg: str });
        };

        return msg;
    })();

    return _;
}));