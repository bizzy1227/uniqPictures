const {readFile} = require('fs').promises;
const getExif = require('get-exif');
const modifyExif = require('modify-exif');
 
(async () => {
  // The original photo is taken at 2017:11:19 08:47:19
  const originalFile = await readFile('origin_1.jpg');
  getExif(originalFile).Exif; //=> '2017:11:19 08:47:19'
 
  const newFile = modifyExif(await readFile('origin_1.jpg'), data => {
    // 36867: tag ID of `DateTimeOriginal` tag
    data.Exif['36867'] = '2018:06:15 12:00:00'
  });
 
  getExif(newFile).Exif; //=> '2018:06:15 12:00:00'
})();