var test = require('tape');
var simulate = require('simulate');
var hasChanged = require('./');

var ic;
var i = document.createElement('input');

test('input has changed', function (t) {
    t.plan(2);

    i.value = 'test';

    ic = hasChanged(i);

    ic.on('changed', function (val) {
        t.equal(val, 'testa', 'val has changed');
    });

    ic.on('original', function (val) {
        t.equal(val, 'test', 'val is original');
    });

    i.value = 'testa';
    simulate.keyEvent(i, 'keyup');

    i.value = 'test';
    simulate.keyEvent(i, 'keyup');
});

test('new original value', function (t) {
    t.plan(2);

    /**
     * Test a new original on same input
     */
    i.value = 'testb';
    ic.update(i.value);
    ic.removeAllListeners();

    ic.on('changed', function (val) {
        t.equal(val, 'testc', 'val has changed');
    });

    ic.on('original', function (val) {
        t.equal(val, 'testb', 'val is original');
    });

    i.value = 'testc';
    simulate.keyEvent(i, 'keyup');

    i.value = 'testb';
    simulate.keyEvent(i, 'keyup');
});
