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

    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div className="header">
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
