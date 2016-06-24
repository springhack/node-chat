import ReactDOM from 'react-dom';
import cx from 'classnames';
import React from 'react';
import Tree from 'react-ui-tree';
import Title from './Title.jsx';
import History from './History.jsx'
import Send from './Send.jsx';


export default class App extends React.Component {

  constructor(props) {
    super(props);
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
	},
       history : {},
       socket : props.socket
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
    this.setState({
      active: node
    });
  }

  onSend(str) {
    var history = this.state.history;
    var to = this.state.active.module;
    if (!history[to])
    	history[to] = [];
    history[to].push({
    	user : 'me',
	content : str
    });
    this.state.socket.emit('say', {from : 'root', to : this.state.active.module, content : str});
    this.setState({
    	history : history
    });
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
		<Title title={this.state.active == null ? 'Connect everything' : this.state.active.module} />
		<History history={this.state.active == null ? [] : this.state.history[this.state.active.module]} />
		<Send send={this.onSend.bind(this)} />
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
