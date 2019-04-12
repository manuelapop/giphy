import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter, Link } from "react-router-dom";

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      searchID: ""
    };

    this.handleAppIdSearch = this.handleAppIdSearch.bind(this);
    this.redirectToChangeITPage = this.redirectToChangeITPage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleSearch = event => {
    this.setState({ searchID: event.target.value }, () =>
      console.log("searchID", this.state.searchID)
    );
  };

  redirectToChangeITPage() {
    const id = this.state.searchID;
    this.props.history.push({
      pathname: "/searchcomponent",
      search: `?query=${id}`
    });
  }

  handleAppIdSearch(e) {
    this.redirectToChangeITPage();
  }

  handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("enter press here! ");
      this.redirectToChangeITPage();
    }
  };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="lg">
          <NavbarBrand href="/home">Home</NavbarBrand>
          <Form inline>
            <InputGroup>
              <Input
                className="form-control"
                type="search"
                placeholder="Quick Search Image"
                value={this.state.searchID}
                onChange={this.handleSearch}
                onKeyDown={this.handleKeyPress}
              />
              <InputGroupAddon addonType="append">
                <Button onClick={this.handleAppIdSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Header);
