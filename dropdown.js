// does dropdown have top or bottom?
// check if the elememt fits within closest scrollable parent and viewport
function isVisible(element) {
  var scrollParent = function(el) {
      // get parents
      var parents = function(node, ps) {
          return null === node.parentNode ? ps : parents(node.parentNode, ps.concat([node]));
        },
        // has overflow
        overflow = function(node) {
          var s = '';
          ['overflow', 'overflow-y', 'overflow-x'].forEach(function(n) {
            var css = getComputedStyle(node, null).getPropertyValue(n);
            s += s.indexOf(css) == -1 ? css : '';
          });
          return s;
        };
      // is scrollable
      if (el instanceof HTMLElement) {
        var ps = parents(el.parentNode, []),
          l = ps.length,
          i = 0;
        while (l--) {
          if (/(auto|scroll)/.test(overflow(ps[i]))) {
            return ps[i];
          }
          i++;
        }
        return window;
      }
    },
    eb = element.getBoundingClientRect().bottom;
  //console.log(element);
  var parent = scrollParent(element);
  //console.log(parent);
  var wb = (window.innerHeight || document.documentElement.clientHeight);
  var pb = parent.getBoundingClientRect().bottom;
  var visible = eb < pb && eb < wb;
  return visible;
}

// get elements
var select = document.querySelector('.select'),
  dropdown = document.querySelector('.dropdown');

// bind events to add/remove .top class
['onmouseover', 'onmouseout'].forEach(function(event) {
  select[event] = function() {
    dropdown.classList[!isVisible(dropdown) ? 'add' : 'remove']('top');
  }
});

//**stonedpebbles**//
