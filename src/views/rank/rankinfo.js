import React, { Component } from 'react';
import { getRankInfo } from '../../server/server.js';
import { Icon } from 'antd-mobile';
import Song from '../share/song.js';
import '../singer/singer.css';
export default class RankInfo extends Component{
	constructor(props){
	    super(props)
	    this.state={
	    	imageLoading: true,
	        data:''
	      };
	    this.ismount=false;
	  }
	async componentDidMount() {
		let {rankid} = this.props.match.params;
  		let data = await getRankInfo({ rankid });
	    this.setState({
	      data:data
	    })

	    let image = new Image();
	    image.src = data.rankInfo.imgurl.replace('{size}', 400)
	    image.onload = () => {
	      this.setState({
	        imageLoading: false
	      });
	    }
  		
  	};
  	componentWillUnmount(){
      this.isMount = true;
    }
	render() {
		  let { rankInfo = { imgurl: '', intro: ''}, songs={list:[]} } = this.state.data;
		return (
			<div className="singer-info">
		        <div>
		          {
		            this.state.imageLoading ?
		              <Icon type="loading"></Icon>
		              : <img src={rankInfo.imgurl.replace('{size}', 400) } alt='' />
		          }
		          
		        </div>
		        <Song list={songs.list}/>
      	</div>
		);
	}
}