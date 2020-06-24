import React from 'react'
import request from 'superagent'

class App extends React.Component {

  state = {
    country: '',
    month: '',
    day: '',
    namedays: '',
  }

  handleClick = (evt) => {
    evt.preventDefault()
    // console.log(this.state)
    this.getNamedays(this.state.country, this.state.month, this.state.day)
  }

  handleChange = (evt) => {
    // console.log(this.state)
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  getNamedays = (country, month, day) => {
    request.get(`https://api.abalin.net/namedays?country=${country}&month=${month}&day=${day}`)
      .then(res => {
        // console.log(res.body.data.namedays[country])
        this.setState({
          namedays: res.body.data.namedays[country]
        })
      })
  }


  render() {

    // let countries = [ cz, sk, pl, fr, hu, hr, se, us, at, it, es, de, dk, fi, bg, lt, ee, lv, gr, ru ]

    return (
      <div className="container">
        <h1>International Namedays</h1>
        <h5><em>Fill out the form to get nameday(s) for a specific date and country</em></h5>
        <form>
          <label htmlFor="country">Select country:</label>
          <select name="country" value={this.state.value} onChange={this.handleChange}>
            <option value=''>Choose country</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
            <option value="gr">Greece</option>
            <option value="it">Italy</option>
            <option value="sk">Slovakia</option>
            <option value="es">Spain</option>
            <option value="us">USA</option>
          </select>
          <label htmlFor="month">Month (must be a number):</label>
          <input type="text" name="month" onChange={this.handleChange} value={this.state.month} />
          <label htmlFor="day">Day (must be a number):</label>
          <input type="text" name="day" onChange={this.handleChange} value={this.state.day} />
        </form>
        <button onClick={this.handleClick} className="button-primary">GET NAMEDAY(S)</button>
        <h4>Your nameday(s): {this.state.namedays}</h4>
      </div>
    )
  }
}

export default App