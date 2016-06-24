import React from 'react';

export default class History extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			history: [],
			styleL : {
				float : 'left',
				border : '1px solid',
				paddind : '2px',
				borderRadius : '2px'
			},
			styleR : {
				float : 'right',
				border : '1px solid',
				paddind : '2px',
				borderRadius : '2px'
			}
		};
	}

	render() {
		var doms = [];
		for (var i in this.state.history)
			doms.push(
				<div style={this.state.history[i].user == 'me' ? this.state.styleR : this.state.styleL}>
					<div>{this.state.history[i].user}</div>
					<div>{this.state.history[i].content}</div>
				</div>
			);
		return (
			<div>
				{doms}
			</div>
		);
	}



}
