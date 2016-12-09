function OnLoadLlistaDiets(){
    OnLoadDefault();
    getDietsList();
}
function DisplayHtmlDietsList(dietsListFromServer){
    var cl;
    var itemrow;
    cl=dietsListFromServer;
    itemrow=0;
    document.getElementById("espaiBoxDietListDiets").innerHTML="";
    content="";
    content+="<div class='row'>";
    for(var i=0; i<cl.length; i++)
    {
        if(itemrow>3)
        {/* cada 3 canvia de row */
            itemrow=0;
            content+="</div><br>";
            content+="<div class='row'>";
            content+="";
            content+="";
        }
        content+="<div id='"+cl[i].id +"_Box' onclick='OnClickOverDietBox(this.id)' class='col-md-4 portfolio-item own-dietBox'>";
        //content+="<a href='casal.html'>";
        content+="<img class='img-responsive' src='"+URL_IMAGE + "/uploadFolder/"+cl[i].image+".png' alt=''>";
        //content+="</a>";
        content+="<h3>";
        content+=cl[i].title;
        content+="</h3>";
        content+="<p>"+cl[i].description+"</p>";
        content+="</div>";
        itemrow++;
    }
    content+="</div>";
    document.getElementById("espaiBoxDietlListDiets").innerHTML=content;

    //afegeix el núm de casals al badge del títol
    document.getElementById("badgeNumDiets").innerHTML=cl.length;
}
function OnClickOverDietBox(iddiet){
    iddiet=iddiet.replace("_Box", "");
    window.open("diet.html?value="+iddiet, "_self");
}

function OnBtnValidateDiet(){
    d={
        id:"",
        title:"",
        description:"",
    };
    d.id=localStorage.getItem("dietid");
    d.title=getValById("title");
    d.description=getValById("description");
    if((d.email.indexOf("@") > -1)&&(d.email.indexOf(".") > -1))
    {
        crearDiet2Restful(d);
    }else{
        toastr.error("format email incorrecte");
    }
}
