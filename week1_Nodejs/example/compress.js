const fs = require('fs');
const zlib = require('zlib');
const url = require('url');
const fstream = require('fstream');
const tar = require('tar');

//获取命令行参数
let params = process.argv[2]

if(params==='--compress'){
    //压缩
    fs.createReadStream('about.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('about.txt.zip'))

}else if(params==='--extract'){
    //解压
    fs.createReadStream('about.txt.zip')
    .pipe(zlib.Gunzip())
    .pipe(fs.createWriteStream('./aboutme.txt'));

}else if(params.startsWith('dir')){
    
    let path = params.split('=')[1].split(',');


    // fstream.Reader({ 'path': path, 'type': 'Directory' }) /* Read the source directory */
    // .pipe(new tar.Pack()) /* Convert the directory to a .tar file */
    // .pipe(zlib.Gzip()) /* Compress the .tar file */
    // .pipe(fstream.Writer({ 'path': `./output/${path}.zip` })); /* Give the output file name */
    tar.c(
        {
          gzip: true,
          file: 'my-tarball.tgz'
        },
        path
      ).then(_ => { console.log(_) })

    //   tar.x(  // or tar.extract(
    //     {
    //       file: 'my-tarball.tgz',
    //       cwd:'out'
    //     }
    //   ).then(_=> {console.log(_)})
}