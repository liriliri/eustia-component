_('$insert');

evalCss = function (style)
{
    $insert.append('head', '<style>' + style + '</style>');
};