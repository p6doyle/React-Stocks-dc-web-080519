import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

let URL = "http://localhost:3000/stocks"

class MainContainer extends Component {

  constructor(){
  super()
  this.state={
    stocks: [],
    showStocks: [],
    myStocks: []
    }
  }

  componentDidMount(){
    fetch(URL)
    .then(res => res.json())
    .then(data => {
      this.setState({stocks: data, showStocks: data})
    })
  }

  buyStock = (stock) => {
    console.log("bought")
    this.setState({
      myStocks: [...this.state.myStocks, stock]
  })}

  sellStock = (stock) => {
    console.log("sold")
    this.setState({
      myStocks: this.state.myStocks.filter(s => s !== stock)
    })
  }

  typeFilter = (type) => {
   if(type !== "All"){
     this.setState({
       showStocks: this.state.stocks.filter(stock => stock.type === type)
     })
   }else{
     this.setState({
       showStocks: this.state.stocks
     })
   }
 }

 sortStocks = (sortBy) => {
  let arr = []
  switch(sortBy){
    case "Alphabetically":
      arr = this.state.showStocks.sort((a,b) => a.name > b.name ? 1 : -1)
      break;
    case "Price":
        arr = this.state.showStocks.sort((a,b) => a.price > b.price ? 1 : -1)
      break;
    default:
      console.log("Wrong choice")
  }
  this.setState({
    showStocks: arr
  })
}

  render() {
    return (
      <div>
        <SearchBar
        typeFilter={this.typeFilter}
        sortStocks={this.sortStocks}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer
              stocks={this.state.showStocks}
              buyStock={this.buyStock}/>

            </div>
            <div className="col-4">

              <PortfolioContainer
              stocks={this.state.myStocks}
              sellStock={this.sellStock}/>
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
