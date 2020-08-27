## 起步

#### 什么是Node？

简单地说，Node（或者说 Node.js，两者是等价的） 是 JavaScript 的一种**运行环境**。在此之前，我们知道 JavaScript 都是在浏览器中执行的，用于给网页添加各种动态效果，那么可以说**浏览器也是 JavaScript 的运行环境**。那么这两个运行环境有哪些差异呢？请看下图

![运行环境差异](/Users/xmly/Documents/node/learning-1/public/img/运行环境差异.png)

两个运行环境共同包含了 ECMAScript，也就是剥离了所有运行环境的 JavaScript **语言标准**本身。现在 ECMAScript 的发展速度非常惊人，几乎能够做到每年发展一个版本。

另一方面，浏览器端 JavaScript 还包括了：

* 浏览器对象模型（Browser Object Model，简称 BOM），也就是 `window` 对象
* 文档对象模型（Document Object Model，简称 DOM），也就是 `document` 对象

而 Node.js 则是包括 V8 引擎。V8 是 Chrome 浏览器中的 JavaScript 引擎，经过多年的发展和优化，性能和安全性都已经达到了相当的高度。而 Node.js 则进一步将 V8 引擎加工成可以在任何操作系统中运行 JavaScript 的平台。

#### 运行Node代码

运行 Node 代码通常有两种方式：1）在 REPL 中交互式输入和运行；2）将代码写入 JS 文件，并用 Node 执行。

#### 使用 REPL 快速体验

运行以下命令就可以输出 Node.js 的版本：

```
$ node -v
v12.10.0
```

然后，我们还可以进入 Node REPL（直接输入 `node`），然后输入任何合法的 JavaScript 表达式或语句：

```
$ node
Welcome to Node.js v12.10.0.
Type ".help" for more information.
> 1 + 2
3
> var x = 10;
undefined
> x + 20
30
> console.log('Hello World');
Hello World
undefined
```

有些行的开头是 `>`，代表输入提示符，因此 `>` 后面的都是我们要输入的命令，其他行则是表达式的返回值或标准输出（Standard Output，stdout）。运行的效果如下：

![运行效果](/Users/xmly/Documents/node/learning-1/public/img/repl.gif)

#### 编写Node脚本

REPL 通常用来进行一些代码的试验。在搭建具体应用时，更多的还是创建 Node 文件。我们先创建一个最简单的 Node.js 脚本文件，叫做 timer.js，代码如下：

```
console.log('Hello World!');
```

然后用 Node 解释器执行这个文件：

```
$ node timer.js
Hello World!
```

看上去非常平淡无奇，但是这一行代码却凝聚了 Node.js 团队背后的心血。我们来对比一下，在浏览器和 Node 环境中执行这行代码有什么区别：

- 在浏览器运行 `console.log` 调用了 BOM，实际上执行的是 `window.console.log('Hello World!')`
- Node 首先在所处的操作系统中创建一个新的进程，然后向标准输出打印了指定的字符串， 实际上执行的是 `process.stdout.write('Hello World!\n')`

简而言之，Node 为我们提供了一个无需依赖浏览器、能够直接与操作系统进行交互的 JavaScript 代码运行环境！

### Node 全局对象初探

如果有编写 JavaScript 的经验，那么一定对全局对象不陌生。在浏览器中，有 `document` 和 `window` 等全局对象；而 Node 只包含 ECMAScript 和 V8，不包含 BOM 和 DOM，因此 Node 中不存在 `document` 和 `window`；取而代之，Node 专属的全局对象是 `process`。

#### JavaScript 全局对象的分类

在此之前，先看一下 JavaScript 各个运行环境的全局对象的比较，如下图所示：

![](/Users/xmly/Documents/node/learning-1/public/img/global-objects.png)

可以看到 JavaScript 全局对象可以分为四类：

1. 浏览器专属，例如 `window`、`alert` 等等；
2. Node 专属，例如 `process`、`__dirname`、`__filename` 等等；
3. 浏览器和 Node 共有，但是**实现方式不同**，例如 `console`、`setTimeout`、`setInterval` 等；
4. 浏览器和 Node 共有，并且属于 **ECMAScript 语言定义**的一部分，例如 `Date`、`String`、`Promise` 等；

#### Node 专属全局对象解析

#### `process`

