# eustia-component
[Eustia](https://github.com/liriliri/eustia) plugin for html component.

```html
<script>
// This is the comment!
</script>

<require>template</require>

<template name="message">
<div class="msg"><%=msg%></div>
</template>

<script>
var tpl = template(message);
msg = function (str)
{
    return tpl({ msg: str });
};
</script>
```

```javascript
// This is the comment!
_('template');
var message = '\r\n<div class=\"msg\"><%=msg%></div>\r\n';
var tpl = template(message);
msg = function (str)
{
    return tpl({ msg: str });
};
```
