import React from 'react';  
import {Menu, Icon} from 'antd'
import {Link} from 'react-router-dom'
import ScreenMyArticles from './ScreenMyArticles'

function Nav() {

  return (
    <nav >
      <Menu style={{textAlign: 'center'}} mode="horizontal" theme="dark">

        <Menu.Item key="mail">
          <Link to='/screensource'>Sources</Link> 
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/screenmyarticles">My Articles</Link> 
        </Menu.Item>

        <Menu.Item key="app">
          <Link to ='/'>Logout</Link>
        </Menu.Item>

      </Menu>
    </nav>
  );
}

export default Nav;