`process` 全局对象可以说是 Node.js 的灵魂，它是管理当前 Node.js 进程状态的对象，提供了与操作系统的简单接口。

首先我们探索一下 `process` 对象的重要属性。打开 Node REPL，然后我们查看一下 `process` 对象的一些属性：

- `pid`：进程编号
- `env`：系统环境变量
- `argv`：命令行执行此脚本时的输入参数
- `platform`：当前操作系统的平台

#### `Buffer`

`Buffer` 全局对象让 JavaScript 也能够轻松地处理二进制数据流，结合 Node 的流接口（Stream），能够实现高效的二进制文件处理。

#### `__filename` 和 `__dirname`

分别代表当前所运行 Node 脚本的文件路径和所在目录路径。

#### 使用 Node 全局对象

接下来我们将在刚才写的脚本文件中使用 Node 全局对象，分别涵盖上面的三类：

- Node 专属：`process`
- 实现方式不同的共有全局对象：`console` 和 `setTimeout`
- ECMAScript 语言定义的全局对象：`Date`

代码如下：

```
setTimeout(() => {
  console.log('Hello World!');
}, 3000);
  
console.log('当前进程 ID', process.pid);
console.log('当前脚本路径', __filename);
  
const time = new Date();
console.log('当前时间', time.toLocaleString());
```

运行以上脚本，在机器上的输出如下（Hello World! 会延迟三秒输出）：

```
$ node timer.js
当前进程 ID 7310
当前脚本路径 /Users/xmly/Documents/node/学习之路1/timer.js
当前时间 7/3/2020, 9:49:28 AM
Hello World!
```

从上面的代码中也可以一瞥 Node.js 异步的魅力：在 `setTimeout` 等待的 3 秒内，程序并**没有阻塞**，而是**继续向下执行**，这就是 Node.js 的异步非阻塞！

### 理解 Node 模块机制

“分而治之” 的思想在计算机的世界非常普遍，但是在 ES2015 标准出现以前， JavaScript 语言定义本身并没有模块化的机制，构建复杂应用也没有统一的接口标准。人们通常使用一系列的 `<script>` 标签来导入相应的模块（依赖）：

```
<head>
  <script src="fileA.js"></script>
  <script src="fileB.js"></script>
</head>
```

这种组织 JS 代码的方式有很多问题，其中最显著的包括：

- 导入的多个 JS 文件直接作用于全局命名空间，很容易产生**命名冲突**
- 导入的 JS 文件之间不能相互访问，例如 fileB.js 中无法访问 fileA.js 中的内容，很不方便
- 导入的 `<script>` 无法被轻易去除或修改

人们渐渐认识到了 JavaScript 模块化机制的缺失带来的问题，于是两大模块化规范被提出：

1. AMD（Asynchronous Module Definition）规范，在浏览器中使用较为普遍，最经典的实现包括 RequireJS；
2. CommonJS 规范，致力于为 JavaScript 生态圈提供统一的接口 API，Node.js 所实现的正是这一模块标准。

#### 什么是 Node 模块

在正式分析 Node 模块机制之前，我们需要明确定义什么是 Node 模块。通常来说，Node 模块可分为两大类：

- **核心模块**：Node 提供的内置模块，在安装 Node 时已经被编译成**二进制可执行文件**；
- **文件模块**：用户编写的模块，可以是自己写的，也可以是通过 npm 安装的。

其中，文件模块可以是一个**单独的文件**（以 `.js`、`.node` 或 `.json` 结尾），或者是一个**目录**。当这个模块是一个目录时，**模块名就是目录名**，有两种情况：

1. 目录中有一个 package.json 文件，则这个 Node 模块的入口就是其中 `main` 字段指向的文件；
2. 目录中有一个名为 index 的文件，扩展名为 `.js`、`.node` 或 `.json`，此文件则为模块入口文件。

#### Node 模块机制浅析

知道了 Node 模块的具体定义后，来了解一下 Node 具体是怎样实现模块机制的。具体而言，Node 引入了三个新的全局对象（Node 专属）：1）`require`；2） `exports` 和 3）`module`。

**`require`**

`require` 用于导入其他 Node 模块，其参数接受一个字符串代表模块的名称或路径，通常被称为**模块标识符**。具体有以下三种形式：

- 直接写模块名称，通常是核心模块或第三方文件模块，例如 `os`、`express` 等
- 模块的相对路径，指向项目中其他 Node 模块，例如 `./utils`
- 模块的绝对路径（**不推荐！**），例如 `/home/xxx/MyProject/utils`

