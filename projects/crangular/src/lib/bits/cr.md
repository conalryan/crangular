console.log('------------------- Signed 32-bit integers ------------------')

// Decimal to binary

let a = 0;
console.log(a.toString(2)); // 0
a = 1;
console.log(a.toString(2)); // 1
a = 2;
console.log(a.toString(2)); // 10
a = 4;
console.log(a.toString(2)); // 100

console.log('---------------------- << (LEFT SHIFT) ----------------------')
a = 1;
console.log(a.toString(2)); // 1

a = 1 << 1;
console.log(a.toString(2)); // 10

console.log('--- reset ---');
a = 1;
console.log(a.toString(2)); // 1

// Add one '0' to right
a = a << 1;
console.log(a.toString(2)); // 10

console.log('--- reset ---');
a = 1;
console.log(a.toString(2)); // 1

// Add three '0's to right
a = a << 3;
console.log(a.toString(2)); // 1000

console.log('---------------------- >> (RIGHT SHIFT) ---------------------')
a = 4;
console.log(a.toString(2)); // 100

// Remove one '0' from right
a = a >> 1;
console.log(a.toString(2)); // 10

console.log('--- reset ---');
a = 4;
console.log(a.toString(2)); // 100

// Remove two '0's from right
a = a >> 2;
console.log(a.toString(2)); // 1

console.log('-------------------------- | (OR) ---------------------------')
// OR bits to turn them 'on'
a = 0;
console.log(a.toString(2)); // 0

// Set 1 in first bit position (0 indexed)
a = a | 1 << 0;
console.log(a.toString(2)); // 1

// Set 1 in second bit position (0 indexed)
a = a | 1 << 1;
console.log(a.toString(2)); // 11

// Set 1 in third bit position (0 indexed)
a = a | 1 << 2;
console.log(a.toString(2)); // 111

console.log('-------------------------- & (AND) --------------------------')
// AND bits to turn them 'off'
a = 7;
console.log(a.toString(2)); // 111

a = a & 0;
console.log(a.toString(2)); // 0

a = 7;
console.log(a.toString(2)); // 111

a = a & 1;
console.log(a.toString(2)); // 1

console.log('--------------- Querying the status of a bit ---------------');
a = 7; // 111
if (a & 1 << 2) {
  console.log('3rd bit is set');
}

if ((a & 1 << 3) === 0) {
  console.log('4th bit is not set');
}

const getBit = (n, bitIndex) => {
  const bitMask = 1 << bitIndex;
  const result = n & bitMask;
  return result >>> bitIndex;
}

a = 2; // 10
const b = getBit(a, 1); // 1
console.log(b.toString(2));
const c = getBit(a, 0); // 0
console.log(c.toString(2));

console.log('----------------------- Clearing bit -----------------------');
const clearBit = (n, bitIndex) => {
    const bitMask = ~(1 << bitIndex);
    return n & bitMask;
}

a = 3;
console.log(a.toString(2)); // 11
const cleared = clearBit(a, 1);
console.log(cleared.toString(2)); // 1
© 2019 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
