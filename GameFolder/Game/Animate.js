/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-02-19
 * Time: 09:45
 * To change this template use File | Settings | File Templates.
 */
function Animate()
{
    if(document.running)
    {
        //setTimeout(Animate(),1000/60);
    }
    document.CorrentFrame +=1;
    if (document.CorrentFrame > 60)
    {
        document.CorrentFrame = 0;
    }
}