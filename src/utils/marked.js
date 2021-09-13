import 'highlight.js/styles/atom-one-dark.css';
// import 'highlight.js/styles/googlecode.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import marked from 'marked';

hljs.registerLanguage('javascript', javascript);

const mdRenderer = new marked.Renderer();
// 标题序号
let headerCount = 0;
mdRenderer.heading = (text, level) => {
  let renderedHTML = '';
  if (level === 3) {
    renderedHTML = `<h${level} id="section${headerCount}" class="section">${text}</h${level}>`;
    headerCount += 1;
  } else {
    renderedHTML = `<h${level} class="header_${level}">${text}</h${level}>`;
    // 遇到文章标题时重置小标题计数
    headerCount = 0;
  }
  return renderedHTML;
};
marked.setOptions({
  // renderer: new marked.Renderer(),
  renderer: mdRenderer,
  // github样式markdown
  gfm: true,
  // github表格
  tables: true,
  // github换行符
  breaks: false,
  // 只解析符合markdown.pl定义的，不修正markdown的错误
  pedantic: false,
  // 原始输出, 忽略HTML标签
  sanitize: false,
  // 优化列表输出
  smartLists: true,
  smartypants: false,
  // highlight.js
  // (code, options = {})
  highlight: (code) => {
    const lang = 'javascript';
    return hljs.highlight(code, {
      language: lang,
    }).value;
  },
});

export default marked;
