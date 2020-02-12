/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-03-30
 * Time: 21:26
 */
importScripts("../Compatibility/Base.js");
importScripts("../Compatibility/CanvasGraphics.js");
var g = CanvasRenderingContext2D;
var players;
var width;
var height;
var MX;
var MY;
var playerImg = new Image();
playerImg.src = "GameFolder/Images/player.png"
var bullets;


this.onmessage = function (data)
{
    players = data.players;
    width = data.width;
    height = data.height;
    MX = data.MX;
    MY = data.MY;
    playerImg =
    bullets = data.bullets;
    draw();
}
function draw()
{
    if (players.length > 0)
    {
        g.fillStyle = "red";
        for (var i =0; i < players.length; i++)
        {
            g.beginPath();
            g.save();
            if (i == MEID)
            {
                g.translate(width/2,height/2);
            }
            else
            {
                g.translate(players[i].x+MX,players[i].y+MY);
            }
            g.rotate(players[i].rot);
            g.drawImage(playerImg, 0, 0, 40, 64, -12, -32, 25, 40);
            g.closePath();
            g.restore();

            g.beginPath();
            g.fillStyle = "blue";
            for (var t = 0; t < bullets.length; t++)
            {
                g.rect(bullets[t].X-2 + MX,bullets[t].Y-2 +MY,4,4);

            }
            g.fill();
            g.closePath();

            g.beginPath();
            g.rect(players[i].x-20 + MX ,players[i].y-42 + MY,40,8)
            g.strokeStyle = "red";
            g.stroke();
            g.closePath();

            g.beginPath();
            g.rect(players[i].x-19 + MX,players[i].y-41 + MY,38 *(parseFloat(players[i].Hp)/parseFloat(players[i].HpMax)),6)
            g.fillStyle = "green";
            g.fill();
            g.closePath();
        }
    }
    this.postMessage(g);
}