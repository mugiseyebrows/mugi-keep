
const path = require('path')
const fs = require('fs')

function keep(opts_) {
    var opts = Object.assign({},{local:true,path:null,keep:true},opts_ || {})
    opts.local = opts.path === null
    return (src) => {
        return new Promise((resolve,reject)=>{
            if (!opts.keep) {
                resolve()
                return
            }
            var basename = path.basename(src)
            var dirname = opts.local ? path.dirname(src) : opts.path
            var i = 0
            var dst = path.join(dirname,`${basename}.${i}.bak`)
            while (fs.existsSync(dst)) {
                i += 1
                dst = path.join(dirname,`${basename}.${i}.bak`)
            }
            fs.copyFile(src,dst,()=>{
                resolve(dst)
            })
        })
    }
}

module.exports = keep