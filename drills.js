//Drill 01.1
// The Search sequence would be 11,5,6, then land on 8
//Drill 01.2
// The search sequence would be 11,15,17,18 then fail.

//Drill02 

//Drill03
//Find a book 
//  input: Dewey decimal index, title
//  output: 

const library = [ 
  { author: 'Cowlishaw, Mike', dewey: '005.133', title: 'The REXX Language' }, 
  { author: 'Sams', dewey: '005.133', title: 'Teach Yourself C++ In 21 Days' }, 
  { author: 'Stroustrup., Bjarne', dewey: '005.133', title: 'The C++ Programming Language' }, 
  { author: 'Crockford, Douglas', dewey: '005.2762', title: 'JavaScript: The Good Parts' }, 
  { author: 'Flanagan, David', dewey: '005.2762', title: 'JavaScript: The Definitive Guide' }, 
  { author: 'Schmidt, Meinhard', dewey: '005.44684', title: 'Windows Vista for Dummies' }, 
  { author: 'Zondervan', dewey: '220.52081', title: 'NIV Study Bible' }, 
  { author:'Humphries, Russell, Dr.', dewey: '231.7652', title: 'Starlight and Time' }, 
  { author: 'Jane, Frederick Thomas', dewey: '623.82509051', title: 'Jane\'s Fighting Ships' }, 
  { author: 'Norris, Chuck', dewey: '796.8092', title: 'The Official Chuck Norris Fact Book' } ];
//796

/**
 * 005
 * 005
 * 005
 * 005 - split
 * 005 
 * 005
 * 220 - split
 * 231
 * 623
 * 796
 */


function bookSearch(array, title, value, start = 0, end = array.length -1) {
  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end)/ 2);
  const book = array[index];

  let dewey = book.dewey

  if(dewey === value) {
    let matches = [];
    matches.push(book);
    console.log(matches)
    for(let i = 0; i < matches .length ;i++){
      if(matches[i].title === title){
        return 'Found book in the library';
      }
    } 
  }

  else if (dewey < value) {
    return bookSearch(array, title ,value, index + 1, end );
  }
  else if (dewey > value) {
    return bookSearch(array, title ,value, start, index - 1);
  }
};


console.log(bookSearch(library, 'Teach Yourself C++ In 21 Days', '005.133'));

//Drill04
/** 
 *           35
 *         /     \
 *        25      89
 *      /   \    /  \
 *     15   27  79   91
 *    /  \           /
 *  14   19         90
 */

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  } 

  insert(key, value) {
    // If the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
        this.key = key;
        this.value = value;
    }

    /* If the tree already exists, then start at the root, 
      and compare it to the key you want to insert.
      If the new key is less than the node's key 
      then the new node needs to live in the left-hand branch */
    else if (key < this.key) {
        /* If the existing node does not have a left child, 
          meaning that if the `left` pointer is empty, 
          then we can just instantiate and insert the new node 
          as the left child of that node, passing `this` as the parent */
        if (this.left == null) {
            this.left = new BinarySearchTree(key, value, this);
        }
        /* If the node has an existing left child, 
          then we recursively call the `insert` method 
          so the node is added further down the tree */
        else {
            this.left.insert(key, value);
        }
    }
    // Similarly, if the new key is greater than the node's key 
      //  then you do the same thing, but on the right-hand side */
    else {
        if (this.right == null) {
            this.right = new BinarySearchTree(key, value, this);
        }
        else {
            this.right.insert(key, value);
        }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key == key) {
        return this.value;
    }
    /* If the item you are looking for is less than the root 
      then follow the left child.
      If there is an existing left child, 
      then recursively check its left and/or right child
      until you find the item */
    else if (key < this.key && this.left) {
        return this.left.find(key);
    }
    /* If the item you are looking for is greater than the root 
      then follow the right child.
      If there is an existing right child, 
      then recursively check its left and/or right child
      until you find the item */
    else if (key > this.key && this.right) {
        return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree
    else {
        throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
        if (this.left && this.right) {
            const successor = this.right._findMin();
            this.key = successor.key;
            this.value = successor.value;
            successor.remove(successor.key);
        }
        /* If the node only has a left child, 
          then you replace the node with its left child */
        else if (this.left) {
            this._replaceWith(this.left);
        }
        /* And similarly if the node only has a right child 
          then you replace it with its right child */
        else if (this.right) {
            this._replaceWith(this.right);
        }
        /* If the node has no children then
          simply remove it and any references to it 
          by calling "this._replaceWith(null)" */
        else {
            this._replaceWith(null);
        }
    }
    else if (key < this.key && this.left) {
        this.left.remove(key);
    }
    else if (key > this.key && this.right) {
        this.right.remove(key);
    }
    else {
        throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
        if (this == this.parent.left) {
            this.parent.left = node;
        }
        else if (this == this.parent.right) {
            this.parent.right = node;
        }

        if (node) {
            node.parent = this.parent;
        }
    }
    else {
        if (node) {
            this.key = node.key;
            this.value = node.value;
            this.left = node.left;
            this.right = node.right;
        }
        else {
            this.key = null;
            this.value = null;
            this.left = null;
            this.right = null;
        }
    }
  }

  _findMin() {
    if (!this.left) {
        return this;
    }
    return this.left._findMin();
  }
}

function treeTest(){

  let BST = new BinarySearchTree();
  BST.insert(35, null);
  BST.insert(25, null);
  BST.insert(15, null);
  BST.insert(14, null);
  BST.insert(19, null);
  BST.insert(27, null);
  BST.insert(89, null);
  BST.insert(79, null);
  BST.insert(91, null);
  BST.insert(90, null);

  return postOrder(BST);
}

treeTest();


function inOrder(tree) {
  if (tree.left) 
    inOrder(tree.left)
  
  console.log(tree.key);
  if (tree.right) 
    inOrder(tree.right)
}

function preOrder(tree) {
  console.log(tree.key);
  if (tree.left) 
    preOrder(tree.left)
  if (tree.right) 
    preOrder(tree.right)
}

function postOrder(tree) {
  if (tree.left)
    postOrder(tree.left)
  if (tree.right){ 
    postOrder(tree.right)
  }
  console.log(tree.key);
}
