import React from 'react';
import ReactDOM from 'react-dom';

export default class Send extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			styles : {
				width : '100%',
				height : '200px'
			},
			value : ''
		};
	}

	handleKeyDown(event) {
		if (event.keyCode == 13)
		{
			event.preventDefault();
			this.props.send(this.state.value);
			this.setState({value : ''});
		}
	}

	handleChange(event) {
		this.setState({
			value : event.target.value
		});
	}

	render() {
		return (
			<textarea style={this.state.styles} onChange={this.handleChange.bind(this)} onKeyDown={this.handleKeyDown.bind(this)} value={this.state.value} />
		);
	}

}
