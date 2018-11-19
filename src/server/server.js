import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000/abc';
axios.interceptors.response.use(function ({data}) {
  let o = {};
  if (data.banner){ 
    o.list = data.data;
    o.banner = data.banner;
    o.origin = '新歌';
  } else if (data.rank){
    o.list = data.rank.list;
    o.total = data.rank.total;
    o.origin = '排行';
  } else if (data.plist){
    o.list = data.plist.list.info;
    o.total = data.plist.list.total;
    o.origin = '歌单';
  }else if(data.list&&data.info){
    o.list=data.info.list;
    o.info=data.list.list.info;
    o.origim='歌单详情';
  } else if (data.list){
    o.list = data.list;
    o.origin = '歌手';
  }else if (data.singers) {
    o.list = data.singers.list.info;
    o.origin = '歌手列表';
  }else if(data.info&&data.songs&&data.info.rankid){
    o.rankInfo = data.info;
    o.songs = data.songs;
    o.origin = '排行详情';
  }else if (data.info) {
    o.singerInfo = data.info;
    o.songs = data.songs;
    o.origin = '歌手信息';
  }else{
    o=data;
  }
  return o;
})

function request(option){
  let defaults = {
    method: 'get',
    path: '',
    params:{}
  }
  Object.assign(defaults,option);
  return axios[defaults.method](defaults.path,{ params: defaults.params}).catch((e) => {
    alert('出错:'+e);
  })
}
export function getNewSong() {
  return request({ path: '/?json=true'})
}
export function getRank() {
  return request({ path: '/rank/list?json=true'})
}
export function getPlist() {
  return request({ path: '/plist/index?json=true'})
}
export function getSinger() {
  return request({ path: '/singer/class?json=true'})
}
export function getSingerList(params = { classid:''}) {
  return request({ path: `/singer/list/${params.classid}?json=true` })
}
export function getSingerInfo(params = { singerid: '' }) {
  return request({ path: `/singer/info/${params.singerid}?json=true` })
}
export function getSongInfo(option) {
  let defaults={
    hash:'',
    cmd:'playInfo'
  }
  Object.assign(defaults,option);
  return request({ path: `/app/i/getSongInfo.php`,params: defaults})
}
export function getSongKrc(option) {
  let defaults={
    hash: '',
    keyword: '',
    timelength:242000,
    cmd: 100
  }
  Object.assign(defaults,option);
  return request({ path: `/app/i/krc.php`,params: defaults})
}
export function getRankInfo(params = { rankid: '' }) {
  return request({ path: `/rank/info/${params.rankid}?json=true` })
}
export function getPlistInfo(params = { specialid: '' }) {
  return request({ path: `/plist/list/${params.specialid}?json=true` })
}

