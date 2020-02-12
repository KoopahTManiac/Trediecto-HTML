/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-02-19
 * Time: 09:47
 * To change this template use File | Settings | File Templates.
 */
var playerImg = new Image();
playerImg.src = "GameFolder/Images/player.png"
document.MX=0;
document.MY=0;
var MX = 0;
var MY = 0;
var MapCanvas = document.createElement("canvas");
var MapGraphics = MapCanvas.getContext("2d");
var BackGroundCanvas = document.createElement("canvas");
var BackGroundGraphics = BackGroundCanvas.getContext("2d");
var Worker1;
document.TileImages = LoadTiles(40,40,10,10);

function Updates()
{

}
function DrawMap()
{
    document.TileImages = LoadTiles(40,40,10,10);
    while (document.TileImages.length < 1)
    {
        document.TileImages = LoadTiles(40,40,10,10);
    }
    if (document.mapData && document.mapData.length >0)
    {
        var Temp = document.mapData[0];
        if (Temp.length > 0)
        {
            MapCanvas.width = document.mapData.length*40;
            MapCanvas.height = document.mapData[0].length*40;

            MapGraphics.beginPath()
            for (var x=0; x < document.mapData.length; x++)
            {
                for (var y = 0; y < Temp.length; y++)
                {
                    //MapGraphics.rect(x*40, y*40, 40, 40);
                    var TP = document.mapData[x][y];
                    var X = TP.X;
                    var Y = TP.Y;
                    var tempImage = document.TileImages[X][Y];
                    var TempLocX = x*40;
                    var TempLocY = y*40;
                    MapGraphics.drawImage(tempImage,TempLocX,TempLocY);
                }
            }
            MapGraphics.stroke();
            MapGraphics.closePath();
        }
    }
}

function draw()
{
    if (document.players.length > 0)
    {

        for (var i =0; i < document.players.length;i++)
        {
            if (document.players[i].username == document.user)
            {
                document.MEID = i;

            }
        }

        document.MX = document.Canvas.width/2-document.players[document.MEID].x;
        document.MY = document.Canvas.height/2-document.players[document.MEID].y;
        MX = document.Canvas.width/2-document.players[document.MEID].x;
        MY = document.Canvas.height/2-document.players[document.MEID].y;

        document.g.beginPath();
        document.g.drawImage(MapCanvas,0,0,MapCanvas.width,MapCanvas.height,MX,MY,MapCanvas.width,MapCanvas.height);
        document.g.closePath();


        document.g.beginPath();
        document.g.fillStyle = "red";
        document.g.rect(document.MousePos.X-2+MX,document.MousePos.Y-2+MY,4,4);
        document.g.fill();
        document.g.closePath();

        document.g.beginPath();
        document.g.fillStyle = "blue";
        for (var t = 0; t < document.bullets.length; t++)
        {
            var TC = Math.round(Math.random()*(105)+150);
            var TA = Math.round(Math.random()*(70)+30)/100;
            document.g.strokeStyle = "rgba("+TC+","+TC+","+TC+","+TA+")";
            //document.g.strokeStyle = "rgba(100,100,100,0.3)";
            document.g.lineWidth = 1;
            for (var p=0; p < document.players.length;p++)
            {
                if (document.bullets[t].X >= document.players[p].x-10 && document.bullets[t].X <= document.players[p].x +10)
                {
                    if (document.bullets[t].Y >= document.players[p].y-10 && document.bullets[t].Y <= document.players[p].y +10)
                    {
                        var radian = document.players[p].rot;
                        var rot = (radian % 6.28318531);
                        var vol_X = Math.cos(rot) *8;
                        var vol_Y = Math.sin(rot) *8;
                        var temp = new Point(document.players[p].x + vol_X,document.players[p].y + vol_Y);

                        radian = (((document.players[p].rot)*57.2957795-90)/57.2957795);
                        rot = (radian % 6.28318531);
                        vol_X = Math.cos(rot) *31;
                        vol_Y = Math.sin(rot) *31;
                        temp.X += vol_X;
                        temp.Y += vol_Y;

                        document.bullets[t].X = temp.X;
                        document.bullets[t].Y = temp.Y;
                    }
                }
            }
            document.g.moveTo(document.bullets[t].X + MX,document.bullets[t].Y + MY);
            document.g.lineTo(document.bullets[t].X_ + MX,document.bullets[t].Y_ + MY);
            document.g.stroke();
        }
        document.g.fill();
        document.g.closePath();


        if (document.players.length > 0)
        {
            document.g.fillStyle = "red";
            for (var i =0; i < document.players.length; i++)
            {
                //player
                document.g.beginPath();
                document.g.save();
                if (i == document.MEID)
                {
                  document.g.translate(document.Canvas.width/2,document.Canvas.height/2);
                }
                else
                {
                  document.g.translate(document.players[i].x+MX,document.players[i].y+MY);
                }
                document.g.rotate(document.players[i].rot);
                document.g.drawImage(playerImg, 0, 0, 40, 64, -12, -32, 25, 40);
                document.g.closePath();
                document.g.restore();
                //Player


                //HP
                document.g.beginPath();
                document.g.rect(document.players[i].x-20 + MX ,document.players[i].y-42 + MY,40,8)
                document.g.strokeStyle = "red";
                document.g.stroke();
                document.g.closePath();

                document.g.beginPath();
                document.g.rect(document.players[i].x-19 + MX,document.players[i].y-41 + MY,38 *(parseFloat(document.players[i].Hp)/parseFloat(document.players[i].HpMax)),6)
                document.g.fillStyle = "green";
                document.g.fill();
                document.g.closePath();
                //HP

                //Name
                document.g.fillStyle = "white";
                document.g.textAlign = "center";
                var tempx = parseInt(document.players[i].x) + 10 + MX;
                var tempy = parseInt(document.players[i].y) - 10 + MY;
                document.g.fillText(document.players[i].username, tempx-10 , tempy-40 ,100);
                document.g.textAlign = "left";
                //Name

                //Score
                    document.g.textAlign = "center";
                    var tempx = parseInt(document.players[i].x) + 10 + MX;
                    var tempy = parseInt(document.players[i].y) - 10 + MY;
                    document.g.fillText(document.players[i].score, tempx-10 , tempy-50 ,100);
                    document.g.textAlign = "left";
                //Score
            }
        }
    }
}

function StartGameUi()
{
    document.Canvas = document.getElementById("MyCanvas");
    if (document.Canvas)
    {
        var g = document.Canvas.getContext("2d");
        g.beginPath();
        g.fillStyle = "gray";
        g.fillRect(0,0, document.Canvas.width, document.Canvas.height);
        g.fill();
        g.fillStyle = "red";
        g.font = "40px Calibri";
        g.textAlign = "center";
        //g.fillText("Welcome Plz Login To Play",document.Canvas.width/2,document.Canvas.height/2);
        g.closePath();
        g.textAlign = "left";
    }
}
StartGameUi();

function clear()
{
    if (document.Canvas)
    {
        document.Canvas.width = document.Canvas.width;
    }
}