import React, { Component } from 'react';
import { getPlistInfo} from '../../server/server.js'
import { Accordion, Icon } from 'antd-mobile';
import Song from '../share/song.js';
import '../singer/singer.css';
class PlistInfo extends Component {
    constructor(props) {
      super(props);
      this.state = {
        imageLoading: true,
        data:{
        	
        }
      };
      this.isMount=false;
    }
  async componentDidMount() {
    let {specialid} = this.props.match.params;
    let data = await getPlistInfo({ specialid });
    if(!this.isMount){
      this.setState({
      data:data
    })}

    let image = new Image();
    image.src = data.list.imgurl.replace('{size}', 400)
    image.onload = () => {
      this.setState({
        imageLoading: false
      });
    }
  }
   componentWillUnmount(){
    this.isMount = true;
  }
    render() {
    	let{list= { imgurl: '', specialname: '',intro:''},info=[]}=this.state.data;
        return (
            <div className="singer-info">
		        <div>
		          {
		            this.state.imageLoading ?
		              <Icon type="loading"></Icon>
		              : <img src={list.imgurl.replace('{size}', 400)} alt='' />
		          }
		          
		        </div>
		        <Accordion className="my-accordion">
		          <Accordion.Panel header={list.intro.slice(0,17)}>
		            {list.intro.slice(17)}
		          </Accordion.Panel>
		        </Accordion>
		        <Song list={info}/>
		     </div>
        );
    }
}

export default PlistInfo;
