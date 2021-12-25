var data = {
  //云开发开发环境id
  env: 'cloud1-1gzhbqmy42436072',
  //分享配置
  share_title: '云图书',
  share_img: '/images/poster.png', //可以是网络地址，本地文件路径要填绝对位置
  share_poster: '', //必须为网络地址
  //客服联系方式
  kefu: {
    weixin: 'zkzkzk',
    qq: '2368264874',
    gzh: '', //公众号二维码必须为网络地址
    phone: 'xxxx', //如果你不设置电话客服，就留空
  },
  //默认启动页背景图，防止请求失败完全空白
  //可以是网络地址，本地文件路径要填绝对位置
  bgurl: '/images/startImg.jpg',
  college: [
    {
      name: '平面',
      id: -1,
    },
    {
      name: '交互',
      id: 0,
    },
    {
      name: '前端',
      id: 1,
    },
    {
      name: '创新',
      id: 2,
    },
    {
      name: '新闻',
      id: 3,
    },
    {
      name: '杂志',
      id: 4,
    },
    {
      name: '其他',
      id: 5,
    },
  ],
};
function formTime(creatTime) {
  let date = new Date(creatTime),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  if (M < 10) {
    M = '0' + M;
  }
  if (D < 10) {
    D = '0' + D;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}

function days() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  let date = year + '' + month + day;
  return date;
}
module.exports = {
  data: JSON.stringify(data),
  formTime: formTime,
  days: days,
};
