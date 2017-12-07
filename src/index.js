import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'

class Message extends React.Component {
	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<p>{this.props.message}</p>
				<div id="image"></div>
			</div>
		)
	}
}
ReactDOM.render(<Message title="Email Alex" message="Can you email him?" />, 
                document.getElementById('react-container'))

// import React from 'react'
// import ReactDOM from 'react-dom'

// const MyComponent = () => <h1>Webpack &amp; React</h1>

// ReactDOM.render(<MyComponent />, document.getElementById('react-container'));

// const arr = ['Javascript', 'Node', 'webpack', 'angular'];
// console.log(arr);
