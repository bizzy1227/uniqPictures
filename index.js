var piexif = require("piexifjs");
var fs = require("fs");
var Jimp = require('jimp');

(async () => {
    var filename = "origin_1.jpg";

    var jpeg = fs.readFileSync(filename);
    var data = jpeg.toString("binary");

    var zeroth = {};
    var exif = {};
    var gps = {};
    zeroth[piexif.ImageIFD.Make] = "Make";
    zeroth[piexif.ImageIFD.XResolution] = [777, 1];
    zeroth[piexif.ImageIFD.YResolution] = [777, 1];
    zeroth[piexif.ImageIFD.Software] = "Adobe Photoshop";
    exif[piexif.ExifIFD.DateTimeOriginal] = "2010:10:10 10:10:10";
    exif[piexif.ExifIFD.LensMake] = "LensMake";
    exif[piexif.ExifIFD.Sharpness] = 777;
    exif[piexif.ExifIFD.LensSpecification] = [[1, 1], [1, 1], [1, 1], [1, 1]];
    gps[piexif.GPSIFD.GPSVersionID] = [7, 7, 7, 7];
    gps[piexif.GPSIFD.GPSDateStamp] = "1999:99:99 99:99:99";
    var exifObj = {"0th":zeroth, "Exif":exif, "GPS":gps};

    console.log('exifObj', exifObj);

    var exifbytes = piexif.dump(exifObj);

    var newData = piexif.insert(exifbytes, data);
    var newJpeg = Buffer.from(newData, "binary");

    await cahngePixelColor(filename);
    fs.writeFileSync(filename, newJpeg);
})()



async function cahngePixelColor(filename) {
    const image = await Jimp.read(filename);
    console.log('default pixel color', image.getPixelColor(1, 1));
    image.setPixelColor(19027215, 1, 1);
    console.log('changed pixel color', image.getPixelColor(1, 1));
    image.write(filename);

}
