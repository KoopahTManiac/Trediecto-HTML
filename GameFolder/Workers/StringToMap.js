/**
 * Created with JetBrains WebStorm.
 * User: Zoran
 * Date: 2013-03-30
 * Time: 17:08
 */
this.onmessage = function(data)
{
    StringToMap(data);
}
function createArray(length)
{
    var temp = new Array(length || 0);

    if (arguments.length > 1)
    {
        var args = Array.prototype.slice.call(arguments, 1)
        for (var  i = 0; i < length; i++)
        {
            temp[i] = createArray.apply(this, args);
            for (var t= 0; t < args; t++)
            {
                temp[i][t] = new Point(0,0);
            }
        }
    }
    return temp;
}
function StringToMap(data2)
{
    var data = data2.data;
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
        this.postMessage(TempArray2D);
    }
    else
    {
        this.postMessage(createArray(10,10));
    }
}
function Point(X,Y)
{
    this.X = X;
    this.Y = Y;
}