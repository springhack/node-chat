
//Main script

import HelloWorld from './hw';
import ReactDOM from 'react-dom';
import React from 'react';
import Tree from 'react-ui-tree';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tree :
{
  "module": "react-ui-tree",
  "children": [{
    "collapsed": true,
    "module": "dist",
    "children": [{
      "module": "node.js"
    }]
  }]
}
		};
	}
	renderNode(node) {
		return (<div>{node.module} - <HelloWorld /></div>);
	}
	render() {
		return (<Tree tree={this.state.tree} renderNode={this.renderNode} />);
	}
}


ReactDOM.render(<App />, document.getElementById('main'));

import './style.css'
