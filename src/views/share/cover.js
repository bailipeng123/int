import React, { Component } from 'react';
import { NavBar,Icon} from 'antd-mobile';
import ReactDOM from 'react-dom';
import { Range} from 'antd-mobile';
import { sToM } from '../../utils/utils'
const log = (name,a) => {
return (value) => {
	a&&a(value[0])
  console.log(`${name}: ${value}`);
};}
class Cover extends Component{
	state={
		value:0
	};
	changeValue=(a)=>{
		this.setState({
			value:a
		})
	};
	render(){
		let {value}=this.state
		return ReactDOM.createPortal(<div style={{position: 'fixed',width:'100vw',height:'100%',zIndex:10000,background:'#f9f9f9',top:'1.4rem'}}>
			<NavBar
		      className='close'
		      icon={<Icon type="left" />}
		      onLeftClick={() => {
		        this.props.close();
		      }}
		    >{this.props.name}</NavBar>
		    <img src={this.props.picture} alt="" style={{display:'block',margin:'1rem auto'}} />
		    <div className='krc'>
		    	{this.props.krc}
		    </div>
		    <div className='rang'>
		    	<span className='left'>{sToM(this.props.currentTime)}</span>
			    <Range
		          style={{marginTop:50, marginLeft: 45, marginRight: 40 }}
		          min={0}
		          max={this.props.max}
		          defaultValue={[0]}
		          step={1}
		          onChange={log('change',this.changeValue)}
				  onAfterChange={()=>{
				  	if(value){
				  		this.props.changeCurrentTime(value)
				  	}
				  }}
		          value={[parseInt(this.props.currentTime)]}
		        />
		        <span className='right'>{sToM(this.props.duration)}</span>
	        </div>
	        <div className='regulate' style={{paddingTop:'1rem',textAlign:'center'}}>
	        	<i className='iconfont icon-prev01'
	        		onClick={()=>{
						this.props.prev();
					}}
	        	></i>
	        	<i className={this.props.isPlay?'iconfont icon-zanting':'iconfont icon-play'}
					onClick={()=>{
						this.props.playOrStop();
					}}
	        	></i>
	        	<i className='iconfont icon-prev011'
	        		onClick={()=>{
						this.props.next();
					}}
	        	></i>
	        </div>
			</div>,document.body)
	}
}

export default Cover;
