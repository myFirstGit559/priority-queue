const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
        this.maxSize = maxSize || 30;
        this.heap = new MaxHeap;
	}
    sortParentNodesUp(A,B){
    	return B.priority - A.priority;
    }
    sortParentNodesDown(A,B){
    	return A.priority - B.priority;
    }
	push(data, priority) {
		if(this.heap.size() < this.maxSize){
            this.heap.push(data, priority);
        } else{
        	alert('Error: you has reached the maximum size of the queue!');
        }
	}

	shift() {
		if(this.isEmpty()){
			alert('Error: queue is empty!'); 
        } else{
        	//this.heap.parentNodes.sort(this.sortParentNodesUp);
        	//console.log(this.heap);
        	//console.log(this.size());
		    var removeNode = this.heap.pop();
            
            return  removeNode;   	
        }
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if(this.size() == 0){
			return true;
		} else{
			return false;
		}
	}
}

module.exports = PriorityQueue;
