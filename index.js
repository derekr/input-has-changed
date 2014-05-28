/**
 * input-has-changed
 *
 * Will listen for keyup events on provided input and emit
 * events for when the value has changed or reverted back to
 * the original value.
 *
 * @author Derek Reynolds <drk@diy.org>
 */

/**
 * Dependencies
 */
var events = require('events');
var inherits = require('inherits');
var dom = require('dom-events');

var _filter = [
    13, 9, 16, 37, 38, 39, 40
];

/**
 * Constructor
 *
 * @param {Object} $el – Input target
 */
function InputHasChanged ($el) {
    if (!(this instanceof InputHasChanged)) return new InputHasChanged($el);

    var me = this;

    this.original = $el.value;

    function handler (e) {
        if (_filter.indexOf(e.keyCode) > -1) return;

        var val = $el.value;

        if (val !== me.original) {
            me.emit('changed', val);
        } else {
            me.emit('original', val);
        }
    }

    dom.on($el, 'keyup', handler);
}

/**
 * Inherits
 */
inherits(InputHasChanged, events.EventEmitter);

InputHasChanged.prototype.update = function (val) {
    this.original = val;
}

/**
 * Exports
 */
module.exports = InputHasChanged;
