// Generated by CoffeeScript 1.4.0

(function(context, definition) {
  if ('function' === typeof require && typeof exports === typeof module) {
    return module.exports = definition;
  }
  return context.CoffeeTemplates = definition;
})(this, (function() {
  var C, y;
  y = function(v) {
    return (typeof v)[0];
  };
  C = function(o) {
    o = o || {};
    o.indent = (o.format || '') && (o.indent || '  ');
    o.newline = (o.format || '') && (o.newline || "\n");
    o.globals = o.globals || {};
    o.doctype = o.doctype || {
      '5': '<!doctype html>'
    };
    o.tags = o.tags || 'a abbr address article aside audio b bdi bdo blockquote body button canvas caption cite code colgroup command data datagrid datalist dd del details dfn div dl dt em embed eventsource fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup html i iframe ins kbd keygen label legend li mark map menu meter nav noscript object ol optgroup option output p pre progress q ruby rp rt s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr'.split(' ');
    o.atags = o.atags || 'area base br col hr img input link meta param'.split(' ');
    o.blocks = o.blocks || 'content_for yields'.split(' ');
    o.special = o.special || {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    this.o = o;
  };
  C.prototype.render = function(tf, i) {
    var atts, g, indent, l, o, t, x, _fn;
    t = '';
    l = 0;
    o = this.o;
    indent = (function(x) {
      return function() {
        return (new Array(l)).join(x);
      };
    })(o.indent);
    g = o.globals;
    g.tag = function(a, b, c, d) {
      return function() {
        var e, f, h, s, x;
        e = arguments;
        f = {};
        l++;
        s = '';
        for (x in e) {
          s += y(e[x]);
        }
        if (s === 'sof' || s === 'sos' || s === 'so' || s === 'sf' || s === 'ss') {
          e[0].replace(/([#.][\w\d-_]+)/g, function(m) {
            var k='class';
            (m[0] === '.') && (f[k] = (f[k] || '') + (f[k] ? ' ' : '') + m.substr(1));
            (m[0] === '#') && (f.id = m.substr(1));
          });
        }
        (s === 'of' || s === 'os' || s === 'o') && (f = e[0]);
        (s === 'f' || s === 's') && (h = e[0]);
        if (s === 'sof' || s === 'sos' || s === 'so') {
          for (x in e[1]) {
            f[x] = e[1][x];
          }
          h = e[2];
        }
        (s === 'of' || s === 'os' || s === 'sf' || s === 'ss') && (h = e[1]);
        f = y(b) === 'f' ? b(f) : '';
        if (y(h) === 'f') {
          t += (function() {
            t = '';
            h.call(i);
            if (t !== '') {
              t = o.newline + t + indent();
            }
            return t = indent() + a + f + c + t + d + o.newline;
          })();
        } else {
          t += indent() + a + f + c + (y(h) === 'u' ? '' : o.escape ? g.h(h) : h) + d + o.newline;
        }
        return l--;
      };
    };
    g.block = function(s, f) {
      return g.tag('{{' + (o.handlebars ? '#' : '') + s, null, '}}', '{{/' + (s.split(/ +/)[0]) + '}}')(f);
    };
    g.h = function(s) {
      return ('' + s).replace(/[&<>"']/g, function(c) {
        return o.special[c] || c;
      });
    };
    g.text = function(s) {
      return t += o.escape ? g.h(s) : s;
    };
    g.literal = function(s) {
      return t += s;
    };
    g.coffeescript = function(f) {
      return g.script(('' + f).replace(/^function \(\) ?{\s*/, '').replace(/\s*}$/, ''));
    };
    g.doctype = function(v) {
      return t = o.doctype[v || 5] + o.newline + t;
    };
    g.comment = function(s, f) {
      return g.tag('<!--' + s, null, '', '-->')(f);
    };
    g.ie = function(s, f) {
      return g.tag('<!--[if ' + s + ']>', null, '', '<![endif]-->')(f);
    };
    atts = function(a) {
      var k, z;
      z = '';
      for (k in a) {
        z += y(a[k]) !== 'b' ? ' ' + k + '="' + (o.escape ? g.h(a[k]) : a[k]) + '"' : a[k] ? ' ' + k : '';
      }
      return z;
    };
    for (x in o.tags) {
      g[o.tags[x]] = g.tag('<' + o.tags[x], atts, '>', '</' + o.tags[x] + '>');
    }
    for (x in o.atags) {
      g[o.atags[x]] = g.tag('<' + o.atags[x], atts, '/>', '');
    }
    _fn = function(x) {
      return g[x] = function(s, f) {
        return g.block(x + ' ' + JSON.stringify(s), f);
      };
    };
    for (x in o.blocks) {
      _fn(o.blocks[x]);
    }
    (Function('g', '_i', 'with(g){(' + tf + ').call(_i)}'))(g, i);
    return t;
  };
  C.compile = function(t, wrap) {
    var a, b, c, d, e, f, ff, g, i, k, lvl, push, tokm, toks;
    if (wrap == null) {
      wrap = true;
    }
    lvl = 1;
    toks = [];
    tokm = {};
    t.replace(/\{\{([\/#]?[^ }]+)( [^}]+)?\}\}/g, function() {
      var a, b, cf, k, l, n, tok;
      a = arguments;
      cf = a[1][0] === '/';
      tok = {
        s: a[0],
        b: b = typeof a[2] === 'string',
        a: (b && a[2]) || '',
        v: b === cf,
        n: n = b === cf ? a[1] : a[1][0] === '/' || a[1][0] === '#' ? a[1].slice(1) : a[1],
        l: l = (b === cf && lvl) || (b && lvl++) || (cf && --lvl),
        x: a[3]
      };
      k = l + '.' + n;
      return !!((l === 1) && (cf && (toks[tokm[k]].o = tok)) || ((tok.v || tok.b) && (tokm[k] = toks.push(tok) - 1))) || a[0];
    });
    if (toks.length) {
      a = [];
      push = function(m, s) {
        if (a.length % 2 === m || a.length < 1) {
          a.push(s);
        } else {
          a[a.length - 1] += s;
        }
      };
      b = 0;
      g = t.length - 1;
      for (k in toks) {
        if (!(toks[k].l === 1)) {
          continue;
        }
        c = toks[k].x;
        d = c + toks[k].s.length;
        push(0, t.substr(b, c - b));
        if (toks[k].v) {
          push(1, toks[k].n);
          b = d;
        } else if (toks[k].b) {
          e = toks[k].o.x;
          f = e + toks[k].o.s.length;
          toks[k].a = toks[k].a.replace(/(^ *| *$)/, '').replace(/, *\((.+)\) *$/, function() {
            toks[k].c = arguments[1].split(/, */).join(',');
            return '';
          }).split(/, */).join(',').replace(/([\w\d]+):(.+)$/, '{$1:$2}');
          ff = t.substr(d, e - d);
          push(1, 'w(' + toks[k].n + ',[' + (toks[k].a ? toks[k].a + (ff ? ',' : '') : '') + (ff ? 'function(' + (toks[k].c || '') + '){o+=' + C.compile(ff, false) + '}' : '') + '])');
          b = f;
        }
      }
      if (g - b) {
        push(0, t.substr(b, g - b + 1));
      }
      t = '';
      for (i in a) {
        if (a.hasOwnProperty(i) && a[i] !== '') {
          t += (t ? '+' : '') + (i % 2 ? a[i] : JSON.stringify(a[i]));
        }
      }
    } else {
      t = JSON.stringify(t);
    }
    if (wrap) {
      return Function('g', 'with(g||{}){var o="",w=function(f,a){o="";f.apply(i, a);return o};return ' + t.replace('</script>', '<"+"/script>') + '}');
    } else {
      return t;
    }
  };
  C.compileAll = function(a) {
    var f, k, t;
    f = 'var o="",c={},content_for=function(s,f){c[s]=f},yields=function(s){if(c[s])c[s]()};with(g||{}){var partial=function(n,g){with(g||{}){var w=function(f,a){o="";f.apply(g, a);return o},t={}\n';
    for (k in a) {
      t = a[k];
      f += 't[' + JSON.stringify(k) + ']=function(){return ' + a[k].replace('</script>', '<"+"/script>') + "}\n";
    }
    return Function('n', 'g', f + 'o+=t[n]()}}}partial(n,g);return o');
  };
  return C;
})());
