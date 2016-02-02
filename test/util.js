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

    /* ------------------------------ isObj ------------------------------ */

    var isObj;

    _.isObj = (function ()
    {
        // @TODO

        /* function
         * isObj: Checks if value is the language type of Object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is an object, else false.
         */

        isObj = function (val)
        {
            var type = typeof val;

            return type === 'function' || type === 'object';
        };

        return isObj;
    })();

    /* ------------------------------ camelize ------------------------------ */

    var camelize;

    _.camelize = (function ()
    {
        // @TODO

        /* function
         * camelCase: Convert string to "camelCase" text.
         */

        camelize = function (str, char)
        {
            char = char || '-';

            return str.replace(new RegExp(char + '+(.)?', 'g'), function (match, char)
            {
                return char ? char.toUpperCase() : '';
            });
        };

        return camelize;
    })();

    /* ------------------------------ dasherize ------------------------------ */

    var dasherize;

    _.dasherize = (function ()
    {
        // @TODO

        /* function
         *
         * dasherize:  Convert string to "dashCase".
         */

        dasherize = function (str)
        {
            return str.replace(/([a-z])([A-Z])/, '$1-$2').toLowerCase();
        };

        return dasherize;
    })();

    /* ------------------------------ isUndef ------------------------------ */

    var isUndef;

    _.isUndef = (function ()
    {
        /* function
         *
         * isUndef: Checks if value is undefined.
         * value(*): The value to check.
         * return(boolean): Returns true if value is undefined, else false.
         *
         * ```javascript
         * _.isUndef(void 0) // -> true
         * _.isUndef(null) // -> false
         * ```
         *
         * Just a shortcut for **x === undefined**, doesn't matter that much whether you
         * use it or not.
         */

        isUndef = function (value) { return value === void 0 };

        return isUndef;
    })();

    /* ------------------------------ inherits ------------------------------ */

    var inherits;

    _.inherits = (function ()
    {
        // @TODO

        /* function
         * inherits: Inherit the prototype methods from one constructor into another.
         * Class(function): Child Class.
         * SuperClass(function): Super Class.
         */

        var objCreate = Object.create;

        function noop() {}

        inherits = function (Class, SuperClass)
        {
            if (objCreate) return Class.prototype = objCreate(SuperClass.prototype);

            noop.prototype  = SuperClass.prototype;
            Class.prototype = new noop();
        };

        return inherits;
    })();

    /* ------------------------------ has ------------------------------ */

    var has;

    _.has = (function ()
    {
        /* function
         * has: Checks if key is a direct property.
         * object(object): The object to query.
         * key(string): The path to check.
         * return(boolean): Returns true if key is a direct property, else false.
         */

        var hasOwnProp = Object.prototype.hasOwnProperty;

        has = function (obj, key)
        {
            return hasOwnProp.call(obj, key);
        };

        return has;
    })();

    /* ------------------------------ _optimizeCb ------------------------------ */

    var _optimizeCb;

    _._optimizeCb = (function ()
    {

        _optimizeCb = function (func, ctx, argCount)
        {
            if (isUndef(ctx)) return func;

            switch (argCount == null ? 3 : argCount)
            {
                case 1: return function (val)
                {
                    return func.call(ctx, val);
                };
                case 3: return function (val, idx, collection)
                {
                    return func.call(ctx, val, idx, collection);
                };
                case 4: return function (accumulator, val, idx, collection)
                {
                    return func.call(ctx, accumulator, val, idx, collection);
                }
            }

            return function ()
            {
                return func.apply(ctx, arguments);
            };
        };

        return _optimizeCb;
    })();

    /* ------------------------------ _createAssigner ------------------------------ */

    var _createAssigner;

    _._createAssigner = (function ()
    {

        _createAssigner = function (keysFunc, defaults)
        {
            return function (obj)
            {
                var len = arguments.length;

                if (defaults) obj = Object(obj);

                if (len < 2 || obj == null) return obj;

                for (var i = 1; i < len; i++)
                {
                    var src     = arguments[i],
                        keys    = keysFunc(src),
                        keysLen = keys.length;

                    for (var j = 0; j < keysLen; j++)
                    {
                        var key = keys[j];
                        if (!defaults || isUndef(obj[key])) obj[key] = src[key];
                    }
                }

                return obj;
            };
        };

        return _createAssigner;
    })();

    /* ------------------------------ _toStr ------------------------------ */

    var _toStr;

    _._toStr = (function ()
    {
        _toStr = Object.prototype.toString;

        return _toStr;
    })();

    /* ------------------------------ isFn ------------------------------ */

    var isFn;

    _.isFn = (function ()
    {
        // @TODO

        /* function
         * isFn: Checks if value is classified as a Function object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isFn = function (val) { return _toStr.call(val) === '[object Function]' };

        return isFn;
    })();

    /* ------------------------------ isNum ------------------------------ */

    var isNum;

    _.isNum = (function ()
    {
        // @TODO

        /* function
         * isNum: Checks if value is classified as a Number primitive or object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isNum = function (value) { return _toStr.call(value) === '[object Number]' };

        return isNum;
    })();

    /* ------------------------------ isStr ------------------------------ */

    var isStr;

    _.isStr = (function ()
    {
        // @TODO

        /* function
         * isStr: Checks if value is classified as a String primitive or object.
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        isStr = function (value) { return _toStr.call(value) === '[object String]' };

        return isStr;
    })();

    /* ------------------------------ allKeys ------------------------------ */

    var allKeys;

    _.allKeys = (function ()
    {
        /* function
         * allKeys: Retrieve all the names of object's own and inherited properties.
         * object(object): The object to query.
         * return(array): Returns the array of all property names.
         *
         * ```javascript
         * var obj = Object.create({ a: 0 });
         * obj.b = 1;
         * _.allKeys(obj) // -> ['a', 'b']
         * ```
         *
         * > Members of Object's prototype won't be retrieved.
         */

        allKeys = function (obj)
        {
            var ret = [], key;

            for (key in obj) ret.push(key);

            return ret;
        };

        return allKeys;
    })();

    /* ------------------------------ extend ------------------------------ */

    var extend;

    _.extend = (function ()
    {
        // @TODO

        extend = _createAssigner(allKeys);

        return extend;
    })();

    /* ------------------------------ indexOf ------------------------------ */

    var indexOf;

    _.indexOf = (function ()
    {
        // @TODO

        indexOf = function (arr, val)
        {
            return Array.prototype.indexOf.call(arr, val);
        };

        return indexOf;
    })();

    /* ------------------------------ isArrLike ------------------------------ */

    var isArrLike;

    _.isArrLike = (function ()
    {
        // @TODO

        var MAX_ARR_IDX = Math.pow(2, 53) - 1;

        isArrLike = function (val)
        {
            if (!has(val, 'length')) return false;

            var len = val.length;

            return isNum(len) && len >= 0 && len <= MAX_ARR_IDX;
        };

        return isArrLike;
    })();

    /* ------------------------------ defaults ------------------------------ */

    var defaults;

    _.defaults = (function ()
    {
        // @TODO

        defaults = _createAssigner(allKeys, true);

        return defaults;
    })();

    /* ------------------------------ keys ------------------------------ */

    var keys;

    _.keys = (function ()
    {
        /* function
         * keys: Creates an array of the own enumerable property names of object.
         * object(object): The object to query.
         * return(array): Returns the array of property names.
         */

        keys = Object.keys || function (obj)
        {
            var ret = [], key;

            for (key in obj)
            {
                if (has(obj, key)) ret.push(key);
            }

            return ret;
        };

        return keys;
    })();

    /* ------------------------------ each ------------------------------ */

    var each;

    _.each = (function ()
    {
        // @TODO

        each = function (obj, iteratee, ctx)
        {
            var i, len;

            if (isArrLike(obj))
            {
                for (i = 0, len = obj.length; i < len; i++) iteratee.call(ctx, obj[i], i, obj);
            } else
            {
                var _keys = keys(obj);
                for (i = 0, len = _keys.length; i < len; i++)
                {
                    iteratee.call(ctx, obj[_keys[i]], _keys[i], obj);
                }
            }

            return obj;
        };

        return each;
    })();

    /* ------------------------------ values ------------------------------ */

    var values;

    _.values = (function ()
    {
        /* function
         * values: Creates an array of the own enumerable property values of object.
         * object(object): The object to query.
         * return(array): The array of property values.
         *
         * ```javascript
         * values({one: 1, two: 2}); // -> [1, 2]
         * ```
         */

        values = function (obj)
        {
            var ret = [];

            each(obj, function (val) { ret.push(val) });

            return ret;
        };

        return values;
    })();

    /* ------------------------------ contain ------------------------------ */

    var contain;

    _.contain = (function ()
    {
        // @TODO

        contain = function (arr, val)
        {
            if (!isArrLike(arr)) arr = values(arr);

            return indexOf(arr, val) >= 0;
        };

        return contain;
    })();

    /* ------------------------------ extendOwn ------------------------------ */

    var extendOwn;

    _.extendOwn = (function ()
    {
        // @TODO

        extendOwn = _createAssigner(keys);

        return extendOwn;
    })();

    /* ------------------------------ isArr ------------------------------ */

    var isArr;

    _.isArr = (function ()
    {
        // @TODO

        /* function
         * isArr: Check if value is classified as an Array Object
         * value(*): The value to check.
         * return(boolean): Returns true if value is correctly classified, else false.
         */

        var nativeIsArr = Array.isArray;

        isArr = nativeIsArr || function (val)
        {
            return _toStr.call(val) === '[object Array]';
        };

        return isArr;
    })();

    /* ------------------------------ isMatch ------------------------------ */

    var isMatch;

    _.isMatch = (function ()
    {
        // @TODO

        isMatch = function (obj, attrs)
        {
            var _keys = keys(attrs),
                len   = _keys.length;

            if (obj == null) return !len;

            obj = Object(obj);

            for (var i = 0; i < len; i++)
            {
                var key = keys[i];
                if (attrs[key] !== obj[key] || !(key in obj)) return false;
            }

            return true;
        };

        return isMatch;
    })();

    /* ------------------------------ matcher ------------------------------ */

    var matcher;

    _.matcher = (function ()
    {
        // @TODO

        matcher = function (attrs)
        {
            attrs = extendOwn({}, attrs);

            return function (obj)
            {
                return isMatch(obj, attrs);
            };
        };

        return matcher;
    })();

    /* ------------------------------ _cb ------------------------------ */

    var _cb;

    _._cb = (function ()
    {

        _cb = function (val, ctx, argCount)
        {
            if (val == null) return function (val) { return val };

            if (isFn(val)) return _optimizeCb(val, ctx, argCount);

            if (isObj(val)) return matcher(val);

            return function (key)
            {
                return function (obj)
                {
                    return obj == null ? undefined : obj[key];
                }
            };
        };

        return _cb;
    })();

    /* ------------------------------ some ------------------------------ */

    var some;

    _.some = (function ()
    {
        // @TODO

        some = function (obj, predicate, ctx)
        {
            predicate = _cb(predicate, ctx);

            var _keys = !isArrLike(obj) && keys(obj),
                len   = (_keys || obj).length;

            for (var i = 0; i < len; i++)
            {
                var key = _keys ? _keys[i] : i;
                if (predicate(obj[key], key, obj)) return true;
            }

            return false;
        };

        return some;
    })();

    /* ------------------------------ map ------------------------------ */

    var map;

    _.map = (function ()
    {
        // @TODO

        map = function (obj, iteratee, ctx)
        {
            iteratee = _cb(iteratee, ctx);

            var _keys   = !isArrLike(obj) && keys(obj),
                len     = (_keys || obj).length,
                results = Array(len);

            for (var i = 0; i < len; i++)
            {
                var curKey = _keys ? _keys[i] : i;
                results[i] = iteratee(obj[curKey], curKey, obj);
            }

            return results;
        };

        return map;
    })();

    /* ------------------------------ toArr ------------------------------ */

    var toArr;

    _.toArr = (function ()
    {

        toArr = function (obj)
        {
            if (isArr(obj)) return obj;

            return isArrLike(obj) && !isStr(obj)
                   ? map(obj, function (val) { return val })
                   : [obj];
        };

        return toArr;
    })();

    /* ------------------------------ Class ------------------------------ */

    var Class;

    _.Class = (function ()
    {
        // @TODO

        /* function
         *
         * Class: Create JavaScript class.
         * methods(object): Public methods.
         * statics(object): Static methods.
         * return(function): Return function used to create instances.
         */

        var regCallSuper = /callSuper/;

        function makeClass(parent, methods, statics)
        {
            statics = statics || {};

            var ctor = function ()
            {
                var args = toArr(arguments);

                if (has(ctor.prototype, 'initialize') &&
                    !regCallSuper.test(this.initialize.toString()) &&
                    this.callSuper)
                {
                    args.unshift('initialize');
                    this.callSuper.apply(this, args);
                    args.shift();
                }

                return this.initialize
                       ? this.initialize.apply(this, args) || this
                       : this;
            };

            inherits(ctor, parent);
            ctor.superclass = ctor.prototype.superclass = parent;

            ctor.extend   = function (methods, statics) { return makeClass(ctor, methods, statics) };
            ctor.inherits = function (Class) { inherits(Class, ctor) };
            ctor.methods  = function (methods) { extend(ctor.prototype, methods); return ctor };
            ctor.statics  = function (statics) { extend(ctor, statics); return ctor };

            ctor.methods(methods).statics(statics);

            return ctor;
        }

        Class = function (methods, statics) { return Base.extend(methods, statics) };

        var Base = Class.Base = makeClass(Object, {
            className: 'Base',
            callSuper: function (name)
            {
                var superMethod = this.superclass.prototype[name];

                if (!superMethod) return;

                return superMethod.apply(this, toArr(arguments).slice(1));
            },
            toString: function ()
            {
                return this.className;
            }
        });

        return Class;
    })();

    /* ------------------------------ Select ------------------------------ */

    var Select;

    _.Select = (function ()
    {
        // @TODO

        /* class
         * Select: jQuery like dom manipulator.
         */

        function mergeArr(first, second)
        {
            var len = second.length,
                i   = first.length;

            for (var j = 0; j < len; j++) first[i++] = second[j];

            first.length = i;

            return first;
        }

        Select = Class({
            className: 'Select',
            initialize: function (selector)
            {
                this.length = 0;

                if (!selector) return this;

                if (isStr(selector)) return rootSelect.find(selector);

                if (selector.nodeType)
                {
                    this[0]     = selector;
                    this.length = 1;
                }
            },
            find: function (selector)
            {
                var ret = new Select;

                this.each(function ()
                {
                    mergeArr(ret, this.querySelectorAll(selector));
                });

                return ret;
            },
            each: function (fn)
            {
                each(this, function (element, idx)
                {
                    fn.call(element, idx, element);
                });

                return this;
            }
        });

        var rootSelect = new Select(document);

        return Select;
    })();

    /* ------------------------------ $safeNodes ------------------------------ */

    var $safeNodes;

    _.$safeNodes = (function ()
    {

        $safeNodes = function (nodes)
        {
            if (isStr(nodes)) return new Select(nodes);

            return toArr(nodes);
        };

        return $safeNodes;
    })();

    /* ------------------------------ $class ------------------------------ */

    var $class;

    _.$class = (function ()
    {

        $class = {
            add: function (nodes, name)
            {
                nodes = $safeNodes(nodes);
                var names = toArr(name);

                each(nodes, function (node)
                {
                    var classList = [];

                    each(names, function (name)
                    {
                        if (!$class.has(node, name)) classList.push(name);
                    });

                    if (classList.length !== 0) node.className += ' ' + classList.join(' ');
                });
            },
            has: function (nodes, name)
            {
                nodes = $safeNodes(nodes);

                var regName = new RegExp('(^|\\s)' + name + '(\\s|$)');

                return some(nodes, function (node)
                {
                    return regName.test(node.className);
                });
            },
            toggle: function (nodes, name)
            {
                nodes = $safeNodes(nodes);

                each(nodes, function (node)
                {
                    if ($class.has(node, name)) return $class.add(node, name);

                    $class.remove(node);
                });
            },
            remove: function (nodes, name)
            {
                nodes = $safeNodes(nodes);
                var names = toArr(name);

                each(nodes, function (node)
                {
                    each(names, function (name)
                    {
                        node.classList.remove(name);
                    });
                });
            }
        };

        return $class;
    })();

    /* ------------------------------ $css ------------------------------ */

    var $css;

    _.$css = (function ()
    {

        $css = function (nodes, name, val)
        {
            nodes = $safeNodes(nodes);

            var isGetter = isUndef(val) && isStr(name);
            if (isGetter) return getCss(nodes[0], name);

            var css = name;
            if (!isObj(css))
            {
                css = {};
                css[name] = val;
            }

            setCss(nodes, css);
        };

        function getCss(node, name)
        {
            return node.style[camelize(name)];
        }

        function setCss(nodes, css)
        {
            each(nodes, function (node)
            {
                var cssText = ';';
                each(css, function (val, key)
                {
                    cssText += dasherize(key) + ':' + addPx(key, val) + ';';
                });
                node.style.cssText += cssText;
            });
        }

        var cssNumProps = [
            'column-count',
            'columns',
            'font-weight',
            'line-weight',
            'opacity',
            'z-index',
            'zoom'
        ];

        function addPx(key, val)
        {
            var needPx = isNum(val) && !contain(cssNumProps, dasherize(key));

            return needPx ? val + 'px' : val;
        }

        return $css;
    })();

    /* ------------------------------ $insert ------------------------------ */

    var $insert;

    _.$insert = (function ()
    {

        $insert = {
            before: insertFactory('beforebegin'),
            after: insertFactory('afterend'),
            append: insertFactory('beforeend'),
            prepend: insertFactory('afterbegin')
        };

        function insertFactory(type)
        {
            return function (nodes, val)
            {
                nodes = $safeNodes(nodes);

                each(nodes, function (node)
                {
                    node.insertAdjacentHTML(type, val);
                });
            };
        }

        return $insert;
    })();

    /* ------------------------------ evalCss ------------------------------ */

    var evalCss;

    _.evalCss = (function ()
    {

        evalCss = function (style)
        {
            $insert.append('head', '<style>' + style + '</style>');
        };

        return evalCss;
    })();

    /* ------------------------------ $property ------------------------------ */

    var $property;

    _.$property = (function ()
    {

        $property = {
            html: propFactory('innerHTML'),
            text: propFactory('textContent'),
            val: propFactory('value')
        };

        function propFactory(name)
        {
            return function (nodes, val)
            {
                nodes = $safeNodes(nodes);

                if (isUndef(val)) return nodes[0][name];

                each(nodes, function (node)
                {
                    node[name] = val;
                });
            };
        }

        return $property;
    })();

    /* ------------------------------ msg ------------------------------ */

    var msg;

    _.msg = (function ()
    {
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

        return msg;
    })();

    return _;
}));