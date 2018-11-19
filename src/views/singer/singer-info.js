import React, { Component ,Fragment} from 'react'
import { getSingerInfo} from '../../server/server.js'
import { Accordion, Icon } from 'antd-mobile';
import Song from '../share/song.js';
import './singer.css';
export default class SingerInfo extends Component {
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
    let {singerid} = this.props.match.params;
    let data = await getSingerInfo({ singerid });
    if(!this.isMount){
      this.setState({
        data:data
      })
    }

    let image = new Image();
    image.src = data.singerInfo.imgurl.replace('{size}', 400)
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
    let { singerInfo = { imgurl: '', intro: ''}, songs={list:[]} } = this.state.data;
    return (
      <div className="singer-info">
        <Fragment>
          {
            this.state.imageLoading ?
              <Icon type="loading"></Icon>
              : <img src={singerInfo.imgurl.replace('{size}', 400)} alt=''/>
          }
        </Fragment>
        <Accordion className="my-accordion">
          <Accordion.Panel header={singerInfo.intro.slice(0,17)}>
            {singerInfo.intro.slice(17)}
          </Accordion.Panel>
        </Accordion>
        <Song list={songs.list}/>
      </div>
    )
  }
}
