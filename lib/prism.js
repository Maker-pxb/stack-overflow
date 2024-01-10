/* eslint-disable no-unmodified-loop-condition */
/* PrismJS 1.29.0
https://prismjs.com/download.html#themes=prism-twilight&languages=markup+css+clike+javascript+c+csharp+cpp+dns-zone-file+docker+go+graphql+http+hpkp+hsts+java+javadoc+javadoclike+jsdoc+json+jsonp+js-templates+less+log+markup-templating+mongodb+nginx+php+php-extras+python+jsx+tsx+regex+ruby+rust+sass+scss+stylus+typescript+vim+wasm+xml-doc+yaml&plugins=line-highlight+autolinker+toolbar+copy-to-clipboard */
const _self =
  typeof window !== 'undefined'
    ? window
    : typeof WorkerGlobalScope !== 'undefined' &&
        self instanceof WorkerGlobalScope
      ? self
      : {}
const Prism = (function (e) {
  const n = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i
  let t = 0
  const r = {}
  var a = {
    manual: e.Prism && e.Prism.manual,
    disableWorkerMessageHandler: e.Prism && e.Prism.disableWorkerMessageHandler,
    util: {
      encode: function e(n) {
        return n instanceof i
          ? new i(n.type, e(n.content), n.alias)
          : Array.isArray(n)
            ? n.map(e)
            : n
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00a0/g, ' ')
      },
      type: function (e) {
        return Object.prototype.toString.call(e).slice(8, -1)
      },
      objId: function (e) {
        return (
          e.__id || Object.defineProperty(e, '__id', { value: ++t }), e.__id
        )
      },
      clone: function e(n, t) {
        let r, i
        switch (((t = t || {}), a.util.type(n))) {
          case 'Object':
            if (((i = a.util.objId(n)), t[i])) return t[i]
            for (const l in ((r = {}), (t[i] = r), n))
              n.hasOwnProperty(l) && (r[l] = e(n[l], t))
            return r
          case 'Array':
            return (
              (i = a.util.objId(n)),
              t[i]
                ? t[i]
                : ((r = []),
                  (t[i] = r),
                  n.forEach(function (n, a) {
                    r[a] = e(n, t)
                  }),
                  r)
            )
          default:
            return n
        }
      },
      getLanguage: function (e) {
        for (; e; ) {
          const t = n.exec(e.className)
          if (t) return t[1].toLowerCase()
          e = e.parentElement
        }
        return 'none'
      },
      setLanguage: function (e, t) {
        ;(e.className = e.className.replace(RegExp(n, 'gi'), '')),
          e.classList.add('language-' + t)
      },
      currentScript: function () {
        if (typeof document === 'undefined') return null
        if ('currentScript' in document) return document.currentScript
        try {
          throw new Error()
        } catch (r) {
          const e = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack) ||
            [])[1]
          if (e) {
            const n = document.getElementsByTagName('script')
            for (const t in n) if (n[t].src == e) return n[t]
          }
          return null
        }
      },
      isActive: function (e, n, t) {
        for (let r = 'no-' + n; e; ) {
          const a = e.classList
          if (a.contains(n)) return !0
          if (a.contains(r)) return !1
          e = e.parentElement
        }
        return !!t
      }
    },
    languages: {
      plain: r,
      plaintext: r,
      text: r,
      txt: r,
      extend: function (e, n) {
        const t = a.util.clone(a.languages[e])
        for (const r in n) t[r] = n[r]
        return t
      },
      insertBefore: function (e, n, t, r) {
        const i = (r = r || a.languages)[e]
        const l = {}
        for (const o in i)
          if (i.hasOwnProperty(o)) {
            if (o == n) for (const s in t) t.hasOwnProperty(s) && (l[s] = t[s])
            t.hasOwnProperty(o) || (l[o] = i[o])
          }
        const u = r[e]
        return (
          (r[e] = l),
          a.languages.DFS(a.languages, function (n, t) {
            t === u && n != e && (this[n] = l)
          }),
          l
        )
      },
      DFS: function e(n, t, r, i) {
        i = i || {}
        const l = a.util.objId
        for (const o in n)
          if (n.hasOwnProperty(o)) {
            t.call(n, o, n[o], r || o)
            const s = n[o]
            const u = a.util.type(s)
            u !== 'Object' || i[l(s)]
              ? u !== 'Array' || i[l(s)] || ((i[l(s)] = !0), e(s, t, o, i))
              : ((i[l(s)] = !0), e(s, t, null, i))
          }
      }
    },
    plugins: {},
    highlightAll: function (e, n) {
      a.highlightAllUnder(document, e, n)
    },
    highlightAllUnder: function (e, n, t) {
      const r = {
        callback: t,
        container: e,
        selector:
          'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      }
      a.hooks.run('before-highlightall', r),
        (r.elements = Array.prototype.slice.apply(
          r.container.querySelectorAll(r.selector)
        )),
        a.hooks.run('before-all-elements-highlight', r)
      for (var i, l = 0; (i = r.elements[l++]); )
        a.highlightElement(i, !0 === n, r.callback)
    },
    highlightElement: function (n, t, r) {
      const i = a.util.getLanguage(n)
      const l = a.languages[i]
      a.util.setLanguage(n, i)
      let o = n.parentElement
      o && o.nodeName.toLowerCase() === 'pre' && a.util.setLanguage(o, i)
      const s = { element: n, language: i, grammar: l, code: n.textContent }
      function u(e) {
        ;(s.highlightedCode = e),
          a.hooks.run('before-insert', s),
          (s.element.innerHTML = s.highlightedCode),
          a.hooks.run('after-highlight', s),
          a.hooks.run('complete', s),
          r && r.call(s.element)
      }
      if (
        (a.hooks.run('before-sanity-check', s),
        (o = s.element.parentElement) &&
          o.nodeName.toLowerCase() === 'pre' &&
          !o.hasAttribute('tabindex') &&
          o.setAttribute('tabindex', '0'),
        !s.code)
      )
        return a.hooks.run('complete', s), void (r && r.call(s.element))
      if ((a.hooks.run('before-highlight', s), s.grammar))
        if (t && e.Worker) {
          const c = new Worker(a.filename)
          ;(c.onmessage = function (e) {
            u(e.data)
          }),
            c.postMessage(
              JSON.stringify({
                language: s.language,
                code: s.code,
                immediateClose: !0
              })
            )
        } else u(a.highlight(s.code, s.grammar, s.language))
      else u(a.util.encode(s.code))
    },
    highlight: function (e, n, t) {
      const r = { code: e, grammar: n, language: t }
      if ((a.hooks.run('before-tokenize', r), !r.grammar))
        throw new Error('The language "' + r.language + '" has no grammar.')
      return (
        (r.tokens = a.tokenize(r.code, r.grammar)),
        a.hooks.run('after-tokenize', r),
        i.stringify(a.util.encode(r.tokens), r.language)
      )
    },
    tokenize: function (e, n) {
      const t = n.rest
      if (t) {
        for (const r in t) n[r] = t[r]
        delete n.rest
      }
      const a = new s()
      return (
        u(a, a.head, e),
        o(e, a, n, a.head, 0),
        (function (e) {
          for (var n = [], t = e.head.next; t !== e.tail; )
            n.push(t.value), (t = t.next)
          return n
        })(a)
      )
    },
    hooks: {
      all: {},
      add: function (e, n) {
        const t = a.hooks.all
        ;(t[e] = t[e] || []), t[e].push(n)
      },
      run: function (e, n) {
        const t = a.hooks.all[e]
        if (t && t.length) for (var r, i = 0; (r = t[i++]); ) r(n)
      }
    },
    Token: i
  }
  function i(e, n, t, r) {
    ;(this.type = e),
      (this.content = n),
      (this.alias = t),
      (this.length = 0 | (r || '').length)
  }
  function l(e, n, t, r) {
    e.lastIndex = n
    const a = e.exec(t)
    if (a && r && a[1]) {
      const i = a[1].length
      ;(a.index += i), (a[0] = a[0].slice(i))
    }
    return a
  }
  function o(e, n, t, r, s, g) {
    for (const f in t)
      if (t.hasOwnProperty(f) && t[f]) {
        let h = t[f]
        h = Array.isArray(h) ? h : [h]
        for (let d = 0; d < h.length; ++d) {
          if (g && g.cause == f + ',' + d) return
          const v = h[d]
          const p = v.inside
          const m = !!v.lookbehind
          const y = !!v.greedy
          const k = v.alias
          if (y && !v.pattern.global) {
            const x = v.pattern.toString().match(/[imsuy]*$/)[0]
            v.pattern = RegExp(v.pattern.source, x + 'g')
          }
          for (
            let b = v.pattern || v, w = r.next, A = s;
            w !== n.tail && !(g && A >= g.reach);
            A += w.value.length, w = w.next
          ) {
            let E = w.value
            if (n.length > e.length) return
            if (!(E instanceof i)) {
              var P
              let L = 1
              if (y) {
                if (!(P = l(b, A, e, m)) || P.index >= e.length) break
                var S = P.index
                const O = P.index + P[0].length
                let j = A
                for (j += w.value.length; S >= j; )
                  j += (w = w.next).value.length
                if (((A = j -= w.value.length), w.value instanceof i)) continue
                for (
                  let C = w;
                  C !== n.tail && (j < O || typeof C.value === 'string');
                  C = C.next
                )
                  L++, (j += C.value.length)
                L--, (E = e.slice(A, j)), (P.index -= A)
              } else if (!(P = l(b, 0, E, m))) continue
              S = P.index
              const N = P[0]
              const _ = E.slice(0, S)
              const M = E.slice(S + N.length)
              const W = A + E.length
              g && W > g.reach && (g.reach = W)
              let z = w.prev
              if (
                (_ && ((z = u(n, z, _)), (A += _.length)),
                c(n, z, L),
                (w = u(n, z, new i(f, p ? a.tokenize(N, p) : N, k, N))),
                M && u(n, w, M),
                L > 1)
              ) {
                const I = { cause: f + ',' + d, reach: W }
                o(e, n, t, w.prev, A, I),
                  g && I.reach > g.reach && (g.reach = I.reach)
              }
            }
          }
        }
      }
  }
  function s() {
    const e = { value: null, prev: null, next: null }
    const n = { value: null, prev: e, next: null }
    ;(e.next = n), (this.head = e), (this.tail = n), (this.length = 0)
  }
  function u(e, n, t) {
    const r = n.next
    const a = { value: t, prev: n, next: r }
    return (n.next = a), (r.prev = a), e.length++, a
  }
  function c(e, n, t) {
    for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next
    ;(n.next = r), (r.prev = n), (e.length -= a)
  }
  if (
    ((e.Prism = a),
    (i.stringify = function e(n, t) {
      if (typeof n === 'string') return n
      if (Array.isArray(n)) {
        let r = ''
        return (
          n.forEach(function (n) {
            r += e(n, t)
          }),
          r
        )
      }
      const i = {
        type: n.type,
        content: e(n.content, t),
        tag: 'span',
        classes: ['token', n.type],
        attributes: {},
        language: t
      }
      const l = n.alias
      l &&
        (Array.isArray(l)
          ? Array.prototype.push.apply(i.classes, l)
          : i.classes.push(l)),
        a.hooks.run('wrap', i)
      let o = ''
      for (const s in i.attributes)
        o +=
          ' ' + s + '="' + (i.attributes[s] || '').replace(/"/g, '&quot;') + '"'
      return (
        '<' +
        i.tag +
        ' class="' +
        i.classes.join(' ') +
        '"' +
        o +
        '>' +
        i.content +
        '</' +
        i.tag +
        '>'
      )
    }),
    !e.document)
  )
    return e.addEventListener
      ? (a.disableWorkerMessageHandler ||
          e.addEventListener(
            'message',
            function (n) {
              const t = JSON.parse(n.data)
              const r = t.language
              const i = t.code
              const l = t.immediateClose
              e.postMessage(a.highlight(i, a.languages[r], r)), l && e.close()
            },
            !1
          ),
        a)
      : a
  const g = a.util.currentScript()
  function f() {
    a.manual || a.highlightAll()
  }
  if (
    (g &&
      ((a.filename = g.src), g.hasAttribute('data-manual') && (a.manual = !0)),
    !a.manual)
  ) {
    const h = document.readyState
    h === 'loading' || (h === 'interactive' && g && g.defer)
      ? document.addEventListener('DOMContentLoaded', f)
      : window.requestAnimationFrame
        ? window.requestAnimationFrame(f)
        : window.setTimeout(f, 16)
  }
  return a
})(_self)
typeof module !== 'undefined' && module.exports && (module.exports = Prism),
  typeof global !== 'undefined' && (global.Prism = Prism)
