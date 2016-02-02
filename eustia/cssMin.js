var regSpace = /\s+/mg;

cssMin = function (css)
{
    return css.replace(regSpace, ' ');
};