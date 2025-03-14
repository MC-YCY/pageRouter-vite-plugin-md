# 隐藏元素
在CSS中很多隐藏元素的方法，但这些方法的可访问性、布局、动画、性能和事件处理的方式有所不同。
- **动画**：一些CSS隐藏元素的方法一般是全有或者全无，元素要么是完全可见，要么是完全不可见，并且没有中间状态。其他的，比如透明度，可以是一个范围的值，所以在这中间过程插入动画成为可能；
- **可访问性**：下面的每一种方法都会在视觉上隐藏一个元素，但不一样会真正的去除DOM元素。有一些方式隐藏元素后，屏幕阅读器仍然能读取到元素内容；
- **事件处理**：隐藏元素之后，有些方式元素上的事件仍然能被触发，而有些方式就会导致元素上的事件触发无效；
- **表现**：浏览器加载并解析 HTML DOM 和 CSS 对象模型后，页面将分三个阶段呈现：布局（生成每个元素的几何位置）、绘制（绘制每个元素的像素）、组合（以适当的顺序放置元素层）。仅导致构图变化的效果明显比影响布局的效果更好。在某些情况下，浏览器还可以使用硬件加速。

## 1.opacity 和 filter: opacity()
`opacity: N` 和 `filter: opacity(N)` 属性可以传递一个 `0` 到 `1` 之间的数字，或者 `0%` 和 `100%` 之间的百分比，对应地表示完全透明和完全不透明。
- `opacity: N`：该属性用来设置元素的透明度；
- `filter: opacity(N)` ：`filter`属性用来设置元素的滤镜，`opacity`是滤镜重的透明度，用来设置元素的透明度。
```css
div {
	opacity: 0;
}

div {
	filter: opacity(0%);
}
```

在现代浏览器中，这两者之间几乎没有实际的区别，但如果同时应用多种效果（模糊、对比度、灰度等）时，应该使用 `filter` 属性。

注意：`opacity` 可以设置动画并提供出色的性能，但页面上保留完全透明的元素可能会触发事件。

| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | IE仅支持 opacity 0 到 1，其他都支持 |
| 可访问性 | 可访问性	如果设置为 0 或 0%，则内容隐藏是否影响布局 |
| 是否影响布局 | ❌ | 
| 影响渲染 | 组合 |
| 性能 | 最好 |
| 是否支持动画 | ✅ |
| 能否触发事件 | ✅ |

## 2.color alpha 透明度
可以将元素的`color`、`background-color` 和 `border-color` 等属性设置为`rgba(0,0,0,0)`，这样就会使元素完全透明：
```css
div {
    color: rgba(0,0,0,0);
    background-color: rgba(0,0,0,0);
}
```
这三个属性都是支持设置动画效果的，需要注意，透明度不能应用于带有背景图片的元素，除非它们是使用 `linear-gradient` 或类似方法生成的。

Alpha 通道可以设置为：
- `transparent`：完全透明（中间不能插入动画）；
- `rgba(r, g, b, a)`：红色、绿色、蓝色和 `alpha；`
- `hsla(h, s, l, a)`：色相、饱和度、亮度和 `alpha；`
- `#RRGGBBAA` 或 `#RGBA`。

| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | IE仅支持 transparent和rgba |
| 可访问性 | 内容能被读取 |
| 是否影响布局 | ❌ |
| 影响渲染 | 绘制 |
| 性能 | 较好 |
| 是否支持动画 | ✅ |
| 能否触发事件 | ✅ |

## 3.transform
`transform` 属性可以用于元素的平移、缩放、旋转或倾斜等。可以使用 `scale(0)` 或者 `translate(-9999px, 0px)`  属性值来将元素隐藏：
```css
div {
	transform: scale(0);
}

div {
	translate(-9999px, 0px)
}
```
`transform` 属性提供了出色的性能和硬件加速，因为元素被有效地移动到了单独的层中，并且可以在 2D 或 3D 中进行动画处理。原始的布局空间会保持原样，并不会受影响。使用这种方式隐藏的元素不会触发任何事件。

| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | 好 |
| 可访问性 | 内容能被读取 |
| 是否影响布局 | ❌ |
| 影响渲染 | 组合 |
| 性能 | 最好，可以使用硬件加速 |
| 是否支持动画 | ✅ |
| 能否触发事件 | ❌ |

