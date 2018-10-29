
var k = { left: 37, up: 38, right: 39, down: 40, space: 32, enter: 13, tab: 9, shift: 16, esc: 27 },
dir = { 37: -1, 38: -1, 39: 1, 40: 1, 9: 1, 27: 9999 },
tabControl = function (id) {
    function addEventListeners(index) {
        tabs[index].addEventListener('click', selectTab);
        tabs[index].addEventListener('keydown', keyPress);
        tabs[index].index = index;
    }

    function keyPress(e) {
        var key = e.keyCode,
            f = dir[key];

        if (f) {
            var d = e.target.index;
            if (void 42 !== d) {
                if (key == k.tab) return;
                e.preventDefault();
                tabs[d + f] ? tabs[d + f].focus()
                :
                key === k.left || key === k.up ? tabs[lastTab].focus()
                :
                key !== k.right && key != k.down || tabs[0].focus()
            };
        };
    }
    function selectTab(e) {
        var s = e.target,
            tabPanel = s.getAttribute('aria-controls');
        for (t = 0; t < tabs.length; t++) {
            tabs[t].setAttribute('tabindex', '-1'),
            tabs[t].setAttribute('aria-selected', 'false'),
            panels[t].setAttribute('aria-hidden', 'true');
        };
        s.setAttribute('tabindex', '0'),
        s.setAttribute('aria-selected', 'true'),
        document.getElementById(tabPanel).setAttribute('aria-hidden', 'false'),
        s.focus();
    }

    var element = document.getElementById(id),
        tabs = (element.querySelectorAll('[role="tablist"]')[0], element.querySelectorAll('[role="tab"]')),
        lastTab = tabs.length - 1,
        panels = element.querySelectorAll('[role="tabpanel"]'), i;

    for (i = 0; i < tabs.length; ++i) addEventListeners(i)

},
menubarControl = function () {
    function keyPressListener(i) {
        items[i].addEventListener('keydown', function (e) { keyPress(e, i) });
    }
    function keyPress(e, i) {
        var key = e.keyCode,
            f = dir[key];
        if (f) {
            var d = items[i + f];
            if (void 42 !== d) {
                if (key == k.tab || key == k.up || key == k.down)
                    return;
                d && (e.preventDefault(), d.focus())
            }
            else key === k.left ? (e.preventDefault(),
                items[lastItem].focus())
            :
            key === k.right && (e.preventDefault(), items[0].focus())
        };
    }
    for (var element = document.getElementById('top-nav'),
        items = element.querySelectorAll('#top-nav  > ul > li > [role="menuitem"]'),
        lastItem = items.length - 1,
        i = 0;
     i < items.length; i++) keyPressListener(i)
},
dropdownMenu = function (id) {
    var element = document.getElementById(id),
        dropdownId = element.getAttribute('aria-controls'),
        dropdown = document.getElementById(dropdownId),
        items = dropdown.querySelectorAll('[role*="menuitem"]'),
        lastItem = items.length - 1;

    element.addEventListener('click', toggleMenu, false);
    element.addEventListener('keydown', btnKeyEvent, false);

    for (i = 0; i < items.length; ++i) {
        addMenuItemListener(i);
        items[i].classList.add('menuitem')
    };
    function addMenuItemListener(index) {
        items[index].addEventListener('keydown', menuKeyEvent);
        items[index].index = index;
    }
    function btnKeyEvent(e) {
        var key = e.keyCode;
        if (key == k.down) {
            if (dropdown.getAttribute('aria-hidden') == 'true') {
                e.preventDefault();
                toggleMenu(e);
            }
        }
        else if (key == k.space || key == k.enter) {
            e.preventDefault();
            toggleMenu(e);
        }
    }
    function menuKeyEvent(e) {
        var key = e.keyCode,
            direction = dir[key];
        if (e.shiftKey) {
            direction = (-1 * direction);
        }
        if (direction) {
            var d = e.target,
                itemIndex = d.index;
            if (key == k.left || key == k.right || key == k.esc) {
                closeMenu(e);
            }
            else if (itemIndex !== undefined) {
                if (items[itemIndex + direction]) {
                    e.preventDefault();
                    items[itemIndex + direction].focus();
                }
                else if (key == k.tab) {
                    closeMenu(e);
                }
                else if (key == k.up) {
                    e.preventDefault();
                    items[lastItem].focus();
                }
                else if (key == k.down) {
                    e.preventDefault();
                    items[0].focus();
                }
            };
        };
    }

    function toggleMenu(e) {
        var curState = dropdown.getAttribute('aria-hidden'),
        newState = (curState == 'true') ? "false" : "true";
        element.setAttribute('aria-expanded', curState);
        dropdown.setAttribute('aria-hidden', newState);
        if (curState) {
            e.preventDefault();
            items[0].focus();
            document.body.addEventListener('click', bodyClick, false);
        }
        else {
            element.focus();
            document.body.removeEventListener('click', bodyClick, false);
        }

    }
    function bodyClick(e) {
        if (e.target.id == id) {
            return;
        }
        else if (!e.target.classList.contains("menuitem")) {
            document.body.removeEventListener('click', bodyClick, false);
            closeMenu(e);
        }
    }
    function closeMenu(e) {
        element.setAttribute('aria-expanded', 'false');
        dropdown.setAttribute('aria-hidden', 'true');
        e.preventDefault();
        element.focus();
    }
},
tableSort = function (a) {
    function f(a, b, c, d, e) {
        var f = a.keyCode;
        if (f == k.enter || f == k.space) {
            var h = 1; a.preventDefault(),
            g(b, c, h, e)
        }
    }
    function g(a, b, c, d) {
        for (
            var f = a.tBodies[0],
            g = e.call(f.rows, 0),
            h = a.tHead.getElementsByTagName("th")[b],
            i = h.getAttribute("data-sort"),
            c = "ascending" == i ? -1 : 1,
            j = "ascending" == i ? "descending" : "ascending",
            i = j,
            k = 0; k < d; k++)
            a.tHead.getElementsByTagName("th")[k].setAttribute("aria-sort", "other");
        h.setAttribute("aria-sort", j),
        h.setAttribute("data-sort", j),
        g = g.sort(function (a, d) {
            return c * a.cells[b].textContent.trim().localeCompare(d.cells[b].textContent.trim())
        });
        for (var l = 0; l < g.length; ++l)
            f.appendChild(g[l])
    }
    var d,
        b = document.getElementById(a),
        c = b.tHead,
        e = Array.prototype.slice;
    if (c && (c = c.rows[0]) && (c = c.cells), c)
        for (d = c.length; --d >= 0;) (function (a) {
            var d = 1,
                e = c[a],
                h = document.createElement("span");
            e.addEventListener("click", function () { g(b, a, d = 1 - d, c.length) }),
            e.addEventListener("keydown", function (e) { f(e, b, a, d = 1 - d, c.length) }),
            e.setAttribute("data-sort", "none"),
            e.setAttribute("tabindex", "0"),
            e.setAttribute("aria-sort", "other"),
            e.appendChild(h)
        })(d)
},
accordion = function (a, b, c, d, e, f) {
    function l(a) {
        f && g.setAttribute("aria-multiselectable", "true"),
        h[a].setAttribute("aria-controls", e + "_" + c + "_" + a),
        h[a].setAttribute("aria-level", d),
        h[a].setAttribute("aria-expanded", "false"),
        h[a].setAttribute("role", "button"),
        i[a].setAttribute("id", e + "_" + c + "_" + a),
        i[a].setAttribute("tabindex", "-1"),
        h[a].addEventListener("click", n),
        h[a].addEventListener("keydown", function (a) { m(a) }),
        h[a].i = a
    }
    function m(a) {
        var b = a.keyCode, c = a.target, d = c.getAttribute("aria-controls"), e = c.getAttribute("aria-expanded"), f = "true" == e ? "false" : "true"; if (b == k.enter || b == k.space) if (a.preventDefault(), "true" == e) for (t = 0; t < h.length; t++) h[t].setAttribute("aria-expanded", "false"), i[t].setAttribute("aria-hidden", "true"); else if ("false" == e) { for (t = 0; t < h.length; t++) h[t].setAttribute("aria-expanded", "false"), i[t].setAttribute("aria-hidden", "true"); c.setAttribute("aria-expanded", f), document.getElementById(d).setAttribute("aria-hidden", "false") }
    }
    function n(a) {
        var b = a.target,
            c = b.getAttribute("aria-controls"),
            d = b.getAttribute("aria-expanded"),
            e = "true" == d ? "false" : "true";
        if ("true" == d)
            for (t = 0; t < h.length; t++)
                h[t].setAttribute("aria-expanded", "false"),
                i[t].setAttribute("aria-hidden", "true");
        else if ("false" == d) {
            for (t = 0; t < h.length; t++)
                h[t].setAttribute("aria-expanded", "false"),
                i[t].setAttribute("aria-hidden", "true");
            b.setAttribute("aria-expanded", e),
            document.getElementById(c).setAttribute("aria-hidden", "false")
        }
    }
    var j,
        g = document.getElementById(a),
        h = g.querySelectorAll(b),
        i = g.querySelectorAll(c);
    for (j = 0; j < h.length; ++j) l(j)
},
carousel = function (a, b, c, d) {
    function m() {
        clearInterval(l)
    }
    function n() {
        clearInterval(l);
        l = setInterval(o, j)
    }
    function o() {
        for (k == h - 1 ? k = 0 : k += 1, r = 0; r < h; r++)
            f[r].setAttribute("aria-expanded", "false"),
            f[r].setAttribute("tabindex", "-1"),
            f[r].setAttribute("aria-selected", "false"),
            g[r].setAttribute("aria-hidden", "true");
        f[k].setAttribute("aria-expanded", "true"),
        f[k].setAttribute("aria-selected", "true"),
        g[k].setAttribute("aria-hidden", "false"),
        f[k].setAttribute("tabindex", "0")
    }
    tabControl(a);
    var e = document.getElementById(a),
        f = e.querySelectorAll('[role="tab"]'),
        g = e.querySelectorAll('[role="tabpanel"]'),
        h = g.length,
        j = b ? b : 4000,
        c = document.getElementById(c),
        d = document.getElementById(d),
        k = 0,
        l = setInterval(o, j);
    for (i = 0; i < f.length; ++i)
        f[i].addEventListener("click", m);
    d.addEventListener("click", m),
    c.addEventListener("click", n)
},
card = function (a, b) {
    function g(a) {
        var b = a.target,
            c = b.getAttribute("data-target"),
            d = document.getElementById(c);
        for (i = 0; i < e.length; i++)
            e[i].setAttribute("aria-selected", "false"),
            f[i].setAttribute("aria-hidden", "true");
        d.setAttribute("aria-hidden", "false"),
        b.setAttribute("aria-selected", "true")
    }
    function h(a) {
        var b = a.keyCode;
        b != k.enter && b != k.space || (a.preventDefault(), g(a))
    }
    var d = (document.getElementById(a),
        document.getElementById(b)),
        e = d.querySelectorAll("li"),
        f = document.querySelectorAll('[id*="loadProfile"]');
    for (i = 0; i < e.length; i++)
        e[i].addEventListener("click", g),
        e[i].addEventListener("keydown", h)
},
imgEnlarger = function (a, b, c, d) {
    function i(a, b) {
        var c = a.keyCode;
        c == k.tab ? (a.preventDefault(), b.focus()) : c != k.space && c != k.enter || (a.preventDefault(), m(a))
    }
    function j(a) {
        var b = a.keyCode;
        b != k.space && b != k.enter || (a.preventDefault(), l())
    }
    function l() {
        e.setAttribute("aria-hidden", "false"), g.focus()
    }
    function m(a) {
        a.preventDefault(),
        h.focus(),
        e.setAttribute("aria-hidden", "true")
    }
    var e = document.getElementById(a),
        f = document.getElementById(b),
        g = document.getElementById(c),
        h = document.getElementById(d);
    f.addEventListener("keydown", function (a) { i(a, g) }),
    g.addEventListener("keydown", function (a) { i(a, f) }),
    f.addEventListener("click", function (a) { m(a) }),
    g.addEventListener("click", function (a) { m(a) }),
    h.addEventListener("keydown", function (a) { j(a) }),
    h.addEventListener("click", function (a) { l(a) })
},
errMsg = function () {
    var a = document.querySelectorAll('[required]');
    for (i = 0; i < a.length; i++) {
        var b = a[i].getAttribute('aria-describedby'), elemFocus = false;
        if(a[i].value == ""){
            document.getElementById(b).style.display = "block";
            if (elemFocus = false) {
                a[i].focus;
                elemFocus = true;
            }
        }
        else {
            b.style.display = "none";
        }
    }
};
