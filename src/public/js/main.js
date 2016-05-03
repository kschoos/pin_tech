var React = require("react");
var $ = require("jquery");
var ReactDOM = require("react-dom");

$(document).ready(()=>{
  ReactDOM.render(<Test/>, document.getElementById("app"));
})

var Test = React.createClass({
  render(){
    return(
      <div>Even more test</div>
    )
  }
})
