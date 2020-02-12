/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-01-15
 * Time: 18:20
 * To change this template use File | Settings | File Templates.
 */

document.widthVar = window.innerWidth;
document.scrollDX = document.getElementById("ScrollDX");
document.scroll_AreaX = document.getElementById("Scroll_Area2");
document.scrollLimitX =0;
document.scrolSizeX =0;
document.last_posX = 0;
document.dragingX = false;
document.dragedX = 0;
document.startdragposX =0;
document.last_x = 0;
document.lastsize=0;
document.last_pos_of_width =0;
function scrollX()
{
    document.widthVar = GetBrowserSize().Width;
    document.scrollDX = document.getElementById("ScrollDX");
    document.scroll_AreaX = document.getElementById("Scroll_Area2");
    if (typeof document.scrollDX !=="undefined")
    {
        if (document.widthVar < document.scroll_Area.scrollWidth)
        {
            document.scrolSizeX = document.widthVar*(document.widthVar/document.scroll_Area.scrollWidth);
            document.scrollLimitX = document.widthVar - document.scrolSizeX - 15;
            document.scrollDX.style.display = "inline-block";
            document.scrollDX.style.width = document.scrolSizeX +"px";
            document.scroll_Area.style.bottom = 15+"px";
            document.lastsize = document.scrolSizeX;
        }
        else
        {
            document.scrollDX.style.display = "none";
            document.scroll_Area.style.bottom = 0+"px";
        }
    }
}
function scrollUpdateX(eventT)
{
    if (typeof document.scrollDX !=="undefined")
    {
        document.scrolSizeX = document.widthVar*(document.widthVar/document.scroll_Area.scrollWidth);
        var temp2 = document.startdragposX + (getPosition(eventT).x -document.last_posX);
        if (!(temp2 < 0 || temp2 > document.scrollLimitX))
        {
            document.scrollDX.style.left = document.startdragposX + (getPosition(eventT).x - document.last_posX) + "px";
        }
        else if (temp2 < 0)
        {
            document.scrollDX.style.left ="0px";

        }
        else if (temp2 > document.scrollLimitX)
        {
            document.scrollDX.style.left =document.scrollLimitX+"px";

        }
        var scrollWidth = Math.max(document.scroll_Area.scrollWidth, document.widthVar);
        document.scroll_Area.scrollLeft = (scrollWidth- (document.widthVar-20)) * (document.scrollDX.offsetLeft / document.scrollLimitX);
        document.scroll_AreaX.scrollLeft = (scrollWidth- (document.widthVar-20)) * (document.scrollDX.offsetLeft / document.scrollLimitX);
        document.stats.domElement.style.left = '-'+ ((scrollWidth- (document.widthVar-20)) * (document.scrollDX.offsetLeft / document.scrollLimitX)) +'px';
        document.last_x = parseInt(document.scrollDX.style.left,10)|| 0;
    }
}
function startDragX(eventT)
{
    if (typeof document.scrollDX !=="undefined")
    {
        var temp = parseInt(document.scrollDX.style.left,10)|| 0;
        document.startdragposX = temp
        document.last_posX = getPosition(eventT).x;
    }
}


function onmousedownEX(eventT)
{
    if (typeof document.scrollDX !=="undefined")
    {
        x = eventT.clientX || eventT.x;
        y = eventT.clientY || eventT.y;
        if (x < getPositionE(document.scrollDX).left+document.scrollDX.offsetWidth)
        {
            if (x > getPositionE(document.scrollDX).left)
            {
                if (y < getPositionE(document.scrollDX).top + document.scrollDX.offsetHeight)
                {
                    if (y > getPositionE(document.scrollDX).top)
                    {
                        DisableSelect(document.getElementById("Content"));
                        scrollX();
                        startDragX(eventT);
                        document.dragingX = true;
                        return false;
                    }
                }
            }
        }
    }
}
function onmouseupEX(eventT)
{
    if (typeof document.scrollDX !=="undefined")
    {
        if (document.dragingX)
        {
            EnableSelect(document.getElementById("Content"));
            document.dragingX = false;
        }
    }
}
function onmousemoveEX(eventT)
{
    if (typeof document.scrollDX !=="undefined")
    {
        if (document.dragingX)
        {
            scrollX();
            scrollUpdateX(eventT);
            return false;
        }
    }
}
function resize(eventT)
{

}
function onResizeEX()
{
    //var tempI = parseInt(document.scrollDX.style.left,10)|| 0;
    //var temp2 = document.last_pos_of_width;
    //var temp3 = window.innerWidth/temp2;
    //document.scrollDX.style.left = tempI*temp3 + "px";
    //document.last_pos_of_width = window.innerWidth;
}

