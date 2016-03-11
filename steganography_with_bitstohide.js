// This is a code that I wrote during the "Programming and Web for Beginnners"
// course by Duke University. In this code you can choose a start image and a 
// image to hide, and than, set how many bits to use to hide the image.

function pixchange(pixval, bitstohide) {
    var x = Math.floor(pixval/bitstohide) * bitstohide;
    return x;
}
function chop2hide(image, bitstohide) {
    for (var pixel of image.values()) {
        pixel.setRed(pixchange(pixel.getRed(), bitstohide));
        pixel.setGreen(pixchange(pixel.getGreen(), bitstohide));
        pixel.setBlue(pixchange(pixel.getBlue(), bitstohide));
    }
    return image;
}
function shift(image, hiddenbits) {
    var newimage = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var nimpx = newimage.getPixel(x, y);
        nimpx.setRed(Math.floor(pixel.getRed()/hiddenbits));
        nimpx.setGreen(Math.floor(pixel.getRed()/hiddenbits));
        nimpx.setBlue(Math.floor(pixel.getBlue()/hiddenbits));
    }
    return newimage;
}
function combine(start, hide) {
    var stego = new SimpleImage(start.getWidth(), start.getHeight());
    for (var hidepx of hide.values()) {
        var x = hidepx.getX();
        var y = hidepx.getY();
        var stegopx = stego.getPixel(x, y);
        var startpx = start.getPixel(x, y);
        stegopx.setRed(hidepx.getRed() + startpx.getRed());
        stegopx.setGreen(hidepx.getGreen() + startpx.getGreen());
        stegopx.setBlue(hidepx.getBlue() + startpx.getBlue());
    }
    return stego;
}

//Define above the starting image and the image that you want to hide.

var start = new SimpleImage("Starting_Image.jpg");
var hide = new SimpleImage("Hidden_Image.jpg");

// Define above in "bits" variable how many bits you want to use 
// to hide the image.

bits = 2;
hbit = 8 - bits;
bitstohide = Math.pow(2, bits);
hiddenbits = Math.pow(2, hbit);

start = chop2hide(start, bitstohide);
hide = shift(hide, hiddenbits);
var stego = combine(start, hide);
print(stego);

