import React, { Component,Fragment } from 'react';
import { SearchBar } from 'antd-mobile';
import { List} from 'antd-mobile';
import { Icon} from 'antd-mobile';
import SearchInfo from './searchinfo.js';
import './search.css';
const Item = List.Item;
const url = 'http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp';
class Search extends Component {
	constructor(arg){
        super(arg);
        this.state = {
            value: "",
            data: [],
            isSearch:true,
            keyword:''
        };
    }
    componentDidMount() {
        this.getData()
    }
	getData=()=>{
        let s =document.createElement('script');
        let callback = `p${Date.now()}`;
        s.src = `${url}&callback=${callback}`
        document.head.appendChild(s);
        s.remove();
        window[callback]= (data)=>{
            this.setState({
                data:data.data.info
            })
            window[ callback ] = undefined;
        }
    }
    onChange= (value) => {
        this.setState({ value });
    };
    render() {
        let {data,value,isSearch,keyword}=this.state
        console.log(keyword)
        return (
        	<Fragment>
             <SearchBar
		        placeholder="歌手/歌名/拼音"
		        cancelText='搜索'
		        onSubmit={value => {
                    if(value){
                        this.setState({
                            isSearch:false,
                            keyword:value
                        })
                    }
                }}
		        onClear={value => console.log(value, 'onClear')}
		        onFocus={() => console.log('onFocus')}
		        onBlur={() => console.log('onBlur')}
		        onCancel={value => {
                    if(value){
                        this.setState({
                            isSearch:false,
                            keyword:value
                        })
                    }
                }}
		        showCancelButton
		        onChange={this.onChange}
                value={value}
		      /> 
                {isSearch? 
                    <List renderHeader={() => '最近热门'} className='search'>
                        {data.length!==0?data.map((item)=>{
                            return <Item wrap  
                                key={item.keyword}
                                onClick={()=>{
                                    this.setState({
                                        value:item.keyword,
                                        isSearch:false,
                                        keyword:item.keyword
                                    })
                                }}
                                >{item.keyword}</Item>
                        }):<Icon type='loading' size='lg'/>}
                    </List>:<SearchInfo keyword={keyword}/>}
		    </Fragment>
        );
    }
}
export default Search;
