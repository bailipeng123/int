import React, { Component } from 'react'
import { getPlist } from '../../server/server.js';
import { List,Icon} from 'antd-mobile';
import './plist.css';
const Item = List.Item;
const Brief = Item.Brief;
export default class Plist extends Component {
  constructor(props){
    super(props)
    this.state={
        banner:'',
        list:''
      };
    this.isMount=false;
  }
	async componentDidMount() {
      let data=await getPlist()
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
      <div className='plist'>
        {list?<List className="my-list">
	      	{list.map((item)=>{
	      		return <Item
                      key={item.specialid}
                      wrap
                      arrow="horizontal"
                      thumb={item.imgurl.replace('{size}',400)}
                      multipleLine
                      onClick={() => {
                        this.props.history.push({
                          pathname: '/plist/list/' + item.specialid,
                          state: {
                            title: item.specialname,
                            navClass: false
                          }
                        })
                      }}
                    >
                     {item.specialname}
                      <Brief><i className='iconfont icon-listen'> {item.playcount}</i></Brief>
                    </Item>
	      	})
	      	}
	      </List>:<Icon type='loading' size='lg'/>}
      </div>
    )
  }
}
