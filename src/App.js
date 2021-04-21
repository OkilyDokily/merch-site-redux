import React from "react";
import MerchController from "./components/MerchController";
import Header from "./components/Header"

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      items: 0
    }
  }

  handleIncreaseItemsInCart = () => {
    let num = this.state.items;
    num++;
    this.setState({items:num})
  }

  handleDecreaseItemsInCart = (num) => {
    let amount = this.state.items;
    amount = amount - num;
    if (!(amount < 0))
    {
      this.setState({ items: amount })
    } 
  }

  appStyle = {
    width:"95%",
    margin:"auto",
    height:"80vh"
  }
  
  render()
  {
    return (
      <div id="App" style={this.appStyle}>
        <Header count={this.state.items}/>
        <MerchController onIncreaseItemsInCart={this.handleIncreaseItemsInCart} onDecreaseItemsInCart={this.handleDecreaseItemsInCart} />
        <br/>
        <hr/>
        <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <div>The Fell Types are digitally reproduced by Igino Marini. <a href="http://www.iginomarini.com">www.iginomarini.com.</a> .</div>
        
      </div>
    );
  }
 
}

export default App;
