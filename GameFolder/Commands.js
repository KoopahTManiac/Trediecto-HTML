/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-02-19
 * Time: 09:44
 * To change this template use File | Settings | File Templates.
 */
function unpack(str)
{
    var bytes = [];
    for(var i = 0, n = str.length; i < n; i++)
    {
        var char = str.charCodeAt(i);
        bytes.push(char >>> 8, char & 0xFF);
    }
    return bytes;
}
function pack(bytes)
{
    var str = "";
    for(var i = 0; i < bytes.length; i += 2)
    {
        var char = bytes[i];
        if (bytes[i + 1])
            char |= bytes[i + 1];
        str += String.fromCharCode(char);
    }
    return str;
}

function swap_int16( val)
{
    return (val << 8) | ((val >> 8) & 0xFF);
}

function Copy(obj)
{
    var result = {};
    for (var i in obj)
    {
        result[i] = obj[i];
    }
    return result;
}
if (typeof ArrayBuffer !== 'undefined')
{
    if (!ArrayBuffer.prototype.slice)
    {
        ArrayBuffer.prototype.slice = function (start, end)
        {
            var that = new Uint8Array(this);
            if (end == undefined) end = that.length;
            var result = new ArrayBuffer(end - start);
            var resultArray = new Uint8Array(result);
            for (var i = 0; i < resultArray.length; i++)
                resultArray[i] = that[i + start];
            return result;
        }
    }
}
function CompareMap(obj,obj2)
{
    if (obj.lenght == obj2.length)
    {
        for (var i in obj)
        {
            if (obj[i] == obj2[i])
            {

            }
            else
            {
                return false;
            }
        }
        return true;
    }
    else
    {
        return false;
    }
}
function WriteMessage(text)
{

}
function SendMessage(text)
{
    ws.send("Msg;" +text);
}
function sendmsg()
{
    SendMessage(document.getElementById("input").value);
}
function reset()
{
    document.running = false;
    setTimeout(start,500);
}
function start()
{
    document.running = true;
    CheackKeysDown();
    ReCheackKeysDown();
    SmoothMovement();
    SmoothMovement2();
    GameLoop();
    MouseUpdater();
    MouseShoot();
}
function decodeFloat(byteArray)
{
    var sign = parseSign(byteArray);
    var exponent = parseExponent(byteArray);
    var mantissa = parseSignificand(byteArray);
    var num = sign * exponent * mantissa;
    return num;
};
function parseSign(byteArray)
{
    if(byteArray[0]&0x80)
        return -1;
    return 1;
}

function parseExponent(byteArray)
{
    var ex = (byteArray[0] & 0x7F);
    ex = ex << 1;

    if(0!=(byteArray[1] & 0x80))
        ex += 0x01;

    ex = Math.pow(2, ex-127);
    return ex;
}

function parseSignificand(byteArray)
{
    var num=0;
    var bit;
    var mask = 0x40;
    for(var i=1; i<8; i++)
    {
        if(0!=(byteArray[1]&mask))
        {
            num += 1 / Math.pow(2, i);
        }
        mask = mask >> 1;
    }
    mask = 0x80;
    for(var j=0; j<8; j++)
    {
        if(0!=(byteArray[2]&mask))
        {
            num += 1 / Math.pow(2, j+8);
        }
        mask = mask >> 1;
    }
    mask = 0x80;
    for(var k=0; k<8; k++)
    {
        if(0!=(byteArray[2]&mask))
        {
            num += 1 / Math.pow(2, k+16);
        }
        mask = mask >> 1;
    }
    return (num+1);
}
function StringToMap(data)
{
    //if (window.Worker)
    //{
    //    var Worker1 = new Worker("GameFolder/Workers/StringToMap.js");
    //    Worker1.onmessage = function(dataWorker)
    //    {
    //        Worker1.terminate();
    //        return dataWorker.data;
    //    }
    //    Worker1.postMessage(data);
    //
    //}
    //else
    //{
        var koma = data.indexOf(',');
        var underscore = data.indexOf('_');
        var midlescore = data.indexOf('-');
        var lastMidle = data.lastIndexOf('-');

        if (koma != -1 && underscore != -1 && midlescore != -1)
        {
            var dataSplit = data.replace(" ","").split('-');

            var lengthX = dataSplit.length-2;
            var TempArray2D = createArray(lengthX+1,1);
            var lengthY =0;
            for (var i =0; i < dataSplit.length-1; i++)
            {
                var tempIn = dataSplit[i].indexOf('[');
                var tempIn2 = dataSplit[i].indexOf(']');
                var TempArray = dataSplit[i].substring(tempIn+1, tempIn2-1);
                var TempArray2 = TempArray.split(',');
                lengthY = TempArray2.length;
                TempArray2D[i] = createArray(lengthY);
                for (var t=0; t < TempArray2.length; t++)
                {
                    var temp77 = TempArray2[t];
                    var TempArray3 = temp77.split("_");
                    var TempPoint = new Point(parseInt(TempArray3[0]),parseInt(TempArray3[1]));
                    TempArray2D[i][t] = TempPoint;
                }

            }
            return TempArray2D;
        }
        else
        {
            return createArray(10,10);
        }
    //}

}