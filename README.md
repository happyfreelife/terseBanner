# easyBanner


[view the online demo][1]


## Feature

- simple, almost no redundant functions

- easy to use, automatic adding style, automatic thumbnail

- smooth, double jquqery animate and CSS transition animation program


## How to use

```html
<!-- banner element and images -->
<div class="banner">
    <ul>
        <li><img src="img/banner-1.jpg"></li>
        <li><img src="img/banner-2.jpg"></li>
        <li><img src="img/banner-3.jpg"></li>
        <li><img src="img/banner-4.jpg"></li>
        <li><img src="img/banner-5.jpg"></li>
    </ul>
</div>      
```

```css
/* must give the banner height */
.banner{
    height: 500px;
}
```

```html
<!-- include jquery lib file and jquery.eayBanner.js -->
<script type="text/javascript" src="../lib/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="../src/jquery.easyBanner.js"></script>

<!-- call the main method -->
<script>
    $('.banner').easyBanner();
</script>
```

## Options

- *animation*: animation mode["slide", "fade", "none"] 
- *trigger*  : through the sequence  elements to trigger the animation event type["click", "hover"]
- *arrow*    : display the left and right arrows
- *serial*   : sequence  elements[true, false, "equal", "thumb"]
- *autoPlay* : open automatically round
- *speed*    : by the speed of the animation
- *interval* : interval of the auto play animation
- *during*   : in the callback function to perform the animation
- *after*    : the callback function is executed in the animation when finished.


## Compatibility
supported by modern browsers and IE8+ browsers

[1]: https://happyfreelife.github.io/easyBanner