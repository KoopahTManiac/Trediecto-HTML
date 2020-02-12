/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-03-16
 * Time: 20:39
 */
var command;
var message;
document.MEID;
function Protokoll(evt)
{
    if (typeof evt.data === "string")
    {
        message = evt.data;
        var messages = message.split(';');
        if (messages[0] == "Msg") //msg received
        {
            WriteMessage("<p>" + messages[1] + ": " + messages[2] + "</p>");
            document.status = "Message:" + messages[2].toString();
        }
        else
        {
            WriteMessage("<p>" + messages[0] + "</p>");
            document.status = "Message:" + messages[0].toString();
        }
    }
    else {
        //if (event.data instanceof ArrayBuffer)
        //{
            if (evt.data.byteLength && evt.data.byteLength > 0)
            {
                command = new Uint8Array(evt.data, 0, 1);

                if (command[0] == 1)
                {
                    Command1(evt);
                }
                else if (command[0] == 2)
                {
                    Command2(evt);
                }
                else if (command[0] == 3)
                {
                    Command3(evt);
                }
                else if (command[0] == 4)
                {
                    Command4(evt);
                }
                else if (command[0] == 5)
                {
                    Command5(evt);
                }
                else if (command[0] == 6)
                {
                    Command6(evt);
                }
                else if (command[0] == 7)
                {
                    Command7(evt);
                }
                else if (command[0] == 8)
                {
                    Command8(evt);
                }
                else if (command[0] == 9)
                {
                    Command9(evt);
                }
                else if (command[0] == 10)
                {
                    Command10(evt);
                }
                else if (command[0] == 201)
                {
                    Command201(evt);
                }
            }
        //}
    }
}

