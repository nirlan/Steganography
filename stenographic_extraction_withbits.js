// Just a code to extract a hidden image from a steganographic image.

function pixchange(pixval, clearbitshidden, hiddenbits) {
    var x = pixval - Math.floor(pixval / clearbitshidden) * clearbitshidden;
    var y = x * hiddenbits;
    return y;
}
function extracthide(image, clearbitshidden, hiddenbits) {
    var hide = new SimpleImage(image.getWidth(), image.getHeight());
    for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var r = pixel.getRed();
        var g = pixel.getGreen();
        var b = pixel.getBlue();
        var hidepx = hide.getPixel(x, y);
        hidepx.setRed(pixchange(r, clearbitshidden, hiddenbits));
        hidepx.setGreen(pixchange(g, clearbitshidden, hiddenbits));
        hidepx.setBlue(pixchange(b, clearbitshidden, hiddenbits));
    }
    return hide;
}
function startimg(image, clearbitshidden) {
    var start = new SimpleImage(image.getWidth(), image.getHeight());
     for (var pixel of image.values()) {
        var x = pixel.getX();
        var y = pixel.getY();
        var r = pixel.getRed();
        var g = pixel.getGreen();
        var b = pixel.getBlue();
        var startpx = start.getPixel(x, y);
        startpx.setRed(Math.floor(r / clearbitshidden) * clearbitshidden);
        startpx.setGreen(Math.floor(g / clearbitshidden) * clearbitshidden);
        startpx.setBlue(Math.floor(b / clearbitshidden) * clearbitshidden);
    }
    return start;
}

// Define the steganographic image in the "image" variable.

var image = new SimpleImage("stegoimage.png");
var start = new SimpleImage(image.getWidth(), image.getHeight());
var hide = new SimpleImage(image.getWidth(), image.getHeight());

// Choose above in "bits" variable how many bits were used to hide the image
// that will be extracted.

bits = 2;
hbit = 8 - bits;
clearbitshidden = Math.pow(2, bits);
hiddenbits = Math.pow(2, hbit);

print(image);

hide = extracthide(image, clearbitshidden, hiddenbits);
print(hide);
start = startimg(image, clearbitshidden);
print(start);
