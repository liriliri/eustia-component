// Built by eustia.
module.exports = (function ()
{
    var _ = {};

    /* ------------------------------ jsEncode ------------------------------ */

    var jsEncode;

    _.jsEncode = (function ()
    {
        jsEncode = function (str)
        {
            return str.replace(/\n/g, '\\n')
                      .replace(/\r/g, '\\r')
                      .replace(/'/g, '\\\'')
                      .replace(/"/g, '\\\"');
        };

        return jsEncode;
    })();

    /* ------------------------------ ltrim ------------------------------ */

    var ltrim;

    _.ltrim = (function ()
    {
        // @TODO

        var regSpace = /^\s+/;

        ltrim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            var start   = 0,
                len     = str.length,
                charLen = chars.length,
                found   = true,
                i, c;

            while (found && start < len)
            {
                found = false;
                i = -1;
                c = str.charAt(start);

                while (++i < charLen)
                {
                    if (c === chars[i])
                    {
                        found = true;
                        start++;
                        break;
                    }
                }
            }

            return (start >= len) ? '' : str.substr(start, len);
        };

        return ltrim;
    })();

    /* ------------------------------ rtrim ------------------------------ */

    var rtrim;

    _.rtrim = (function ()
    {
        // @TODO

        var regSpace = /\s+$/;

        rtrim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            var end     = str.length - 1,
                charLen = chars.length,
                found   = true,
                i, c;

            while (found && end >= 0)
            {
                found = false;
                i = -1;
                c = str.charAt(end);

                while (++i < charLen)
                {
                    if (c === chars[i])
                    {
                        found = true;
                        end--;
                        break;
                    }
                }
            }

            return (end >= 0) ? str.substring(0, end + 1) : '';
        };

        return rtrim;
    })();

    /* ------------------------------ trim ------------------------------ */

    var trim;

    _.trim = (function ()
    {
        // @TODO

        var regSpace = /^\s+|\s+$/g;

        trim = function (str, chars)
        {
            if (chars == null) return str.replace(regSpace, '');

            return ltrim(rtrim(str, chars), chars);
        };

        return trim;
    })();

    return _;
})();