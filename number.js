"use strict";

const _ftNumber = {};

_ftNumber.isString = function(s){
    return typeof(s) === String.name.toLowerCase() || s instanceof String || Object.prototype.toString.call(s) === '[object String]';
};

_ftNumber.isNumber = function(n){
    return typeof(n) === Number.name.toLowerCase() || n instanceof Number || Object.prototype.toString.call(n) === '[object Number]';
};

_ftNumber.isObject = function(o){
    return typeof(o) === Object.name.toLowerCase() || o instanceof Object || Object.prototype.toString.call(o) === '[object Object]';
};

_ftNumber.isArray = function(a){
    return typeof(a) === Object.name.toLowerCase() && (a instanceof Array || Object.prototype.toString.call(a) === '[object Array]');
};

_ftNumber.inArray = function(arr, val){
    return this.isArray(arr) && arr.indexOf(val) > -1;
};

_ftNumber.limit = function(struct){
    switch(struct){
        case 'phone' : return 11;
        case 'year' : return 4;
        default: return Infinity;
    }
};

_ftNumber.value = function(el){
    if (this.isTextbox(el)){
        return el instanceof HTMLInputElement ? el.value : el.innerText;
    }
    return null;
};

_ftNumber.separator = function(struct){
    switch(struct){
        case 'number': 
        case 'currency': return ',';
        case 'phone' : return ' ';
        default: return '';
    }
};

_ftNumber.format = function(value, options){
    let s = 'number';
    value = value.toString();

    if (this.isObject(options)){
        if ('struct' in options && this.isString(options.struct)) s = options.struct.toLowerCase();
    }

    switch(s){
        case 'number':
            let match = value.match(/^\s*(\-|\+)?\s*[\s\d\,\.]+/g);
            match = (this.isArray(match) ? match[0] : '').replace(/\s|\,|\+/g, '');

            let arr = match.split('.');
            let d = arr.shift();
            let f = arr.join('');
            let l = /\.$/g.test(match);

            let c1 = d.substr(0, 1);
            let c2 = d.substr(1);

            let c = '-.0'.split('.').indexOf(c1) > -1 ? c2.replace(/^0+/g, '') : c1 + c2 ;
            c = c.split('').reverse().join('').match(/.{1,3}/g);
            c = (this.isArray(c) ? c.join(this.separator(s)) : '').split('').reverse().join('');

            f = f.replace(/0+$/g, '');
            f = f.match(/.{1,3}/g);
            f = this.isArray(f) ? f.join(',') : '';

            return ('-' === c1 ? c1 : '') + c + (f || l ? '.' : '') + f;
        case 'year':
            let find = value.match(/^\s*\d{0,4}/g);
            return (this.isArray(find) ? find[0] : '').replace(/\s/g, '');
        case 'phone':

            break;
        case 'currency':

            break;
        default:
    }
}
_ftNumber.parse = function(value){
    return Number(this.format(value).replace(/\,/g, ''));
}

_ftNumber.isTextbox = function(el){
    if (!!el && el instanceof HTMLElement){
        if (el instanceof HTMLInputElement){
            return 'text.number'.split('.').indexOf(el.type.toLowerCase()) > -1;
        }
        else{
            try{
                let contentEditable = JSON.parse(el.contentEditable);
                return contentEditable;
            }
            catch(e){}
        }
    }
    return !1;
};

_ftNumber.handleEvent = function(el, name, cb){
    if (!!el && cb instanceof Function){
        if ('addEventListener' in el) el.addEventListener(name, cb);
        else if ('attachEvent' in el) el.attachEvent('on' + name, cb);
        else el['on' + name] = cb;
    }
};

_ftNumber.action = function(options){
    let struct = this.isObject(options) ? options.struct : 'number';
    return function(evt){
        let el = this instanceof HTMLElement ? this : evt.target;
        let self = this === _ftNumber ? this : _ftNumber;

        let key = evt.which || evt.keyCode || evt.charCode || 0;
        let curPos = el.selectionStart;
        let value = self.value(el);

        let sep1 = (value.substr(0, curPos).match(/\,/g) || []).length;
        let fm = self.format(value, options);
        let sep2 = (fm.substr(0, curPos).match(new RegExp(self.separator(struct), 'g')) || []).length;
        
        curPos += Number(sep2 > sep1);
        el.value = fm;
        [37, 38, 39, 40].indexOf(key) === -1 && el.setSelectionRange(curPos, curPos);
    }
    
};

_ftNumber.listener = function(el, options){
    if (this.isTextbox(el)){
        let struct = this.isObject(options) ? options.struct : 'number';
        let limit = this.isObject(options) && this.isNumber(options.maxLength) ? parseInt(Math.abs(options.maxLength)) : this.limit(struct);

        this.handleEvent(el, 'keypress', function(evt){
            let key = evt.which || evt.keyCode || evt.charCode || 0;
            [43, 45, 46, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57].indexOf(key) > -1 && 
            _ftNumber.value(el).length < limit ||
            evt.preventDefault();
        });

        this.handleEvent(el, 'keyup', this.action(options));
        this.handleEvent(el, 'paste', this.action(options));
        this.handleEvent(el, 'cut', this.action(options));
        this.handleEvent(el, 'change', this.action(options));
    }
};