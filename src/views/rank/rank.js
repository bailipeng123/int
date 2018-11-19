import React, { Component } from 'react';
import { getRank } from '../../server/server.js';
import { List,Icon} from 'antd-mobile';
import './rank.css';
const Item = List.Item;
export default class Rank extends Component {
  constructor(props){
    super(props)
    this.state={
        banner:'',
        list:''
      };
    this.isMount=false;
  }
	async componentDidMount() {
      let data=await getRank()
      if(!this.isMount){
          this.setState(data);
        }
    };
  componentWillUnmount(){
    this.isMount = true;
  }
  render() {
  	let {list}=this.state;
    return (
      <div className='rank'>
        {list?<List className="my-list">
	      	{list.map((item)=>{
	      		return <Item
                      key={item.id}
                      wrap
                      arrow="horizontal"
                      thumb={item.imgurl.replace('{size}',400)}
                      multipleLine
                      onClick={() => { 
                              this.props.history.push({
                                pathname: '/rank/info/' + item.rankid,
                                state: {
                                  title: item.rankname,
                                  navClass: false
                                }
                              })
                          }}
                    >
                     {item.rankname}
                    </Item>
	      	})
	      	}
	      </List>:<Icon type='loading' size='lg'/>}
      </div>
    )
  }
}
