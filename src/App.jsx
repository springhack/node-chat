import ReactDOM from 'react-dom';
import React from 'react';
import Tree from 'react-ui-tree';

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			tree : {
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
		return (<div>{node.module} - <hr /></div>);
	}
	render() {
		return (<Tree tree={this.state.tree} renderNode={this.renderNode} />);
	}
}
