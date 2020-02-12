


if(window.addEventListener)
{
    document.addEventListener('DOMMouseScroll', MouseScrollEvent, false);
}
document.onmousedown = onmousedownEvent;
document.onmouseup = onmouseupEvent;
document.onmousemove = onmousemoveEvent;
document.onmousewheel = MouseScrollEvent;

function onmousedownEvent(ev)
{
    onmousedownE(ev);
    onmousedownEX(ev);

}
function onmouseupEvent(ev)
{
    onmouseupE();
    onmouseupEX();
}
function onmousemoveEvent(ev)
{
    onmousemoveE();
    onmousemoveEX();
}
function onResize()
{
    //onResizeE();
    onResizeEX();
}

function GetBrowserSize()
{
    var myWidth = 0, myHeight = 0;
    if( typeof( window.innerWidth ) == 'number' )
    {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    }
    else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) )
    {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    }
    else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) )
    {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;

    }
    return { Height : myHeight, Width : myWidth};
}



function GetHeight(DivH)
{
    var OriginalOverflow = DivH.style.overflow;
    var OriginalHeight = DivH.style.height;
    DivH.style.overflow = "";
    DivH.style.height = "";
    var height = DivH.offsetHeight;
    DivH.style.height = OriginalHeight;
    DivH.style.overflow = OriginalOverflow;
    return height;
}

function getPosition(e) {
    e = e || window.event;
    var cursor = {x:0, y:0};
    if (e instanceof scrollPos)
    {
        cursor.x = e.x;
        cursor.y = e.y;
    }
    else
    {
        if (e.pageX || e.pageY) {
            cursor.x = e.pageX;
            cursor.y = e.pageY;
        }
        else {
            var de = document.documentElement;
            var b = document.body;
            cursor.x = e.clientX +
                (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
            cursor.y = e.clientY +
                (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
        }
    }
    return cursor;
}




function getPositionE( el )
{
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.parentNode;
    }
    return { top: _y, left: _x };
}
function GetHeight(divT)
{
    if (divT && divT !=null)
    {
        var orginalHeight = divT.clientHeight;
        var orginalOverflow = divT.overflow;
        divT.style.height = "";
        divT.style.overflow = "";
        var temp = divT.offsetHeight;
        divT.style.height = orginalHeight;
        divT.style.overflow = orginalOverflow;
        return temp;
    }
    return 0;
}
function timer1()
{
    if (document.gameRunning == false)
    {
        scroll();
        scrollX();
    }
}
setInterval(timer1,10);

function DisableSelect(el)
{
    el.className = el.className + "_Disabled";
    if ( document.selection )
    {
        document.selection.empty();
    }
    else if ( window.getSelection )
    {
        window.getSelection().removeAllRanges();
    }
}
function EnableSelect(el)
{
    el.className =el.className.replace("_Disabled","");
}
function corrent(el)
{
    el.className = "corrent";
}
function disabled(el)
{
    el.className ="";
}

function MouseScrollEvent(evt)
{
    if (!evt)
    {
        evt = window.event;
    }
    // normalize the delta
    if (event.wheelDelta)
    {
        delta = event.wheelDelta / 60;
    }
    else if (event.detail)
    {
        delta = -event.detail / 2;
    }
    document.scrollD.top += delta;
    var temp = new scrollPos(0,document.last_pos - delta*10);
    scrollUpdate(temp);
    document.last_pos -= delta*10;
    if (document.last_pos >0 && document.last_pos < document.scrollLimit)
    {
        document.startdragpos = document.last_pos;
    }
    else if (document.last_pos >0)
    {
        document.last_pos = document.scrollLimit;
    }
    else if (document.last_pos < document.scrollLimit)
    {
        document.last_pos = 0;
    }
}
function scrollPos(x,y)
{
    this.x = x;
    this.y = y;
}
if( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/Android/i)))
{
    var Scroll_holder2 = document.getElementById("Scroll_holder2");
    var Scroll_holder = document.getElementById("Scroll_holder");
    Scroll_holder2.parentNode.removeChild(Scroll_holder2);
    Scroll_holder.parentNode.removeChild(Scroll_holder);
    document.scroll_Area.style.overflow = "visible";
    document.scroll_AreaX.style.overflow = "visible";
    document.scroll_Area.style.width ="auto";
    document.scroll_AreaX.style.width ="auto";
    document.scroll_Area.style.height ="auto";
    document.scroll_AreaX.style.height ="auto";
}