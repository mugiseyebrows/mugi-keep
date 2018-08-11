
const keep = require('../index')
const fs = require('fs')
const path = require('path')
const os = require('os')

async function tests() {
    await keep({path:os.tmpdir()})(path.join(__dirname,'..','package.json'))
    await keep()(path.join(__dirname,'..','package.json'))
    await keep()(path.join(__dirname,'..','package.json'))
    await keep({keep:false})(path.join(__dirname,'..','index.js'))

    var data = [
        [path.join(os.tmpdir(),"package.json.0.bak"),true],
        [path.join(__dirname,'..','package.json.0.bak'),true],
        [path.join(__dirname,'..','package.json.1.bak'),true],
        [path.join(__dirname,'..','index.js.0.bak'),false]
    ]
    data.forEach(item => {
        var [p,e] = item
        if (fs.existsSync(p) != e) {
            console.log(`error: ${p} exists`)
        }
        if (fs.existsSync(p)) {
            console.log(`removing ${p}`)
            fs.unlink(p,()=>{})
        }
    })
}

tests().then(()=>{
    console.log(`tests complete`)
}) 
