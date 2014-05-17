$(document).ready(function(){
  //Just render out your jqplot graph how ever you have it configured.
  var plot1 = $.jqplot('pie1', [[['a',2543],['b',1465],['c',7123]]], {
    gridPadding: {top:0, bottom:38, left:0, right:0},
    seriesDefaults:{
      renderer:$.jqplot.PieRenderer,
      trendline:{ show:false },
      rendererOptions: {
        padding: 8
      }
    },
    legend:{
      show: true,
      placement: 'outside',
      rendererOptions: {
        numberRows: 1
      },
      location:'s',
      marginTop: '15px'
    }
  });
});

//We use the jqplotDataClick event to get the area clicked and the data of that area
$("#pie1").bind("jqplotDataClick", function(ev, seriesIndex, pointIndex, data){
  console.log(ev);
  console.log(seriesIndex);
  console.log(pointIndex);
  console.log(data);

  // Set it's position and open it.
  popup_window = $(".graph-popup");
  popup_window.show();
  popup_window.css({
    top: (ev.pageY - (popup_window.height() / 2)),
    left: (ev.pageX + 15)
  });

  //Close the popup when you're not clicking on the graph
  $(document).click(function(e){
    if (e.target != $(".jqplot-event-canvas")[0]){
      $(".graph-popup").hide();
    }
  });

  //Add a comma to large numbers
  function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, "$1"+","+"$2");
    }
    return val;
  }

  //Use Ractive to pass the data to the popup
  var body = new Ractive({
    el: "#pie_chart_body",
    template: "#pie_popup_body",
    data: {
      connection_number: commaSeparateNumber(data[1])
    }
  });
});
