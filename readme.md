[![testling badge](https://ci.testling.com/derekr/input-has-changed.png)](https://ci.testling.com/derekr/input-has-changed)

# input-has-changed
#### Event emitter for common keyup input interaction changes.

Emits relevant events when the input has actually changed.

```
npm install input-has-changed
```

# Usage

```js
var hasChanged = require('input-has-changed');

var i = document.createElement('input');
i.value = 'initial value';

var hc = hasChanged(i);

hc.on('changed', function (val) { console.log(val); });
hc.on('original', function (val) { console.log(val); });

i.value = 'initial value +'; // on keyup will emit `hc#changed`
i.value = 'initial value'; // on keyup will emit `hc#original`

hc.update('new value');

i.value = 'new value +'; // on keyup will emit `hc#changed`
i.value = 'new value'; // on keyup will emit `hc#original`
```

## var hc = hasChanged(input)

Pass in an `input[type=text|password|email...]` element. A `keyup` handler
will be bound to it and filter out nav keys like arrows and tabbing.

## hc#changed

Emitted if the val on keyup is different than the original value.

## hc#original

Emitter if the val on key is the same as the original value.

## hc.update(val)

Update the original value. This makes it easy to change behavior without
worrying about rebinding events.
