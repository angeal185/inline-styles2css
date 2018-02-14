
    /*optional stuff to do after success */

var skeleton = '<div class="container"><h3 class="title text-center">Inline-styles to stylesheet</h3><div id="main" clas="row"></div></div>';
var nav = '<nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#">inline-styles2css</a></div><button class="icon-cog" type="button" onclick="mdl(\'mdl1\',\'block\')"></button></div></nav>';
var modalTpl = '<modal id="mdl1"><h2>Options</h2><label>Editor theme</label><div id="themes" class="list-group"></div><input type="text" id="themeType" class="form-control text-center" readonly><button type="button" id="setTheme" class="btn btn-default btn-block">Commit</button><button class="btn btn-default btn-block" onclick="mdl(\'mdl1\',\'none\')">Close</button></modal>';

function btn(a,b,c){
  $(a).append('<button type="button" id="'+b+'" class="btn btn-default btn-block">'+c+'</button>');
}

function input(a,b,c,d){
  $(a).append('<input type="text" id="'+b+'" class="form-control text-center" value="'+c+'"'+d+'>');
}

function label(a,b){
  $(a).append('<label>'+b+'</label>');
}

function section(a,b,c,d,e,f){
  $(a).append('<div id="'+b+'" class="col-md-4"><textarea id="'+c+'"></textarea></div>'),
  btn(d,e,f);
}

function mdl(e,f) {
  document.getElementById(e).style.display = f
}

function sectionConf(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){
  $(a).append('<div id="'+b+'" class="col-md-4"></div>'),
  label(c,d),
  input(e,f,g,h),
  input(i,j,k,l),
  btn(m,n,o),
  label(p,q),
  input(r,s,t),
  btn(u,v,w),
  $("#main").append('<pre id="pre" class="hidden"></pre>');
}


function toast(i){
  $("#toast").html(i);
  $("#toast").fadeIn(400).delay(2000).fadeOut(400);
}


$.getJSON('app/data/data.json', function(data) {


$("body").append('<div class="toast" id="toast"></div>');
toast("loading...");
$("body").prepend(modalTpl).prepend(skeleton).prepend(nav),
section("#main","first","getStyles","#first","resetHtml","Reset html"),
section("#main","second","output","#second","getCss","Get CSS"),
btn("#second","resetCss","Reset CSS"),
sectionConf("#main","third","#third","Mode","#third","mode","class"," readonly","#third","modeType","."," readonly","#third","modeBtn","Toggle","#third","Save as","#third","fileName","styles","#third","save","Save");

$(document).ready(function(){
  var getStyles = ace.edit("getStyles");
  getStyles.setTheme("ace/theme/"+data.aceDefault);
  getStyles.session.setMode("ace/mode/html");
  getStyles.getSession().setUseWrapMode(true);

  var output = ace.edit("output");
  output.setTheme("ace/theme/"+data.aceDefault);
  output.session.setMode("ace/mode/css");
  output.getSession().setUseWrapMode(true);

  //add excludes
  var excludes = data.excludes;

  function getStyle(e,i){

    $('*[style]['+i+']').not($(excludes)).each(function() {

      var x = "   ";
      var a =  e+$(this)
                .attr(i)
                .replace(/ /g, " .")+" {\n"+x+$(this)
                .attr('style')
                .replace(/;/g, ";\n"+x)+"}\n\n";

      //console.log(a);
      output.insert(a);
    });

  }

  $('#modeBtn').click(function() {
     if ($("#mode").val() == "class") {
        $("#mode").val("id").next().val("#");
     }
     else {
        $("#mode").val("class").next().val(".");
     }
  });

  $("#getCss").click(function() {
    var v = getStyles.getValue();
    $('#pre').html(v),
    getStyle($("#modeType").val(),$("#mode").val());
    toast("Get:Success");
  });

  $("#resetCss").click(function() {
    output.setValue("");
    toast("Reset:Success");
  });

  $("#resetHtml").click(function() {
    getStyles.setValue("");
    toast("Reset:Success");
  });
  //save as
  $("#save").click( function() {
    let text = output.getValue()
    let filename = $("#fileName").val()
    let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".css");
  });

  $("#themeType").val(data.aceDefault);
  data.aceThemes.forEach(function(i) {
      $("#themes").append('<button type="button" class="list-group-item themeBtn">'+i+'</button>');
  });

  $(".themeBtn").click(function(event) {
    $("#themeType").val($(this).html());
  });

  $("#setTheme").click(function(event) {
    getStyles.setTheme("ace/theme/"+$("#themeType").val());
    output.setTheme("ace/theme/"+$("#themeType").val());
  });

  //demo only
  getStyles.setValue('<a class="btn-1 btn-2" style="color:red;background:blue;line-height:1;">link1</a>\n\n<a id="working" class="btn-2" style="color:purple;background:green;line-height:1; ">link2</a>\n\n<div class="intro-1 empty" style="outline-offset: -3px;margin-left:3em;"></div><div id="main" class="container main" style="color:#444;"></div><h3 class="title" style="text-align:center;"></h3>');

});
});
