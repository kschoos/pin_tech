var $               = require("jquery");
var React           = require("react");
var ReactDOM        = require("react-dom");
var ReactBootstrap  = require("react-bootstrap");

// Components 
//-------------
var Header = require("./header.js");
var Body   = require("./body.js");

var Row    = ReactBootstrap.Row; 
var Grid   = ReactBootstrap.Grid;

$(document).ready(()=>{
  ReactDOM.render(<App/>, document.getElementById("container"));
})

var App = React.createClass({
  render(){
    return(
      <div id="app">
        <Row>
          <Header/>  
        </Row>
        <Row>
          <Grid>
            <Body/>
          </Grid>
        </Row>
      </div>
    )
  }
})
