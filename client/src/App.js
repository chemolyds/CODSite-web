import React from 'react';
import logo from "./logo.svg";
import Main from './Main';

//https://github.com/nguyenbathanh/react-loading-screen
class App extends React.Component {
	
  // fake authentication Promise
  authenticate(){
    return new Promise(resolve => setTimeout(resolve, 1500)) // 1.5 seconds
  }

  componentDidMount(){
    this.authenticate().then(() => {
      const ele = document.getElementById('ipl-progress-indicator')
      if(ele){
        // fade out
        ele.classList.add('available')
        setTimeout(() => {
          // remove from DOM
          ele.outerHTML = ''
        }, 2000)
      }
    })
  }

	render() {
    return (
      <div className="App">
        <Main/>
      </div>
    );
	}
}

export default App;