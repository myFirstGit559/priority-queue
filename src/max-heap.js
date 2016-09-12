const Node = require('./node');

class MaxHeap {
	constructor() {
        this.root = null;
        this.parentNodes = [];
	}

	push(data, priority) {
       var node = new Node(data, priority);
       this.insertNode(node);
	   console.log(this.parentNodes.length);
	   console.log(this.parentNodes);
       this.shiftNodeUp(node); 
	   if(node.priority > this.root.priority){
		    this.root = node;
	   }
	   if(this.root.right == null && this.root.left != null && this.root.left.left !=null){
	   	   var right = this.root.right;
	   	   this.root.right = this.root.left.left;
	   	   this.root.left.left.parent = this.root;
           this.root.left.left = null;
	   }
	}

	pop() {
		if(this.isEmpty()){

		} else {
			var detached = this.detachRoot();
			this.restoreRootFromLastInsertedNode(detached);
			this.shiftNodeDown(this.root);
		    return detached.data;	
		}
	}

	detachRoot(){
		var root = this.root;
		if(!this.isEmpty()){
			for(var i = 0; i < this.parentNodes.length; i++){
				if(this.parentNodes[i] == this.root){
					for(var j = i; j < this.parentNodes.length; j++){
						this.parentNodes[i] = this.parentNodes[i+1];
					}
                    this.parentNodes.length -= 1;
				}
			}
			if(this.root.left != null)this.root.left.parent = null;
			if(this.root.right != null)this.root.right.parent = null;
            this.root = null;
            console.log(root);
            return root;
		}		
	}

	restoreRootFromLastInsertedNode(detached) {
		if(detached != null && detached.right != null && detached.right.priority > detached.left.priority){
			if(detached.right.left == null){
				detached.right.left = detached.left;
			} else{
				detached.right.right = detached.left;
			}
		    detached.right.parent = null;
		    detached.right.left.parent = detached.right;
			this.root = detached.right;	
		} else if(detached != null && detached.left != null || (detached.right != null && detached.left.priority > detached.right.priority)){		
		    detached.left.parent = null;
			this.root = detached.left;				
		} else if(detached != null){
			this.root = detached;
		}
        for(var k = this.parentNodes.length - 1; k > 0; k--){
        	var lastInsNode = this.parentNodes[k];
        	this.parentNodes[k] = this.parentNodes[k-1];
        	this.parentNodes[k-1] = lastInsNode;
        }
	}

	size() {
		return this.parentNodes.length;
	}

	isEmpty() {
        if(this.root == null && this.parentNodes.length == 0){ 
        	return true;
        } else{
        	return false;
        }
	}

	clear() {
        this.root = null;
        this.parentNodes = [];		
	}

	insertNode(node) {
		if(this.isEmpty()){
			this.root = node;
			this.parentNodes[0] = this.root;
		} else{
			var i = this.parentNodes.length - 1;
			var j = 1;
			if(i/3 > 1) j = Math.ceil(i/3);
		    if(this.parentNodes[0].left == null){
				this.parentNodes[0].appendChild(node);
				this.parentNodes[i+1] = node;
				if(i > 1){
				    for(var k = i+1; k > i-j+1; k--){
                        var last = this.parentNodes[k];
                        this.parentNodes[k] = this.parentNodes[k-1];
                        this.parentNodes[k-1] = last;
				    }
			    }
			} else if(this.parentNodes[0].right == null){
				this.parentNodes[0].appendChild(node);
				this.parentNodes[i+1] = node;
				if(i > 2){
				    for(var k = i+1; k > i-j+1; k--){
                        var last = this.parentNodes[k];
                        this.parentNodes[k] = this.parentNodes[k-1];
                        this.parentNodes[k-1] = last;
				    }
			    }
				var first = this.parentNodes.shift();
				if(first.right == this.parentNodes[0] && (this.parentNodes[1].left == null || this.parentNodes[1].right == null)){
					var right = this.parentNodes[0];
					this.parentNodes[0] = this.parentNodes[1];
					this.parentNodes[1] = right;
				}
                this.parentNodes[this.parentNodes.length-1] = first;
			}
		}
	}
    getRoot(node){
        return (node.parent == null)?node:this.getRoot(node.parent);
    }
    sortParentNodesUp(A,B){
    	return B.priority - A.priority;
    }
    sortParentNodesDown(A,B){
    	return A.priority - B.priority;
    }
	shiftNodeUp(node) {
	   if(node.priority > this.root.priority){
		    this.root = node;
	   }
	  // console.log(node);
       if(node.parent == null && (node.left != null || node.right != null)) {
		  this.parentNodes.sort(this.sortParentNodesUp);
		   var flag = false;
		   for(var i = 0; i < this.parentNodes.length; i++){
		       if(this.parentNodes[i] == node.left){
		       	flag = false;
		       	break;
		       } else{
		       	flag = true;
		       }
		   }
        	if(flag == true && this.parentNodes.length >= 4 && this.root.left == node.left){
                var first = this.parentNodes[0];
                this.parentNodes[0] = node.left;
                this.parentNodes[this.parentNodes.length-1]= first;
                this.parentNodes[this.parentNodes.length] = node;
            }
			return;
		} else if(node.parent!=null && node.priority > node.parent.priority){
            node.swapWithParent(); 
            this.shiftNodeUp(node);
        }                
	}

	shiftNodeDown(node) {
		if(node.left == null){			
		   this.root = this.getRoot(node);
		   var first =  this.parentNodes.shift();
		   this.parentNodes.sort(this.sortParentNodesDown);
		   var k = this.parentNodes.length;
           this.parentNodes[k] = node;
		   this.parentNodes[k+1] = first;
		   return;
		} else if(node.left.priority > node.priority){
            node.left.swapWithParent();
            this.shiftNodeDown(node);
		} else{
 
		}       
    }
}
module.exports = MaxHeap;

