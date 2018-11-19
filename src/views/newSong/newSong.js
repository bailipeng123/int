import React, { Component } from 'react';
import { getNewSong } from '../../server/server.js';
import './song.css';
import { Carousel,Icon} from 'antd-mobile';
import Song from '../share/song.js'

export default class NewSong extends Component {
	state={
		banner:'',
		list:'',
		imgHeight:''
	};
	isMount=false;
	async componentDidMount() {
  		let data=await getNewSong()
  		if(!this.isMount){
          this.setState(data);
        }
  	};
  componentWillUnmount(){
    this.isMount = true;
  }
  render() {
  	let {banner,list}=this.state;
    return (
      <div>
        {banner?<div>
	        <Carousel
	          autoplay
	          infinite
	          autoplayInterval={2000}
	        >
	          {banner.map(item => (
	            <a
	              key={item.id}
	              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
	            >
	              <img
	                src={item.imgurl}
	                alt=''
	                style={{ width: '100%', verticalAlign: 'top' }}
	                onLoad={() => {
	                	window.dispatchEvent(new Event('resize'));
	                	this.setState({ imgHeight: 'auto' });
	                }}
	              />
	            </a>
	          ))}
	        </Carousel>
	        <Song list={list}/>
	      </div>:<Icon type='loading' size='lg'/>}
      </div>
    )
  }
}
