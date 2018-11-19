import React, { Component,Fragment} from 'react';
import { List} from 'antd-mobile';
import {connect} from 'react-redux';
import Audio from './audio.js';
const Item = List.Item;
class Song extends Component {
    render() {
    	let {list}=this.props;
        return (
            <Fragment>
                <List className="my-list">
        	      	{list.map((item)=>{
        	      		return <Item wrap 
                        key={item.audio_id}
                        extra={<i className='iconfont icon-xiazai'></i>}
                        onClick={()=>{
                         this.props.changeData(list,item.hash)
                        }
                        }
                        >{item.filename}</Item>
        	      	    })
        	      	}
        	      </List>
                <Audio />
          </Fragment>
        );
    }
}
function mapDispatchToProps(dispatch){
  return{
    changeData(list,hash){
      dispatch({type:'changelist',list})
      dispatch({type:'changehash',hash})
    }
  }
}
export default connect(null,mapDispatchToProps)(Song);
