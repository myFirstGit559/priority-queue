const MaxHeap = require('./src/max-heap');
const Queue = require('./src/queue');
const Node = require('./src/node');
		h = new MaxHeap();

            h.push(42, 15);
			h.push(15, 14);
			h.push(0, 16);
			h.push(100, 100);

			console.log(h.pop());//.to.equal(100);
			console.log(h.pop());//.to.equal(0);
			console.log(h.pop());//.to.equal(42);
			//console.log(h.size());
			console.log(h.pop());//.to.equal(15);
