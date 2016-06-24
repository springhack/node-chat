import ReactDOM from 'react-dom';
import cx from 'classnames';
import React from 'react';
import Tree from 'react-ui-tree';
import Title from './Title.jsx';
import History from './History.jsx'
import Send from './Send.jsx';


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
	active : null,
	tree : {
	  "module": "总部",
	  "children": [{
	    "collapsed": true,
	    "module": "测试部",
	    "children": [{
	      "module": "root"
	    },
	    {
	      "module": "sau"
	    }]
	  }]
	}
    };
  }

  renderNode(node) {
    var that = this;
    return (
      <span className={cx('node', {
        'is-active': node === this.state.active
        })} onClick={this.onClickNode.bind(that, node)}>
        {node.module}
      </span>
    );
  }

  onClickNode(node) {
    console.log(this);
    this.setState({
      active: node
    });
  }

  onSend(str) {
    SendMsg(str);
  }

  render() {
    return (
      <div className="app">
        <div className="tree">
          <Tree
            paddingLeft={20}
            tree={this.state.tree}
            onChange={this.handleChange.bind(this)}
            isNodeCollapsed={this.isNodeCollapsed}
            renderNode={this.renderNode.bind(this)}
          />
        </div>
        <div className="inspector">
		<Title title={this.active == null ? 'Connect everything' : this.active.module} />
		<History />
		<Send send={this.onSend} />
        </div>
      </div>
    );
  }

  handleChange(tree) {
    this.setState({
      tree: tree
    });
  }

}
