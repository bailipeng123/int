import React, { Component,Fragment } from 'react';
import Song from '../share/song.js';
const url = 'http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp';
class SearchInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
        	data:[],
        	total:'',
            keyword:this.props.keyword
        }
    }
    componentDidMount() {
		this.getSearchInfo();
    }
    componentWillReceiveProps(){
        
    }
    getSearchInfo=()=>{
    	let {keyword} = this.state;
    	let s =document.createElement('script');
    	let callback = `p${Date.now()}`;
    	s.src=`${url}&keyword=${keyword}&pagesize=30&callback=${callback}`;
    	document.head.appendChild(s);
    	s.remove();
    	window[callback]=(data)=>{
			this.setState({
				data:data.data.info,
				total:data.data.total
			});
			window[callback]=undefined;
    	}
    }
    render() {
        console.log(this.state.keyword)
        return (
        	<div>
        		{this.state.data.length!==0?<Fragment>
	        		<div className='searchresult'> 共有{this.state.total}条结果</div>
	            	<Song list={this.state.data}/>
	            	</Fragment>: <div className='searchresult'>没有搜到相关内容</div>}
            </div>
        );
    }
}

export default SearchInfo;

