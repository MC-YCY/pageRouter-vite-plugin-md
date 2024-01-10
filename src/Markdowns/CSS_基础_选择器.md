# 选择器
CSS 选择器是一种用于选择 HTML 元素并将样式应用于它们的方法。使用这些选择器，可以定义特定条件下应用哪些样式。除了普通的选择器外，还有伪类和伪元素，用于选择具有特定状态或特定部分的元素，并将样式应用于它们。本文将通过图文并茂的方式展示这些选择器的使用方法！

## 选择器
### 通用选择器
通用选择器使用 `*` 来选择全部元素。
```html
<div class='box'>
    <nav>文本</nav>
    <span>文本</span>
    <div>
        <span>span</span>
        <div>div</div>
    </div>
    <pre>文本</pre>
</div>
```
由以上结构，希望吧.box的所有后代元素字体改为红色，可以使用如下CSS：
```css
.box *{
    color: red;
}
```

### 元素选择器
同于选择指定 HTML 元素。
```html
<div>div tag</div>
<nav>nav tag</nav>
<p>nav tag</p>
```
```css
p{
    color:red;
}
```

### 类选择器
选择具有指定类名(`class`)的所有元素。
```html
<div class='header'></div>
<div class='container'></div>
<div class='footer'></div>
```
```css
/* 使用 . */
.header{
    background:cyan;
}
```

### ID选择器
选择具有指定`ID`的元素。
```html
<div id='header'></div>
<div id='container'></div>
<div id='footer'></div>
```
```css
/* 使用# */
#header{
    background:cyan;
}
```

### 组合选择器
连接两个或多个类名或 `ID`，以选择具有所有指定类名/`ID`的元素。
```html
<div class='list_item list_itemStyle'>list item1</div>
<div class='list_item'>list item2</div>
```
```css
/* 同时含有 .list_item和.list_itemStyle 的样式 */
.list_item.list_itemStyle{
    color:red;
}
```

### 多重选择器
使用逗号将多个选择器声明分开，这样可以很容易地将相同的样式应用于多个选择器声明。
```html
<div class='card'>
    <div class='card_title'>
        <span class='card_title_icon'></span>
        <span class='card_title_text'></span>
    </div>
    <div class='card_content'>
        <div class='card_content_tip'></div>
    </div>
</div>
```
```css
/* 同时设置 两个元素的样式 */
.card_content_tip,
.card_title_text{
    color:#888;
}
```

### 后代选择器
后代选择器表示选择某个元素的所有后代元素，即位于该元素内部的所有子孙元素。在使用后代选择器时，在两个选择器之间加上一个空格，表示前一个选择器所选中的元素中包含的后代元素。
```html
<div class='card'>
    <div class='card_title'>
        <span class='card_title_icon'></span>
        <span class='card_title_text'></span>
    </div>
    <div class='card_content'>
        <div class='card_content_tip'></div>
    </div>
</div>
```
```css
/* <div class='card_content_tip'></div> */
.card .card_content_tip{
    font-size:14px;
}
```

### 相邻选择器
相邻选择器用于选择紧接在另一个元素后面的直接相邻兄弟元素的选择器，使用加号（`+`）作为组合符号，将两个选择器连接起来。它选择的是位于第一个选择器后紧邻的同级元素。
```html
<div class='list'>
    <div class='list_item'></div>
    <div class='list_item'></div>
    <div class='list_item'></div>
</div>
```
```css
.list_item+.list_item{
    margin-top:10px;
}
```
列表上下间距常见 `第一个元素无margin 后面兄弟有margin`

### 子选择器
子选择器用于选择某个元素的直接子元素，使用大于号（>）作为组合符号，将两个选择器连接起来。它选择的是父级元素下的直接子元素，即元素树结构中的一级关系。
```html
<div class='list'>
    <div class='list_item'></div>
    <div class='list_item'></div>
    <div class='list_item'></div>
</div>
```
```css
.list>.list_item{
    color:red;
}
```

### 通用兄弟选择器
通用兄弟选择器使用波浪号（即通用兄弟组合符）来选择在第一个选择器之前的所有元素，而不要求它们是第一个选择器的直接兄弟元素。
```html
<div class='list'>
    <div class='list_item'></div>
    <div class='list_line'></div>
    <div class='list_item'></div>
    <div class='list_line'></div>
</div>
```
```css
.list_item ~ .list_line{
    background:gold;
}
```

### 猫头鹰选择器
猫头鹰选择器用于选择所有具有前置兄弟元素的元素，用来在一个容器内的元素之间添加间距，但不包括第一个元素，因为第一个元素没有前置兄弟元素。
```html
<div class='list'>
    <div class='list_item'></div>
    <div class='list_item'></div>
    <div class='list_item'></div>
</div>
```
```css
* + *{
    background:pink;
}
```
### 属性选择器
属性选择器用于选择具有特定属性的元素。
- 使用`[attribute]`来选择所有具有 `attribute` 属性的元素：
    ```html
    <div error></div>
    ```
    ```css
    div[error]{
        background:red;
    }
    ```
- 使用 `[attribute=value]` 来选择具有指定属性及属性值的元素：
    ```html
    <div but-status='success'></div>
    ```
    ```css
    div[but-status='success']{
        background:#f1f1f1;
    }
    ```
- 使用 `[attribute~=value]` 来选择具有指定属性，并且该属性的多个值中包含给定值的元素：
    ```html
    <div but-status='yes loading'></div>
    ```
    ```css
    /*当包含 yes */
    div[but-status~='yes']{
        background:#f1f1f1;
    }
    ```
- 使用 `[attribute*=value]` 来选择具有指定属性，并且该属性的值中包含特定部分值的元素。
    ```html
    <div but-status='yes loading'></div>
    ```
    ```css
    /*当包含 yes */
    div[but-status*='ing']{
        background:#f1f1f1;
    }
    ```
- 使用 `[attribute^=value]` 来选择具有指定属性，并且该属性的值以给定值开头的元素。
    ```html
    <a href='http'></a>
    <a href='#link'></a>
    <a href='/page'></a>
    ```
    ```css
    a[href^='http']{
        color:pink;
    }
    a[href^='#']{
        color:green;
    }
    a[href^='/']{
        color:gold;
    }
    ```
- 使用 `[attribute$=value]` 来选择具有指定属性，并且该属性的值以给定值结尾的元素。
    ```html
    <img src='xx.jpg'/>
    <img src='xx.png'/>
    <img src='xx.gif'/>
    ```
    ```css
    img[src$='.jpg']{
        margin-top:10px;
    }
    img[src$='.png']{
        display:block;
    }
    img[src$='.gif']{
        margin-top:10px;
        border-radius:5px;
    }
    ```

## 伪类

## 伪元素

