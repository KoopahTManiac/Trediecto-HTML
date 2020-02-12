/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-03-17
 * Time: 17:10
 */
document.Canvas = document.getElementById("MyCanvas");
document.g = document.Canvas.getContext("2d");


function LoadTiles(Width, Height, x, y)
{
    var TileImage = new Image();
    TileImage.src = "GameFolder/Images/Tiles.png";

    var MapTileHolder = createArray(x,y);
    var canvas = document.createElement("canvas");
    var g = canvas.getContext("2d");
    canvas.width = Width;
    canvas.height = Height;
    for (var i =0; i < x; i++)
    {
        for (var t=0; t < y; t++)
        {
            g.beginPath();
            g.drawImage(TileImage,t*Width,i*Height,Width,Height,0,0,Height,Width);
            g.closePath();
            MapTileHolder[t][i] = new Image();
            MapTileHolder[t][i].src = canvas.toDataURL("image/png");
            document.g.beginPath();
            document.g.drawImage(canvas,0,0);
            document.g.closePath();
        }
    }
    return MapTileHolder;
}