/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-02-19
 * Time: 09:45
 * To change this template use File | Settings | File Templates.
 */
window.requestAnimFrame = (function()
{
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element)
        {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var GameLoop = function()
{
    if(document.running)
    {
        gLoop = requestAnimFrame(GameLoop);
    }
    document.stats.begin();
    clear();
    document.g.beginPath();
    draw();
    document.g.closePath();
    Updates();
    document.stats.end();
}
document.onkeydown = document.onkeyup = function(e){
    e=e||event
    document.map[e.keyCode] = e.type=='keydown'?true:false
}