function Command1(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);
    var THP = new Int32Array(Tdata, 4, 1);
    var TMHP = new Int32Array(Tdata, 8, 1);
    var TPOSX = new Int32Array(Tdata, 12, 1);
    var TPOSY = new Int32Array(Tdata, 16, 1);
    var TRotation = new Int32Array(Tdata, 20, 1);
    var TSpeed = new Int32Array(Tdata, 24, 1);
    var TIntUsername = new Uint8Array(Tdata, 28, 1);
    var TUsername = pack(new Uint8Array(Tdata, 29, TIntUsername[0] * 2));
    var tempPlayer = new player(TID[0], THP[0], TMHP[0], TPOSX[0], TPOSY[0], TUsername, TRotation[0], TSpeed[0], TID[0]);
    var TFound = false;
    for (var i = 0; i < document.players.length; i++)
    {
        if (document.players[i].username == tempPlayer.username)
        {
            TFound = true;
        }
    }
    if (TFound != true)
    {
        document.players.push(tempPlayer);
        for (var i = 0; i < document.players.length; i++)
        {
            if (document.players[i].username == document.user)
            {
                document.MEID = i;
            }
        }
    }
}
function Command2(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);
    for (var i = 0; i < document.players.length; i++)
    {
        if (document.players[i].ID == TID[0])
        {
            document.players.splice(i, 1);
        }
    }
}
function Command3(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);
    for (var i = 0; i < document.players.length; i++)
    {
        if (document.players[i].ID == TID[0])
        {
            document.players[i].xnew = new Int32Array(Tdata, 4, 1)[0];
            document.players[i].ynew = new Int32Array(Tdata, 8, 1)[0];
        }
    }
}
function Command4(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);
    for (var i = 0; i < document.players.length; i++)
    {
        if (document.players[i].ID == TID[0])
        {
            document.players[i].rot = new Float32Array(Tdata, 4, 1)[0];
        }
    }
}
function Command5(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);
    for (var i = 0; i < document.players.length; i++)
    {
        if (document.players[i].ID == TID[0])
        {
            document.players[i].Hp = new Int32Array(Tdata, 4, 1)[0];
            document.players[i].HpMax = new Int32Array(Tdata, 8, 1)[0];
        }
    }
}
function Command6(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);
    var found = false;
    for (var i = 0; i < document.bullets.length; i++)
    {
        if (document.bullets[i].ID == TID[0])
        {
            found = true;
        }
    }
    if (found != true) {
        var TX = new Int32Array(Tdata, 4, 1)[0];
        var TY = new Int32Array(Tdata, 8, 1)[0];
        var TX_ = new Int32Array(Tdata, 12, 1)[0];
        var TY_ = new Int32Array(Tdata, 16, 1)[0];
        document.bullets.push(new bullet(TX, TY,TX_,TY_, TID[0]));
        MPlayer.shoot.play();
    }
}
function Command7(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);
    var found = false;
    for (var i = 0; i < document.bullets.length; i++)
    {
        if (document.bullets[i].ID == TID[0])
        {
            document.bullets.splice(i, 1);
        }
    }
}
function Command8(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);
    var found = false;
    for (var i = 0; i < document.bullets.length; i++)
    {
        if (document.bullets[i].ID == TID[0])
        {
            document.bullets[i].X = new Int32Array(Tdata, 4, 1)[0];
            document.bullets[i].Y = new Int32Array(Tdata, 8, 1)[0];
        }
    }
}
function Command9(evt)
{
    var Tdata = evt.data.slice(1);
    var ReaderLenght = new Int32Array(Tdata, 0, 1);
    var Reader = pack(new Uint8Array(Tdata, 4, ReaderLenght[0] * 2));
    document.mapData = StringToMap(Reader);
    var LoadMapTimer = setTimeout(DrawMap,600);
}
function Command10(evt)
{
    var Tdata = evt.data.slice(1);
    var TID = new Int32Array(Tdata, 0, 1);

    for (var i = 0; i < document.players.length; i++)
    {
        if (document.players[i].ID == TID[0])
        {
            var Score = new Uint32Array(Tdata, 4,1)[0];
            var ScoreMax = new Uint32Array(Tdata, 8,1)[0];
            document.players[i].score = Score;
            document.players[i].scoremax = ScoreMax;
        }
    }
}
function Command201(evt)
{
    document.running = false;
    var Tdata = evt.data.slice(1);
    var Success = new Uint8Array(Tdata,0,1)[0];
    document.g.textAlign = "center";
    if (Success == 1)
    {
        drawS();
    }
    if (Success == 2)
    {
        drawF();
    }
}
function drawF()
{
    document.g.beginPath();
    document.g.clearRect(0,0,document.Canvas.width,document.Canvas.height);
    document.g.fillStyle = "gray";
    document.g.fillRect(0,0,document.Canvas.width,document.Canvas.height);
    document.g.fill();
    document.g.fillStyle = "white";
    document.g.fillText("Failed To Register The Account Already Exists!" , document.Canvas.width/2, document.Canvas.height/2);
    document.g.closePath();
}
function drawS()
{
    document.g.beginPath();
    document.g.clearRect(0,0,document.Canvas.width,document.Canvas.height);
    document.g.fillStyle = "gray";
    document.g.fillRect(0,0,document.Canvas.width,document.Canvas.height);
    document.g.fill();
    document.g.fillStyle = "white";
    document.g.fillText("Your Account Is Registered Plz Login To Play!" , document.Canvas.width/2, document.Canvas.height/2);
    document.g.closePath();
}
function sendMouse(x,y)
{
    var buffer = new ArrayBuffer(9);
    var command = new Uint8Array(buffer,0,1);
    var ValueX = new Uint8Array(buffer,1,4);
    var ValueY = new Uint8Array(buffer,5,4);
    command[0] = 2;

    ValueX[0] = IntToByte4(x)[0];
    ValueX[1] = IntToByte4(x)[1];
    ValueX[2] = IntToByte4(x)[2];
    ValueX[3] = IntToByte4(x)[3];

    ValueY[0] = IntToByte4(y)[0];
    ValueY[1] = IntToByte4(y)[1];
    ValueY[2] = IntToByte4(y)[2];
    ValueY[3] = IntToByte4(y)[3];
    document.ws.send(buffer);
}
function sendShoot(shoot)
{
    var buffer = new ArrayBuffer(2);
    var command = new Uint8Array(buffer,0,1);
    var Values = new Uint8Array(buffer,1,1);
    command[0] = 3;
    Values[0] = shoot;
    document.ws.send(buffer);
}
function SendMovePlayer(direction)
{
    var directionInt = direction;
    if (typeof direction === "string")
    {
        directionInt = parseInt(direction);
    }
    if (window.ArrayBuffer)
    {
        var buffer = new ArrayBuffer(2);
        var command = new Uint8Array(buffer,0,2);
        command[0] = 1;
        command[1] = directionInt;
        document.ws.send(command);
    }
    else
    {
        document.ws.send("Move;"+ direction.toString());
    }
}
function IntToByte4(value)
{
    var Array = new Int8Array(4);
    Array[3] = (value & 0xFF);
    Array[2] = ((value >> 8) & 0xFF);
    Array[1] = ((value >> 16) & 0xFF);
    Array[0] = ((value >> 24) & 0xFF);
    return Array;
}