;(Prism.languages.markup = {
  comment: { pattern: /<!--(?:(?!<!--)[\s\S])*?-->/, greedy: !0 },
  prolog: { pattern: /<\?[\s\S]+?\?>/, greedy: !0 },
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      'internal-subset': {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null
      },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      name: /[^\s<>'"]+/
    }
  },
  cdata: { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, greedy: !0 },
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [
            { pattern: /^=/, alias: 'attr-equals' },
            { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }
          ]
        }
      },
      punctuation: /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ }
      }
    }
  },
  entity: [
    { pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
    /&#x?[\da-f]{1,8};/i
  ]
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
    Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside['internal-subset'].inside =
    Prism.languages.markup),
  Prism.hooks.add('wrap', function (a) {
    a.type === 'entity' &&
      (a.attributes.title = a.content.replace(/&amp;/, '&'))
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (a, e) {
      const s = {}
      ;(s['language-' + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e]
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
      const t = {
        'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s }
      }
      t['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
      const n = {}
      ;(n[a] = {
        pattern: RegExp(
          '(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)'.replace(
            /__/g,
            function () {
              return a
            }
          ),
          'i'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: t
      }),
        Prism.languages.insertBefore('markup', 'cdata', n)
    }
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
    value: function (a, e) {
      Prism.languages.markup.tag.inside['special-attr'].push({
        pattern: RegExp(
          '(^|["\'\\s])(?:' +
            a +
            ')\\s*=\\s*(?:"[^"]*"|\'[^\']*\'|[^\\s\'">=]+(?=[\\s>]))',
          'i'
        ),
        lookbehind: !0,
        inside: {
          'attr-name': /^[^\s=]+/,
          'attr-value': {
            pattern: /=[\s\S]+/,
            inside: {
              value: {
                pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                lookbehind: !0,
                alias: [e, 'language-' + e],
                inside: Prism.languages[e]
              },
              punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/]
            }
          }
        }
      })
    }
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml)
!(function (s) {
  const e =
    /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/
  ;(s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: RegExp(
        '@[\\w-](?:[^;{\\s"\']|\\s+(?!\\s)|' + e.source + ')*?(?:;|(?=\\s*\\{))'
      ),
      inside: {
        rule: /^@[\w-]+/,
        'selector-function-argument': {
          pattern:
            /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: !0,
          alias: 'selector'
        },
        keyword: {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: !0
        }
      }
    },
    url: {
      pattern: RegExp(
        '\\burl\\((?:' + e.source + '|(?:[^\\\\\r\n()"\']|\\\\[^])*)\\)',
        'i'
      ),
      greedy: !0,
      inside: {
        function: /^url/i,
        punctuation: /^\(|\)$/,
        string: { pattern: RegExp('^' + e.source + '$'), alias: 'url' }
      }
    },
    selector: {
      pattern: RegExp(
        '(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
          e.source +
          ')*(?=\\s*\\{)'
      ),
      lookbehind: !0
    },
    string: { pattern: e, greedy: !0 },
    property: {
      pattern:
        /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: !0
    },
    important: /!important\b/i,
    function: { pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i, lookbehind: !0 },
    punctuation: /[(){};:,]/
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css)
  const t = s.languages.markup
  t && (t.tag.addInlined('style', 'css'), t.tag.addAttribute('style', 'css'))
})(Prism)
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0, greedy: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  'class-name': {
    pattern:
      /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ }
  },
  keyword:
    /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  boolean: /\b(?:false|true)\b/,
  function: /\b\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
}
;(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
      lookbehind: !0
    }
  ],
  keyword: [
    { pattern: /((?:^|\})\s*)catch\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0
    }
  ],
  function:
    /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  number: {
    pattern: RegExp(
      '(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])'
    ),
    lookbehind: !0
  },
  operator:
    /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
})),
  (Prism.languages.javascript['class-name'][0].pattern =
    /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: RegExp(
        '((?:^|[^$\\w\\xA0-\\uFFFF."\'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))'
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        'regex-source': {
          pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
          lookbehind: !0,
          alias: 'language-regex',
          inside: Prism.languages.regex
        },
        'regex-delimiter': /^\/|\/$/,
        'regex-flags': /^[a-z]+$/
      }
    },
    'function-variable': {
      pattern:
        /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
      alias: 'function'
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      {
        pattern:
          /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      {
        pattern:
          /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    hashbang: { pattern: /^#!.*/, greedy: !0, alias: 'comment' },
    'template-string': {
      pattern:
        /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
        interpolation: {
          pattern:
            /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
          lookbehind: !0,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\$\{|\}$/,
              alias: 'punctuation'
            },
            rest: Prism.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    },
    'string-property': {
      pattern:
        /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
      lookbehind: !0,
      greedy: !0,
      alias: 'property'
    }
  }),
  Prism.languages.insertBefore('javascript', 'operator', {
    'literal-property': {
      pattern:
        /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
      lookbehind: !0,
      alias: 'property'
    }
  }),
  Prism.languages.markup &&
    (Prism.languages.markup.tag.addInlined('script', 'javascript'),
    Prism.languages.markup.tag.addAttribute(
      'on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)',
      'javascript'
    )),
  (Prism.languages.js = Prism.languages.javascript)
;(Prism.languages.c = Prism.languages.extend('clike', {
  comment: {
    pattern:
      /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0
  },
  string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
  'class-name': {
    pattern:
      /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: !0
  },
  keyword:
    /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  function: /\b[a-z_]\w*(?=\s*\()/i,
  number:
    /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
})),
  Prism.languages.insertBefore('c', 'string', {
    char: { pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/, greedy: !0 }
  }),
  Prism.languages.insertBefore('c', 'string', {
    macro: {
      pattern:
        /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
      lookbehind: !0,
      greedy: !0,
      alias: 'property',
      inside: {
        string: [
          { pattern: /^(#\s*include\s*)<[^>]+>/, lookbehind: !0 },
          Prism.languages.c.string
        ],
        char: Prism.languages.c.char,
        comment: Prism.languages.c.comment,
        'macro-name': [
          { pattern: /(^#\s*define\s+)\w+\b(?!\()/i, lookbehind: !0 },
          {
            pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
            lookbehind: !0,
            alias: 'function'
          }
        ],
        directive: {
          pattern: /^(#\s*)[a-z]+/,
          lookbehind: !0,
          alias: 'keyword'
        },
        'directive-hash': /^#/,
        punctuation: /##|\\(?=[\r\n])/,
        expression: { pattern: /\S[\s\S]*/, inside: Prism.languages.c }
      }
    }
  }),
  Prism.languages.insertBefore('c', 'function', {
    constant:
      /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
  }),
  delete Prism.languages.c.boolean
!(function (e) {
  function n(e, n) {
    return e.replace(/<<(\d+)>>/g, function (e, s) {
      return '(?:' + n[+s] + ')'
    })
  }
  function s(e, s, a) {
    return RegExp(n(e, s), a || '')
  }
  function a(e, n) {
    for (let s = 0; s < n; s++)
      e = e.replace(/<<self>>/g, function () {
        return '(?:' + e + ')'
      })
    return e.replace(/<<self>>/g, '[^\\s\\S]')
  }
  const t =
    'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void'
  const r = 'class enum interface record struct'
  const i =
    'add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)'
  const o =
    'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield'
  function l(e) {
    return '\\b(?:' + e.trim().replace(/ /g, '|') + ')\\b'
  }
  const d = l(r)
  const p = RegExp(l(t + ' ' + r + ' ' + i + ' ' + o))
  const c = l(r + ' ' + i + ' ' + o)
  const u = l(t + ' ' + r + ' ' + o)
  const g = a('<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>', 2)
  const b = a('\\((?:[^()]|<<self>>)*\\)', 2)
  const h = '@?\\b[A-Za-z_]\\w*\\b'
  const f = n('<<0>>(?:\\s*<<1>>)?', [h, g])
  const m = n('(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*', [c, f])
  const k = '\\[\\s*(?:,\\s*)*\\]'
  const y = n('<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?', [m, k])
  const w = n('[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>', [g, b, k])
  const v = n('\\(<<0>>+(?:,<<0>>+)+\\)', [w])
  const x = n('(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?', [
    v,
    m,
    k
  ])
  const $ = { keyword: p, punctuation: /[<>()?,.:[\]]/ }
  const _ = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'"
  const B = '"(?:\\\\.|[^\\\\"\r\n])*"'
  ;(e.languages.csharp = e.languages.extend('clike', {
    string: [
      {
        pattern: s('(^|[^$\\\\])<<0>>', ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
        lookbehind: !0,
        greedy: !0
      },
      { pattern: s('(^|[^@$\\\\])<<0>>', [B]), lookbehind: !0, greedy: !0 }
    ],
    'class-name': [
      {
        pattern: s('(\\busing\\s+static\\s+)<<0>>(?=\\s*;)', [m]),
        lookbehind: !0,
        inside: $
      },
      {
        pattern: s('(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)', [h, x]),
        lookbehind: !0,
        inside: $
      },
      { pattern: s('(\\busing\\s+)<<0>>(?=\\s*=)', [h]), lookbehind: !0 },
      { pattern: s('(\\b<<0>>\\s+)<<1>>', [d, f]), lookbehind: !0, inside: $ },
      {
        pattern: s('(\\bcatch\\s*\\(\\s*)<<0>>', [m]),
        lookbehind: !0,
        inside: $
      },
      { pattern: s('(\\bwhere\\s+)<<0>>', [h]), lookbehind: !0 },
      {
        pattern: s('(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>', [y]),
        lookbehind: !0,
        inside: $
      },
      {
        pattern: s(
          '\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))',
          [x, u, h]
        ),
        inside: $
      }
    ],
    keyword: p,
    number:
      /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
    operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    punctuation: /\?\.?|::|[{}[\];(),.:]/
  })),
    e.languages.insertBefore('csharp', 'number', {
      range: { pattern: /\.\./, alias: 'operator' }
    }),
    e.languages.insertBefore('csharp', 'punctuation', {
      'named-parameter': {
        pattern: s('([(,]\\s*)<<0>>(?=\\s*:)', [h]),
        lookbehind: !0,
        alias: 'punctuation'
      }
    }),
    e.languages.insertBefore('csharp', 'class-name', {
      namespace: {
        pattern: s(
          '(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])',
          [h]
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ }
      },
      'type-expression': {
        pattern: s(
          '(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))',
          [b]
        ),
        lookbehind: !0,
        alias: 'class-name',
        inside: $
      },
      'return-type': {
        pattern: s(
          '<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))',
          [x, m]
        ),
        inside: $,
        alias: 'class-name'
      },
      'constructor-invocation': {
        pattern: s('(\\bnew\\s+)<<0>>(?=\\s*[[({])', [x]),
        lookbehind: !0,
        inside: $,
        alias: 'class-name'
      },
      'generic-method': {
        pattern: s('<<0>>\\s*<<1>>(?=\\s*\\()', [h, g]),
        inside: {
          function: s('^<<0>>', [h]),
          generic: { pattern: RegExp(g), alias: 'class-name', inside: $ }
        }
      },
      'type-list': {
        pattern: s(
          '\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))',
          [d, f, h, x, p.source, b, '\\bnew\\s*\\(\\s*\\)']
        ),
        lookbehind: !0,
        inside: {
          'record-arguments': {
            pattern: s('(^(?!new\\s*\\()<<0>>\\s*)<<1>>', [f, b]),
            lookbehind: !0,
            greedy: !0,
            inside: e.languages.csharp
          },
          keyword: p,
          'class-name': { pattern: RegExp(x), greedy: !0, inside: $ },
          punctuation: /[,()]/
        }
      },
      preprocessor: {
        pattern: /(^[\t ]*)#.*/m,
        lookbehind: !0,
        alias: 'property',
        inside: {
          directive: {
            pattern:
              /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
            lookbehind: !0,
            alias: 'keyword'
          }
        }
      }
    })
  const E = B + '|' + _
  const R = n('/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>', [
    E
  ])
  const z = a(n('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [R]), 2)
  const S =
    '\\b(?:assembly|event|field|method|module|param|property|return|type)\\b'
  const j = n('<<0>>(?:\\s*\\(<<1>>*\\))?', [m, z])
  e.languages.insertBefore('csharp', 'class-name', {
    attribute: {
      pattern: s(
        '((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])',
        [S, j]
      ),
      lookbehind: !0,
      greedy: !0,
      inside: {
        target: { pattern: s('^<<0>>(?=\\s*:)', [S]), alias: 'keyword' },
        'attribute-arguments': {
          pattern: s('\\(<<0>>*\\)', [z]),
          inside: e.languages.csharp
        },
        'class-name': { pattern: RegExp(m), inside: { punctuation: /\./ } },
        punctuation: /[:,]/
      }
    }
  })
  const A = ':[^}\r\n]+'
  const F = a(n('[^"\'/()]|<<0>>|\\(<<self>>*\\)', [R]), 2)
  const P = n('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [F, A])
  const U = a(
    n('[^"\'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)', [
      E
    ]),
    2
  )
  const Z = n('\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}', [U, A])
  function q(n, a) {
    return {
      interpolation: {
        pattern: s('((?:^|[^{])(?:\\{\\{)*)<<0>>', [n]),
        lookbehind: !0,
        inside: {
          'format-string': {
            pattern: s('(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)', [a, A]),
            lookbehind: !0,
            inside: { punctuation: /^:/ }
          },
          punctuation: /^\{|\}$/,
          expression: {
            pattern: /[\s\S]+/,
            alias: 'language-csharp',
            inside: e.languages.csharp
          }
        }
      },
      string: /[\s\S]+/
    }
  }
  e.languages.insertBefore('csharp', 'string', {
    'interpolation-string': [
      {
        pattern: s(
          '(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"',
          [P]
        ),
        lookbehind: !0,
        greedy: !0,
        inside: q(P, F)
      },
      {
        pattern: s('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [Z]),
        lookbehind: !0,
        greedy: !0,
        inside: q(Z, U)
      }
    ],
    char: { pattern: RegExp(_), greedy: !0 }
  }),
    (e.languages.dotnet = e.languages.cs = e.languages.csharp)
})(Prism)
!(function (e) {
  const t =
    /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/
  const n = '\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b'.replace(
    /<keyword>/g,
    function () {
      return t.source
    }
  )
  ;(e.languages.cpp = e.languages.extend('c', {
    'class-name': [
      {
        pattern: RegExp(
          '(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+'.replace(
            /<keyword>/g,
            function () {
              return t.source
            }
          )
        ),
        lookbehind: !0
      },
      /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
      /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
      /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/
    ],
    keyword: t,
    number: {
      pattern:
        /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: !0
    },
    operator:
      />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:false|true)\b/
  })),
    e.languages.insertBefore('cpp', 'string', {
      module: {
        pattern: RegExp(
          '(\\b(?:import|module)\\s+)(?:"(?:\\\\(?:\r\n|[^])|[^"\\\\\r\n])*"|<[^<>\r\n]*>|' +
            '<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>'.replace(
              /<mod-name>/g,
              function () {
                return n
              }
            ) +
            ')'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: { string: /^[<"][\s\S]+/, operator: /:/, punctuation: /\./ }
      },
      'raw-string': {
        pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
        alias: 'string',
        greedy: !0
      }
    }),
    e.languages.insertBefore('cpp', 'keyword', {
      'generic-function': {
        pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
        inside: {
          function: /^\w+/,
          generic: {
            pattern: /<[\s\S]+/,
            alias: 'class-name',
            inside: e.languages.cpp
          }
        }
      }
    }),
    e.languages.insertBefore('cpp', 'operator', {
      'double-colon': { pattern: /::/, alias: 'punctuation' }
    }),
    e.languages.insertBefore('cpp', 'class-name', {
      'base-clause': {
        pattern:
          /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
        lookbehind: !0,
        greedy: !0,
        inside: e.languages.extend('cpp', {})
      }
    }),
    e.languages.insertBefore(
      'inside',
      'double-colon',
      { 'class-name': /\b[a-z_]\w*\b(?!\s*::)/i },
      e.languages.cpp['base-clause']
    )
})(Prism)
;(Prism.languages['dns-zone-file'] = {
  comment: /;.*/,
  string: { pattern: /"(?:\\.|[^"\\\r\n])*"/, greedy: !0 },
  variable: [
    { pattern: /(^\$ORIGIN[ \t]+)\S+/m, lookbehind: !0 },
    { pattern: /(^|\s)@(?=\s|$)/, lookbehind: !0 }
  ],
  keyword: /^\$(?:INCLUDE|ORIGIN|TTL)(?=\s|$)/m,
  class: {
    pattern: /(^|\s)(?:CH|CS|HS|IN)(?=\s|$)/,
    lookbehind: !0,
    alias: 'keyword'
  },
  type: {
    pattern:
      /(^|\s)(?:A|A6|AAAA|AFSDB|APL|ATMA|CAA|CDNSKEY|CDS|CERT|CNAME|DHCID|DLV|DNAME|DNSKEY|DS|EID|GID|GPOS|HINFO|HIP|IPSECKEY|ISDN|KEY|KX|LOC|MAILA|MAILB|MB|MD|MF|MG|MINFO|MR|MX|NAPTR|NB|NBSTAT|NIMLOC|NINFO|NS|NSAP|NSAP-PTR|NSEC|NSEC3|NSEC3PARAM|NULL|NXT|OPENPGPKEY|PTR|PX|RKEY|RP|RRSIG|RT|SIG|SINK|SMIMEA|SOA|SPF|SRV|SSHFP|TA|TKEY|TLSA|TSIG|TXT|UID|UINFO|UNSPEC|URI|WKS|X25)(?=\s|$)/,
    lookbehind: !0,
    alias: 'keyword'
  },
  punctuation: /[()]/
}),
  (Prism.languages['dns-zone'] = Prism.languages['dns-zone-file'])
!(function (e) {
  const n = '(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)'.replace(
    /<SP_BS>/g,
    function () {
      return '\\\\[\r\n](?:\\s|\\\\[\r\n]|#.*(?!.))*(?![\\s#]|\\\\[\r\n])'
    }
  )
  const r =
    '"(?:[^"\\\\\r\n]|\\\\(?:\r\n|[^]))*"|\'(?:[^\'\\\\\r\n]|\\\\(?:\r\n|[^]))*\''
  const t = '--[\\w-]+=(?:<STR>|(?!["\'])(?:[^\\s\\\\]|\\\\.)+)'.replace(
    /<STR>/g,
    function () {
      return r
    }
  )
  const o = { pattern: RegExp(r), greedy: !0 }
  const i = { pattern: /(^[ \t]*)#.*/m, lookbehind: !0, greedy: !0 }
  function a(e, r) {
    return (
      (e = e
        .replace(/<OPT>/g, function () {
          return t
        })
        .replace(/<SP>/g, function () {
          return n
        })),
      RegExp(e, r)
    )
  }
  ;(e.languages.docker = {
    instruction: {
      pattern:
        /(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,
      lookbehind: !0,
      greedy: !0,
      inside: {
        options: {
          pattern: a('(^(?:ONBUILD<SP>)?\\w+<SP>)<OPT>(?:<SP><OPT>)*', 'i'),
          lookbehind: !0,
          greedy: !0,
          inside: {
            property: { pattern: /(^|\s)--[\w-]+/, lookbehind: !0 },
            string: [
              o,
              { pattern: /(=)(?!["'])(?:[^\s\\]|\\.)+/, lookbehind: !0 }
            ],
            operator: /\\$/m,
            punctuation: /=/
          }
        },
        keyword: [
          {
            pattern: a(
              '(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\\b',
              'i'
            ),
            lookbehind: !0,
            greedy: !0
          },
          {
            pattern: a(
              '(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\\\]+<SP>)AS',
              'i'
            ),
            lookbehind: !0,
            greedy: !0
          },
          { pattern: a('(^ONBUILD<SP>)\\w+', 'i'), lookbehind: !0, greedy: !0 },
          { pattern: /^\w+/, greedy: !0 }
        ],
        comment: i,
        string: o,
        variable: /\$(?:\w+|\{[^{}"'\\]*\})/,
        operator: /\\$/m
      }
    },
    comment: i
  }),
    (e.languages.dockerfile = e.languages.docker)
})(Prism)
;(Prism.languages.go = Prism.languages.extend('clike', {
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
    lookbehind: !0,
    greedy: !0
  },
  keyword:
    /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  boolean: /\b(?:_|false|iota|nil|true)\b/,
  number: [
    /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
    /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
    /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i
  ],
  operator:
    /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  builtin:
    /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
})),
  Prism.languages.insertBefore('go', 'string', {
    char: { pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/, greedy: !0 }
  }),
  delete Prism.languages.go['class-name']
;(Prism.languages.graphql = {
  comment: /#.*/,
  description: {
    pattern: /(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,
    greedy: !0,
    alias: 'string',
    inside: {
      'language-markdown': {
        pattern: /(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,
        lookbehind: !0,
        inside: Prism.languages.markdown
      }
    }
  },
  string: {
    pattern: /"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,
    greedy: !0
  },
  number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  boolean: /\b(?:false|true)\b/,
  variable: /\$[a-z_]\w*/i,
  directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
  'attr-name': {
    pattern: /\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: !0
  },
  'atom-input': { pattern: /\b[A-Z]\w*Input\b/, alias: 'class-name' },
  scalar: /\b(?:Boolean|Float|ID|Int|String)\b/,
  constant: /\b[A-Z][A-Z_\d]*\b/,
  'class-name': {
    pattern:
      /(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,
    lookbehind: !0
  },
  fragment: {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: 'function'
  },
  'definition-mutation': {
    pattern: /(\bmutation\s+)[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: 'function'
  },
  'definition-query': {
    pattern: /(\bquery\s+)[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: 'function'
  },
  keyword:
    /\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,
  operator: /[!=|&]|\.{3}/,
  'property-query': /\w+(?=\s*\()/,
  object: /\w+(?=\s*\{)/,
  punctuation: /[!(){}\[\]:=,]/,
  property: /\w+/
}),
  Prism.hooks.add('after-tokenize', function (n) {
    if (n.language === 'graphql')
      for (
        var t = n.tokens.filter(function (n) {
            return (
              typeof n !== 'string' &&
              n.type !== 'comment' &&
              n.type !== 'scalar'
            )
          }),
          e = 0;
        e < t.length;

      ) {
        const a = t[e++]
        if (a.type === 'keyword' && a.content === 'mutation') {
          const r = []
          if (
            c(['definition-mutation', 'punctuation']) &&
            l(1).content === '('
          ) {
            e += 2
            const i = f(/^\($/, /^\)$/)
            if (i === -1) continue
            for (; e < i; e++) {
              const o = l(0)
              o.type === 'variable' &&
                (b(o, 'variable-input'), r.push(o.content))
            }
            e = i + 1
          }
          if (
            c(['punctuation', 'property-query']) &&
            l(0).content === '{' &&
            (e++, b(l(0), 'property-mutation'), r.length > 0)
          ) {
            const s = f(/^\{$/, /^\}$/)
            if (s === -1) continue
            for (let u = e; u < s; u++) {
              const p = t[u]
              p.type === 'variable' &&
                r.indexOf(p.content) >= 0 &&
                b(p, 'variable-input')
            }
          }
        }
      }
    function l(n) {
      return t[e + n]
    }
    function c(n, t) {
      t = t || 0
      for (let e = 0; e < n.length; e++) {
        const a = l(e + t)
        if (!a || a.type !== n[e]) return !1
      }
      return !0
    }
    function f(n, a) {
      for (let r = 1, i = e; i < t.length; i++) {
        const o = t[i]
        const s = o.content
        if (o.type === 'punctuation' && typeof s === 'string')
          if (n.test(s)) r++
          else if (a.test(s) && --r == 0) return i
      }
      return -1
    }
    function b(n, t) {
      let e = n.alias
      e ? Array.isArray(e) || (n.alias = e = [e]) : (n.alias = e = []),
        e.push(t)
    }
  })
!(function (t) {
  function a(t) {
    return RegExp('(^(?:' + t + '):[ \t]*(?![ \t]))[^]+', 'i')
  }
  t.languages.http = {
    'request-line': {
      pattern:
        /^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,
      inside: {
        method: { pattern: /^[A-Z]+\b/, alias: 'property' },
        'request-target': {
          pattern: /^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,
          lookbehind: !0,
          alias: 'url',
          inside: t.languages.uri
        },
        'http-version': {
          pattern: /^(\s)HTTP\/[\d.]+/,
          lookbehind: !0,
          alias: 'property'
        }
      }
    },
    'response-status': {
      pattern: /^HTTP\/[\d.]+ \d+ .+/m,
      inside: {
        'http-version': { pattern: /^HTTP\/[\d.]+/, alias: 'property' },
        'status-code': {
          pattern: /^(\s)\d+(?=\s)/,
          lookbehind: !0,
          alias: 'number'
        },
        'reason-phrase': { pattern: /^(\s).+/, lookbehind: !0, alias: 'string' }
      }
    },
    header: {
      pattern: /^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,
      inside: {
        'header-value': [
          {
            pattern: a('Content-Security-Policy'),
            lookbehind: !0,
            alias: ['csp', 'languages-csp'],
            inside: t.languages.csp
          },
          {
            pattern: a('Public-Key-Pins(?:-Report-Only)?'),
            lookbehind: !0,
            alias: ['hpkp', 'languages-hpkp'],
            inside: t.languages.hpkp
          },
          {
            pattern: a('Strict-Transport-Security'),
            lookbehind: !0,
            alias: ['hsts', 'languages-hsts'],
            inside: t.languages.hsts
          },
          { pattern: a('[^:]+'), lookbehind: !0 }
        ],
        'header-name': { pattern: /^[^:]+/, alias: 'keyword' },
        punctuation: /^:/
      }
    }
  }
  let e
  const n = t.languages
  const s = {
    'application/javascript': n.javascript,
    'application/json': n.json || n.javascript,
    'application/xml': n.xml,
    'text/xml': n.xml,
    'text/html': n.html,
    'text/css': n.css,
    'text/plain': n.plain
  }
  const i = { 'application/json': !0, 'application/xml': !0 }
  function r(t) {
    const a = t.replace(/^[a-z]+\//, '')
    return '(?:' + t + '|\\w+/(?:[\\w.-]+\\+)+' + a + '(?![+\\w.-]))'
  }
  for (const p in s)
    if (s[p]) {
      e = e || {}
      const l = i[p] ? r(p) : p
      e[p.replace(/\//g, '-')] = {
        pattern: RegExp(
          '(content-type:\\s*' +
            l +
            '(?:(?:\r\n?|\n)[\\w-].*)*(?:\r(?:\n|(?!\n))|\n))[^ \t\\w-][^]*',
          'i'
        ),
        lookbehind: !0,
        inside: s[p]
      }
    }
  e && t.languages.insertBefore('http', 'header', e)
})(Prism)
Prism.languages.hpkp = {
  directive: {
    pattern:
      /\b(?:includeSubDomains|max-age|pin-sha256|preload|report-to|report-uri|strict)(?=[\s;=]|$)/i,
    alias: 'property'
  },
  operator: /=/,
  punctuation: /;/
}
Prism.languages.hsts = {
  directive: {
    pattern: /\b(?:includeSubDomains|max-age|preload)(?=[\s;=]|$)/i,
    alias: 'property'
  },
  operator: /=/,
  punctuation: /;/
}
!(function (e) {
  const n =
    /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/
  const t = '(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*'
  const s = {
    pattern: RegExp('(^|[^\\w.])' + t + '[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b'),
    lookbehind: !0,
    inside: {
      namespace: {
        pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
        inside: { punctuation: /\./ }
      },
      punctuation: /\./
    }
  }
  ;(e.languages.java = e.languages.extend('clike', {
    string: {
      pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
      lookbehind: !0,
      greedy: !0
    },
    'class-name': [
      s,
      {
        pattern: RegExp(
          '(^|[^\\w.])' +
            t +
            '[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)'
        ),
        lookbehind: !0,
        inside: s.inside
      },
      {
        pattern: RegExp(
          '(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)' +
            t +
            '[A-Z]\\w*\\b'
        ),
        lookbehind: !0,
        inside: s.inside
      }
    ],
    keyword: n,
    function: [
      e.languages.clike.function,
      { pattern: /(::\s*)[a-z_]\w*/, lookbehind: !0 }
    ],
    number:
      /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: {
      pattern:
        /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: !0
    },
    constant: /\b[A-Z][A-Z_\d]+\b/
  })),
    e.languages.insertBefore('java', 'string', {
      'triple-quoted-string': {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: 'string'
      },
      char: { pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/, greedy: !0 }
    }),
    e.languages.insertBefore('java', 'class-name', {
      annotation: {
        pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
        lookbehind: !0,
        alias: 'punctuation'
      },
      generics: {
        pattern:
          /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
        inside: {
          'class-name': s,
          keyword: n,
          punctuation: /[<>(),.:]/,
          operator: /[?&|]/
        }
      },
      import: [
        {
          pattern: RegExp('(\\bimport\\s+)' + t + '(?:[A-Z]\\w*|\\*)(?=\\s*;)'),
          lookbehind: !0,
          inside: {
            namespace: s.inside.namespace,
            punctuation: /\./,
            operator: /\*/,
            'class-name': /\w+/
          }
        },
        {
          pattern: RegExp(
            '(\\bimport\\s+static\\s+)' + t + '(?:\\w+|\\*)(?=\\s*;)'
          ),
          lookbehind: !0,
          alias: 'static',
          inside: {
            namespace: s.inside.namespace,
            static: /\b\w+$/,
            punctuation: /\./,
            operator: /\*/,
            'class-name': /\w+/
          }
        }
      ],
      namespace: {
        pattern: RegExp(
          '(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?'.replace(
            /<keyword>/g,
            function () {
              return n.source
            }
          )
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ }
      }
    })
})(Prism)
!(function (e) {
  function n(e, n) {
    return '___' + e.toUpperCase() + n + '___'
  }
  Object.defineProperties((e.languages['markup-templating'] = {}), {
    buildPlaceholders: {
      value: function (t, a, r, o) {
        if (t.language === a) {
          const c = (t.tokenStack = [])
          ;(t.code = t.code.replace(r, function (e) {
            if (typeof o === 'function' && !o(e)) return e
            for (var r, i = c.length; t.code.indexOf((r = n(a, i))) !== -1; )
              ++i
            return (c[i] = e), r
          })),
            (t.grammar = e.languages.markup)
        }
      }
    },
    tokenizePlaceholders: {
      value: function (t, a) {
        if (t.language === a && t.tokenStack) {
          t.grammar = e.languages[a]
          let r = 0
          const o = Object.keys(t.tokenStack)
          !(function c(i) {
            for (let u = 0; u < i.length && !(r >= o.length); u++) {
              const g = i[u]
              if (
                typeof g === 'string' ||
                (g.content && typeof g.content === 'string')
              ) {
                const l = o[r]
                const s = t.tokenStack[l]
                const f = typeof g === 'string' ? g : g.content
                const p = n(a, l)
                const k = f.indexOf(p)
                if (k > -1) {
                  ++r
                  const m = f.substring(0, k)
                  const d = new e.Token(
                    a,
                    e.tokenize(s, t.grammar),
                    'language-' + a,
                    s
                  )
                  const h = f.substring(k + p.length)
                  const v = []
                  m && v.push.apply(v, c([m])),
                    v.push(d),
                    h && v.push.apply(v, c([h])),
                    typeof g === 'string'
                      ? i.splice.apply(i, [u, 1].concat(v))
                      : (g.content = v)
                }
              } else g.content && c(g.content)
            }
            return i
          })(t.tokens)
        }
      }
    }
  })
})(Prism)
!(function (e) {
  const a = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/
  const t = [
    { pattern: /\b(?:false|true)\b/i, alias: 'boolean' },
    { pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i, greedy: !0, lookbehind: !0 },
    {
      pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
      greedy: !0,
      lookbehind: !0
    },
    /\b(?:null)\b/i,
    /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/
  ]
  const i =
    /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i
  const n =
    /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/
  const s = /[{}\[\](),:;]/
  e.languages.php = {
    delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: 'important' },
    comment: a,
    variable: /\$+(?:\w+\b|(?=\{))/,
    package: {
      pattern:
        /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: !0,
      inside: { punctuation: /\\/ }
    },
    'class-name-definition': {
      pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
      lookbehind: !0,
      alias: 'class-name'
    },
    'function-definition': {
      pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
      lookbehind: !0,
      alias: 'function'
    },
    keyword: [
      {
        pattern:
          /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
        alias: 'type-casting',
        greedy: !0,
        lookbehind: !0
      },
      {
        pattern:
          /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
        alias: 'type-hint',
        greedy: !0,
        lookbehind: !0
      },
      {
        pattern:
          /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
        alias: 'return-type',
        greedy: !0,
        lookbehind: !0
      },
      {
        pattern:
          /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
        alias: 'type-declaration',
        greedy: !0
      },
      {
        pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
        alias: 'type-declaration',
        greedy: !0,
        lookbehind: !0
      },
      {
        pattern: /\b(?:parent|self|static)(?=\s*::)/i,
        alias: 'static-context',
        greedy: !0
      },
      { pattern: /(\byield\s+)from\b/i, lookbehind: !0 },
      /\bclass\b/i,
      {
        pattern:
          /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
        lookbehind: !0
      }
    ],
    'argument-name': {
      pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
      lookbehind: !0
    },
    'class-name': [
      {
        pattern:
          /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
        greedy: !0,
        lookbehind: !0
      },
      { pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i, greedy: !0, lookbehind: !0 },
      { pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i, greedy: !0 },
      {
        pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ }
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        inside: { punctuation: /\\/ }
      },
      {
        pattern:
          /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: 'class-name-fully-qualified',
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ }
      },
      {
        pattern: /\b[a-z_]\w*(?=\s*\$)/i,
        alias: 'type-declaration',
        greedy: !0
      },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ['class-name-fully-qualified', 'type-declaration'],
        greedy: !0,
        inside: { punctuation: /\\/ }
      },
      { pattern: /\b[a-z_]\w*(?=\s*::)/i, alias: 'static-context', greedy: !0 },
      {
        pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
        alias: ['class-name-fully-qualified', 'static-context'],
        greedy: !0,
        inside: { punctuation: /\\/ }
      },
      {
        pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
        alias: 'type-hint',
        greedy: !0,
        lookbehind: !0
      },
      {
        pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
        alias: ['class-name-fully-qualified', 'type-hint'],
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ }
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
        alias: 'return-type',
        greedy: !0,
        lookbehind: !0
      },
      {
        pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
        alias: ['class-name-fully-qualified', 'return-type'],
        greedy: !0,
        lookbehind: !0,
        inside: { punctuation: /\\/ }
      }
    ],
    constant: t,
    function: {
      pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
      lookbehind: !0,
      inside: { punctuation: /\\/ }
    },
    property: { pattern: /(->\s*)\w+/, lookbehind: !0 },
    number: i,
    operator: n,
    punctuation: s
  }
  const l = {
    pattern:
      /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
    lookbehind: !0,
    inside: e.languages.php
  }
  const r = [
    {
      pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
      alias: 'nowdoc-string',
      greedy: !0,
      inside: {
        delimiter: {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: 'symbol',
          inside: { punctuation: /^<<<'?|[';]$/ }
        }
      }
    },
    {
      pattern:
        /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
      alias: 'heredoc-string',
      greedy: !0,
      inside: {
        delimiter: {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: 'symbol',
          inside: { punctuation: /^<<<"?|[";]$/ }
        },
        interpolation: l
      }
    },
    {
      pattern: /`(?:\\[\s\S]|[^\\`])*`/,
      alias: 'backtick-quoted-string',
      greedy: !0
    },
    {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      alias: 'single-quoted-string',
      greedy: !0
    },
    {
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      alias: 'double-quoted-string',
      greedy: !0,
      inside: { interpolation: l }
    }
  ]
  e.languages.insertBefore('php', 'variable', {
    string: r,
    attribute: {
      pattern:
        /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
      greedy: !0,
      inside: {
        'attribute-content': {
          pattern: /^(#\[)[\s\S]+(?=\]$)/,
          lookbehind: !0,
          inside: {
            comment: a,
            string: r,
            'attribute-class-name': [
              {
                pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
                alias: 'class-name',
                greedy: !0,
                lookbehind: !0
              },
              {
                pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
                alias: ['class-name', 'class-name-fully-qualified'],
                greedy: !0,
                lookbehind: !0,
                inside: { punctuation: /\\/ }
              }
            ],
            constant: t,
            number: i,
            operator: n,
            punctuation: s
          }
        },
        delimiter: { pattern: /^#\[|\]$/, alias: 'punctuation' }
      }
    }
  }),
    e.hooks.add('before-tokenize', function (a) {
      ;/<\?/.test(a.code) &&
        e.languages['markup-templating'].buildPlaceholders(
          a,
          'php',
          /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g
        )
    }),
    e.hooks.add('after-tokenize', function (a) {
      e.languages['markup-templating'].tokenizePlaceholders(a, 'php')
    })
})(Prism)
!(function (a) {
  const e = (a.languages.javadoclike = {
    parameter: {
      pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,
      lookbehind: !0
    },
    keyword: {
      pattern: /(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,
      lookbehind: !0
    },
    punctuation: /[{}]/
  })
  Object.defineProperty(e, 'addSupport', {
    value: function (e, n) {
      typeof e === 'string' && (e = [e]),
        e.forEach(function (e) {
          !(function (e, n) {
            const t = 'doc-comment'
            let r = a.languages[e]
            if (r) {
              let o = r[t]
              if (
                (o ||
                  (o = (r = a.languages.insertBefore(e, 'comment', {
                    'doc-comment': {
                      pattern: /(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,
                      lookbehind: !0,
                      alias: 'comment'
                    }
                  }))[t]),
                o instanceof RegExp && (o = r[t] = { pattern: o }),
                Array.isArray(o))
              )
                for (let i = 0, s = o.length; i < s; i++)
                  o[i] instanceof RegExp && (o[i] = { pattern: o[i] }), n(o[i])
              else n(o)
            }
          })(e, function (a) {
            a.inside || (a.inside = {}), (a.inside.rest = n)
          })
        })
    }
  }),
    e.addSupport(['java', 'javascript', 'php'], e)
})(Prism)
!(function (a) {
  const e = /(^(?:[\t ]*(?:\*\s*)*))[^*\s].*$/m
  const n =
    '(?:\\b[a-zA-Z]\\w+\\s*\\.\\s*)*\\b[A-Z]\\w*(?:\\s*<mem>)?|<mem>'.replace(
      /<mem>/g,
      function () {
        return '#\\s*\\w+(?:\\s*\\([^()]*\\))?'
      }
    )
  ;(a.languages.javadoc = a.languages.extend('javadoclike', {})),
    a.languages.insertBefore('javadoc', 'keyword', {
      reference: {
        pattern: RegExp(
          '(@(?:exception|link|linkplain|see|throws|value)\\s+(?:\\*\\s*)?)(?:' +
            n +
            ')'
        ),
        lookbehind: !0,
        inside: {
          function: { pattern: /(#\s*)\w+(?=\s*\()/, lookbehind: !0 },
          field: { pattern: /(#\s*)\w+/, lookbehind: !0 },
          namespace: {
            pattern: /\b(?:[a-z]\w*\s*\.\s*)+/,
            inside: { punctuation: /\./ }
          },
          'class-name': /\b[A-Z]\w*/,
          keyword: a.languages.java.keyword,
          punctuation: /[#()[\],.]/
        }
      },
      'class-name': {
        pattern: /(@param\s+)<[A-Z]\w*>/,
        lookbehind: !0,
        inside: { punctuation: /[.<>]/ }
      },
      'code-section': [
        {
          pattern:
            /(\{@code\s+(?!\s))(?:[^\s{}]|\s+(?![\s}])|\{(?:[^{}]|\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})*\})*\})+(?=\s*\})/,
          lookbehind: !0,
          inside: {
            code: {
              pattern: e,
              lookbehind: !0,
              inside: a.languages.java,
              alias: 'language-java'
            }
          }
        },
        {
          pattern:
            /(<(code|pre|tt)>(?!<code>)\s*)\S(?:\S|\s+\S)*?(?=\s*<\/\2>)/,
          lookbehind: !0,
          inside: {
            line: {
              pattern: e,
              lookbehind: !0,
              inside: {
                tag: a.languages.markup.tag,
                entity: a.languages.markup.entity,
                code: {
                  pattern: /.+/,
                  inside: a.languages.java,
                  alias: 'language-java'
                }
              }
            }
          }
        }
      ],
      tag: a.languages.markup.tag,
      entity: a.languages.markup.entity
    }),
    a.languages.javadoclike.addSupport('java', a.languages.javadoc)
})(Prism)
!(function (e) {
  ;(e.languages.typescript = e.languages.extend('javascript', {
    'class-name': {
      pattern:
        /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: !0,
      greedy: !0,
      inside: null
    },
    builtin:
      /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  })),
    e.languages.typescript.keyword.push(
      /\b(?:abstract|declare|is|keyof|readonly|require)\b/,
      /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
      /\btype\b(?=\s*(?:[\{*]|$))/
    ),
    delete e.languages.typescript.parameter,
    delete e.languages.typescript['literal-property']
  const s = e.languages.extend('typescript', {})
  delete s['class-name'],
    (e.languages.typescript['class-name'].inside = s),
    e.languages.insertBefore('typescript', 'function', {
      decorator: {
        pattern: /@[$\w\xA0-\uFFFF]+/,
        inside: {
          at: { pattern: /^@/, alias: 'operator' },
          function: /^[\s\S]+/
        }
      },
      'generic-function': {
        pattern:
          /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
        greedy: !0,
        inside: {
          function: /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
          generic: { pattern: /<[\s\S]+/, alias: 'class-name', inside: s }
        }
      }
    }),
    (e.languages.ts = e.languages.typescript)
})(Prism)
!(function (e) {
  const a = e.languages.javascript
  const n = '\\{(?:[^{}]|\\{(?:[^{}]|\\{[^{}]*\\})*\\})+\\}'
  const t = '(@(?:arg|argument|param|property)\\s+(?:' + n + '\\s+)?)'
  ;(e.languages.jsdoc = e.languages.extend('javadoclike', {
    parameter: {
      pattern: RegExp(t + '(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?=\\s|$)'),
      lookbehind: !0,
      inside: { punctuation: /\./ }
    }
  })),
    e.languages.insertBefore('jsdoc', 'keyword', {
      'optional-parameter': {
        pattern: RegExp(
          t + '\\[(?:(?!\\s)[$\\w\\xA0-\\uFFFF.])+(?:=[^[\\]]+)?\\](?=\\s|$)'
        ),
        lookbehind: !0,
        inside: {
          parameter: {
            pattern: /(^\[)[$\w\xA0-\uFFFF\.]+/,
            lookbehind: !0,
            inside: { punctuation: /\./ }
          },
          code: {
            pattern: /(=)[\s\S]*(?=\]$)/,
            lookbehind: !0,
            inside: a,
            alias: 'language-javascript'
          },
          punctuation: /[=[\]]/
        }
      },
      'class-name': [
        {
          pattern: RegExp(
            '(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\\s+(?:<TYPE>\\s+)?)[A-Z]\\w*(?:\\.[A-Z]\\w*)*'.replace(
              /<TYPE>/g,
              function () {
                return n
              }
            )
          ),
          lookbehind: !0,
          inside: { punctuation: /\./ }
        },
        {
          pattern: RegExp('(@[a-z]+\\s+)' + n),
          lookbehind: !0,
          inside: {
            string: a.string,
            number: a.number,
            boolean: a.boolean,
            keyword: e.languages.typescript.keyword,
            operator: /=>|\.\.\.|[&|?:*]/,
            punctuation: /[.,;=<>{}()[\]]/
          }
        }
      ],
      example: {
        pattern:
          /(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,
        lookbehind: !0,
        inside: {
          code: {
            pattern: /^([\t ]*(?:\*\s*)?)\S.*$/m,
            lookbehind: !0,
            inside: a,
            alias: 'language-javascript'
          }
        }
      }
    }),
    e.languages.javadoclike.addSupport('javascript', e.languages.jsdoc)
})(Prism)
;(Prism.languages.json = {
  property: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  string: {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: !0,
    greedy: !0
  },
  comment: { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: !0 },
  number: /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  punctuation: /[{}[\],]/,
  operator: /:/,
  boolean: /\b(?:false|true)\b/,
  null: { pattern: /\bnull\b/, alias: 'keyword' }
}),
  (Prism.languages.webmanifest = Prism.languages.json)
;(Prism.languages.jsonp = Prism.languages.extend('json', {
  punctuation: /[{}[\]();,.]/
})),
  Prism.languages.insertBefore('jsonp', 'punctuation', {
    function: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\()/
  })
!(function (e) {
  const t = e.languages.javascript['template-string']
  const n = t.pattern.source
  const r = t.inside.interpolation
  const a = r.inside['interpolation-punctuation']
  const i = r.pattern.source
  function o(t, r) {
    if (e.languages[t])
      return {
        pattern: RegExp('((?:' + r + ')\\s*)' + n),
        lookbehind: !0,
        greedy: !0,
        inside: {
          'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
          'embedded-code': { pattern: /[\s\S]+/, alias: t }
        }
      }
  }
  function s(e, t) {
    return '___' + t.toUpperCase() + '_' + e + '___'
  }
  function p(t, n, r) {
    const a = { code: t, grammar: n, language: r }
    return (
      e.hooks.run('before-tokenize', a),
      (a.tokens = e.tokenize(a.code, a.grammar)),
      e.hooks.run('after-tokenize', a),
      a.tokens
    )
  }
  function l(t) {
    const n = {}
    n['interpolation-punctuation'] = a
    const i = e.tokenize(t, n)
    if (i.length === 3) {
      const o = [1, 1]
      o.push.apply(o, p(i[1], e.languages.javascript, 'javascript')),
        i.splice.apply(i, o)
    }
    return new e.Token('interpolation', i, r.alias, t)
  }
  function g(t, n, r) {
    const a = e.tokenize(t, {
      interpolation: { pattern: RegExp(i), lookbehind: !0 }
    })
    let o = 0
    const g = {}
    const u = p(
      a
        .map(function (e) {
          if (typeof e === 'string') return e
          for (var n, a = e.content; t.indexOf((n = s(o++, r))) !== -1; );
          return (g[n] = a), n
        })
        .join(''),
      n,
      r
    )
    const c = Object.keys(g)
    return (
      (o = 0),
      (function e(t) {
        for (let n = 0; n < t.length; n++) {
          if (o >= c.length) return
          const r = t[n]
          if (typeof r === 'string' || typeof r.content === 'string') {
            const a = c[o]
            const i = typeof r === 'string' ? r : r.content
            const s = i.indexOf(a)
            if (s !== -1) {
              ++o
              const p = i.substring(0, s)
              const u = l(g[a])
              const f = i.substring(s + a.length)
              const y = []
              if ((p && y.push(p), y.push(u), f)) {
                const v = [f]
                e(v), y.push.apply(y, v)
              }
              typeof r === 'string'
                ? (t.splice.apply(t, [n, 1].concat(y)), (n += y.length - 1))
                : (r.content = y)
            }
          } else {
            const d = r.content
            Array.isArray(d) ? e(d) : e([d])
          }
        }
      })(u),
      new e.Token(r, u, 'language-' + r, t)
    )
  }
  e.languages.javascript['template-string'] = [
    o(
      'css',
      '\\b(?:styled(?:\\([^)]*\\))?(?:\\s*\\.\\s*\\w+(?:\\([^)]*\\))*)*|css(?:\\s*\\.\\s*(?:global|resolve))?|createGlobalStyle|keyframes)'
    ),
    o('html', '\\bhtml|\\.\\s*(?:inner|outer)HTML\\s*\\+?='),
    o('svg', '\\bsvg'),
    o('markdown', '\\b(?:markdown|md)'),
    o('graphql', '\\b(?:gql|graphql(?:\\s*\\.\\s*experimental)?)'),
    o('sql', '\\bsql'),
    t
  ].filter(Boolean)
  const u = { javascript: !0, js: !0, typescript: !0, ts: !0, jsx: !0, tsx: !0 }
  function c(e) {
    return typeof e === 'string'
      ? e
      : Array.isArray(e)
        ? e.map(c).join('')
        : c(e.content)
  }
  e.hooks.add('after-tokenize', function (t) {
    t.language in u &&
      (function t(n) {
        for (let r = 0, a = n.length; r < a; r++) {
          const i = n[r]
          if (typeof i !== 'string') {
            const o = i.content
            if (Array.isArray(o))
              if (i.type === 'template-string') {
                const s = o[1]
                if (
                  o.length === 3 &&
                  typeof s !== 'string' &&
                  s.type === 'embedded-code'
                ) {
                  const p = c(s)
                  const l = s.alias
                  const u = Array.isArray(l) ? l[0] : l
                  const f = e.languages[u]
                  if (!f) continue
                  o[1] = g(p, f, u)
                }
              } else t(o)
            else typeof o !== 'string' && t([o])
          }
        }
      })(t.tokens)
  })
})(Prism)
;(Prism.languages.less = Prism.languages.extend('css', {
  comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }],
  atrule: {
    pattern:
      /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: { punctuation: /[:()]/ }
  },
  selector: {
    pattern:
      /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: { variable: /@+[\w-]+/ }
  },
  property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
  operator: /[+\-*\/]/
})),
  Prism.languages.insertBefore('less', 'property', {
    variable: [
      { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
      /@@?[\w-]+/
    ],
    'mixin-usage': {
      pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
      lookbehind: !0,
      alias: 'function'
    }
  })
Prism.languages.log = {
  string: {
    pattern: /"(?:[^"\\\r\n]|\\.)*"|'(?![st] | \w)(?:[^'\\\r\n]|\\.)*'/,
    greedy: !0
  },
  exception: {
    pattern:
      /(^|[^\w.])[a-z][\w.]*(?:Error|Exception):.*(?:(?:\r\n?|\n)[ \t]*(?:at[ \t].+|\.{3}.*|Caused by:.*))+(?:(?:\r\n?|\n)[ \t]*\.\.\. .*)?/,
    lookbehind: !0,
    greedy: !0,
    alias: ['javastacktrace', 'language-javastacktrace'],
    inside: Prism.languages.javastacktrace || {
      keyword: /\bat\b/,
      function: /[a-z_][\w$]*(?=\()/,
      punctuation: /[.:()]/
    }
  },
  level: [
    {
      pattern:
        /\b(?:ALERT|CRIT|CRITICAL|EMERG|EMERGENCY|ERR|ERROR|FAILURE|FATAL|SEVERE)\b/,
      alias: ['error', 'important']
    },
    { pattern: /\b(?:WARN|WARNING|WRN)\b/, alias: ['warning', 'important'] },
    {
      pattern: /\b(?:DISPLAY|INF|INFO|NOTICE|STATUS)\b/,
      alias: ['info', 'keyword']
    },
    { pattern: /\b(?:DBG|DEBUG|FINE)\b/, alias: ['debug', 'keyword'] },
    {
      pattern: /\b(?:FINER|FINEST|TRACE|TRC|VERBOSE|VRB)\b/,
      alias: ['trace', 'comment']
    }
  ],
  property: {
    pattern:
      /((?:^|[\]|])[ \t]*)[a-z_](?:[\w-]|\b\/\b)*(?:[. ]\(?\w(?:[\w-]|\b\/\b)*\)?)*:(?=\s)/im,
    lookbehind: !0
  },
  separator: {
    pattern: /(^|[^-+])-{3,}|={3,}|\*{3,}|- - /m,
    lookbehind: !0,
    alias: 'comment'
  },
  url: /\b(?:file|ftp|https?):\/\/[^\s|,;'"]*[^\s|,;'">.]/,
  email: {
    pattern: /(^|\s)[-\w+.]+@[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)+(?=\s)/,
    lookbehind: !0,
    alias: 'url'
  },
  'ip-address': {
    pattern: /\b(?:\d{1,3}(?:\.\d{1,3}){3})\b/,
    alias: 'constant'
  },
  'mac-address': {
    pattern: /\b[a-f0-9]{2}(?::[a-f0-9]{2}){5}\b/i,
    alias: 'constant'
  },
  domain: {
    pattern:
      /(^|\s)[a-z][a-z0-9-]*(?:\.[a-z][a-z0-9-]*)*\.[a-z][a-z0-9-]+(?=\s)/,
    lookbehind: !0,
    alias: 'constant'
  },
  uuid: {
    pattern:
      /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i,
    alias: 'constant'
  },
  hash: { pattern: /\b(?:[a-f0-9]{32}){1,2}\b/i, alias: 'constant' },
  'file-path': {
    pattern:
      /\b[a-z]:[\\/][^\s|,;:(){}\[\]"']+|(^|[\s:\[\](>|])\.{0,2}\/\w[^\s|,;:(){}\[\]"']*/i,
    lookbehind: !0,
    greedy: !0,
    alias: 'string'
  },
  date: {
    pattern: RegExp(
      '\\b\\d{4}[-/]\\d{2}[-/]\\d{2}(?:T(?=\\d{1,2}:)|(?=\\s\\d{1,2}:))|\\b\\d{1,4}[-/ ](?:\\d{1,2}|Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)[-/ ]\\d{2,4}T?\\b|\\b(?:(?:Fri|Mon|Sat|Sun|Thu|Tue|Wed)(?:\\s{1,2}(?:Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep))?|Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)\\s{1,2}\\d{1,2}\\b',
      'i'
    ),
    alias: 'number'
  },
  time: {
    pattern:
      /\b\d{1,2}:\d{1,2}:\d{1,2}(?:[.,:]\d+)?(?:\s?[+-]\d{2}:?\d{2}|Z)?\b/,
    alias: 'number'
  },
  boolean: /\b(?:false|null|true)\b/i,
  number: {
    pattern:
      /(^|[^.\w])(?:0x[a-f0-9]+|0o[0-7]+|0b[01]+|v?\d[\da-f]*(?:\.\d+)*(?:e[+-]?\d+)?[a-z]{0,3}\b)\b(?!\.\w)/i,
    lookbehind: !0
  },
  operator: /[;:?<=>~/@!$%&+\-|^(){}*#]/,
  punctuation: /[\[\].,]/
}
!(function ($) {
  let e = [
    '$eq',
    '$gt',
    '$gte',
    '$in',
    '$lt',
    '$lte',
    '$ne',
    '$nin',
    '$and',
    '$not',
    '$nor',
    '$or',
    '$exists',
    '$type',
    '$expr',
    '$jsonSchema',
    '$mod',
    '$regex',
    '$text',
    '$where',
    '$geoIntersects',
    '$geoWithin',
    '$near',
    '$nearSphere',
    '$all',
    '$elemMatch',
    '$size',
    '$bitsAllClear',
    '$bitsAllSet',
    '$bitsAnyClear',
    '$bitsAnySet',
    '$comment',
    '$elemMatch',
    '$meta',
    '$slice',
    '$currentDate',
    '$inc',
    '$min',
    '$max',
    '$mul',
    '$rename',
    '$set',
    '$setOnInsert',
    '$unset',
    '$addToSet',
    '$pop',
    '$pull',
    '$push',
    '$pullAll',
    '$each',
    '$position',
    '$slice',
    '$sort',
    '$bit',
    '$addFields',
    '$bucket',
    '$bucketAuto',
    '$collStats',
    '$count',
    '$currentOp',
    '$facet',
    '$geoNear',
    '$graphLookup',
    '$group',
    '$indexStats',
    '$limit',
    '$listLocalSessions',
    '$listSessions',
    '$lookup',
    '$match',
    '$merge',
    '$out',
    '$planCacheStats',
    '$project',
    '$redact',
    '$replaceRoot',
    '$replaceWith',
    '$sample',
    '$set',
    '$skip',
    '$sort',
    '$sortByCount',
    '$unionWith',
    '$unset',
    '$unwind',
    '$setWindowFields',
    '$abs',
    '$accumulator',
    '$acos',
    '$acosh',
    '$add',
    '$addToSet',
    '$allElementsTrue',
    '$and',
    '$anyElementTrue',
    '$arrayElemAt',
    '$arrayToObject',
    '$asin',
    '$asinh',
    '$atan',
    '$atan2',
    '$atanh',
    '$avg',
    '$binarySize',
    '$bsonSize',
    '$ceil',
    '$cmp',
    '$concat',
    '$concatArrays',
    '$cond',
    '$convert',
    '$cos',
    '$dateFromParts',
    '$dateToParts',
    '$dateFromString',
    '$dateToString',
    '$dayOfMonth',
    '$dayOfWeek',
    '$dayOfYear',
    '$degreesToRadians',
    '$divide',
    '$eq',
    '$exp',
    '$filter',
    '$first',
    '$floor',
    '$function',
    '$gt',
    '$gte',
    '$hour',
    '$ifNull',
    '$in',
    '$indexOfArray',
    '$indexOfBytes',
    '$indexOfCP',
    '$isArray',
    '$isNumber',
    '$isoDayOfWeek',
    '$isoWeek',
    '$isoWeekYear',
    '$last',
    '$last',
    '$let',
    '$literal',
    '$ln',
    '$log',
    '$log10',
    '$lt',
    '$lte',
    '$ltrim',
    '$map',
    '$max',
    '$mergeObjects',
    '$meta',
    '$min',
    '$millisecond',
    '$minute',
    '$mod',
    '$month',
    '$multiply',
    '$ne',
    '$not',
    '$objectToArray',
    '$or',
    '$pow',
    '$push',
    '$radiansToDegrees',
    '$range',
    '$reduce',
    '$regexFind',
    '$regexFindAll',
    '$regexMatch',
    '$replaceOne',
    '$replaceAll',
    '$reverseArray',
    '$round',
    '$rtrim',
    '$second',
    '$setDifference',
    '$setEquals',
    '$setIntersection',
    '$setIsSubset',
    '$setUnion',
    '$size',
    '$sin',
    '$slice',
    '$split',
    '$sqrt',
    '$stdDevPop',
    '$stdDevSamp',
    '$strcasecmp',
    '$strLenBytes',
    '$strLenCP',
    '$substr',
    '$substrBytes',
    '$substrCP',
    '$subtract',
    '$sum',
    '$switch',
    '$tan',
    '$toBool',
    '$toDate',
    '$toDecimal',
    '$toDouble',
    '$toInt',
    '$toLong',
    '$toObjectId',
    '$toString',
    '$toLower',
    '$toUpper',
    '$trim',
    '$trunc',
    '$type',
    '$week',
    '$year',
    '$zip',
    '$count',
    '$dateAdd',
    '$dateDiff',
    '$dateSubtract',
    '$dateTrunc',
    '$getField',
    '$rand',
    '$sampleRate',
    '$setField',
    '$unsetField',
    '$comment',
    '$explain',
    '$hint',
    '$max',
    '$maxTimeMS',
    '$min',
    '$orderby',
    '$query',
    '$returnKey',
    '$showDiskLoc',
    '$natural'
  ]
  const t =
    '(?:' +
    (e = e.map(function ($) {
      return $.replace('$', '\\$')
    })).join('|') +
    ')\\b'
  ;($.languages.mongodb = $.languages.extend('javascript', {})),
    $.languages.insertBefore('mongodb', 'string', {
      property: {
        pattern:
          /(?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)(?=\s*:)/,
        greedy: !0,
        inside: { keyword: RegExp('^([\'"])?' + t + '(?:\\1)?$') }
      }
    }),
    ($.languages.mongodb.string.inside = {
      url: {
        pattern:
          /https?:\/\/[-\w@:%.+~#=]{1,256}\.[a-z0-9()]{1,6}\b[-\w()@:%+.~#?&/=]*/i,
        greedy: !0
      },
      entity: {
        pattern:
          /\b(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d\d?|2[0-4]\d|25[0-5])\b/,
        greedy: !0
      }
    }),
    $.languages.insertBefore('mongodb', 'constant', {
      builtin: {
        pattern: RegExp(
          '\\b(?:' +
            [
              'ObjectId',
              'Code',
              'BinData',
              'DBRef',
              'Timestamp',
              'NumberLong',
              'NumberDecimal',
              'MaxKey',
              'MinKey',
              'RegExp',
              'ISODate',
              'UUID'
            ].join('|') +
            ')\\b'
        ),
        alias: 'keyword'
      }
    })
})(Prism)
!(function (e) {
  const n = /\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i
  e.languages.nginx = {
    comment: { pattern: /(^|[\s{};])#.*/, lookbehind: !0, greedy: !0 },
    directive: {
      pattern:
        /(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,
      lookbehind: !0,
      greedy: !0,
      inside: {
        string: {
          pattern:
            /((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,
          lookbehind: !0,
          greedy: !0,
          inside: {
            escape: { pattern: /\\["'\\nrt]/, alias: 'entity' },
            variable: n
          }
        },
        comment: { pattern: /(\s)#.*/, lookbehind: !0, greedy: !0 },
        keyword: { pattern: /^\S+/, greedy: !0 },
        boolean: { pattern: /(\s)(?:off|on)(?!\S)/, lookbehind: !0 },
        number: { pattern: /(\s)\d+[a-z]*(?!\S)/i, lookbehind: !0 },
        variable: n
      }
    },
    punctuation: /[{};]/
  }
})(Prism)
Prism.languages.insertBefore('php', 'variable', {
  this: { pattern: /\$this\b/, alias: 'keyword' },
  global:
    /\$(?:GLOBALS|HTTP_RAW_POST_DATA|_(?:COOKIE|ENV|FILES|GET|POST|REQUEST|SERVER|SESSION)|argc|argv|http_response_header|php_errormsg)\b/,
  scope: {
    pattern: /\b[\w\\]+::/,
    inside: { keyword: /\b(?:parent|self|static)\b/, punctuation: /::|\\/ }
  }
})
;(Prism.languages.python = {
  comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
  'string-interpolation': {
    pattern:
      /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
      interpolation: {
        pattern:
          /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
        lookbehind: !0,
        inside: {
          'format-spec': { pattern: /(:)[^:(){}]+(?=\}$)/, lookbehind: !0 },
          'conversion-option': {
            pattern: /![sra](?=[:}]$)/,
            alias: 'punctuation'
          },
          rest: null
        }
      },
      string: /[\s\S]+/
    }
  },
  'triple-quoted-string': {
    pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
    greedy: !0,
    alias: 'string'
  },
  string: {
    pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0
  },
  function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0
  },
  'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
  decorator: {
    pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
    lookbehind: !0,
    alias: ['annotation', 'punctuation'],
    inside: { punctuation: /\./ }
  },
  keyword:
    /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  builtin:
    /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  boolean: /\b(?:False|None|True)\b/,
  number:
    /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
  operator: /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  punctuation: /[{}[\];(),.:]/
}),
  (Prism.languages.python[
    'string-interpolation'
  ].inside.interpolation.inside.rest = Prism.languages.python),
  (Prism.languages.py = Prism.languages.python)
!(function (t) {
  const n = t.util.clone(t.languages.javascript)
  let e = '(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})'
  function a(t, n) {
    return (
      (t = t
        .replace(/<S>/g, function () {
          return '(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)'
        })
        .replace(/<BRACES>/g, function () {
          return '(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})'
        })
        .replace(/<SPREAD>/g, function () {
          return e
        })),
      RegExp(t, n)
    )
  }
  ;(e = a(e).source),
    (t.languages.jsx = t.languages.extend('markup', n)),
    (t.languages.jsx.tag.pattern = a(
      '</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|\'(?:\\\\[^]|[^\\\\\'])*\'|[^\\s{\'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>'
    )),
    (t.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/),
    (t.languages.jsx.tag.inside['attr-value'].pattern =
      /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/),
    (t.languages.jsx.tag.inside.tag.inside['class-name'] =
      /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
    (t.languages.jsx.tag.inside.comment = n.comment),
    t.languages.insertBefore(
      'inside',
      'attr-name',
      { spread: { pattern: a('<SPREAD>'), inside: t.languages.jsx } },
      t.languages.jsx.tag
    ),
    t.languages.insertBefore(
      'inside',
      'special-attr',
      {
        script: {
          pattern: a('=<BRACES>'),
          alias: 'language-javascript',
          inside: {
            'script-punctuation': { pattern: /^=(?=\{)/, alias: 'punctuation' },
            rest: t.languages.jsx
          }
        }
      },
      t.languages.jsx.tag
    )
  const s = function (t) {
    return t
      ? typeof t === 'string'
        ? t
        : typeof t.content === 'string'
          ? t.content
          : t.content.map(s).join('')
      : ''
  }
  const g = function (n) {
    for (let e = [], a = 0; a < n.length; a++) {
      const o = n[a]
      let i = !1
      if (
        (typeof o !== 'string' &&
          (o.type === 'tag' && o.content[0] && o.content[0].type === 'tag'
            ? o.content[0].content[0].content === '</'
              ? e.length > 0 &&
                e[e.length - 1].tagName === s(o.content[0].content[1]) &&
                e.pop()
              : o.content[o.content.length - 1].content === '/>' ||
                e.push({ tagName: s(o.content[0].content[1]), openedBraces: 0 })
            : e.length > 0 && o.type === 'punctuation' && o.content === '{'
              ? e[e.length - 1].openedBraces++
              : e.length > 0 &&
                  e[e.length - 1].openedBraces > 0 &&
                  o.type === 'punctuation' &&
                  o.content === '}'
                ? e[e.length - 1].openedBraces--
                : (i = !0)),
        (i || typeof o === 'string') &&
          e.length > 0 &&
          e[e.length - 1].openedBraces === 0)
      ) {
        let r = s(o)
        a < n.length - 1 &&
          (typeof n[a + 1] === 'string' || n[a + 1].type === 'plain-text') &&
          ((r += s(n[a + 1])), n.splice(a + 1, 1)),
          a > 0 &&
            (typeof n[a - 1] === 'string' || n[a - 1].type === 'plain-text') &&
            ((r = s(n[a - 1]) + r), n.splice(a - 1, 1), a--),
          (n[a] = new t.Token('plain-text', r, null, r))
      }
      o.content && typeof o.content !== 'string' && g(o.content)
    }
  }
  t.hooks.add('after-tokenize', function (t) {
    ;(t.language !== 'jsx' && t.language !== 'tsx') || g(t.tokens)
  })
})(Prism)
!(function (e) {
  const a = e.util.clone(e.languages.typescript)
  ;(e.languages.tsx = e.languages.extend('jsx', a)),
    delete e.languages.tsx.parameter,
    delete e.languages.tsx['literal-property']
  const t = e.languages.tsx.tag
  ;(t.pattern = RegExp(
    '(^|[^\\w$]|(?=</))(?:' + t.pattern.source + ')',
    t.pattern.flags
  )),
    (t.lookbehind = !0)
})(Prism)
!(function (a) {
  const e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: 'escape' }
  const n =
    /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/
  const t = '(?:[^\\\\-]|' + n.source + ')'
  const s = RegExp(t + '-' + t)
  const i = {
    pattern: /(<|')[^<>']+(?=[>']$)/,
    lookbehind: !0,
    alias: 'variable'
  }
  a.languages.regex = {
    'char-class': {
      pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
      lookbehind: !0,
      inside: {
        'char-class-negation': {
          pattern: /(^\[)\^/,
          lookbehind: !0,
          alias: 'operator'
        },
        'char-class-punctuation': { pattern: /^\[|\]$/, alias: 'punctuation' },
        range: {
          pattern: s,
          inside: {
            escape: n,
            'range-punctuation': { pattern: /-/, alias: 'operator' }
          }
        },
        'special-escape': e,
        'char-set': { pattern: /\\[wsd]|\\p\{[^{}]+\}/i, alias: 'class-name' },
        escape: n
      }
    },
    'special-escape': e,
    'char-set': { pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i, alias: 'class-name' },
    backreference: [
      { pattern: /\\(?![123][0-7]{2})[1-9]/, alias: 'keyword' },
      { pattern: /\\k<[^<>']+>/, alias: 'keyword', inside: { 'group-name': i } }
    ],
    anchor: { pattern: /[$^]|\\[ABbGZz]/, alias: 'function' },
    escape: n,
    group: [
      {
        pattern:
          /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
        alias: 'punctuation',
        inside: { 'group-name': i }
      },
      { pattern: /\)/, alias: 'punctuation' }
    ],
    quantifier: { pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/, alias: 'number' },
    alternation: { pattern: /\|/, alias: 'keyword' }
  }
})(Prism)
!(function (e) {
  ;(e.languages.ruby = e.languages.extend('clike', {
    comment: { pattern: /#.*|^=begin\s[\s\S]*?^=end/m, greedy: !0 },
    'class-name': {
      pattern:
        /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ }
    },
    keyword:
      /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
    operator:
      /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,
    punctuation: /[(){}[\].,;]/
  })),
    e.languages.insertBefore('ruby', 'operator', {
      'double-colon': { pattern: /::/, alias: 'punctuation' }
    })
  const n = {
    pattern: /((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,
    lookbehind: !0,
    inside: {
      content: {
        pattern: /^(#\{)[\s\S]+(?=\}$)/,
        lookbehind: !0,
        inside: e.languages.ruby
      },
      delimiter: { pattern: /^#\{|\}$/, alias: 'punctuation' }
    }
  }
  delete e.languages.ruby.function
  const t =
    '(?:' +
    [
      '([^a-zA-Z0-9\\s{(\\[<=])(?:(?!\\1)[^\\\\]|\\\\[^])*\\1',
      '\\((?:[^()\\\\]|\\\\[^]|\\((?:[^()\\\\]|\\\\[^])*\\))*\\)',
      '\\{(?:[^{}\\\\]|\\\\[^]|\\{(?:[^{}\\\\]|\\\\[^])*\\})*\\}',
      '\\[(?:[^\\[\\]\\\\]|\\\\[^]|\\[(?:[^\\[\\]\\\\]|\\\\[^])*\\])*\\]',
      '<(?:[^<>\\\\]|\\\\[^]|<(?:[^<>\\\\]|\\\\[^])*>)*>'
    ].join('|') +
    ')'
  const i =
    '(?:"(?:\\\\.|[^"\\\\\r\n])*"|(?:\\b[a-zA-Z_]\\w*|[^\\s\0-\\x7F]+)[?!]?|\\$.)'
  e.languages.insertBefore('ruby', 'keyword', {
    'regex-literal': [
      {
        pattern: RegExp('%r' + t + '[egimnosux]{0,6}'),
        greedy: !0,
        inside: { interpolation: n, regex: /[\s\S]+/ }
      },
      {
        pattern:
          /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
        lookbehind: !0,
        greedy: !0,
        inside: { interpolation: n, regex: /[\s\S]+/ }
      }
    ],
    variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
    symbol: [
      { pattern: RegExp('(^|[^:]):' + i), lookbehind: !0, greedy: !0 },
      {
        pattern: RegExp('([\r\n{(,][ \t]*)' + i + '(?=:(?!:))'),
        lookbehind: !0,
        greedy: !0
      }
    ],
    'method-definition': {
      pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
      lookbehind: !0,
      inside: {
        function: /\b\w+$/,
        keyword: /^self\b/,
        'class-name': /^\w+/,
        punctuation: /\./
      }
    }
  }),
    e.languages.insertBefore('ruby', 'string', {
      'string-literal': [
        {
          pattern: RegExp('%[qQiIwWs]?' + t),
          greedy: !0,
          inside: { interpolation: n, string: /[\s\S]+/ }
        },
        {
          pattern:
            /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
          greedy: !0,
          inside: { interpolation: n, string: /[\s\S]+/ }
        },
        {
          pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
          alias: 'heredoc-string',
          greedy: !0,
          inside: {
            delimiter: {
              pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
              inside: { symbol: /\b\w+/, punctuation: /^<<[-~]?/ }
            },
            interpolation: n,
            string: /[\s\S]+/
          }
        },
        {
          pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
          alias: 'heredoc-string',
          greedy: !0,
          inside: {
            delimiter: {
              pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
              inside: { symbol: /\b\w+/, punctuation: /^<<[-~]?'|'$/ }
            },
            string: /[\s\S]+/
          }
        }
      ],
      'command-literal': [
        {
          pattern: RegExp('%x' + t),
          greedy: !0,
          inside: {
            interpolation: n,
            command: { pattern: /[\s\S]+/, alias: 'string' }
          }
        },
        {
          pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,
          greedy: !0,
          inside: {
            interpolation: n,
            command: { pattern: /[\s\S]+/, alias: 'string' }
          }
        }
      ]
    }),
    delete e.languages.ruby.string,
    e.languages.insertBefore('ruby', 'number', {
      builtin:
        /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
      constant: /\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/
    }),
    (e.languages.rb = e.languages.ruby)
})(Prism)
!(function (e) {
  for (var a = '/\\*(?:[^*/]|\\*(?!/)|/(?!\\*)|<self>)*\\*/', t = 0; t < 2; t++)
    a = a.replace(/<self>/g, function () {
      return a
    })
  ;(a = a.replace(/<self>/g, function () {
    return '[^\\s\\S]'
  })),
    (e.languages.rust = {
      comment: [
        { pattern: RegExp('(^|[^\\\\])' + a), lookbehind: !0, greedy: !0 },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
      ],
      string: {
        pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
        greedy: !0
      },
      char: {
        pattern:
          /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
        greedy: !0
      },
      attribute: {
        pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
        greedy: !0,
        alias: 'attr-name',
        inside: { string: null }
      },
      'closure-params': {
        pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
        lookbehind: !0,
        greedy: !0,
        inside: {
          'closure-punctuation': { pattern: /^\||\|$/, alias: 'punctuation' },
          rest: null
        }
      },
      'lifetime-annotation': { pattern: /'\w+/, alias: 'symbol' },
      'fragment-specifier': {
        pattern: /(\$\w+:)[a-z]+/,
        lookbehind: !0,
        alias: 'punctuation'
      },
      variable: /\$\w+/,
      'function-definition': {
        pattern: /(\bfn\s+)\w+/,
        lookbehind: !0,
        alias: 'function'
      },
      'type-definition': {
        pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
        lookbehind: !0,
        alias: 'class-name'
      },
      'module-declaration': [
        {
          pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
          lookbehind: !0,
          alias: 'namespace'
        },
        {
          pattern:
            /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
          lookbehind: !0,
          alias: 'namespace',
          inside: { punctuation: /::/ }
        }
      ],
      keyword: [
        /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
        /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/
      ],
      function: /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
      macro: { pattern: /\b\w+!/, alias: 'property' },
      constant: /\b[A-Z_][A-Z_\d]+\b/,
      'class-name': /\b[A-Z]\w*\b/,
      namespace: {
        pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
        inside: { punctuation: /::/ }
      },
      number:
        /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
      boolean: /\b(?:false|true)\b/,
      punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
      operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
    }),
    (e.languages.rust['closure-params'].inside.rest = e.languages.rust),
    (e.languages.rust.attribute.inside.string = e.languages.rust.string)
})(Prism)
!(function (e) {
  ;(e.languages.sass = e.languages.extend('css', {
    comment: {
      pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
      lookbehind: !0,
      greedy: !0
    }
  })),
    e.languages.insertBefore('sass', 'atrule', {
      'atrule-line': {
        pattern: /^(?:[ \t]*)[@+=].+/m,
        greedy: !0,
        inside: { atrule: /(?:@[\w-]+|[+=])/ }
      }
    }),
    delete e.languages.sass.atrule
  const r = /\$[-\w]+|#\{\$[-\w]+\}/
  const t = [
    /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/,
    { pattern: /(\s)-(?=\s)/, lookbehind: !0 }
  ]
  e.languages.insertBefore('sass', 'property', {
    'variable-line': {
      pattern: /^[ \t]*\$.+/m,
      greedy: !0,
      inside: { punctuation: /:/, variable: r, operator: t }
    },
    'property-line': {
      pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
      greedy: !0,
      inside: {
        property: [
          /[^:\s]+(?=\s*:)/,
          { pattern: /(:)[^:\s]+/, lookbehind: !0 }
        ],
        punctuation: /:/,
        variable: r,
        operator: t,
        important: e.languages.sass.important
      }
    }
  }),
    delete e.languages.sass.property,
    delete e.languages.sass.important,
    e.languages.insertBefore('sass', 'punctuation', {
      selector: {
        pattern:
          /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
        lookbehind: !0,
        greedy: !0
      }
    })
})(Prism)
;(Prism.languages.scss = Prism.languages.extend('css', {
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
  atrule: {
    pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
    inside: { rule: /@[\w-]+/ }
  },
  url: /(?:[-a-z]+-)?url(?=\()/i,
  selector: {
    pattern:
      /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
    inside: {
      parent: { pattern: /&/, alias: 'important' },
      placeholder: /%[-\w]+/,
      variable: /\$[-\w]+|#\{\$[-\w]+\}/
    }
  },
  property: {
    pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }
  }
})),
  Prism.languages.insertBefore('scss', 'atrule', {
    keyword: [
      /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,
      { pattern: /( )(?:from|through)(?= )/, lookbehind: !0 }
    ]
  }),
  Prism.languages.insertBefore('scss', 'important', {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/
  }),
  Prism.languages.insertBefore('scss', 'function', {
    'module-modifier': {
      pattern: /\b(?:as|hide|show|with)\b/i,
      alias: 'keyword'
    },
    placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
    boolean: /\b(?:false|true)\b/,
    null: { pattern: /\bnull\b/, alias: 'keyword' },
    operator: {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
      lookbehind: !0
    }
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss)
!(function (e) {
  const n = { pattern: /(\b\d+)(?:%|[a-z]+)/, lookbehind: !0 }
  const r = { pattern: /(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/, lookbehind: !0 }
  const t = {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: !0
    },
    url: { pattern: /\burl\((["']?).*?\1\)/i, greedy: !0 },
    string: {
      pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
      greedy: !0
    },
    interpolation: null,
    func: null,
    important: /\B!(?:important|optional)\b/i,
    keyword: {
      pattern: /(^|\s+)(?:(?:else|for|if|return|unless)(?=\s|$)|@[\w-]+)/,
      lookbehind: !0
    },
    hexcode: /#[\da-f]{3,6}/i,
    color: [
      /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
      {
        pattern:
          /\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
        inside: {
          unit: n,
          number: r,
          function: /[\w-]+(?=\()/,
          punctuation: /[(),]/
        }
      }
    ],
    entity: /\\[\da-f]{1,8}/i,
    unit: n,
    boolean: /\b(?:false|true)\b/,
    operator: [
      /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.{2,3}|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/
    ],
    number: r,
    punctuation: /[{}()\[\];:,]/
  }
  ;(t.interpolation = {
    pattern: /\{[^\r\n}:]+\}/,
    alias: 'variable',
    inside: { delimiter: { pattern: /^\{|\}$/, alias: 'punctuation' }, rest: t }
  }),
    (t.func = {
      pattern: /[\w-]+\([^)]*\).*/,
      inside: { function: /^[^(]+/, rest: t }
    }),
    (e.languages.stylus = {
      'atrule-declaration': {
        pattern: /(^[ \t]*)@.+/m,
        lookbehind: !0,
        inside: { atrule: /^@[\w-]+/, rest: t }
      },
      'variable-declaration': {
        pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:\{[^{}]*\}|\S.*|$)/m,
        lookbehind: !0,
        inside: { variable: /^\S+/, rest: t }
      },
      statement: {
        pattern: /(^[ \t]*)(?:else|for|if|return|unless)[ \t].+/m,
        lookbehind: !0,
        inside: { keyword: /^\S+/, rest: t }
      },
      'property-declaration': {
        pattern:
          /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)(?!\s)[^{\r\n]*(?:;|[^{\r\n,]$(?!(?:\r?\n|\r)(?:\{|\2[ \t])))/m,
        lookbehind: !0,
        inside: {
          property: {
            pattern: /^[^\s:]+/,
            inside: { interpolation: t.interpolation }
          },
          rest: t
        }
      },
      selector: {
        pattern:
          /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\)|(?![\w-]))|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t])))/m,
        lookbehind: !0,
        inside: {
          interpolation: t.interpolation,
          comment: t.comment,
          punctuation: /[{},]/
        }
      },
      func: t.func,
      string: t.string,
      comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
        greedy: !0
      },
      interpolation: t.interpolation,
      punctuation: /[{}()\[\];:.]/
    })
})(Prism)
Prism.languages.vim = {
  string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
  comment: /".*/,
  function: /\b\w+(?=\()/,
  keyword:
    /\b(?:N|Next|P|Print|X|XMLent|XMLns|ab|abbreviate|abc|abclear|abo|aboveleft|al|all|ar|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|args|argu|argument|as|ascii|b|bN|bNext|ba|bad|badd|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bo|botright|bp|bprevious|br|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|brewind|bro|browse|bufdo|buffer|buffers|bun|bunload|bw|bwipeout|c|cN|cNext|cNfcNfile|ca|cabbrev|cabc|cabclear|cad|caddb|caddbuffer|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cg|cgetb|cgetbuffer|cgete|cgetexpr|cgetfile|change|changes|chd|chdir|che|checkpath|checkt|checktime|cl|cla|clast|clist|clo|close|cmapc|cmapclear|cn|cnew|cnewer|cnext|cnf|cnfile|cnorea|cnoreabbrev|co|col|colder|colo|colorscheme|comc|comclear|comp|compiler|con|conf|confirm|continue|cope|copen|copy|cp|cpf|cpfile|cprevious|cq|cquit|cr|crewind|cu|cuna|cunabbrev|cunmap|cw|cwindow|d|debugg|debuggreedy|delc|delcommand|delete|delf|delfunction|delm|delmarks|di|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|e|earlier|echoe|echoerr|echom|echomsg|echon|edit|el|else|elsei|elseif|em|emenu|en|endf|endfo|endfor|endfun|endfunction|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fin|fina|finally|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|foldd|folddoc|folddoclosed|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|h|ha|hardcopy|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iu|iuna|iunabbrev|iunmap|j|join|ju|jumps|k|kee|keepalt|keepj|keepjumps|keepmarks|l|lN|lNext|lNf|lNfile|la|lad|laddb|laddbuffer|laddexpr|laddf|laddfile|lan|language|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|left|lefta|leftabove|let|lex|lexpr|lf|lfile|lfir|lfirst|lg|lgetb|lgetbuffer|lgete|lgetexpr|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|list|ll|lla|llast|lli|llist|lm|lmak|lmake|lmap|lmapc|lmapclear|ln|lne|lnew|lnewer|lnext|lnf|lnfile|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lp|lpf|lpfile|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|m|ma|mak|make|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkv|mkvie|mkview|mkvimrc|mod|mode|move|mz|mzf|mzfile|mzscheme|n|nbkey|new|next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|o|omapc|omapclear|on|only|open|opt|options|ou|ounmap|p|pc|pclose|pe|ped|pedit|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|print|prof|profd|profdel|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|ptN|ptNext|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|py|pyf|pyfile|python|q|qa|qall|quit|quita|quitall|r|read|rec|recover|red|redi|redir|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|ru|rub|ruby|rubyd|rubydo|rubyf|rubyfile|runtime|rv|rviminfo|sN|sNext|sa|sal|sall|san|sandbox|sargument|sav|saveas|sb|sbN|sbNext|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbp|sbprevious|sbr|sbrewind|sbuffer|scrip|scripte|scriptencoding|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sl|sla|slast|sleep|sm|smagic|smap|smapc|smapclear|sme|smenu|sn|snext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|so|sor|sort|source|sp|spe|spelld|spelldump|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|split|spr|sprevious|sre|srewind|st|sta|stag|star|startg|startgreplace|startinsert|startr|startreplace|stj|stjump|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tN|tNext|ta|tab|tabN|tabNext|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabn|tabnew|tabnext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tmenu|tn|tnext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tunmenu|u|una|unabbreviate|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|ve|verb|verbose|version|vert|vertical|vi|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|w|wN|wNext|wa|wall|wh|while|win|winc|wincmd|windo|winp|winpos|winsize|wn|wnext|wp|wprevious|wq|wqa|wqall|write|ws|wsverb|wv|wviminfo|x|xa|xall|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
  builtin:
    /\b(?:acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autocmd|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|t_AB|t_AF|t_AL|t_CS|t_CV|t_Ce|t_Co|t_Cs|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_IE|t_IS|t_K1|t_K3|t_K4|t_K5|t_K6|t_K7|t_K8|t_K9|t_KA|t_KB|t_KC|t_KD|t_KE|t_KF|t_KG|t_KH|t_KI|t_KJ|t_KK|t_KL|t_RI|t_RV|t_SI|t_Sb|t_Sf|t_WP|t_WS|t_ZH|t_ZR|t_al|t_bc|t_cd|t_ce|t_cl|t_cm|t_cs|t_da|t_db|t_dl|t_fs|t_k1|t_k2|t_k3|t_k4|t_k5|t_k6|t_k7|t_k8|t_k9|t_kB|t_kD|t_kI|t_kN|t_kP|t_kb|t_kd|t_ke|t_kh|t_kl|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_se|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_xs|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww)\b/,
  number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
  operator:
    /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
  punctuation: /[{}[\](),;:]/
}
Prism.languages.wasm = {
  comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
  string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
  keyword: [
    { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
    {
      pattern:
        /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|neg?|nearest|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|sqrt|store(?:8|16|32)?|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
      inside: { punctuation: /\./ }
    },
    /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/
  ],
  variable: /\$[\w!#$%&'*+\-./:<=>?@\\^`|~]+/,
  number:
    /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
  punctuation: /[()]/
}
!(function (a) {
  function e(e, n) {
    a.languages[e] &&
      a.languages.insertBefore(e, 'comment', { 'doc-comment': n })
  }
  const n = a.languages.markup.tag
  const t = {
    pattern: /\/\/\/.*/,
    greedy: !0,
    alias: 'comment',
    inside: { tag: n }
  }
  const g = {
    pattern: /'''.*/,
    greedy: !0,
    alias: 'comment',
    inside: { tag: n }
  }
  e('csharp', t), e('fsharp', t), e('vbnet', g)
})(Prism)
!(function (e) {
  const n = /[*&][^\s[\]{},]+/
  const r =
    /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/
  const t =
    '(?:' +
    r.source +
    '(?:[ \t]+' +
    n.source +
    ')?|' +
    n.source +
    '(?:[ \t]+' +
    r.source +
    ')?)'
  const a =
    '(?:[^\\s\\x00-\\x08\\x0e-\\x1f!"#%&\'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*'.replace(
      /<PLAIN>/g,
      function () {
        return '[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]'
      }
    )
  const d = '"(?:[^"\\\\\r\n]|\\\\.)*"|\'(?:[^\'\\\\\r\n]|\\\\.)*\''
  function o(e, n) {
    n = (n || '').replace(/m/g, '') + 'm'
    const r =
      '([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\\]|\\}|(?:[\r\n]\\s*)?#))'
        .replace(/<<prop>>/g, function () {
          return t
        })
        .replace(/<<value>>/g, function () {
          return e
        })
    return RegExp(r, n)
  }
  ;(e.languages.yaml = {
    scalar: {
      pattern: RegExp(
        '([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\\S[^\r\n]*(?:\\2[^\r\n]+)*)'.replace(
          /<<prop>>/g,
          function () {
            return t
          }
        )
      ),
      lookbehind: !0,
      alias: 'string'
    },
    comment: /#.*/,
    key: {
      pattern: RegExp(
        '((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\\s*:\\s)'
          .replace(/<<prop>>/g, function () {
            return t
          })
          .replace(/<<key>>/g, function () {
            return '(?:' + a + '|' + d + ')'
          })
      ),
      lookbehind: !0,
      greedy: !0,
      alias: 'atrule'
    },
    directive: { pattern: /(^[ \t]*)%.+/m, lookbehind: !0, alias: 'important' },
    datetime: {
      pattern: o(
        '\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?'
      ),
      lookbehind: !0,
      alias: 'number'
    },
    boolean: {
      pattern: o('false|true', 'i'),
      lookbehind: !0,
      alias: 'important'
    },
    null: { pattern: o('null|~', 'i'), lookbehind: !0, alias: 'important' },
    string: { pattern: o(d), lookbehind: !0, greedy: !0 },
    number: {
      pattern: o(
        '[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)',
        'i'
      ),
      lookbehind: !0
    },
    tag: r,
    important: n,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./
  }),
    (e.languages.yml = e.languages.yaml)
})(Prism)
!(function () {
  if (
    typeof Prism !== 'undefined' &&
    typeof document !== 'undefined' &&
    document.querySelector
  ) {
    let e
    const t = 'line-numbers'
    var i = 'linkable-line-numbers'
    const n = /\n(?!$)/g
    var r = !0
    Prism.plugins.lineHighlight = {
      highlightLines: function (o, u, c) {
        const h = (u =
          typeof u === 'string' ? u : o.getAttribute('data-line') || '')
          .replace(/\s+/g, '')
          .split(',')
          .filter(Boolean)
        const d = +o.getAttribute('data-line-offset') || 0
        const f = (
          (function () {
            if (void 0 === e) {
              const t = document.createElement('div')
              ;(t.style.fontSize = '13px'),
                (t.style.lineHeight = '1.5'),
                (t.style.padding = '0'),
                (t.style.border = '0'),
                (t.innerHTML = '&nbsp;<br />&nbsp;'),
                document.body.appendChild(t),
                (e = t.offsetHeight === 38),
                document.body.removeChild(t)
            }
            return e
          })()
            ? parseInt
            : parseFloat
        )(getComputedStyle(o).lineHeight)
        const p = Prism.util.isActive(o, t)
        const g = o.querySelector('code')
        const m = p ? o : g || o
        const v = []
        const y = g.textContent.match(n)
        const b = y ? y.length + 1 : 1
        const A =
          g && m != g
            ? (function (e, t) {
                const i = getComputedStyle(e)
                const n = getComputedStyle(t)
                function r(e) {
                  return +e.substr(0, e.length - 2)
                }
                return (
                  t.offsetTop +
                  r(n.borderTopWidth) +
                  r(n.paddingTop) -
                  r(i.paddingTop)
                )
              })(o, g)
            : 0
        h.forEach(function (e) {
          const t = e.split('-')
          const i = +t[0]
          let n = +t[1] || i
          if (!((n = Math.min(b + d, n)) < i)) {
            const r =
              o.querySelector('.line-highlight[data-range="' + e + '"]') ||
              document.createElement('div')
            if (
              (v.push(function () {
                r.setAttribute('aria-hidden', 'true'),
                  r.setAttribute('data-range', e),
                  (r.className = (c || '') + ' line-highlight')
              }),
              p && Prism.plugins.lineNumbers)
            ) {
              const s = Prism.plugins.lineNumbers.getLine(o, i)
              const l = Prism.plugins.lineNumbers.getLine(o, n)
              if (s) {
                const a = s.offsetTop + A + 'px'
                v.push(function () {
                  r.style.top = a
                })
              }
              if (l) {
                const u = l.offsetTop - s.offsetTop + l.offsetHeight + 'px'
                v.push(function () {
                  r.style.height = u
                })
              }
            } else
              v.push(function () {
                r.setAttribute('data-start', String(i)),
                  n > i && r.setAttribute('data-end', String(n)),
                  (r.style.top = (i - d - 1) * f + A + 'px'),
                  (r.textContent = new Array(n - i + 2).join(' \n'))
              })
            v.push(function () {
              r.style.width = o.scrollWidth + 'px'
            }),
              v.push(function () {
                m.appendChild(r)
              })
          }
        })
        const P = o.id
        if (p && Prism.util.isActive(o, i) && P) {
          l(o, i) ||
            v.push(function () {
              o.classList.add(i)
            })
          const E = parseInt(o.getAttribute('data-start') || '1')
          s('.line-numbers-rows > span', o).forEach(function (e, t) {
            const i = t + E
            e.onclick = function () {
              const e = P + '.' + i
              ;(r = !1),
                (location.hash = e),
                setTimeout(function () {
                  r = !0
                }, 1)
            }
          })
        }
        return function () {
          v.forEach(a)
        }
      }
    }
    let o = 0
    Prism.hooks.add('before-sanity-check', function (e) {
      const t = e.element.parentElement
      if (u(t)) {
        let i = 0
        s('.line-highlight', t).forEach(function (e) {
          ;(i += e.textContent.length), e.parentNode.removeChild(e)
        }),
          i &&
            /^(?: \n)+$/.test(e.code.slice(-i)) &&
            (e.code = e.code.slice(0, -i))
      }
    }),
      Prism.hooks.add('complete', function e(i) {
        const n = i.element.parentElement
        if (u(n)) {
          clearTimeout(o)
          const r = Prism.plugins.lineNumbers
          const s = i.plugins && i.plugins.lineNumbers
          l(n, t) && r && !s
            ? Prism.hooks.add('line-numbers', e)
            : (Prism.plugins.lineHighlight.highlightLines(n)(),
              (o = setTimeout(c, 1)))
        }
      }),
      window.addEventListener('hashchange', c),
      window.addEventListener('resize', function () {
        s('pre')
          .filter(u)
          .map(function (e) {
            return Prism.plugins.lineHighlight.highlightLines(e)
          })
          .forEach(a)
      })
  }
  function s(e, t) {
    return Array.prototype.slice.call((t || document).querySelectorAll(e))
  }
  function l(e, t) {
    return e.classList.contains(t)
  }
  function a(e) {
    e()
  }
  function u(e) {
    return !!(
      e &&
      /pre/i.test(e.nodeName) &&
      (e.hasAttribute('data-line') || (e.id && Prism.util.isActive(e, i)))
    )
  }
  function c() {
    const e = location.hash.slice(1)
    s('.temporary.line-highlight').forEach(function (e) {
      e.parentNode.removeChild(e)
    })
    const t = (e.match(/\.([\d,-]+)$/) || [, ''])[1]
    if (t && !document.getElementById(e)) {
      const i = e.slice(0, e.lastIndexOf('.'))
      const n = document.getElementById(i)
      n &&
        (n.hasAttribute('data-line') || n.setAttribute('data-line', ''),
        Prism.plugins.lineHighlight.highlightLines(n, t, 'temporary ')(),
        r &&
          document.querySelector('.temporary.line-highlight').scrollIntoView())
    }
  }
})()
!(function () {
  if (typeof Prism !== 'undefined') {
    const i =
      /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&!$'()*,;@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/
    const n = /\b\S+@[\w.]+[a-z]{2}/
    const t = /\[([^\]]+)\]\(([^)]+)\)/
    const e = ['comment', 'url', 'attr-value', 'string']
    ;(Prism.plugins.autolinker = {
      processGrammar: function (r) {
        r &&
          !r['url-link'] &&
          (Prism.languages.DFS(r, function (r, a, l) {
            e.indexOf(l) > -1 &&
              !Array.isArray(a) &&
              (a.pattern || (a = this[r] = { pattern: a }),
              (a.inside = a.inside || {}),
              l == 'comment' && (a.inside['md-link'] = t),
              l == 'attr-value'
                ? Prism.languages.insertBefore(
                    'inside',
                    'punctuation',
                    { 'url-link': i },
                    a
                  )
                : (a.inside['url-link'] = i),
              (a.inside['email-link'] = n))
          }),
          (r['url-link'] = i),
          (r['email-link'] = n))
      }
    }),
      Prism.hooks.add('before-highlight', function (i) {
        Prism.plugins.autolinker.processGrammar(i.grammar)
      }),
      Prism.hooks.add('wrap', function (i) {
        if (/-link$/.test(i.type)) {
          i.tag = 'a'
          let n = i.content
          if (i.type == 'email-link' && n.indexOf('mailto:') != 0)
            n = 'mailto:' + n
          else if (i.type == 'md-link') {
            const e = i.content.match(t)
            ;(n = e[2]), (i.content = e[1])
          }
          i.attributes.href = n
          try {
            i.content = decodeURIComponent(i.content)
          } catch (i) {}
        }
      })
  }
})()
!(function () {
  if (typeof Prism !== 'undefined' && typeof document !== 'undefined') {
    const e = []
    const t = {}
    const n = function () {}
    Prism.plugins.toolbar = {}
    const a = (Prism.plugins.toolbar.registerButton = function (n, a) {
      let r
      ;(r =
        typeof a === 'function'
          ? a
          : function (e) {
              let t
              return (
                typeof a.onClick === 'function'
                  ? (((t = document.createElement('button')).type = 'button'),
                    t.addEventListener('click', function () {
                      a.onClick.call(this, e)
                    }))
                  : typeof a.url === 'string'
                    ? ((t = document.createElement('a')).href = a.url)
                    : (t = document.createElement('span')),
                a.className && t.classList.add(a.className),
                (t.textContent = a.text),
                t
              )
            }),
        n in t
          ? console.warn(
              'There is a button with the key "' + n + '" registered already.'
            )
          : e.push((t[n] = r))
    })
    const r = (Prism.plugins.toolbar.hook = function (a) {
      const r = a.element.parentNode
      if (
        r &&
        /pre/i.test(r.nodeName) &&
        !r.parentNode.classList.contains('code-toolbar')
      ) {
        const o = document.createElement('div')
        o.classList.add('code-toolbar'),
          r.parentNode.insertBefore(o, r),
          o.appendChild(r)
        const i = document.createElement('div')
        i.classList.add('toolbar')
        let l = e
        const d = (function (e) {
          for (; e; ) {
            let t = e.getAttribute('data-toolbar-order')
            if (t != null)
              return (t = t.trim()).length ? t.split(/\s*,\s*/g) : []
            e = e.parentElement
          }
        })(a.element)
        d &&
          (l = d.map(function (e) {
            return t[e] || n
          })),
          l.forEach(function (e) {
            const t = e(a)
            if (t) {
              const n = document.createElement('div')
              n.classList.add('toolbar-item'),
                n.appendChild(t),
                i.appendChild(n)
            }
          }),
          o.appendChild(i)
      }
    })
    a('label', function (e) {
      const t = e.element.parentNode
      if (t && /pre/i.test(t.nodeName) && t.hasAttribute('data-label')) {
        let n
        let a
        const r = t.getAttribute('data-label')
        try {
          a = document.querySelector('template#' + r)
        } catch (e) {}
        return (
          a
            ? (n = a.content)
            : (t.hasAttribute('data-url')
                ? ((n = document.createElement('a')).href =
                    t.getAttribute('data-url'))
                : (n = document.createElement('span')),
              (n.textContent = r)),
          n
        )
      }
    }),
      Prism.hooks.add('complete', r)
  }
})()
!(function () {
  function t(t) {
    const e = document.createElement('textarea')
    ;(e.value = t.getText()),
      (e.style.top = '0'),
      (e.style.left = '0'),
      (e.style.position = 'fixed'),
      document.body.appendChild(e),
      e.focus(),
      e.select()
    try {
      const o = document.execCommand('copy')
      setTimeout(function () {
        o ? t.success() : t.error()
      }, 1)
    } catch (e) {
      setTimeout(function () {
        t.error(e)
      }, 1)
    }
    document.body.removeChild(e)
  }
  typeof Prism !== 'undefined' &&
    typeof document !== 'undefined' &&
    (Prism.plugins.toolbar
      ? Prism.plugins.toolbar.registerButton('copy-to-clipboard', function (e) {
          const o = e.element
          const n = (function (t) {
            const e = {
              copy: 'Copy',
              'copy-error': 'Press Ctrl+C to copy',
              'copy-success': 'Copied!',
              'copy-timeout': 5e3
            }
            for (const o in e) {
              for (
                var n = 'data-prismjs-' + o, c = t;
                c && !c.hasAttribute(n);

              )
                c = c.parentElement
              c && (e[o] = c.getAttribute(n))
            }
            return e
          })(o)
          const c = document.createElement('button')
          ;(c.className = 'copy-to-clipboard-button'),
            c.setAttribute('type', 'button')
          const r = document.createElement('span')
          return (
            c.appendChild(r),
            u('copy'),
            (function (e, o) {
              e.addEventListener('click', function () {
                !(function (e) {
                  navigator.clipboard
                    ? navigator.clipboard
                        .writeText(e.getText())
                        .then(e.success, function () {
                          t(e)
                        })
                    : t(e)
                })(o)
              })
            })(c, {
              getText: function () {
                return o.textContent
              },
              success: function () {
                u('copy-success'), i()
              },
              error: function () {
                u('copy-error'),
                  setTimeout(function () {
                    !(function (t) {
                      window.getSelection().selectAllChildren(t)
                    })(o)
                  }, 1),
                  i()
              }
            }),
            c
          )
          function i() {
            setTimeout(function () {
              u('copy')
            }, n['copy-timeout'])
          }
          function u(t) {
            ;(r.textContent = n[t]), c.setAttribute('data-copy-state', t)
          }
        })
      : console.warn('Copy to Clipboard plugin loaded before Toolbar plugin.'))
})()
