# jQuery Circles Layout plugin

Use this plugin on to display your content in clickable circles.
Example: http://www.travellink.se/turistbyraer/dubai

## Setup
Include CSS file and JS file
```html
<!-- Load CSS -->
<link rel="stylesheet" href="/css/jquery-circles-layout-plugin.css" type="text/css">
<!-- Load plugin -->
<script type="text/javascript" src="/js/jquery-circles-layout-plugin.js"></script>
```

Format your `html` like below:
```html
<div class="jquery-circles-layout-plugin">
  <div id="uniqueId">
    <ul>
      <li data-nav-image="/path/to/thumbnail-1.jpg" data-nav-headline="Shorter Headline">
        <h3>Tab 1</h3>
        <img src="/path/to/header-img-1.jpg">
        <p>Tab 1 content</p>
        <p class="rightLink"><a href="">För mer information &raquo;</a></p>
      </li>
      <li data-nav-image="/path/to/thumbnail-2.jpg">
        <h3>Tab 2</h3>
        <img src="/path/to/header-img-2.jpg">
        <p>Tab 2 content</p>
        <p class="rightLink"><a href="">För mer information &raquo;</a></p>
      </li>
    </ul>
  </div>
</div>
```

Activate the plugin:
```javascript
$(document).ready(function(e) {
  $("#uniqueId").circlesLayout();
});
```

