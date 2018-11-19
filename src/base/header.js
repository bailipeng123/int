import React, { Component,Fragment } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <Fragment>
	            <NavBar
			      mode="light"
			      icon={<i className='iconfont icon-kugou'></i>}
			      rightContent={[
			        <Icon key="0" type="search" 
			        style={{ marginRight: '16px' }} 
		              onClick={() => {
		                this.props.history.push({
		                  pathname: '/search',
		                  state: {
		                    title: '搜索',
		                    navClass: true
		                  }
		                })
		              }}
	                />
			      ]}
			      style={{background:'#DBD8D8'}}
			    >酷狗音乐</NavBar>
            </Fragment>
        );
    }
}

export default withRouter(Header);