代码示例如下：

```
// 导入内置库或第三方模块
const os = require('os');
const express = require('express');

// 通过相对路径导入其他模块
const utils = require('./utils');

// 通过绝对路径导入其他模块
const utils = require('/home/xxx/MyProject/utils');
```

**`exports`**

我们已经学会了用 `require` 导入其他模块中的内容，那么怎么写一个 Node 模块，并导出其中内容呢？答案就是用 `exports` 对象。

例如我们写一个 Node 模块 myModule.js：

```
// myModule.js
function add(a, b) {
  return a + b;
}

// 导出函数 add
exports.add = add;
```

通过将 `add` 函数添加到 `exports` 对象中，外面的模块就可以通过以下代码使用这个函数。在 myModule.js 旁边创建一个 main.js，代码如下：

```
// main.js
const myModule = require('./myModule');

// 调用 myModule.js 中的 add 函数
myModule.add(1, 2);
```

**`module`**

通过 `require` 和 `exports`，我们已经知道了如何导入、导出 Node 模块中的内容，但是你可能还是觉得 Node 模块机制有一丝丝神秘的感觉。接下来，我们将掀开这神秘的面纱，了解一下背后的主角 ——`module` 模块对象。

我们可以在刚才的 myModule.js 文件的最后加上这一行代码：

```
console.log('module myModule:', module);
```

在 main.js 最后加上：

```
console.log('module main:', module);
```

运行后会打印出来这样的内容（左边是 myModule，右边是 module）：

![](/Users/xmly/Documents/node/learning-1/public/img/module.jpg)

可以看到 `module` 对象有以下字段：

- `id`：模块的唯一标识符，如果是被运行的主程序（例如 main.js）则为 `.`，如果是被导入的模块（例如 myModule.js）则等同于此文件名（即下面的 `filename` 字段）
- `path` 和 `filename`：模块所在路径和文件名
- `exports`：模块所导出的内容，实际上之前的**`exports`** 对象是指向 **`module.exports`** 的引用。例如对于 myModule.js，刚才我们导出了 `add` 函数，因此出现在了这个 `exports` 字段里面；而 main.js 没有导出任何内容，因此 `exports` 字段为空
- `parent` 和 `children`：用于记录模块之间的导入关系，例如 main.js 中 `require` 了 myModule.js，那么 main 就是 myModule 的 `parent`，myModule 就是 main 的 `children`
- `loaded`：模块是否被加载，从上图中可以看出只有 `children` 中列出的模块才会被加载
- `paths`：这个就是 Node **搜索文件模块的路径列表**，Node 会从第一个路径到最后一个路径依次搜索指定的 Node 模块，找到了则导入，找不到就会报错

#### 深入理解`module.exports`

之前我们提到，`exports` 对象本质上是 `module.exports` 的引用。也就是说，下面两行代码是等价的：

```
// 导出 add 函数
exports.add = add;

// 和上面一行代码是一样的
module.exports.add = add;
```

实际上还有第二种导出方式，直接把 `add` 函数赋给 `module.exports` 对象：

```module.exports = add;
module.exports = add;
```

这样写和第一种导出方式有什么区别呢？第一种方式，在 `exports` 对象上添加一个属性名为 `add`，该属性的值为 `add` 函数；第二种方式，直接令 `exports` 对象为 `add` 函数。可能有点绕，但是请一定要理解这两者的重大区别！你也许猜到了，当我们使用 `module.exports` 导出时，就意味着整个模块只能导出一个变量或函数了。

在 `require` 时，两者的区别就很明显了：

```
// 第一种导出方式，需要访问 add 属性获取到 add 函数
const myModule = require('./myModule');
myModule.add(1, 2);

// 第二种导出方式，可以直接使用 add 函数
const add = require('./myModule');
add(1, 2);
```

### 重构 timer 脚本

我们首先创建一个新的 Node 模块 info.js，用于打印系统信息，代码如下：

```
const os = require('os');

function printProgramInfo() {
  console.log('当前用户', os.userInfo().username);
  console.log('当前进程 ID', process.pid);
  console.log('当前脚本路径', __filename);
}

module.exports = printProgramInfo;
```

