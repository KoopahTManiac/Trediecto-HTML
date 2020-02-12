/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-02-19
 * Time: 09:41
 * To change this template use File | Settings | File Templates.
 */
function Point(X,Y)
{
    this.X = X;
    this.Y = Y;
}


WEB_SOCKET_SWF_LOCATION = "WebSocketMain.swf";


document.running = false;
document.map={};


function mousePos(X,Y)
{
    this.X=X;
    this.Y=Y;
}

document.MousePos = new mousePos(10,10);
document.Found = false;
document.keystate = 2;
document.CorrentFrame =0;
document.LastKeyDown={};
document.moving = false;
document.movingdirection = "None";




document.user = "test";
document.password = "test";
document.ws;
document.Canvas = document.getElementById("MyCanvas");
WebGL2D.enable(document.Canvas);
document.g = document.Canvas.getContext("2d");
document.x = 50;
document.y = 50;
document.status = "";
var gLoop;
var fps = 45, now, lastUpdate = (new Date)*1 - 1;
var fpsFilter = 10;
var thisFrameFPS = 1000 / ((now=new Date) - lastUpdate);



document.Canvas.onselectstart = function() { return false; };
document.Canvas.unselectable = "on";
document.Canvas.style.MozUserSelect = "none";




function createArray(length)
{
    var temp = new Array(length || 0);

    if (arguments.length > 1)
    {
        var args = Array.prototype.slice.call(arguments, 1)
        for (var  i = 0; i < length; i++)
        {
            temp[i] = createArray.apply(this, args);
            for (var t= 0; t < args; t++)
            {
                temp[i][t] = new Point(0,0);
            }
        }
    }
    return temp;
}

document.mapData = createArray(10,10);