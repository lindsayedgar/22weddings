'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, MenuItem, IconButton } from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { grey700 } from 'material-ui/styles/colors';
import Logo from '../../../img/logo.png';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.none = false;
    this.state = {
      open: false
    }
  }

  componentWillMount() {
    if (this.props.page === 'home') {
      this.none = 'none';
      window.onscroll = () => {this.stickyStyle()};
    } else {
      window.onscroll = () => {};
    }
  }

  componentDidMount() {
    const header = document.getElementById("header");
    header.classList.remove("sticky");
  }

  render() {
    return (
      <div id="header" className={`header ${this.none}`}>
        <img className="logo" src={Logo} />
        <IconButton
          onClick={this.handleToggle}>
          <MenuIcon color={grey700} />
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          openSecondary={true}
        >
          <Link to="/"><MenuItem onClick={this.handleClose}>Home</MenuItem></Link>
          <Link to="/about"><MenuItem onClick={this.handleClose}>About Me</MenuItem></Link>
          <Link to="/services/#services"><MenuItem onClick={this.handleClose}>Services</MenuItem></Link>
          <Link to="/services/#testimonials"><MenuItem onClick={this.handleClose}>Testimonials</MenuItem></Link>
          <Link to="/#contact"><MenuItem onClick={this.handleClose}>Contact</MenuItem></Link>
        </Drawer>
      </div>
    )
  }

  stickyStyle = () => {
    const header = document.getElementById("header");

    if (this.props.page === 'home') {
      if (window.pageYOffset >= 200) {
        header.classList.add("sticky");
        header.classList.remove("none");
      } else {
        header.classList.remove("sticky");
        header.classList.add("none");
      }
    }
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  }

  handleClose = (route) => {
    this.setState({
      open: false
    });
  }
}

export default Header;
