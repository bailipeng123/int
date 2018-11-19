import React, { Component } from 'react';
import { getSinger } from '../../server/server.js';
import { List,Icon} from 'antd-mobile';
import './singer.css';
const Item = List.Item;

export default class Singer extends Component {
   constructor(props){
    super(props)
    this.state={
        banner:'',
        list:''
      };
    this.isMount=false;
  }
	async componentDidMount() {
  		 let data=await getSinger()
  			if(!this.isMount){
          this.setState(data);
        }
  		}
  	;
  	componentWillUnmount(){
      this.isMount = true;
    }
  render() {
  	let i =1;
  	let {list}=this.state;
  	let arr=[];
  	arr.push([list[0]]);
  	while(i<list.length){
  		arr.push(list.slice(i,i+3));
  		i+=3;
  	}
    return (
      <div className="singer">
      	{
          list?arr.map((item,index) => {
            return <List className="my-list" key={index}>
              {
              	item.map((ev)=>{
              		return <Item key={ev.classid}
                            arrow="horizontal" 
                            onClick={() => { 
                              this.props.history.push({
                                pathname: '/singer/list/' + ev.classid,
                                state: {
                                  title: ev.classname,
                                  navClass: true
                                }
                              })
                          }}
                  >
                           {ev.classname}
                          </Item>
              	})
              }
            </List>
          }):<Icon type='loading' size='lg'/>
        }
      </div>
    )
  }
}
