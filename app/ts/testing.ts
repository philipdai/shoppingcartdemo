var foo: string ;
foo = 'foo';

var bar = function(x = 10) {
	return x + 10;
};

function bar2(x: number) {
	return x + 10;
};

var boo = (x: number) => {
	return x + 10;
};

var boo2 = (x: number) => x + 10;

function baz(fn: (x: number) => number) {
	var faz = fn(10);
	return faz;
};

var x = baz(bar);