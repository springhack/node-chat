import React from 'react';

export default class Title extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		return (<div>{this.props.title}</div>);
	}

}
