## 什么是BFC
BFC（Block Formatting Context）为块级格式化范围。它决定了元素如何对其内容进行定位，以及与其他元素的关系和相互作用。

## 如何形成BFC
1. float的值不能为none
2. overflow的值不能为visible
3. display的值为table-cell，table-caption，inline-block中的任何一个
4. position的值不为relative和static

## BFC的约束规则
1.  内部的Box会在垂直方向上一个接一个的放置
2. 垂直方向的距离有margin决定（属于同一个BFC的两个相邻Box的margin会发生重叠，与方向无关）
3. 每个元素的margin box的左边，与包含块border box的左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此。
4. BFC的区域不会与float的元素区域重叠
5. 计算BFC的高度时，浮动子元素也参与计算
6. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。

## BFC的作用
1. 不和浮动元素重叠
2. 清除元素内部浮动
3. 防止垂直margin重叠