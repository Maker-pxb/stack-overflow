## shadcn

https://ui.shadcn.com/

## tiny

https://www.tiny.cloud/
https://www.tiny.cloud/solutions/wysiwyg-react-rich-text-editor/

## 服务端渲染的优点

1. 更小的js包
2. 更快的首屏渲染
3. 更好的SEO
4. 请求数据更快
5. 更好的用户体验

## 客户端渲染

1. 事件处理
2. 生命周期
3. 状态维护

### SSG

(默认)
该页面或内容是否为每个请求显示相同的信息?
Static Site Generation 静态网站生成

### ISG

Incremental Static Generation 增量静态网站生成

### SSR

此页面或内容是否需要频繁的信息更新，可能每秒钟更新一次?
Server Side Rendering 服务端渲染

## 构建时和运行时

- 构建时（Build Time）：这是在你的代码被部署到服务器之前的阶段。在这个阶段，Next.js 会执行一些任务，如代码优化、打包、预渲染等。这些任务都是为了提高应用的性能和用户体验。Next.js 提供了两种预渲染形式：静态生成（Static Generation）和服务器端渲染（Server Side Rendering）。静态生成在构建时生成 HTML，而服务器端渲染在每次请求时生成 HTML。

- 运行时（Runtime）：这是你的代码已经被部署并开始服务用户的阶段。在这个阶段，Next.js 会处理用户的请求，执行服务器端的代码，渲染页面，等等。运行时的操作可以在服务器端或者客户端完成，取决于你的代码和配置