这里我们导入了 Node 内置模块 `os`，并通过 `os.userInfo()` 查询到了系统用户名，接着通过 `module.exports` 导出了 `printProgramInfo` 函数。

然后创建第二个 Node 模块 dateTime.js，用于返回当前的时间，代码如下：

```
function getCurrentTime() {
  const time = new Date();
  return time.toLocaleString();
}

exports.getCurrentTime = getCurrentTime;
```

上面的模块中，我们选择了通过 `exports` 导出 `getCurrentTime` 函数。

最后，我们在 timer.js 中通过 `require` 导入刚才两个模块，并分别调用模块中的函数 `printProgramInfo` 和 `getCurrentTime`，代码如下：

```
const printProgramInfo = require('./info');
const dateTime = require('./datTime');
  
setTimeout(() => {
  console.log('Hello World!');
}, 3000);

printProgramInfo();
console.log('当前时间', dateTime.getCurrentTime());
```

再运行一下 timer.js，输出内容应该与之前完全一致。

### 命令行开发：接受输入参数

Node.js 作为可以在操作系统中直接运行 JavaScript 代码的平台，为前端开发者开启了无限可能，其中就包括一系列用于实现前端自动化工作流的命令行工具，例如 Grunt、Gulp 还有大名鼎鼎的 Webpack。

从这一步开始，我们将把 timer.js 改造成一个命令行应用。具体地，我们希望 timer.js 可以通过命令行参数指定等待的时间（`time` 选项）和最终输出的信息（`message` 选项）：

```
$ node timer.js --time 5 --message "Hello Tuture"
```

#### 通过 `process.argv` 读取命令行参数

之前在讲全局对象 `process` 时提到一个 `argv` 属性，能够获取命令行参数的数组。创建一个 args.js 文件，代码如下：

```
console.log(process.argv);
```

然后运行以下命令：

```
$ node args.js --time 5 --message "Hello Tuture"
```

输出一个数组：

```
[
  '/Users/mRc/.nvm/versions/node/v12.10.0/bin/node',
  '/Users/mRc/Tutorials/nodejs-quickstart/args.js',
  '--time',
  '5',
  '--message',
  'Hello Tuture'
]
```

可以看到，`process.argv` 数组的第 0 个元素是 `node` 的实际路径，第 1 个元素是 args.js 的路径，后面则是输入的所有参数。

#### 实现命令行应用

根据刚才的分析，我们可以非常简单粗暴地获取 `process.argv` 的第 3 个和第 5 个元素，分别可以得到 `time` 和 `message` 参数。于是修改 timer.js 的代码如下：

```
const printProgramInfo = require('./info');
const datetime = require('./datetime');

const waitTime = Number(process.argv[3]);
const message = process.argv[5];
  
setTimeout(() => {
  console.log(message);
}, waitTime * 1000);

printProgramInfo();
console.log('当前时间', datetime.getCurrentTime());

```

运行 timer.js，加上刚才说的所有参数：

```
$ node timer.js --time 5 --message "Hello Tuture"
```

等待 5 秒钟后，你就看到了 Hello Tuture 的提示文本！

不过很显然，目前这个版本有很大的问题：输入参数的格式是固定的，很不灵活，比如说调换 `time` 和 `message` 的输入顺序就会出错，也不能检查用户是否输入了指定的参数，格式是否正确等等。如果要亲自实现上面所说的功能，那可得花很大的力气，说不定还会有不少 Bug。

### npm：洪荒之力，都赐予你

#### npm 初探

我们首先打开终端（命令行），检查一下 `npm` 命令是否可用：

```
$ npm -v
6.14.4
```

然后在当前目录（也就是刚才编辑的 timer.js 所在的文件夹）运行以下命令，把当前项目初始化为 npm 项目:

```
$ npm init
```

这时候 npm 会提一系列问题，一路回车下去，也可以仔细回答，最终会创建一个 package.json 文件。package.json 文件是一个 npm 项目的核心，记录了这个项目所有的关键信息，内容如下：

```
{
  "name": "learning-1",
  "version": "1.0.0",
  "description": "node学习之路",
  "main": "dateTime.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
}
```

#### 安装 npm 包

接下来我们将讲解 npm 最最最常用的命令 —— `install`。没错，毫不夸张地说，一个 JavaScript 程序员用的最多的 npm 命令就是 `npm install`。

