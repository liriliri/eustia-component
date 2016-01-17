jsEncode = function (str)
{
    return str.replace(/\n/g, '\\n')
              .replace(/\r/g, '\\r')
              .replace(/'/g, '\\\'')
              .replace(/"/g, '\\\"');
};