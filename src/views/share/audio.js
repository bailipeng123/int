import React, { Component} from 'react';
import ReactDOM from 'react-dom';
import {getSongInfo,getSongKrc} from '../../server/server.js';
import {connect} from 'react-redux';
import { List} from 'antd-mobile';
import Cover from './cover.js'
import { parseLyric } from '../../utils/utils'
import './song.css';
const Item = List.Item;
const Brief = Item.Brief;
class Audio extends Component{
	constructor(props) {
	    super(props);
	    this.audio =React.createRef();
	    this.state = {
	      songInfo:{},
	      isPlay:true,
	      isCover:false,
	      currentTime:0,
	      duration:0,
      		rcArr:[],
	    };
	    this.index = -1;
	    this.isMount=false;
	    this.starttime=0;
	    this.max=0;
	    this.currentRcIndex = 0;
	  }
     componentWillReceiveProps(nextProps){
	    let { hash,list } = nextProps;
	    console.log(nextProps)
	    if(hash){
	   		this.getSongInfoMethod(hash,list)
	    }
	  }
	  getSongInfoMethod=async(hash,list)=>{
	  	console.log(hash)
	  	let data = await getSongInfo({ hash });
	      let krc = await getSongKrc({hash,keyword:data.fileName})
	      let arr = [];
	        if (krc){
	          arr = parseLyric(krc);
	        }
	      if(!this.isMount){
	      	this.setState({
	        	songInfo: data,
	        	isPlay:true,
	        	rcArr: arr,
	          	currentTime:0
	     	})
			this.max=data.timeLength
	      	this.index = list.findIndex(item =>item.hash === hash);
	      	this.currentRcIndex = 0;
	      	console.log(this.state.rcArr)
	      }

	  }
	  componentDidMount() {
	  	let audio = this.audio.current;
	  	 audio.addEventListener('loadedmetadata', () => {
	      console.log('音频加载完成');
	      this.setState({
	        duration: audio.duration
	      })
	      audio.addEventListener('timeupdate',() => {
		      this.setState({
		        currentTime: audio.currentTime
		      })
		    })
	    })
	  	  audio.addEventListener('ended', () => {
	  	  	this.currentRcIndex = 0;
		      this.next()
		    })
	  }
	playOrStop=()=>{
		let audio = this.audio.current;
		if(audio.paused){
			audio.play();
			this.setState({
				isPlay:true
			})
		}else{
			audio.pause();
			this.setState({
				isPlay: false
			})
		}
	}
	next=async()=>{
		let { hash,list } = this.props;
		this.index++;
		if(this.index>list.length-1){
			this.index=0;
		}
		let now = list[this.index];
		hash = now.hash;
		this.getSongInfoMethod(hash,list)
	}
	prev=async()=>{
		let { hash,list } = this.props;
		this.index--;
		if(this.index<0){
			this.index=list.length-1;
		}
		let now = list[this.index];
		hash = now.hash;
		this.getSongInfoMethod(hash,list)
	}
	close=()=>{
		this.setState({
			isCover:false
		})
	}
	changeCurrentTime=(a)=>{
		this.audio.current.currentTime=a
		this.setState({
			currentTime:a
		})
	}
	componentWillUnmount(){
	    this.isMount = true;
	    console.log('卸载')
	}
  render(){
  	let {songInfo,isPlay,isCover,duration,currentTime, rcArr}=this.state;
  	for (let i = this.currentRcIndex; i < rcArr.length; i++){
        if (rcArr[i][0] > currentTime){
          this.currentRcIndex = i-1 < 0 ? 0 : i-1;
          break;
        }else{
        	this.currentRcIndex=rcArr.length-1
        }
      }
      console.log(this.currentRcIndex)
    return ReactDOM.createPortal(
    	<div>
    		{songInfo.choricSinger&&isCover?<Cover 
	    			name={songInfo.fileName.substr(songInfo.choricSinger.length+3)}
	    			prev={this.prev}
	    			next={this.next}
	    			close={this.close}
	    			playOrStop={this.playOrStop}
	    			picture ={songInfo.imgUrl.replace('{size}',200)}
	    			isPlay={isPlay}
					max={this.max}
					duration={duration}
					currentTime={ currentTime }
					krc={rcArr[this.currentRcIndex][1]}
					changeCurrentTime={this.changeCurrentTime}
    			/>:''}
	    	<audio 
	    		ref={this.audio}
				controls 
				autoPlay 
				src={songInfo.url} 
				hidden
				>
	        </audio>
			{
			songInfo.imgUrl?<Item
				className='fixed-bottom'
			    thumb={<img 
			    			src={songInfo.imgUrl.replace('{size}',400)} alt="" 
			        		onClick={()=>{
			    				this.setState({
			    					isCover:true
			    				})
			    			}}
			    		/>}
			    extra={<div className='control'>
			        <i className={isPlay?'iconfont icon-stop':'iconfont icon-play-copy'}
			        	onClick={()=>{
							this.playOrStop();
						}}
			        ></i>
			        <i className='iconfont icon-next'
			        	onClick={()=>{
							this.next();
						}}
			        ></i>
			        <i className='iconfont icon-xiazai'
			        	onClick={()=>{
							console.log('下载');
						}}
			        ></i>
			      </div>}
			  >{songInfo.fileName.substr(songInfo.choricSinger.length+3)}
			  <Brief>{songInfo.choricSinger}</Brief>
			  </Item>
			:''}
        </div>,document.body);
  	}
}
function mapStateToProps(state){
  return{
    list:state.list,
    hash:state.hash
  }
}
export default connect(mapStateToProps)(Audio);
