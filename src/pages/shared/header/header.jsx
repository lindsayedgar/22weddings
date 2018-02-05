'use strict';

import React from 'react';
import { Drawer, MenuItem, IconButton } from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import { grey700 } from 'material-ui/styles/colors';
import Logo from '../../../assets/logo.png';

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
          <MenuItem onClick={this.handleClose}>Menu Item</MenuItem>
          <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    )
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }
}

export default Header;
