import React from 'react';

export default class History extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			styleL : {
				display : 'inline-block',
				backgroundColor : '#CAFF70',
				padding : '5px',
				paddind : '7px',
				borderRadius : '7px'
			},
			styleR : {
				display : 'inline-block',
				backgroundColor : '#FFBBFF',
				padding : '5px',
				paddind : '7px',
				borderRadius : '7px'
			},
			parL : {
				textAlign : 'left'
			},
			parR : {
				textAlign : 'right'
			}
		};
	}

	render() {
		var doms = [];
		for (var i in this.props.history)
			doms.push(
				<div key={'dom_' + i} style={this.props.history[i].user == 'me' ? this.state.parR : this.state.parL}>
					<div style={this.props.history[i].user == 'me' ? this.state.styleR : this.state.styleL}>
						<div>{this.props.history[i].user}:</div>
						<div>{this.props.history[i].content}</div>
					</div>
				</div>
			);
		return (
			<div>
				{doms}
			</div>
		);
	}



}
