/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-02-18
 * Time: 11:41
 * To change this template use File | Settings | File Templates.
 */
document.WasShoothing = true;


function CheackKeysDown()
{
    if(document.running)
    {
        setTimeout(CheackKeysDown, 1000/60);
        if (CompareMap(document.map,document.LastKeyDown))
        {

        }
        else
        {
            if(document.map[38] == true && document.map[39] == true || document.map[87]== true && document.map[68]== true) //RightUp
            {
                SendMovePlayer("2");
                document.movingdirection = "RightUp";
            }
            else if(document.map[38] == true && document.map[37] == true || document.map[87]== true && document.map[65]== true) //LeftUp
            {
                SendMovePlayer("8");
                document.movingdirection = "LeftUp";
            }
            else if(document.map[40] == true && document.map[39] == true || document.map[83]== true && document.map[68]== true) //RightDown
            {
                SendMovePlayer("4");
                document.movingdirection = "RightDown";
            }
            else if(document.map[40] == true && document.map[37] == true || document.map[83]== true && document.map[65]== true) //LeftDown
            {
                SendMovePlayer("6");
                document.movingdirection = "LeftDown";
            }
            else if(document.map[38] == true || document.map[87]== true) //UP
            {
                SendMovePlayer("1");
                document.movingdirection = "Up";
            }
            else if(document.map[40] == true || document.map[83]== true) //DOWN
            {
                SendMovePlayer("5");
                document.movingdirection = "Down";
            }
            else if(document.map[39] == true || document.map[68]== true) //RIGHT
            {
                SendMovePlayer("3");
                document.movingdirection = "Right";
            }
            else if(document.map[37] == true || document.map[65]== true) //LEFT
            {
                SendMovePlayer("7");
                document.movingdirection = "Left";
            }
            else
            {
                SendMovePlayer("0");
                document.movingdirection = "None";
            }
            if(document.map[32] == true || document.map[17] == true)
            {
                document.WasShoothing = true;
                sendShoot(1);
            }
            else if (!document.MouseShoting && document.WasShoothing)
            {
                sendShoot(0);
                document.WasShoothing = false;
            }
        }
    }
}
function ReCheackKeysDown()
{
    if(document.running)
    {
        setTimeout(ReCheackKeysDown, 1000/30);
    }
    document.LastKeyDown = {};
}
function SmoothMovement()
{
    if(document.running)
    {
        setTimeout(SmoothMovement,1000/160);
    }
    for (var i =0; i < document.players.length; i++)
    {
        if (document.players[i].username == document.user)
        {
            document.players[i].correctionspeed = document.players[i].speed/2;
        }
        else
        {
            document.players[i].correctionspeed = document.players[i].speed;
        }
        if (document.players[i].x < document.players[i].xnew && document.players[i].y < document.players[i].ynew)
        {
            if (document.players[i].x < document.players[i].xnew -2* document.players[i].correctionspeed && document.players[i].x < document.players[i].xnew -2 * document.players[i].correctionspeed)
            {
                document.players[i].x += document.players[i].correctionspeed;
                document.players[i].y += document.players[i].correctionspeed;
            }
            else if (document.players[i].x < document.players[i].xnew -3)
            {
                document.players[i].x += document.players[i].correctionspeed;
            }
            else if (document.players[i].y < document.players[i].ynew -3)
            {
                document.players[i].y += document.players[i].correctionspeed;
            }
            else
            {
                //document.players[i].x += 1;
                //document.players[i].y += 1;
            }
        }
        else if (document.players[i].x < document.players[i].xnew && document.players[i].y > document.players[i].ynew)
        {
            if (document.players[i].x < document.players[i].xnew -2 * document.players[i].correctionspeed && document.players[i].y > document.players[i].ynew +2* document.players[i].correctionspeed)
            {
                document.players[i].x += document.players[i].correctionspeed;
                document.players[i].y -= document.players[i].correctionspeed;
            }
            else if (document.players[i].x < document.players[i].xnew -3)
            {
                document.players[i].x += document.players[i].correctionspeed;
            }
            else if (document.players[i].y > document.players[i].ynew +3)
            {
                document.players[i].y -= document.players[i].correctionspeed;
            }
            else
            {
                //document.players[i].x += 1;
                //document.players[i].y -= 1;
            }
        }
        else if (document.players[i].x > document.players[i].xnew && document.players[i].y < document.players[i].ynew)
        {
            if (document.players[i].x > document.players[i].xnew +2* document.players[i].correctionspeed && document.players[i].y < document.players[i].ynew -2*document.players[i].correctionspeed)
            {
                document.players[i].x -= document.players[i].correctionspeed;
                document.players[i].y += document.players[i].correctionspeed;
            }
            else if (document.players[i].x > document.players[i].xnew +3)
            {
                document.players[i].x -= document.players[i].correctionspeed;
            }
            else if (document.players[i].y < document.players[i].ynew -3)
            {
                document.players[i].y += document.players[i].correctionspeed;
            }
            else
            {
                //document.players[i].x -= 1;
                //document.players[i].y += 1;
            }
        }
        else if (document.players[i].x > document.players[i].xnew && document.players[i].y > document.players[i].ynew)
        {
            if (document.players[i].x > document.players[i].xnew +2*document.players[i].correctionspeed && document.players[i].y > document.players[i].ynew +2*document.players[i].correctionspeed)
            {
                document.players[i].x -= document.players[i].correctionspeed;
                document.players[i].y -= document.players[i].correctionspeed;
            }
            else if (document.players[i].x > document.players[i].xnew +3)
            {
                document.players[i].x -= document.players[i].correctionspeed;
            }
            else if (document.players[i].y > document.players[i].ynew +3)
            {
                document.players[i].y -= document.players[i].correctionspeed;
            }
            else
            {
                //document.players[i].x -= 1;
                //document.players[i].y -= 1;
            }
        }
        else if (document.players[i].x < document.players[i].xnew)
        {
            if (document.players[i].x < document.players[i].xnew -2*document.players[i].correctionspeed)
            {
                document.players[i].x += document.players[i].correctionspeed;
            }
            else
            {
                document.players[i].x += 1;
            }
        }
        else if (document.players[i].x > document.players[i].xnew)
        {
            if (document.players[i].x > document.players[i].xnew +2*document.players[i].correctionspeed)
            {
                document.players[i].x -= document.players[i].correctionspeed;
            }
            else
            {
                document.players[i].x -= 1;
            }
        }
        else if (document.players[i].y < document.players[i].ynew)
        {
            if (document.players[i].y < document.players[i].ynew -2*document.players[i].correctionspeed)
            {
                document.players[i].y += document.players[i].correctionspeed;
            }
            else
            {
                document.players[i].y += 1;
            }
        }
        else if (document.players[i].y > document.players[i].ynew)
        {
            if (document.players[i].y > document.players[i].ynew +2*document.players[i].correctionspeed)
            {
                document.players[i].y -= document.players[i].correctionspeed;
            }
            else
            {
                document.players[i].y -= 1;
            }
        }
        if(document.players[i].x > document.players[i].xnew+10)
        {
            document.players[i].y = document.players[i].ynew;
            document.players[i].x = document.players[i].xnew;
        }
        if(document.players[i].x < document.players[i].xnew-10)
        {
            document.players[i].y = document.players[i].ynew;
            document.players[i].x = document.players[i].xnew;
        }
        if(document.players[i].y > document.players[i].ynew+10)
        {
            document.players[i].y = document.players[i].ynew;
            document.players[i].x = document.players[i].xnew;
        }
        if(document.players[i].y < document.players[i].ynew-10)
        {
            document.players[i].y = document.players[i].ynew;
            document.players[i].x = document.players[i].xnew;
        }

    }
}
function SmoothMovement2()
{
    if(document.running)
    {
        //setTimeout(SmoothMovement2,1000/60);

        for (var i = 0; i < document.players.length; i++)
        {
            if (document.players[i].username == document.user)
            {
                if (document.movingdirection == "RightUp")
                {
                    document.players[i].x += document.players[i].speed;
                    document.players[i].y -= document.players[i].speed;
                }
                else if (document.movingdirection == "LeftUp")
                {
                    document.players[i].x -= document.players[i].speed;
                    document.players[i].y -= document.players[i].speed;
                }
                else if (document.movingdirection == "RightDown")
                {
                    document.players[i].x += document.players[i].speed;
                    document.players[i].y += document.players[i].speed;
                }
                else if (document.movingdirection == "LeftDown")
                {
                    document.players[i].x -= document.players[i].speed;
                    document.players[i].y += document.players[i].speed;
                }
                else if (document.movingdirection == "Up")
                {
                    document.players[i].y -= document.players[i].speed;
                }
                else if (document.movingdirection == "Right")
                {
                    document.players[i].x += document.players[i].speed;
                }
                else if (document.movingdirection == "Down")
                {
                    document.players[i].y += document.players[i].speed;
                }
                else if (document.movingdirection == "Left")
                {
                    document.players[i].x -= document.players[i].speed;
                }
            }
        }
    }
}