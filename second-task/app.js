const http = require('http');
const fs = require('fs');
const path = require('path')

const fromFolder = 'C:\\Users\\jakob\\Documents\\praksa\\prvi-zadatak';
const toFolder = 'C:\\Users\\jakob\\Documents\\praksa\\prvi-zadatak-rjesenje';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello')
  res.end(' World');
});

function getDate(file){
  const { birthtime } = fs.statSync(file);
  return birthtime;
}
function compareDates(first, second){
  fileToCopy = getDate(first).getTime() > getDate(second).getTime() ? first : second;
  return fileToCopy;
}
// main
const folderNames = fs.readdirSync(fromFolder); // reading main folder
console.log('Folder names : ', folderNames); // logging

folderNames.forEach(function (name, index){
  var fromPath = path.join(fromFolder, name);
  var fileNames = fs.readdirSync(fromPath); // getting the file names
  var extFileNames = [];
  for(i=0; i < fileNames.length;i++){ // getting full path
    extFileNames[i] = fromPath + '\\' + fileNames[i];
  }
  if (extFileNames.length == 1)
  {
    fs.copyFileSync(extFileNames[0], toFolder + '\\' + name + '.pdf');
    console.log("Copied '" + extFileNames[0] + "' to '" + toFolder + "\\" + name + ".pdf'");
  }
  else
    {
      youngestFile = compareDates(extFileNames[0], extFileNames[1]);
      fs.copyFileSync(youngestFile, toFolder + '\\' + name + '.pdf');
      console.log("Copied '" + youngestFile + "' to '" + toFolder + "\\" + name + ".pdf'");
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log('Proccess started');
  console.log('Process ended');
});