## 4.clip-path
`clip-path` 属性可以创建一个剪辑区域，用于确定元素的哪些部分是可见的。使用 `clip-path: circle(0)` 可以将元素进行隐藏。
```css
div {
	clip-path: circle(0);
}
```
`clip-path`为添加动画效果提供了空间，不过它只能在现代浏览器中使用。

| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | 仅限现代浏览器 |
| 可访问性 | 某些应用程序能被读取内容 |
| 是否影响布局 | ❌ |
| 影响渲染 | 绘制 |
| 性能 | 较好 |
| 是否支持动画 | ✅ |
| 能否触发事件 | ❌ |

## 5.visibility: hidden
`visibility` 属性可以设置为 `visible` 或 `hidden` 来显示和隐藏元素。
```css
div {
	visibility: hidden;
}
```
除非使用collapse值，否则元素使用的空间保持不变。

| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | 很好 |
| 可访问性 | 内容不能被读取 |
| 是否影响布局 | ❌ |
| 影响渲染 | 组合 |
| 性能 | 好 |
| 是否支持动画 | ❌ |
| 能否触发事件 | ❌ |

## 6.display: none
`display` 可能是最常用的元素隐藏方法; 。当其值为 · 时元素就隐藏了。被隐藏的元素不会在页面中占据位置，也不会响应绑定的监听事件。
```css
div {
  display: none;
}
```
然而，在大多数情况下，`display` 可能是最糟糕的 CSS 属性。除非使用 `position:absolute` 将元素移出文档流，或者采用`contain`属性，否则它的隐藏过程无法设置动画，并将触发页面重新布局。

| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | 很好 |
| 可访问性 | 内容不能被读取 |
| 是否影响布局 | ✅ |
| 影响渲染 | 布局 |
| 性能 | 差 |
| 是否支持动画 | ❌ |
| 能否触发事件 | ❌ |

## 7.z-index
可以通过将元素的 `z-index` 属性设置为负值，以实现元素的隐藏。这实际上就是将元素放在了我们看不到的层。
```css
div {
  z-index: -1;
}
```
| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | 很好 |
| 可访问性 | 内容可以被读取 |
| 是否影响布局 | ❌ |
| 影响渲染 | 组合 |
| 性能 | 好 |
| 是否支持动画 | ✅ |
| 能否触发事件 | ❌ |

## 8.position
`position`属性允许使用`top`、`bottom`、`left`、`right` 从页面中的默认位置移动元素。因此，绝对定位的元素可以通过左键：`-9999px` 等值移出屏幕：
```css
div {
  position: absolute;
  left: -999px;
}
```
| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | 很好 |
| 可访问性 | 内容可以被读取 |
| 是否影响布局 | ✅ |
| 影响渲染 | 布局 |
| 性能 | 较好 |
| 是否支持动画 | ✅ |
| 能否触发事件 | ✅ |

## 9.覆盖另一个元素
通过在元素的上面放置与背景颜色相同的元素，可以在视觉上隐藏一个元素。下面来使用`::after`伪元素来实现：
```css
div::after {
  position: absolute;
  content: '';
  top: 0;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
}
```
虽然这从技术上讲是可以实现的，但是这样做需要更多的代码。

| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | 很好 |
| 可访问性 | 内容可以被读取 |
| 是否影响布局 | ❌ |
| 影响渲染 | 绘制 |
| 性能 | 较好 |
| 是否支持动画 | ✅ |
| 能否触发事件 | ✅ |

## 10.缩小尺寸
可以通过使用`width`、`height`、`padding`、`border-width` 或 `font-size` 来缩小元素的尺寸以实现元素的隐藏。可能还需要应用 `overflow: hidden;` 来确保内容不会溢出。
```css
div {
  height: 0;
  padding: 0;
  overflow: hidden;
}
```
使用这种形式我们可以在隐藏过程中使用动画效果，并且他的性能会比 `transform` 好很多。
| 指标 | 影响 |
| --- | --- |
| 浏览器支持 | 很好 |
| 可访问性 | 内容可以被读取 |
| 是否影响布局 | ✅ |
| 影响渲染 | 布局 |
| 性能 | 较差 |
| 是否支持动画 | ✅ |
| 能否触发事件 | ❌ |
