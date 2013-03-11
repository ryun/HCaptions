Hover Captions (HCaptions)
=========

Hover Captions (here in after: HCaptions) is a jQuery plugin that enables you to display caption overlays with cool effects over images, div's, ect..

[Demo Site](http://ryun.github.com/HCaptions/)
### Initialize plugin
```js
$(window).load(function(){
  $('.hcaption').hcaptions();
});
```
### Example markup

This example uses the `data-target` attribute to target the content:
```html
<a href="#" data-target="#myToggle" class="hcaption"><img src="img/cupcakes.png"></a>
<div id="myToggle" class="hide">
  <h5>Example Image</h5>
  <p>
    Content..
  </p>
</div>
```

### Magic attributes
With magic attributes you can override the settings for individual captions.
A magic attribute is a attribute prepended with `cap-` for example to override the effect you would use `cap-effect="fade"`


##### Example magic attribute markup
```html
<a href="#" data-target="#myToggle" class="hcaption" cap-effect="fade" cap-height="200"><img src="img/cupcakes.png"></a>
<div id="myToggle" class="hide">
  <h5>Example Image</h5>
  <p>
    Content..
  </p>
</div>
```


### Options

| Name          | Type  | Description  | Default |
| ------------- | ----- | :------------ | ------- |
| data_selector | string | Selector for caption content | .cap-overlay |
| width | integer | Overlay width | full width |
| height | integer | Overlay height | full height |
| overlay_x | string | Horizontal position for the overlay [center, left, right] | center |
| overlay_y | string | Vertical position for the overlay [center, top, bottom] | center |
| overlay_bg | string | Background css for overlay | inherits |
| overlay_opacity | integer | Opacity of overlay | 1 |
| effect | string | Effect for overlay [fade, slide, show/hide] | slide |
| speed | integer | Animation speed in ms | 400 |
| direction | string | Direction of overlay [top, bottom, right, left] | top |
| zindex | integer | Base Z-Index | 2 |
| onshow | function | Callback fired when caption is shown | none |
| onhide | function | Callback fired when caption is hidden | none |
