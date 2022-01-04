// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
    const query = event.query
    try {
        return await db.collection("books").where(_.or([
            {
                name: db.RegExp({
                    regexp:query, // 使用正则查询，实现对搜索的模糊查询 
                    options:'i' // 不区分大小写
                })
            }, 
            {
                // 类型
                type: db.RegExp({
                    regexp:query, 
                    options:'i'
                })
            }
        ])).get()
    } catch (error) {
        console.error(err);
    }
}