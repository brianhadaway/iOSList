#  iOSList 2.0.6

iOS-style sticky headers with jQuery

iOSList is a jQuery plugin that creates iOS-style sticky headers similar to those seen in the Music and Contacts apps on Apple devices. It is tested to work in the following browsers:
 * Mac (Chrome 10+, Safari 4+, Firefox 3.5+, Opera)
 * PC (Chrome 10+, Safari 4+, Firefox3.5+, Opera, IE6+)
 * iOS 3+ (Safari Mobile)
 * Android 2.2+ (Chrome, Firefox 4, Opera 11)

## Getting Started
Download the [production version][zip].

[zip]: https://github.com/brianhadaway/iOSList/zipball/master

In your web page:

```html
<!-- in the head tag -->
<link rel="stylesheet" href="css/jquery.ioslist.css" />

<!-- somewhere in the body tag -->
<div id="list1">
    <div class="ioslist-group-container">
        <div class="ioslist-group-header">A</div>
        <ul>
            <li>Afghanistan</li>
            <li>Akrotiri</li>
            <li>Albania</li>
            <li>Algeria</li>
            <li>American Samoa</li>
        </ul>
    </div>
    <div class="ioslist-group-container">
        <div class="ioslist-group-header">B</div>
        <ul>
            <li>Bahamas, The</li>
            <li>Bahrain</li>
            <li>Bangladesh</li>
            <li>Barbados</li>
            <li>Bassas da India</li>
        </ul>
    </div>
    <div class="ioslist-group-container">
        <div class="ioslist-group-header">C</div>
        <ul>
            <li>Cambodia</li>
            <li>Cameroon</li>
            <li>Canada</li>
            <li>Cape Verde</li>
            <li>Cayman Islands</li>
        </ul>
    </div>
</div>

<!-- near closing body tag -->
<script src="js/jquery.min.js"></script>
<script src="js/jquery.ioslist.js"></script>
<script>
        $(function(){
            $("#list1").ioslist();
        });
</script>
```

## Documentation
###refreshElements
```
$('.my-list').ioslist().on('ajax:success', function() {
  // after adding new elements to the DOM
  $(this).data('instance').refreshElements();
});
```

###Configuration Options & Their Defaults

@TODO

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.

_Also, please don't edit JS files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
[Release History](https://github.com/brianhadaway/iOSList/releases)

## License
Copyright (c) 2014 Brian Hadaway
Licensed under the MIT license.
