const a = new Set<string>();

a.add('a');
a.add('b');
a.add('c');



console.log(...a) // a b c
console.log([...a]) // ['a', 'b', 'c']