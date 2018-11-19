
import NewSong from '../views/newSong/newSong';
import Rank from '../views/rank/rank';
import Plist from '../views/plist/plist';
import Singer from '../views/singer/singer';
import SingerList from '../views/singer/singer-list';
import SingerInfo from '../views/singer/singer-info';
import Search from '../views/search/search.js';
import RankInfo from '../views/rank/rankinfo.js';
import PlistInfo from '../views/plist/plistinfo.js';
let navData = [
  {
    title: '新歌',
    path: '/',
    component: NewSong
  },
  {
    title: '排行',
    path: '/rank',
    component: Rank
  },
  {
    title: '歌单',
    path: '/plist',
    component: Plist
  },
  {
    title: '歌手',
    path: '/singer',
    component: Singer
  }
]
let other = [
  {
    path: '/search',
    title: '搜索',
    component: Search
  },
  {
    path: '/singer/list/:classid',
    title: '歌手列表',
    component: SingerList
  },
  {
    path: '/singer/info/:singerid',
    title: '歌手信息',
    component: SingerInfo
  },
  {
    path:'/rank/info/:rankid',
    title:'排行详情',
    component:RankInfo
  },
  {
    path:'/plist/list/:specialid',
    title:'排行详情',
    component:PlistInfo
  }
]
export { navData, other };
export default [...navData, ...other];