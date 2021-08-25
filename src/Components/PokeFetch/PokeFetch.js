import React, { Component, useEffect } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      count: 10
    }
  }



  fetchPokemon() {
    
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
        })
      })
      //timer
      .then(
        this.myInterval = setInterval(() => {
          this.setState(prevState => ({
            count: prevState.count - 1
          }))
          // if(this.state.count == 0) {
          //   clearInterval(this.state.count)
          // }
        }, 1000)
        )
      .catch((err) => console.log(err))

  }

  componentWillUnmount = () => {
    clearInterval(this.myInterval)
  }

  render() {


    return (
      <div className={'wrapper'}>
          <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
          <h1 className={'timer'} >Countdown: {this.state.count} </h1>
          <div className={'pokeWrap'}>
            <img className={this.state.count > 0 ? 'pokeImgHidden' : 'pokeImg'} src={this.state.pokeSprite} />
            <h1 className={this.state.count > 0 ?'pokeNameHidden' : 'pokeName'}>{this.state.pokeName}</h1>
          </div>
        </div>
        
    )
  }


}


export default PokeFetch;