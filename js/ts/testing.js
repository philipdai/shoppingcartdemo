var foo;
foo = 'foo';
var bar = function (x) {
    if (x === void 0) { x = 10; }
    return x + 10;
};
function bar2(x) {
    return x + 10;
}
;
var boo = function (x) {
    return x + 10;
};
var boo2 = function (x) { return x + 10; };
function baz(fn) {
    var faz = fn(10);
    return faz;
}
;
var x = baz(bar);

//# sourceMappingURL=testing.js.map
