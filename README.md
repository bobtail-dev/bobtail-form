# Introduction

bobtail-form is a simple implementation of two way data binding for forms, built on [bobtail](github.com/bobtail-dev/bobtail) and [bobbtail-json-cell](github.com/bobtail-dev/bobtail-json-cell). Serialization is handled by the [jquery.serialize-json](https://github.com/marioizquierdo/jquery.serializeJSON) extension, and changes are detected using [mutation-summary](https://github.com/rafaelw/mutation-summary) (itself built on MutationObservers).

The JSON structure of the form is specified by the name attributes of its controls (i.e., input, select and textarea elements), as described [here](https://github.com/marioizquierdo/jquery.serializeJSON). In addition to refreshing whenever an element's value or checked state changes, the form is reserialized if any controls are added, removed, or renamed.

We use `window.requestAnimationFrame` to schedule UI redraws when the form becomes dirty. This ensures minimal lag, as
we only need to reserialize the form at most once per redraw.

# API

## exports($formFn, serializeOpts, lag)

generates a jQuery form and a JsonCell bound to its current serialization, and returns an object containing both.

**Parameters**

**$formFn**: `function()`
Function used to create the form. Takes a single argument, the JsonCell to which the form is serialized.

**serializeOpts**: `object`
options object to pass to jquery.serializeJson

**Returns**: `{{$form: jQuery, cell: JsonCell}}`

# Example

```
let rx = require('bobtail');
let bobtailForm = require('bobtail-form').default;
let {bind, rxt} = rx;
let {tags} = rxt;
let {form, strong, input} = tags;

$('body').append(
  bobtailForm(jsonCell => form([
    input.number({name: 'base:number', value: 3}),
    input.number({name: 'exponent:number', value: 2}),
    strong(bind(() => jsonCell.data.base ** jsonCell.data.exponent))
  ])).$form
)
```

# Installation

`npm install bobtail-form`