在安装我们需要的 npm 包之前，我们需要去探索一下有哪些包可以为我们所用。通常，我们可以在 npm 官方网站 上进行关键词搜索（记得用英文哦），比如说我们搜 command line：

![](/Users/xmly/Documents/node/learning-1/public/img/search-npm.png)

出来的第一个结果 commander 就很符合我们的需要，点进去就是安装的说明和使用文档。我们还想要一个 “加载中” 的动画效果，提高用户的使用体验，试着搜一下 loading 关键词：

![](/Users/xmly/Documents/node/learning-1/public/img/search-npm2.png)

第二个结果 ora 也符合我们的需要。那我们现在就安装这两个 npm 包：

```
$ npm install commander ora
```

少许等待后，可以看到 package.json 多了一个非常重要的 `dependencies` 字段：

```
 "dependencies": {
   "commander": "^6.0.0",
   "ora": "^5.0.0"
 }
```

这个字段中就记录了我们这个项目的**直接依赖**。与**直接依赖**相对的就是**间接依赖**，例如 commander 和 ora 的依赖，我们通常不用关心。所有的 npm 包（直接依赖和间接依赖）全部都存放在项目的 node_modules 目录中。

整个 package.json 代码如下所示：

```
{
  "name": "learning-1",
  "version": "1.0.0",
  "description": "node学习之路",
  "main": "dateTime.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "commander": "^6.0.0",
    "ora": "^5.0.0"
  }
}
```

#### 关于版本号

在软件开发中，版本号是一个非常重要的概念，不同版本的软件存在或大或小的差异。npm 采用了语义版本号（Semantic Versioning，简称 semver），具体规定如下：

- 版本格式为：主版本号。次版本号。修订号
- 主版本号的改变意味着**不兼容的 API 修改**
- 次版本号的改变意味着做了**向下兼容的功能性新增**
- 修订号的改变意味着做了**向下兼容的问题修正**

因此在 package.json 的 `dependencies` 字段中，可以通过以下方式指定版本：

- **精确版本**：例如 `1.0.0`，一定只会安装版本为 `1.0.0` 的依赖
- **锁定主版本和次版本**：可以写成 `1.0`、`1.0.x` 或 `~1.0.0`，那么可能会安装例如 `1.0.8` 的依赖
- **仅锁定主版本**：可以写成 `1`、`1.x` 或 `^1.0.0`（ `npm install` 默认采用的形式），那么可能会安装例如 `1.1.0` 的依赖
- **最新版本**：可以写成 `*` 或 `x`，那么直接安装最新版本（不推荐）

npm 还创建了一个 package-lock.json，这个文件就是用来**锁定全部直接依赖和间接依赖的精确版本号**，或者说提供了关于 node_modules 目录的精确描述，从而确保在这个项目中开发的所有人都能有完全一致的 npm 依赖。

#### 站在巨人的肩膀上

在大致读了一下 commander 和 ora 的文档之后，就可以开始用起来了，修改 timer.js 代码如下：

```
const program = require('commander');
const ora = require('ora');
const printProgramInfo = require('./info');
const datetime = require('./datetime');

program
  .option('-t, --time <number>', '等待时间 (秒)', 3)
  .option('-m, --message <string>', '要输出的信息', 'Hello World')
  .parse(process.argv);

setTimeout(() => {
  spinner.stop();
  console.log(program.message);
}, program.time * 1000);

printProgramInfo();
console.log('当前时间', datetime.getCurrentTime());
const spinner = ora('正在加载中，请稍后 ...').start();

```

这次，我们再次运行 timer.js：

```
$ node timer.js -m "洪荒之力！" -t 5
```

转起来了！

#### 尝鲜 npm scripts

之前在 package.json 中提到，有个字段叫 `scripts`，这个字段就定义了全部的 npm scripts。我们发现在用 `npm init` 时创建的 package.json 文件默认就添加了一个 `test` 脚本：

```
"test": "echo \"Error: no test specified\" && exit 1"
```

那一串命令就是 test 脚本将要执行的内容，我们可以通过 `npm test` 命令执行该脚本：

```
$ npm test

> timer@1.0.0 test /Users/mRc/Tutorials/nodejs-quickstart
> echo "Error: no test specified" && exit 1

Error: no test specified
npm ERR! Test failed.  See above for more details.
```

在初步体验了 npm scripts 之后，我们有必要了解一下 npm scripts 分为两大类：

