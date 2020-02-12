/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-02-19
 * Time: 09:48
 * To change this template use File | Settings | File Templates.
 */
document.MouseShoting = false;
document.tempX2 = 0;
document.tempY2 = 0;
document.tempX3 = 0;
document.tempY3 = 0;
document.MousePosOld = new Point(0,0);
document.lastShoot = true;
var OldPos = new Point(0,0);
var tempMove = false;
function MouseUpdater()
{
    if(document.running && document.players.length >0)
    {
        document.Canvas.className = "NoCursor";
        setTimeout(MouseUpdater,1000/60);
        for(var i =0; i < document.players.length; i++)
        {
            if (document.players[i].username == document.user)
            {
                document.MEID = i;
            }
        }
        document.tempX = document.players[document.MEID].x;
        document.tempY = document.players[document.MEID].y;
        if (document.MEID != undefined && (document.players[document.MEID].x != OldPos.X || document.players[document.MEID].y != OldPos.Y))
        {
            tempMove = true;
        }
        if (document.MEID != undefined && (document.MousePos.X != document.MousePosOld.X || document.MousePos.Y != document.MousePosOld.Y || tempMove))
        {
            OldPos.X = document.players[document.MEID].x;
            OldPos.Y = document.players[document.MEID].y;
            if (document.tempX2 ==0)
            {
                sendMouse(parseInt(document.MousePos.X),parseInt(document.MousePos.Y));
            }
            else
            {
                document.tempX3 = document.tempX2-document.tempX;
                document.tempY3 = document.tempY2-document.tempY;
                document.MousePos.X -= document.tempX3;
                document.MousePos.Y -= document.tempY3;
                sendMouse(parseInt(document.MousePos.X),parseInt(document.MousePos.Y));
            }
            document.tempX2 = document.players[document.MEID].x;
            document.tempY2 = document.players[document.MEID].y;
            document.MousePosOld.X = document.MousePos.X;
            document.MousePosOld.Y = document.MousePos.Y;

        }
    }
}

function getMousePos(canvas, evt)
{
    if (canvas)
    {
        var rect = canvas.getBoundingClientRect();
        return{
            X: evt.clientX - rect.left,
            Y: evt.clientY - rect.top
        };
    }
    else
    {
        return{
            X:0,
            Y:0
        }
    }
}

function MouseShoot()
{
    if(document.running && document.players.length >0)
    {
        setTimeout(MouseShoot,1000/60);
        if (document.MouseShoting)
        {
            if (!document.lastShoot)
            {
                sendShoot(1);
            }
            document.lastShoot = true;

        }
        else
        {
            if (document.lastShoot)
            {
                sendShoot(0);
                document.lastShoot = false;
            }
        }
    }
}
document.GameHolder = document.getElementById("Spelet");
document.GameHolder.onmousedown = function(evt)
{
    document.GameHolder.requestFullScreen =
        evt.target.requestFullScreen ||
        evt.target.webkitRequestFullScreen ||
        evt.target.mozRequestFullScreen ||
        evt.target.msRequestFullScreen ||
        evt.target.oRequestFullScreen ||
        evt.target.khtmlRequestFullScreen;
    if (document.GameHolder.requestFullScreen)
    {
        if (document.GameHolder.webkitRequestFullScreen)
        {
            document.GameHolder.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        else
        {
            document.GameHolder.requestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    }
}

document.Canvas.onmouseup =  function(evt)
{
    document.MouseShoting = false;
}

document.Canvas.onselectstart = function()
{
    return false;
}




document.MousePosLock = new Point(0,0);
//window.addEventListener('mousemove', WindowMouse, false);
function WindowMouse(evt)
{
    document.MousePosLock.X = getMousePos(document.Canvas,evt).X- document.MX;
    document.MousePosLock.Y = getMousePos(document.Canvas,evt).Y- document.MY;
}
var activated = false;
document.Canvas.addEventListener('mousemove', function(evt)
{
    if (document.players.length >0 && activated != true)
    {
        activated = true;
        document.Canvas.onmousedown = function(evt)
        {
            evt.target.reguestPointerLock =
                evt.target.requestPointerLock ||
                evt.target.webkitRequestPointerLock ||
                evt.target.msRequestPointerLock ||
                evt.target.mozRequestPointerLock;

            if (evt.target.reguestPointerLock)
            {
                var lock = document.pointerLockElement === elem || document.mozpointerLockElement === elem || document.webkitpointerLockElement === elem
                if (!lock)
                {
                    evt.target.reguestPointerLock();
                }
            }
            document.MouseShoting = true;
            return false;
        }
    }

    var elem = evt.target;
    var lock = document.pointerLockElement === elem || document.mozpointerLockElement === elem || document.webkitpointerLockElement === elem
    if (lock)
    {
        window.removeEventListener('mousemove', WindowMouse, false);
        var x = evt.movementX || evt.mozMovementX || evt.webkitmovementX;
        var y = evt.movementY || evt.mozMovementY || evt.webkitmovementY;
        if(x > 0 || x < 0)
        {
            document.MousePosLock.X += x;
        }
        if(y > 0 || y < 0)
        {
            document.MousePosLock.Y += y;
        }

        if (document.MousePosLock.X < 0-document.MX+2)
        {
            document.MousePosLock.X = 0-document.MX+2;
        }
        if (document.MousePosLock.Y < 0-document.MY+2)
        {
            document.MousePosLock.Y = 0-document.MY+2;
        }
        if (document.MousePosLock.X > document.Canvas.width-document.MX-2)
        {
            document.MousePosLock.X = document.Canvas.width-document.MX-2;
        }
        if (document.MousePosLock.Y > document.Canvas.height-document.MY-2)
        {
            document.MousePosLock.Y = document.Canvas.height-document.MY-2;
        }
        document.MousePos = document.MousePosLock;
    }
    else
    {
        window.addEventListener('mousemove', WindowMouse, false);
        document.MousePos = new mousePos(getMousePos(document.Canvas, evt).X - document.MX,getMousePos(document.Canvas, evt).Y - document.MY);
    }
}, false);