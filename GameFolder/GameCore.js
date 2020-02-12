//Canvas draw functions
//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) image , image starting path:x,y image height:width,height where to draw : x,y size of draw : width, height

/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2012-11-05
 * Time: 15:22
 * To change this template use File | Settings | File Templates.
 */


document.stats = new Stats();
document.MEID =0;
var MPlayer = new MusicPlayer();




function Position(el) {
    var position = {left: 0, top: 0};
    if (el) {
        if (!isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
            position.left += el.offsetLeft;
            position.top += el.offsetTop;
        }
    }
    return position;
}
function AddUser()
{
    if (document.Canvas)
    {
        var g = document.Canvas.getContext("2d");
        g.beginPath();
        g.fillStyle = "gray";
        g.clearRect(0,0, document.Canvas.width,document.Canvas.height);
        g.fillRect(0,0, document.Canvas.width, document.Canvas.height);
        g.fill();
        g.fillStyle = "red";
        g.font = "40px Calibri";
        g.textAlign = "center";
        g.fillText("Plz Wait Trying To Register Your Account",document.Canvas.width/2,200);
        g.closePath();
        g.textAlign = "left";
    }
    document.user = document.getElementById("username").value;
    document.password = document.getElementById("password").value;

    document.ws = new WebSocket("ws://212.25.140.23:8181");
    document.ws.binaryType = "arraybuffer";
    document.ws.onopen = function ()
    {
        if (window.ArrayBuffer)
        {
            //login
            var buffer = new ArrayBuffer(64);
            var command = new Uint8Array(buffer, 0, 1);
            command[0] = 201;
            var lenght1 = new Uint8Array(buffer, 1, 1);
            lenght1[0] = document.user.length;
            var lenght2 = new Uint8Array(buffer, 2, 1);
            lenght2[0] = document.password.length;
            var usernameA = new Uint8Array(buffer, 3, document.user.length * 2);
            var tempU = unpack(document.user);
            for (var i = 0; i < document.user.length * 2; i++) {
                usernameA[i] = tempU[i];
            }
            var passwordA = new Uint8Array(buffer, 3 + document.user.length * 2, document.password.length * 2);
            var tempP = unpack(document.password);
            for (var i = 0; i < document.password.length * 2; i++) {
                passwordA[i] = tempP[i];
            }
            document.ws.send(buffer);
            document.status = "Open Socket";

            //Get Players
            var buffer2 = new ArrayBuffer(1);
            var command = new Uint8Array(buffer2, 0, 1);
            command[0] = 0;
            document.ws.send(buffer2);
        }
        else
        {
            alert("You Are Using A Browser That Is OutDated Or Not Supported");
        }
    };
    document.ws.onmessage = function (evt)
    {
        Protokoll(evt);
    }
}
function UpdateUser()
{
    if (document.Canvas)
    {
        var g = document.Canvas.getContext("2d");
        g.beginPath();
        g.fillStyle = "gray";
        g.clearRect(0,0, document.Canvas.width,document.Canvas.height);
        g.fillRect(0,0, document.Canvas.width, document.Canvas.height);
        g.fill();
        g.fillStyle = "red";
        g.font = "40px Calibri";
        g.textAlign = "center";
        g.fillText("Logging In Plz Wait Till Its Loaded",document.Canvas.width/2,200);
        g.closePath();
        g.textAlign = "left";
    }


    document.gameRunning = true;
    document.stats.setMode(0); // 0: fps, 1: ms
    document.stats.domElement.style.position = 'absolute';
    document.stats.domElement.style.left = '0px';
    document.stats.domElement.style.top = '42px';

    document.body.appendChild( document.stats.domElement );


	document.user = document.getElementById("username").value;
	document.password = document.getElementById("password").value;

    DrawMap();
	
	WriteMessage("<p>WebSocket is supported by your Browser!<p>");
    document.ws = new WebSocket("ws://212.25.140.23:8181");
    document.ws.binaryType = "arraybuffer";
    document.ws.onopen = function () {
        if (window.ArrayBuffer) {
            //login
            var buffer = new ArrayBuffer(64);
            var command = new Uint8Array(buffer, 0, 1);
            command[0] = 200;
            var lenght1 = new Uint8Array(buffer, 1, 1);
            lenght1[0] = document.user.length;
            var lenght2 = new Uint8Array(buffer, 2, 1);
            lenght2[0] = document.password.length;
            var usernameA = new Uint8Array(buffer, 3, document.user.length * 2);
            var tempU = unpack(document.user);
            for (var i = 0; i < document.user.length * 2; i++) {
                usernameA[i] = tempU[i];
            }
            var passwordA = new Uint8Array(buffer, 3 + document.user.length * 2, document.password.length * 2);
            var tempP = unpack(document.password);
            for (var i = 0; i < document.password.length * 2; i++) {
                passwordA[i] = tempP[i];
            }
            document.ws.send(buffer);
            document.status = "Open Socket";

            //Get Players
            var buffer2 = new ArrayBuffer(1);
            var command = new Uint8Array(buffer2, 0, 1);
            command[0] = 0;
            document.ws.send(buffer2);
        }
        else {
            alert("You Are Using A Browser That Is OutDated Or Not Supported");
        }
        reset();
    };
    document.ws.onmessage = function (evt)
    {
        Protokoll(evt);
    };
    document.ws.onclose = function () {
        // websocket is closed.
        WriteMessage("<p> Connection is closed... </p>");
        if (document.Canvas)
        {
            document.running = false;
            var timer1 = setTimeout(DrawDisconect,500);
        }
        document.status = "Closed Socket";
    };
}
function DrawDisconect()
{
    var g = document.Canvas.getContext("2d");
    g.beginPath();
    g.clearRect(0,0, document.Canvas.width,document.Canvas.height);
    g.fillStyle = "gray";
    g.fillRect(0,0, document.Canvas.width, document.Canvas.height);
    g.fill();
    g.fillStyle = "red";
    g.font = "40px Calibri";
    g.textAlign = "center";
    g.fillText("You Got Disconected!!",document.Canvas.width/2,200);
    g.fillText("Wrong Password/Username? Or Server Closed?",document.Canvas.width/2,250);
    g.closePath();
}