var $               = require("jquery");
var React           = require("react");
var ReactDOM        = require("react-dom");
var ReactBootstrap  = require("react-bootstrap");

// Components
//--------------
var Navbar   = ReactBootstrap.Navbar;
var Nav      = ReactBootstrap.Nav;
var NavItem  = ReactBootstrap.NavItem;

module.exports = React.createClass({
    render(){

      return(
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Something</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="#">Link</NavItem>
          </Nav>
        </Navbar>
      )
    }
  })
