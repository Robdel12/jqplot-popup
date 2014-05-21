# Create an awesome popup with jqplot and ractive


Lately I have been working with jqplot a lot. I figured I would share how I built an awesome modularized popup using the ractive templating engine.

***This is written assuming you already have jqplot setup in your project**

## First let's create the popup!
```html
<!-- Hidden graph popup -->
<div class="graph-popup">
  <div class="popup-title">
    <h2>Users</h2>
  </div>
  <!-- Popup body. This is where we're going to be rendering the ractive template -->
  <div class="popup-body" id="pie_chart_body"></div>
  <script id="pie_popup_body" type="text/ractive">
    <span class="number-callout">{{connection_number}}</span>
  </script>
</div>
```
Let's dissect the code above a little!
```html
<div class="popup-body" id="pie_chart_body"></div>
```
This is where the template in the `script` tag is going to be rendered.

In the `script` tag we have the ractive template. This is where we're going to pass in the data for the popup.

### Add some SCSS!
```scss
//*------------------------------------*
//    Graph Pop Up Module
//*------------------------------------*

$popup_border_color: #ddd;

.graph-popup{
  -webkit-border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  -moz-border-radius: 6px;
  border-radius: 6px;
  border-radius: 6px;
  position: absolute;
  top: -10000px;
  left: -1000px;
  display: none;
  z-index: 100;
  background-color: white;
  border: 1px solid $popup_border_color;
  text-align: center;
  width: 160px;
  .popup-title{
    -webkit-border-top-left-radius: 6px;
    -webkit-border-top-right-radius: 6px;
    -moz-border-radius-topleft: 6px;
    -moz-border-radius-topright: 6px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #F5F5F5;
    padding: 8px;
    h2{
      font-size: 16px;
      line-height: 19px;
      margin: 0;
    }
  }
  .popup-body{
    padding: 10px;
    .number-callout{
      display: block;
      margin-bottom: 4px;
      font:{
        size: 27px;
        weight: 700;
      }
    }
    .number-label{
      font-size: 16px;
      line-height: 20px;
    }
  }
  &:before,
  &:after{
    position: absolute;
    content: "";
    top: 47px;
    left: -10px;
    width: 0;
    height: 0;
    border:{
     top: 10px solid transparent;
     bottom: 10px solid transparent;
     right: 10px solid white;
    }
  }
  &:before{
    border-right: 10px solid $popup_border_color;
    left: -11px;
  }
}
```
Nothing that's hard there :)

## Create the JS for the popup!
```javascript
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
```
So we take the ID of the chart and bind it the the `jqplotDataClick` event. `jqplotDataClick` gives us access to things like the ev, seriesIndex, pointIndex, and the data of the currently clicked part of the chart. Awesome! That made this project pretty easy.

The first thing we do inside of the `jqplotDataClick` event is position the popup right next to the point of the graph clicked using the ev passed in.

Next we have a function to add commas to the popup data thats being given to ractive. It makes it a little nicer to read!

Then we create a new ractive object. `el` is the container we are going to render the template into. `template` is, well, the template. And lastly `data` is just that. It's the data we're going to be passing in. So in the object we are going to create a key called `connection_number`. In the ractive template we'll call `{{connection_number}}` to pull that out and place it into the popup every time it's rendered.

## That's really it!

If you want to play around with the project you can fork it or download it. If you're going to make any style changes make sure you have gulp installed. Running `gulp` from the command line should do it!

[Here's a live version of the project.](http://robdel12.github.io/jqplot-popup/)
