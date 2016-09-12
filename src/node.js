class Node {
	constructor(data, priority) {
        this.data = data;
        this.priority = priority;
        this.parent = null;
        this.left = null;
        this.right = null;
	}

	appendChild(node) {
        if(this.left == null){
            node.parent = this;
			this.left = node;
		} else if(this.right == null){
            node.parent = this;
			this.right = node;
		} 
	}

	removeChild(node) {
		if(this.left == node){
			this.left.parent = null;
			this.left = null;
		} else if(this.right == node){
			this.right.parent = null;
			this.right = null;
		} else{
			alert('Passed node is not a child of this node!')
		}
	}

	remove() {
		if(this.parent == null){
		} else{
			this.parent.removeChild(this);
			this.parent = null;
		}
	}
    getRoot(node){
        return (node.parent == null)?node:this.getRoot(node.parent);
    }
	swapWithParent() {
        if(this.parent == null){
        	return false;
        } else {
            var root = this.getRoot(this);
            var parent = this.parent;
            var leftChild = this.left;
            var rightChild = this.right;

            if(parent.left) parent.left.parent = this;
            if(parent.right) parent.right.parent = this;

            if(this.left != null) this.left.parent = parent;
            if(this.right != null) this.right.parent = parent;

            if(this == parent.left){
                this.left = parent;
                this.right = parent.right;
            } 
            if(this == parent.right){
                this.left = parent.left;
                this.right = parent;
            }

            parent.left = leftChild;
            parent.right = rightChild;

            this.parent = parent.parent||null;

            if(parent == root.left)root.left = this;
            if(parent == root.right)root.right = this;

            parent.parent = this;
        }
    }
}
module.exports = Node;
