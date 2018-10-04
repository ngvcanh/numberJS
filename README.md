# NumberJS

## Introduce

- Listener element HTML to format value.
- Format value to number string.
- Parse number string to number.
- Get value of element
- Support editable content of elememt.

## Installation

### 1. HTML

```html
<input type="text" id="number" />
<script src="/path/to/number.js"></script>
<script>
    var options = {};
    _ftNumber.listener(document.getElementById('number'), options);
</script>
```

### 2. ReactJS

Using as global plugin. Include in `public/index.html`

```html
    <script src="%PUBLIC_URL%/number.js"></script>
</head>
```

Using in react.

```jsx
class Utility extends Component{

    componentDidMount(){
        let options = {};
        _ftNumber.listener(this.element, options);
    }

    render(){
        return (
            <input type="text" ref={e => this.element = e} />
        )
    }
}
```

## Options

### 1. struct

Type data number to format. Support values: `number`, `year`, `phone`, `currency`. Default value: `number`

```js
let options = {
    struct : 'year'
};
```

### 2. maxLength

Maximum length of element for value.

```js
let options = {
    maxLength : 4
};
```
Default:

**number, currency:** maxLength: `Infinity`

**year:** maxLength: `4`

**phone:** maxLength: `11`

## Methods

### 1. .isString(s : any) : boolean

Check variable passed is String

### 2. .isNumber(n : any) : boolean

Check variable passed is Number

### 3. .isObject(o : any) : boolean

Check variable passed is Object

### 4. .isArray(a : any) : boolean

Check variable passed is Array

### 5. .inArray(arr : Array, val : any) : boolean

Check variable passed `val` must be an element of `arr` array

### 6. .limit() : integer

Return value limit of `struct` options

### 7. .value(el : HTMLElement) : string

Return value of element passed

### 8. .separator() : string

Return separator of `struct` options

### 9. .format(value : string [, options : object]) : string

Return number string formatted with struct in options.

### 10. .parse(value : string) : number

Return number value of string passed.

### 11. .isTextbox(el : HTMLElement) : boolean

Check element passed must be a HTML Element supported

Return `true` with `input(text, number)` and another element has `editablecontent="true"` attribute.

### 12. .handleEvent(el : HTMLElement, name : string, cb : Function) : void

Add `name` event for `el` element with `cb` callback function.

### 13. .action(options) : void

Return callback function.

```js
var el = document.getElementById('example');
var options = {struct : 'year'};
_ftNumber.handleEvent(el, 'keyup', _ftNumber.action(options));
```

### 14. .listener(el : HTMLElement [, options : Object])) : void

Bind plugin for HTML element.