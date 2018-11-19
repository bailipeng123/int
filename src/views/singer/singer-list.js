import React, { Component } from 'react';
import { getSingerList } from '../../server/server.js';
import { List } from 'antd-mobile';
import './singer.css';
const Item = List.Item;
class singerlist extends Component {
	constructor(props) {
    super(props);
    this.state = {
      data:{}
    };
    this.isMount=false;
  }
	async componentDidMount() {
		let {classid} = this.props.match.params;
	    let data = await getSingerList({ classid });
	    if(!this.isMount){
	    	this.setState({
		      data:data
		    })
	    }
	}
	componentWillUnmount(){
      this.isMount = true;
    }
    render() {
    	let {list}=this.state.data;
        return (
            <div className="singer_list">
		        <List>
		          {
		            list?list.map((item) => {
		              return <Item
		                key={item.singerid}
		                thumb={item.imgurl.replace('{size}',400)}
		                onClick={() => { 
		                  this.props.history.push({
		                    pathname: `/singer/info/${item.singerid}`,
		                    state:{
		                      title: item.singername,
		                      navClass: false
		                    }
		                  })
		                }}
		              >{item.singername}</Item>
		            }):''
		          }
		        </List>
      		</div>
        );
    }
}

export default singerlist;
