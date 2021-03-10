const piexif = require("piexifjs");
const fs = require("fs");
const Jimp = require('jimp');

async function changeImage(pathImg) {
    let filename = pathImg;
    // await cahngeExif(filename);
    await cahngePixelColor(filename);
    await renameFile(pathImg);

}

changeImage('4.png');

async function renameFile(pathImg) {
    let extractFormat = pathImg.match(/\.\w*/gm);
    console.log(extractFormat);

    fs.rename(pathImg, '5' + extractFormat, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
}

async function cahngePixelColor(filename) {
    const image = await Jimp.read(filename);
    console.log('default pixel color', image.getPixelColor(1, 1));
    image.setPixelColor(15027215, 1, 1); // рандомизировать
    console.log('changed pixel color', image.getPixelColor(1, 1));
    // меняем вес фотографии
    image.quality(30); // рандомизировать
    image.write(filename);
}

async function cahngeExif(filename) {
    var jpeg = fs.readFileSync(filename);
    var data = jpeg.toString("binary");

    var zeroth = {};
    var exif = {};
    var gps = {};
    zeroth[piexif.ImageIFD.Make] = "Make"; // рандомизировать
    zeroth[piexif.ImageIFD.XResolution] = [777, 1]; // рандомизировать
    zeroth[piexif.ImageIFD.YResolution] = [777, 1]; // рандомизировать
    zeroth[piexif.ImageIFD.Software] = "Adobe Photoshop";
    exif[piexif.ExifIFD.DateTimeOriginal] = "2010:10:10 10:10:10"; // рандомизировать
    exif[piexif.ExifIFD.LensMake] = "LensMake"; // рандомизировать
    exif[piexif.ExifIFD.Sharpness] = 777; // рандомизировать
    exif[piexif.ExifIFD.LensSpecification] = [[1, 1], [1, 1], [1, 1], [1, 1]];
    gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7]; // рандомизировать
    gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99"; // рандомизировать
    var exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};

    console.log('exifObj', exifObj);

    var exifbytes = piexif.dump(exifObj);

    var newData = piexif.insert(exifbytes, data);
    var newJpeg = Buffer.from(newData, "binary");

    fs.writeFileSync(filename, newJpeg);
}
