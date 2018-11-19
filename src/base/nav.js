import React, { Component,Fragment } from 'react';
import { Tabs,NavBar,Icon} from 'antd-mobile';
import {navData} from '../router/config';
import { withRouter } from 'react-router-dom';
import './nav.css';
const tabs2 = navData;
class Nav extends Component {
    tabChange = (data,index) => {
      this.props.history.push(data.path)
    }
    
    render() {
      let {location} = this.props;

      let initIndex = navData.findIndex(item => item.path === location.pathname)
      let index = 0;
      if (initIndex !== -1) {
        index = initIndex;
      }console.log(initIndex)
      let nav = <Tabs tabs={tabs2}
      initialPage={index}
      onChange={this.tabChange}
      tabBarUnderlineStyle={{ background: 'red' }}
    >
    </Tabs>
    let cls = location.state && location.state.navClass ? 'light' : 'black';
    let goBack = <NavBar
      className={cls}
      icon={<Icon type="left" />}
      onLeftClick={() => {
        this.props.history.go(-1);
      }}
    >{location.state && location.state.title}</NavBar>
      return (
        	<Fragment>
           {initIndex !== -1 ? nav : goBack}
	         </Fragment>
        );
    }
}

export default withRouter(Nav);
