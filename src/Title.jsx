import React from 'react';

export default class Title extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			title : this.props.title
		};
	}

	render() {
		return (<div>{this.state.title}</div>);
	}

}
