function ToggleFastMode()
{
    var Toggle = document.getElementById("ToggleFastMode");
    if (Toggle.value == "TOF")
    {
        Toggle.value = "TON"
        document.FastLoad = true;
        Toggle.className="FastModeOn";
    }
    else
    {
        Toggle.value = "TOF"
        document.FastLoad = false;
        Toggle.className="FastModeOff";
    }
}
function LoadScript()
{
    SubmitFormData();
    LoadSite();
}
function LoadSite()
{
    if (contains(window.location.href,'?'))
    {
        var tempAddress = window.location.href.split('?');
        if (contains(tempAddress[1],"&"))
        {
            var data = tempAddress[1].split("&");
            var data2 = data[0].split('=')[1];
            if (data2 != document.LastSite)
            {
                ContentLoad(data2);
                document.LastSite = data2;
            }
        }
        else
        {
            var data = tempAddress[1].split("=");
            if (data[1] != document.LastSite)
            {
                ContentLoad(data[1]);
                document.LastSite = data[1];
            }
        }
    }
}
function ContentLoad(Urls)
{
    location.hash = '?site=' + Urls;
    var Content_div = document.getElementById("Content");
    var subNodes = Content_div.getElementsByTagName("div");
    var menu_div = document.getElementById("menu");
    var sub_menu = menu_div.getElementsByTagName("li");
    for (var i=0; i < subNodes.length; i++ )
    {
        if (subNodes[i].id == Urls)
        {
            subNodes[i].className = "target";

        }
        else if (subNodes[i].className == "target")
        {
            subNodes[i].className = "invisible";
        }
    }
    for (var i=0; i < sub_menu.length; i++)
    {
        var temp = sub_menu.item(i).innerHTML.replace('\n',"").replace('<a link="" onclick="ContentLoad(\'',"");
        var tempint = temp.indexOf("'); return false;");
        var temp2 = temp.slice(0,tempint).replace("                ", "").replace("    ","");
        if (sub_menu.item(i).className != "Logo" && sub_menu.item(i).className != "WSLogo")
        {
            if (temp2 == Urls)
            {
                sub_menu.item(i).className = "current";
            }
            else
            {
                sub_menu.item(i).className = "";
            }
        }
    }
    document.title = Urls;
}
function ContentLoadF(Urls)
{
    if (document.FastLoad)
    {
        ContentLoad(Urls);
    }
}
window.setInterval(LoadScript,1);
function contains(string1,string2)
{
    return string1.indexOf(string2) != -1;
}
function SubmitFormData()
{
    document.NameD = document.getElementsByName("NameD");
    document.Email = document.getElementsByName("EmailD");
    document.Message = document.getElementsByName("MessageD");
    document.Verifi = document.getElementsByName("Veri");
    if (document.Verifi.length >0)
    {
        if (document.Verifi.item(0).value !="7")
        {
            document.getElementById("Verifi").className = "Required";
            document.EmailIsReady = false;
        }
        else
        {
            document.getElementById("Verifi").className = "RequiredD";
            document.EmailIsReady = false;
        }

        if (document.NameD.item(0).value == "")
        {
            document.getElementById("Name").className = "Required";
            document.EmailIsReady = false;
        }
        else
        {
            document.getElementById("Name").className = "RequiredD";
            if (document.Email.item(0).value !="" && document.Message.item(0).value !="" && document.Verifi.item(0).value =="7" && validateEmail(document.Email.item(0).value))
            {
                document.EmailIsReady = true;
            }
        }
        if (document.Email.item(0).value == "" || !validateEmail(document.Email.item(0).value))
        {
            document.getElementById("Email").className = "Required";
            document.EmailIsReady = false;

        }
        else
        {
            document.getElementById("Email").className = "RequiredD";
        }
        if (document.Message.item(0).value == "")
        {
            document.getElementById("Message").className = "Required";
            document.EmailIsReady = false;
        }
        else
        {
            document.getElementById("Message").className = "RequiredD";
        }
        if (document.EmailIsReady)
        {
            document.getElementById("SubmitForm").disabled = false;
        }
        else
        {
            document.getElementById("SubmitForm").disabled = true;
        }
    }
}

function sendMail()
{

}
function validateEmail(email) {
    var emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegEx.test(email);
}