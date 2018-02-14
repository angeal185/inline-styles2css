var skeleton = '<div class="container"><h3 class="title text-center">Inline-styles to stylesheet</h3><div id="main" clas="row"></div></div>';

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

$("body").prepend(skeleton),
section("#main","first","getStyles","#first","resetHtml","Reset html"),
section("#main","second","output","#second","getCss","Get CSS"),
btn("#second","resetCss","Reset CSS"),
sectionConf("#main","third","#third","Mode","#third","mode","class"," readonly","#third","modeType","."," readonly","#third","modeBtn","Toggle","#third","Save as","#third","fileName","styles","#third","save","Save");

$(document).ready(function(){
  var getStyles = ace.edit("getStyles");
  getStyles.setTheme("ace/theme/twilight");
  getStyles.session.setMode("ace/mode/html");
  getStyles.getSession().setUseWrapMode(true);

  var output = ace.edit("output");
  output.setTheme("ace/theme/twilight");
  output.session.setMode("ace/mode/css");
  output.getSession().setUseWrapMode(true);

  //add excludes
  var excludes = ".ace_text-input,.ace_gutter-layer, .ace_folding-enabled,.ace_gutter-cell,.ace_info,.ace_gutter-active-line,.ace_scroller,.ace_content,.ace_print-margin, .ace_active-line,.ace_selected-word, .ace_br1,.ace_start, .ace_br12,.ace_selection,.ace_text-layer,.ace_line_group,.ace_line,.ace_cursor,.ace_scrollbar,.ace_scrollbar-v,.ace_scrollbar-inner, .ace_scrollbar-h,.ace_scrollbar-inner";

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
  });

  $("#resetCss").click(function() {
    output.setValue("");
  });

  $("#resetHtml").click(function() {
    getStyles.setValue("");
  });
  //save as
  $("#save").click( function() {
    let text = output.getValue()
    let filename = $("#fileName").val()
    let blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    saveAs(blob, filename+".css");
  });

  //demo only
  getStyles.setValue('<a class="btn-1 btn-2" style="color:red;background:blue;line-height:1;">link1</a>\n\n<a id="working" class="btn-2" style="color:purple;background:green;line-height:1; ">link2</a>\n\n<div class="intro-1 empty" style="outline-offset: -3px;margin-left:3em;"></div><div id="main" class="container main" style="color:#444;"></div><h3 class="title" style="text-align:center;"></h3>');

});
