# eustia-component
[Eustia](https://github.com/liriliri/eustia) plugin for translating html.

> Note that this has nothing to do with web commponent, just provides an easy 
way to write eustia module with html and css.

## Installation

`npm install eustia-component`

## Usage

```javascript
module.exports = {
    util: {
        files: 'index.html',
        extension: ['js', 'html'],
        transpiler: [
            {
                test: /\.html$/,
                handler: require('eustia-component')()
            }
        ]
    }
};
```

## How it Works

It translates html format into pure javascript for later usage.

### Source Html

```html
<style>
    #msg-container {
        position: fixed;
        background: #ccc;
        top: 15px;
        left: 50%;
        width: 500px;
        margin-left: -250px;
        padding: 10px 0;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 0 2px rgba(0,0,0,.175);
        border: 1px solid #ccc;
    }
    #msg-container .content {
        color: #fff;
        font-size: 18px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    #msg-container.hidden {
        display: none;
    }
</style>

<require>$insert $class $property $css evalCss defaults</require>

<template id="msgContainer">
    <div id="msg-container" class="hidden">
        <div class="content">Hello world!</div>
    </div>
</template>

<script>
var initialized = false;

function init()
{
    $insert.append('body', msgContainer);
    evalCss(style);

    initialized = true;
}

var defOpts = {
    duration: 3000,
    background: '#9e3c2f',
    delay: 0
};

function showMsg(str, options)
{
    $property.text('#msg-container .content', str);
    $class.remove('#msg-container', 'hidden');
    $css('#msg-container', 'background', options.background);

    if (options.duration === 0) return;

    setTimeout(function ()
    {
        $class.add('#msg-container', 'hidden');
    }, options.duration);
}

msg = function (str, options)
{
    options = options || {};
    defaults(options, defOpts);

    if (!initialized) init();

    setTimeout(function ()
    {
        showMsg(str, options);
    }, options.delay);

};
</script>
```

### Generated Javascript

```javascript
var style = ' #msg-container { position: fixed; background: #ccc; top: 15px; left: 50%; width: 500px; margin-left: -250px; padding: 10px 0; text-align: center; border-radius: 5px; box-shadow: 0 0 2px rgba(0,0,0,.175); border: 1px solid #ccc; } #msg-container .content { color: #fff; font-size: 18px; font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; } #msg-container.hidden { display: none; }';

var msgContainer = '<div id=\"msg-container\" class=\"hidden\"> <div class=\"content\">Hello world!</div> </div>';

var initialized = false;

function init()
{
    $insert.append('body', msgContainer);
    evalCss(style);

    initialized = true;
}

var defOpts = {
    duration: 3000,
    background: '#9e3c2f',
    delay: 0
};

function showMsg(str, options)
{
    $property.text('#msg-container .content', str);
    $class.remove('#msg-container', 'hidden');
    $css('#msg-container', 'background', options.background);

    if (options.duration === 0) return;

    setTimeout(function ()
    {
        $class.add('#msg-container', 'hidden');
    }, options.duration);
}

msg = function (str, options)
{
    options = options || {};
    defaults(options, defOpts);

    if (!initialized) init();

    setTimeout(function ()
    {
        showMsg(str, options);
    }, options.delay);

};
```
