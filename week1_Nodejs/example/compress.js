const fs = require('fs');
const zlib = require('zlib');
const url = require('url');
const fstream = require('fstream');
const tar = require('tar');

//获取命令行参数
let params = process.argv[2]
console.log(process.argv);

if (!params) return;
if (params === '--compress') {
  //压缩
  fs.createReadStream('./file/about.txt')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('./zip/about.txt.zip'))

} else if (params === '--extract') {
  //解压
  fs.createReadStream('./zip/about.txt.zip')
    .pipe(zlib.Gunzip())
    .pipe(fs.createWriteStream('./unzip/aboutme.txt'));

} else if (params.startsWith('--dir')) {
  //多文件/文件夹压缩

  let folders = params.split('=')[1];//node compress --dir=file,img,file.js
  console.log(folders)


  // fstream.Reader({ 'path': path, 'type': 'Directory' }) /* Read the source directory */
  // .pipe(new tar.Pack()) /* Convert the directory to a .tar file */
  // .pipe(zlib.Gzip()) /* Compress the .tar file */
  // .pipe(fstream.Writer({ 'path': `./output/${path}.zip` })); /* Give the output file name */

  if (folders) {
    // 根据传入的文件和路径组成的数组folders进行压缩
    folders = folders.split(',');
    tar.create(// or tar.c(
      {
        gzip: true,
        file: './zip/my-tarball.tgz'
      },
      folders
    )
    return
  }

  tar.extract(  // or tar.x(
    {
      file: './zip/my-tarball.tgz',
      cwd: 'unzip', //解压到当指定文件夹（必须提前创建）
    }
  )
}