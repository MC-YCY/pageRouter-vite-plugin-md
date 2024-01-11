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
### 链接伪类选择器
这 4 个伪类用于选择链接处于不同状态的元素。它们最常与链接一起使用，但是 `:active` 也适用于按钮，而 `:hover` 可以用于各种元素：
- `:link` 选取未被访问过的链接，用于为用户尚未点击的超链接设置样式。
- `:visited` 选取已经被用户访问过的链接，用于为用户之前点击过的超链接设置样式。
- `:hover` 当用户指针（例如鼠标光标）悬停在某些元素（通常是链接）上时，选取这些元素。
- `:active` 在元素（通常是链接或按钮）被激活时，例如用户点击它们的瞬间，选取这些元素。

这 4 个伪类可用于提高用户交互性，例如增加链接的可见度，使其更加显著突出，从而改善用户体验。
```html
<a target='_blank' ref='https://developer.mozilla.org/zh-CN/docs/Learn/CSS/First_steps'>link</a>
```
```css
a{
    transition:all .3s linear;
}
a:link{
    background:skyblue;
}
a:visited{
    color:#999
}
a:hover{
    color:gold;
}
a:active{
    background:cyan;
}
```

### :focus 伪类
`:focus` 伪类用于选择当前获得焦点的元素。当用户与网页上的表单元素进行交互时，可以通过点击或键盘导航，使某个特定的输入框处于焦点状态。这意味着用户的输入将直接应用到该输入框上。
<div>
<input class='focus' value='value'/>
</div>
<style>
.focus{
    width:260px;
    height:32px;
    background:#fff;
    padding:0px 10px;
    color:#333;
    border-radius:10px;
    border:none;
    outline:none;
    transition:all .3s linear;
    box-shadow:0px 0px 3px #333;
}
.focus:focus{
    box-shadow:0px 0px 6px skyblue;
    color:#000;
    width:300px;
}
</style>

```html
<input class='focus' value='value'/>
<style>
.focus{
    width:160px;
    height:32px;
    background:#fff;
    padding:0px 10px;
    color:#333;
    border-radius:10px;
    border:none;
    outline:none;
    transition:all .3s linear;
    box-shadow:0px 0px 3px #333;
}
.focus:focus{
    box-shadow:0px 0px 6px skyblue;
    color:#000;
    width:300px;
}
</style>
```

### :checked 伪类
`:checked` 伪类用于选择当前被选中或选择的单选按钮、复选框或 select 元素的选项。
- `<input>` type checkbox;
- `<input>` type radio;
- `<select>`;
<div>
    <input class='checked_input' type="checkbox" id="checked_for_label" />
    <label for="checked_for_label">Check me!</label>
</div>
<style>
    .checked_input:checked + label{
        color:#1677ff;
    }
</style>

```html
<div>
    <input class='checked_input' type="checkbox" id="checked_for_label" />
    <label for="checked_for_label">Check me!</label>
</div>
<style>
    .checked_input:checked + label{
        color:#1677ff;
    }
</style>
```

### :disabled 伪类
`:disabled` 伪类用于匹配被禁用的表单元素，例如按钮或文本输入框。
<div class='disabled'>
    <input value='input value'/>
    <input disabled value='input disabled'/>
</div>
<style>
    .disabled input{
        width:260px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
    }
    .disabled input:disabled{
        background:#f1f1f1;
        color:#999;
        border-color:red;
    }
</style>

```html
<div class='disabled'>
    <input value='input value'/>
    <input disabled value='input disabled'/>
</div>
<style>
    .disabled input{
        width:260px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    .disabled input:disabled{
        background:#f1f1f1;
        color:#999;
        border-color:red;
    }
</style>
```

### :enabled 伪类
`:enabled` 伪类用于匹配可以交互和接收输入的表单元素。
<div class='enabled'>
    <input value='input value'/>
    <input disabled value='input disabled'/>
    <textarea>内容</textarea>
</div>
<style>
    .enabled input{
        width:260px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
    }
    .enabled input:disabled{
        background:#f1f1f1;
        color:#999;
        border-color:red;
    }
    /* input disabled 禁用不可输入 可输入的 */
    .enabled *:enabled{
        color:#1677ff;
    }
</style>

```html
<div class='enabled'>
    <input value='input value'/>
    <input disabled value='input disabled'/>
    <textarea>内容</textarea>
</div>
<style>
    .enabled input{
        width:260px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
    }
    .enabled input:disabled{
        background:#f1f1f1;
        color:#999;
        border-color:red;
    }
    /* input disabled 禁用不可输入 可输入的 */
    .enabled *:enabled{
        color:#1677ff;
    }
</style>
```

### :valid 伪类
`:valid` 伪类用于选择具有与其属性（如 `pattern`、`type` 等）所指定要求相匹配的内容的输入元素。

