### 概述

ES6模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。而CommonJS和AMD模块，都只能在运行时确定这些东西。比如CommonJS模块就是对象，输入时必须查找对象属性。
```
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
**上面代码的实质是整体加载fs模块（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取方法。这种加载称为“运行时加载”**，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

而ES6模块不是对象，而是通过`export`命令显式指定输出的代码，再通过`import`命令输入。
```
// ES6模块
import { stat, exists, readFile } from 'fs';
```
**上面代码的实质是从fs模块加载3个方法，其他方法不加载。这种加载称为“编译时加载”或静态加载**，即ES6可以在编译时就完成模块加载，效率要比CommonJS模块的加载方式高。

### 好处
- 不再需要UMD模块格式了,将来服务器和浏览器都会支持ES6模块格式.
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者navigator对象的属性。
- 不再需要对象作为命名空间（比如Math对象），未来这些功能可以通过模块提供。

