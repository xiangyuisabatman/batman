1. 将代码字符串解析成抽象语法树,即AST(使用@babel/parser的parser方法)
2. 对AST进行处理,在这个阶段可以对ES6代码进行相应转换,即转换成ES5代码(@babel/core的transformFromAstSync方法,可能还需要@babel/traverse来获取依赖文件)
3. 根据处理后的AST再生成代码字符串