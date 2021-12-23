/**
 * 这个文件可以导出公共使用的字段
 */
module.exports = {
    createAt:{//创建时间
        type:Date,
        default:Date.now
    },
    updatedAt:{//更新时间
        type:Date,
        default:Date.now
    }
}