## terseBanner

#### 适合新手的简化版轮播插件  [在线示例  Online Example](https://happyfreelife.github.io/terseBanner/example/example.html)

<br><br>
**特点介绍**

- 自动构建Banner需要的某些元素，简化原始DOM结构，简化操作方法
- 默认动画模式下，不相邻的项在切换时不会出现其它项
- 默认动画是slide，只能在水平方向滑动
- 可以使用回调函数
- 可以延迟加载图片
- 可以显示缩略图
- 可以在移动设备


<br><br>
**参数说明**

| 名称           | 类型       | 默认值    |说明        
| :-             | :-         | :-        |:- |
| animation      | String     | slide     | 动画模式，可选['slide', 'fade', 'flash', 'none']|
| adaptive       | Boolean    | false     | 图片宽度自适应|
| arrow          | Boolean    | false     | 切换箭头|
| btn            | Boolean    | true      | 指示按钮(在移动端中不可点击)|
| auto           | Number     | 5000      | 自动轮播的间隔(毫秒数，为0时禁用此功能)|
| speed          | Number     | 800       | 动画速度|
| thumbWidth     | Number     | 0         | 缩略图宽度|
| thumbHeight    | Number     | 0         | 缩略图高度|
| init           | Function   |           | 初始化完时执行的回调函数|
| before         | Function   |           | 动画开始时执行的回调函数|
| after          | Function   |           | 动画完成时执行的回调函数|
