# 文本换行
正常情况下，在固定宽度的盒子中的中文会自动换行。但是，当遇到非常长的英文单词或者很长的URL时，文本可能就不会自动换行，从而导致各种布局问题。例如，文本可能会溢出它所在的容器。幸运的是，CSS 为我们提供了一些和文本换行相关的属性；
- `overflow-wrap`
- `word-break`
- `white-space`
- `line-break`
- `hyphens`

## overflow-wrap
`overflow-wrap` 用来说明当一个不能被分开的字符串太长而不能填充其包裹盒时，为防止其溢出，浏览器是否允许这样的单词中断换行。其属性值有以下三种：
```css
.demo{
    overflow-wrap: normal;
    overflow-wrap: anywhere;
    overflow-wrap: break-word;
}
```
### (1)overflow-wrap:normal
属性值为 `normal` 将使浏览器使用系统的默认换行行为。因此，对于英语和其他相关书写系统，换行符将出现在空格和连字符处。

![w100%](./images/CSS_进阶_文本换行/normal.png)

从图中可以看出，段落中有一个很长的单词溢出了容器，这是系统的默认换行行为。

### (2)overflow-wrap:anywhere
使用值 `anywhere` 将在字符串之间的任意点来进行中断，仅当在其行上显示单词会导致溢出时，浏览器才会中断该单词。如果单词放在其行上时仍然溢出，它将在发生溢出的点处中断该单词。

![w100%](./images/CSS_进阶_文本换行/ow.png)

可以看到，使用 `overflow-wrap:anywhere` 将溢出的单词分解成文本块，这样就可以将其放入容器中。这里文本所在的容器宽度是固定的。

该属性会影响其所在元素的 `min-content` 属性大小计算。 当width设置为`min-content`时很容易看出来：
```css
.break-word {
  width: min-content;
  overflow-wrap: break-word;
}

.anywhere {
  width: min-content;
  overflow-wrap: anywhere;
}
```

![w100%](./images/CSS_进阶_文本换行/ow2.png)

![w100%](./images/CSS_进阶_文本换行/ow3.png)

可以看到，带有 `overflow-wrap:break-word` 的元素计算出的 `min-content` 就像单词没有被破坏一样，因此它的宽度变成了最长单词的宽度。 而带有 `overflow-wrap:anywhere` 的元素，由于在任何地方都可能发生中断，因此 `min-content` 最终成为单个字符的宽度。

注意，这种行为只有为文本所在容器的宽度设置为`min-content`时才会发挥作用，如果宽度设置为固定的值，那么`anywhere` 和 `break-word` 的表现是一致的。

另外需要注意，目前有些浏览器不支持该属性：

![w100%](./images/CSS_进阶_文本换行/v.png)

### (3)overflow-wrap:break-word
`break-word` 属性表示如果行内没有多余的地方容纳该单词到结尾，则那些正常的不能被分割的单词会被强制分割换行。

![w100%](./images/CSS_进阶_文本换行/owbw.png)

可以看到，文本在长单词的某个地方自动换行了。如果文本所在容器设置了固定的宽度，就会在长单词溢出的地方换行。

### (4)overflow-wrap浏览器兼容性
`overflow-wrap` 属性就是原来的`word-wrap`。`word-wrap`最初是一个没有前缀的Microsoft扩展。它不是CSS标准的一部分，尽管大多数浏览器都使用`word-wrap`这个名称来实现它。根据CSS3规范草案，浏览器应将`word-wrap`视为`overflow-wrap`属性的遗留名称别名，以确保兼容性。

![w100%](./images/CSS_进阶_文本换行/owv.png)

## 2.word-break
`word-break` 属性用于指定怎样在单词内进行断行。我们可以使用该属性在内容发生溢出的确切位置拆分单词并将其换行到下一行。下面是 `word-break`的属性值：
```css
.text{
    word-break: normal;
    word-break: break-all;
    word-break: keep-all;
    word-break: break-word;
}
```
需要注意，`break-word` 属性值已经被弃用，但是由于遗留原因，浏览器仍然支持它。指定该属性与同时使用`word-break: normal` 和 `overflow-wrap: anywhere`  的效果是一样的。

### (1)word-break:normal

将 `word-break` 属性的值设置为 `normal` 将应用默认的断行规则：

![w100%](./images/CSS_进阶_文本换行/wbn.png)

可以看到，设置为 `normal` 时，和不设置`word-break`时的效果是一样的，这就是浏览器默认的断行行为。

### (2)word-break:break-all
当属性值为 `break-all` 时，对于 `non-CJK` (`CJK` 指中文/日文/韩文) 的文本，可在任意字符间断行。

![w100%](./images/CSS_进阶_文本换行/wbba.png)

