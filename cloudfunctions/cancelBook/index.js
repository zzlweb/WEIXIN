// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  if (event._id instanceof Array) {
    try {
        return await db.collection('books').where({
          openid: event._id[0]
        }).update({
          data: {
            status: false,
            openid: '',
          },
        })
    } catch (error) {
      return error
    }
  } else {
    try {
      return await db.collection('books').where({
        _id: event._id
      }).update({
        data: {
          status: false,
          openid: '',
        },
      })
    } catch (error) {
      return error
    }
  }
}