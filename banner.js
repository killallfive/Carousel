function Carousel(obj) {
    var wrap = obj.wrap;// 轮播容器
    var urlArr = obj.urlArr; // 轮播图片数组
    var time = obj.time;// 轮播时间

    // 一、创建结构
    wrap.innerHTML = '<div class="slider" id="slider"></div><span id="left"><</span><span id="right">></span><ul class="nav" id="navs"></ul>'
    var $slider = $('#slider');
    var $nav = $('#navs');
    // 添加图片
    $slider.append('<div class="slide"><img src="' + urlArr[urlArr.length - 1] + '" alt=""></div>');
    for (var i = 0; i < urlArr.length; i++) {
        var img = '<div class="slide"><img src=' + urlArr[i] + ' alt=" "></div>';
        $slider.append(img);
    }
    $slider.append('<div class="slide"><img src="' + urlArr[0] + '" alt=""></div>');
    // 添加圆点
    for (var l = 0; l < urlArr.length; l++) {
        var li = ('<li>' + (l + 1) + '</li>');
        $nav.append(li);
    }

    // 二、绑定事件
    var $left = $('#left');
    var $right = $('#right');
    var current = 0;
    // 下标
    $($nav.children()[0]).addClass("active");
    function prevNav(current) {
        if (current == 0) {
            $($nav.children()[urlArr.length - 1]).addClass("active");
            $($nav.children()[0]).removeClass("active");
        } else {
            $($nav.children()[current - 1]).addClass("active");
            $($nav.children()[current]).removeClass("active");
        }
    }
    function nextNav(current) {
        if (current == urlArr.length - 1) {
            $($nav.children()[0]).addClass("active");
            $($nav.children()[urlArr.length - 1]).removeClass("active");
        } else {
            $($nav.children()[current + 1]).addClass("active");
            $($nav.children()[current]).removeClass("active");
        }
    }
    // 鼠标滑入轮播图
    wrap.onmouseover = function () {
        $left.css("opacity", 0.7);
        $right.css("opacity", 0.7);
        clearInterval(timer);
    }
    // 鼠标滑出轮播图
    wrap.onmouseout = function () {
        $right.css("opacity", 0);
        $left.css("opacity", 0);
        timer = setInterval(next, 2000);
    }
    // 点击左箭头
    var flag = false;
    $left.click(prev);
    function prev() {
        if (flag) return;
        flag = true;
        prevNav(current);
        if (current == 0) {
            current = urlArr.length - 1;
            $left.css("disable", "true");
            $slider.animate(
                { left: '+=' + 1200 },
                'slow',
                function () {
                    $slider.css('left', -1200 * urlArr.length);
                    flag = false;

                }
            );
            $left.css("disable", "false");
        } else {
            current--;
            $slider.animate(
                { left: '+=' + 1200 },
                'slow',
                function () {
                    flag = false;
                }
            );
        }
    }
    // 点击右箭头
    $right.click(next);
    function next() {
        if (flag) return;
        flag = true;
        nextNav(current);
        if (current == urlArr.length - 1) {
            current = 0;
            $slider.animate(
                { left: '-=' + 1200 },
                'slow',
                function () {
                    $slider.css('left', -1200);
                    flag = false;
                })
        } else {
            current++;
            $slider.animate(
                { left: '-=' + 1200 },
                'slow',
                function () {
                    flag = false;
                }
            );
        }
    }
    // 点击下标跳转
    for (var n = 0; n < urlArr.length; n++) {
        $nav[0].childNodes[n].onclick = function (e) {
            var step = e.target.innerHTML - 1 - current;
            $($nav.children()[current]).removeClass("active");
            current = e.target.innerHTML - 1;
            $($nav.children()[current]).addClass("active");
            if (step > 0) {
                step = '-=' + (1200 * step)
            } else if (step < 0) {
                step = '+=' + (-1200 * step)
            } else {
                return;
            }
            $slider.animate({ 'left': step }, 'slow')
        };
    }
    // 自动轮播
    timer = setInterval(next, 2000);
}