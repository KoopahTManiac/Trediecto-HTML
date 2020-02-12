/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-04-02
 * Time: 23:47
 */

document.players = [];

function player(ID,Hp,HpMax,X,Y,Username, rot, speed)
{
    this.Hp = Hp;
    this.HpMax = HpMax;
    this.x = X;
    this.y = Y;
    this.username = Username;
    this.xnew = X;
    this.ynew = Y;
    this.rot = rot;
    this.speed = speed;
    this.correctionspeed = 1;
    this.ID = ID;
    this.score = 0;
    this.scoremax = 0;
}