可以看到，长单词在溢出的位置将剩余的文本进行了换行。使用 `break-all` 将在英语和其他相关语言系统中发生溢出的确切位置在两个字符之间断开一个单词。 但是，它不会对中文、日文和韩文文本应用相同的行为。因为 CJK 书写系统有自己的应用断点规则。

### (3)word-break:keep-all
如果使用值 `keep-all`，即使内容溢出，浏览器也不会将分词应用于 CJK 文本。 应用 `keep-all` 值的效果与非 CJK 书写系统的正常效果相同。简单来说就是，像英语这种 CJK 文本不会断行，像中文这种 Non-CJK 文本表现同 `normal`.

![w100%](./images/CSS_进阶_文本换行/wbka.png)

![w100%](./images/CSS_进阶_文本换行/wbn.png)

### (4)word-break浏览器兼容性

![w100%](./images/CSS_进阶_文本换行/wbv.png)


## 3.white-space
`white-space` 属性是用来设置如何处理元素中的空白。其属性值如下：
```css
.text{
    white-space: normal;
    white-space: nowrap;
    white-space: pre;
    white-space: pre-wrap;
    white-space: pre-line
}
```
### (1)white-space:nowrap
当我们将`white-space`的值设置为 `nowrap` 时，可以防止文本自动换行：

![w100%](./images/CSS_进阶_文本换行/wsn.png)

![w100%](./images/CSS_进阶_文本换行/wsn1.png)

可以看到，这里文本并没有换行，这时文本会在同一行上继续，直到遇到 `<br>` 标签为止。

### (2)white-space:pre
当我们将`white-space`的值设置为`pre`时，文本之间的空白会被浏览器保留。其行为方式类似 HTML 中的 `<pre>` 标签。
```html
<!-- 这个HTML的格式会导致额外的空白 -->
<p>
  What's worse, ignorance or apathy?
  I don't know and I don't care.
</p>

<p>What's worse, ignorance or apathy?
  I don't know and I don't care.</p>

<pre>What's worse, ignorance or apathy?
I don't know and I don't care.</pre>
```
```css
p {
  white-space: pre;
}

pre {
  /* <pre> 会设置 font-family: monospace, 这里将其重置 */
  font-family: inherit;
}
```

![w100%](./images/CSS_进阶_文本换行/wsp.png)

### (3)white-space浏览器兼容性

![w100%](./images/CSS_进阶_文本换行/wsv.png)

## 4.line-break
`line-break` 属性可以用来处理如何断开带有**标点符号**的中文、日文或韩文文本的行。简而言之，该属性可以用来处理过长的标点符号。
### (1)line-break:anywhere
可以使用 `line-break: anywhere` 来使长标点符号进行换行：

![w100%](./images/CSS_进阶_文本换行/lba1.png)

![w100%](./images/CSS_进阶_文本换行/lba2.png)

![w100%](./images/CSS_进阶_文本换行/lba3.png)

可以看到，`overflow-wrap: break-word` 和 `line-break:anywhere` 能够保持内容被包含在容器内，但是 `word-break: break-all` 在有长标点符号时就会发生溢出。

### (2)line-break浏览器兼容性

![w100%](./images/CSS_进阶_文本换行/lbv.png)

## 5.hyphens
hyphens 属性告知浏览器在换行时**如何使用连字符连接单词**。可以完全阻止使用连字符，也可以控制浏览器什么时候使用，或者让浏览器决定什么时候使用。其断字规则由语言决定，因此需要告诉浏览器使用哪种语言。这是通过在 HTML 中指定`lang`属性来完成的：
```html
<p lang="en">This is just a bit of arbitrary text to show hyphenation in action.</p>
```
### (1)hyphens:auto
当 `hyphens` 设置为 `auto` 时，浏览器可以自由地在适当的断字点自动断词：
```css
p {
  -webkit-hyphens: auto; / * 用于 Safari */
  hyphens: auto;
}
```

![w100%](./images/CSS_进阶_文本换行/ha.png)

### (2)hyphens浏览器兼容性

![w100%](./images/CSS_进阶_文本换行/hav.png)

## 6.总结
> 1. 当文本所在容器的宽度固定时，可以使用 `overflow-wrap: break-word;` 和 `overflow-wrap: anywhere;` 来实现文本的自动换行；如果容器宽度为 `min-content`，就只能使用 `overflow-wrap: break-word;` 实现文本换行；`overflow-wrap: break-word;`也可以用于长标点符号的换行。
> 2. `word-break: break-all;` 也可以用于文本换行，但是该属性不能让长标点符号换行；
> 3. `white-space: nowrap;` 可以用于防止文本自动换行；
> 4. `line-break: anywhere` 可以用于将长标点符号进行换行；
> 5. `hyphens: auto;` 可以用于使用连字符连接单词。


