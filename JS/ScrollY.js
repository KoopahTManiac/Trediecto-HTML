/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-01-15
 * Time: 21:54
 * To change this template use File | Settings | File Templates.
 */
document.heightVar = window.innerHeight -40;
document.scroll_Area = document.getElementById("Scroll_Area");
document.scrollD = document.getElementById("ScrollD");
document.scrollLimit =0;
document.scrolSize =0;
document.last_pos = 0;
document.draging = false;
document.draged = 0;
document.startdragpos =0;


function scroll()
{

    if (typeof document.scrollD !=="undefined")
    {
        document.heightVar = GetBrowserSize().Height-40;
        document.scrollD = document.getElementById("ScrollD");
        document.scroll_Area = document.getElementById("Scroll_Area");

        if (document.heightVar < document.scroll_Area.scrollHeight-15)
        {
            document.scrolSize = document.heightVar*(document.heightVar/document.scroll_Area.scrollHeight)-20;
            document.scrollLimit = document.heightVar - document.scrolSize - 19;
            document.scrollD.style.display = "inline-block";
            document.scrollD.style.height = document.scrolSize +"px";
            document.scroll_Area.style.right = 15+"px";
            document.scroll_Area.style.paddingRight = "0px";
        }
        else
        {
            document.scrollD.style.display = "none";
            document.scroll_Area.style.right = 1+"px";
            document.scroll_Area.style.paddingRight = "14px";
        }
    }
}
function scrollUpdate(eventT)
{
    if (typeof document.scrollD !=="undefined")
    {
        document.scrolSize = document.heightVar*(document.heightVar/document.scroll_Area.scrollHeight);
        var temp2 = document.startdragpos + (getPosition(eventT).y -document.last_pos);
        if (!(temp2 < 0 || temp2 > document.scrollLimit))
        {
            document.scrollD.style.top = document.startdragpos + (getPosition(eventT).y -document.last_pos) + "px";
        }
        else if (temp2 < 0)
        {
            document.scrollD.style.top ="0px";

        }
        else if (temp2 > document.scrollLimit)
        {
            document.scrollD.style.top =document.scrollLimit+"px";

        }
        var scrollHeight = Math.max(document.scroll_Area.scrollHeight, document.heightVar);
        document.scroll_Area.scrollTop = (scrollHeight- (document.heightVar-20)) * (document.scrollD.offsetTop / document.scrollLimit);
    }
}
function startDrag(eventT)
{

    if (typeof document.scrollD !=="undefined")
    {
        var temp = parseInt(document.scrollD.style.top,10)|| 0;
        document.startdragpos = temp
        document.last_pos = getPosition(eventT).y;
    }
}
function onmousedownE(eventT)
{
    if (typeof document.scrollD !=="undefined")
    {
        x = eventT.clientX || eventT.x;
        y = eventT.clientY || eventT.y;
        if (x < getPositionE(document.scrollD).left+8)
        {
            if (x > getPositionE(document.scrollD).left)
            {
                if (y < getPositionE(document.scrollD).top + document.scrollD.offsetHeight)
                {
                    if (y > getPositionE(document.scrollD).top)
                    {
                        DisableSelect(document.getElementById("Content"));
                        scroll();
                        startDrag(eventT);
                        document.draging = true;
                        return false;
                    }
                }
            }
        }
    }
}
function onmouseupE(eventT)
{
    if (typeof document.scrollD !=="undefined")
    {
        if (document.draging)
        {
            EnableSelect(document.getElementById("Content"));
            document.draging = false;
        }
    }
}
function onmousemoveE(eventT)
{
    if (typeof document.scrollD !=="undefined")
    {
        if (document.draging)
        {
            scroll();
            scrollUpdate(eventT);
            return false;
        }
    }
}