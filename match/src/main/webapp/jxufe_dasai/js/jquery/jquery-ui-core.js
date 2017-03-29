/**
 * Created by Administrator on 2017/2/19 0019.
 */
/*!
 * jQuery UI Core lib js
 * UI for faisco
 * Base On jQuery UI 1.8.24
 * URL:http://www.faisco.com
 * @Time 2012-10-29
 * @Last Update Time 2012-10-29
 *
 */
(function (b, e) {
    b.ui = b.ui || {};
    if (b.ui.version) {
        return
    }
    b.extend(b.ui, {
        version: "@VERSION",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    });
    b.fn.extend({
        propAttr: b.fn.prop || b.fn.attr,
        _focus: b.fn.focus,
        focus: function (f, g) {
            return typeof f === "number" ? this.each(function () {
                var h = this;
                setTimeout(function () {
                    b(h).focus();
                    if (g) {
                        g.call(h)
                    }
                }, f)
            }) : this._focus.apply(this, arguments)
        }, scrollParent: function () {
            var f;
            if ((b.ui.ie && (/(static|relative)/).test(this.css("position"))) || (/absolute/).test(this.css("position"))) {
                f = this.parents().filter(function () {
                    return (/(relative|absolute|fixed)/).test(b.css(this, "position")) && (/(auto|scroll)/).test(b.css(this, "overflow") + b.css(this, "overflow-y") + b.css(this, "overflow-x"))
                }).eq(0)
            } else {
                f = this.parents().filter(function () {
                    return (/(auto|scroll)/).test(b.css(this, "overflow") + b.css(this, "overflow-y") + b.css(this, "overflow-x"))
                }).eq(0)
            }
            return (/fixed/).test(this.css("position")) || !f.length ? b(document) : f
        }, zIndex: function (i) {
            if (i !== e) {
                return this.css("zIndex", i)
            }
            if (this.length) {
                var g = b(this[0]),
                    f, h;
                while (g.length && g[0] !== document) {
                    f = g.css("position");
                    if (f === "absolute" || f === "relative" || f === "fixed") {
                        h = parseInt(g.css("zIndex"), 10);
                        if (!isNaN(h) && h !== 0) {
                            return h
                        }
                    }
                    g = g.parent()
                }
            }
            return 0
        }, disableSelection: function () {
            return this.bind((b.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (f) {
                f.preventDefault()
            })
        }, enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        }
    });
    if (!b("<a>").outerWidth(1).jquery) {
        b.each(["Width", "Height"], function (h, f) {
            var g = f === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
                j = f.toLowerCase(),
                l = {
                    innerWidth: b.fn.innerWidth,
                    innerHeight: b.fn.innerHeight,
                    outerWidth: b.fn.outerWidth,
                    outerHeight: b.fn.outerHeight
                };

            function k(n, m, i, o) {
                b.each(g, function () {
                    m -= parseFloat(b.curCSS(n, "padding" + this, true)) || 0;
                    if (i) {
                        m -= parseFloat(b.curCSS(n, "border" + this + "Width", true)) || 0
                    }
                    if (o) {
                        m -= parseFloat(b.curCSS(n, "margin" + this, true)) || 0
                    }
                });
                return m
            }
            b.fn["inner" + f] = function (i) {
                if (i === e) {
                    return l["inner" + f].call(this)
                }
                return this.each(function () {
                    b(this).css(j, k(this, i) + "px")
                })
            };
            b.fn["outer" + f] = function (i, m) {
                if (typeof i !== "number") {
                    return l["outer" + f].call(this, i)
                }
                return this.each(function () {
                    b(this).css(j, k(this, i, true, m) + "px")
                })
            }
        })
    }

    function d(h, f) {
        var k = h.nodeName.toLowerCase();
        if ("area" === k) {
            var j = h.parentNode,
                i = j.name,
                g;
            if (!h.href || !i || j.nodeName.toLowerCase() !== "map") {
                return false
            }
            g = b("img[usemap=#" + i + "]")[0];
            return !!g && c(g)
        }
        return (/input|select|textarea|button|object/.test(k) ? !h.disabled : "a" == k ? h.href || f : f) && c(h)
    }

    function c(f) {
        return !b(f).parents().andSelf().filter(function () {
            return b.curCSS(this, "visibility") === "hidden" || b.expr.filters.hidden(this)
        }).length
    }
    b.extend(b.expr[":"], {
        data: b.expr.createPseudo ? b.expr.createPseudo(function (f) {
            return function (g) {
                return !!b.data(g, f)
            }
        }) : function (h, g, f) {
            return !!b.data(h, f[3])
        }, focusable: function (f) {
            return d(f, !isNaN(b.attr(f, "tabindex")))
        }, tabbable: function (h) {
            var f = b.attr(h, "tabindex"),
                g = isNaN(f);
            return (g || f >= 0) && d(h, !g)
        }
    });
    b(function () {
        var f = document.body,
            g = f.appendChild(g = document.createElement("div"));
        g.offsetHeight;
        b.extend(g.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        });
        b.support.minHeight = g.offsetHeight === 100;
        b.support.selectstart = "onselectstart" in g;
        f.removeChild(g).style.display = "none"
    });
    if (!b.curCSS) {
        b.curCSS = b.css
    }
    b.extend(b.ui, {
        plugin: {
            add: function (g, h, k) {
                var j = b.ui[g].prototype;
                for (var f in k) {
                    j.plugins[f] = j.plugins[f] || [];
                    j.plugins[f].push([h, k[f]])
                }
            }, call: function (f, h, g) {
                var k = f.plugins[h];
                if (!k || !f.element[0].parentNode) {
                    return
                }
                for (var j = 0; j < k.length; j++) {
                    if (f.options[k[j][0]]) {
                        k[j][1].apply(f.element, g)
                    }
                }
            }
        },
        contains: function (g, f) {
            return document.compareDocumentPosition ? g.compareDocumentPosition(f) & 16 : g !== f && g.contains(f)
        }, hasScroll: function (i, g) {
            if (b(i).css("overflow") === "hidden") {
                return false
            }
            var f = (g && g === "left") ? "scrollLeft" : "scrollTop",
                h = false;
            if (i[f] > 0) {
                return true
            }
            i[f] = 1;
            h = (i[f] > 0);
            i[f] = 0;
            return h
        }, isOverAxis: function (g, f, h) {
            return (g > f) && (g < (f + h))
        }, isOver: function (k, g, j, i, f, h) {
            return b.ui.isOverAxis(k, j, f) && b.ui.isOverAxis(g, i, h)
        }
    })
})(jQuery);
(function (c, e) {
    if (c.cleanData) {
        var d = c.cleanData;
        c.cleanData = function (f) {
            for (var g = 0, h;
                 (h = f[g]) != null; g++) {
                try {
                    c(h).triggerHandler("remove")
                } catch (j) {}
            }
            d(f)
        }
    } else {
        var b = c.fn.remove;
        c.fn.remove = function (f, g) {
            return this.each(function () {
                if (!g) {
                    if (!f || c.filter(f, [this]).length) {
                        c("*", this).add([this]).each(function () {
                            try {
                                c(this).triggerHandler("remove")
                            } catch (h) {}
                        })
                    }
                }
                return b.call(c(this), f, g)
            })
        }
    }
    c.widget = function (g, i, f) {
        var h = g.split(".")[0],
            k;
        g = g.split(".")[1];
        k = h + "-" + g;
        if (!f) {
            f = i;
            i = c.Widget
        }
        c.expr[":"][k] = function (l) {
            return !!c.data(l, g)
        };
        c[h] = c[h] || {};
        c[h][g] = function (l, m) {
            if (arguments.length) {
                this._createWidget(l, m)
            }
        };
        var j = new i();
        j.options = c.extend(true, {}, j.options);
        c[h][g].prototype = c.extend(true, j, {
            namespace: h,
            widgetName: g,
            widgetEventPrefix: c[h][g].prototype.widgetEventPrefix || g,
            widgetBaseClass: k
        }, f);
        c.widget.bridge(g, c[h][g])
    };
    c.widget.bridge = function (g, f) {
        c.fn[g] = function (j) {
            var h = typeof j === "string",
                i = Array.prototype.slice.call(arguments, 1),
                k = this;
            j = !h && i.length ? c.extend.apply(null, [true, j].concat(i)) : j;
            if (h && j.charAt(0) === "_") {
                return k
            }
            if (h) {
                this.each(function () {
                    var l = c.data(this, g),
                        m = l && c.isFunction(l[j]) ? l[j].apply(l, i) : l;
                    if (m !== l && m !== e) {
                        k = m;
                        return false
                    }
                })
            } else {
                this.each(function () {
                    var l = c.data(this, g);
                    if (l) {
                        l.option(j || {})._init()
                    } else {
                        c.data(this, g, new f(j, this))
                    }
                })
            }
            return k
        }
    };
    c.Widget = function (f, g) {
        if (arguments.length) {
            this._createWidget(f, g)
        }
    };
    c.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: false
        },
        _createWidget: function (g, h) {
            c.data(h, this.widgetName, this);
            this.element = c(h);
            this.options = c.extend(true, {}, this.options, this._getCreateOptions(), g);
            var f = this;
            this.element.bind("remove." + this.widgetName, function () {
                f.destroy()
            });
            this._create();
            this._trigger("create");
            this._init()
        }, _getCreateOptions: function () {
            return c.metadata && c.metadata.get(this.element[0])[this.widgetName]
        }, _create: function () {}, _init: function () {}, destroy: function () {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName);
            this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
        }, widget: function () {
            return this.element
        }, option: function (g, h) {
            var f = g;
            if (arguments.length === 0) {
                return c.extend({}, this.options)
            }
            if (typeof g === "string") {
                if (h === e) {
                    return this.options[g]
                }
                f = {};
                f[g] = h
            }
            this._setOptions(f);
            return this
        }, _setOptions: function (g) {
            var f = this;
            c.each(g, function (h, i) {
                f._setOption(h, i)
            });
            return this
        }, _setOption: function (f, g) {
            this.options[f] = g;
            if (f === "disabled") {
                this.widget()[g ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", g)
            }
            return this
        }, enable: function () {
            return this._setOption("disabled", false)
        }, disable: function () {
            return this._setOption("disabled", true)
        }, _trigger: function (f, g, h) {
            var k, j, i = this.options[f];
            h = h || {};
            g = c.Event(g);
            g.type = (f === this.widgetEventPrefix ? f : this.widgetEventPrefix + f).toLowerCase();
            g.target = this.element[0];
            j = g.originalEvent;
            if (j) {
                for (k in j) {
                    if (!(k in g)) {
                        g[k] = j[k]
                    }
                }
            }
            this.element.trigger(g, h);
            return !(c.isFunction(i) && i.call(this.element[0], g, h) === false || g.isDefaultPrevented())
        }
    }
})(jQuery);
(function (c, d) {
    var b = false;
    c(document).mouseup(function (f) {
        b = false
    });
    c.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var e = this;
            this.element.bind("mousedown." + this.widgetName, function (f) {
                return e._mouseDown(f)
            }).bind("click." + this.widgetName, function (f) {
                if (true === c.data(f.target, e.widgetName + ".preventClickEvent")) {
                    c.removeData(f.target, e.widgetName + ".preventClickEvent");
                    f.stopImmediatePropagation();
                    return false
                }
            });
            this.started = false
        }, _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName);
            if (this._mouseMoveDelegate) {
                c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            }
        }, _mouseDown: function (g) {
            if (b) {
                return
            }(this._mouseStarted && this._mouseUp(g));
            this._mouseDownEvent = g;
            var f = this,
                h = (g.which == 1),
                e = (typeof this.options.cancel == "string" && g.target.nodeName ? c(g.target).closest(this.options.cancel).length : false);
            if (!h || e || !this._mouseCapture(g)) {
                return true
            }
            this.mouseDelayMet = !this.options.delay;
            if (!this.mouseDelayMet) {
                this._mouseDelayTimer = setTimeout(function () {
                    f.mouseDelayMet = true
                }, this.options.delay)
            }
            if (this._mouseDistanceMet(g) && this._mouseDelayMet(g)) {
                this._mouseStarted = (this._mouseStart(g) !== false);
                if (!this._mouseStarted) {
                    g.preventDefault();
                    return true
                }
            }
            if (true === c.data(g.target, this.widgetName + ".preventClickEvent")) {
                c.removeData(g.target, this.widgetName + ".preventClickEvent")
            }
            this._mouseMoveDelegate = function (i) {
                return f._mouseMove(i)
            };
            this._mouseUpDelegate = function (i) {
                return f._mouseUp(i)
            };
            c(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
            g.preventDefault();
            b = true;
            return true
        }, _mouseMove: function (e) {
            if (c.browser.msie && !(document.documentMode >= 9) && !e.button) {
                return this._mouseUp(e)
            }
            if (this._mouseStarted) {
                this._mouseDrag(e);
                return e.preventDefault()
            }
            if (this._mouseDistanceMet(e) && this._mouseDelayMet(e)) {
                this._mouseStarted = (this._mouseStart(this._mouseDownEvent, e) !== false);
                (this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e))
            }
            return !this._mouseStarted
        }, _mouseUp: function (e) {
            c(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            if (this._mouseStarted) {
                this._mouseStarted = false;
                if (e.target == this._mouseDownEvent.target) {
                    c.data(e.target, this.widgetName + ".preventClickEvent", true)
                }
                this._mouseStop(e)
            }
            return false
        }, _mouseDistanceMet: function (e) {
            return (Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance)
        }, _mouseDelayMet: function (e) {
            return this.mouseDelayMet
        }, _mouseStart: function (e) {}, _mouseDrag: function (e) {}, _mouseStop: function (e) {}, _mouseCapture: function (e) {
            return true
        }
    })
})(jQuery);
(function (b, c) {
    b.widget("ui.sortable", b.ui.mouse, {
        widgetEventPrefix: "sort",
        ready: false,
        options: {
            appendTo: "parent",
            axis: false,
            connectWith: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            dropOnEmpty: true,
            forcePlaceholderSize: false,
            forceHelperSize: false,
            grid: false,
            handle: false,
            helper: "original",
            items: "> *",
            opacity: false,
            placeholder: false,
            revert: false,
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1000,
            scrollParent: "default"
        },
        _create: function () {
            var d = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? d.axis === "x" || (/left|right/).test(this.items[0].item.css("float")) || (/inline|table-cell/).test(this.items[0].item.css("display")) : false;
            this.offset = this.element.offset();
            this._mouseInit();
            this.ready = true
        }, destroy: function () {
            b.Widget.prototype.destroy.call(this);
            this.element.removeClass("ui-sortable ui-sortable-disabled");
            this._mouseDestroy();
            for (var d = this.items.length - 1; d >= 0; d--) {
                this.items[d].item.removeData(this.widgetName + "-item")
            }
            return this
        }, _setOption: function (d, e) {
            if (d === "disabled") {
                this.options[d] = e;
                this.widget()[e ? "addClass" : "removeClass"]("ui-sortable-disabled")
            } else {
                b.Widget.prototype._setOption.apply(this, arguments)
            }
        }, _mouseCapture: function (h, i) {
            var g = this;
            if (this.reverting) {
                return false
            }
            if (this.options.disabled || this.options.type == "static") {
                return false
            }
            this._refreshItems(h);
            var f = null,
                e = this,
                d = b(h.target).parents().each(function () {
                    if (b.data(this, g.widgetName + "-item") == e) {
                        f = b(this);
                        return false
                    }
                });
            if (b.data(h.target, g.widgetName + "-item") == e) {
                f = b(h.target)
            }
            if (!f) {
                return false
            }
            if (this.options.handle && !i) {
                var j = false;
                b(this.options.handle, f).find("*").andSelf().each(function () {
                    if (this == h.target) {
                        j = true
                    }
                });
                if (!j) {
                    return false
                }
            }
            this.currentItem = f;
            this._removeCurrentsFromItems();
            return true
        }, _mouseStart: function (g, h, d) {
            var j = this.options,
                e = this;
            this.currentContainer = this;
            this._trigger("beforeStart", g, this._uiHash());
            this._refreshItems(g);
            this.refreshPositions();
            this.helper = this._createHelper(g);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this._getScrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            b.extend(this.offset, {
                click: {
                    left: g.pageX - this.offset.left,
                    top: g.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition = this.helper.css("position");
            this.originalPosition = this._generatePosition(g);
            this.originalPageX = g.pageX;
            this.originalPageY = g.pageY;
            (j.cursorAt && this._adjustOffsetFromHelper(j.cursorAt));
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            if (this.helper[0] != this.currentItem[0]) {
                this.currentItem.hide()
            }
            this._createPlaceholder();
            if (j.containment) {
                this._setContainment()
            }
            if (j.cursor) {
                if (b("body").css("cursor")) {
                    this._storedCursor = b("body").css("cursor")
                }
                b("body").css("cursor", j.cursor)
            }
            if (j.opacity) {
                if (this.helper.css("opacity")) {
                    this._storedOpacity = this.helper.css("opacity")
                }
                this.helper.css("opacity", j.opacity)
            }
            if (j.zIndex) {
                if (this.helper.css("zIndex")) {
                    this._storedZIndex = this.helper.css("zIndex")
                }
                this.helper.css("zIndex", j.zIndex)
            }
            if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                this.overflowOffset = this.scrollParent.offset()
            }
            this._trigger("start", g, this._uiHash());
            if (!this._preserveHelperProportions) {
                this._cacheHelperProportions()
            }
            if (!d) {
                for (var f = this.containers.length - 1; f >= 0; f--) {
                    this.containers[f]._trigger("activate", g, e._uiHash(this))
                }
            }
            if (b.ui.ddmanager) {
                b.ui.ddmanager.current = this
            }
            if (b.ui.ddmanager && !j.dropBehaviour) {
                b.ui.ddmanager.prepareOffsets(this, g)
            }
            this.dragging = true;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(g);
            return true
        }, _mouseDrag: function (h) {
            this.position = this._generatePosition(h);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.lastPositionAbs) {
                this.lastPositionAbs = this.positionAbs
            }
            if (this.options.scroll) {
                var j = this.options,
                    d = false;
                if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
                    if ((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - h.pageY < j.scrollSensitivity) {
                        this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop + j.scrollSpeed
                    } else {
                        if (h.pageY - this.overflowOffset.top < j.scrollSensitivity) {
                            this.scrollParent[0].scrollTop = d = this.scrollParent[0].scrollTop - j.scrollSpeed
                        }
                    } if ((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - h.pageX < j.scrollSensitivity) {
                        this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft + j.scrollSpeed
                    } else {
                        if (h.pageX - this.overflowOffset.left < j.scrollSensitivity) {
                            this.scrollParent[0].scrollLeft = d = this.scrollParent[0].scrollLeft - j.scrollSpeed
                        }
                    }
                } else {
                    if (h.pageY - b(document).scrollTop() < j.scrollSensitivity) {
                        d = b(document).scrollTop(b(document).scrollTop() - j.scrollSpeed)
                    } else {
                        if (b(window).height() - (h.pageY - b(document).scrollTop()) < j.scrollSensitivity) {
                            d = b(document).scrollTop(b(document).scrollTop() + j.scrollSpeed)
                        }
                    } if (h.pageX - b(document).scrollLeft() < j.scrollSensitivity) {
                        d = b(document).scrollLeft(b(document).scrollLeft() - j.scrollSpeed)
                    } else {
                        if (b(window).width() - (h.pageX - b(document).scrollLeft()) < j.scrollSensitivity) {
                            d = b(document).scrollLeft(b(document).scrollLeft() + j.scrollSpeed)
                        }
                    }
                } if (d !== false && b.ui.ddmanager && !j.dropBehaviour) {
                    b.ui.ddmanager.prepareOffsets(this, h)
                }
            }
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            for (var f = this.items.length - 1; f >= 0; f--) {
                var g = this.items[f],
                    e = g.item[0],
                    k = this._intersectsWithPointer(g);
                if (!k) {
                    continue
                }
                if (g.instance !== this.currentContainer) {
                    continue
                }
                if (e != this.currentItem[0] && this.placeholder[k == 1 ? "next" : "prev"]()[0] != e && !b.ui.contains(this.placeholder[0], e) && (this.options.type == "semi-dynamic" ? !b.ui.contains(this.element[0], e) : true)) {
                    this.direction = k == 1 ? "down" : "up";
                    if (this.options.tolerance == "pointer" || this._intersectsWithSides(g)) {
                        this._rearrange(h, g)
                    } else {
                        break
                    }
                    this._trigger("change", h, this._uiHash());
                    break
                }
            }
            this._contactContainers(h);
            if (b.ui.ddmanager) {
                b.ui.ddmanager.drag(this, h)
            }
            this._trigger("sort", h, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return false
        }, _mouseStop: function (e, f) {
            if (!e) {
                return
            }
            if (b.ui.ddmanager && !this.options.dropBehaviour) {
                b.ui.ddmanager.drop(this, e)
            }
            if (this.options.revert) {
                var d = this;
                var g = d.placeholder.offset();
                d.reverting = true;
                b(this.helper).animate({
                    left: g.left - this.offset.parent.left - d.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: g.top - this.offset.parent.top - d.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function () {
                    d._clear(e)
                })
            } else {
                this._clear(e, f)
            }
            return false
        }, cancel: function () {
            var d = this;
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                if (this.options.helper == "original") {
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else {
                    this.currentItem.show()
                }
                for (var e = this.containers.length - 1; e >= 0; e--) {
                    this.containers[e]._trigger("deactivate", null, d._uiHash(this));
                    if (this.containers[e].containerCache.over) {
                        this.containers[e]._trigger("out", null, d._uiHash(this));
                        this.containers[e].containerCache.over = 0
                    }
                }
            }
            if (this.placeholder) {
                if (this.placeholder[0].parentNode) {
                    this.placeholder[0].parentNode.removeChild(this.placeholder[0])
                }
                if (this.options.helper != "original" && this.helper && this.helper[0].parentNode) {
                    this.helper.remove()
                }
                b.extend(this, {
                    helper: null,
                    dragging: false,
                    reverting: false,
                    _noFinalSort: null
                });
                if (this.domPosition.prev) {
                    b(this.domPosition.prev).after(this.currentItem)
                } else {
                    b(this.domPosition.parent).prepend(this.currentItem)
                }
            }
            return this
        }, serialize: function (f) {
            var d = this._getItemsAsjQuery(f && f.connected);
            var e = [];
            f = f || {};
            b(d).each(function () {
                var g = (b(f.item || this).attr(f.attribute || "id") || "").match(f.expression || (/(.+)[-=_](.+)/));
                if (g) {
                    e.push((f.key || g[1] + "[]") + "=" + (f.key && f.expression ? g[1] : g[2]))
                }
            });
            if (!e.length && f.key) {
                e.push(f.key + "=")
            }
            return e.join("&")
        }, toArray: function (f) {
            var d = this._getItemsAsjQuery(f && f.connected);
            var e = [];
            f = f || {};
            d.each(function () {
                e.push(b(f.item || this).attr(f.attribute || "id") || "")
            });
            return e
        }, _intersectsWith: function (n) {
            var f = this.positionAbs.left,
                e = f + this.helperProportions.width,
                m = this.positionAbs.top,
                k = m + this.helperProportions.height;
            var g = n.left,
                d = g + n.width,
                o = n.top,
                j = o + n.height;
            var p = this.offset.click.top,
                i = this.offset.click.left;
            var h = (m + p) > o && (m + p) < j && (f + i) > g && (f + i) < d;
            if (this.options.tolerance == "pointer" || this.options.forcePointerForContainers || (this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"])) {
                return h
            } else {
                return (g < f + (this.helperProportions.width / 2) && e - (this.helperProportions.width / 2) < d && o < m + (this.helperProportions.height / 2) && k - (this.helperProportions.height / 2) < j)
            }
        }, _intersectsWithPointer: function (f) {
            var g = (this.options.axis === "x") || b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, f.top, f.height),
                e = (this.options.axis === "y") || b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, f.left, f.width),
                i = g && e,
                d = this._getDragVerticalDirection(),
                h = this._getDragHorizontalDirection();
            if (!i) {
                return false
            }
            return this.floating ? (((h && h == "right") || d == "down") ? 2 : 1) : (d && (d == "down" ? 2 : 1))
        }, _intersectsWithSides: function (g) {
            var e = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, g.top + (g.height / 2), g.height),
                f = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, g.left + (g.width / 2), g.width),
                d = this._getDragVerticalDirection(),
                h = this._getDragHorizontalDirection();
            if (this.floating && h) {
                return ((h == "right" && f) || (h == "left" && !f))
            } else {
                return d && ((d == "down" && e) || (d == "up" && !e))
            }
        }, _getDragVerticalDirection: function () {
            var d = this.positionAbs.top - this.lastPositionAbs.top;
            return d != 0 && (d > 0 ? "down" : "up")
        }, _getDragHorizontalDirection: function () {
            var d = this.positionAbs.left - this.lastPositionAbs.left;
            return d != 0 && (d > 0 ? "right" : "left")
        }, refresh: function (d) {
            this._refreshItems(d);
            this.refreshPositions();
            return this
        }, _connectWith: function () {
            var d = this.options;
            return d.connectWith.constructor == String ? [d.connectWith] : d.connectWith
        }, _getItemsAsjQuery: function (d) {
            var n = this;
            var k = [];
            var g = [];
            var l = this._connectWith();
            if (l && d) {
                for (var f = l.length - 1; f >= 0; f--) {
                    var m = b(l[f]);
                    for (var e = m.length - 1; e >= 0; e--) {
                        var h = b.data(m[e], this.widgetName);
                        if (h && h != this && !h.options.disabled) {
                            g.push([b.isFunction(h.options.items) ? h.options.items.call(h.element) : b(h.options.items, h.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), h])
                        }
                    }
                }
            }
            g.push([b.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : b(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (var f = g.length - 1; f >= 0; f--) {
                g[f][0].each(function () {
                    k.push(this)
                })
            }
            return b(k)
        }, _removeCurrentsFromItems: function () {
            var f = this.currentItem.find(":data(" + this.widgetName + "-item)");
            for (var e = 0; e < this.items.length; e++) {
                for (var d = 0; d < f.length; d++) {
                    if (typeof this.items[e] != "undefined" && f[d] == this.items[e].item[0]) {
                        this.items.splice(e, 1)
                    }
                }
            }
        }, _refreshItems: function (d) {
            this.items = [];
            this.containers = [this];
            var l = this.items;
            var r = this;
            var h = [
                [b.isFunction(this.options.items) ? this.options.items.call(this.element[0], d, {
                    item: this.currentItem
                }) : b(this.options.items, this.element), this]
            ];
            var n = this._connectWith();
            if (n && this.ready) {
                for (var g = n.length - 1; g >= 0; g--) {
                    var o = b(n[g]);
                    for (var f = o.length - 1; f >= 0; f--) {
                        var k = b.data(o[f], this.widgetName);
                        if (k && k != this && !k.options.disabled) {
                            h.push([b.isFunction(k.options.items) ? k.options.items.call(k.element[0], d, {
                                item: this.currentItem
                            }) : b(k.options.items, k.element), k]);
                            this.containers.push(k)
                        }
                    }
                }
            }
            for (var g = h.length - 1; g >= 0; g--) {
                var m = h[g][1];
                var e = h[g][0];
                for (var f = 0, p = e.length; f < p; f++) {
                    var q = b(e[f]);
                    q.data(this.widgetName + "-item", m);
                    l.push({
                        item: q,
                        instance: m,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
                }
            }
        }, refreshPositions: function (d) {
            if (this.offsetParent && this.helper) {
                this.offset.parent = this._getParentOffset()
            }
            for (var f = this.items.length - 1; f >= 0; f--) {
                var g = this.items[f];
                if (g.instance != this.currentContainer && this.currentContainer && g.item[0] != this.currentItem[0]) {
                    continue
                }
                var e = this.options.toleranceElement ? b(this.options.toleranceElement, g.item) : g.item;
                if (!d) {
                    g.width = e.outerWidth();
                    g.height = e.outerHeight()
                }
                var h = e.offset();
                g.left = h.left;
                g.top = h.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) {
                this.options.custom.refreshContainers.call(this)
            } else {
                for (var f = this.containers.length - 1; f >= 0; f--) {
                    var h = this.containers[f].element.offset();
                    this.containers[f].containerCache.left = h.left;
                    this.containers[f].containerCache.top = h.top;
                    this.containers[f].containerCache.width = this.containers[f].element.outerWidth();
                    this.containers[f].containerCache.height = this.containers[f].element.outerHeight()
                }
            }
            return this
        }, _createPlaceholder: function (f) {
            var d = f || this,
                g = d.options;
            if (!g.placeholder || g.placeholder.constructor == String) {
                var e = g.placeholder;
                g.placeholder = {
                    element: function () {
                        var h = b(document.createElement(d.currentItem[0].nodeName)).addClass(e || d.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                        if (!e) {
                            h.style.visibility = "hidden"
                        }
                        return h
                    }, update: function (h, i) {
                        if (e && !g.forcePlaceholderSize) {
                            return
                        }
                        if (!i.height()) {
                            i.height(d.currentItem.innerHeight() - parseInt(d.currentItem.css("paddingTop") || 0, 10) - parseInt(d.currentItem.css("paddingBottom") || 0, 10))
                        }
                        if (!i.width()) {
                            i.width(d.currentItem.innerWidth() - parseInt(d.currentItem.css("paddingLeft") || 0, 10) - parseInt(d.currentItem.css("paddingRight") || 0, 10))
                        }
                    }
                }
            }
            d.placeholder = b(g.placeholder.element.call(d.element, d.currentItem));
            d.currentItem.after(d.placeholder);
            g.placeholder.update(d, d.placeholder)
        }, _contactContainers: function (d) {
            var f = null,
                m = null;
            for (var h = this.containers.length - 1; h >= 0; h--) {
                if (b.ui.contains(this.currentItem[0], this.containers[h].element[0])) {
                    continue
                }
                if (this._intersectsWith(this.containers[h].containerCache)) {
                    if (f && b.ui.contains(this.containers[h].element[0], f.element[0])) {
                        continue
                    }
                    f = this.containers[h];
                    m = h
                } else {
                    if (this.containers[h].containerCache.over) {
                        this.containers[h]._trigger("out", d, this._uiHash(this));
                        this.containers[h].containerCache.over = 0
                    }
                }
            }
            if (!f) {
                return
            }
            if (this.containers.length === 1) {
                this.containers[m]._trigger("over", d, this._uiHash(this));
                this.containers[m].containerCache.over = 1
            } else {
                if (this.currentContainer != this.containers[m]) {
                    var l = 10000;
                    var k = null;
                    var e = this.positionAbs[this.containers[m].floating ? "left" : "top"];
                    for (var g = this.items.length - 1; g >= 0; g--) {
                        if (!b.ui.contains(this.containers[m].element[0], this.items[g].item[0])) {
                            continue
                        }
                        var n = this.containers[m].floating ? this.items[g].item.offset().left : this.items[g].item.offset().top;
                        if (Math.abs(n - e) < l) {
                            l = Math.abs(n - e);
                            k = this.items[g];
                            this.direction = (n - e > 0) ? "down" : "up"
                        }
                    }
                    if (!k && !this.options.dropOnEmpty) {
                        return
                    }
                    this.currentContainer = this.containers[m];
                    k ? this._rearrange(d, k, null, true) : this._rearrange(d, null, this.containers[m].element, true);
                    this._trigger("change", d, this._uiHash());
                    this.containers[m]._trigger("change", d, this._uiHash(this));
                    this.options.placeholder.update(this.currentContainer, this.placeholder);
                    this.containers[m]._trigger("over", d, this._uiHash(this));
                    this.containers[m].containerCache.over = 1
                }
            }
        }, _createHelper: function (e) {
            var f = this.options;
            var d = b.isFunction(f.helper) ? b(f.helper.apply(this.element[0], [e, this.currentItem])) : (f.helper == "clone" ? this.currentItem.clone() : this.currentItem);
            if (!d.parents("body").length) {
                b(f.appendTo != "parent" ? f.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0])
            }
            if (d[0] == this.currentItem[0]) {
                this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }
            }
            if (d[0].style.width == "" || f.forceHelperSize) {
                d.width(this.currentItem.width())
            }
            if (d[0].style.height == "" || f.forceHelperSize) {
                d.height(this.currentItem.height())
            }
            return d
        }, _getScrollParent: function () {
            var d = this.options,
                e = d.scrollParent;
            return e != "default" ? b(e).eq(0) : this.helper.scrollParent()
        }, _adjustOffsetFromHelper: function (d) {
            if (typeof d == "string") {
                d = d.split(" ")
            }
            if (b.isArray(d)) {
                d = {
                    left: +d[0],
                    top: +d[1] || 0
                }
            }
            if ("left" in d) {
                this.offset.click.left = d.left + this.margins.left
            }
            if ("right" in d) {
                this.offset.click.left = this.helperProportions.width - d.right + this.margins.left
            }
            if ("top" in d) {
                this.offset.click.top = d.top + this.margins.top
            }
            if ("bottom" in d) {
                this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top
            }
        }, _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var d = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                d.left += this.scrollParent.scrollLeft();
                d.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie)) {
                d = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        }, _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var d = this.currentItem.position();
                return {
                    top: d.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: d.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        }, _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.currentItem.css("marginLeft"), 10) || 0),
                top: (parseInt(this.currentItem.css("marginTop"), 10) || 0)
            }
        }, _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        }, _setContainment: function () {
            var g = this.options;
            if (g.containment == "parent") {
                g.containment = this.helper[0].parentNode
            }
            if (g.containment == "document" || g.containment == "window") {
                this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, b(g.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b(g.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(g.containment)) {
                var e = b(g.containment)[0];
                var f = b(g.containment).offset();
                var d = (b(e).css("overflow") != "hidden");
                this.containment = [f.left + (parseInt(b(e).css("borderLeftWidth"), 10) || 0) + (parseInt(b(e).css("paddingLeft"), 10) || 0) - this.margins.left, f.top + (parseInt(b(e).css("borderTopWidth"), 10) || 0) + (parseInt(b(e).css("paddingTop"), 10) || 0) - this.margins.top, f.left + (d ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(b(e).css("borderLeftWidth"), 10) || 0) - (parseInt(b(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, f.top + (d ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(b(e).css("borderTopWidth"), 10) || 0) - (parseInt(b(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
            }
        }, _convertPositionTo: function (h, j) {
            if (!j) {
                j = this.position
            }
            var f = h == "absolute" ? 1 : -1;
            var g = this.options,
                e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = (/(html|body)/i).test(e[0].tagName);
            return {
                top: (j.top + this.offset.relative.top * f + this.offset.parent.top * f - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : e.scrollTop())) * f)),
                left: (j.left + this.offset.relative.left * f + this.offset.parent.left * f - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : e.scrollLeft()) * f))
            }
        }, _generatePosition: function (g) {
            var j = this.options,
                d = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                k = (/(html|body)/i).test(d[0].tagName);
            if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
                this.offset.relative = this._getRelativeOffset()
            }
            var f = g.pageX;
            var e = g.pageY;
            if (this.originalPosition) {
                if (this.containment) {
                    if (g.pageX - this.offset.click.left < this.containment[0]) {
                        f = this.containment[0] + this.offset.click.left
                    }
                    if (g.pageY - this.offset.click.top < this.containment[1]) {
                        e = this.containment[1] + this.offset.click.top
                    }
                    if (g.pageX - this.offset.click.left > this.containment[2]) {
                        f = this.containment[2] + this.offset.click.left
                    }
                    if (g.pageY - this.offset.click.top > this.containment[3]) {
                        e = this.containment[3] + this.offset.click.top
                    }
                }
                if (j.grid) {
                    var i = this.originalPageY + Math.round((e - this.originalPageY) / j.grid[1]) * j.grid[1];
                    e = this.containment ? (!(i - this.offset.click.top < this.containment[1] || i - this.offset.click.top > this.containment[3]) ? i : (!(i - this.offset.click.top < this.containment[1]) ? i - j.grid[1] : i + j.grid[1])) : i;
                    var h = this.originalPageX + Math.round((f - this.originalPageX) / j.grid[0]) * j.grid[0];
                    f = this.containment ? (!(h - this.offset.click.left < this.containment[0] || h - this.offset.click.left > this.containment[2]) ? h : (!(h - this.offset.click.left < this.containment[0]) ? h - j.grid[0] : h + j.grid[0])) : h
                }
            }
            return {
                top: (e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (k ? 0 : d.scrollTop())))),
                left: (f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : k ? 0 : d.scrollLeft())))
            }
        }, _rearrange: function (j, h, e, g) {
            e ? e[0].appendChild(this.placeholder[0]) : h.item[0].parentNode.insertBefore(this.placeholder[0], (this.direction == "down" ? h.item[0] : h.item[0].nextSibling));
            this.counter = this.counter ? ++this.counter : 1;
            var f = this,
                d = this.counter;
            window.setTimeout(function () {
                if (d == f.counter) {
                    f.refreshPositions(!g)
                }
            }, 0)
        }, _clear: function (f, g) {
            this.reverting = false;
            var h = [],
                d = this;
            if (!this._noFinalSort && this.currentItem.parent().length) {
                this.placeholder.before(this.currentItem)
            }
            this._noFinalSort = null;
            if (this.helper[0] == this.currentItem[0]) {
                for (var e in this._storedCSS) {
                    if (this._storedCSS[e] == "auto" || this._storedCSS[e] == "static") {
                        this._storedCSS[e] = ""
                    }
                }
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else {
                this.currentItem.show()
            } if (this.fromOutside && !g) {
                h.push(function (i) {
                    this._trigger("receive", i, this._uiHash(this.fromOutside))
                })
            }
            if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !g) {
                h.push(function (i) {
                    this._trigger("update", i, this._uiHash())
                })
            }
            if (this !== this.currentContainer) {
                if (!g) {
                    h.push(function (i) {
                        this._trigger("remove", i, this._uiHash())
                    });
                    h.push((function (i) {
                        return function (j) {
                            i._trigger("receive", j, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer));
                    h.push((function (i) {
                        return function (j) {
                            i._trigger("update", j, this._uiHash(this))
                        }
                    }).call(this, this.currentContainer))
                }
            }
            for (var e = this.containers.length - 1; e >= 0; e--) {
                if (!g) {
                    h.push((function (i) {
                        return function (j) {
                            i._trigger("deactivate", j, this._uiHash(this))
                        }
                    }).call(this, this.containers[e]))
                }
                if (this.containers[e].containerCache.over) {
                    h.push((function (i) {
                        return function (j) {
                            i._trigger("out", j, this._uiHash(this))
                        }
                    }).call(this, this.containers[e]));
                    this.containers[e].containerCache.over = 0
                }
            }
            if (this._storedCursor) {
                b("body").css("cursor", this._storedCursor)
            }
            if (this._storedOpacity) {
                this.helper.css("opacity", this._storedOpacity)
            }
            if (this._storedZIndex) {
                this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
            }
            this.dragging = false;
            if (this.cancelHelperRemoval) {
                if (!g) {
                    this._trigger("beforeStop", f, this._uiHash());
                    for (var e = 0; e < h.length; e++) {
                        h[e].call(this, f)
                    }
                    this._trigger("stop", f, this._uiHash())
                }
                this.fromOutside = false;
                return false
            }
            if (!g) {
                this._trigger("beforeStop", f, this._uiHash())
            }
            if (this.placeholder[0].parentNode) {
                this.placeholder[0].parentNode.removeChild(this.placeholder[0])
            }
            if (this.helper[0] != this.currentItem[0]) {
                this.helper.remove()
            }
            this.helper = null;
            if (!g) {
                for (var e = 0; e < h.length; e++) {
                    h[e].call(this, f)
                }
                this._trigger("stop", f, this._uiHash())
            }
            this.fromOutside = false;
            return true
        }, _trigger: function () {
            if (b.Widget.prototype._trigger.apply(this, arguments) === false) {
                this.cancel()
            }
        }, _uiHash: function (e) {
            var d = e || this;
            return {
                helper: d.helper,
                placeholder: d.placeholder || b([]),
                position: d.position,
                originalPosition: d.originalPosition,
                offset: d.positionAbs,
                item: d.currentItem,
                sender: e ? e.element : null
            }
        }
    });
    b.extend(b.ui.sortable, {
        version: "@VERSION"
    })
})(jQuery);
(function (b, c) {
    b.widget("ui.draggable", b.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: true,
            appendTo: "parent",
            axis: false,
            connectToSortable: false,
            containment: false,
            cursor: "auto",
            cursorAt: false,
            grid: false,
            handle: false,
            helper: "original",
            iframeFix: false,
            opacity: false,
            refreshPositions: false,
            revert: false,
            revertDuration: 500,
            scope: "default",
            scroll: true,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: false,
            snapMode: "both",
            snapTolerance: 20,
            stack: false,
            zIndex: false
        },
        _create: function () {
            if (this.options.helper == "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
                this.element[0].style.position = "relative"
            }(this.options.addClasses && this.element.addClass("ui-draggable"));
            (this.options.disabled && this.element.addClass("ui-draggable-disabled"));
            this._mouseInit()
        }, destroy: function () {
            if (!this.element.data("draggable")) {
                return
            }
            this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy();
            return this
        }, _mouseCapture: function (d) {
            var e = this.options;
            if (this.helper || e.disabled || b(d.target).is(".ui-resizable-handle") || b(d.target).parent().is(".ui-resizable-handle")) {
                return false
            }
            this.handle = this._getHandle(d);
            if (!this.handle) {
                return false
            }
            if (e.iframeFix) {
                b(e.iframeFix === true ? "iframe" : e.iframeFix).each(function () {
                    b('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                        width: this.offsetWidth + "px",
                        height: this.offsetHeight + "px",
                        position: "absolute",
                        opacity: "0.001",
                        zIndex: 1000
                    }).css(b(this).offset()).appendTo("body")
                })
            }
            return true
        }, _mouseStart: function (d) {
            var e = this.options;
            this.helper = this._createHelper(d);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            this._trigger("beforeStart", d, this._uiHash());
            if (b.ui.ddmanager) {
                b.ui.ddmanager.current = this
            }
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            b.extend(this.offset, {
                click: {
                    left: d.pageX - this.offset.left,
                    top: d.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(d);
            this.originalPageX = d.pageX;
            this.originalPageY = d.pageY;
            (e.cursorAt && this._adjustOffsetFromHelper(e.cursorAt));
            if (e.containment) {
                this._setContainment()
            }
            if (this._trigger("start", d) === false) {
                this._clear();
                return false
            }
            this._cacheHelperProportions();
            if (b.ui.ddmanager && !e.dropBehaviour) {
                b.ui.ddmanager.prepareOffsets(this, d)
            }
            this._mouseDrag(d, true);
            if (b.ui.ddmanager) {
                b.ui.ddmanager.dragStart(this, d)
            }
            return true
        }, _mouseDrag: function (d, f) {
            this.position = this._generatePosition(d);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!f) {
                var e = this._uiHash();
                if (this._trigger("drag", d, e) === false) {
                    this._mouseUp({});
                    return false
                }
                this.position = e.position
            }
            if (!this.options.axis || this.options.axis != "y") {
                this.helper[0].style.left = this.position.left + "px"
            }
            if (!this.options.axis || this.options.axis != "x") {
                this.helper[0].style.top = this.position.top + "px"
            }
            if (b.ui.ddmanager) {
                b.ui.ddmanager.drag(this, d)
            }
            return false
        }, _mouseStop: function (f) {
            var h = false;
            if (b.ui.ddmanager && !this.options.dropBehaviour) {
                h = b.ui.ddmanager.drop(this, f)
            }
            if (this.dropped) {
                h = this.dropped;
                this.dropped = false
            }
            var e = this.element[0],
                g = false;
            while (e && (e = e.parentNode)) {
                if (e == document) {
                    g = true
                }
            }
            if (!g && this.options.helper === "original") {
                return false
            }
            if ((this.options.revert == "invalid" && !h) || (this.options.revert == "valid" && h) || this.options.revert === true || (b.isFunction(this.options.revert) && this.options.revert.call(this.element, h))) {
                var d = this;
                b(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    if (d._trigger("stop", f) !== false) {
                        d._clear()
                    }
                })
            } else {
                if (this._trigger("stop", f) !== false) {
                    this._clear()
                }
            }
            return false
        }, _mouseUp: function (d) {
            b("div.ui-draggable-iframeFix").each(function () {
                this.parentNode.removeChild(this)
            });
            if (b.ui.ddmanager) {
                b.ui.ddmanager.dragStop(this, d)
            }
            return b.ui.mouse.prototype._mouseUp.call(this, d)
        }, cancel: function () {
            if (this.helper.is(".ui-draggable-dragging")) {
                this._mouseUp({})
            } else {
                this._clear()
            }
            return this
        }, _getHandle: function (d) {
            var e = !this.options.handle || !b(this.options.handle, this.element).length ? true : false;
            b(this.options.handle, this.element).find("*").andSelf().each(function () {
                if (this == d.target) {
                    e = true
                }
            });
            return e
        }, _createHelper: function (e) {
            var f = this.options;
            var d = b.isFunction(f.helper) ? b(f.helper.apply(this.element[0], [e])) : (f.helper == "clone" ? this.element.clone().removeAttr("id") : this.element);
            if (!d.parents("body").length) {
                d.appendTo((f.appendTo == "parent" ? this.element[0].parentNode : f.appendTo))
            }
            if (d[0] != this.element[0] && !(/(fixed|absolute)/).test(d.css("position"))) {
                d.css("position", "absolute")
            }
            return d
        }, _adjustOffsetFromHelper: function (d) {
            if (typeof d == "string") {
                d = d.split(" ")
            }
            if (b.isArray(d)) {
                d = {
                    left: +d[0],
                    top: +d[1] || 0
                }
            }
            if ("left" in d) {
                this.offset.click.left = d.left + this.margins.left
            }
            if ("right" in d) {
                this.offset.click.left = this.helperProportions.width - d.right + this.margins.left
            }
            if ("top" in d) {
                this.offset.click.top = d.top + this.margins.top
            }
            if ("bottom" in d) {
                this.offset.click.top = this.helperProportions.height - d.bottom + this.margins.top
            }
        }, _getParentOffset: function () {
            this.offsetParent = this.helper.offsetParent();
            var d = this.offsetParent.offset();
            if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
                d.left += this.scrollParent.scrollLeft();
                d.top += this.scrollParent.scrollTop()
            }
            if ((this.offsetParent[0] == document.body) || (this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie)) {
                d = {
                    top: 0,
                    left: 0
                }
            }
            return {
                top: d.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: d.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        }, _getRelativeOffset: function () {
            if (this.cssPosition == "relative") {
                var d = this.element.position();
                return {
                    top: d.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: d.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            } else {
                return {
                    top: 0,
                    left: 0
                }
            }
        }, _cacheMargins: function () {
            this.margins = {
                left: (parseInt(this.element.css("marginLeft"), 10) || 0),
                top: (parseInt(this.element.css("marginTop"), 10) || 0),
                right: (parseInt(this.element.css("marginRight"), 10) || 0),
                bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
            }
        }, _cacheHelperProportions: function () {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        }, _setContainment: function () {
            var g = this.options;
            if (g.containment == "parent") {
                g.containment = this.helper[0].parentNode
            }
            if (g.containment == "document" || g.containment == "window") {
                this.containment = [g.containment == "document" ? 0 : b(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, g.containment == "document" ? 0 : b(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (g.containment == "document" ? 0 : b(window).scrollLeft()) + b(g.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (g.containment == "document" ? 0 : b(window).scrollTop()) + (b(g.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
            }
            if (!(/^(document|window|parent)$/).test(g.containment) && g.containment.constructor != Array) {
                var h = b(g.containment);
                var e = h[0];
                if (!e) {
                    return
                }
                var f = h.offset();
                var d = (b(e).css("overflow") != "hidden");
                this.containment = [(parseInt(b(e).css("borderLeftWidth"), 10) || 0) + (parseInt(b(e).css("paddingLeft"), 10) || 0), (parseInt(b(e).css("borderTopWidth"), 10) || 0) + (parseInt(b(e).css("paddingTop"), 10) || 0), (d ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(b(e).css("borderLeftWidth"), 10) || 0) - (parseInt(b(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (d ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(b(e).css("borderTopWidth"), 10) || 0) - (parseInt(b(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom];
                this.relative_container = h
            } else {
                if (g.containment.constructor == Array) {
                    this.containment = g.containment
                }
            }
        }, _convertPositionTo: function (h, j) {
            if (!j) {
                j = this.position
            }
            var f = h == "absolute" ? 1 : -1;
            var g = this.options,
                e = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                i = (/(html|body)/i).test(e[0].tagName);
            return {
                top: (j.top + this.offset.relative.top * f + this.offset.parent.top * f - (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (i ? 0 : e.scrollTop())) * f)),
                left: (j.left + this.offset.relative.left * f + this.offset.parent.left * f - (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : i ? 0 : e.scrollLeft()) * f))
            }
        }, _generatePosition: function (e) {
            var f = this.options,
                m = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                j = (/(html|body)/i).test(m[0].tagName);
            var i = e.pageX;
            var h = e.pageY;
            if (this.originalPosition) {
                var d;
                if (this.containment) {
                    if (this.relative_container) {
                        var l = this.relative_container.offset();
                        d = [this.containment[0] + l.left, this.containment[1] + l.top, this.containment[2] + l.left, this.containment[3] + l.top]
                    } else {
                        d = this.containment
                    } if (e.pageX - this.offset.click.left < d[0]) {
                        i = d[0] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top < d[1]) {
                        h = d[1] + this.offset.click.top
                    }
                    if (e.pageX - this.offset.click.left > d[2]) {
                        i = d[2] + this.offset.click.left
                    }
                    if (e.pageY - this.offset.click.top > d[3]) {
                        h = d[3] + this.offset.click.top
                    }
                }
                if (f.grid) {
                    var k = f.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / f.grid[1]) * f.grid[1] : this.originalPageY;
                    h = d ? (!(k - this.offset.click.top < d[1] || k - this.offset.click.top > d[3]) ? k : (!(k - this.offset.click.top < d[1]) ? k - f.grid[1] : k + f.grid[1])) : k;
                    var g = f.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / f.grid[0]) * f.grid[0] : this.originalPageX;
                    i = d ? (!(g - this.offset.click.left < d[0] || g - this.offset.click.left > d[2]) ? g : (!(g - this.offset.click.left < d[0]) ? g - f.grid[0] : g + f.grid[0])) : g
                }
            }
            return {
                top: (h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : (j ? 0 : m.scrollTop())))),
                left: (i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && b.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : j ? 0 : m.scrollLeft())))
            }
        }, _clear: function () {
            this.helper.removeClass("ui-draggable-dragging");
            if (this.helper[0] != this.element[0] && !this.cancelHelperRemoval) {
                this.helper.remove()
            }
            this.helper = null;
            this.cancelHelperRemoval = false
        }, _trigger: function (d, e, f) {
            f = f || this._uiHash();
            b.ui.plugin.call(this, d, [e, f]);
            if (d == "drag") {
                this.positionAbs = this._convertPositionTo("absolute")
            }
            return b.Widget.prototype._trigger.call(this, d, e, f)
        }, plugins: {}, _uiHash: function (d) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    b.extend(b.ui.draggable, {
        version: "@VERSION"
    });
    b.ui.plugin.add("draggable", "connectToSortable", {
        start: function (e, g) {
            var f = b(this).data("draggable"),
                h = f.options,
                d = b.extend({}, g, {
                    item: f.element
                });
            f.sortables = [];
            b(h.connectToSortable).each(function () {
                var i = b.data(this, "sortable");
                if (i && !i.options.disabled) {
                    f.sortables.push({
                        instance: i,
                        shouldRevert: i.options.revert
                    });
                    i.refreshPositions();
                    i._trigger("activate", e, d)
                }
            })
        }, stop: function (e, g) {
            var f = b(this).data("draggable"),
                d = b.extend({}, g, {
                    item: f.element
                });
            b.each(f.sortables, function () {
                if (this.instance.isOver) {
                    this.instance.isOver = 0;
                    f.cancelHelperRemoval = true;
                    this.instance.cancelHelperRemoval = false;
                    if (this.shouldRevert) {
                        this.instance.options.revert = true
                    }
                    this.instance._mouseStop(e);
                    this.instance.options.helper = this.instance.options._helper;
                    if (f.options.helper == "original") {
                        this.instance.currentItem.css({
                            top: "auto",
                            left: "auto"
                        })
                    }
                } else {
                    this.instance.cancelHelperRemoval = false;
                    this.instance._trigger("deactivate", e, d)
                }
            })
        }, drag: function (e, h) {
            var g = b(this).data("draggable"),
                d = this;
            var f = function (k) {
                var q = this.offset.click.top,
                    p = this.offset.click.left;
                var i = this.positionAbs.top,
                    m = this.positionAbs.left;
                var l = k.height,
                    n = k.width;
                var r = k.top,
                    j = k.left;
                return b.ui.isOver(i + q, m + p, r, j, l, n)
            };
            b.each(g.sortables, function (j) {
                this.instance.positionAbs = g.positionAbs;
                this.instance.helperProportions = g.helperProportions;
                this.instance.offset.click = g.offset.click;
                if (this.instance._intersectsWith(this.instance.containerCache)) {
                    if (!this.instance.isOver) {
                        this.instance.isOver = 1;
                        this.instance.currentItem = b(d).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", true);
                        this.instance.options._helper = this.instance.options.helper;
                        this.instance.options.helper = function () {
                            return h.helper[0]
                        };
                        e.target = this.instance.currentItem[0];
                        this.instance._mouseCapture(e, true);
                        this.instance._mouseStart(e, true, true);
                        this.instance.offset.click.top = g.offset.click.top;
                        this.instance.offset.click.left = g.offset.click.left;
                        this.instance.offset.parent.left -= g.offset.parent.left - this.instance.offset.parent.left;
                        this.instance.offset.parent.top -= g.offset.parent.top - this.instance.offset.parent.top;
                        g._trigger("toSortable", e);
                        g.dropped = this.instance.element;
                        g.currentItem = g.element;
                        this.instance.fromOutside = g
                    }
                    if (this.instance.currentItem) {
                        this.instance._mouseDrag(e)
                    }
                } else {
                    if (this.instance.isOver) {
                        this.instance.isOver = 0;
                        this.instance.cancelHelperRemoval = true;
                        this.instance.options.revert = false;
                        this.instance._trigger("out", e, this.instance._uiHash(this.instance));
                        this.instance._mouseStop(e, true);
                        this.instance.options.helper = this.instance.options._helper;
                        this.instance.currentItem.remove();
                        if (this.instance.placeholder) {
                            this.instance.placeholder.remove()
                        }
                        g._trigger("fromSortable", e);
                        g.dropped = false
                    }
                }
            })
        }
    });
    b.ui.plugin.add("draggable", "cursor", {
        start: function (e, f) {
            var d = b("body"),
                g = b(this).data("draggable").options;
            if (d.css("cursor")) {
                g._cursor = d.css("cursor")
            }
            d.css("cursor", g.cursor)
        }, stop: function (d, e) {
            var f = b(this).data("draggable").options;
            if (f._cursor) {
                b("body").css("cursor", f._cursor)
            }
        }
    });
    b.ui.plugin.add("draggable", "opacity", {
        start: function (e, f) {
            var d = b(f.helper),
                g = b(this).data("draggable").options;
            if (d.css("opacity")) {
                g._opacity = d.css("opacity")
            }
            d.css("opacity", g.opacity)
        }, stop: function (d, e) {
            var f = b(this).data("draggable").options;
            if (f._opacity) {
                b(e.helper).css("opacity", f._opacity)
            }
        }
    });
    b.ui.plugin.add("draggable", "scroll", {
        start: function (e, f) {
            var d = b(this).data("draggable");
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                d.overflowOffset = d.scrollParent.offset()
            }
        }, drag: function (f, g) {
            var e = b(this).data("draggable"),
                h = e.options,
                d = false;
            if (e.scrollParent[0] != document && e.scrollParent[0].tagName != "HTML") {
                if (!h.axis || h.axis != "x") {
                    if ((e.overflowOffset.top + e.scrollParent[0].offsetHeight) - f.pageY < h.scrollSensitivity) {
                        e.scrollParent[0].scrollTop = d = e.scrollParent[0].scrollTop + h.scrollSpeed
                    } else {
                        if (f.pageY - e.overflowOffset.top < h.scrollSensitivity) {
                            e.scrollParent[0].scrollTop = d = e.scrollParent[0].scrollTop - h.scrollSpeed
                        }
                    }
                }
                if (!h.axis || h.axis != "y") {
                    if ((e.overflowOffset.left + e.scrollParent[0].offsetWidth) - f.pageX < h.scrollSensitivity) {
                        e.scrollParent[0].scrollLeft = d = e.scrollParent[0].scrollLeft + h.scrollSpeed
                    } else {
                        if (f.pageX - e.overflowOffset.left < h.scrollSensitivity) {
                            e.scrollParent[0].scrollLeft = d = e.scrollParent[0].scrollLeft - h.scrollSpeed
                        }
                    }
                }
            } else {
                if (!h.axis || h.axis != "x") {
                    if (f.pageY - b(document).scrollTop() < h.scrollSensitivity) {
                        d = b(document).scrollTop(b(document).scrollTop() - h.scrollSpeed)
                    } else {
                        if (b(window).height() - (f.pageY - b(document).scrollTop()) < h.scrollSensitivity) {
                            d = b(document).scrollTop(b(document).scrollTop() + h.scrollSpeed)
                        }
                    }
                }
                if (!h.axis || h.axis != "y") {
                    if (f.pageX - b(document).scrollLeft() < h.scrollSensitivity) {
                        d = b(document).scrollLeft(b(document).scrollLeft() - h.scrollSpeed)
                    } else {
                        if (b(window).width() - (f.pageX - b(document).scrollLeft()) < h.scrollSensitivity) {
                            d = b(document).scrollLeft(b(document).scrollLeft() + h.scrollSpeed)
                        }
                    }
                }
            } if (d !== false && b.ui.ddmanager && !h.dropBehaviour) {
                b.ui.ddmanager.prepareOffsets(e, f)
            }
        }
    });
    b.ui.plugin.add("draggable", "smartguides", {
        start: function (g, h) {
            var e = b(this).data("draggable"),
                k = e.options,
                j = k.tolerance;
            e.elements = [];
            e.guidesElements = [];
            Fai.top.$("#g_main").off("scroll.drag").on("scroll.drag", function () {
                f()
            });

            function f() {
                e.elements = [];
                b(k.smartguides.constructor != String ? (k.smartguides.items || ":data(draggable") : k.smartguides).each(function () {
                    var d = Fai.isIE8(),
                        i = b(this),
                        m = i.offset(),
                        n = this.getBoundingClientRect(),
                        l = d ? (n.bottom - n.top) : n.height,
                        p = d ? (n.right - n.left) : n.width,
                        r = m.top,
                        o = top + l;
                    if (i.hasClass("formStyle81")) {
                        l -= 10;
                        p -= 10
                    }
                    var q = b(window).height();
                    if (r >= q || o <= 0) {
                        return true
                    }
                    if (this != e.element[0]) {
                        e.elements.push({
                            item: this,
                            width: p,
                            height: l,
                            top: r,
                            left: m.left
                        })
                    }
                })
            }
            f()
        }, stop: function () {
            b("#absAlignTop, #absAlignRight, #absAlignBottom, #absAlignLeft").hide();
            b("#g_main").off("scroll.drag")
        }, drag: function (E, z) {
            var k = b(this).data("draggable"),
                A = k.options,
                K = A.tolerance,
                N = A.scale || 1;
            b("#absAlignTop, #absAlignRight, #absAlignBottom, #absAlignLeft").hide();
            var n = z.helper[0].getBoundingClientRect();
            var u = Fai.isIE8(),
                I = z.offset.left,
                C = u ? (n.right - n.left) : n.width,
                H = I + C,
                h = z.offset.top,
                y = u ? (n.bottom - n.top) : n.height,
                g = h + y;
            if (b(this).hasClass("formStyle81")) {
                I -= 10;
                h -= 10
            }
            var F = [h, g],
                w = [h, g],
                j = [I, H],
                e = [I, H],
                B = 0,
                f = 0,
                p = 0,
                M = 0;
            for (var G = k.elements.length - 1; G >= 0; G--) {
                var J = k.elements[G],
                    D = J.left,
                    x = D + J.width,
                    v = J.top,
                    L = v + J.height;
                var m = {
                    l: D,
                    r: x,
                    t: v,
                    b: L,
                    ls: Math.abs(D - H) <= K,
                    ls2: Math.abs(D - I) <= K,
                    rs: Math.abs(x - I) <= K,
                    rs2: Math.abs(x - H) <= K,
                    ts: Math.abs(v - g) <= K,
                    ts2: Math.abs(v - h) <= K,
                    bs: Math.abs(L - h) <= K,
                    bs2: Math.abs(L - g) <= K
                };
                q(m)
            }

            function q(Y) {
                var U = Y.type,
                    O = Y.l,
                    i = Y.r,
                    X = Y.t,
                    V = Y.b,
                    R = Y.ls,
                    P = Y.ls2,
                    Q = Y.rs,
                    S = Y.rs2,
                    T = Y.ts,
                    d = Y.ts2,
                    W = Y.bs,
                    o = Y.bs2;
                if (R) {
                    z.position.left = k._convertPositionTo("relative", {
                            top: 0,
                            left: O - C
                        }).left - k.margins.left;
                    w.push(X, V);
                    f = O
                }
                if (P) {
                    z.position.left = k._convertPositionTo("relative", {
                            top: 0,
                            left: O
                        }).left - k.margins.left;
                    F.push(X, V);
                    M = O
                }
                if (Q) {
                    z.position.left = k._convertPositionTo("relative", {
                            top: 0,
                            left: i
                        }).left - k.margins.left;
                    F.push(X, V);
                    M = i
                }
                if (S) {
                    z.position.left = k._convertPositionTo("relative", {
                            top: 0,
                            left: i - C
                        }).left - k.margins.left;
                    w.push(X, V);
                    f = i
                }
                if (T) {
                    z.position.top = k._convertPositionTo("relative", {
                            top: X - y,
                            left: 0
                        }).top - k.margins.top;
                    j.push(O, i);
                    B = X
                }
                if (d) {
                    z.position.top = k._convertPositionTo("relative", {
                            top: X,
                            left: 0
                        }).top - k.margins.top;
                    e.push(O, i);
                    p = X
                }
                if (W) {
                    z.position.top = k._convertPositionTo("relative", {
                            top: V,
                            left: 0
                        }).top - k.margins.top;
                    e.push(O, i);
                    p = V
                }
                if (o) {
                    z.position.top = k._convertPositionTo("relative", {
                            top: V - y,
                            left: 0
                        }).top - k.margins.top;
                    j.push(O, i);
                    B = V
                }
            }
            var s = Site.absAlignLine.commFunc;
            if (w.length > 2) {
                s.calLineSize("right", w);
                s.setAbsAlignLine("Right", f)
            }
            if (F.length > 2) {
                s.calLineSize("left", F);
                s.setAbsAlignLine("Left", M)
            }
            if (e.length > 2) {
                s.calLineSize("bottom", e);
                s.setAbsAlignLine("Bottom", p)
            }
            if (j.length > 2) {
                s.calLineSize("top", j);
                s.setAbsAlignLine("Top", B)
            }
        }
    });
    b.ui.plugin.add("draggable", "snap", {
        start: function (e, f) {
            var d = b(this).data("draggable"),
                g = d.options;
            d.snapElements = [];
            b(g.snap.constructor != String ? (g.snap.items || ":data(draggable)") : g.snap).each(function () {
                var i = b(this);
                var h = i.offset();
                if (this != d.element[0]) {
                    d.snapElements.push({
                        item: this,
                        width: i.outerWidth(),
                        height: i.outerHeight(),
                        top: h.top,
                        left: h.left
                    })
                }
            })
        }, drag: function (v, q) {
            var h = b(this).data("draggable"),
                s = h.options;
            var z = s.snapTolerance;
            var y = q.offset.left,
                x = y + h.helperProportions.width,
                g = q.offset.top,
                f = g + h.helperProportions.height;
            for (var w = h.snapElements.length - 1; w >= 0; w--) {
                var u = h.snapElements[w].left,
                    p = u + h.snapElements[w].width,
                    n = h.snapElements[w].top,
                    B = n + h.snapElements[w].height;
                if (!((u - z < y && y < p + z && n - z < g && g < B + z) || (u - z < y && y < p + z && n - z < f && f < B + z) || (u - z < x && x < p + z && n - z < g && g < B + z) || (u - z < x && x < p + z && n - z < f && f < B + z))) {
                    if (h.snapElements[w].snapping) {
                        (h.options.snap.release && h.options.snap.release.call(h.element, v, b.extend(h._uiHash(), {
                            snapItem: h.snapElements[w].item
                        })))
                    }
                    h.snapElements[w].snapping = false;
                    continue
                }
                if (s.snapMode != "inner") {
                    var e = Math.abs(n - f) <= z;
                    var A = Math.abs(B - g) <= z;
                    var k = Math.abs(u - x) <= z;
                    var m = Math.abs(p - y) <= z;
                    if (e) {
                        q.position.top = h._convertPositionTo("relative", {
                                top: n - h.helperProportions.height,
                                left: 0
                            }).top - h.margins.top
                    }
                    if (A) {
                        q.position.top = h._convertPositionTo("relative", {
                                top: B,
                                left: 0
                            }).top - h.margins.top
                    }
                    if (k) {
                        q.position.left = h._convertPositionTo("relative", {
                                top: 0,
                                left: u - h.helperProportions.width
                            }).left - h.margins.left
                    }
                    if (m) {
                        q.position.left = h._convertPositionTo("relative", {
                                top: 0,
                                left: p
                            }).left - h.margins.left
                    }
                }
                var j = (e || A || k || m);
                if (s.snapMode != "outer") {
                    var e = Math.abs(n - g) <= z;
                    var A = Math.abs(B - f) <= z;
                    var k = Math.abs(u - y) <= z;
                    var m = Math.abs(p - x) <= z;
                    if (e) {
                        q.position.top = h._convertPositionTo("relative", {
                                top: n,
                                left: 0
                            }).top - h.margins.top
                    }
                    if (A) {
                        q.position.top = h._convertPositionTo("relative", {
                                top: B - h.helperProportions.height,
                                left: 0
                            }).top - h.margins.top
                    }
                    if (k) {
                        q.position.left = h._convertPositionTo("relative", {
                                top: 0,
                                left: u
                            }).left - h.margins.left
                    }
                    if (m) {
                        q.position.left = h._convertPositionTo("relative", {
                                top: 0,
                                left: p - h.helperProportions.width
                            }).left - h.margins.left
                    }
                }
                if (!h.snapElements[w].snapping && (e || A || k || m || j)) {
                    (h.options.snap.snap && h.options.snap.snap.call(h.element, v, b.extend(h._uiHash(), {
                        snapItem: h.snapElements[w].item
                    })))
                }
                h.snapElements[w].snapping = (e || A || k || m || j)
            }
        }
    });
    b.ui.plugin.add("draggable", "stack", {
        start: function (e, f) {
            var h = b(this).data("draggable").options;
            var g = b.makeArray(b(h.stack)).sort(function (j, i) {
                return (parseInt(b(j).css("zIndex"), 10) || 0) - (parseInt(b(i).css("zIndex"), 10) || 0)
            });
            if (!g.length) {
                return
            }
            var d = parseInt(g[0].style.zIndex) || 0;
            b(g).each(function (j) {
                this.style.zIndex = d + j
            });
            this[0].style.zIndex = d + g.length
        }
    });
    b.ui.plugin.add("draggable", "zIndex", {
        start: function (e, f) {
            var d = b(f.helper),
                g = b(this).data("draggable").options;
            if (d.css("zIndex")) {
                g._zIndex = d.css("zIndex")
            }
            d.css("zIndex", g.zIndex)
        }, stop: function (d, e) {
            var f = b(this).data("draggable").options;
            if (f._zIndex) {
                b(e.helper).css("zIndex", f._zIndex)
            }
        }
    })
})(jQuery);
/*!
 * jQuery UI Autocomplete @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Autocomplete
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.position.js
 */
(function (b, c) {
    var d = 0;
    b.widget("ui.autocomplete", {
        options: {
            appendTo: "body",
            autoFocus: false,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null
        },
        pending: 0,
        _create: function () {
            var e = this,
                g = this.element[0].ownerDocument,
                f;
            this.isMultiLine = this.element.is("textarea");
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
                role: "textbox",
                "aria-autocomplete": "list",
                "aria-haspopup": "true"
            }).bind("keydown.autocomplete", function (h) {
                if (e.options.disabled || e.element.propAttr("readOnly")) {
                    return
                }
                f = false;
                var i = b.ui.keyCode;
                switch (h.keyCode) {
                    case i.PAGE_UP:
                        e._move("previousPage", h);
                        break;
                    case i.PAGE_DOWN:
                        e._move("nextPage", h);
                        break;
                    case i.UP:
                        e._keyEvent("previous", h);
                        break;
                    case i.DOWN:
                        e._keyEvent("next", h);
                        break;
                    case i.ENTER:
                    case i.NUMPAD_ENTER:
                        if (e.menu.active) {
                            f = true;
                            h.preventDefault()
                        }
                    case i.TAB:
                        if (!e.menu.active) {
                            return
                        }
                        e.menu.select(h);
                        break;
                    case i.ESCAPE:
                        e.element.val(e.term);
                        e.close(h);
                        break;
                    default:
                        clearTimeout(e.searching);
                        e.searching = setTimeout(function () {
                            if (e.term != e.element.val()) {
                                e.selectedItem = null;
                                e.search(null, h)
                            }
                        }, e.options.delay);
                        break
                }
            }).bind("keypress.autocomplete", function (h) {
                if (f) {
                    f = false;
                    h.preventDefault()
                }
            }).bind("focus.autocomplete", function () {
                if (e.options.disabled) {
                    return
                }
                e.selectedItem = null;
                e.previous = e.element.val()
            }).bind("blur.autocomplete", function (h) {
                if (e.options.disabled) {
                    return
                }
                clearTimeout(e.searching);
                e.closing = setTimeout(function () {
                    e.close(h);
                    e._change(h)
                }, 150)
            });
            this._initSource();
            this.menu = b("<ul></ul>").addClass("ui-autocomplete").appendTo(b(this.options.appendTo || "body", g)[0]).mousedown(function (h) {
                var i = e.menu.element[0];
                if (!b(h.target).closest(".ui-menu-item").length) {
                    setTimeout(function () {
                        b(document).one("mousedown", function (j) {
                            if (j.target !== e.element[0] && j.target !== i && !b.ui.contains(i, j.target)) {
                                e.close()
                            }
                        })
                    }, 1)
                }
                setTimeout(function () {
                    clearTimeout(e.closing)
                }, 13)
            }).menu({
                focus: function (i, j) {
                    var h = j.item.data("item.autocomplete");
                    if (false !== e._trigger("focus", i, {
                            item: h
                        })) {
                        if (/^key/.test(i.originalEvent.type)) {
                            e.element.val(h.value)
                        }
                    }
                }, selected: function (j, k) {
                    var i = k.item.data("item.autocomplete"),
                        h = e.previous;
                    if (e.element[0] !== g.activeElement) {
                        e.element.focus();
                        e.previous = h;
                        setTimeout(function () {
                            e.previous = h;
                            e.selectedItem = i
                        }, 1)
                    }
                    if (false !== e._trigger("select", j, {
                            item: i
                        })) {
                        e.element.val(i.value)
                    }
                    e.term = e.element.val();
                    e.close(j);
                    e.selectedItem = i
                }, blur: function (h, i) {
                    if (e.menu.element.is(":visible") && (e.element.val() !== e.term)) {
                        e.element.val(e.term)
                    }
                }
            }).zIndex(this.element.zIndex() + 1).css({
                top: 0,
                left: 0
            }).hide().data("menu");
            if (b.fn.bgiframe) {
                this.menu.element.bgiframe()
            }
            e.beforeunloadHandler = function () {
                e.element.removeAttr("autocomplete")
            };
            b(window).bind("beforeunload", e.beforeunloadHandler)
        }, destroy: function () {
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
            this.menu.element.remove();
            b(window).unbind("beforeunload", this.beforeunloadHandler);
            b.Widget.prototype.destroy.call(this)
        }, _setOption: function (e, f) {
            b.Widget.prototype._setOption.apply(this, arguments);
            if (e === "source") {
                this._initSource()
            }
            if (e === "appendTo") {
                this.menu.element.appendTo(b(f || "body", this.element[0].ownerDocument)[0])
            }
            if (e === "disabled" && f && this.xhr) {
                this.xhr.abort()
            }
        }, _initSource: function () {
            var e = this,
                g, f;
            if (b.isArray(this.options.source)) {
                g = this.options.source;
                this.source = function (i, h) {
                    h(b.ui.autocomplete.filter(g, i.term))
                }
            } else {
                if (typeof this.options.source === "string") {
                    f = this.options.source;
                    this.source = function (i, h) {
                        if (e.xhr) {
                            e.xhr.abort()
                        }
                        e.xhr = b.ajax({
                            url: f,
                            data: i,
                            dataType: "json",
                            success: function (k, j) {
                                h(k)
                            }, error: function () {
                                h([])
                            }
                        })
                    }
                } else {
                    this.source = this.options.source
                }
            }
        }, search: function (f, e) {
            f = f != null ? f : this.element.val();
            this.term = this.element.val();
            if (f.length < this.options.minLength) {
                return this.close(e)
            }
            clearTimeout(this.closing);
            if (this._trigger("search", e) === false) {
                return
            }
            return this._search(f)
        }, _search: function (e) {
            this.pending++;
            this.element.addClass("ui-autocomplete-loading");
            this.source({
                term: e
            }, this._response())
        }, _response: function () {
            var f = this,
                e = ++d;
            return function (g) {
                if (e === d) {
                    f.__response(g)
                }
                f.pending--;
                if (!f.pending) {
                    f.element.removeClass("ui-autocomplete-loading")
                }
            }
        }, __response: function (e) {
            if (!this.options.disabled && e && e.length) {
                e = this._normalize(e);
                this._suggest(e);
                this._trigger("open")
            } else {
                this.close()
            }
        }, close: function (e) {
            clearTimeout(this.closing);
            if (this.menu.element.is(":visible")) {
                this.menu.element.hide();
                this.menu.deactivate();
                this._trigger("close", e)
            }
        }, _change: function (e) {
            if (this.previous !== this.element.val()) {
                this._trigger("change", e, {
                    item: this.selectedItem
                })
            }
        }, _normalize: function (e) {
            if (e.length && e[0].label && e[0].value) {
                return e
            }
            return b.map(e, function (f) {
                if (typeof f === "string") {
                    return {
                        label: f,
                        value: f
                    }
                }
                return b.extend({
                    label: f.label || f.value,
                    value: f.value || f.label
                }, f)
            })
        }, _suggest: function (e) {
            var f = this.menu.element.empty().zIndex(this.element.zIndex() + 1);
            this._renderMenu(f, e);
            this.menu.deactivate();
            this.menu.refresh();
            f.show();
            this._resizeMenu();
            f.position(b.extend({
                of: this.element
            }, this.options.position));
            if (this.options.autoFocus) {
                this.menu.next(new b.Event("mouseover"))
            }
        }, _resizeMenu: function () {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
        }, _renderMenu: function (g, f) {
            var e = this;
            b.each(f, function (h, i) {
                e._renderItem(g, i)
            })
        }, _renderItem: function (g, h) {
            var f = h.label;
            if (typeof h.preLabel === "string" && h.preLabel.length > 0) {
                f = h.preLabel + f
            }
            var e = b("<a></a>").text(f);
            if (typeof h.title === "string" && h.title.length > 0) {
                e.attr("title", h.title)
            }
            return b("<li></li>").attr("title", h.label).data("item.autocomplete", h).append(e).appendTo(g)
        }, _move: function (f, e) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, e);
                return
            }
            if (this.menu.first() && /^previous/.test(f) || this.menu.last() && /^next/.test(f)) {
                this.element.val(this.term);
                this.menu.deactivate();
                return
            }
            this.menu[f](e)
        }, widget: function () {
            return this.menu.element
        }, _keyEvent: function (f, e) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) {
                this._move(f, e);
                e.preventDefault()
            }
        }
    });
    b.extend(b.ui.autocomplete, {
        escapeRegex: function (e) {
            return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
        }, filter: function (g, e) {
            var f = new RegExp(b.ui.autocomplete.escapeRegex(e), "i");
            return b.grep(g, function (h) {
                return f.test(h.label || h.value || h)
            })
        }
    })
}(jQuery));
(function (b) {
    b.widget("ui.menu", {
        _create: function () {
            var c = this;
            this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
                role: "listbox",
                "aria-activedescendant": "ui-active-menuitem"
            }).click(function (d) {
                if (!b(d.target).closest(".ui-menu-item a").length) {
                    return
                }
                d.preventDefault();
                c.select(d)
            });
            this.refresh()
        }, refresh: function () {
            var d = this;
            var c = this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem");
            c.children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (e) {
                d.activate(e, b(this).parent())
            }).mouseleave(function () {
                d.deactivate()
            })
        }, activate: function (f, e) {
            this.deactivate();
            if (this.hasScroll()) {
                var g = e.offset().top - this.element.offset().top,
                    c = this.element.scrollTop(),
                    d = this.element.height();
                if (g < 0) {
                    this.element.scrollTop(c + g)
                } else {
                    if (g >= d) {
                        this.element.scrollTop(c + g - d + e.height())
                    }
                }
            }
            this.active = e.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
            this._trigger("focus", f, {
                item: e
            })
        }, deactivate: function () {
            if (!this.active) {
                return
            }
            this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
            this._trigger("blur");
            this.active = null
        }, next: function (c) {
            this.move("next", ".ui-menu-item:first", c)
        }, previous: function (c) {
            this.move("prev", ".ui-menu-item:last", c)
        }, first: function () {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        }, last: function () {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        }, move: function (f, e, d) {
            if (!this.active) {
                this.activate(d, this.element.children(e));
                return
            }
            var c = this.active[f + "All"](".ui-menu-item").eq(0);
            if (c.length) {
                this.activate(d, c)
            } else {
                this.activate(d, this.element.children(e))
            }
        }, nextPage: function (e) {
            if (this.hasScroll()) {
                if (!this.active || this.last()) {
                    this.activate(e, this.element.children(".ui-menu-item:first"));
                    return
                }
                var f = this.active.offset().top,
                    d = this.element.height(),
                    c = this.element.children(".ui-menu-item").filter(function () {
                        var g = b(this).offset().top - f - d + b(this).height();
                        return g < 10 && g > -10
                    });
                if (!c.length) {
                    c = this.element.children(".ui-menu-item:last")
                }
                this.activate(e, c)
            } else {
                this.activate(e, this.element.children(".ui-menu-item").filter(!this.active || this.last() ? ":first" : ":last"))
            }
        }, previousPage: function (e) {
            if (this.hasScroll()) {
                if (!this.active || this.first()) {
                    this.activate(e, this.element.children(".ui-menu-item:last"));
                    return
                }
                var f = this.active.offset().top,
                    d = this.element.height(),
                    c = this.element.children(".ui-menu-item").filter(function () {
                        var g = b(this).offset().top - f + d - b(this).height();
                        return g < 10 && g > -10
                    });
                if (!c.length) {
                    c = this.element.children(".ui-menu-item:first")
                }
                this.activate(e, c)
            } else {
                this.activate(e, this.element.children(".ui-menu-item").filter(!this.active || this.first() ? ":last" : ":first"))
            }
        }, hasScroll: function () {
            return this.element.height() < this.element[b.fn.prop ? "prop" : "attr"]("scrollHeight")
        }, select: function (c) {
            this._trigger("selected", c, {
                item: this.active
            })
        }
    })
}(jQuery));
(function (h, i) {
    h.ui = h.ui || {};
    var e = /left|center|right/,
        f = /top|center|bottom/,
        b = "center",
        g = {},
        c = h.fn.position,
        d = h.fn.offset;
    h.fn.position = function (k) {
        if (!k || !k.of) {
            return c.apply(this, arguments)
        }
        k = h.extend({}, k);
        var o = h(k.of),
            n = o[0],
            q = (k.collision || "flip").split(" "),
            p = k.offset ? k.offset.split(" ") : [0, 0],
            m, j, l;
        if (n.nodeType === 9) {
            m = o.width();
            j = o.height();
            l = {
                top: 0,
                left: 0
            }
        } else {
            if (n.setTimeout) {
                m = o.width();
                j = o.height();
                l = {
                    top: o.scrollTop(),
                    left: o.scrollLeft()
                }
            } else {
                if (n.preventDefault) {
                    k.at = "left top";
                    m = j = 0;
                    l = {
                        top: k.of.pageY,
                        left: k.of.pageX
                    }
                } else {
                    m = o.outerWidth();
                    j = o.outerHeight();
                    l = o.offset()
                }
            }
        }
        h.each(["my", "at"], function () {
            var r = (k[this] || "").split(" ");
            if (r.length === 1) {
                r = e.test(r[0]) ? r.concat([b]) : f.test(r[0]) ? [b].concat(r) : [b, b]
            }
            r[0] = e.test(r[0]) ? r[0] : b;
            r[1] = f.test(r[1]) ? r[1] : b;
            k[this] = r
        });
        if (q.length === 1) {
            q[1] = q[0]
        }
        p[0] = parseInt(p[0], 10) || 0;
        if (p.length === 1) {
            p[1] = p[0]
        }
        p[1] = parseInt(p[1], 10) || 0;
        if (k.at[0] === "right") {
            l.left += m
        } else {
            if (k.at[0] === b) {
                l.left += m / 2
            }
        } if (k.at[1] === "bottom") {
            l.top += j
        } else {
            if (k.at[1] === b) {
                l.top += j / 2
            }
        }
        l.left += p[0];
        l.top += p[1];
        return this.each(function () {
            var u = h(this),
                w = u.outerWidth(),
                t = u.outerHeight(),
                v = parseInt(h.curCSS(this, "marginLeft", true)) || 0,
                s = parseInt(h.curCSS(this, "marginTop", true)) || 0,
                y = w + v + (parseInt(h.curCSS(this, "marginRight", true)) || 0),
                z = t + s + (parseInt(h.curCSS(this, "marginBottom", true)) || 0),
                x = h.extend({}, l),
                r;
            if (k.my[0] === "right") {
                x.left -= w
            } else {
                if (k.my[0] === b) {
                    x.left -= w / 2
                }
            } if (k.my[1] === "bottom") {
                x.top -= t
            } else {
                if (k.my[1] === b) {
                    x.top -= t / 2
                }
            } if (!g.fractions) {
                x.left = Math.round(x.left);
                x.top = Math.round(x.top)
            }
            r = {
                left: x.left - v,
                top: x.top - s
            };
            h.each(["left", "top"], function (B, A) {
                if (h.ui.position[q[B]]) {
                    h.ui.position[q[B]][A](x, {
                        targetWidth: m,
                        targetHeight: j,
                        elemWidth: w,
                        elemHeight: t,
                        collisionPosition: r,
                        collisionWidth: y,
                        collisionHeight: z,
                        offset: p,
                        my: k.my,
                        at: k.at
                    })
                }
            });
            if (h.fn.bgiframe) {
                u.bgiframe()
            }
            u.offset(h.extend(x, {
                using: k.using
            }))
        })
    };
    h.ui.position = {
        fit: {
            left: function (j, k) {
                var m = h(window),
                    l = k.collisionPosition.left + k.collisionWidth - m.width() - m.scrollLeft();
                j.left = l > 0 ? j.left - l : Math.max(j.left - k.collisionPosition.left, j.left)
            }, top: function (j, k) {
                var m = h(window),
                    l = k.collisionPosition.top + k.collisionHeight - m.height() - m.scrollTop();
                j.top = l > 0 ? j.top - l : Math.max(j.top - k.collisionPosition.top, j.top)
            }
        },
        flip: {
            left: function (k, m) {
                if (m.at[0] === b) {
                    return
                }
                var o = h(window),
                    n = m.collisionPosition.left + m.collisionWidth - o.width() - o.scrollLeft(),
                    j = m.my[0] === "left" ? -m.elemWidth : m.my[0] === "right" ? m.elemWidth : 0,
                    l = m.at[0] === "left" ? m.targetWidth : -m.targetWidth,
                    p = -2 * m.offset[0];
                k.left += m.collisionPosition.left < 0 ? j + l + p : n > 0 ? j + l + p : 0
            }, top: function (k, m) {
                if (m.at[1] === b) {
                    return
                }
                var o = h(window),
                    n = m.collisionPosition.top + m.collisionHeight - o.height() - o.scrollTop(),
                    j = m.my[1] === "top" ? -m.elemHeight : m.my[1] === "bottom" ? m.elemHeight : 0,
                    l = m.at[1] === "top" ? m.targetHeight : -m.targetHeight,
                    p = -2 * m.offset[1];
                k.top += m.collisionPosition.top < 0 ? j + l + p : n > 0 ? j + l + p : 0
            }
        }
    };
    if (!h.offset.setOffset) {
        h.offset.setOffset = function (n, k) {
            if (/static/.test(h.curCSS(n, "position"))) {
                n.style.position = "relative"
            }
            var m = h(n),
                p = m.offset(),
                j = parseInt(h.curCSS(n, "top", true), 10) || 0,
                o = parseInt(h.curCSS(n, "left", true), 10) || 0,
                l = {
                    top: (k.top - p.top) + j,
                    left: (k.left - p.left) + o
                };
            if ("using" in k) {
                k.using.call(n, l)
            } else {
                m.css(l)
            }
        };
        h.fn.offset = function (j) {
            var k = this[0];
            if (!k || !k.ownerDocument) {
                return null
            }
            if (j) {
                if (h.isFunction(j)) {
                    return this.each(function (l) {
                        h(this).offset(j.call(this, l, h(this).offset()))
                    })
                }
                return this.each(function () {
                    h.offset.setOffset(this, j)
                })
            }
            return d.call(this)
        }
    }
    if (!h.curCSS) {
        h.curCSS = h.css
    }(function () {
        var j = document.getElementsByTagName("body")[0],
            q = document.createElement("div"),
            n, p, k, o, m;
        n = document.createElement(j ? "div" : "body");
        k = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        if (j) {
            h.extend(k, {
                position: "absolute",
                left: "-1000px",
                top: "-1000px"
            })
        }
        for (var l in k) {
            n.style[l] = k[l]
        }
        n.appendChild(q);
        p = j || document.documentElement;
        p.insertBefore(n, p.firstChild);
        q.style.cssText = "position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;";
        o = h(q).offset(function (r, s) {
            return s
        }).offset();
        n.innerHTML = "";
        p.removeChild(n);
        m = o.top + o.left + (j ? 2000 : 0);
        g.fractions = m > 21 && m < 22
    })()
}(jQuery));
(function (d, e) {
    d.widget("ui.resizable", d.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: false,
            animate: false,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: false,
            autoHide: false,
            containment: false,
            ghost: false,
            grid: false,
            handles: "e,s,se",
            helper: false,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1000
        },
        _create: function () {
            var g = this,
                l = this.options;
            this.element.addClass("ui-resizable");
            d.extend(this, {
                _aspectRatio: !!(l.aspectRatio),
                aspectRatio: l.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: l.helper || l.ghost || l.animate ? l.helper || "ui-resizable-helper" : null
            });
            if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {
                this.element.wrap(d('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                }));
                this.element = this.element.parent().data("resizable", this.element.data("resizable"));
                this.elementIsWrapper = true;
                this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                });
                this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                });
                this.originalResizeStyle = this.originalElement.css("resize");
                this.originalElement.css("resize", "none");
                this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                }));
                this.originalElement.css({
                    margin: this.originalElement.css("margin")
                });
                this._proportionallyResize()
            }
            this.handles = l.handles || (!d(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                    n: ".ui-resizable-n",
                    e: ".ui-resizable-e",
                    s: ".ui-resizable-s",
                    w: ".ui-resizable-w",
                    se: ".ui-resizable-se",
                    sw: ".ui-resizable-sw",
                    ne: ".ui-resizable-ne",
                    nw: ".ui-resizable-nw"
                });
            if (this.handles.constructor == String) {
                if (this.handles == "all") {
                    this.handles = "n,e,s,w,se,sw,ne,nw"
                }
                var m = this.handles.split(",");
                this.handles = {};
                for (var h = 0; h < m.length; h++) {
                    var k = d.trim(m[h]),
                        f = "ui-resizable-" + k;
                    var j = d('<div class="ui-resizable-handle ' + f + '"></div>');
                    j.css({
                        zIndex: l.zIndex
                    });
                    if ("se" == k) {
                        j.addClass("ui-icon ui-icon-gripsmall-diagonal-se")
                    }
                    this.handles[k] = ".ui-resizable-" + k;
                    this.element.append(j)
                }
            }
            this._renderAxis = function (r) {
                r = r || this.element;
                for (var o in this.handles) {
                    if (this.handles[o].constructor == String) {
                        this.handles[o] = d(this.handles[o], this.element).show()
                    }
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var p = d(this.handles[o], this.element),
                            q = 0;
                        q = /sw|ne|nw|se|n|s/.test(o) ? p.outerHeight() : p.outerWidth();
                        var n = ["padding", /ne|nw|n/.test(o) ? "Top" : /se|sw|s/.test(o) ? "Bottom" : /^e$/.test(o) ? "Right" : "Left"].join("");
                        r.css(n, q);
                        this._proportionallyResize()
                    }
                    if (!d(this.handles[o]).length) {
                        continue
                    }
                }
            };
            this._renderAxis(this.element);
            this._handles = d(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function () {
                if (!g.resizing) {
                    if (this.className) {
                        var i = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)
                    }
                    g.axis = i && i[1] ? i[1] : "se"
                }
            });
            if (l.autoHide) {
                this._handles.hide();
                d(this.element).addClass("ui-resizable-autohide").hover(function () {
                    if (l.disabled) {
                        return
                    }
                    d(this).removeClass("ui-resizable-autohide");
                    g._handles.show()
                }, function () {
                    if (l.disabled) {
                        return
                    }
                    if (!g.resizing) {
                        d(this).addClass("ui-resizable-autohide");
                        g._handles.hide()
                    }
                })
            }
            this._mouseInit()
        }, destroy: function () {
            this._mouseDestroy();
            var f = function (h) {
                d(h).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                f(this.element);
                var g = this.element;
                g.after(this.originalElement.css({
                    position: g.css("position"),
                    width: g.outerWidth(),
                    height: g.outerHeight(),
                    top: g.css("top"),
                    left: g.css("left")
                })).remove()
            }
            this.originalElement.css("resize", this.originalResizeStyle);
            f(this.originalElement);
            return this
        }, _mouseCapture: function (g) {
            var h = false;
            for (var f in this.handles) {
                if (d(this.handles[f])[0] == g.target || d(this.handles[f])[0] == g.target.parentNode) {
                    h = true
                }
            }
            return !this.options.disabled && h
        }, _mouseStart: function (h) {
            var k = this.options,
                g = this.element.position(),
                f = this.element;
            this.resizing = true;
            this.documentScroll = {
                top: d(document).scrollTop(),
                left: d(document).scrollLeft()
            };
            if (f.is(".ui-draggable") || (/absolute/).test(f.css("position"))) {
                f.css({
                    position: "absolute",
                    top: g.top,
                    left: g.left
                })
            }
            this._renderProxy();
            var l = c(this.helper.css("left")),
                i = c(this.helper.css("top"));
            if (k.containment) {
                l += d(k.containment).scrollLeft() || 0;
                i += d(k.containment).scrollTop() || 0
            }
            this.offset = this.helper.offset();
            this.position = {
                left: l,
                top: i
            };
            this.size = this._helper ? {
                width: f.outerWidth(),
                height: f.outerHeight()
            } : {
                width: f.width(),
                height: f.height()
            };
            this.originalSize = this._helper ? {
                width: f.outerWidth(),
                height: f.outerHeight()
            } : {
                width: f.width(),
                height: f.height()
            };
            this.originalPosition = {
                left: l,
                top: i
            };
            this.sizeDiff = {
                width: f.outerWidth() - f.width(),
                height: f.outerHeight() - f.height()
            };
            this.originalMousePosition = {
                left: h.pageX,
                top: h.pageY
            };
            this.aspectRatio = (typeof k.aspectRatio == "number") ? k.aspectRatio : ((this.originalSize.width / this.originalSize.height) || 1);
            var j = d(".ui-resizable-" + this.axis).css("cursor");
            d("body").css("cursor", j == "auto" ? this.axis + "-resize" : j);
            f.addClass("ui-resizable-resizing");
            this._propagate("start", h);
            return true
        }, _mouseDrag: function (f) {
            var i = this.helper,
                h = this.options,
                n = {},
                r = this,
                k = this.originalMousePosition,
                p = this.axis;
            var s = (f.pageX - k.left) || 0,
                q = (f.pageY - k.top) || 0;
            var j = this._change[p];
            if (!j) {
                return false
            }
            var m = j.apply(this, [f, s, q]),
                l = d.browser.msie && d.browser.version < 7,
                g = this.sizeDiff;
            this._updateVirtualBoundaries(f.shiftKey);
            if (this._aspectRatio || f.shiftKey) {
                m = this._updateRatio(m, f)
            }
            m = this._respectSize(m, f);
            this._propagate("resize", f);
            i.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            });
            if (!this._helper && this._proportionallyResizeElements.length) {
                this._proportionallyResize()
            }
            this._updateCache(m);
            this._trigger("resize", f, this.ui());
            return false
        }, _mouseStop: function (i) {
            this.resizing = false;
            var j = this.options,
                n = this;
            if (this._helper) {
                var h = this._proportionallyResizeElements,
                    f = h.length && (/textarea/i).test(h[0].nodeName),
                    g = f && d.ui.hasScroll(h[0], "left") ? 0 : n.sizeDiff.height,
                    l = f ? 0 : n.sizeDiff.width;
                var p = {
                        width: (n.helper.width() - l),
                        height: (n.helper.height() - g)
                    },
                    k = (parseInt(n.element.css("left"), 10) + (n.position.left - n.originalPosition.left)) || null,
                    m = (parseInt(n.element.css("top"), 10) + (n.position.top - n.originalPosition.top)) || null;
                if (!j.animate) {
                    this.element.css(d.extend(p, {
                        top: m,
                        left: k
                    }))
                }
                n.helper.height(n.size.height);
                n.helper.width(n.size.width);
                if (this._helper && !j.animate) {
                    this._proportionallyResize()
                }
            }
            d("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", i);
            if (this._helper) {
                this.helper.remove()
            }
            return false
        }, _updateVirtualBoundaries: function (h) {
            var k = this.options,
                j, i, g, l, f;
            f = {
                minWidth: b(k.minWidth) ? k.minWidth : 0,
                maxWidth: b(k.maxWidth) ? k.maxWidth : Infinity,
                minHeight: b(k.minHeight) ? k.minHeight : 0,
                maxHeight: b(k.maxHeight) ? k.maxHeight : Infinity
            };
            if (this._aspectRatio || h) {
                j = f.minHeight * this.aspectRatio;
                g = f.minWidth / this.aspectRatio;
                i = f.maxHeight * this.aspectRatio;
                l = f.maxWidth / this.aspectRatio;
                if (j > f.minWidth) {
                    f.minWidth = j
                }
                if (g > f.minHeight) {
                    f.minHeight = g
                }
                if (i < f.maxWidth) {
                    f.maxWidth = i
                }
                if (l < f.maxHeight) {
                    f.maxHeight = l
                }
            }
            this._vBoundaries = f
        }, _updateCache: function (f) {
            var g = this.options;
            this.offset = this.helper.offset();
            if (b(f.left)) {
                this.position.left = f.left
            }
            if (b(f.top)) {
                this.position.top = f.top
            }
            if (b(f.height)) {
                this.size.height = f.height
            }
            if (b(f.width)) {
                this.size.width = f.width
            }
        }, _updateRatio: function (i, h) {
            var j = this.options,
                k = this.position,
                g = this.size,
                f = this.axis;
            if (b(i.height)) {
                i.width = (i.height * this.aspectRatio)
            } else {
                if (b(i.width)) {
                    i.height = (i.width / this.aspectRatio)
                }
            } if (f == "sw") {
                i.left = k.left + (g.width - i.width);
                i.top = null
            }
            if (f == "nw") {
                i.top = k.top + (g.height - i.height);
                i.left = k.left + (g.width - i.width)
            }
            return i
        }, _respectSize: function (m, h) {
            var k = this.helper,
                j = this._vBoundaries,
                s = this._aspectRatio || h.shiftKey,
                r = this.axis,
                u = b(m.width) && j.maxWidth && (j.maxWidth < m.width),
                n = b(m.height) && j.maxHeight && (j.maxHeight < m.height),
                i = b(m.width) && j.minWidth && (j.minWidth > m.width),
                t = b(m.height) && j.minHeight && (j.minHeight > m.height);
            if (i) {
                m.width = j.minWidth
            }
            if (t) {
                m.height = j.minHeight
            }
            if (u) {
                m.width = j.maxWidth
            }
            if (n) {
                m.height = j.maxHeight
            }
            var g = this.originalPosition.left + this.originalSize.width,
                q = this.position.top + this.size.height;
            var l = /sw|nw|w/.test(r),
                f = /nw|ne|n/.test(r);
            if (i && l) {
                m.left = g - j.minWidth
            }
            if (u && l) {
                m.left = g - j.maxWidth
            }
            if (t && f) {
                m.top = q - j.minHeight
            }
            if (n && f) {
                m.top = q - j.maxHeight
            }
            var p = !m.width && !m.height;
            if (p && !m.left && m.top) {
                m.top = null
            } else {
                if (p && !m.top && m.left) {
                    m.left = null
                }
            }
            return m
        }, _proportionallyResize: function () {
            var l = this.options;
            if (!this._proportionallyResizeElements.length) {
                return
            }
            var h = this.helper || this.element;
            for (var g = 0; g < this._proportionallyResizeElements.length; g++) {
                var j = this._proportionallyResizeElements[g];
                if (!this.borderDif) {
                    var f = [j.css("borderTopWidth"), j.css("borderRightWidth"), j.css("borderBottomWidth"), j.css("borderLeftWidth")],
                        k = [j.css("paddingTop"), j.css("paddingRight"), j.css("paddingBottom"), j.css("paddingLeft")];
                    this.borderDif = d.map(f, function (m, o) {
                        var n = parseInt(m, 10) || 0,
                            p = parseInt(k[o], 10) || 0;
                        return n + p
                    })
                }
                if (d.browser.msie && !(!(d(h).is(":hidden") || d(h).parents(":hidden").length))) {
                    continue
                }
                j.css({
                    height: (h.height() - this.borderDif[0] - this.borderDif[2]) || 0,
                    width: (h.width() - this.borderDif[1] - this.borderDif[3]) || 0
                })
            }
        }, _renderProxy: function () {
            var g = this.element,
                j = this.options;
            this.elementOffset = g.offset();
            if (this._helper) {
                this.helper = this.helper || d('<div style="overflow:hidden;"></div>');
                var f = d.browser.msie && d.browser.version < 7,
                    h = (f ? 1 : 0),
                    i = (f ? 2 : -1);
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + i,
                    height: this.element.outerHeight() + i,
                    position: "absolute",
                    left: this.elementOffset.left - h + "px",
                    top: this.elementOffset.top - h + "px",
                    zIndex: ++j.zIndex
                });
                this.helper.appendTo("body").disableSelection()
            } else {
                this.helper = this.element
            }
        }, _change: {
            e: function (h, g, f) {
                return {
                    width: this.originalSize.width + g
                }
            }, w: function (i, g, f) {
                var k = this.options,
                    h = this.originalSize,
                    j = this.originalPosition;
                return {
                    left: j.left + g,
                    width: h.width - g
                }
            }, n: function (i, g, f) {
                var k = this.options,
                    h = this.originalSize,
                    j = this.originalPosition;
                return {
                    top: j.top + f,
                    height: h.height - f
                }
            }, s: function (h, g, f) {
                return {
                    height: this.originalSize.height + f
                }
            }, se: function (h, g, f) {
                return d.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [h, g, f]))
            }, sw: function (h, g, f) {
                return d.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [h, g, f]))
            }, ne: function (h, g, f) {
                return d.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [h, g, f]))
            }, nw: function (h, g, f) {
                return d.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [h, g, f]))
            }
        }, _propagate: function (g, f) {
            d.ui.plugin.call(this, g, [f, this.ui()]);
            (g != "resize" && this._trigger(g, f, this.ui()))
        }, plugins: {}, ui: function () {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    d.extend(d.ui.resizable, {
        version: "@VERSION"
    });
    d.ui.plugin.add("resizable", "alsoResize", {
        start: function (g, h) {
            var f = d(this).data("resizable"),
                j = f.options;
            var i = function (k) {
                d(k).each(function () {
                    var l = d(this);
                    l.data("resizable-alsoresize", {
                        width: parseInt(l.width(), 10),
                        height: parseInt(l.height(), 10),
                        left: parseInt(l.css("left"), 10),
                        top: parseInt(l.css("top"), 10)
                    })
                })
            };
            if (typeof (j.alsoResize) == "object" && !j.alsoResize.parentNode) {
                if (j.alsoResize.length) {
                    j.alsoResize = j.alsoResize[0];
                    i(j.alsoResize)
                } else {
                    d.each(j.alsoResize, function (k) {
                        i(k)
                    })
                }
            } else {
                i(j.alsoResize)
            }
        }, resize: function (h, j) {
            var g = d(this).data("resizable"),
                k = g.options,
                i = g.originalSize,
                m = g.originalPosition;
            var l = {
                    height: (g.size.height - i.height) || 0,
                    width: (g.size.width - i.width) || 0,
                    top: (g.position.top - m.top) || 0,
                    left: (g.position.left - m.left) || 0
                },
                f = function (n, o) {
                    d(n).each(function () {
                        var r = d(this),
                            s = d(this).data("resizable-alsoresize"),
                            q = {},
                            p = o && o.length ? o : r.parents(j.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        d.each(p, function (t, v) {
                            var u = (s[v] || 0) + (l[v] || 0);
                            if (u && u >= 0) {
                                q[v] = u || null
                            }
                        });
                        r.css(q)
                    })
                };
            if (typeof (k.alsoResize) == "object" && !k.alsoResize.nodeType) {
                d.each(k.alsoResize, function (n, o) {
                    f(n, o)
                })
            } else {
                f(k.alsoResize)
            }
        }, stop: function (f, g) {
            d(this).removeData("resizable-alsoresize")
        }
    });
    d.ui.plugin.add("resizable", "animate", {
        stop: function (j, p) {
            var q = d(this).data("resizable"),
                k = q.options;
            var i = q._proportionallyResizeElements,
                f = i.length && (/textarea/i).test(i[0].nodeName),
                g = f && d.ui.hasScroll(i[0], "left") ? 0 : q.sizeDiff.height,
                m = f ? 0 : q.sizeDiff.width;
            var h = {
                    width: (q.size.width - m),
                    height: (q.size.height - g)
                },
                l = (parseInt(q.element.css("left"), 10) + (q.position.left - q.originalPosition.left)) || null,
                n = (parseInt(q.element.css("top"), 10) + (q.position.top - q.originalPosition.top)) || null;
            q.element.animate(d.extend(h, n && l ? {
                top: n,
                left: l
            } : {}), {
                duration: k.animateDuration,
                easing: k.animateEasing,
                step: function () {
                    var o = {
                        width: parseInt(q.element.css("width"), 10),
                        height: parseInt(q.element.css("height"), 10),
                        top: parseInt(q.element.css("top"), 10),
                        left: parseInt(q.element.css("left"), 10)
                    };
                    if (i && i.length) {
                        d(i[0]).css({
                            width: o.width,
                            height: o.height
                        })
                    }
                    q._updateCache(o);
                    q._propagate("resize", j)
                }
            })
        }
    });
    d.ui.plugin.add("resizable", "containment", {
        start: function (g, s) {
            var u = d(this).data("resizable"),
                k = u.options,
                m = u.element;
            var h = k.containment,
                l = (h instanceof d) ? h.get(0) : (/parent/.test(h)) ? m.parent().get(0) : h;
            if (!l) {
                return
            }
            u.containerElement = d(l);
            if (/document/.test(h) || h == document) {
                u.containerOffset = {
                    left: 0,
                    top: 0
                };
                u.containerPosition = {
                    left: 0,
                    top: 0
                };
                u.parentData = {
                    element: d(document),
                    left: 0,
                    top: 0,
                    width: d(document).width(),
                    height: d(document).height() || document.body.parentNode.scrollHeight
                }
            } else {
                var q = d(l),
                    j = [];
                d(["Top", "Right", "Left", "Bottom"]).each(function (p, o) {
                    j[p] = c(q.css("padding" + o))
                });
                u.containerOffset = q.offset();
                u.containerPosition = q.position();
                u.containerSize = {
                    height: (q.innerHeight() - j[3]),
                    width: (q.innerWidth() - j[1])
                };
                var r = u.containerOffset,
                    f = u.containerSize.height,
                    n = u.containerSize.width,
                    i = (d.ui.hasScroll(l, "left") ? l.scrollWidth : n),
                    t = (d.ui.hasScroll(l) ? l.scrollHeight : f);
                u.parentData = {
                    element: l,
                    left: r.left,
                    top: r.top,
                    width: i,
                    height: t
                }
            }
        }, resize: function (h, r) {
            var u = d(this).data("resizable"),
                j = u.options,
                g = u.containerSize,
                q = u.containerOffset,
                n = u.size,
                p = u.position,
                s = u._aspectRatio || h.shiftKey,
                f = {
                    top: 0,
                    left: 0
                },
                i = u.containerElement;
            if (i[0] != document && (/static/).test(i.css("position"))) {
                f = q
            }
            if (p.left < (u._helper ? q.left : 0)) {
                u.size.width = u.size.width + (u._helper ? (u.position.left - q.left) : (u.position.left - f.left));
                if (s) {
                    u.size.height = u.size.width / u.aspectRatio
                }
                u.position.left = j.helper ? q.left : 0
            }
            if (p.top < (u._helper ? q.top : 0)) {
                u.size.height = u.size.height + (u._helper ? (u.position.top - q.top) : u.position.top);
                if (s) {
                    u.size.width = u.size.height * u.aspectRatio
                }
                u.position.top = u._helper ? q.top : 0
            }
            u.offset.left = u.parentData.left + u.position.left;
            u.offset.top = u.parentData.top + u.position.top;
            var m = Math.abs((u._helper ? u.offset.left - f.left : (u.offset.left - f.left)) + u.sizeDiff.width),
                t = Math.abs((u._helper ? u.offset.top - f.top : (u.offset.top - q.top)) + u.sizeDiff.height);
            var l = u.containerElement.get(0) == u.element.parent().get(0),
                k = /relative|absolute/.test(u.containerElement.css("position"));
            if (l && k) {
                m -= u.parentData.left
            }
            if (m + u.size.width >= u.parentData.width) {
                u.size.width = u.parentData.width - m;
                if (s) {
                    u.size.height = u.size.width / u.aspectRatio
                }
            }
            if (t + u.size.height >= u.parentData.height) {
                u.size.height = u.parentData.height - t;
                if (s) {
                    u.size.width = u.size.height * u.aspectRatio
                }
            }
        }, stop: function (g, p) {
            var r = d(this).data("resizable"),
                i = r.options,
                m = r.position,
                n = r.containerOffset,
                f = r.containerPosition,
                j = r.containerElement;
            var k = d(r.helper),
                s = k.offset(),
                q = k.outerWidth() - r.sizeDiff.width,
                l = k.outerHeight() - r.sizeDiff.height;
            if (r._helper && !i.animate && (/relative/).test(j.css("position"))) {
                d(this).css({
                    left: s.left - f.left - n.left,
                    width: q,
                    height: l
                })
            }
            if (r._helper && !i.animate && (/static/).test(j.css("position"))) {
                d(this).css({
                    left: s.left - f.left - n.left,
                    width: q,
                    height: l
                })
            }
        }
    });
    d.ui.plugin.add("resizable", "ghost", {
        start: function (h, i) {
            var f = d(this).data("resizable"),
                j = f.options,
                g = f.size;
            f.ghost = f.originalElement.clone();
            f.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: g.height,
                width: g.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof j.ghost == "string" ? j.ghost : "");
            f.ghost.appendTo(f.helper)
        }, resize: function (g, h) {
            var f = d(this).data("resizable"),
                i = f.options;
            if (f.ghost) {
                f.ghost.css({
                    position: "relative",
                    height: f.size.height,
                    width: f.size.width
                })
            }
        }, stop: function (g, h) {
            var f = d(this).data("resizable"),
                i = f.options;
            if (f.ghost && f.helper) {
                f.helper.get(0).removeChild(f.ghost.get(0))
            }
        }
    });
    d.ui.plugin.add("resizable", "grid", {
        resize: function (f, n) {
            var q = d(this).data("resizable"),
                i = q.options,
                l = q.size,
                j = q.originalSize,
                k = q.originalPosition,
                p = q.axis,
                m = i._aspectRatio || f.shiftKey;
            i.grid = typeof i.grid == "number" ? [i.grid, i.grid] : i.grid;
            var h = Math.round((l.width - j.width) / (i.grid[0] || 1)) * (i.grid[0] || 1),
                g = Math.round((l.height - j.height) / (i.grid[1] || 1)) * (i.grid[1] || 1);
            if (/^(se|s|e)$/.test(p)) {
                q.size.width = j.width + h;
                q.size.height = j.height + g
            } else {
                if (/^(ne)$/.test(p)) {
                    q.size.width = j.width + h;
                    q.size.height = j.height + g;
                    q.position.top = k.top - g
                } else {
                    if (/^(sw)$/.test(p)) {
                        q.size.width = j.width + h;
                        q.size.height = j.height + g;
                        q.position.left = k.left - h
                    } else {
                        q.size.width = j.width + h;
                        q.size.height = j.height + g;
                        q.position.top = k.top - g;
                        q.position.left = k.left - h
                    }
                }
            }
        }
    });
    var c = function (f) {
        return parseInt(f, 10) || 0
    };
    var b = function (f) {
        return !isNaN(parseInt(f, 10))
    }
})(jQuery);
(function (f, c) {
    f.extend(f.ui, {
        datepicker: {
            version: "@VERSION"
        }
    });
    var i = "datepicker";
    var j = new Date().getTime();
    var d;

    function g() {
        this.debug = false;
        this._curInst = null;
        this._keyEvent = false;
        this._disabledInputs = [];
        this._datepickerShowing = false;
        this._inDialog = false;
        this._mainDivId = "ui-datepicker-div";
        this._inlineClass = "ui-datepicker-inline";
        this._appendClass = "ui-datepicker-append";
        this._triggerClass = "ui-datepicker-trigger";
        this._dialogClass = "ui-datepicker-dialog";
        this._disableClass = "ui-datepicker-disabled";
        this._unselectableClass = "ui-datepicker-unselectable";
        this._currentClass = "ui-datepicker-current-day";
        this._dayOverClass = "ui-datepicker-days-cell-over";
        this.regional = [];
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ""
        };
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: false,
            hideIfNoPrevNext: false,
            navigationAsDateFormat: false,
            gotoCurrent: false,
            changeMonth: false,
            changeYear: false,
            yearRange: "c-10:c+10",
            showOtherMonths: false,
            selectOtherMonths: false,
            showWeek: false,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: true,
            showButtonPanel: false,
            autoSize: false,
            disabled: false
        };
        f.extend(this._defaults, this.regional[""]);
        this.dpDiv = b(f('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }
    f.extend(g.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        log: function () {
            if (this.debug) {
                console.log.apply("", arguments)
            }
        }, _widgetDatepicker: function () {
            return this.dpDiv
        }, setDefaults: function (k) {
            e(this._defaults, k || {});
            return this
        }, _attachDatepicker: function (p, k) {
            var o = null;
            for (var r in this._defaults) {
                var n = p.getAttribute("date:" + r);
                if (n) {
                    o = o || {};
                    try {
                        o[r] = window["eval"].call(window, n)
                    } catch (l) {
                        o[r] = n
                    }
                }
            }
            var s = p.nodeName.toLowerCase();
            var q = (s == "div" || s == "span");
            if (!p.id) {
                this.uuid += 1;
                p.id = "dp" + this.uuid
            }
            var m = this._newInst(f(p), q);
            m.settings = f.extend({}, k || {}, o || {});
            if (s == "input") {
                this._connectDatepicker(p, m)
            } else {
                if (q) {
                    this._inlineDatepicker(p, m)
                }
            }
        }, _newInst: function (l, k) {
            var m = l[0].id.replace(/([^A-Za-z0-9_-])/g, "\\\\$1");
            return {
                id: m,
                input: l,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: k,
                dpDiv: (!k ? this.dpDiv : b(f('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
            }
        }, _connectDatepicker: function (m, l) {
            var k = f(m);
            l.append = f([]);
            l.trigger = f([]);
            if (k.hasClass(this.markerClassName)) {
                return
            }
            this._attachments(k, l);
            k.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (o, n, p) {
                l.settings[n] = p
            }).bind("getData.datepicker", function (o, n) {
                return this._get(l, n)
            });
            this._autoSize(l);
            f.data(m, i, l);
            if (l.settings.disabled) {
                this._disableDatepicker(m)
            }
        }, _attachments: function (m, p) {
            var q = this._get(p, "appendText");
            var n = this._get(p, "isRTL");
            if (p.append) {
                p.append.remove()
            }
            if (q) {
                p.append = f('<span class="' + this._appendClass + '">' + q + "</span>");
                m[n ? "before" : "after"](p.append)
            }
            m.unbind("focus", this._showDatepicker);
            if (p.trigger) {
                p.trigger.remove()
            }
            var l = this._get(p, "showOn");
            if (l == "focus" || l == "both") {
                m.focus(this._showDatepicker)
            }
            if (l == "button" || l == "both") {
                var o = this._get(p, "buttonText");
                var k = this._get(p, "buttonImage");
                p.trigger = f(this._get(p, "buttonImageOnly") ? f("<img/>").addClass(this._triggerClass).attr({
                    src: k,
                    alt: o,
                    title: o
                }) : f('<button type="button"></button>').addClass(this._triggerClass).html(k == "" ? o : f("<img/>").attr({
                    src: k,
                    alt: o,
                    title: o
                })));
                m[n ? "before" : "after"](p.trigger);
                p.trigger.click(function () {
                    if (f.datepicker._datepickerShowing && f.datepicker._lastInput == m[0]) {
                        f.datepicker._hideDatepicker()
                    } else {
                        if (f.datepicker._datepickerShowing && f.datepicker._lastInput != m[0]) {
                            f.datepicker._hideDatepicker();
                            f.datepicker._showDatepicker(m[0])
                        } else {
                            f.datepicker._showDatepicker(m[0])
                        }
                    }
                    return false
                })
            }
        }, _autoSize: function (n) {
            if (this._get(n, "autoSize") && !n.inline) {
                var m = new Date(2009, 12 - 1, 20);
                var k = this._get(n, "dateFormat");
                if (k.match(/[DM]/)) {
                    var l = function (r) {
                        var o = 0;
                        var p = 0;
                        for (var q = 0; q < r.length; q++) {
                            if (r[q].length > o) {
                                o = r[q].length;
                                p = q
                            }
                        }
                        return p
                    };
                    m.setMonth(l(this._get(n, (k.match(/MM/) ? "monthNames" : "monthNamesShort"))));
                    m.setDate(l(this._get(n, (k.match(/DD/) ? "dayNames" : "dayNamesShort"))) + 20 - m.getDay())
                }
                n.input.attr("size", this._formatDate(n, m).length)
            }
        }, _inlineDatepicker: function (l, k) {
            var m = f(l);
            if (m.hasClass(this.markerClassName)) {
                return
            }
            m.addClass(this.markerClassName).append(k.dpDiv).bind("setData.datepicker", function (o, n, p) {
                k.settings[n] = p
            }).bind("getData.datepicker", function (o, n) {
                return this._get(k, n)
            });
            f.data(l, i, k);
            this._setDate(k, this._getDefaultDate(k), true);
            this._updateDatepicker(k);
            this._updateAlternate(k);
            if (k.settings.disabled) {
                this._disableDatepicker(l)
            }
            k.dpDiv.css("display", "block")
        }, _dialogDatepicker: function (r, l, p, m, q) {
            var n = this._dialogInst;
            if (!n) {
                this.uuid += 1;
                var k = "dp" + this.uuid;
                this._dialogInput = f('<input type="text" id="' + k + '" style="position: absolute; top: -100px; width: 0px;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                f("body").append(this._dialogInput);
                n = this._dialogInst = this._newInst(this._dialogInput, false);
                n.settings = {};
                f.data(this._dialogInput[0], i, n)
            }
            e(n.settings, m || {});
            l = (l && l.constructor == Date ? this._formatDate(n, l) : l);
            this._dialogInput.val(l);
            this._pos = (q ? (q.length ? q : [q.pageX, q.pageY]) : null);
            if (!this._pos) {
                var u = document.documentElement.clientWidth;
                var o = document.documentElement.clientHeight;
                var t = document.documentElement.scrollLeft || document.body.scrollLeft;
                var s = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(u / 2) - 100 + t, (o / 2) - 150 + s]
            }
            this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
            n.settings.onSelect = p;
            this._inDialog = true;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if (f.blockUI) {
                f.blockUI(this.dpDiv)
            }
            f.data(this._dialogInput[0], i, n);
            return this
        }, _destroyDatepicker: function (m) {
            var k = f(m);
            var l = f.data(m, i);
            if (!k.hasClass(this.markerClassName)) {
                return
            }
            var n = m.nodeName.toLowerCase();
            f.removeData(m, i);
            if (n == "input") {
                l.append.remove();
                l.trigger.remove();
                k.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
            } else {
                if (n == "div" || n == "span") {
                    k.removeClass(this.markerClassName).empty()
                }
            }
        }, _enableDatepicker: function (n) {
            var k = f(n);
            var l = f.data(n, i);
            if (!k.hasClass(this.markerClassName)) {
                return
            }
            var o = n.nodeName.toLowerCase();
            if (o == "input") {
                n.disabled = false;
                l.trigger.filter("button").each(function () {
                    this.disabled = false
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })
            } else {
                if (o == "div" || o == "span") {
                    var m = k.children("." + this._inlineClass);
                    m.children().removeClass("ui-state-disabled");
                    m.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
                }
            }
            this._disabledInputs = f.map(this._disabledInputs, function (p) {
                return (p == n ? null : p)
            })
        }, _disableDatepicker: function (n) {
            var k = f(n);
            var l = f.data(n, i);
            if (!k.hasClass(this.markerClassName)) {
                return
            }
            var o = n.nodeName.toLowerCase();
            if (o == "input") {
                n.disabled = true;
                l.trigger.filter("button").each(function () {
                    this.disabled = true
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })
            } else {
                if (o == "div" || o == "span") {
                    var m = k.children("." + this._inlineClass);
                    m.children().addClass("ui-state-disabled");
                    m.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
                }
            }
            this._disabledInputs = f.map(this._disabledInputs, function (p) {
                return (p == n ? null : p)
            });
            this._disabledInputs[this._disabledInputs.length] = n
        }, _isDisabledDatepicker: function (l) {
            if (!l) {
                return false
            }
            for (var k = 0; k < this._disabledInputs.length; k++) {
                if (this._disabledInputs[k] == l) {
                    return true
                }
            }
            return false
        }, _getInst: function (l) {
            try {
                if ((f.browser.msie && "9.0" === f.browser.version) || (f.browser.msie && "10.0" === f.browser.version) || (f.browser.msie && "11.0" === f.browser.version)) {
                    if ("object" === l.nodeName.toLowerCase()) {
                        return false
                    }
                }
                return f.data(l, i)
            } catch (k) {
                throw "Missing instance data for this datepicker"
            }
        }, _optionDatepicker: function (q, l, p) {
            var o = this._getInst(q);
            if (arguments.length == 2 && typeof l == "string") {
                return (l == "defaults" ? f.extend({}, f.datepicker._defaults) : (o ? (l == "all" ? f.extend({}, o.settings) : this._get(o, l)) : null))
            }
            var m = l || {};
            if (typeof l == "string") {
                m = {};
                m[l] = p
            }
            if (o) {
                if (this._curInst == o) {
                    this._hideDatepicker()
                }
                var k = this._getDateDatepicker(q, true);
                var n = this._getMinMaxDate(o, "min");
                var r = this._getMinMaxDate(o, "max");
                e(o.settings, m);
                if (n !== null && m.dateFormat !== c && m.minDate === c) {
                    o.settings.minDate = this._formatDate(o, n)
                }
                if (r !== null && m.dateFormat !== c && m.maxDate === c) {
                    o.settings.maxDate = this._formatDate(o, r)
                }
                this._attachments(f(q), o);
                this._autoSize(o);
                this._setDate(o, k);
                this._updateAlternate(o);
                this._updateDatepicker(o)
            }
        }, _changeDatepicker: function (m, k, l) {
            this._optionDatepicker(m, k, l)
        }, _refreshDatepicker: function (l) {
            var k = this._getInst(l);
            if (k) {
                this._updateDatepicker(k)
            }
        }, _setDateDatepicker: function (m, k) {
            var l = this._getInst(m);
            if (l) {
                this._setDate(l, k);
                this._updateDatepicker(l);
                this._updateAlternate(l)
            }
        }, _getDateDatepicker: function (m, k) {
            var l = this._getInst(m);
            if (l && !l.inline) {
                this._setDateFromField(l, k)
            }
            return (l ? this._getDate(l) : null)
        }, _doKeyDown: function (n) {
            var p = f.datepicker._getInst(n.target);
            var q = true;
            var m = p.dpDiv.is(".ui-datepicker-rtl");
            p._keyEvent = true;
            if (f.datepicker._datepickerShowing) {
                switch (n.keyCode) {
                    case 9:
                        f.datepicker._hideDatepicker();
                        q = false;
                        break;
                    case 13:
                        var o = f("td." + f.datepicker._dayOverClass + ":not(." + f.datepicker._currentClass + ")", p.dpDiv);
                        if (o[0]) {
                            f.datepicker._selectDay(n.target, p.selectedMonth, p.selectedYear, o[0])
                        }
                        var l = f.datepicker._get(p, "onSelect");
                        if (l) {
                            var k = f.datepicker._formatDate(p);
                            l.apply((p.input ? p.input[0] : null), [k, p])
                        } else {
                            f.datepicker._hideDatepicker()
                        }
                        return false;
                        break;
                    case 27:
                        f.datepicker._hideDatepicker();
                        break;
                    case 33:
                        f.datepicker._adjustDate(n.target, (n.ctrlKey ? -f.datepicker._get(p, "stepBigMonths") : -f.datepicker._get(p, "stepMonths")), "M");
                        break;
                    case 34:
                        f.datepicker._adjustDate(n.target, (n.ctrlKey ? +f.datepicker._get(p, "stepBigMonths") : +f.datepicker._get(p, "stepMonths")), "M");
                        break;
                    case 35:
                        if (n.ctrlKey || n.metaKey) {
                            f.datepicker._clearDate(n.target)
                        }
                        q = n.ctrlKey || n.metaKey;
                        break;
                    case 36:
                        if (n.ctrlKey || n.metaKey) {
                            f.datepicker._gotoToday(n.target)
                        }
                        q = n.ctrlKey || n.metaKey;
                        break;
                    case 37:
                        if (n.ctrlKey || n.metaKey) {
                            f.datepicker._adjustDate(n.target, (m ? +1 : -1), "D")
                        }
                        q = n.ctrlKey || n.metaKey;
                        if (n.originalEvent.altKey) {
                            f.datepicker._adjustDate(n.target, (n.ctrlKey ? -f.datepicker._get(p, "stepBigMonths") : -f.datepicker._get(p, "stepMonths")), "M")
                        }
                        break;
                    case 38:
                        if (n.ctrlKey || n.metaKey) {
                            f.datepicker._adjustDate(n.target, -7, "D")
                        }
                        q = n.ctrlKey || n.metaKey;
                        break;
                    case 39:
                        if (n.ctrlKey || n.metaKey) {
                            f.datepicker._adjustDate(n.target, (m ? -1 : +1), "D")
                        }
                        q = n.ctrlKey || n.metaKey;
                        if (n.originalEvent.altKey) {
                            f.datepicker._adjustDate(n.target, (n.ctrlKey ? +f.datepicker._get(p, "stepBigMonths") : +f.datepicker._get(p, "stepMonths")), "M")
                        }
                        break;
                    case 40:
                        if (n.ctrlKey || n.metaKey) {
                            f.datepicker._adjustDate(n.target, +7, "D")
                        }
                        q = n.ctrlKey || n.metaKey;
                        break;
                    default:
                        q = false
                }
            } else {
                if (n.keyCode == 36 && n.ctrlKey) {
                    f.datepicker._showDatepicker(this)
                } else {
                    q = false
                }
            } if (q) {
                n.preventDefault();
                n.stopPropagation()
            }
        }, _doKeyPress: function (m) {
            var n = f.datepicker._getInst(m.target);
            if (f.datepicker._get(n, "constrainInput")) {
                var l = f.datepicker._possibleChars(f.datepicker._get(n, "dateFormat"));
                var k = String.fromCharCode(m.charCode == c ? m.keyCode : m.charCode);
                return m.ctrlKey || m.metaKey || (k < " " || !l || l.indexOf(k) > -1)
            }
        }, _doKeyUp: function (m) {
            var n = f.datepicker._getInst(m.target);
            if (n.input.val() != n.lastVal) {
                try {
                    var k = f.datepicker.parseDate(f.datepicker._get(n, "dateFormat"), (n.input ? n.input.val() : null), f.datepicker._getFormatConfig(n));
                    if (k) {
                        f.datepicker._setDateFromField(n);
                        f.datepicker._updateAlternate(n);
                        f.datepicker._updateDatepicker(n)
                    }
                } catch (l) {
                    f.datepicker.log(l)
                }
            }
            return true
        }, _showDatepicker: function (s) {
            s = s.target || s;
            if (s.nodeName.toLowerCase() != "input") {
                s = f("input", s.parentNode)[0]
            }
            if (f.datepicker._isDisabledDatepicker(s) || f.datepicker._lastInput == s) {
                return
            }
            var q = f.datepicker._getInst(s);
            if (f.datepicker._curInst && f.datepicker._curInst != q) {
                f.datepicker._curInst.dpDiv.stop(true, true);
                if (q && f.datepicker._datepickerShowing) {
                    f.datepicker._hideDatepicker(f.datepicker._curInst.input[0])
                }
            }
            var n = f.datepicker._get(q, "beforeShow");
            var r = n ? n.apply(s, [s, q]) : {};
            if (r === false) {
                return
            }
            e(q.settings, r);
            q.lastVal = null;
            f.datepicker._lastInput = s;
            f.datepicker._setDateFromField(q);
            if (f.datepicker._inDialog) {
                s.value = ""
            }
            if (!f.datepicker._pos) {
                f.datepicker._pos = f.datepicker._findPos(s);
                f.datepicker._pos[1] += s.offsetHeight
            }
            var m = false;
            f(s).parents().each(function () {
                m |= f(this).css("position") == "fixed";
                return !m
            });
            if (m && f.browser.opera) {
                f.datepicker._pos[0] -= document.documentElement.scrollLeft;
                f.datepicker._pos[1] -= document.documentElement.scrollTop
            }
            var p = {
                left: f.datepicker._pos[0],
                top: f.datepicker._pos[1]
            };
            f.datepicker._pos = null;
            q.dpDiv.empty();
            q.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            });
            f.datepicker._updateDatepicker(q);
            p = f.datepicker._checkOffset(q, p, m);
            q.dpDiv.css({
                position: (f.datepicker._inDialog && f.blockUI ? "static" : (m ? "fixed" : "absolute")),
                display: "none",
                left: p.left + "px",
                top: p.top + "px"
            });
            if (!q.inline) {
                var k = f.datepicker._get(q, "showAnim");
                var o = f.datepicker._get(q, "duration");
                var l = function () {
                    var u = q.dpDiv.find("iframe.ui-datepicker-cover");
                    if (!!u.length) {
                        var t = f.datepicker._getBorders(q.dpDiv);
                        u.css({
                            left: -t[0],
                            top: -t[1],
                            width: q.dpDiv.outerWidth(),
                            height: q.dpDiv.outerHeight()
                        })
                    }
                };
                q.dpDiv.zIndex(f(s).zIndex() + 1);
                f.datepicker._datepickerShowing = true;
                if (f.effects && f.effects[k]) {
                    q.dpDiv.show(k, f.datepicker._get(q, "showOptions"), o, l)
                } else {
                    q.dpDiv[k || "show"]((k ? o : null), l)
                } if (!k || !o) {
                    l()
                }
                if (q.input.is(":visible") && !q.input.is(":disabled")) {
                    q.input.focus()
                }
                f.datepicker._curInst = q
            }
        }, _updateDatepicker: function (n) {
            var l = this;
            l.maxRows = 4;
            var q = f.datepicker._getBorders(n.dpDiv);
            d = n;
            n.dpDiv.empty().append(this._generateHTML(n));
            this._attachHandlers(n);
            var p = n.dpDiv.find("iframe.ui-datepicker-cover");
            if (!!p.length) {
                p.css({
                    left: -q[0],
                    top: -q[1],
                    width: n.dpDiv.outerWidth(),
                    height: n.dpDiv.outerHeight()
                })
            }
            n.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var k = this._getNumberOfMonths(n);
            var o = k[1];
            var m = 17;
            n.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
            if (o > 1) {
                n.dpDiv.addClass("ui-datepicker-multi-" + o).css("width", (m * o) + "em")
            }
            n.dpDiv[(k[0] != 1 || k[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
            n.dpDiv[(this._get(n, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
            if (n == f.datepicker._curInst && f.datepicker._datepickerShowing && n.input && n.input.is(":visible") && !n.input.is(":disabled") && n.input[0] != document.activeElement) {
                n.input.focus()
            }
            if (n.yearshtml) {
                var r = n.yearshtml;
                setTimeout(function () {
                    if (r === n.yearshtml && n.yearshtml) {
                        n.dpDiv.find("select.ui-datepicker-year:first").replaceWith(n.yearshtml)
                    }
                    r = n.yearshtml = null
                }, 0)
            }
        }, _getBorders: function (k) {
            var l = function (m) {
                return {
                        thin: 1,
                        medium: 2,
                        thick: 3
                    }[m] || m
            };
            return [parseFloat(l(k.css("border-left-width"))), parseFloat(l(k.css("border-top-width")))]
        }, _checkOffset: function (p, n, m) {
            var o = p.dpDiv.outerWidth();
            var s = p.dpDiv.outerHeight();
            var r = p.input ? p.input.outerWidth() : 0;
            var k = p.input ? p.input.outerHeight() : 0;
            var q = document.documentElement.clientWidth + (m ? 0 : f(document).scrollLeft());
            var l = document.documentElement.clientHeight + (m ? 0 : f(document).scrollTop());
            n.left -= (this._get(p, "isRTL") ? (o - r) : 0);
            n.left -= (m && n.left == p.input.offset().left) ? f(document).scrollLeft() : 0;
            n.top -= (m && n.top == (p.input.offset().top + k)) ? f(document).scrollTop() : 0;
            n.left -= Math.min(n.left, (n.left + o > q && q > o) ? Math.abs(n.left + o - q) : 0);
            n.top -= Math.min(n.top, (n.top + s > l && l > s) ? Math.abs(s + k) : 0);
            return n
        }, _findPos: function (n) {
            var m = this._getInst(n);
            var l = this._get(m, "isRTL");
            while (n && (n.type == "hidden" || n.nodeType != 1 || f.expr.filters.hidden(n))) {
                n = n[l ? "previousSibling" : "nextSibling"]
            }
            var k = f(n).offset();
            return [k.left, k.top]
        }, _hideDatepicker: function (m) {
            var o = this._curInst;
            if (!o || (m && o != f.data(m, i))) {
                return
            }
            if (this._datepickerShowing) {
                var l = this._get(o, "showAnim");
                var p = this._get(o, "duration");
                var n = function () {
                    f.datepicker._tidyDialog(o)
                };
                if (f.effects && f.effects[l]) {
                    o.dpDiv.hide(l, f.datepicker._get(o, "showOptions"), p, n)
                } else {
                    o.dpDiv[(l == "slideDown" ? "slideUp" : (l == "fadeIn" ? "fadeOut" : "hide"))]((l ? p : null), n)
                } if (!l) {
                    n()
                }
                this._datepickerShowing = false;
                var k = this._get(o, "onClose");
                if (k) {
                    k.apply((o.input ? o.input[0] : null), [(o.input ? o.input.val() : ""), o])
                }
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: "absolute",
                        left: "0",
                        top: "-100px"
                    });
                    if (f.blockUI) {
                        f.unblockUI();
                        f("body").append(this.dpDiv)
                    }
                }
                this._inDialog = false
            }
        }, _tidyDialog: function (k) {
            k.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        }, _checkExternalClick: function (l) {
            if (!f.datepicker._curInst) {
                return
            }
            var k = f(l.target),
                m = f.datepicker._getInst(k[0]);
            if (((k[0].id != f.datepicker._mainDivId && k.parents("#" + f.datepicker._mainDivId).length == 0 && !k.hasClass(f.datepicker.markerClassName) && !k.closest("." + f.datepicker._triggerClass).length && f.datepicker._datepickerShowing && !(f.datepicker._inDialog && f.blockUI))) || (k.hasClass(f.datepicker.markerClassName) && f.datepicker._curInst != m)) {
                f.datepicker._hideDatepicker()
            }
        }, _adjustDate: function (o, n, m) {
            var l = f(o);
            var k = this._getInst(l[0]);
            if (this._isDisabledDatepicker(l[0])) {
                return
            }
            this._adjustInstDate(k, n + (m == "M" ? this._get(k, "showCurrentAtPos") : 0), m);
            this._updateDatepicker(k)
        }, _gotoToday: function (o) {
            var m = f(o);
            var l = this._getInst(m[0]);
            var n = l.dpDiv;
            if (this._get(l, "gotoCurrent") && l.currentDay) {
                l.selectedDay = l.currentDay;
                l.drawMonth = l.selectedMonth = l.currentMonth;
                l.drawYear = l.selectedYear = l.currentYear
            } else {
                var k = new Date();
                l.selectedDay = k.getDate();
                l.drawMonth = l.selectedMonth = k.getMonth();
                l.drawYear = l.selectedYear = k.getFullYear()
            }
            this._notifyChange(l);
            this._adjustDate(m)
        }, _selectMonthYear: function (o, k, n) {
            var m = f(o);
            var l = this._getInst(m[0]);
            l["selected" + (n == "M" ? "Month" : "Year")] = l["draw" + (n == "M" ? "Month" : "Year")] = parseInt(k.options[k.selectedIndex].value, 10);
            this._notifyChange(l);
            this._adjustDate(m)
        }, _selectDay: function (p, n, k, o) {
            var m = f(p);
            if (f(o).hasClass(this._unselectableClass) || this._isDisabledDatepicker(m[0])) {
                return
            }
            var l = this._getInst(m[0]);
            l.selectedDay = l.currentDay = f("a", o).html();
            l.selectedMonth = l.currentMonth = n;
            l.selectedYear = l.currentYear = k;
            this._selectDate(p, this._formatDate(l, l.currentDay, l.currentMonth, l.currentYear))
        }, _clearDate: function (m) {
            var l = f(m);
            var k = this._getInst(l[0]);
            this._selectDate(l, "")
        }, _selectDate: function (o, k) {
            var n = f(o);
            var m = this._getInst(n[0]);
            k = (k != null ? k : this._formatDate(m));
            if (m.input) {
                m.input.val(k)
            }
            this._updateAlternate(m);
            var l = this._get(m, "onSelect");
            if (l) {
                l.apply((m.input ? m.input[0] : null), [k, m])
            } else {
                if (m.input) {
                    m.input.trigger("change")
                }
            } if (m.inline) {
                this._updateDatepicker(m)
            } else {
                this._hideDatepicker();
                this._lastInput = m.input[0];
                if (typeof (m.input[0]) != "object") {
                    m.input.focus()
                }
                this._lastInput = null
            }
        }, _updateAlternate: function (o) {
            var m = this._get(o, "altField");
            if (m) {
                var n = this._get(o, "altFormat") || this._get(o, "dateFormat");
                var l = this._getDate(o);
                var k = this.formatDate(n, l, this._getFormatConfig(o));
                f(m).each(function () {
                    f(this).val(k)
                })
            }
        }, noWeekends: function (l) {
            var k = l.getDay();
            return [(k > 0 && k < 6), ""]
        }, iso8601Week: function (k) {
            var m = new Date(k.getTime());
            m.setDate(m.getDate() + 4 - (m.getDay() || 7));
            var l = m.getTime();
            m.setMonth(0);
            m.setDate(1);
            return Math.floor(Math.round((l - m) / 86400000) / 7) + 1
        }, parseDate: function (z, t, A) {
            if (z == null || t == null) {
                throw "Invalid arguments"
            }
            t = (typeof t == "object" ? t.toString() : t + "");
            if (t == "") {
                return null
            }
            var l = (A ? A.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            l = (typeof l != "string" ? l : new Date().getFullYear() % 100 + parseInt(l, 10));
            var r = (A ? A.dayNamesShort : null) || this._defaults.dayNamesShort;
            var C = (A ? A.dayNames : null) || this._defaults.dayNames;
            var k = (A ? A.monthNamesShort : null) || this._defaults.monthNamesShort;
            var n = (A ? A.monthNames : null) || this._defaults.monthNames;
            var o = -1;
            var D = -1;
            var x = -1;
            var p = -1;
            var w = false;
            var s = function (F) {
                var G = (m + 1 < z.length && z.charAt(m + 1) == F);
                if (G) {
                    m++
                }
                return G
            };
            var E = function (H) {
                var F = s(H);
                var I = (H == "@" ? 14 : (H == "!" ? 20 : (H == "y" && F ? 4 : (H == "o" ? 3 : 2))));
                var J = new RegExp("^\\d{1," + I + "}");
                var G = t.substring(y).match(J);
                if (!G) {
                    throw "Missing number at position " + y
                }
                y += G[0].length;
                return parseInt(G[0], 10)
            };
            var q = function (G, H, J) {
                var I = f.map(s(G) ? J : H, function (L, K) {
                    return [
                        [K, L]
                    ]
                }).sort(function (L, K) {
                    return -(L[1].length - K[1].length)
                });
                var F = -1;
                f.each(I, function (L, M) {
                    var K = M[1];
                    if (t.substr(y, K.length).toLowerCase() == K.toLowerCase()) {
                        F = M[0];
                        y += K.length;
                        return false
                    }
                });
                if (F != -1) {
                    return F + 1
                } else {
                    throw "Unknown name at position " + y
                }
            };
            var v = function () {
                if (t.charAt(y) != z.charAt(m)) {
                    throw "Unexpected literal at position " + y
                }
                y++
            };
            var y = 0;
            for (var m = 0; m < z.length; m++) {
                if (w) {
                    if (z.charAt(m) == "'" && !s("'")) {
                        w = false
                    } else {
                        v()
                    }
                } else {
                    switch (z.charAt(m)) {
                        case "d":
                            x = E("d");
                            break;
                        case "D":
                            q("D", r, C);
                            break;
                        case "o":
                            p = E("o");
                            break;
                        case "m":
                            D = E("m");
                            break;
                        case "M":
                            D = q("M", k, n);
                            break;
                        case "y":
                            o = E("y");
                            break;
                        case "@":
                            var B = new Date(E("@"));
                            o = B.getFullYear();
                            D = B.getMonth() + 1;
                            x = B.getDate();
                            break;
                        case "!":
                            var B = new Date((E("!") - this._ticksTo1970) / 10000);
                            o = B.getFullYear();
                            D = B.getMonth() + 1;
                            x = B.getDate();
                            break;
                        case "'":
                            if (s("'")) {
                                v()
                            } else {
                                w = true
                            }
                            break;
                        default:
                            v()
                    }
                }
            }
            if (y < t.length) {
                throw "Extra/unparsed characters found in date: " + t.substring(y)
            }
            if (o == -1) {
                o = new Date().getFullYear()
            } else {
                if (o < 100) {
                    o += new Date().getFullYear() - new Date().getFullYear() % 100 + (o <= l ? 0 : -100)
                }
            } if (p > -1) {
                D = 1;
                x = p;
                do {
                    var u = this._getDaysInMonth(o, D - 1);
                    if (x <= u) {
                        break
                    }
                    D++;
                    x -= u
                } while (true)
            }
            var B = this._daylightSavingAdjust(new Date(o, D - 1, x));
            if (B.getFullYear() != o || B.getMonth() + 1 != D || B.getDate() != x) {
                throw "Invalid date"
            }
            return B
        }, ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function (t, n, o) {
            if (!n) {
                return ""
            }
            var w = (o ? o.dayNamesShort : null) || this._defaults.dayNamesShort;
            var l = (o ? o.dayNames : null) || this._defaults.dayNames;
            var r = (o ? o.monthNamesShort : null) || this._defaults.monthNamesShort;
            var p = (o ? o.monthNames : null) || this._defaults.monthNames;
            var u = function (x) {
                var y = (v + 1 < t.length && t.charAt(v + 1) == x);
                if (y) {
                    v++
                }
                return y
            };
            var k = function (z, A, x) {
                var y = "" + A;
                if (u(z)) {
                    while (y.length < x) {
                        y = "0" + y
                    }
                }
                return y
            };
            var q = function (x, z, y, A) {
                return (u(x) ? A[z] : y[z])
            };
            var m = "";
            var s = false;
            if (n) {
                for (var v = 0; v < t.length; v++) {
                    if (s) {
                        if (t.charAt(v) == "'" && !u("'")) {
                            s = false
                        } else {
                            m += t.charAt(v)
                        }
                    } else {
                        switch (t.charAt(v)) {
                            case "d":
                                m += k("d", n.getDate(), 2);
                                break;
                            case "D":
                                m += q("D", n.getDay(), w, l);
                                break;
                            case "o":
                                m += k("o", Math.round((new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime() - new Date(n.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                                break;
                            case "m":
                                m += k("m", n.getMonth() + 1, 2);
                                break;
                            case "M":
                                m += q("M", n.getMonth(), r, p);
                                break;
                            case "y":
                                m += (u("y") ? n.getFullYear() : (n.getYear() % 100 < 10 ? "0" : "") + n.getYear() % 100);
                                break;
                            case "@":
                                m += n.getTime();
                                break;
                            case "!":
                                m += n.getTime() * 10000 + this._ticksTo1970;
                                break;
                            case "'":
                                if (u("'")) {
                                    m += "'"
                                } else {
                                    s = true
                                }
                                break;
                            default:
                                m += t.charAt(v)
                        }
                    }
                }
            }
            return m
        }, _possibleChars: function (o) {
            var n = "";
            var l = false;
            var k = function (p) {
                var q = (m + 1 < o.length && o.charAt(m + 1) == p);
                if (q) {
                    m++
                }
                return q
            };
            for (var m = 0; m < o.length; m++) {
                if (l) {
                    if (o.charAt(m) == "'" && !k("'")) {
                        l = false
                    } else {
                        n += o.charAt(m)
                    }
                } else {
                    switch (o.charAt(m)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            n += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            if (k("'")) {
                                n += "'"
                            } else {
                                l = true
                            }
                            break;
                        default:
                            n += o.charAt(m)
                    }
                }
            }
            return n
        }, _get: function (l, k) {
            return l.settings[k] !== c ? l.settings[k] : this._defaults[k]
        }, _setDateFromField: function (p, m) {
            if (p.input.val() == p.lastVal) {
                return
            }
            var k = this._get(p, "dateFormat");
            var r = p.lastVal = p.input ? p.input.val() : null;
            var l, q;
            l = q = this._getDefaultDate(p);
            var n = this._getFormatConfig(p);
            try {
                l = this.parseDate(k, r, n) || q
            } catch (o) {
                this.log(o);
                r = (m ? "" : r)
            }
            p.selectedDay = l.getDate();
            p.drawMonth = p.selectedMonth = l.getMonth();
            p.drawYear = p.selectedYear = l.getFullYear();
            p.currentDay = (r ? l.getDate() : 0);
            p.currentMonth = (r ? l.getMonth() : 0);
            p.currentYear = (r ? l.getFullYear() : 0);
            this._adjustInstDate(p)
        }, _getDefaultDate: function (k) {
            return this._restrictMinMax(k, this._determineDate(k, this._get(k, "defaultDate"), new Date()))
        }, _determineDate: function (o, l, p) {
            var n = function (r) {
                var q = new Date();
                q.setDate(q.getDate() + r);
                return q
            };
            var m = function (x) {
                try {
                    return f.datepicker.parseDate(f.datepicker._get(o, "dateFormat"), x, f.datepicker._getFormatConfig(o))
                } catch (w) {}
                var r = (x.toLowerCase().match(/^c/) ? f.datepicker._getDate(o) : null) || new Date();
                var s = r.getFullYear();
                var v = r.getMonth();
                var q = r.getDate();
                var u = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var t = u.exec(x);
                while (t) {
                    switch (t[2] || "d") {
                        case "d":
                        case "D":
                            q += parseInt(t[1], 10);
                            break;
                        case "w":
                        case "W":
                            q += parseInt(t[1], 10) * 7;
                            break;
                        case "m":
                        case "M":
                            v += parseInt(t[1], 10);
                            q = Math.min(q, f.datepicker._getDaysInMonth(s, v));
                            break;
                        case "y":
                        case "Y":
                            s += parseInt(t[1], 10);
                            q = Math.min(q, f.datepicker._getDaysInMonth(s, v));
                            break
                    }
                    t = u.exec(x)
                }
                return new Date(s, v, q)
            };
            var k = (l == null || l === "" ? p : (typeof l == "string" ? m(l) : (typeof l == "number" ? (isNaN(l) ? p : n(l)) : new Date(l.getTime()))));
            k = (k && k.toString() == "Invalid Date" ? p : k);
            if (k) {
                k.setHours(0);
                k.setMinutes(0);
                k.setSeconds(0);
                k.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(k)
        }, _daylightSavingAdjust: function (k) {
            if (!k) {
                return null
            }
            k.setHours(k.getHours() > 12 ? k.getHours() + 2 : 0);
            return k
        }, _setDate: function (q, n, p) {
            var k = !n;
            var m = q.selectedMonth;
            var o = q.selectedYear;
            var l = this._restrictMinMax(q, this._determineDate(q, n, new Date()));
            q.selectedDay = q.currentDay = l.getDate();
            q.drawMonth = q.selectedMonth = q.currentMonth = l.getMonth();
            q.drawYear = q.selectedYear = q.currentYear = l.getFullYear();
            if ((m != q.selectedMonth || o != q.selectedYear) && !p) {
                this._notifyChange(q)
            }
            this._adjustInstDate(q);
            if (q.input) {
                q.input.val(k ? "" : this._formatDate(q))
            }
        }, _getDate: function (l) {
            var k = (!l.currentYear || (l.input && l.input.val() == "") ? null : this._daylightSavingAdjust(new Date(l.currentYear, l.currentMonth, l.currentDay)));
            return k
        }, _attachHandlers: function (l) {
            var k = this._get(l, "stepMonths");
            var m = "#" + l.id.replace(/\\\\/g, "\\");
            l.dpDiv.find("[data-handler]").map(function () {
                var n = {
                    prev: function () {
                        window["DP_jQuery_" + j].datepicker._adjustDate(m, -k, "M")
                    }, next: function () {
                        window["DP_jQuery_" + j].datepicker._adjustDate(m, +k, "M")
                    }, hide: function () {
                        window["DP_jQuery_" + j].datepicker._hideDatepicker()
                    }, today: function () {
                        window["DP_jQuery_" + j].datepicker._gotoToday(m)
                    }, selectDay: function () {
                        window["DP_jQuery_" + j].datepicker._selectDay(m, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
                        return false
                    }, selectMonth: function () {
                        window["DP_jQuery_" + j].datepicker._selectMonthYear(m, this, "M");
                        return false
                    }, selectYear: function () {
                        window["DP_jQuery_" + j].datepicker._selectMonthYear(m, this, "Y");
                        return false
                    }
                };
                f(this).bind(this.getAttribute("data-event"), n[this.getAttribute("data-handler")])
            })
        }, _generateHTML: function (ad) {
            var G = new Date();
            G = this._daylightSavingAdjust(new Date(G.getFullYear(), G.getMonth(), G.getDate()));
            var ak = this._get(ad, "isRTL");
            var am = this._get(ad, "showButtonPanel");
            var Z = this._get(ad, "hideIfNoPrevNext");
            var L = this._get(ad, "navigationAsDateFormat");
            var C = this._getNumberOfMonths(ad);
            var s = this._get(ad, "showCurrentAtPos");
            var O = this._get(ad, "stepMonths");
            var J = (C[0] != 1 || C[1] != 1);
            var n = this._daylightSavingAdjust((!ad.currentDay ? new Date(9999, 9, 9) : new Date(ad.currentYear, ad.currentMonth, ad.currentDay)));
            var t = this._getMinMaxDate(ad, "min");
            var D = this._getMinMaxDate(ad, "max");
            var k = ad.drawMonth - s;
            var aa = ad.drawYear;
            if (k < 0) {
                k += 12;
                aa--
            }
            if (D) {
                var F = this._daylightSavingAdjust(new Date(D.getFullYear(), D.getMonth() - (C[0] * C[1]) + 1, D.getDate()));
                F = (t && F < t ? t : F);
                while (this._daylightSavingAdjust(new Date(aa, k, 1)) > F) {
                    k--;
                    if (k < 0) {
                        k = 11;
                        aa--
                    }
                }
            }
            ad.drawMonth = k;
            ad.drawYear = aa;
            var E = this._get(ad, "prevText");
            E = (!L ? E : this.formatDate(E, this._daylightSavingAdjust(new Date(aa, k - O, 1)), this._getFormatConfig(ad)));
            var Y = (this._canAdjustMonth(ad, -1, aa, k) ? '<a class="ui-datepicker-prev ui-corner-all" data-handler="prev" data-event="click" title="' + E + '"><span class="ui-icon ui-icon-circle-triangle-' + (ak ? "e" : "w") + '">' + E + "</span></a>" : (Z ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + E + '"><span class="ui-icon ui-icon-circle-triangle-' + (ak ? "e" : "w") + '">' + E + "</span></a>"));
            var P = this._get(ad, "nextText");
            P = (!L ? P : this.formatDate(P, this._daylightSavingAdjust(new Date(aa, k + O, 1)), this._getFormatConfig(ad)));
            var p = (this._canAdjustMonth(ad, +1, aa, k) ? '<a class="ui-datepicker-next ui-corner-all" data-handler="next" data-event="click" title="' + P + '"><span class="ui-icon ui-icon-circle-triangle-' + (ak ? "w" : "e") + '">' + P + "</span></a>" : (Z ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + P + '"><span class="ui-icon ui-icon-circle-triangle-' + (ak ? "w" : "e") + '">' + P + "</span></a>"));
            var ag = this._get(ad, "currentText");
            var ac = (this._get(ad, "gotoCurrent") && ad.currentDay ? n : G);
            ag = (!L ? ag : this.formatDate(ag, ac, this._getFormatConfig(ad)));
            var T = (!ad.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" data-handler="hide" data-event="click">' + this._get(ad, "closeText") + "</button>" : "");
            var an = this._get(ad, "otherButton");
            var u = (typeof (an) == "undefined") ? "" : '<button type="button" id="' + an.id + '" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="' + (an.clickHide == true ? "hide" : "") + '" data-event="click">' + an.text + "</button>";
            var aj = (am) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (ak ? T : "") + (this._isInRange(ad, ac) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" data-handler="today" data-event="click">' + ag + "</button>" : "") + u + (ak ? "" : T) + "</div>" : "";
            var N = parseInt(this._get(ad, "firstDay"), 10);
            N = (isNaN(N) ? 0 : N);
            var ao = this._get(ad, "showWeek");
            var x = this._get(ad, "dayNames");
            var V = this._get(ad, "dayNamesShort");
            var A = this._get(ad, "dayNamesMin");
            var y = this._get(ad, "monthNames");
            var l = this._get(ad, "monthNamesShort");
            var af = this._get(ad, "beforeShowDay");
            var v = this._get(ad, "showOtherMonths");
            var I = this._get(ad, "selectOtherMonths");
            var m = this._get(ad, "calculateWeek") || this.iso8601Week;
            var ai = this._getDefaultDate(ad);
            var W = "";
            for (var H = 0; H < C[0]; H++) {
                var M = "";
                this.maxRows = 4;
                for (var w = 0; w < C[1]; w++) {
                    var q = this._daylightSavingAdjust(new Date(aa, k, ad.selectedDay));
                    var X = " ui-corner-all";
                    var S = "";
                    if (J) {
                        S += '<div class="ui-datepicker-group';
                        if (C[1] > 1) {
                            switch (w) {
                                case 0:
                                    S += " ui-datepicker-group-first";
                                    X = " ui-corner-" + (ak ? "right" : "left");
                                    break;
                                case C[1] - 1:
                                    S += " ui-datepicker-group-last";
                                    X = " ui-corner-" + (ak ? "left" : "right");
                                    break;
                                default:
                                    S += " ui-datepicker-group-middle";
                                    X = "";
                                    break
                            }
                        }
                        S += '">'
                    }
                    S += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + X + '">' + (/all|left/.test(X) && H == 0 ? (ak ? p : Y) : "") + (/all|right/.test(X) && H == 0 ? (ak ? Y : p) : "") + this._generateMonthYearHeader(ad, k, aa, t, D, H > 0 || w > 0, y, l) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
                    var U = (ao ? '<th class="ui-datepicker-week-col">' + this._get(ad, "weekHeader") + "</th>" : "");
                    for (var ap = 0; ap < 7; ap++) {
                        var R = (ap + N) % 7;
                        U += "<th" + ((ap + N + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + x[R] + '">' + A[R] + "</span></th>"
                    }
                    S += U + "</tr></thead><tbody>";
                    var r = this._getDaysInMonth(aa, k);
                    if (aa == ad.selectedYear && k == ad.selectedMonth) {
                        ad.selectedDay = Math.min(ad.selectedDay, r)
                    }
                    var K = (this._getFirstDayOfMonth(aa, k) - N + 7) % 7;
                    var z = Math.ceil((K + r) / 7);
                    var ab = (J ? this.maxRows > z ? this.maxRows : z : z);
                    this.maxRows = ab;
                    var ae = this._daylightSavingAdjust(new Date(aa, k, 1 - K));
                    for (var o = 0; o < ab; o++) {
                        S += "<tr>";
                        var ah = (!ao ? "" : '<td class="ui-datepicker-week-col">' + this._get(ad, "calculateWeek")(ae) + "</td>");
                        for (var ap = 0; ap < 7; ap++) {
                            var al = (af ? af.apply((ad.input ? ad.input[0] : null), [ae]) : [true, ""]);
                            var Q = (ae.getMonth() != k);
                            var B = (Q && !I) || !al[0] || (t && ae < t) || (D && ae > D);
                            ah += '<td class="' + ((ap + N + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (Q ? " ui-datepicker-other-month" : "") + ((ae.getTime() == q.getTime() && k == ad.selectedMonth && ad._keyEvent) || (ai.getTime() == ae.getTime() && ai.getTime() == q.getTime()) ? " " + this._dayOverClass : "") + (B ? " " + this._unselectableClass + " ui-state-disabled" : "") + (Q && !v ? "" : " " + al[1] + (ae.getTime() == n.getTime() ? " " + this._currentClass : "") + (ae.getTime() == G.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!Q || v) && al[2] ? ' title="' + al[2] + '"' : "") + (B ? "" : ' data-handler="selectDay" data-event="click" data-month="' + ae.getMonth() + '" data-year="' + ae.getFullYear() + '"') + ">" + (Q && !v ? "&#xa0;" : (B ? '<span class="ui-state-default">' + ae.getDate() + "</span>" : '<a class="ui-state-default' + (ae.getTime() == G.getTime() ? " ui-state-highlight" : "") + (ae.getTime() == n.getTime() ? " ui-state-active" : "") + (Q ? " ui-priority-secondary" : "") + '" href="#">' + ae.getDate() + "</a>")) + "</td>";
                            ae.setDate(ae.getDate() + 1);
                            ae = this._daylightSavingAdjust(ae)
                        }
                        S += ah + "</tr>"
                    }
                    k++;
                    if (k > 11) {
                        k = 0;
                        aa++
                    }
                    S += "</tbody></table>" + (J ? "</div>" + ((C[0] > 0 && w == C[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
                    M += S
                }
                W += M
            }
            W += aj + (f.browser.msie && parseInt(f.browser.version, 10) < 7 && !ad.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
            ad._keyEvent = false;
            return W
        }, _generateMonthYearHeader: function (o, m, w, q, u, x, s, k) {
            var n = this._get(o, "changeMonth");
            var D = this._get(o, "changeYear");
            var E = this._get(o, "showMonthAfterYear");
            var t = '<div class="ui-datepicker-title">';
            var A = "";
            if (x || !n) {
                A += '<span class="ui-datepicker-month">' + s[m] + "</span>"
            } else {
                var B = (q && q.getFullYear() == w);
                var l = (u && u.getFullYear() == w);
                A += '<select class="ui-datepicker-month" data-handler="selectMonth" data-event="change">';
                for (var C = 0; C < 12; C++) {
                    if ((!B || C >= q.getMonth()) && (!l || C <= u.getMonth())) {
                        A += '<option value="' + C + '"' + (C == m ? ' selected="selected"' : "") + ">" + k[C] + "</option>"
                    }
                }
                A += "</select>"
            } if (!E) {
                t += A + (x || !(n && D) ? "&#xa0;" : "")
            }
            if (!o.yearshtml) {
                o.yearshtml = "";
                if (x || !D) {
                    t += '<span class="ui-datepicker-year">' + w + "</span>"
                } else {
                    var z = this._get(o, "yearRange").split(":");
                    var p = new Date().getFullYear();
                    var y = function (G) {
                        var F = (G.match(/c[+-].*/) ? w + parseInt(G.substring(1), 10) : (G.match(/[+-].*/) ? p + parseInt(G, 10) : parseInt(G, 10)));
                        return (isNaN(F) ? p : F)
                    };
                    var v = y(z[0]);
                    var r = Math.max(v, y(z[1] || ""));
                    v = (q ? Math.max(v, q.getFullYear()) : v);
                    r = (u ? Math.min(r, u.getFullYear()) : r);
                    o.yearshtml += '<select class="ui-datepicker-year" data-handler="selectYear" data-event="change">';
                    for (; v <= r; v++) {
                        o.yearshtml += '<option value="' + v + '"' + (v == w ? ' selected="selected"' : "") + ">" + v + "</option>"
                    }
                    o.yearshtml += "</select>";
                    t += o.yearshtml;
                    o.yearshtml = null
                }
            }
            t += this._get(o, "yearSuffix");
            if (E) {
                t += (x || !(n && D) ? "&#xa0;" : "") + A
            }
            t += "</div>";
            return t
        }, _adjustInstDate: function (n, q, p) {
            var m = n.drawYear + (p == "Y" ? q : 0);
            var o = n.drawMonth + (p == "M" ? q : 0);
            var k = Math.min(n.selectedDay, this._getDaysInMonth(m, o)) + (p == "D" ? q : 0);
            var l = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(m, o, k)));
            n.selectedDay = l.getDate();
            n.drawMonth = n.selectedMonth = l.getMonth();
            n.drawYear = n.selectedYear = l.getFullYear();
            if (p == "M" || p == "Y") {
                this._notifyChange(n)
            }
        }, _restrictMinMax: function (n, l) {
            var m = this._getMinMaxDate(n, "min");
            var o = this._getMinMaxDate(n, "max");
            var k = (m && l < m ? m : l);
            k = (o && k > o ? o : k);
            return k
        }, _notifyChange: function (l) {
            var k = this._get(l, "onChangeMonthYear");
            if (k) {
                k.apply((l.input ? l.input[0] : null), [l.selectedYear, l.selectedMonth + 1, l])
            }
        }, _getNumberOfMonths: function (l) {
            var k = this._get(l, "numberOfMonths");
            return (k == null ? [1, 1] : (typeof k == "number" ? [1, k] : k))
        }, _getMinMaxDate: function (l, k) {
            return this._determineDate(l, this._get(l, k + "Date"), null)
        }, _getDaysInMonth: function (k, l) {
            return 32 - this._daylightSavingAdjust(new Date(k, l, 32)).getDate()
        }, _getFirstDayOfMonth: function (k, l) {
            return new Date(k, l, 1).getDay()
        }, _canAdjustMonth: function (n, p, m, o) {
            var k = this._getNumberOfMonths(n);
            var l = this._daylightSavingAdjust(new Date(m, o + (p < 0 ? p : k[0] * k[1]), 1));
            if (p < 0) {
                l.setDate(this._getDaysInMonth(l.getFullYear(), l.getMonth()))
            }
            return this._isInRange(n, l)
        }, _isInRange: function (m, k) {
            var l = this._getMinMaxDate(m, "min");
            var n = this._getMinMaxDate(m, "max");
            return ((!l || k.getTime() >= l.getTime()) && (!n || k.getTime() <= n.getTime()))
        }, _getFormatConfig: function (k) {
            var l = this._get(k, "shortYearCutoff");
            l = (typeof l != "string" ? l : new Date().getFullYear() % 100 + parseInt(l, 10));
            return {
                shortYearCutoff: l,
                dayNamesShort: this._get(k, "dayNamesShort"),
                dayNames: this._get(k, "dayNames"),
                monthNamesShort: this._get(k, "monthNamesShort"),
                monthNames: this._get(k, "monthNames")
            }
        }, _formatDate: function (n, k, o, m) {
            if (!k) {
                n.currentDay = n.selectedDay;
                n.currentMonth = n.selectedMonth;
                n.currentYear = n.selectedYear
            }
            var l = (k ? (typeof k == "object" ? k : this._daylightSavingAdjust(new Date(m, o, k))) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay)));
            return this.formatDate(this._get(n, "dateFormat"), l, this._getFormatConfig(n))
        }
    });

    function b(l) {
        var k = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return l.bind("mouseout", function (n) {
            var m = f(n.target).closest(k);
            if (!m.length) {
                return
            }
            m.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind("mouseover", function (n) {
            var m = f(n.target).closest(k);
            if (f.datepicker._isDisabledDatepicker(d.inline ? l.parent()[0] : d.input[0]) || !m.length) {
                return
            }
            m.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
            m.addClass("ui-state-hover");
            if (m.hasClass("ui-datepicker-prev")) {
                m.addClass("ui-datepicker-prev-hover")
            }
            if (m.hasClass("ui-datepicker-next")) {
                m.addClass("ui-datepicker-next-hover")
            }
        })
    }

    function e(m, l) {
        f.extend(m, l);
        for (var k in l) {
            if (l[k] == null || l[k] == c) {
                m[k] = l[k]
            }
        }
        return m
    }

    function h(k) {
        return (k && ((f.browser.safari && typeof k == "object" && k.length) || (k.constructor && k.constructor.toString().match(/\Array\(\)/))))
    }
    f.fn.datepicker = function (l) {
        if (!this.length) {
            return this
        }
        if (!f.datepicker.initialized) {
            f(document).mousedown(f.datepicker._checkExternalClick).find("body").append(f.datepicker.dpDiv);
            f.datepicker.initialized = true
        }
        var k = Array.prototype.slice.call(arguments, 1);
        if (typeof l == "string" && (l == "isDisabled" || l == "getDate" || l == "widget")) {
            return f.datepicker["_" + l + "Datepicker"].apply(f.datepicker, [this[0]].concat(k))
        }
        if (l == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
            return f.datepicker["_" + l + "Datepicker"].apply(f.datepicker, [this[0]].concat(k))
        }
        return this.each(function () {
            typeof l == "string" ? f.datepicker["_" + l + "Datepicker"].apply(f.datepicker, [this].concat(k)) : f.datepicker._attachDatepicker(this, l)
        })
    };
    f.datepicker = new g();
    f.datepicker.initialized = false;
    f.datepicker.uuid = new Date().getTime();
    f.datepicker.version = "@VERSION";
    window["DP_jQuery_" + j] = f
})(jQuery);
jQuery(function (b) {
    b.datepicker.regional["zh-CN"] = {
        closeText: "关闭",
        prevText: "&#x3c;上月",
        nextText: "下月&#x3e;",
        currentText: "今天",
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
        weekHeader: "周",
        dateFormat: "yy-mm-dd",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: "年"
    };
    b.datepicker.setDefaults(b.datepicker.regional["zh-CN"])
});
(function (b, c) {
    b.widget("ui.droppable", {
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: false,
            addClasses: true,
            greedy: false,
            hoverClass: false,
            scope: "default",
            tolerance: "intersect"
        },
        _create: function () {
            var e = this.options,
                d = e.accept;
            this.isover = 0;
            this.isout = 1;
            this.accept = b.isFunction(d) ? d : function (f) {
                return f.is(d)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            b.ui.ddmanager.droppables[e.scope] = b.ui.ddmanager.droppables[e.scope] || [];
            b.ui.ddmanager.droppables[e.scope].push(this);
            (e.addClasses && this.element.addClass("ui-droppable"))
        }, destroy: function () {
            var d = b.ui.ddmanager.droppables[this.options.scope];
            for (var e = 0; e < d.length; e++) {
                if (d[e] == this) {
                    d.splice(e, 1)
                }
            }
            this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable");
            return this
        }, _setOption: function (d, e) {
            if (d == "accept") {
                this.accept = b.isFunction(e) ? e : function (f) {
                    return f.is(e)
                }
            }
            b.Widget.prototype._setOption.apply(this, arguments)
        }, _activate: function (e) {
            var d = b.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.addClass(this.options.activeClass)
            }(d && this._trigger("activate", e, this.ui(d)))
        }, _deactivate: function (e) {
            var d = b.ui.ddmanager.current;
            if (this.options.activeClass) {
                this.element.removeClass(this.options.activeClass)
            }(d && this._trigger("deactivate", e, this.ui(d)))
        }, _over: function (e) {
            var d = b.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (d.currentItem || d.element))) {
                if (this.options.hoverClass) {
                    this.element.addClass(this.options.hoverClass)
                }
                this._trigger("over", e, this.ui(d))
            }
        }, _out: function (e) {
            var d = b.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0]) {
                return
            }
            if (this.accept.call(this.element[0], (d.currentItem || d.element))) {
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("out", e, this.ui(d))
            }
        }, _drop: function (e, f) {
            var d = f || b.ui.ddmanager.current;
            if (!d || (d.currentItem || d.element)[0] == this.element[0]) {
                return false
            }
            var g = false;
            this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function () {
                var h = b.data(this, "droppable");
                if (h.options.greedy && !h.options.disabled && h.options.scope == d.options.scope && h.accept.call(h.element[0], (d.currentItem || d.element)) && b.ui.intersect(d, b.extend(h, {
                        offset: h.element.offset()
                    }), h.options.tolerance)) {
                    g = true;
                    return false
                }
            });
            if (g) {
                return false
            }
            if (this.accept.call(this.element[0], (d.currentItem || d.element))) {
                if (this.options.activeClass) {
                    this.element.removeClass(this.options.activeClass)
                }
                if (this.options.hoverClass) {
                    this.element.removeClass(this.options.hoverClass)
                }
                this._trigger("drop", e, this.ui(d));
                return this.element
            }
            return false
        }, ui: function (d) {
            return {
                draggable: (d.currentItem || d.element),
                helper: d.helper,
                position: d.position,
                offset: d.positionAbs
            }
        }
    });
    b.extend(b.ui.droppable, {
        version: "@VERSION"
    });
    b.ui.intersect = function (s, k, p) {
        if (!k.offset) {
            return false
        }
        var f = (s.positionAbs || s.position.absolute).left,
            e = f + s.helperProportions.width,
            o = (s.positionAbs || s.position.absolute).top,
            n = o + s.helperProportions.height;
        var h = k.offset.left,
            d = h + k.proportions.width,
            q = k.offset.top,
            m = q + k.proportions.height;
        switch (p) {
            case "fit":
                return (h <= f && e <= d && q <= o && n <= m);
                break;
            case "intersect":
                return (h < f + (s.helperProportions.width / 2) && e - (s.helperProportions.width / 2) < d && q < o + (s.helperProportions.height / 2) && n - (s.helperProportions.height / 2) < m);
                break;
            case "pointer":
                var i = ((s.positionAbs || s.position.absolute).left + (s.clickOffset || s.offset.click).left),
                    j = ((s.positionAbs || s.position.absolute).top + (s.clickOffset || s.offset.click).top),
                    g = b.ui.isOver(j, i, q, h, k.proportions.height, k.proportions.width);
                return g;
                break;
            case "touch":
                return ((o >= q && o <= m) || (n >= q && n <= m) || (o < q && n > m)) && ((f >= h && f <= d) || (e >= h && e <= d) || (f < h && e > d));
                break;
            default:
                return false;
                break
        }
    };
    b.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function (g, k) {
            var d = b.ui.ddmanager.droppables[g.options.scope] || [];
            var h = k ? k.type : null;
            var l = (g.currentItem || g.element).find(":data(droppable)").andSelf();
            droppablesLoop: for (var f = 0; f < d.length; f++) {
                if (d[f].options.disabled || (g && !d[f].accept.call(d[f].element[0], (g.currentItem || g.element)))) {
                    continue
                }
                for (var e = 0; e < l.length; e++) {
                    if (l[e] == d[f].element[0]) {
                        d[f].proportions.height = 0;
                        continue droppablesLoop
                    }
                }
                d[f].visible = d[f].element.css("display") != "none";
                if (!d[f].visible) {
                    continue
                }
                if (h == "mousedown") {
                    d[f]._activate.call(d[f], k)
                }
                d[f].offset = d[f].element.offset();
                d[f].proportions = {
                    width: d[f].element[0].offsetWidth,
                    height: d[f].element[0].offsetHeight
                }
            }
        }, drop: function (d, e) {
            var f = false;
            b.each(b.ui.ddmanager.droppables[d.options.scope] || [], function () {
                if (!this.options) {
                    return
                }
                if (!this.options.disabled && this.visible && b.ui.intersect(d, this, this.options.tolerance)) {
                    f = this._drop.call(this, e) || f
                }
                if (!this.options.disabled && this.visible && this.accept.call(this.element[0], (d.currentItem || d.element))) {
                    this.isout = 1;
                    this.isover = 0;
                    this._deactivate.call(this, e)
                }
            });
            return f
        }, dragStart: function (d, e) {
            d.element.parents(":not(body,html)").bind("scroll.droppable", function () {
                if (!d.options.refreshPositions) {
                    b.ui.ddmanager.prepareOffsets(d, e)
                }
            })
        }, drag: function (d, e) {
            if (d.options.refreshPositions) {
                b.ui.ddmanager.prepareOffsets(d, e)
            }
            b.each(b.ui.ddmanager.droppables[d.options.scope] || [], function () {
                if (this.options.disabled || this.greedyChild || !this.visible) {
                    return
                }
                var h = b.ui.intersect(d, this, this.options.tolerance);
                var j = !h && this.isover == 1 ? "isout" : (h && this.isover == 0 ? "isover" : null);
                if (!j) {
                    return
                }
                var i;
                if (this.options.greedy) {
                    var g = this.options.scope;
                    var f = this.element.parents(":data(droppable)").filter(function () {
                        return b.data(this, "droppable").options.scope === g
                    });
                    if (f.length) {
                        i = b.data(f[0], "droppable");
                        i.greedyChild = (j == "isover" ? 1 : 0)
                    }
                }
                if (i && j == "isover") {
                    i.isover = 0;
                    i.isout = 1;
                    i._out.call(i, e)
                }
                this[j] = 1;
                this[j == "isout" ? "isover" : "isout"] = 0;
                this[j == "isover" ? "_over" : "_out"].call(this, e);
                if (i && j == "isout") {
                    i.isout = 0;
                    i.isover = 1;
                    i._over.call(i, e)
                }
            })
        }, dragStop: function (d, e) {
            d.element.parents(":not(body,html)").unbind("scroll.droppable");
            if (!d.options.refreshPositions) {
                b.ui.ddmanager.prepareOffsets(d, e)
            }
        }
    }
})(jQuery);
(function (e, g) {
    var d = 0,
        c = 0;

    function f() {
        return ++d
    }

    function b() {
        return ++c
    }
    e.widget("ui.tabs", {
        options: {
            add: null,
            ajaxOptions: null,
            cache: false,
            cookie: null,
            collapsible: false,
            disable: null,
            disabled: [],
            enable: null,
            event: "click",
            fx: null,
            idPrefix: "ui-tabs-",
            load: null,
            panelTemplate: "<div></div>",
            remove: null,
            select: null,
            show: null,
            spinner: "<em>Loading&#8230;</em>",
            tabTemplate: "<li><a href='#{href}'><span>#{label}</span></a></li>"
        },
        _create: function () {
            this._tabify(true)
        }, _setOption: function (h, i) {
            if (h == "selected") {
                if (this.options.collapsible && i == this.options.selected) {
                    return
                }
                this.select(i)
            } else {
                this.options[h] = i;
                this._tabify()
            }
        }, _tabId: function (h) {
            return h.title && h.title.replace(/\s/g, "_").replace(/[^\w\u00c0-\uFFFF-]/g, "") || this.options.idPrefix + f()
        }, _sanitizeSelector: function (h) {
            return h.replace(/:/g, "\\:")
        }, _cookie: function () {
            var h = this.cookie || (this.cookie = this.options.cookie.name || "ui-tabs-" + b());
            return e.cookie.apply(null, [h].concat(e.makeArray(arguments)))
        }, _ui: function (i, h) {
            return {
                tab: i,
                panel: h,
                index: this.anchors.index(i)
            }
        }, _cleanup: function () {
            this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function () {
                var h = e(this);
                h.html(h.data("label.tabs")).removeData("label.tabs")
            })
        }, _tabify: function (u) {
            var v = this,
                k = this.options,
                j = /^#.+/;
            this.list = this.element.find("ol,ul").eq(0);
            this.lis = e(" > li:has(a[href])", this.list);
            this.anchors = this.lis.map(function () {
                return e("a", this)[0]
            });
            this.panels = e([]);
            this.anchors.each(function (x, o) {
                var w = e(o).attr("href");
                var y = w.split("#")[0],
                    z;
                if (y && (y === location.toString().split("#")[0] || (z = e("base")[0]) && y === z.href)) {
                    w = o.hash;
                    o.href = w
                }
                if (j.test(w)) {
                    v.panels = v.panels.add(v.element.find(v._sanitizeSelector(w)))
                } else {
                    if (w && w !== "#") {
                        e.data(o, "href.tabs", w);
                        e.data(o, "load.tabs", w.replace(/#.*$/, ""));
                        var B = v._tabId(o);
                        o.href = "#" + B;
                        var A = v.element.find("#" + B);
                        if (!A.length) {
                            A = e(k.panelTemplate).attr("id", B).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(v.panels[x - 1] || v.list);
                            A.data("destroy.tabs", true)
                        }
                        v.panels = v.panels.add(A)
                    } else {
                        k.disabled.push(x)
                    }
                }
            });
            if (u) {
                this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");
                this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
                this.lis.addClass("ui-state-default ui-corner-top");
                this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");
                if (k.selected === g) {
                    if (location.hash) {
                        this.anchors.each(function (w, o) {
                            if (o.hash == location.hash) {
                                k.selected = w;
                                return false
                            }
                        })
                    }
                    if (typeof k.selected !== "number" && k.cookie) {
                        k.selected = parseInt(v._cookie(), 10)
                    }
                    if (typeof k.selected !== "number" && this.lis.filter(".ui-tabs-selected").length) {
                        k.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
                    }
                    k.selected = k.selected || (this.lis.length ? 0 : -1)
                } else {
                    if (k.selected === null) {
                        k.selected = -1
                    }
                }
                k.selected = ((k.selected >= 0 && this.anchors[k.selected]) || k.selected < 0) ? k.selected : 0;
                k.disabled = e.unique(k.disabled.concat(e.map(this.lis.filter(".ui-state-disabled"), function (w, o) {
                    return v.lis.index(w)
                }))).sort();
                if (e.inArray(k.selected, k.disabled) != -1) {
                    k.disabled.splice(e.inArray(k.selected, k.disabled), 1)
                }
                this.panels.addClass("ui-tabs-hide");
                this.lis.removeClass("ui-tabs-selected ui-state-active");
                if (k.selected >= 0 && this.anchors.length) {
                    v.element.find(v._sanitizeSelector(v.anchors[k.selected].hash)).removeClass("ui-tabs-hide");
                    this.lis.eq(k.selected).addClass("ui-tabs-selected ui-state-active");
                    v.element.queue("tabs", function () {
                        v._trigger("show", null, v._ui(v.anchors[k.selected], v.element.find(v._sanitizeSelector(v.anchors[k.selected].hash))[0]))
                    });
                    this.load(k.selected)
                }
                e(window).bind("unload", function () {
                    v.lis.add(v.anchors).unbind(".tabs");
                    v.lis = v.anchors = v.panels = null
                })
            } else {
                k.selected = this.lis.index(this.lis.filter(".ui-tabs-selected"))
            }
            this.element[k.collapsible ? "addClass" : "removeClass"]("ui-tabs-collapsible");
            if (k.cookie) {
                this._cookie(k.selected, k.cookie)
            }
            for (var n = 0, t;
                 (t = this.lis[n]); n++) {
                e(t)[e.inArray(n, k.disabled) != -1 && !e(t).hasClass("ui-tabs-selected") ? "addClass" : "removeClass"]("ui-state-disabled")
            }
            if (k.cache === false) {
                this.anchors.removeData("cache.tabs")
            }
            this.lis.add(this.anchors).unbind(".tabs");
            if (k.event !== "mouseover") {
                var m = function (o, i) {
                    if (i.is(":not(.ui-state-disabled)")) {
                        i.addClass("ui-state-" + o)
                    }
                };
                var q = function (o, i) {
                    i.removeClass("ui-state-" + o)
                };
                this.lis.bind("mouseover.tabs", function () {
                    m("hover", e(this))
                });
                this.lis.bind("mouseout.tabs", function () {
                    q("hover", e(this))
                });
                this.anchors.bind("focus.tabs", function () {
                    m("focus", e(this).closest("li"))
                });
                this.anchors.bind("blur.tabs", function () {
                    q("focus", e(this).closest("li"))
                })
            }
            var h, p;
            if (k.fx) {
                if (e.isArray(k.fx)) {
                    h = k.fx[0];
                    p = k.fx[1]
                } else {
                    h = p = k.fx
                }
            }

            function l(i, o) {
                i.css("display", "");
                if (!e.support.opacity && o.opacity) {
                    i[0].style.removeAttribute("filter")
                }
            }
            var r = p ? function (i, o) {
                e(i).closest("li").addClass("ui-tabs-selected ui-state-active");
                o.hide().removeClass("ui-tabs-hide").animate(p, p.duration || "normal", function () {
                    l(o, p);
                    v._trigger("show", null, v._ui(i, o[0]))
                })
            } : function (i, o) {
                e(i).closest("li").addClass("ui-tabs-selected ui-state-active");
                o.removeClass("ui-tabs-hide");
                v._trigger("show", null, v._ui(i, o[0]))
            };
            var s = h ? function (o, i) {
                i.animate(h, h.duration || "normal", function () {
                    v.lis.removeClass("ui-tabs-selected ui-state-active");
                    i.addClass("ui-tabs-hide");
                    l(i, h);
                    v.element.dequeue("tabs")
                })
            } : function (o, i, w) {
                v.lis.removeClass("ui-tabs-selected ui-state-active");
                i.addClass("ui-tabs-hide");
                v.element.dequeue("tabs")
            };
            this.anchors.bind(k.event + ".tabs", function () {
                var o = this,
                    x = e(o).closest("li"),
                    i = v.panels.filter(":not(.ui-tabs-hide)"),
                    w = v.element.find(v._sanitizeSelector(o.hash));
                if ((x.hasClass("ui-tabs-selected") && !k.collapsible) || x.hasClass("ui-state-disabled") || x.hasClass("ui-state-processing") || v.panels.filter(":animated").length || v._trigger("select", null, v._ui(this, w[0])) === false) {
                    this.blur();
                    return false
                }
                k.selected = v.anchors.index(this);
                v.abort();
                if (k.collapsible) {
                    if (x.hasClass("ui-tabs-selected")) {
                        k.selected = -1;
                        if (k.cookie) {
                            v._cookie(k.selected, k.cookie)
                        }
                        v.element.queue("tabs", function () {
                            s(o, i)
                        }).dequeue("tabs");
                        this.blur();
                        return false
                    } else {
                        if (!i.length) {
                            if (k.cookie) {
                                v._cookie(k.selected, k.cookie)
                            }
                            v.element.queue("tabs", function () {
                                r(o, w)
                            });
                            v.load(v.anchors.index(this));
                            this.blur();
                            return false
                        }
                    }
                }
                if (k.cookie) {
                    v._cookie(k.selected, k.cookie)
                }
                if (w.length) {
                    if (i.length) {
                        v.element.queue("tabs", function () {
                            s(o, i)
                        })
                    }
                    v.element.queue("tabs", function () {
                        r(o, w)
                    });
                    v.load(v.anchors.index(this))
                } else {
                    throw "jQuery UI Tabs: Mismatching fragment identifier."
                } if (e.browser.msie) {
                    this.blur()
                }
            });
            this.anchors.bind("click.tabs", function () {
                return false
            })
        }, _getIndex: function (h) {
            if (typeof h == "string") {
                h = this.anchors.index(this.anchors.filter("[href$='" + h + "']"))
            }
            return h
        }, destroy: function () {
            var h = this.options;
            this.abort();
            this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");
            this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");
            this.anchors.each(function () {
                var i = e.data(this, "href.tabs");
                if (i) {
                    this.href = i
                }
                var j = e(this).unbind(".tabs");
                e.each(["href", "load", "cache"], function (k, l) {
                    j.removeData(l + ".tabs")
                })
            });
            this.lis.unbind(".tabs").add(this.panels).each(function () {
                if (e.data(this, "destroy.tabs")) {
                    e(this).remove()
                } else {
                    e(this).removeClass(["ui-state-default", "ui-corner-top", "ui-tabs-selected", "ui-state-active", "ui-state-hover", "ui-state-focus", "ui-state-disabled", "ui-tabs-panel", "ui-widget-content", "ui-corner-bottom", "ui-tabs-hide"].join(" "))
                }
            });
            if (h.cookie) {
                this._cookie(null, h.cookie)
            }
            return this
        }, add: function (k, j, i) {
            if (i === g) {
                i = this.anchors.length
            }
            var h = this,
                m = this.options,
                p = e(m.tabTemplate.replace(/#\{href\}/g, k).replace(/#\{label\}/g, j)),
                n = !k.indexOf("#") ? k.replace("#", "") : this._tabId(e("a", p)[0]);
            p.addClass("ui-state-default ui-corner-top").data("destroy.tabs", true);
            var l = h.element.find("#" + n);
            if (!l.length) {
                l = e(m.panelTemplate).attr("id", n).data("destroy.tabs", true)
            }
            l.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");
            if (i >= this.lis.length) {
                p.appendTo(this.list);
                l.appendTo(this.list[0].parentNode)
            } else {
                p.insertBefore(this.lis[i]);
                l.insertBefore(this.panels[i])
            }
            m.disabled = e.map(m.disabled, function (q, o) {
                return q >= i ? ++q : q
            });
            this._tabify();
            if (this.anchors.length == 1) {
                m.selected = 0;
                p.addClass("ui-tabs-selected ui-state-active");
                l.removeClass("ui-tabs-hide");
                this.element.queue("tabs", function () {
                    h._trigger("show", null, h._ui(h.anchors[0], h.panels[0]))
                });
                this.load(0)
            }
            this._trigger("add", null, this._ui(this.anchors[i], this.panels[i]));
            return this
        }, remove: function (h) {
            h = this._getIndex(h);
            var j = this.options,
                k = this.lis.eq(h).remove(),
                i = this.panels.eq(h).remove();
            if (k.hasClass("ui-tabs-selected") && this.anchors.length > 1) {
                this.select(h + (h + 1 < this.anchors.length ? 1 : -1))
            }
            j.disabled = e.map(e.grep(j.disabled, function (m, l) {
                return m != h
            }), function (m, l) {
                return m >= h ? --m : m
            });
            this._tabify();
            this._trigger("remove", null, this._ui(k.find("a")[0], i[0]));
            return this
        }, enable: function (h) {
            h = this._getIndex(h);
            var i = this.options;
            if (e.inArray(h, i.disabled) == -1) {
                return
            }
            this.lis.eq(h).removeClass("ui-state-disabled");
            i.disabled = e.grep(i.disabled, function (k, j) {
                return k != h
            });
            this._trigger("enable", null, this._ui(this.anchors[h], this.panels[h]));
            return this
        }, disable: function (i) {
            i = this._getIndex(i);
            var h = this,
                j = this.options;
            if (i != j.selected) {
                this.lis.eq(i).addClass("ui-state-disabled");
                j.disabled.push(i);
                j.disabled.sort();
                this._trigger("disable", null, this._ui(this.anchors[i], this.panels[i]))
            }
            return this
        }, select: function (h) {
            h = this._getIndex(h);
            if (h == -1) {
                if (this.options.collapsible && this.options.selected != -1) {
                    h = this.options.selected
                } else {
                    return this
                }
            }
            this.anchors.eq(h).trigger(this.options.event + ".tabs");
            return this
        }, load: function (k) {
            k = this._getIndex(k);
            var i = this,
                m = this.options,
                h = this.anchors.eq(k)[0],
                j = e.data(h, "load.tabs");
            this.abort();
            if (!j || this.element.queue("tabs").length !== 0 && e.data(h, "cache.tabs")) {
                this.element.dequeue("tabs");
                return
            }
            this.lis.eq(k).addClass("ui-state-processing");
            if (m.spinner) {
                var l = e("span", h);
                l.data("label.tabs", l.html()).html(m.spinner)
            }
            this.xhr = e.ajax(e.extend({}, m.ajaxOptions, {
                url: j,
                success: function (o, n) {
                    i.element.find(i._sanitizeSelector(h.hash)).html(o);
                    i._cleanup();
                    if (m.cache) {
                        e.data(h, "cache.tabs", true)
                    }
                    i._trigger("load", null, i._ui(i.anchors[k], i.panels[k]));
                    try {
                        m.ajaxOptions.success(o, n)
                    } catch (p) {}
                }, error: function (p, n, o) {
                    i._cleanup();
                    i._trigger("load", null, i._ui(i.anchors[k], i.panels[k]));
                    try {
                        m.ajaxOptions.error(p, n, k, h)
                    } catch (o) {}
                }
            }));
            i.element.dequeue("tabs");
            return this
        }, abort: function () {
            this.element.queue([]);
            this.panels.stop(false, true);
            this.element.queue("tabs", this.element.queue("tabs").splice(-2, 2));
            if (this.xhr) {
                this.xhr.abort();
                delete this.xhr
            }
            this._cleanup();
            return this
        }, url: function (i, h) {
            this.anchors.eq(i).removeData("cache.tabs").data("load.tabs", h);
            return this
        }, length: function () {
            return this.anchors.length
        }
    });
    e.extend(e.ui.tabs, {
        version: "@VERSION"
    });
    e.extend(e.ui.tabs.prototype, {
        rotation: null,
        rotate: function (j, l) {
            var h = this,
                m = this.options;
            var i = h._rotate || (h._rotate = function (n) {
                    clearTimeout(h.rotation);
                    h.rotation = setTimeout(function () {
                        var o = m.selected;
                        h.select(++o < h.anchors.length ? o : 0)
                    }, j);
                    if (n) {
                        n.stopPropagation()
                    }
                });
            var k = h._unrotate || (h._unrotate = !l ? function (n) {
                    if (n.clientX) {
                        h.rotate(null)
                    }
                } : function (n) {
                    i()
                });
            if (j) {
                this.element.bind("tabsshow", i);
                this.anchors.bind(m.event + ".tabs", k);
                i()
            } else {
                clearTimeout(h.rotation);
                this.element.unbind("tabsshow", i);
                this.anchors.unbind(m.event + ".tabs", k);
                delete this._rotate;
                delete this._unrotate
            }
            return this
        }
    })
})(jQuery);
/*!
 * Marquee jQuery Plug-in
 *
 * Copyright 2009 Giva, Inc. (http://www.givainc.com/labs/)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Date: 2009-05-20
 * Rev:  1.0.01
 */
(function (b) {
    b.marquee = {
        version: "1.0.01"
    };
    b.fn.marquee = function (f) {
        var g = typeof arguments[0] == "string" && arguments[0];
        var e = g && Array.prototype.slice.call(arguments, 1) || arguments;
        var d = (this.length == 0) ? null : b.data(this[0], "marquee");
        if (d && g && this.length) {
            if (g.toLowerCase() == "object") {
                return d
            } else {
                if (d[g]) {
                    var c;
                    this.each(function (h) {
                        var j = b.data(this, "marquee")[g].apply(d, e);
                        if (h == 0 && j) {
                            if (!!j.jquery) {
                                c = b([]).add(j)
                            } else {
                                c = j;
                                return false
                            }
                        } else {
                            if (!!j && !!j.jquery) {
                                c = c.add(j)
                            }
                        }
                    });
                    return c || this
                } else {
                    return this
                }
            }
        } else {
            return this.each(function () {
                new b.Marquee(this, f)
            })
        }
    };
    b.Marquee = function (f, r) {
        r = b.extend({}, b.Marquee.defaults, r);
        var p = this,
            n = b(f),
            g = n.find("> li"),
            i = -1,
            h = false,
            m = false,
            o = 0;
        b.data(n[0], "marquee", p);
        this.pause = function () {
            h = true;
            q()
        };
        this.resume = function () {
            h = false;
            e()
        };
        this.update = function () {
            var s = g.length;
            g = n.find("> li");
            if (s <= 1) {
                e()
            }
        };

        function l(s) {
            if (g.filter("." + r.cssShowing).length > 0) {
                return false
            }
            var u = g.eq(s);
            if (b.isFunction(r.beforeshow)) {
                r.beforeshow.apply(p, [n, u])
            }
            var t = {
                top: (r.yScroll == "top" ? "-" : "+") + u.outerHeight() + "px",
                left: 0
            };
            n.data("marquee.showing", true);
            u.addClass(r.cssShowing);
            u.css(t).animate({
                top: "0px"
            }, r.showSpeed, r.fxEasingShow, function () {
                if (b.isFunction(r.show)) {
                    r.show.apply(p, [n, u])
                }
                n.data("marquee.showing", false);
                k(u)
            })
        }

        function k(t, s) {
            if (m == true) {
                return false
            }
            s = s || r.pauseSpeed;
            if (d(t)) {
                setTimeout(function () {
                    if (m == true) {
                        return false
                    }
                    var w = t.outerWidth(),
                        u = w * -1,
                        v = parseInt(t.css("left"), 10);
                    t.animate({
                        left: u + "px"
                    }, ((w + v) * r.scrollSpeed), r.fxEasingScroll, function () {
                        j(t)
                    })
                }, s)
            } else {
                if (g.length > 1) {
                    if (n.data("timeout")) {
                        clearTimeout(n.data("timeout"))
                    }
                    if (!n.data("_innerHeight")) {
                        n.data("_innerHeight", n.innerHeight())
                    }
                    n.data("timeout", setTimeout(function () {
                        if (m == true) {
                            return false
                        }
                        t.animate({
                            top: (r.yScroll == "top" ? "+" : "-") + n.data("_innerHeight") + "px"
                        }, r.showSpeed, r.fxEasingScroll);
                        j(t)
                    }, s))
                }
            }
        }

        function j(s) {
            if (b.isFunction(r.aftershow)) {
                r.aftershow.apply(p, [n, s])
            }
            s.removeClass(r.cssShowing);
            if (r.hoverChange) {
                n.append(s)
            }
            c()
        }

        function q() {
            m = true;
            if (n.data("marquee.showing") != true) {
                g.filter("." + r.cssShowing).dequeue().stop()
            }
            if (r.hoverChange && g.length > 1) {
                n.removeClass("marquee").addClass("unfoldMarquee");
                var s = b("<div>").attr("id", "g_top_leftTopCover").addClass("g_topBar_marquee_cover");
                var t = b("<div>").attr("id", "g_top_rightTopCover").addClass("g_topBar_marquee_cover");
                b("body").append(s);
                s.offset({
                    top: n.offset().top - 1,
                    left: n.offset().left
                });
                b("body").append(t);
                t.offset({
                    top: n.offset().top - 1,
                    left: (n.offset().left + n.width() - 1)
                })
            }
        }

        function e() {
            m = false;
            if (n.data("marquee.showing") != true) {
                k(g.filter("." + r.cssShowing), 1)
            }
            if (r.hoverChange) {
                n.removeClass("unfoldMarquee").addClass("marquee");
                b("#g_top_leftTopCover").remove();
                b("#g_top_rightTopCover").remove()
            }
        }
        if (r.pauseOnHover) {
            n.hover(function () {
                if (h) {
                    return false
                }
                q()
            }, function () {
                if (h) {
                    return false
                }
                e()
            })
        }

        function d(s) {
            return (s.outerWidth() > n.innerWidth())
        }

        function c() {
            i++;
            if (i >= g.length) {
                if (!isNaN(r.loop) && r.loop > 0 && (++o >= r.loop)) {
                    return false
                }
                i = 0
            }
            l(i)
        }
        if (b.isFunction(r.init)) {
            r.init.apply(p, [n, r])
        }
        c()
    };
    b.Marquee.defaults = {
        yScroll: "top",
        showSpeed: 850,
        scrollSpeed: 12,
        pauseSpeed: 5000,
        pauseOnHover: true,
        loop: -1,
        fxEasingShow: "swing",
        fxEasingScroll: "linear",
        cssShowing: "marquee-showing",
        init: null,
        beforeshow: null,
        show: null,
        aftershow: null,
        hoverChange: false
    }
})(jQuery);
(function (b) {
    jQuery.fn.extend({
        imageSwitch: function (d) {
            if (typeof Fai == "undefined") {
                alert("must import fai.js");
                return
            }
            var c = b.extend({
                title: true,
                desc: false,
                btn: true,
                repeat: "no-repeat",
                position: "50% 50%",
                titleSize: 14,
                titleFont: "Verdana,宋体",
                titleColor: "#FFF",
                titleTop: 4,
                titleLeft: 4,
                descSize: 12,
                descFont: "Verdana,宋体",
                descColor: "#FFF",
                descTop: 2,
                descLeft: 4,
                btnWidth: 15,
                btnHeight: 15,
                btnMargin: 4,
                btnType: 1,
                playTime: 4000,
                animateTime: 1500,
                manuallyCarousel: false,
                animateStyle: "o",
                index: 0,
                from: "module",
                btnFunc: function () {}
            }, d);
            return b(this).each(function () {
                var A = b(this);
                var E = c.width || A.width();
                var g = c.height || A.height();
                var J = c.data.length;
                var e = c.index;
                var F = E < A.width() ? E : A.width();
                A.css("overflow", "hidden");
                A.height(g);
                if (c.width && c.from == "module") {
                    A.width(c.width)
                }
                var s = b('<div class="imageSwitchShowName photoSwitchBg" />').css({
                    position: "absolute",
                    display: "none",
                    zIndex: 2,
                    height: 30 + "px",
                    "line-height": 30 + "px",
                    width: b.browser.msie && b.browser.version == 6 ? b(A).parent().parent().width() + "px" : b(A).parent().width() + "px"
                }).appendTo(A);
                if (J == 0) {
                    s.css("visibility", "hidden")
                }
                if (c.showImageName) {
                    s.css("display", "block")
                }
                var v = "none";
                if (c.data.length > 1) {
                    v = c.btn ? "block" : "none"
                }
                if (c.btnType != 0) {
                    var C = b('<div class="imageSwitchBtnArea"/>').css({
                        position: "absolute",
                        zIndex: 3,
                        display: v
                    }).appendTo(A)
                }
                b("<div />").appendTo(A);
                var h = b('<div class="switchGroup"/>').css({
                    width: (c.width <= A.width()) ? c.width : "100%",
                    position: "relative",
                    overflow: "hidden"
                }).height("y,show-y".indexOf(c.animateStyle) != -1 ? g * J : g).appendTo(A);
                var u = 0;
                var q = "100%";
                if (c.btnType == 0) {
                    c.animateStyle = "x"
                }
                b.each(c.data, function (O, R) {
                    var M = "onclick='";
                    if (R.click != null) {
                        M += R.click
                    }
                    var Q = "";
                    if (!R.href) {
                        M += "return false;"
                    }
                    var L = "";
                    if (e == O) {
                        L = "absolute"
                    }
                    M += "'";
                    var N = b('<a hidefocus="true" style="outline:none;" ' + M + "/>").css({
                        width: q,
                        height: g + "px",
                        cursor: R.href ? "pointer" : "default",
                        "background-position": c.position,
                        "background-repeat": c.repeat,
                        overflow: "hidden",
                        position: L,
                        display: "block",
                        "float": "x,show-x".indexOf(c.animateStyle) != -1 ? "left" : ""
                    }).attr({
                        id: "photoList" + (R.pic || O),
                        href: R.href ? R.href : "javascript:;",
                        target: R.target ? R.target : "",
                        title: R.tip ? R.tip : ""
                    }).appendTo(h);
                    if (R.width && R.width > 0) {
                        N.html("<img src='" + R.src + "' width='" + R.width + "' height='" + R.height + "'>")
                    } else {
                        N.css("background-image", "url(" + R.src + ")")
                    } if (c.btnType == 1) {
                        var P = b('<a class="imageSwitchBtn" />').appendTo(C).html("<span>" + (O + 1) + "</span>")
                    } else {
                        if (c.btnType == 2) {
                            var P = b('<a class="imageSwitchBtn_dot" />').appendTo(C)
                        }
                    }
                    var K = b('<span class="spanHiddenName"/>').appendTo(s).css("margin-left", 10 + "px").html(Fai.encodeHtml(R.name));
                    if (c.btnType != 0) {
                        if (O == e) {
                            if (c.btnType == 1) {
                                P.addClass("imageSwitchBtnSel")
                            } else {
                                P.addClass("imageSwitchBtnSel_dot")
                            }
                            K.addClass("spanShowName")
                        }
                    }
                    if (c.btnType == 1) {
                        u += Fai.getDivWidth(P)
                    }
                });
                if (c.btnType == 0) {
                    if (J > 1) {
                        var D = b('<a class="imageSwitchBtn_arrow arrow_prev" />').appendTo(A).css("position", "absolute").css("zIndex", 3);
                        var i = b('<a class="imageSwitchBtn_arrow arrow_next" />').appendTo(A).css("position", "absolute").css("zIndex", 3)
                    }
                } else {} if (c.btnType == 1) {
                    C.width(u)
                }
                var p = A.parent();
                var t = p.width();
                if (b.browser.msie && b.browser.version == 6) {
                    t = p.parent().width()
                }
                var f = p.height();
                if (c.from == "module") {
                    if (t > c.width) {
                        t = c.width
                    }
                } else {
                    if (t > c.width) {
                        t = c.width + (t - c.width) / 2
                    }
                    if (t > A.width()) {
                        t = A.width()
                    }
                } if (f > g) {
                    f = g
                }
                if (J > 1) {
                    if (c.btnType != 0) {
                        if (Fai.top.$("#banner").length > 0) {
                            if (c.btnType == 1) {
                                if (E >= A.width()) {
                                    C.css("right", "0px")
                                } else {
                                    C.css("right", "50%");
                                    C.css("marginRight", "-" + E / 2 + "px")
                                }
                            } else {
                                if (c.btnType == 2) {
                                    C.css("left", "50%");
                                    C.css("marginLeft", "-" + C.width() / 2 + "px")
                                }
                            }
                        } else {
                            C.css("left", (t - u) + "px")
                        }
                    } else {
                        var o = A.width() - E;
                        if (E <= A.width()) {
                            o = o - o * 0.5
                        } else {
                            o = 0
                        }
                        D.css("left", o);
                        i.css("right", o)
                    }
                }
                if (c.btnType != 0) {
                    var r = C.children("a");
                    var G = h.children("a")
                } else {
                    var l = i;
                    var k = D
                }
                var x = s.children("span");
                var z = t - u;
                if (J > 1) {
                    if (c.btnType != 0) {
                        s.css("top", (f - C.height() - 9) + "px").css("left", 0 + "px")
                    } else {
                        s.css("top", f + "px").css("left", 0 + "px")
                    }
                    var j = b.browser.msie && b.browser.version == 6 ? parseInt(m() + 30) : parseInt(m() + 20);
                    if (z > j) {
                        if (c.btnType == 1) {
                            C.css("top", (f - C.height() - 6) + "px")
                        } else {
                            if (c.btnType == 2) {
                                C.css("bottom", "5px")
                            } else {
                                D.css("top", "50%");
                                D.css("marginTop", "-" + D.height() / 2 + "px");
                                i.css("top", "50%");
                                i.css("marginTop", "-" + i.height() / 2 + "px")
                            }
                        }
                    } else {
                        if (c.btnType == 1) {
                            C.css("top", (f - C.height() - 30) + "px")
                        } else {
                            if (c.btnType == 2) {
                                C.css("bottom", "5px")
                            } else {
                                D.css("top", "50%");
                                D.css("marginTop", "-" + D.height() / 2 + "px");
                                i.css("top", "50%");
                                i.css("marginTop", "-" + i.height() / 2 + "px")
                            }
                        }
                    }
                }

                function m() {
                    if (x.length > 0) {
                        var L = b(x[0]).width();
                        for (var K = 1; K < x.length; K++) {
                            if (L < b(x[K]).width()) {
                                L = b(x[K]).width()
                            }
                        }
                        return L
                    }
                    return 0
                }
                if ("o,show,none".indexOf(c.animateStyle) != -1) {
                    G.each(function (K, L) {
                        if (e != K) {
                            b(this).hide()
                        }
                        b(this).css("position", "absolute");
                        b(this).css("left", "0");
                        b(this).css("top", "0")
                    })
                }
                if (J == 1) {
                    x.eq(0).addClass("spanShowName")
                }
                if (J > 1) {
                    if (c.btnType != 0) {
                        r.click(function (L) {
                            L.stopPropagation();
                            var K = r.index(this);
                            if (K == e) {
                                return
                            }
                            if (c.btnType == 1) {
                                r.eq(e).removeClass("imageSwitchBtnSel");
                                r.eq(K).addClass("imageSwitchBtnSel")
                            } else {
                                r.eq(e).removeClass("imageSwitchBtnSel_dot");
                                r.eq(K).addClass("imageSwitchBtnSel_dot")
                            }
                            x.eq(e).removeClass("spanShowName");
                            x.eq(K).addClass("spanShowName");
                            switch (c.animateStyle) {
                                case "o":
                                    G.eq(e).fadeOut(c.animateTime, "failinear");
                                    G.eq(K).fadeIn(c.animateTime, "failinear");
                                    break;
                                case "x":
                                    h.animate({
                                        marginLeft: -K * E
                                    }, c.animateTime);
                                    break;
                                case "y":
                                    h.animate({
                                        marginTop: -K * g
                                    }, c.animateTime);
                                    break;
                                case "show":
                                case "show-x":
                                case "show-y":
                                    G.eq(e).hide(c.animateTime);
                                    G.eq(K).show(c.animateTime);
                                    break;
                                case "none":
                                    G.eq(e).hide();
                                    G.eq(K).show();
                                    break
                            }
                            e = K;
                            var M = Fai.top.$("#bannerGetHref");
                            if (M) {
                                M.css({
                                    width: c.data[K].imgWidth,
                                    left: (A.width() - c.data[K].imgWidth) / 2 + "px"
                                });
                                M.css({
                                    height: c.data[K].imgHeight,
                                    top: (A.height() - c.data[K].imgHeight) / 2 + "px"
                                })
                            }
                        });

                        function w() {
                            r.eq((e + 1) % J).click()
                        }
                    } else {
                        var n = e;
                        x.eq(n).addClass("spanShowName");

                        function B(K) {
                            K.stopPropagation();
                            if (Fai.top.$(".arrowImg").is(":animated")) {
                                return
                            }
                            Fai.stopInterval(I);
                            x.eq(n).removeClass("spanShowName");
                            if (n == J - 1) {
                                n = -1
                            }
                            x.eq(++n).addClass("spanShowName");
                            Fai.top.$("#arrowImg" + n).css({
                                left: q
                            });
                            Fai.top.$(".arrowImg").animate({
                                left: "-=" + F
                            }, 1000);
                            var L = Fai.top.$("#bannerGetHref");
                            if (L) {
                                L.css({
                                    width: c.data[n].imgWidth,
                                    left: (A.width() - c.data[n].imgWidth) / 2 + "px"
                                });
                                L.css({
                                    height: c.data[n].imgHeight,
                                    top: (A.height() - c.data[n].imgHeight) / 2 + "px"
                                })
                            }
                            setTimeout(function () {
                                Fai.startInterval(I)
                            }, 300)
                        }
                        l.on("click", B);
                        l.hover(function () {
                            l.addClass("arrow_next_hover")
                        }, function () {
                            l.removeClass("arrow_next_hover")
                        });

                        function y(K) {
                            K.stopPropagation();
                            if (Fai.top.$(".arrowImg").is(":animated")) {
                                return
                            }
                            Fai.stopInterval(I);
                            x.eq(n).removeClass("spanShowName");
                            if (n == 0) {
                                n = J
                            }
                            x.eq(--n).addClass("spanShowName");
                            Fai.top.$("#arrowImg" + n).css({
                                left: "-" + q
                            });
                            Fai.top.$(".arrowImg").animate({
                                left: "+=" + F
                            }, 1000);
                            var L = Fai.top.$("#bannerGetHref");
                            if (L) {
                                L.css({
                                    width: c.data[n].imgWidth,
                                    left: (A.width() - c.data[n].imgWidth) / 2 + "px"
                                });
                                L.css({
                                    height: c.data[n].imgHeight,
                                    top: (A.height() - c.data[n].imgHeight) / 2 + "px"
                                })
                            }
                            setTimeout(function () {
                                Fai.startInterval(I)
                            }, 300)
                        }
                        k.on("click", y);
                        k.hover(function () {
                            k.addClass("arrow_prev_hover")
                        }, function () {
                            k.removeClass("arrow_prev_hover")
                        });

                        function H() {
                            l.click()
                        }
                    } if (c.manuallyCarousel) {
                        Fai.stopInterval(I)
                    } else {
                        var I = "imageSwitch" + Math.random();
                        A.data("intervalId", I);
                        if (c.btnType != 0) {
                            Fai.addInterval(I, w, c.playTime)
                        } else {
                            Fai.addInterval(I, H, c.playTime)
                        }
                        Fai.startInterval(I);
                        if (typeof c.mouseoverId != "undefined") {
                            b(Fai.top.$(A).find("." + c.mouseoverId)[0]).mouseover(function () {
                                Fai.stopInterval(I)
                            });
                            b(Fai.top.$(A).find("." + c.mouseoverId)[0]).mouseout(function () {
                                Fai.startInterval(I)
                            })
                        } else {
                            A.mouseover(function () {
                                Fai.stopInterval(I)
                            });
                            A.mouseout(function () {
                                Fai.startInterval(I)
                            })
                        }
                    }
                }
            })
        }
    })
})(jQuery);
(function (c) {
    c(document).ready(function () {});

    function d(g) {
        for (var f = 1; f < arguments.length; f++) {
            g = g.replace("%" + (f - 1), arguments[f])
        }
        return g
    }

    function b(n, t) {
        var q = c("img", n);
        var C;
        var A;
        var o = null;
        var j = null;
        var B = null;
        var w = null;
        var l = null;
        var m = null;
        var h;
        var z = 0;
        var i, r;
        var g = 0;
        var f = 0;
        var v = 0;
        var x = 0;
        var k = 0;
        var u, s;
        var y = this,
            D;
        setTimeout(function () {
            if (j === null) {
                var E = n.width();
                n.parent().append(d('<div style="width:%0px;height:25px;position:absolute;top:48%;left:%1px;text-align:center;display:none;" class="cloud-zoom-loading" >Loading...</div>', E / 3, (E / 2) - (E / 6))).find(":last").css("opacity", 0.5)
            }
        }, 200);
        var p = function () {
            if (m !== null) {
                m.remove();
                m = null
            }
        };
        this.removeBits = function () {
            if (B) {
                B.remove();
                B = null
            }
            if (w) {
                w.remove();
                w = null
            }
            if (l) {
                l.remove();
                l = null
            }
            p();
            c(".cloud-zoom-loading", n.parent()).remove()
        };
        this.destroy = function () {
            n.data("zoom", null);
            if (j) {
                j.unbind();
                j.remove();
                j = null
            }
            if (o) {
                o.remove();
                o = null
            }
            this.removeBits()
        };
        this.fadedOut = function () {
            if (o) {
                o.remove();
                o = null
            }
            this.removeBits()
        };
        this.controlLoop = function () {
            if (B) {
                var E = (u - q.offset().left - (i * 0.5)) >> 0;
                var F = (s - q.offset().top - (r * 0.5)) >> 0;
                if (E < 0) {
                    E = 0
                } else {
                    if (E > (q.parent().outerWidth() - i)) {
                        E = (q.parent().outerWidth() - i)
                    }
                } if (F < 0) {
                    F = 0
                } else {
                    if (F > (q.parent().outerHeight() - r)) {
                        F = (q.parent().outerHeight() - r)
                    }
                }
                B.css({
                    left: E,
                    top: F
                });
                B.css("background-position", (-E) + "px " + (-F) + "px");
                g = (((E) / q.parent().outerWidth()) * h.width) >> 0;
                f = (((F) / q.parent().outerHeight()) * h.height) >> 0;
                x += (g - x) / t.smoothMove;
                v += (f - v) / t.smoothMove;
                o.css("background-position", (-(x >> 0) + "px ") + (-(v >> 0) + "px"))
            }
            z = setTimeout(function () {
                y.controlLoop()
            }, 30)
        };
        this.init2 = function (E, F) {
            k++;
            if (F === 1) {
                h = E
            }
            if (k === 2) {
                this.init()
            }
        };
        this.init = function () {
            c(".cloud-zoom-loading", n.parent()).remove();
            n.parent().find(".mousetrap").remove();
            var E = t.imageWidth;
            var F = t.imageHeight;
            j = n.parent().append(d("<div class='mousetrap' style='z-index:4;  background:none; position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;'></div>", q.parent().outerWidth(), q.parent().outerHeight(), 0, 0)).find(":last");
            if (F <= t.maxHeight && E <= t.maxWidth) {
                return false
            }
            n.parent().find("img").bind("mousemove", this, function (G) {
                u = G.pageX;
                s = G.pageY;
                if (j) {
                    j.mouseenter()
                }
            });
            n.parent().find("img").bind("mouseleave", this, function (G) {
                clearTimeout(z);
                if (B) {
                    B.fadeOut(299)
                }
                if (w) {
                    w.fadeOut(299)
                }
                if (l) {
                    l.fadeOut(299)
                }
                if (o) {
                    o.fadeOut(300, function () {
                        y.fadedOut()
                    })
                }
                return false
            });
            j.bind("mousemove", this, function (G) {
                u = G.pageX;
                s = G.pageY
            });
            j.bind("mouseleave", this, function (G) {
                clearTimeout(z);
                if (B) {
                    B.fadeOut(299)
                }
                if (w) {
                    w.fadeOut(299)
                }
                if (l) {
                    l.fadeOut(299)
                }
                if (o) {
                    o.fadeOut(300, function () {
                        y.fadedOut()
                    })
                }
                return false
            });
            j.bind("mouseenter", this, function (G) {
                u = G.pageX;
                s = G.pageY;
                D = G.data;
                if (o) {
                    o.stop(true, false);
                    o.remove()
                }
                var K = t.adjustX,
                    H = t.adjustY;
                var I = q.parent().outerWidth();
                var O = q.parent().outerHeight();
                var M = t.zoomWidth;
                var L = t.zoomHeight;
                if (t.zoomWidth == "auto") {
                    M = I
                }
                if (t.zoomHeight == "auto") {
                    L = O
                }
                var N = n.parent();
                switch (t.position) {
                    case "top":
                        H -= L;
                        break;
                    case "right":
                        K += I;
                        break;
                    case "bottom":
                        H += O;
                        break;
                    case "left":
                        K -= M;
                        break;
                    case "inside":
                        M = I;
                        L = O;
                        break;
                    default:
                        N = c("#" + t.position);
                        if (!N.length) {
                            N = n;
                            K += I;
                            H += O
                        } else {
                            M = N.innerWidth();
                            L = N.innerHeight()
                        }
                }
                o = N.append(d('<div id="cloud-zoom-big" class="cloud-zoom-big" style="display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url(\'%4\');background-repeat:no-repeat;z-index:3;"></div>', K, H, M, L, h.src)).find(":last");
                if (q.attr("title") && t.showTitle) {
                    o.append(d('<div class="cloud-zoom-title">%0</div>', q.attr("title"))).find(":last").css("opacity", t.titleOpacity)
                }
                o.fadeIn(500);
                if (B) {
                    B.remove();
                    B = null
                }
                i = (q.parent().outerWidth() / h.width) * o.width();
                r = (q.parent().outerHeight() / h.height) * o.height();
                B = n.append(d("<div class = 'cloud-zoom-lens' style='display:none;z-index:2;position:absolute;width:%0px;height:%1px;'></div>", i, r)).find(":last");
                var J = false;
                if (t.tint) {
                    B.css("background", 'url("' + q.attr("src") + '")');
                    w = n.append(d('<div style="display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;" />', q.parent().outerWidth(), q.parent().outerHeight(), t.tint)).find(":last");
                    w.css("opacity", t.tintOpacity);
                    J = true;
                    w.fadeIn(500)
                }
                if (t.softFocus) {
                    B.css("background", 'url("' + q.attr("src") + '")');
                    l = n.append(d('<div style="position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;" />', q.parent().outerWidth() - 2, q.parent().outerHeight() - 2, t.tint)).find(":last");
                    l.css("background", 'url("' + q.attr("src") + '")');
                    l.css("opacity", 0.5);
                    J = true;
                    l.fadeIn(500)
                }
                if (!J) {
                    B.css("opacity", t.lensOpacity)
                }
                if (t.position !== "inside") {
                    B.fadeIn(500)
                }
                D.controlLoop();
                return
            })
        };
        C = new Image();
        c(C).load(function () {
            y.init2(this, 0)
        });
        C.src = q.attr("src");
        A = new Image();
        c(A).load(function () {
            y.init2(this, 1)
        });
        A.src = n.attr("href")
    }
    c.fn.CloudZoom = function (f) {
        var g = {};
        g = c.extend({}, g, f);
        try {
            document.execCommand("BackgroundImageCache", false, true)
        } catch (h) {}
        this.each(function () {
            var i, j;
            window["eval"].call(window, "var	a = {" + c(this).attr("rel") + "}");
            i = a;
            if (c(this).is(".cloud-zoom")) {
                c(this).css({
                    position: "relative",
                    display: "block"
                });
                c("img", c(this)).css({
                    display: "block"
                });
                if (c(this).parent().attr("id") != "wrap") {
                    c(this).wrap('<div id="wrap" style="top:0px;z-index:5;position:relative;overflow:hidden;"></div>')
                }
                j = c.extend({}, c.fn.CloudZoom.defaults, f);
                j = c.extend({}, j, i);
                c(this).data("zoom", new b(c(this), j))
            } else {
                if (c(this).is(".cloud-zoom-gallery")) {
                    j = c.extend({}, i, f);
                    c(this).data("relOpts", j)
                }
            }
        });
        return this
    };

    function e(f) {
        f.data.parents("li").parent().children("li").removeClass("g_imgFrameHover");
        if (!f.data.parents("li").hasClass("g_imgFrameHover")) {
            f.data.parents("li").addClass("g_imgFrameHover")
        }
        var g = f.data.data("relOpts");
        c("#" + g.useZoom).data("zoom").destroy();
        c("#" + g.useZoom).attr("href", f.data.attr("href"));
        zoomImgWidth = f.data.data("relOpts").imageWidth;
        zoomImgHeight = f.data.data("relOpts").imageHeight;
        c("#" + f.data.data("relOpts").useZoom).CloudZoom();
        return false
    }
    c.fn.CloudZoom.defaults = {
        zoomWidth: "auto",
        zoomHeight: "auto",
        position: "right",
        tint: false,
        tintOpacity: 0.5,
        lensOpacity: 0.5,
        softFocus: false,
        smoothMove: 3,
        showTitle: true,
        titleOpacity: 0.5,
        adjustX: 0,
        adjustY: 0
    }
})(jQuery);
(function (b) {
    if (typeof jQuery.widget === "undefined") {
        return
    }
    b.widget("ui.faiButton", {
        options: {},
        _create: function () {
            var g = this;
            var f = g.options;
            var e = g.element;
            var c = b(e).is(":button");
            if (c) {
                var d = b(e).attr("extClass");
                if (typeof d != "undefined" && d != "") {
                    e.addClass(d).on("mouseenter", function () {
                        b(this).addClass(d + "-hover")
                    }).on("mouseleave", function () {
                        b(this).removeClass(d + "-hover").removeClass(d + "-active")
                    }).on("mousedown", function () {
                        b(this).addClass(d + "-active")
                    }).on("mouseup", function () {
                        b(this).removeClass(d + "-active")
                    }).on("focus" + this.eventNamespace, function () {
                        b(this).addClass(d + "-hover")
                    }).on("blur" + this.eventNamespace, function () {
                        b(this).removeClass(d + "-hover").removeClass(d + "-active")
                    })
                } else {
                    e.on("mouseenter", function () {
                        b(this).addClass("faiButton-hover")
                    }).on("mouseleave", function () {
                        b(this).removeClass("faiButton-hover").removeClass("faiButton-active")
                    }).on("mousedown", function () {
                        b(this).addClass("faiButton-active")
                    }).on("mouseup", function () {
                        b(this).removeClass("faiButton-active")
                    }).on("focus" + this.eventNamespace, function () {
                        b(this).addClass("faiButton-hover")
                    }).on("blur" + this.eventNamespace, function () {
                        b(this).removeClass(d + "-hover").removeClass("faiButton-active")
                    })
                }
            }
        }, _setOption: function (c, e) {
            var f = this;
            var d = f.options;
            d[c] = e
        }, disable: function () {
            var g = this;
            var f = g.options;
            var e = g.element;
            var c = b(e).is(":button");
            if (c) {
                var d = b(e).attr("extClass");
                if (typeof d != "undefined" && d != "") {
                    b(e).prop("disabled", true).addClass(d + "-disabled")
                } else {
                    b(e).prop("disabled", true).addClass("faiButton-disabled")
                }
            }
        }, enable: function () {
            var g = this;
            var f = g.options;
            var e = g.element;
            var c = b(e).is(":button");
            if (c) {
                var d = b(e).attr("extClass");
                if (typeof d != "undefined" && d != "") {
                    b(e).prop("disabled", false).removeClass(d + "-disabled")
                } else {
                    b(e).prop("disabled", false).removeClass("faiButton-disabled")
                }
            }
        }
    })
})(jQuery);
var JPlaceHolder = {
    _check: function () {
        return "placeholder" in document.createElement("input")
    }, init: function () {
        if (!this._check()) {
            this.fix()
        }
    }, fix: function () {
        jQuery(":input[placeholder]").each(function (e, b) {
            var l = $(this),
                c = l.attr("placeholder");
            var g = l.position(),
                d = l.outerHeight(true),
                i = l.outerWidth(true),
                k = l.css("padding-left"),
                j = l.css("padding-top");
            var j = parseInt(d / 4);
            var f = $("<span class='fk_lowIEPlaceholderStyle'></span>").text(c).css({
                position: "absolute",
                left: g.left,
                top: g.top,
                height: d,
                lienHeight: d,
                paddingLeft: 8,
                paddingTop: j
            }).appendTo(l.parent());
            l.focusin(function (h) {}).focusout(function (h) {
                if (!l.val()) {
                    f.show()
                }
            });
            l.keydown(function (h) {
                f.hide();
                l.focus()
            });
            f.click(function () {
                l.focus()
            })
        })
    }
};
jQuery(function () {
    JPlaceHolder.init()
});
(function (c) {
    var b = c.ui.resizable.prototype._setOption;
    c.ui.resizable.prototype._setOption = function (d, e) {
        b.apply(this, arguments);
        if (d === "aspectRatio") {
            this._aspectRatio = !!e
        }
    }
})(jQuery);
(function (b) {
    b.datepicker._base_gotoToday = b.datepicker._gotoToday;
    b.datepicker._gotoToday = function (h) {
        var f = this._getInst(b(h)[0]),
            g = f.dpDiv;
        this._base_gotoToday(h);
        var e = this._get(f, "timepicker");
        c(e);
        var d = new Date();
        this._setTime(f, d);
        b(".ui-datepicker-today", g).click()
    };
    var c = function (g, f) {
        if (g && g.timezone_select) {
            g._defaults.useLocalTimezone = true;
            var e = typeof f !== "undefined" ? f : new Date();
            var d = b.timepicker.timeZoneOffsetString(e);
            if (g._defaults.timezoneIso8601) {
                d = d.substring(0, 3) + ":" + d.substring(3)
            }
            g.timezone_select.val(d)
        }
    };
    b.datepicker._setTime = function (f, e) {
        var d = this._get(f, "timepicker");
        if (d) {
            var g = d._defaults;
            d.hour = e ? e.getHours() : g.hour;
            d.minute = e ? e.getMinutes() : g.minute;
            d.second = e ? e.getSeconds() : g.second;
            d.millisec = e ? e.getMilliseconds() : g.millisec;
            d._limitMinMaxDateTime(f, true);
            d._onTimeChange();
            d._updateDateTime(f)
        }
    }
})(jQuery);
/*!
 * Stellar.js v0.6.2
 * http://markdalgleish.com/projects/stellar.js
 *
 * Copyright 2014, Mark Dalgleish
 * This content is released under the MIT license
 * http://markdalgleish.mit-license.org
 */
(function (g, l, n, e) {
    var k = "stellar",
        f = {
            scrollProperty: "scroll",
            positionProperty: "position",
            horizontalScrolling: true,
            verticalScrolling: true,
            horizontalOffset: 0,
            verticalOffset: 0,
            responsive: false,
            parallaxBackgrounds: true,
            parallaxElements: true,
            hideDistantElements: true,
            hideElement: function (q) {
                q.hide()
            }, showElement: function (q) {
                q.show()
            }
        },
        h = {
            scroll: {
                getLeft: function (q) {
                    return q.scrollLeft()
                }, setLeft: function (q, r) {
                    q.scrollLeft(r)
                }, getTop: function (q) {
                    return q.scrollTop()
                }, setTop: function (q, r) {
                    q.scrollTop(r)
                }
            },
            position: {
                getLeft: function (q) {
                    return parseInt(q.css("left"), 10) * -1
                }, getTop: function (q) {
                    return parseInt(q.css("top"), 10) * -1
                }
            },
            margin: {
                getLeft: function (q) {
                    return parseInt(q.css("margin-left"), 10) * -1
                }, getTop: function (q) {
                    return parseInt(q.css("margin-top"), 10) * -1
                }
            },
            transform: {
                getLeft: function (r) {
                    var q = getComputedStyle(r[0])[j];
                    return (q !== "none" ? parseInt(q.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0)
                }, getTop: function (r) {
                    var q = getComputedStyle(r[0])[j];
                    return (q !== "none" ? parseInt(q.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0)
                }
            }
        },
        m = {
            position: {
                setLeft: function (q, r) {
                    q.css("left", r)
                }, setTop: function (q, r) {
                    q.css("top", r)
                }
            },
            transform: {
                setPosition: function (s, u, r, t, q) {
                    s[0].style[j] = "translate3d(" + (u - r) + "px, " + (t - q) + "px, 0)"
                }
            }
        },
        b = (function () {
            var s = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                q = g("script")[0].style,
                r = "",
                t;
            for (t in q) {
                if (s.test(t)) {
                    r = t.match(s)[0];
                    break
                }
            }
            if ("WebkitOpacity" in q) {
                r = "Webkit"
            }
            if ("KhtmlOpacity" in q) {
                r = "Khtml"
            }
            return function (u) {
                return r + (r.length > 0 ? u.charAt(0).toUpperCase() + u.slice(1) : u)
            }
        }()),
        j = b("transform"),
        d = g("<div />", {
                style: "background:#fff"
            }).css("background-position-x") !== e,
        c = (d ? function (r, q, s) {
            r.css({
                "background-position-x": q,
                "background-position-y": s
            })
        } : function (r, q, s) {
            r.css("background-position", q + " " + s)
        }),
        i = (d ? function (q) {
            return [q.css("background-position-x"), q.css("background-position-y")]
        } : function (q) {
            return q.css("background-position").split(" ")
        }),
        o = (l.requestAnimationFrame || l.webkitRequestAnimationFrame || l.mozRequestAnimationFrame || l.oRequestAnimationFrame || l.msRequestAnimationFrame || function (q) {
            setTimeout(q, 1000 / 60)
        });

    function p(r, q) {
        this.element = r;
        this.options = g.extend({}, f, q);
        this._defaults = f;
        this._name = k;
        this.init()
    }
    p.prototype = {
        init: function () {
            this.options.name = k + "_" + Math.floor(Math.random() * 1000000000);
            this._defineElements();
            this._defineGetters();
            this._defineSetters();
            this._handleWindowLoadAndResize();
            this._detectViewport();
            this.refresh({
                firstLoad: true
            });
            if (this.options.scrollProperty === "scroll") {
                this._handleScrollEvent()
            } else {
                this._startAnimationLoop()
            }
        }, _defineElements: function () {
            if (this.element === n.body) {
                this.element = l
            }
            this.$scrollElement = g(this.element);
            this.$element = (this.element === l ? g("body") : this.$scrollElement);
            this.$viewportElement = (this.options.viewportElement !== e ? g(this.options.viewportElement) : (this.$scrollElement[0] === l || this.options.scrollProperty === "scroll" ? this.$scrollElement : this.$scrollElement.parent()))
        }, _defineGetters: function () {
            var q = this,
                r = h[q.options.scrollProperty];
            this._getScrollLeft = function () {
                return r.getLeft(q.$scrollElement)
            };
            this._getScrollTop = function () {
                return r.getTop(q.$scrollElement)
            }
        }, _defineSetters: function () {
            var q = this,
                t = h[q.options.scrollProperty],
                r = m[q.options.positionProperty],
                s = t.setLeft,
                u = t.setTop;
            this._setScrollLeft = (typeof s === "function" ? function (v) {
                s(q.$scrollElement, v)
            } : g.noop);
            this._setScrollTop = (typeof u === "function" ? function (v) {
                u(q.$scrollElement, v)
            } : g.noop);
            this._setPosition = r.setPosition || function (x, z, w, y, v) {
                    if (q.options.horizontalScrolling) {
                        r.setLeft(x, z, w)
                    }
                    if (q.options.verticalScrolling) {
                        r.setTop(x, y, v)
                    }
                }
        }, _handleWindowLoadAndResize: function () {
            var q = this,
                r = g(l);
            if (q.options.responsive) {
                r.bind("load." + this.name, function () {
                    q.refresh()
                })
            }
            r.bind("resize." + this.name, function () {
                q._detectViewport();
                if (q.options.responsive) {
                    q.refresh()
                }
            })
        }, refresh: function (s) {
            var r = this,
                t = r._getScrollLeft(),
                q = r._getScrollTop();
            if (!s || !s.firstLoad) {
                this._reset()
            }
            this._setScrollLeft(0);
            this._setScrollTop(0);
            this._setOffsets();
            this._findParticles();
            this._findBackgrounds();
            if (s && s.firstLoad && /WebKit/.test(navigator.userAgent)) {
                g(l).load(function () {
                    var v = r._getScrollLeft(),
                        u = r._getScrollTop();
                    r._setScrollLeft(v + 1);
                    r._setScrollTop(u + 1);
                    r._setScrollLeft(v);
                    r._setScrollTop(u)
                })
            }
            this._setScrollLeft(t);
            this._setScrollTop(q)
        }, _detectViewport: function () {
            var r = this.$viewportElement.offset(),
                q = r !== null && r !== e;
            this.viewportWidth = this.$viewportElement.width();
            this.viewportHeight = this.$viewportElement.height();
            this.viewportOffsetTop = (q ? r.top : 0);
            this.viewportOffsetLeft = (q ? r.left : 0)
        }, _findParticles: function () {
            var q = this,
                t = this._getScrollLeft(),
                s = this._getScrollTop();
            if (this.particles !== e) {
                for (var r = this.particles.length - 1; r >= 0; r--) {
                    this.particles[r].$element.data("stellar-elementIsActive", e)
                }
            }
            this.particles = [];
            if (!this.options.parallaxElements) {
                return
            }
            this.$element.find("[data-stellar-ratio]").each(function (B) {
                var F = g(this),
                    D, I, v, E, A, u, H, z, x, C = 0,
                    G = 0,
                    w = 0,
                    y = 0;
                if (!F.data("stellar-elementIsActive")) {
                    F.data("stellar-elementIsActive", this)
                } else {
                    if (F.data("stellar-elementIsActive") !== this) {
                        return
                    }
                }
                q.options.showElement(F);
                if (!F.data("stellar-startingLeft")) {
                    F.data("stellar-startingLeft", F.css("left"));
                    F.data("stellar-startingTop", F.css("top"))
                } else {
                    F.css("left", F.data("stellar-startingLeft"));
                    F.css("top", F.data("stellar-startingTop"))
                }
                v = F.position().left;
                E = F.position().top;
                A = (F.css("margin-left") === "auto") ? 0 : parseInt(F.css("margin-left"), 10);
                u = (F.css("margin-top") === "auto") ? 0 : parseInt(F.css("margin-top"), 10);
                z = F.offset().left - A;
                x = F.offset().top - u;
                F.parents().each(function () {
                    var J = g(this);
                    if (J.data("stellar-offset-parent") === true) {
                        C = w;
                        G = y;
                        H = J;
                        return false
                    } else {
                        w += J.position().left;
                        y += J.position().top
                    }
                });
                D = (F.data("stellar-horizontal-offset") !== e ? F.data("stellar-horizontal-offset") : (H !== e && H.data("stellar-horizontal-offset") !== e ? H.data("stellar-horizontal-offset") : q.horizontalOffset));
                I = (F.data("stellar-vertical-offset") !== e ? F.data("stellar-vertical-offset") : (H !== e && H.data("stellar-vertical-offset") !== e ? H.data("stellar-vertical-offset") : q.verticalOffset));
                q.particles.push({
                    $element: F,
                    $offsetParent: H,
                    isFixed: F.css("position") === "fixed",
                    horizontalOffset: D,
                    verticalOffset: I,
                    startingPositionLeft: v,
                    startingPositionTop: E,
                    startingOffsetLeft: z,
                    startingOffsetTop: x,
                    parentOffsetLeft: C,
                    parentOffsetTop: G,
                    stellarRatio: (F.data("stellar-ratio") !== e ? F.data("stellar-ratio") : 1),
                    width: F.outerWidth(true),
                    height: F.outerHeight(true),
                    isHidden: false
                })
            })
        }, _findBackgrounds: function () {
            var q = this,
                t = this._getScrollLeft(),
                s = this._getScrollTop(),
                r;
            this.backgrounds = [];
            if (!this.options.parallaxBackgrounds) {
                return
            }
            r = this.$element.find("[data-stellar-background-ratio]");
            if (this.$element.data("stellar-background-ratio")) {
                r = r.add(this.$element)
            }
            r.each(function () {
                var F = g(this),
                    v = i(F),
                    D, I, w, E, B, u, A, y, H, C = 0,
                    G = 0,
                    x = 0,
                    z = 0;
                if (!F.data("stellar-backgroundIsActive")) {
                    F.data("stellar-backgroundIsActive", this)
                } else {
                    if (F.data("stellar-backgroundIsActive") !== this) {
                        return
                    }
                } if (!F.data("stellar-backgroundStartingLeft")) {
                    F.data("stellar-backgroundStartingLeft", v[0]);
                    F.data("stellar-backgroundStartingTop", v[1])
                } else {
                    c(F, F.data("stellar-backgroundStartingLeft"), F.data("stellar-backgroundStartingTop"))
                }
                B = (F.css("margin-left") === "auto") ? 0 : parseInt(F.css("margin-left"), 10);
                u = (F.css("margin-top") === "auto") ? 0 : parseInt(F.css("margin-top"), 10);
                A = F.offset().left - B - t;
                y = F.offset().top - u - s;
                F.parents().each(function () {
                    var J = g(this);
                    if (J.data("stellar-offset-parent") === true) {
                        C = x;
                        G = z;
                        H = J;
                        return false
                    } else {
                        x += J.position().left;
                        z += J.position().top
                    }
                });
                D = (F.data("stellar-horizontal-offset") !== e ? F.data("stellar-horizontal-offset") : (H !== e && H.data("stellar-horizontal-offset") !== e ? H.data("stellar-horizontal-offset") : q.horizontalOffset));
                I = (F.data("stellar-vertical-offset") !== e ? F.data("stellar-vertical-offset") : (H !== e && H.data("stellar-vertical-offset") !== e ? H.data("stellar-vertical-offset") : q.verticalOffset));
                q.backgrounds.push({
                    $element: F,
                    $offsetParent: H,
                    isFixed: F.css("background-attachment") === "fixed",
                    horizontalOffset: D,
                    verticalOffset: I,
                    startingValueLeft: v[0],
                    startingValueTop: v[1],
                    startingBackgroundPositionLeft: (isNaN(parseInt(v[0], 10)) ? 0 : parseInt(v[0], 10)),
                    startingBackgroundPositionTop: (isNaN(parseInt(v[1], 10)) ? 0 : parseInt(v[1], 10)),
                    startingPositionLeft: F.position().left,
                    startingPositionTop: F.position().top,
                    startingOffsetLeft: A,
                    startingOffsetTop: y,
                    parentOffsetLeft: C,
                    parentOffsetTop: G,
                    stellarRatio: (F.data("stellar-background-ratio") === e ? 1 : F.data("stellar-background-ratio"))
                })
            })
        }, _reset: function () {
            var u, t, s, r, q;
            for (q = this.particles.length - 1; q >= 0; q--) {
                u = this.particles[q];
                t = u.$element.data("stellar-startingLeft");
                s = u.$element.data("stellar-startingTop");
                this._setPosition(u.$element, t, t, s, s);
                this.options.showElement(u.$element);
                u.$element.data("stellar-startingLeft", null).data("stellar-elementIsActive", null).data("stellar-backgroundIsActive", null)
            }
            for (q = this.backgrounds.length - 1; q >= 0; q--) {
                r = this.backgrounds[q];
                r.$element.data("stellar-backgroundStartingLeft", null).data("stellar-backgroundStartingTop", null);
                c(r.$element, r.startingValueLeft, r.startingValueTop)
            }
        }, destroy: function () {
            this._reset();
            this.$scrollElement.unbind("resize." + this.name).unbind("scroll." + this.name);
            this._animationLoop = g.noop;
            g(l).unbind("load." + this.name).unbind("resize." + this.name)
        }, _setOffsets: function () {
            var q = this,
                r = g(l);
            r.unbind("resize.horizontal-" + this.name).unbind("resize.vertical-" + this.name);
            if (typeof this.options.horizontalOffset === "function") {
                this.horizontalOffset = this.options.horizontalOffset();
                r.bind("resize.horizontal-" + this.name, function () {
                    q.horizontalOffset = q.options.horizontalOffset()
                })
            } else {
                this.horizontalOffset = this.options.horizontalOffset
            } if (typeof this.options.verticalOffset === "function") {
                this.verticalOffset = this.options.verticalOffset();
                r.bind("resize.vertical-" + this.name, function () {
                    q.verticalOffset = q.options.verticalOffset()
                })
            } else {
                this.verticalOffset = this.options.verticalOffset
            }
        }, _repositionElements: function () {
            var w = this._getScrollLeft(),
                t = this._getScrollTop(),
                B, F, A, E, r, D, x, v = true,
                q = true,
                z, C, u, s, y;
            if (this.currentScrollLeft === w && this.currentScrollTop === t && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
                return
            } else {
                this.currentScrollLeft = w;
                this.currentScrollTop = t;
                this.currentWidth = this.viewportWidth;
                this.currentHeight = this.viewportHeight
            }
            for (y = this.particles.length - 1; y >= 0; y--) {
                A = this.particles[y];
                E = (A.isFixed ? 1 : 0);
                if (this.options.horizontalScrolling) {
                    z = (w + A.horizontalOffset + this.viewportOffsetLeft + A.startingPositionLeft - A.startingOffsetLeft + A.parentOffsetLeft) * -(A.stellarRatio + E - 1) + A.startingPositionLeft;
                    u = z - A.startingPositionLeft + A.startingOffsetLeft
                } else {
                    z = A.startingPositionLeft;
                    u = A.startingOffsetLeft
                } if (this.options.verticalScrolling) {
                    C = (t + A.verticalOffset + this.viewportOffsetTop + A.startingPositionTop - A.startingOffsetTop + A.parentOffsetTop) * -(A.stellarRatio + E - 1) + A.startingPositionTop;
                    s = C - A.startingPositionTop + A.startingOffsetTop
                } else {
                    C = A.startingPositionTop;
                    s = A.startingOffsetTop
                } if (this.options.hideDistantElements) {
                    q = !this.options.horizontalScrolling || u + A.width > (A.isFixed ? 0 : w) && u < (A.isFixed ? 0 : w) + this.viewportWidth + this.viewportOffsetLeft;
                    v = !this.options.verticalScrolling || s + A.height > (A.isFixed ? 0 : t) && s < (A.isFixed ? 0 : t) + this.viewportHeight + this.viewportOffsetTop
                }
                if (q && v) {
                    if (A.isHidden) {
                        this.options.showElement(A.$element);
                        A.isHidden = false
                    }
                    this._setPosition(A.$element, z, A.startingPositionLeft, C, A.startingPositionTop)
                } else {
                    if (!A.isHidden) {
                        this.options.hideElement(A.$element);
                        A.isHidden = true
                    }
                }
            }
            for (y = this.backgrounds.length - 1; y >= 0; y--) {
                r = this.backgrounds[y];
                E = (r.isFixed ? 0 : 1);
                D = (this.options.horizontalScrolling ? (w + r.horizontalOffset - this.viewportOffsetLeft - r.startingOffsetLeft + r.parentOffsetLeft - r.startingBackgroundPositionLeft) * (E - r.stellarRatio) + "px" : r.startingValueLeft);
                x = (this.options.verticalScrolling ? (t + r.verticalOffset - this.viewportOffsetTop - r.startingOffsetTop + r.parentOffsetTop - r.startingBackgroundPositionTop) * (E - r.stellarRatio) + "px" : r.startingValueTop);
                c(r.$element, D, x)
            }
        }, _handleScrollEvent: function () {
            var r = this,
                s = false;
            var t = function () {
                r._repositionElements();
                s = false
            };
            var q = function () {
                if (!s) {
                    o(t);
                    s = true
                }
            };
            this.$scrollElement.bind("scroll." + this.name, q);
            q()
        }, _startAnimationLoop: function () {
            var q = this;
            this._animationLoop = function () {
                o(q._animationLoop);
                q._repositionElements()
            };
            this._animationLoop()
        }
    };
    g.fn[k] = function (r) {
        var q = arguments;
        if (r === e || typeof r === "object") {
            return this.each(function () {
                if (!g.data(this, "plugin_" + k)) {
                    g.data(this, "plugin_" + k, new p(this, r))
                }
            })
        } else {
            if (typeof r === "string" && r[0] !== "_" && r !== "init") {
                return this.each(function () {
                    var s = g.data(this, "plugin_" + k);
                    if (s instanceof p && typeof s[r] === "function") {
                        s[r].apply(s, Array.prototype.slice.call(q, 1))
                    }
                    if (r === "destroy") {
                        g.data(this, "plugin_" + k, null)
                    }
                })
            }
        }
    };
    g[k] = function (q) {
        var r = g(l);
        return r.stellar.apply(r, Array.prototype.slice.call(arguments, 0))
    };
    g[k].scrollProperty = h;
    g[k].positionProperty = m;
    l.Stellar = p
}(jQuery, this, document));
/*!
 * jQuery UI Effects @VERSION
 *
 * Copyright 2012, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Effects/
 */
jQuery.effects || (function (i, f) {
    i.effects = {};
    i.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "borderColor", "color", "outlineColor"], function (p, o) {
        i.fx.step[o] = function (q) {
            if (!q.colorInit) {
                q.start = n(q.elem, o);
                q.end = l(q.end);
                q.colorInit = true
            }
            q.elem.style[o] = "rgb(" + Math.max(Math.min(parseInt((q.pos * (q.end[0] - q.start[0])) + q.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt((q.pos * (q.end[1] - q.start[1])) + q.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt((q.pos * (q.end[2] - q.start[2])) + q.start[2], 10), 255), 0) + ")"
        }
    });

    function l(p) {
        var o;
        if (p && p.constructor == Array && p.length == 3) {
            return p
        }
        if (o = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(p)) {
            return [parseInt(o[1], 10), parseInt(o[2], 10), parseInt(o[3], 10)]
        }
        if (o = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(p)) {
            return [parseFloat(o[1]) * 2.55, parseFloat(o[2]) * 2.55, parseFloat(o[3]) * 2.55]
        }
        if (o = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(p)) {
            return [parseInt(o[1], 16), parseInt(o[2], 16), parseInt(o[3], 16)]
        }
        if (o = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(p)) {
            return [parseInt(o[1] + o[1], 16), parseInt(o[2] + o[2], 16), parseInt(o[3] + o[3], 16)]
        }
        if (o = /rgba\(0, 0, 0, 0\)/.exec(p)) {
            return b.transparent
        }
        return b[i.trim(p).toLowerCase()]
    }

    function n(q, o) {
        var p;
        do {
            p = (i.curCSS || i.css)(q, o);
            if (p != "" && p != "transparent" || i.nodeName(q, "body")) {
                break
            }
            o = "backgroundColor"
        } while (q = q.parentNode);
        return l(p)
    }
    var b = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    };
    var g = ["add", "remove", "toggle"],
        d = {
            border: 1,
            borderBottom: 1,
            borderColor: 1,
            borderLeft: 1,
            borderRight: 1,
            borderTop: 1,
            borderWidth: 1,
            margin: 1,
            padding: 1
        };

    function h() {
        var r = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle,
            s = {},
            p, q;
        if (r && r.length && r[0] && r[r[0]]) {
            var o = r.length;
            while (o--) {
                p = r[o];
                if (typeof r[p] == "string") {
                    q = p.replace(/\-(\w)/g, function (t, u) {
                        return u.toUpperCase()
                    });
                    s[q] = r[p]
                }
            }
        } else {
            for (p in r) {
                if (typeof r[p] === "string") {
                    s[p] = r[p]
                }
            }
        }
        return s
    }

    function c(p) {
        var o, q;
        for (o in p) {
            q = p[o];
            if (q == null || i.isFunction(q) || o in d || (/scrollbar/).test(o) || (!(/color/i).test(o) && isNaN(parseFloat(q)))) {
                delete p[o]
            }
        }
        return p
    }

    function j(o, q) {
        var r = {
                _: 0
            },
            p;
        for (p in q) {
            if (o[p] != q[p]) {
                r[p] = q[p]
            }
        }
        return r
    }
    i.effects.animateClass = function (o, p, r, q) {
        if (i.isFunction(r)) {
            q = r;
            r = null
        }
        return this.queue(function () {
            var v = i(this),
                s = v.attr("style") || " ",
                w = c(h.call(this)),
                u, t = v.attr("class") || "";
            i.each(g, function (x, y) {
                if (o[y]) {
                    v[y + "Class"](o[y])
                }
            });
            u = c(h.call(this));
            v.attr("class", t);
            v.animate(j(w, u), {
                queue: false,
                duration: p,
                easing: r,
                complete: function () {
                    i.each(g, function (x, y) {
                        if (o[y]) {
                            v[y + "Class"](o[y])
                        }
                    });
                    if (typeof v.attr("style") == "object") {
                        v.attr("style").cssText = "";
                        v.attr("style").cssText = s
                    } else {
                        v.attr("style", s)
                    } if (q) {
                        q.apply(this, arguments)
                    }
                    i.dequeue(this)
                }
            })
        })
    };
    i.fn.extend({
        _addClass: i.fn.addClass,
        addClass: function (p, o, r, q) {
            return o ? i.effects.animateClass.apply(this, [{
                add: p
            },
                o, r, q
            ]) : this._addClass(p)
        }, _removeClass: i.fn.removeClass,
        removeClass: function (p, o, r, q) {
            return o ? i.effects.animateClass.apply(this, [{
                remove: p
            },
                o, r, q
            ]) : this._removeClass(p)
        }, _toggleClass: i.fn.toggleClass,
        toggleClass: function (q, p, o, s, r) {
            if (typeof p == "boolean" || p === f) {
                if (!o) {
                    return this._toggleClass(q, p)
                } else {
                    return i.effects.animateClass.apply(this, [(p ? {
                        add: q
                    } : {
                        remove: q
                    }), o, s, r])
                }
            } else {
                return i.effects.animateClass.apply(this, [{
                    toggle: q
                },
                    p, o, s
                ])
            }
        }, switchClass: function (o, q, p, s, r) {
            return i.effects.animateClass.apply(this, [{
                add: q,
                remove: o
            },
                p, s, r
            ])
        }
    });
    i.extend(i.effects, {
        version: "@VERSION",
        save: function (p, q) {
            for (var o = 0; o < q.length; o++) {
                if (q[o] !== null) {
                    p.data("ec.storage." + q[o], p[0].style[q[o]])
                }
            }
        }, restore: function (p, q) {
            for (var o = 0; o < q.length; o++) {
                if (q[o] !== null) {
                    p.css(q[o], p.data("ec.storage." + q[o]))
                }
            }
        }, setMode: function (o, p) {
            if (p == "toggle") {
                p = o.is(":hidden") ? "show" : "hide"
            }
            return p
        }, getBaseline: function (p, q) {
            var r, o;
            switch (p[0]) {
                case "top":
                    r = 0;
                    break;
                case "middle":
                    r = 0.5;
                    break;
                case "bottom":
                    r = 1;
                    break;
                default:
                    r = p[0] / q.height
            }
            switch (p[1]) {
                case "left":
                    o = 0;
                    break;
                case "center":
                    o = 0.5;
                    break;
                case "right":
                    o = 1;
                    break;
                default:
                    o = p[1] / q.width
            }
            return {
                x: o,
                y: r
            }
        }, createWrapper: function (o) {
            if (o.parent().is(".ui-effects-wrapper")) {
                return o.parent()
            }
            var p = {
                    width: o.outerWidth(true),
                    height: o.outerHeight(true),
                    "float": o.css("float")
                },
                s = i("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                }),
                r = document.activeElement;
            try {
                r.id
            } catch (q) {
                r = document.body
            }
            o.wrap(s);
            if (o[0] === r || i.contains(o[0], r)) {
                i(r).focus()
            }
            s = o.parent();
            if (o.css("position") == "static") {
                s.css({
                    position: "relative"
                });
                o.css({
                    position: "relative"
                })
            } else {
                i.extend(p, {
                    position: o.css("position"),
                    zIndex: o.css("z-index")
                });
                i.each(["top", "left", "bottom", "right"], function (t, u) {
                    p[u] = o.css(u);
                    if (isNaN(parseInt(p[u], 10))) {
                        p[u] = "auto"
                    }
                });
                o.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })
            }
            return s.css(p).show()
        }, removeWrapper: function (o) {
            var p, q = document.activeElement;
            if (o.parent().is(".ui-effects-wrapper")) {
                p = o.parent().replaceWith(o);
                if (o[0] === q || i.contains(o[0], q)) {
                    i(q).focus()
                }
                return p
            }
            return o
        }, setTransition: function (p, r, o, q) {
            q = q || {};
            i.each(r, function (t, s) {
                var u = p.cssUnit(s);
                if (u[0] > 0) {
                    q[s] = u[0] * o + u[1]
                }
            });
            return q
        }
    });

    function e(p, o, q, r) {
        if (typeof p == "object") {
            r = o;
            q = null;
            o = p;
            p = o.effect
        }
        if (i.isFunction(o)) {
            r = o;
            q = null;
            o = {}
        }
        if (typeof o == "number" || i.fx.speeds[o]) {
            r = q;
            q = o;
            o = {}
        }
        if (i.isFunction(q)) {
            r = q;
            q = null
        }
        o = o || {};
        q = q || o.duration;
        q = i.fx.off ? 0 : typeof q == "number" ? q : q in i.fx.speeds ? i.fx.speeds[q] : i.fx.speeds._default;
        r = r || o.complete;
        return [p, o, q, r]
    }

    function m(o) {
        if (!o || typeof o === "number" || i.fx.speeds[o]) {
            return true
        }
        if (typeof o === "string" && !i.effects[o]) {
            return true
        }
        return false
    }
    i.fn.extend({
        effect: function (r, q, t, v) {
            var p = e.apply(this, arguments),
                s = {
                    options: p[1],
                    duration: p[2],
                    callback: p[3]
                },
                u = s.options.mode,
                o = i.effects[r];
            if (i.fx.off || !o) {
                if (u) {
                    return this[u](s.duration, s.callback)
                } else {
                    return this.each(function () {
                        if (s.callback) {
                            s.callback.call(this)
                        }
                    })
                }
            }
            return o.call(this, s)
        }, _show: i.fn.show,
        show: function (p) {
            if (m(p)) {
                return this._show.apply(this, arguments)
            } else {
                var o = e.apply(this, arguments);
                o[1].mode = "show";
                return this.effect.apply(this, o)
            }
        }, _hide: i.fn.hide,
        hide: function (p) {
            if (m(p)) {
                return this._hide.apply(this, arguments)
            } else {
                var o = e.apply(this, arguments);
                o[1].mode = "hide";
                return this.effect.apply(this, o)
            }
        }, __toggle: i.fn.toggle,
        toggle: function (p) {
            if (m(p) || typeof p === "boolean" || i.isFunction(p)) {
                return this.__toggle.apply(this, arguments)
            } else {
                var o = e.apply(this, arguments);
                o[1].mode = "toggle";
                return this.effect.apply(this, o)
            }
        }, cssUnit: function (o) {
            var p = this.css(o),
                q = [];
            i.each(["em", "px", "%", "pt"], function (r, s) {
                if (p.indexOf(s) > 0) {
                    q = [parseFloat(p), s]
                }
            });
            return q
        }
    });
    var k = {};
    i.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (p, o) {
        k[o] = function (q) {
            return Math.pow(q, p + 2)
        }
    });
    i.extend(k, {
        Sine: function (o) {
            return 1 - Math.cos(o * Math.PI / 2)
        }, Circ: function (o) {
            return 1 - Math.sqrt(1 - o * o)
        }, Elastic: function (o) {
            return o === 0 || o === 1 ? o : -Math.pow(2, 8 * (o - 1)) * Math.sin(((o - 1) * 80 - 7.5) * Math.PI / 15)
        }, Back: function (o) {
            return o * o * (3 * o - 2)
        }, Bounce: function (r) {
            var o, q = 4;
            while (r < ((o = Math.pow(2, --q)) - 1) / 11) {}
            return 1 / Math.pow(4, 3 - q) - 7.5625 * Math.pow((o * 3 - 2) / 22 - r, 2)
        }
    });
    i.each(k, function (p, o) {
        i.easing["easeIn" + p] = o;
        i.easing["easeOut" + p] = function (q) {
            return 1 - o(1 - q)
        };
        i.easing["easeInOut" + p] = function (q) {
            return q < 0.5 ? o(q * 2) / 2 : o(q * -2 + 2) / -2 + 1
        }
    })
})(jQuery);