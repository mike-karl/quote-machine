import React from 'react';
import './App.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa"; 
import {faTwitter} from '@fortawesome/free-brands-svg-icons';

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      author: '',
      color: '#333'
    }



 this.handleClick = this.handleClick.bind(this);
  }
  
  getRandomColor() {
    const diffColors = colors.filter(color => color !== this.state.boxColor);
    const randomColorIndex = Math.floor(Math.random() * diffColors.length);
    return diffColors[randomColorIndex];
  }

  componentDidMount() {
    this.setState(({ color }) => ({
      color: this.getRandomColor()
    }));
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
      this.setState({content: data.content, author: data.author, color: this.state.color})
    })
    
  }

  handleClick() {
    this.setState(({ color }) => ({
      color: this.getRandomColor()
    }));
    document.body.style.backgroundColor = this.state.color;
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
    this.setState({content: data.content, author: data.author})
    })
  }

  render() {
    let tweetUrl = "https://twitter.com/intent/tweet?text="+'"' + this.state.content+'" %0a%0a%09%09%09%09%09%09%09-'+this.state.author
    document.body.style.backgroundColor = this.state.color;
    return (
    <div id="quote-box" style={{color: this.state.color}}>
        <div>
          <h1 className="quote-text" id="text" style={{backgroundColor: this.state.colors}}><FaQuoteLeft />{this.state.content}<FaQuoteRight /></h1>
          <p id="author" style={{backgroundColor: this.state.colors}}>-{this.state.author}</p>
          <div className="buttons">
           <button className="button" id="new-quote" style={{backgroundColor: this.state.color}} onClick={this.handleClick}>New Quote</button>
           <a className="button" id="tweet-quote" href={tweetUrl} target="_blank" style={{backgroundColor: this.state.color}}><FontAwesomeIcon icon={faTwitter}/></a>
          </div> 
        </div>
    </div>
    )
  }
}


export default App;
