# Rationale

Imagine you need to read modify and write back files (not a good idea most of the time, but sometimes you just need), 
what will happen if something go wrong? Wouldn't it be convinient to have copy of everything just in case?

# Usage

```javascript
var keep = require('mugi-keep')({path:os.tmpdir()})
var some_file = 'some_file.txt'
keep(some_file).then(()=>{
    fs.writeFileSync(some_file,`and now its gone (luckily we have copy in ${os.tmpdir()})`)
})
```

can be easily disabled in one place
```javascript
var keep = require('mugi-keep')({keep:false})
```

# Options

```javascript
{
    path: 'path to store *.bak files', // if not provided, *.bak files will be stored in same directory with original files
    keep: true // create *.bak files
}
```