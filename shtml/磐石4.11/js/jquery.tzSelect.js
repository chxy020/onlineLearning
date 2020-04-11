(function(d) {
    d.fn.tzSelect = function(h) {
        h = d.extend({
            render: function(f) {
                return d("<li>" + f.text() + "</li>")
            },
            className: ""
        },
        h);
        return this.each(function() {
            var f = d(this),
            b = f.outerWidth(),
            b = d('<div class="tzSelect dropDown" style="width:' + b + 'px"><div class="selectBox"></div><div class="icon-down"></div></div>'),
            a = d('<ul class="dropDown"></ul>'),
            g = b.find(".selectBox");
            h.className && a.addClass(h.className);
            f.find("option").each(function(c) {
                var e = d(this),
                b;
                e.attr("selected") && (b = e.index());
                c == b && g.html(e.text());
                if (e.data("skip")) return ! 0;
                c = h.render(e);
                c.click(function() {
                    g.html(e.text());
                    a.trigger("hide");
                    f.val(e.val());
                    return ! 1
                });
                a.append(c)
            });
            b.append(a.hide());
            f.hide().after(b);
            a.on("show",
            function() {
                if (a.is(":animated")) return ! 1;
                g.addClass("expanded");
                a.slideDown()
            }).on("hide",
            function() {
                if (a.is(":animated")) return ! 1;
                g.removeClass("expanded");
                a.slideUp()
            }).on("toggle",
            function() {
                g.hasClass("expanded") ? a.trigger("hide") : a.trigger("show")
            });
            g.click(function(c) {
				//$(".cs-table,.s-table").find("td").removeClass("z-d");
				//$(".cs-table,.s-table").find("td").children("div").removeClass("z-d");
				//$(this).parents("td").addClass("z-d");
				//$(this).parent().addClass("z-d");
                /*c = c || window.event;
                c = c.clientY;
                var e = d(window).height(),
                b = a.height() + 30;
                e - c < b ? a.css({
                    top: "auto",
                    bottom: "29px"
                }) : a.css({
                    top: "29px",
                    bottom: "auto"
                });*/
                a.trigger("toggle");
                return ! 1
            });
            d(document).click(function() {
                a.trigger("hide")
            })
        })
    }
})(jQuery);