* **预定义脚本**：例如 `test`、`start`、`install`、`publish` 等等，直接通过 `npm <scriptName>` 运行，例如 `npm test`，所有预定义的脚本可查看文档
* **自定义脚本**：除了以上自带脚本的其他脚本，需要通过 `npm run <scriptName>` 运行，例如 `npm run custom`

现在就让我们开始为 timer 项目添加两个 npm scripts，分别是 `start` 和 `lint`。第一个是预定义的，用于启动我们的 timer.js；第二个是静态代码检查，用于在开发时检查我们的代码。首先安装 ESLint npm 包：

```
$ npm install eslint --save-dev
$ # 或者
$ npm install eslint -D
```

注意到我们加了一个 `-D` 或 `--save-dev` 选项，代表 `eslint` 是一个**开发依赖**，在实际项目发布或部署时不需要用到。npm 会把所有开发依赖添加到 `devDependencies` 字段中。然后分别添加 `start` 和 `lint` 脚本，代码如下：

```
{
  "name": "learning-1",
  "version": "1.0.0",
  "description": "node学习之路",
  "main": "timer2.js",
  "scripts": {
    "lint": "eslint **/*.js",
    "start": "node timer2.js -m '上手了' -t 3",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "commander": "^6.0.0",
    "ora": "^5.0.0"
  }
}
```

ESLint 的使用需要一个配置文件，创建 .eslintrc.js 文件（注意最前面有一个点），代码如下：

```
module.exports = {
    "env": {
        "es6": true,
        "node": true,
    },
    "extends": "eslint:recommended",
};
```

运行 `npm start`，可以看到成功地运行了我们的 timer.js 脚本；而运行 `npm run lint`，没有输出任何结果（代表静态检查通过）。

npm scripts 看上去平淡无奇，但是却能为项目开发提供非常便利的工作流。例如，之前构建一个项目需要非常复杂的命令，但是如果你实现了一个 `build` npm 脚本，那么当同事拿到这份代码时，只需简单地执行 `npm run build` 就可以开始构建，而无需关心背后的技术细节。

#### 下次再见：监听 exit 事件

我们在前面简单地提了一下回调函数。实际上，回调函数和事件机制共同组成了 Node 的异步世界。具体而言，Node 中的事件都是通过 `events` 核心模块中的 `EventEmitter` 这个类实现的。`EventEmitter` 包括两个最关键的方法：

* `on`：用来监听事件的发生
* `emit`：用来触发新的事件

请看下面这个代码片段：

```
const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();

// 监听 connect 事件，注册回调函数
emitter.on('connect', function (username) {
  console.log(username + '已连接');
});

// 触发 connect 事件，并且加上一个参数（即上面的 username）
emitter.emit('connect', '喜马拉雅');
```

运行上面的代码，就会输出以下内容：

```
喜马拉雅已连接
```

可以说，Node 中很多对象都继承自 `EventEmitter`，包括我们熟悉的 `process` 全局对象。在之前的 timer.js 脚本中，我们监听 `exit` 事件（即 Node 进程结束），并添加一个自定义的回调函数打印 “下次再见” 的信息：

```
const program = require('commander');
const ora = require('ora');
const printProgramInfo = require('./info');
const dateTime = require('./dateTime');

program
  .option('-t, --time <number>', '等待时间 (秒)', 3)
  .option('-m, --message <string>', '要输出的信息', 'Hello World')
  .parse(process.argv);

setTimeout(() => {
  spinner.stop();
  console.log(program.message);
}, program.time * 1000);

process.on('exit', () => {
  console.log('下次再见~');
});
  
printProgramInfo();
console.log('当前时间', dateTime.getCurrentTime());
const spinner = ora('正在加载中，请稍后 ...').start();
```

运行后，会在程序退出后打印 “下次再见～” 的字符串。你可能会问，为啥不能在 `setTimeout` 的回调函数中添加程序退出的逻辑呢？因为除了正常运行结束（也就是等待了指定的时间），我们的程序很有可能会因为其他原因退出（例如抛出异常，或者用 `process.exit` 强制退出），这时候通过监听 `exit` 事件，就可以在确保所有情况下都能执行 `exit` 事件的回调函数。如果你觉得还是不能理解的话，可以看下面这张示意图：

![](/Users/xmly/Documents/node/learning-1/public/img/exit.png)