当 `input` 元素的内容符合其属性所指定的要求时，可以使用 `:valid` 伪类选择它们。
<div class='validDemo'>
    <span>type:email</span>
    <input type='email' value='13333333'/>
    <span>type:email</span>
    <input type='email' value='13333333@qq.com'/>
    <span>type:text</span>
    <input type='text' value='13333333@qq.com'/>
</div>
<style>
    .validDemo input{
        width:200px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    /* type email 输入邮箱才可以 */
    .validDemo input[type='email']:valid{
        color:#1677ff;
        box-shadow:0px 0px 6px skyblue;
    }
    /* type text*/
    .validDemo input[type='text']:valid{
        color:gold;
        box-shadow:0px 0px 6px skyblue;
    }
</style>

```html
<div class='validDemo'>
    <span>type:email</span>
    <input type='email' value='13333333'/>
    <span>type:email</span>
    <input type='email' value='13333333@qq.com'/>
    <span>type:text</span>
    <input type='text' value='13333333@qq.com'/>
</div>
<style>
    .validDemo input{
        width:200px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    /* type email 输入邮箱才可以 */
    .validDemo input[type='email']:valid{
        color:#1677ff;
        box-shadow:0px 0px 6px skyblue;
    }
    /* type text*/
    .validDemo input[type='text']:valid{
        color:gold;
        box-shadow:0px 0px 6px skyblue;
    }
</style>
```

### :invalid 伪类
`:invalid` 伪类用于选择具有内容不符合要求的输入元素。

和 `:valid` 相反；

当`input`元素的内容不符合其要求时，可以使用 `:invalid` 伪类来选择它们。
<div class='invalidDemo'>
    <span>type:email</span>
    <input type='email' value='13333333'/>
    <span>type:email</span>
    <input type='email' value='13333333@qq.com'/>
    <span>type:text</span>
    <input type='text' value='13333333@qq.com'/>
</div>
<style>
    .invalidDemo input{
        width:200px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    /* type email 输入邮箱才可以 */
    .invalidDemo input[type='email']:valid{
        color:#1677ff;
        box-shadow:0px 0px 6px skyblue;
    }
    /* type text*/
    .invalidDemo input[type='text']:valid{
        color:gold;
        box-shadow:0px 0px 6px skyblue;
    }
    /* type email 输入邮箱才可以 这里不符合改为字体红色*/
    .invalidDemo input[type='email']:invalid{
        color:red;
    }
</style>

```html
<div class='invalidDemo'>
    <span>type:email</span>
    <input type='email' value='13333333'/>
    <span>type:email</span>
    <input type='email' value='13333333@qq.com'/>
    <span>type:text</span>
    <input type='text' value='13333333@qq.com'/>
</div>
<style>
    .invalidDemo input{
        width:200px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    /* type email 输入邮箱才可以 */
    .invalidDemo input[type='email']:valid{
        color:#1677ff;
        box-shadow:0px 0px 6px skyblue;
    }
    /* type text*/
    .invalidDemo input[type='text']:valid{
        color:gold;
        box-shadow:0px 0px 6px skyblue;
    }
    /* type email 输入邮箱才可以 这里不符合改为字体红色*/
    .invalidDemo input[type='email']:invalid{
        color:red;
    }
</style>
```

### :required 伪类
`:required` 伪类用于选择具有 `required` 属性的输入元素，该属性表示在提交表单之前必须填写它们。
当 `input` 元素具有 `required` 属性时，可以使用 `:required` 伪类选择它们。
<div class='requiredDemo'>
    <span><span style='color:red'>*</span>手机号</span>
    <input type='text' required/>
    <span>兴趣</span>
    <input/>
    <span>爱好</span>
    <input/>
</div>
<style>
    .requiredDemo input{
        width:200px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    .requiredDemo input[type='text']:required{
        box-shadow:0px 0px 4px red;
    }
</style>

```html
<div class='requiredDemo'>
    <span><span style='color:red'>*</span>手机号</span>
    <input type='text' required/>
    <span>兴趣</span>
    <input/>
    <span>爱好</span>
    <input/>
</div>
<style>
    .requiredDemo input{
        width:200px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    .requiredDemo input[type='text']:required{
        box-shadow:0px 0px 4px red;
    }
</style>
```

### :optional 伪类
`:optional` 伪类用于选择没有 `required` 属性的输入元素，这意味着它们不是必填项。

当`input` 元素没有 `required` 属性时，可以使用 `:optional` 伪类选择它们。
<div class='optionalDemo'>
    <span><span style='color:red'>*</span>手机号</span>
    <input type='text' required/>
    <span>兴趣</span>
    <input type='text'/>
    <span>爱好</span>
    <input type='text'/>
</div>
<style>
    .optionalDemo input{
        width:200px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    .optionalDemo input[type='text']:required{
        box-shadow:0px 0px 4px red;
    }
    .optionalDemo input[type='text']:optional{
        box-shadow:0px 0px 4px #1677ff;
    }
</style>

```html
<div class='optionalDemo'>
    <span><span style='color:red'>*</span>手机号</span>
    <input type='text' required/>
    <span>兴趣</span>
    <input type='text'/>
    <span>爱好</span>
    <input type='text'/>
</div>
<style>
    .optionalDemo input{
        width:200px;
        height:32px;
        border-radius:6px;
        outline:none;
        border:1px solid #ccc;
        margin-right:10px;
    }
    .optionalDemo input[type='text']:required{
        box-shadow:0px 0px 4px red;
    }
    .optionalDemo input[type='text']:optional{
        box-shadow:0px 0px 4px #1677ff;
    }
</style>
```

### :first-child 伪类
`:first-child` 伪类用于选择父元素中的第一个子元素。
<div class='firstChildDemo'>
    <div>firstChildDemo item One</div>
    <div>firstChildDemo item two</div>
    <div>firstChildDemo item three</div>
</div>
<style>
    .firstChildDemo{
        display:flex;
    }
    .firstChildDemo div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .firstChildDemo div:first-child{
        color:#f1f1f1;
        font-weight:bold;
        border-radius:6px;
    }
    .firstChildDemo div+div{
        margin-left:10px
    }
</style>

```html
<div class='firstChildDemo'>
    <div>firstChildDemo item One</div>
    <div>firstChildDemo item two</div>
    <div>firstChildDemo item three</div>
</div>
<style>
    .firstChildDemo{
        display:flex;
    }
    .firstChildDemo div{
        width:260px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .firstChildDemo div:first-child{
        color:#f1f1f1;
        font-weight:bold;
        border-radius:6px;
    }
    .firstChildDemo div+div{
        margin-left:10px
    }
</style>
```

### :last-child 伪类
`:last-child` 伪类用于选择父元素中的最后一个子元素。
<div class='lastChildDemo'>
    <div>firstChildDemo item One</div>
    <div>firstChildDemo item two</div>
    <div>firstChildDemo item three</div>
</div>
<style>
    .lastChildDemo{
        display:flex;
    }
    .lastChildDemo div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .lastChildDemo div:last-child{
        color:#f1f1f1;
        font-weight:bold;
        border-radius:6px;
    }
    .lastChildDemo div+div{
        margin-left:10px
    }
</style>

```html
<div class='lastChildDemo'>
    <div>firstChildDemo item One</div>
    <div>firstChildDemo item two</div>
    <div>firstChildDemo item three</div>
</div>
<style>
    .lastChildDemo{
        display:flex;
    }
    .lastChildDemo div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .lastChildDemo div:last-child{
        color:#f1f1f1;
        font-weight:bold;
        border-radius:6px;
    }
    .lastChildDemo div+div{
        margin-left:10px
    }
</style>
```

### :nth-child 伪类
`:nth-child` 伪类根据元素在父元素中的位置进行选择，允许进行各种选择。
`:nth-child` 还可以自定义模式选择元素：
- `:nth-child(odd)` 或 `:nth-child(2n+1)` 选择每个奇数位置的子元素
- `:nth-child(even)` 或 `:nth-child(2n)` 选择每个偶数位置的子元素

公式中的 `n`就像一个计数器，可以按重复周期选择元素。例如，`:nth-child(3n)` 将选择每三个元素。
#### :nth-child(n)
`:nth-child(3)` 选中第三个元素
<div class='nthChildN'>
    <div>item-1</div>
    <div>item-2</div>
    <div>item-3</div>
    <div>item-4</div>
</div>
<style>
    .nthChildN{
        display:flex;
    }
    .nthChildN div:nth-child(3){
        border-radius:10px;
        color:red;
        font-weight:bold;
    }
    .nthChildN div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .nthChildN div+div{
        margin-left:10px;
    }
</style>

```html
<div class='nthChildN'>
    <div>item-1</div>
    <div>item-2</div>
    <div>item-3</div>
    <div>item-4</div>
</div>
<style>
    .nthChildN{
        display:flex;
    }
    .nthChildN div:nth-child(3){
        border-radius:10px;
        color:red;
        font-weight:bold;
    }
    .nthChildN div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .nthChildN div+div{
        margin-left:10px;
    }
</style>
```
#### :nth-child(odd)
`:nth-child(odd)` 选择奇数元素
<div class='nthChildOdd'>
    <div>item-1</div>
    <div>item-2</div>
    <div>item-3</div>
    <div>item-4</div>
</div>
<style>
    .nthChildOdd{
        display:flex;
    }
    .nthChildOdd div:nth-child(odd){
        border-radius:10px;
        color:red;
        font-weight:bold;
    }
    .nthChildOdd div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .nthChildOdd div+div{
        margin-left:10px;
    }
</style>

```html
<div class='nthChildOdd'>
    <div>item-1</div>
    <div>item-2</div>
    <div>item-3</div>
    <div>item-4</div>
</div>
<style>
    .nthChildOdd{
        display:flex;
    }
    .nthChildOdd div:nth-child(odd){
        border-radius:10px;
        color:red;
        font-weight:bold;
    }
    .nthChildOdd div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .nthChildOdd div+div{
        margin-left:10px;
    }
</style>
```
#### :nth-child(even)
`:nth-child(even)` 选择偶数元素
<div class='nthChildEven'>
    <div>item-1</div>
    <div>item-2</div>
    <div>item-3</div>
    <div>item-4</div>
</div>
<style>
    .nthChildEven{
        display:flex;
    }
    .nthChildEven div:nth-child(even){
        border-radius:10px;
        color:red;
        font-weight:bold;
    }
    .nthChildEven div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .nthChildEven div+div{
        margin-left:10px;
    }
</style>

```html
<div class='nthChildEven'>
    <div>item-1</div>
    <div>item-2</div>
    <div>item-3</div>
    <div>item-4</div>
</div>
<style>
    .nthChildEven{
        display:flex;
    }
    .nthChildEven div:nth-child(even){
        border-radius:10px;
        color:red;
        font-weight:bold;
    }
    .nthChildEven div{
        width:200px;
        background:#1677ff;
        height:32px;
        display:flex;
        justify-content:center;
        align-items:center;
        color:#fff;
    }
    .nthChildEven div+div{
        margin-left:10px;
    }
</style>
```
#### :nth-child(formula)
这个用的不常用但是非常好用，方便了很多操作例如一个格子布局的
- `7n` 理解为符合 `7 % n == 0`条件的
- `7n+1` 理解为 `7 % n == 1`条件的
<div class='nthchildFormula'>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
</div>
<style>
    .nthchildFormula{
        display:flex;
        flex-wrap:wrap;
        width:calc(350px + 7 * 2px * 2);
    }
    .nthchildFormula div{
        width:50px;
        height:30px;
        background:#f1f1f1;
        text-align:center;
        line-height:30px;
        margin:2px;
    }
    .nthchildFormula div:nth-child(7n+1){
        color:#1677ff;
        font-weight:bold;
    }
    .nthchildFormula div:nth-child(7n){
        color:green;
        font-weight:bold;
    }
</style>

```html
<div class='nthchildFormula'>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
</div>
<style>
    .nthchildFormula{
        display:flex;
        flex-wrap:wrap;
        width:calc(350px + 7 * 2px * 2);
    }
    .nthchildFormula div{
        width:50px;
        height:30px;
        background:#f1f1f1;
        text-align:center;
        line-height:30px;
        margin:2px;
    }
    .nthchildFormula div:nth-child(7n+1){
        color:#1677ff;
        font-weight:bold;
    }
    .nthchildFormula div:nth-child(7n){
        color:green;
        font-weight:bold;
    }
</style>
```

### :nth-last-child 伪类
`:nth-last-child` 伪类与 `:nth-child` 类似，但是从最后一个子元素向后计数。

`nth-last-child(2)` 选择倒数第二个元素
<div class='nthLastChild'>
    <div>item-1</div>
    <div>item-2</div>
    <div>item-3</div>
    <div>item-4</div>
    <div>item-5</div>
</div>
<style>
    .nthLastChild{
        display:flex;
    }
    .nthLastChild div:nth-last-child(2){
        border-radius:10px;
        color:greenyellow;
        font-weight:600;
    }
    .nthLastChild div+div{
        margin-left:10px
    }
    .nthLastChild div{
        width:100px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
</style>

```html
<div class='nthLastChild'>
    <div>item-1</div>
    <div>item-2</div>
    <div>item-3</div>
    <div>item-4</div>
    <div>item-5</div>
</div>
<style>
    .nthLastChild{
        display:flex;
    }
    .nthLastChild div:nth-last-child(2){
        border-radius:10px;
        color:greenyellow;
        font-weight:600;
    }
    .nthLastChild div+div{
        margin-left:10px
    }
    .nthLastChild div{
        width:100px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
</style>
```
### :only-child 伪类
当需要选择在其父级元素中唯一的一个子元素时，可以使用 `:only-child` 伪类。
<div>onlyChildDemo 1</div>
<div class='onlyChildDemo'>
    <div>onlyChildDemo children</div>
    <div>onlyChildDemo children</div>
</div>
<div>onlyChildDemo 2</div>
<div class='onlyChildDemo'>
    <div>onlyChildDemo children</div>
</div>
<style>
    .onlyChildDemo div:only-child{
        border-radius:10px;
    }
    .onlyChildDemo{
        display:flex;
    }
    .onlyChildDemo+.onlyChildDemo{
        margin-top:10px;
    }
    .onlyChildDemo div+div{
        margin-left:10px;
    }
    .onlyChildDemo div{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
</style>

```html
<div>onlyChildDemo 1</div>
<div class='onlyChildDemo'>
    <div>onlyChildDemo children</div>
    <div>onlyChildDemo children</div>
</div>
<div>onlyChildDemo 2</div>
<div class='onlyChildDemo'>
    <div>onlyChildDemo children</div>
</div>
<style>
    .onlyChildDemo div:only-child{
        border-radius:10px;
    }
    .onlyChildDemo{
        display:flex;
    }
    .onlyChildDemo+.onlyChildDemo{
        margin-top:10px;
    }
    .onlyChildDemo div+div{
        margin-left:10px;
    }
    .onlyChildDemo div{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
</style>
```

### :first-of-type 伪类
`:first-of-type` 伪类选择在其父元素中的特定类型的元素中的第一个元素。

不止是标签选择器，可以是class id等等配合

<div class='firstOfType'>
    <div>div 1</div>
    <nav>nav 1</nav>
    <nav>nav 2</nav>
    <div>div 2</div>
</div>
<style>
    .firstOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .firstOfType *+*{
        margin-top:10px;
    }
    /* nav 的第一个*/
    .firstOfType nav:first-of-type{
        background:greenyellow;
        color:green;
    }
    /* div 的第一个*/
    .firstOfType div:first-of-type{
        background:green;
        color:#fff;
    }
</style>

```html
<div class='firstOfType'>
    <div>div 1</div>
    <nav>nav 1</nav>
    <nav>nav 2</nav>
    <div>div 2</div>
</div>
<style>
    .firstOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .firstOfType *+*{
        margin-top:10px;
    }
    /* nav 的第一个*/
    .firstOfType nav:first-of-type{
        background:greenyellow;
        color:green;
    }
    /* div 的第一个*/
    .firstOfType div:first-of-type{
        background:green;
        color:#fff;
    }
</style>
```

### :last-of-type 伪类
`:last-of-type` 伪类选择在其父元素中的特定类型的元素中的最后一个元素。

不止是标签选择器，可以是class id等等配合
<div class='lastOfType'>
    <div>div 1</div>
    <nav>nav 1</nav>
    <nav>nav 2</nav>
    <div>div 2</div>
    <span class='span1'>.span1</span>
    <span class='span2'>.span2</span>
    <span class='span1'>.span1</span>
</div>
<style>
    .lastOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .lastOfType *+*{
        margin-top:10px;
    }
    /* nav 最后一个*/
    .lastOfType nav:last-of-type{
        background:greenyellow;
        color:green;
    }
    /* div 最后一个*/
    .lastOfType div:last-of-type{
        background:green;
        color:#fff;
    }
     /* .span1 最后一个*/
    .lastOfType .span1:last-of-type{
        background:red;
        color:#fff;
    }
</style>

```html
<div class='lastOfType'>
    <div>div 1</div>
    <nav>nav 1</nav>
    <nav>nav 2</nav>
    <div>div 2</div>
    <span class='span1'>.span1</span>
    <span class='span2'>.span2</span>
    <span class='span1'>.span1</span>
</div>
<style>
    .lastOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .lastOfType *+*{
        margin-top:10px;
    }
    /* nav 最后一个*/
    .lastOfType nav:last-of-type{
        background:greenyellow;
        color:green;
    }
    /* div 最后一个*/
    .lastOfType div:last-of-type{
        background:green;
        color:#fff;
    }
     /* .span1 最后一个*/
    .lastOfType .span1:last-of-type{
        background:red;
        color:#fff;
    }
</style>
```

### :nth-of-type 伪类
当需要根据元素在兄弟元素中的类型和位置选择元素时，可以使用 `:nth-of-type` 伪类。
- `nav:nth-of-type(2)` 第二个`nav`
- `.item:nth-of-type(2)` 第二个`.item`
- `[type='text']:nth-of-type(2)` 第二个`[type='text']`的元素
<div class='nthOfType'>
    <div>div</div>
    <nav>nav 1</nav>
    <span>span 1</span>
    <nav>nav 2</nav>
    <p>p</p>
    <nav>nav 3</nav>
</div>
<style>
    .nthOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .nthOfType *+*{
        margin-top:10px;
    }
    /*第二个 nav*/
    .nthOfType nav:nth-of-type(2){
        border-radius:10px;
        background:greenyellow;
        color:green;
    }
</style>

```html
<div class='nthOfType'>
    <div>div</div>
    <nav>nav 1</nav>
    <span>span 1</span>
    <nav>nav 2</nav>
    <p>p</p>
    <nav>nav 3</nav>
</div>
<style>
    .nthOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .nthOfType *+*{
        margin-top:10px;
    }
    /*第二个 nav*/
    .nthOfType nav:nth-of-type(2){
        border-radius:10px;
        background:greenyellow;
        color:green;
    }
</style>
```
### :nth-last-of-type 伪类
`:`当需要根据元素在兄弟元素中的类型和位置选择元素，并且从末尾开始计数时，可以使用 `:nth-last-of-type` 伪类。
- `nav:nth-last-of-type(2)` 倒数第二个`nav`
- `.item:nth-last-of-type(2)` 倒数第二个`.item`
- `[type='text']:nth-last-of-type(2)` 倒数第二个`[type='text']`的元素
<div class='nthLastOfType'>
    <div>div</div>
    <nav>nav 1</nav>
    <span>span 1</span>
    <nav>nav 2</nav>
    <p>p</p>
    <nav>nav 3</nav>
    <nav>nav 4</nav>
</div>
<style>
    .nthLastOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .nthLastOfType *+*{
        margin-top:10px;
    }
    /*第二个 nav*/
    .nthLastOfType nav:nth-last-of-type(2){
        border-radius:10px;
        background:greenyellow;
        color:green;
    }
</style>

```html
<div class='nthLastOfType'>
    <div>div</div>
    <nav>nav 1</nav>
    <span>span 1</span>
    <nav>nav 2</nav>
    <p>p</p>
    <nav>nav 3</nav>
    <nav>nav 4</nav>
</div>
<style>
    .nthLastOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .nthLastOfType *+*{
        margin-top:10px;
    }
    /*第二个 nav*/
    .nthLastOfType nav:nth-last-of-type(2){
        border-radius:10px;
        background:greenyellow;
        color:green;
    }
</style>
```

### :only-of-type 伪类
当需要选择在其兄弟元素中为特定类型的元素仅有一个的元素时，可以使用 `:only-of-type` 伪类。
<div>demo 1</div>
<div class='onlyOfType'>
    <div>div</div>
    <nav>nav</nav>
</div>
<div>demo 2</div>
<div class='onlyOfType'>
    <nav>nav</nav>
    <div>div</div>
    <div>div</div>
</div>
<style>
    /* 只有一个div就可以 */
    .onlyOfType div:only-of-type{
        border-radius:10px;
    }
    .onlyOfType{
        display:flex;
    }
    .onlyOfType+.onlyOfType{
        margin-top:10px;
    }
    .onlyOfType *+*{
        margin-left:10px;
    }
    .onlyOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
</style>

```html
<div>demo 1</div>
<div class='onlyOfType'>
    <div>div</div>
    <nav>nav</nav>
</div>
<div>demo 2</div>
<div class='onlyOfType'>
    <nav>nav</nav>
    <div>div</div>
    <div>div</div>
</div>
<style>
    /* 只有一个div就可以 */
    .onlyOfType div:only-of-type{
        border-radius:10px;
    }
    .onlyOfType{
        display:flex;
    }
    .onlyOfType+.onlyOfType{
        margin-top:10px;
    }
    .onlyOfType *+*{
        margin-left:10px;
    }
    .onlyOfType *{
        width:200px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
</style>
```

### :target 伪类
`:target` 用于选择具有与 `URL` 片段匹配的 `ID` 属性的元素。`URL` 片段是指 `URL` 中的 `#` 符号后面的部分。当从页面中的链接点击跳转到带有特定片段的 `URL` 时，`:target` 伪类将会被应用于与片段匹配的对应元素上。这样可以利用 `:target` 来为被直接链接到的页面部分设置不同的样式，从而提供视觉上的反馈和突出显示。

需要 `URL` 地址的 `#` 后面的字段匹配符合的选中；**多用于锚点**
```html
<a id='#id'>link id</a>
<div class='scroll'>
    <div id='id' class='content'></div>
</div>
<style>
    .content:target{
        background:#1677ff;
    }
</style>
```

### :not() 伪类
使用 `:not()` 伪类可以选择不符合指定选择器或条件的元素。这在需要排除某些特定元素时非常有用。
<div class='notDemo'>
    <div class='item'>.item</div>
    <div class='active'>.active</div>
    <div class='item'>.item</div>
    <div class='item'>.item</div>
</div>
<style>
    /*除了 .active 不选择其它div都选择 当然可以用*选择全部*/
    .notDemo div:not(.active){
        background:greenyellow;
    }
    .notDemo{
        display:flex;
    }
    .notDemo div{
        width:160px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .notDemo div+div{
        margin-left:10px;
    }
</style>

```html
<div class='notDemo'>
    <div class='item'>.item</div>
    <div class='active'>.active</div>
    <div class='item'>.item</div>
    <div class='item'>.item</div>
</div>
<style>
    /*除了 .active 不选择其它div都选择 当然可以用*选择全部*/
    .notDemo div:not(.active){
        background:greenyellow;
    }
    .notDemo{
        display:flex;
    }
    .notDemo div{
        width:160px;
        height:30px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#1677ff;
    }
    .notDemo div+div{
        margin-left:10px;
    }
</style>
```

### has() 伪类
使用 `:has()` 伪类可以选择包含某个特定元素或选择器的父级元素，并为其应用样式。

功能非常好用，当子类有class父元素可以做改动；
<a target='_blank' href='https://developer.mozilla.org/zh-CN/docs/Web/CSS/:has#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7'>
版本兼容要求版本过高，点击查看
</a>
<div>demo1</div>
<div class='hasDemo'>
    <div class='hasDemo_tip'>这是一个小提示</div>
    <div class='hasDemo_title'>这是一个标题</div>
</div>
<div>demo1</div>
<div class='hasDemo'>
    <div class='hasDemo_tip hasDemo_tipColor'>这是一个小提示</div>
    <div class='hasDemo_title'>这是一个标题</div>
</div>
<style>
.hasDemo{
    background:#f1f1f1;
}
/*当 .hasDemo 中存在.hasDemo_tip.hasDemo_tipColor 选择器时，选择.hasDemo */
.hasDemo:has(.hasDemo_tip.hasDemo_tipColor){
    background:#1677ff;
}
</style>

```html
<div>demo1</div>
<div class='hasDemo'>
    <div class='hasDemo_tip'>这是一个小提示</div>
    <div class='hasDemo_title'>这是一个标题</div>
</div>
<div>demo1</div>
<div class='hasDemo'>
    <div class='hasDemo_tip hasDemo_tipColor'>这是一个小提示</div>
    <div class='hasDemo_title'>这是一个标题</div>
</div>
<style>
.hasDemo{
    background:#f1f1f1;
}
/*当 .hasDemo 中存在.hasDemo_tip.hasDemo_tipColor 选择器时，选择.hasDemo */
.hasDemo:has(.hasDemo_tip.hasDemo_tipColor){
    background:#1677ff;
}
</style>
```

### 其他伪类
除了上面提到的伪类，CSS中还包含以下伪类：
- `:root`：选择文档中最高级别的父元素，通常是HTML文档中的 `<html>` 元素。可用于定义对所有页面元素可用的CSS变量。
- `:is()`：匹配可以是多个选择器之一的元素，使得长的选择器列表更加简短和易读。例如，`:is(h1, h2, h3)` 会匹配这三个标题元素之一。
- `:where()`：与 `:is()` 类似，但允许根据条件选择元素，而不影响选择器的特异性。
- `:default`：匹配设置为默认选择状态的用户界面元素（如单选按钮或复选框）。
- `:empty`：选择没有子元素（包括文本节点）的元素。
- `:fullscreen`：选择当前以全屏模式显示的元素。
- `:in-range`：匹配值在指定范围内的表单元素（使用 `min` 和 `max` 属性指定范围）。
- `:out-of-range`：匹配值在指定范围之外的表单元素。
- `:indeterminate`：选择状态不确定的表单元素，例如既未选中也未取消选中的复选框（在树状结构中经常见到）。
- `:read-only`：匹配由于 `readonly` 属性而不可编辑的表单元素。
- `:read-write`：选择可由用户编辑的表单元素，意味着它们不是只读的。
- `:lang()`：根据元素的语言属性进行匹配。例如，`:lang(en)` 选择使用英语定义的元素。

## 伪元素

### ::before 伪元素
`::before` 伪元素用于在元素内容之前插入内容。它可以用于添加装饰性内容、图标或其他不需要出现在实际 DOM 中的元素。
<div class='beforeDemo'>
    世界很美好感谢有你！
</div>
<style>
    .beforeDemo{
        height:20px;
        line-height:20px;
        color:#1677ff;
        font-size:14px;
    }
    .beforeDemo::before{
        content: '🙂';
        font-size:14px;
    }
</style>

```html
<div class='beforeDemo'>
    世界很美好感谢有你！
</div>
<style>
    .beforeDemo{
        height:20px;
        line-height:20px;
        color:#1677ff;
        font-size:14px;
    }
    .beforeDemo::before{
        content: '🙂';
        font-size:14px;
    }
</style>
```

### ::after 伪元素
`::after` 伪元素与 `::before` 伪元素类似，用于在元素的内容之后插入内容。
<div class='afterDemo'>
    世界很美好感谢有你！
</div>
<style>
     .afterDemo{
        height:20px;
        line-height:20px;
        color:#1677ff;
        font-size:14px;
    }
    .afterDemo::after{
        content: '🙂';
        font-size:14px;
    }
</style>

```html
<div class='afterDemo'>
    世界很美好感谢有你！
</div>
<style>
     .afterDemo{
        height:20px;
        line-height:20px;
        color:#1677ff;
        font-size:14px;
    }
    .afterDemo::after{
        content: '🙂';
        font-size:14px;
    }
</style>
```


### ::first-letter 伪元素
`::first-letter` 伪元素用于选择并修改块级元素的第一个字母，从而应用特定的样式。这个伪元素只能选择每个块级元素的第一个字母，并且仅在有文本内容的时候生效。

选中第一个字符加以样式
<div class='firstLetterDemo'>
    This is an example
</div>
<div class='firstLetterDemo'>
    这是一个示例
</div>
<style>
    .firstLetterDemo{
        font-size:14px;
        color:#1677ff;
    }
    .firstLetterDemo::first-letter{
        font-size:2em;
        font-weight:600;
    }
</style>

```html
<div class='firstLetterDemo'>
    This is an example
</div>
<div class='firstLetterDemo'>
    这是一个示例
</div>
<style>
    .firstLetterDemo{
        font-size:14px;
        color:#1677ff;
    }
    .firstLetterDemo::first-letter{
        font-size:2em;
        font-weight:600;
    }
</style>
```

### ::first-line 伪元素
`::first-line` 伪元素用于选择并修改**块级元素的第一行**，从而应用特定的样式。这个伪元素只能选择每个块级元素的第一行，并且仅在有文本内容的时候生效。
<div class='firstLineDemo'>
    这是一个示例，第二行的文字
</div>
<style>
    .firstLineDemo{
        width:7em;
        font-size:14px;
        color:#1677ff9a;
    }
    .firstLineDemo::first-line{
        font-weight:600;
        color:#1677ff;
    }
</style>

```html
<div class='firstLineDemo'>
    这是一个示例，第二行的文字
</div>
<style>
    .firstLineDemo{
        width:7em;
        font-size:14px;
        color:#1677ff9a;
    }
    .firstLineDemo::first-line{
        font-weight:600;
        color:#1677ff;
    }
</style>
```


### ::placeholder 伪元素
`::placeholder` 伪元素用于选择并修改表单字段的占位符文本，从而应用特定的样式。占位符文本是在用户未输入任何内容时显示的默认文本。
<div class='placeholderDemo'>
    <input placeholder='请输入内容'/>
</div>
<style>
    .placeholderDemo input{
        width:200px;
        height:32px;
        outline:none;
        border:1px solid #1677ff;
        border-radius:6px;
        padding-left:1em;
        font-size:14px;
    }
    .placeholderDemo input::placeholder{
        color:#1677ff9a;
        font-size:1.1em;
        font-weight:600;
    }
</style>

```html
<div class='placeholderDemo'>
    <input placeholder='请输入内容'/>
</div>
<style>
    .placeholderDemo input{
        width:200px;
        height:32px;
        outline:none;
        border:1px solid #1677ff;
        border-radius:6px;
        padding-left:1em;
        font-size:14px;
    }
    .placeholderDemo input::placeholder{
        color:#1677ff9a;
        font-size:1.1em;
        font-weight:600;
    }
</style>
```

### ::selection 伪元素
`::selection` 伪元素用于选择并修改用户所选文本的样式。可以应用于包含文本内容的任何元素，如段落、标题、按钮等。
<div class='selectionDemo'>
鼠标滑动选中看看效果
<br>
::selection 伪元素用于选择并修改用户所选文本的样式。可以应用于包含文本内容的任何元素，如段落、标题、按钮等。
</div>
<style>
    .selectionDemo{
        color:#999;
        font-size:13px;
    }
    .selectionDemo::selection{
        color:#1677ff;
        background:#1677ff1a;
    }
</style>

```html
<div class='selectionDemo'>
    鼠标滑动选中看看效果
    <br>
    ::selection 伪元素用于选择并修改用户所选文本的样式。可以应用于包含文本内容的任何元素，如段落、标题、按钮等。
</div>
<style>
    .selectionDemo{
        color:#999;
        font-size:13px;
    }
    .selectionDemo::selection{
        color:#1677ff;
        background:#1677ff1a;
    }
</style>
```

### ::marker 伪元素
`::marker` 伪元素用于为列表项中的标记符设置样式，这些标记符通常包含无序列表的项目符号或有序列表的数字/字母。
<ul class='markerDemo'>
    <li>这是ui的一个li</li>
    <li>这是ui的一个li</li>
</ul>
<style>
    .markerDemo li::marker{
        color:#1677ff;
    }
</style>

```html
<ul class='markerDemo'>
    <li>这是ui的一个li</li>
    <li>这是ui的一个li</li>
</ul>
<style>
    .markerDemo li::marker{
        color:#1677ff;
    }
</style>
```

### 其他伪元素
除了上述伪元素之外，CSS 还提供了以下伪元素：
- `::file-selector-button`：用于选择文件的按钮元素的伪元素。它可以用来样式化文件上传控件中的选择按钮。
- `::cue`：用于样式化媒体元素（如音频或视频）中的字幕或注释的伪元素。可以用来设置字幕的样式，比如字体、颜色等。
- `::part()`：用于自定义 Web 组件的内部部件的伪元素。它可以针对组件的具体部分应用样式，并通过组件的 `shadow DOM` 提供的 `Custom Elements API` 进行访问。
- `::slotted()`：用于样式化插槽内容的伪元素。插槽是一种在 Web 组件中用于插入内容的机制，`::slotted()` 可以应用样式到被插入的内容，以实现更精确的样式控制。