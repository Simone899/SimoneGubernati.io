function cpLoadCSS(e, t, n) {
    "use strict";
    var i = window.document.createElement("link"),
        o = t || window.document.getElementsByTagName("script")[0];
    return (
        (i.rel = "stylesheet"),
        (i.href = e),
        (i.media = "only x"),
        o.parentNode.insertBefore(i, o),
        setTimeout(function () {
            i.media = n || "all";
        }),
        i
    );
}
document.addEventListener("DOMContentLoaded", function (event) {
    if (typeof cpLoadCSS !== "undefined") {
        cpLoadCSS("https://www.projectinvictus.it/wp-content/plugins/convertpro/assets/modules/css/cp-popup.min.css", 0, "all");
    }
});
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */ !(function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : jQuery);
})(function (e) {
    function n(e) {
        return c.raw ? e : encodeURIComponent(e);
    }
    function i(e) {
        return c.raw ? e : decodeURIComponent(e);
    }
    function o(e) {
        return n(c.json ? JSON.stringify(e) : String(e));
    }
    function r(e) {
        0 === e.indexOf('"') && (e = e.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return (e = decodeURIComponent(e.replace(u, " "))), c.json ? JSON.parse(e) : e;
        } catch (n) {}
    }
    function t(n, i) {
        var o = c.raw ? n : r(n);
        return e.isFunction(i) ? i(o) : o;
    }
    var u = /\+/g,
        c = (e.cookie = function (r, u, f) {
            if (u !== undefined && !e.isFunction(u)) {
                if ("number" == typeof (f = e.extend({}, c.defaults, f)).expires) {
                    var d = f.expires,
                        a = (f.expires = new Date());
                    a.setTime(+a + 864e5 * d);
                }
                return (document.cookie = [n(r), "=", o(u), f.expires ? "; expires=" + f.expires.toUTCString() : "", f.path ? "; path=" + f.path : "", f.domain ? "; domain=" + f.domain : "", f.secure ? "; secure" : ""].join(""));
            }
            for (var p = r ? undefined : {}, s = document.cookie ? document.cookie.split("; ") : [], m = 0, x = s.length; m < x; m++) {
                var k = s[m].split("="),
                    l = i(k.shift()),
                    j = k.join("=");
                if (r && r === l) {
                    p = t(j, u);
                    break;
                }
                r || (j = t(j)) === undefined || (p[l] = j);
            }
            return p;
        });
    (c.defaults = {}),
        (e.removeCookie = function (n, i) {
            return e.cookie(n) !== undefined && (e.cookie(n, "", e.extend({}, i, { expires: -1 })), !e.cookie(n));
        });
});
jQuery(document).ready(function ($) {
    function affwp_get_cookie_item(item) {
        var re = new RegExp(item + "=([^;]+)"),
            value = re.exec(document.cookie);
        return null != value && unescape(value[1]);
    }
    function affwp_debug_inline_vars() {
        var vars = {
            ajax_url: affwp_scripts.ajaxurl.length ? JSON.stringify(affwp_scripts.ajaxurl) : "unavailable",
            ref: JSON.stringify(AFFWP.referral_var ? AFFWP.referral_var : affwp_get_cookie_item("affwp_ref")),
            visit_cookie: affwp_get_cookie_item("affwp_ref_visit_id") ? JSON.stringify(affwp_get_cookie_item("affwp_ref_visit_id")) : "unavailable",
            credit_last: AFFWP.referral_credit_last ? JSON.stringify(AFFWP.referral_credit_last) : "unavailable",
            campaign: JSON.stringify(affwp_get_query_vars().campaign ? affwp_get_query_vars().campaign : affwp_get_cookie_item("affwp_campaign")),
            currency: affwp_debug_vars.currency.length ? JSON.stringify(affwp_debug_vars.currency) : "unavailable",
            version: affwp_debug_vars.version.length ? JSON.stringify(affwp_debug_vars.version) : "unavailable",
        };
        return vars;
    }
    function affwp_debug_get_integrations() {
        return "undefined" != typeof affwp_debug_vars && affwp_debug_vars.integrations;
    }
    function affwp_debug_output() {
        console.affwp("The following data is provided from AffiliateWP debug mode. To disable this information, please deactivate debug mode in AffiliateWP."),
            console.affwp("Available debug data: \n" + JSON.stringify(Object(affwp_debug_inline_vars()))),
            console.affwp("Integrations\n" + JSON.stringify(Object(affwp_debug_get_integrations())));
    }
    function affwp_track_visit(affiliate_id, url_campaign) {
        affwp_set_cookie("affwp_ref", affiliate_id),
            $.ajax({
                type: "POST",
                data: { action: "affwp_track_visit", affiliate: affiliate_id, campaign: url_campaign, url: document.URL, referrer: document.referrer },
                url: affwp_scripts.ajaxurl,
                success: function (response) {
                    affwp_set_cookie("affwp_ref_visit_id", response), affwp_set_cookie("affwp_campaign", url_campaign);
                },
            }).fail(function (response) {
                window.console && window.console.log && console.log(response);
            });
    }
    function affwp_set_cookie(name, value) {
        "cookie_domain" in AFFWP ? $.cookie(name, value, { expires: AFFWP.expiration, path: "/", domain: AFFWP.cookie_domain }) : $.cookie(name, value, { expires: AFFWP.expiration, path: "/" });
    }
    function affwp_get_query_vars() {
        for (var hash, vars = [], hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), i = 0; i < hashes.length; i++) {
            (hash = hashes[i].split("=")), vars.push(hash[0]);
            var key = "undefined" == typeof hash[1] ? 0 : 1,
                n = hash[key].indexOf("#");
            (hash[key] = hash[key].substring(0, n != -1 ? n : hash[key].length)), (vars[hash[0]] = hash[key]);
        }
        return vars;
    }
    var ref_cookie = $.cookie("affwp_ref"),
        credit_last = ($.cookie("affwp_ref_visit_id"), $.cookie("affwp_campaign"), AFFWP.referral_credit_last);
    if (1 === AFFWP.debug) {
        var affwpConsoleStyles = ["background: transparent", "border-bottom: 2px solid #E34F43", "color: black", "display: block", "line-height: 18px", "text-align: left", "margin: 4px", "font-weight: bold"].join(";");
        (console.affwp = function () {
            Array.prototype.unshift.call(arguments, "%c * AffiliateWP: ", affwpConsoleStyles + " *"), console.log.apply(console, arguments);
        }),
            affwp_debug_output();
    }
    if ("1" == credit_last || !ref_cookie) {
        var ref = affwp_get_query_vars()[AFFWP.referral_var],
            campaign = affwp_get_query_vars().campaign;
        if ("undefined" == typeof ref || $.isFunction(ref)) {
            var path = window.location.pathname.split("/");
            $.each(path, function (key, value) {
                AFFWP.referral_var == value && (ref = path[key + 1]);
            });
        }
        $.isFunction(ref) ||
            ("undefined" == typeof ref || $.isNumeric(ref)
                ? ref && !ref_cookie
                    ? affwp_track_visit(ref, campaign)
                    : "1" == credit_last && ref && ref_cookie && ref !== ref_cookie && ($.removeCookie("affwp_ref"), affwp_track_visit(ref, campaign))
                : $.ajax({
                      type: "POST",
                      data: { action: "affwp_get_affiliate_id", affiliate: ref },
                      url: affwp_scripts.ajaxurl,
                      success: function (response) {
                          "1" == response.data.success &&
                              ("1" == credit_last && ref_cookie && ref_cookie != response.data.affiliate_id && $.removeCookie("affwp_ref"),
                              (("1" == credit_last && ref_cookie && ref_cookie != response.data.affiliate_id) || !ref_cookie) && affwp_track_visit(response.data.affiliate_id, campaign));
                      },
                  }).fail(function (response) {
                      window.console && window.console.log && console.log(response);
                  }));
    }
});
jQuery(function () {
    jQuery(".wpcf7").on("wpcf7mailsent", function (e) {
        var gtm4wp_cf7formid = "(not set)";
        if (e && e.detail && e.detail.contactFormId) {
            gtm4wp_cf7formid = e.detail.contactFormId;
        } else if (e && e.originalEvent && e.originalEvent.detail && e.originalEvent.detail.contactFormId) {
            gtm4wp_cf7formid = e.originalEvent.detail.contactFormId;
        }
        var gtm4wp_cf7forminputs = [];
        if (e && e.detail && e.detail.inputs) {
            gtm4wp_cf7forminputs = e.detail.inputs;
        } else if (e && e.originalEvent && e.originalEvent.detail && e.originalEvent.detail.inputs) {
            gtm4wp_cf7forminputs = e.originalEvent.detail.inputs;
        }
        window[gtm4wp_datalayer_name].push({ event: "gtm4wp.contactForm7Submitted", "gtm4wp.cf7formid": gtm4wp_cf7formid, "gtm4wp.cf7inputs": gtm4wp_cf7forminputs });
    });
});
jQuery(function () {
    jQuery(document).on("click", ".add_to_cart_button:not(.product_type_variable, .product_type_grouped, .single_add_to_cart_button)", function () {
        var productdata = jQuery(this).closest(".product").find(".gtm4wp_productdata");
        window[gtm4wp_datalayer_name].push({ event: "gtm4wp.addProductToCart", productName: productdata.data("gtm4wp_product_name"), productSKU: jQuery(this).data("product_sku"), productID: jQuery(this).data("product_id") });
    });
    jQuery(document).on("click", ".single_add_to_cart_button", function () {
        var _product_form = jQuery(this).closest("form.cart");
        var _product_id = jQuery("[name=gtm4wp_id]", _product_form).val();
        var _product_name = jQuery("[name=gtm4wp_name]", _product_form).val();
        var _product_sku = jQuery("[name=gtm4wp_sku]", _product_form).val();
        var _product_is_grouped = jQuery(_product_form).hasClass("grouped_form");
        if (!_product_is_grouped) {
            window[gtm4wp_datalayer_name].push({ event: "gtm4wp.addProductToCart", productName: _product_name, productSKU: _product_sku, productID: _product_id });
        }
    });
});
var gtm4wp_last_selected_product_variation;
var gtm4wp_changedetail_fired_during_pageload = !1;
function gtm4wp_handle_cart_qty_change() {
    jQuery(".product-quantity input.qty").each(function () {
        var _original_value = jQuery(this).prop("defaultValue");
        var _current_value = parseInt(jQuery(this).val());
        if (Number.isNaN(_current_value)) {
            _current_value = _original_value;
        }
        if (_original_value != _current_value) {
            var productdata = jQuery(this).closest(".cart_item").find(".remove");
            var productprice = productdata.data("gtm4wp_product_price");
            if (typeof productprice == "string") {
                productprice = parseFloat(productprice);
                if (isNaN(productprice)) {
                    productprice = 0;
                }
            } else if (typeof productprice != "number") {
                productprice = 0;
            }
            if (_original_value < _current_value) {
                window[gtm4wp_datalayer_name].push({
                    event: "gtm4wp.addProductToCartEEC",
                    ecommerce: {
                        currencyCode: gtm4wp_currency,
                        add: {
                            products: [
                                {
                                    name: productdata.data("gtm4wp_product_name"),
                                    id: productdata.data("gtm4wp_product_id"),
                                    price: productprice.toFixed(2),
                                    category: productdata.data("gtm4wp_product_cat"),
                                    variant: productdata.data("gtm4wp_product_variant"),
                                    stocklevel: productdata.data("gtm4wp_product_stocklevel"),
                                    brand: productdata.data("gtm4wp_product_brand"),
                                    quantity: _current_value - _original_value,
                                },
                            ],
                        },
                    },
                });
            } else {
                window[gtm4wp_datalayer_name].push({
                    event: "gtm4wp.removeFromCartEEC",
                    ecommerce: {
                        currencyCode: gtm4wp_currency,
                        remove: {
                            products: [
                                {
                                    name: productdata.data("gtm4wp_product_name"),
                                    id: productdata.data("gtm4wp_product_id"),
                                    price: productprice.toFixed(2),
                                    category: productdata.data("gtm4wp_product_cat"),
                                    variant: productdata.data("gtm4wp_product_variant"),
                                    stocklevel: productdata.data("gtm4wp_product_stocklevel"),
                                    brand: productdata.data("gtm4wp_product_brand"),
                                    quantity: _original_value - _current_value,
                                },
                            ],
                        },
                    },
                });
            }
        }
    });
}
jQuery(function () {
    var is_cart = jQuery("body").hasClass("woocommerce-cart");
    var is_checkout = jQuery("body").hasClass("woocommerce-checkout");
    if (jQuery(".gtm4wp_productdata,.widget-product-item").length > 0) {
        var products = [];
        var productdata,
            productprice = 0;
        jQuery(".gtm4wp_productdata,.widget-product-item").each(function () {
            productdata = jQuery(this);
            productprice = productdata.data("gtm4wp_product_price");
            if (typeof productprice == "string") {
                productprice = parseFloat(productprice);
                if (isNaN(productprice)) {
                    productprice = 0;
                }
            } else if (typeof productprice != "number") {
                productprice = 0;
            }
            products.push({
                name: productdata.data("gtm4wp_product_name"),
                id: productdata.data("gtm4wp_product_id"),
                price: productprice.toFixed(2),
                category: productdata.data("gtm4wp_product_cat"),
                position: productdata.data("gtm4wp_product_listposition"),
                list: productdata.data("gtm4wp_productlist_name"),
                stocklevel: productdata.data("gtm4wp_product_stocklevel"),
                brand: productdata.data("gtm4wp_product_brand"),
            });
        });
        if (gtm4wp_product_per_impression > 0) {
            var chunk;
            while (products.length) {
                chunk = products.splice(0, gtm4wp_product_per_impression);
                window[gtm4wp_datalayer_name].push({ event: "gtm4wp.productImpressionEEC", ecommerce: { currencyCode: gtm4wp_currency, impressions: chunk } });
            }
        } else {
            for (var i = 0; i < window[gtm4wp_datalayer_name].length; i++) {
                if (window[gtm4wp_datalayer_name][i].ecommerce) {
                    if (!window[gtm4wp_datalayer_name][i].ecommerce.impressions) {
                        window[gtm4wp_datalayer_name][i].ecommerce.impressions = products;
                    } else {
                        window[gtm4wp_datalayer_name][i].ecommerce.impressions = window[gtm4wp_datalayer_name][i].ecommerce.impressions.concat(products);
                    }
                    break;
                }
            }
            if (i == window[gtm4wp_datalayer_name].length) {
                i = 0;
                window[gtm4wp_datalayer_name][i].ecommerce = {};
                window[gtm4wp_datalayer_name][i].ecommerce.impressions = products;
            }
            window[gtm4wp_datalayer_name][i].ecommerce.currencyCode = gtm4wp_currency;
        }
    }
    jQuery(document).on("click", ".add_to_cart_button:not(.product_type_variable, .product_type_grouped, .single_add_to_cart_button)", function () {
        var productdata = jQuery(this).closest(".product").find(".gtm4wp_productdata");
        var productprice = productdata.data("gtm4wp_product_price");
        if (typeof productprice == "string") {
            productprice = parseFloat(productprice);
            if (isNaN(productprice)) {
                productprice = 0;
            }
        } else if (typeof productprice != "number") {
            productprice = 0;
        }
        window[gtm4wp_datalayer_name].push({
            event: "gtm4wp.addProductToCartEEC",
            ecommerce: {
                currencyCode: gtm4wp_currency,
                add: {
                    products: [
                        {
                            name: productdata.data("gtm4wp_product_name"),
                            id: productdata.data("gtm4wp_product_id"),
                            price: productprice.toFixed(2),
                            category: productdata.data("gtm4wp_product_cat"),
                            stocklevel: productdata.data("gtm4wp_product_stocklevel"),
                            brand: productdata.data("gtm4wp_product_brand"),
                            quantity: 1,
                        },
                    ],
                },
            },
        });
    });
    jQuery(document).on("click", ".single_add_to_cart_button", function () {
        var _product_form = jQuery(this).closest("form.cart");
        var _product_var_id = jQuery("[name=variation_id]", _product_form);
        var _product_is_grouped = jQuery(_product_form).hasClass("grouped_form");
        if (_product_var_id.length > 0) {
            if (gtm4wp_last_selected_product_variation) {
                gtm4wp_last_selected_product_variation.quantity = jQuery("form.cart:first input[name=quantity]").val();
                window[gtm4wp_datalayer_name].push({ event: "gtm4wp.addProductToCartEEC", ecommerce: { currencyCode: gtm4wp_currency, add: { products: [gtm4wp_last_selected_product_variation] } } });
            }
        } else if (_product_is_grouped) {
            var _products_in_group = jQuery(".grouped_form .gtm4wp_productdata");
            var _products_eec = [];
            _products_in_group.each(function () {
                var productdata = jQuery(this);
                var product_qty_input = jQuery("input[name=quantity\\[" + productdata.data("gtm4wp_product_id") + "\\]]");
                if (product_qty_input.length > 0) {
                    product_qty = product_qty_input.val();
                } else {
                    return;
                }
                if (0 == product_qty) {
                    return;
                }
                _products_eec.push({
                    id: gtm4wp_use_sku_instead ? productdata.data("gtm4wp_product_sku") : productdata.data("gtm4wp_product_id"),
                    name: productdata.data("gtm4wp_product_name"),
                    price: productdata.data("gtm4wp_product_price"),
                    category: productdata.data("gtm4wp_product_cat"),
                    quantity: product_qty,
                    stocklevel: productdata.data("gtm4wp_product_stocklevel"),
                    brand: productdata.data("gtm4wp_product_brand"),
                });
            });
            if (0 == _products_eec.length) {
                return;
            }
            window[gtm4wp_datalayer_name].push({ event: "gtm4wp.addProductToCartEEC", ecommerce: { currencyCode: gtm4wp_currency, add: { products: _products_eec } } });
        } else {
            window[gtm4wp_datalayer_name].push({
                event: "gtm4wp.addProductToCartEEC",
                ecommerce: {
                    currencyCode: gtm4wp_currency,
                    add: {
                        products: [
                            {
                                id: gtm4wp_use_sku_instead ? jQuery("[name=gtm4wp_sku]", _product_form).val() : jQuery("[name=gtm4wp_id]", _product_form).val(),
                                name: jQuery("[name=gtm4wp_name]", _product_form).val(),
                                price: jQuery("[name=gtm4wp_price]", _product_form).val(),
                                category: jQuery("[name=gtm4wp_category]", _product_form).val(),
                                quantity: jQuery("form.cart:first input[name=quantity]").val(),
                                stocklevel: jQuery("[name=gtm4wp_stocklevel]", _product_form).val(),
                                brand: jQuery("[name=gtm4wp_brand]", _product_form).val(),
                            },
                        ],
                    },
                },
            });
        }
    });
    jQuery(document).on("click", ".mini_cart_item a.remove,.product-remove a.remove", function () {
        var productdata = jQuery(this);
        var qty = 0;
        var qty_element = jQuery(this).closest(".cart_item").find(".product-quantity input.qty");
        if (qty_element.length === 0) {
            qty_element = jQuery(this).closest(".mini_cart_item").find(".quantity");
            if (qty_element.length > 0) {
                qty = parseInt(qty_element.text());
                if (Number.isNaN(qty)) {
                    qty = 0;
                }
            }
        } else {
            qty = qty_element.val();
        }
        if (qty === 0) {
            return !0;
        }
        window[gtm4wp_datalayer_name].push({
            event: "gtm4wp.removeFromCartEEC",
            ecommerce: {
                remove: {
                    products: [
                        {
                            name: productdata.data("gtm4wp_product_name"),
                            id: productdata.data("gtm4wp_product_id"),
                            price: productdata.data("gtm4wp_product_price"),
                            category: productdata.data("gtm4wp_product_cat"),
                            variant: productdata.data("gtm4wp_product_variant"),
                            stocklevel: productdata.data("gtm4wp_product_stocklevel"),
                            brand: productdata.data("gtm4wp_product_brand"),
                            quantity: qty,
                        },
                    ],
                },
            },
        });
    });
    jQuery(document).on(
        "click",
        ".products li:not(.product-category) a:not(.add_to_cart_button):not(.quick-view-button),.products>div:not(.product-category) a:not(.add_to_cart_button):not(.quick-view-button),.widget-product-item,.woocommerce-grouped-product-list-item__label a",
        function (event) {
            if ("undefined" == typeof google_tag_manager) {
                return !0;
            }
            var _productdata = jQuery(this).closest(".product");
            var productdata = "";
            if (_productdata.length > 0) {
                productdata = _productdata.find(".gtm4wp_productdata");
            } else {
                _productdata = jQuery(this).closest(".products li");
                if (_productdata.length > 0) {
                    productdata = _productdata.find(".gtm4wp_productdata");
                } else {
                    _productdata = jQuery(this).closest(".products>div");
                    if (_productdata.length > 0) {
                        productdata = _productdata.find(".gtm4wp_productdata");
                    } else {
                        _productdata = jQuery(this).closest(".woocommerce-grouped-product-list-item__label");
                        if (_productdata.length > 0) {
                            productdata = _productdata.find(".gtm4wp_productdata");
                        } else {
                            productdata = jQuery(this);
                        }
                    }
                }
            }
            if ("undefined" == typeof productdata.data("gtm4wp_product_id") || "" == productdata.data("gtm4wp_product_id")) {
                return !0;
            }
            if (productdata.data("gtm4wp_product_url") != jQuery(this).attr("href")) {
                return !0;
            }
            var ctrl_key_pressed = event.ctrlKey || event.metaKey;
            event.preventDefault();
            if (ctrl_key_pressed) {
                var _productpage = window.open("about:blank", "_blank");
            }
            window[gtm4wp_datalayer_name].push({
                event: "gtm4wp.productClickEEC",
                ecommerce: {
                    currencyCode: gtm4wp_currency,
                    click: {
                        actionField: { list: productdata.data("gtm4wp_productlist_name") },
                        products: [
                            {
                                id: productdata.data("gtm4wp_product_id"),
                                name: productdata.data("gtm4wp_product_name"),
                                price: productdata.data("gtm4wp_product_price"),
                                category: productdata.data("gtm4wp_product_cat"),
                                stocklevel: productdata.data("gtm4wp_product_stocklevel"),
                                brand: productdata.data("gtm4wp_product_brand"),
                                position: productdata.data("gtm4wp_product_listposition"),
                            },
                        ],
                    },
                },
                eventCallback: function () {
                    if (ctrl_key_pressed && _productpage) {
                        _productpage.location.href = productdata.data("gtm4wp_product_url");
                    } else {
                        document.location.href = productdata.data("gtm4wp_product_url");
                    }
                },
                eventTimeout: 2000,
            });
        }
    );
    jQuery(document).on("found_variation", function (event, product_variation) {
        if ("undefined" == typeof product_variation) {
            return;
        }
        if (document.readyState === "interactive" && gtm4wp_changedetail_fired_during_pageload) {
            return;
        }
        var _product_form = event.target;
        var _product_var_id = jQuery("[name=variation_id]", _product_form);
        var _product_id = jQuery("[name=gtm4wp_id]", _product_form).val();
        var _product_name = jQuery("[name=gtm4wp_name]", _product_form).val();
        var _product_sku = jQuery("[name=gtm4wp_sku]", _product_form).val();
        var _product_category = jQuery("[name=gtm4wp_category]", _product_form).val();
        var _product_price = jQuery("[name=gtm4wp_price]", _product_form).val();
        var _product_stocklevel = jQuery("[name=gtm4wp_stocklevel]", _product_form).val();
        var _product_brand = jQuery("[name=gtm4wp_brand]", _product_form).val();
        var current_product_detail_data = { name: _product_name, id: 0, price: 0, category: _product_category, stocklevel: _product_stocklevel, brand: _product_brand, variant: "" };
        current_product_detail_data.id = product_variation.variation_id;
        if (gtm4wp_use_sku_instead && product_variation.sku && "" !== product_variation.sku) {
            current_product_detail_data.id = product_variation.sku;
        }
        current_product_detail_data.price = product_variation.display_price;
        var _tmp = [];
        for (var attrib_key in product_variation.attributes) {
            _tmp.push(product_variation.attributes[attrib_key]);
        }
        current_product_detail_data.variant = _tmp.join(",");
        gtm4wp_last_selected_product_variation = current_product_detail_data;
        window[gtm4wp_datalayer_name].push({
            event: "gtm4wp.changeDetailViewEEC",
            ecommerce: { currencyCode: gtm4wp_currency, detail: { products: [current_product_detail_data] } },
            ecomm_prodid: gtm4wp_id_prefix + current_product_detail_data.id,
            ecomm_pagetype: "product",
            ecomm_totalvalue: current_product_detail_data.price,
        });
        if (document.readyState === "interactive") {
            gtm4wp_changedetail_fired_during_pageload = !0;
        }
    });
    jQuery(".variations select").trigger("change");
    jQuery(document).ajaxSuccess(function (event, xhr, settings) {
        if (typeof settings !== "undefined") {
            if (settings.url.indexOf("wc-api=WC_Quick_View") > -1) {
                setTimeout(function () {
                    jQuery(".woocommerce.quick-view")
                        .parent()
                        .find("script")
                        .each(function (i) {
                            eval(jQuery(this).text());
                        });
                }, 500);
            }
        }
    });
    if (is_cart) {
        jQuery(document).on("click", "[name=update_cart]", function () {
            gtm4wp_handle_cart_qty_change();
        });
        jQuery(document).on("keypress", ".woocommerce-cart-form input[type=number]", function () {
            gtm4wp_handle_cart_qty_change();
        });
    }
    if (is_checkout) {
        window.gtm4wp_checkout_step_offset = window.gtm4wp_checkout_step_offset || 0;
        window.gtm4wp_checkout_products = window.gtm4wp_checkout_products || [];
        var gtm4wp_shipping_payment_method_step_offset = window.gtm4wp_needs_shipping_address ? 0 : -1;
        var gtm4wp_checkout_step_fired = [];
        jQuery(document).on("blur", "input[name^=shipping_]:not(input[name^=shipping_method])", function () {
            if (gtm4wp_checkout_step_fired.indexOf("shipping") > -1) {
                return;
            }
            if (jQuery(this).val().trim() == "") {
                return;
            }
            window[gtm4wp_datalayer_name].push({ event: "gtm4wp.checkoutStepEEC", ecommerce: { checkout: { actionField: { step: 2 + window.gtm4wp_checkout_step_offset }, products: window.gtm4wp_checkout_products } } });
            gtm4wp_checkout_step_fired.push("shipping");
        });
        jQuery(document).on("change", "input[name^=shipping_method]", function () {
            if (gtm4wp_checkout_step_fired.indexOf("shipping_method") > -1) {
                return;
            }
            if ("complete" != document.readyState) {
                return;
            }
            window[gtm4wp_datalayer_name].push({
                event: "gtm4wp.checkoutStepEEC",
                ecommerce: { checkout: { actionField: { step: 3 + window.gtm4wp_checkout_step_offset + gtm4wp_shipping_payment_method_step_offset }, products: window.gtm4wp_checkout_products } },
            });
            gtm4wp_checkout_step_fired.push("shipping_method");
        });
        jQuery(document).on("change", "input[name=payment_method]", function () {
            if (gtm4wp_checkout_step_fired.indexOf("payment_method") > -1) {
                return;
            }
            if ("complete" != document.readyState) {
                return;
            }
            window[gtm4wp_datalayer_name].push({
                event: "gtm4wp.checkoutStepEEC",
                ecommerce: { checkout: { actionField: { step: 4 + window.gtm4wp_checkout_step_offset + gtm4wp_shipping_payment_method_step_offset }, products: window.gtm4wp_checkout_products } },
            });
            gtm4wp_checkout_step_fired.push("payment_method");
        });
        jQuery("form[name=checkout]").on("submit", function () {
            if (gtm4wp_checkout_step_fired.indexOf("shipping_method") == -1) {
                var selected_shipping_method = jQuery("input[name^=shipping_method]:checked");
                if (selected_shipping_method.length == 0) {
                    selected_shipping_method = jQuery("input[name^=shipping_method]:first");
                }
                if (selected_shipping_method.length > 0) {
                    selected_shipping_method.trigger("change");
                }
            }
            if (gtm4wp_checkout_step_fired.indexOf("payment_method") == -1) {
                jQuery("input[name=payment_method]:checked").trigger("change");
            }
            var _shipping_el = jQuery("input[name^=shipping_method]:checked");
            if (_shipping_el.length == 0) {
                _shipping_el = jQuery("input[name^=shipping_method]:first");
            }
            if (_shipping_el.length > 0) {
                window[gtm4wp_datalayer_name].push({
                    event: "gtm4wp.checkoutOptionEEC",
                    ecommerce: { checkout_option: { actionField: { step: 3 + window.gtm4wp_checkout_step_offset + gtm4wp_shipping_payment_method_step_offset, option: "Shipping: " + _shipping_el.val() } } },
                });
            }
            var _payment_el = jQuery(".payment_methods input:checked");
            if (_payment_el.length > 0) {
                window[gtm4wp_datalayer_name].push({
                    event: "gtm4wp.checkoutOptionEEC",
                    ecommerce: { checkout_option: { actionField: { step: 4 + window.gtm4wp_checkout_step_offset + gtm4wp_shipping_payment_method_step_offset, option: "Payment: " + _payment_el.val() } } },
                });
            }
        });
    }
    if (window.gtm4wp_remarketing && !is_cart && !is_checkout) {
        if (jQuery(".gtm4wp_productdata").length > 0) {
            for (var i = 0; i < window[gtm4wp_datalayer_name].length; i++) {
                if (window[gtm4wp_datalayer_name][i].ecomm_prodid) {
                    break;
                }
            }
            if (i == window[gtm4wp_datalayer_name].length) {
                i = 0;
                window[gtm4wp_datalayer_name][i].ecomm_prodid = [];
            }
            if ("undefined" == typeof window[gtm4wp_datalayer_name][i].ecomm_prodid.push) {
                return !1;
            }
            var productdata;
            jQuery(".gtm4wp_productdata").each(function () {
                productdata = jQuery(this);
                window[gtm4wp_datalayer_name][i].ecomm_prodid.push(gtm4wp_id_prefix + productdata.data("gtm4wp_product_id"));
            });
        }
    }
});
var AFFWP = AFFWP || {};
AFFWP.referral_var = "ref";
AFFWP.expiration = 1;
AFFWP.debug = 0;
AFFWP.cookie_domain = "www.projectinvictus.it";
AFFWP.referral_credit_last = 0;
var tracking_id = "UA-44457057-1";
(function () {
    var qs,
        js,
        q,
        s,
        d = document,
        gi = d.getElementById,
        ce = d.createElement,
        gt = d.getElementsByTagName,
        id = "typef_orm",
        b = "https://embed.typeform.com/";
    if (!gi.call(d, id)) {
        js = ce.call(d, "script");
        js.id = id;
        js.src = b + "embed.js";
        q = gt.call(d, "script")[0];
        q.parentNode.insertBefore(js, q);
    }
})();
var c = document.body.className;
c = c.replace(/woocommerce-no-js/, "woocommerce-js");
document.body.className = c;
(function ($) {
    jQuery(document).ready(function () {});
})(jQuery);
("use strict");
jQuery(document).ready(function ($) {
    function apply($el, options) {
        var options = options || { isBusy: !1 };
        function ajax(data, successCallback, errorCallback) {
            if (options.isBusy || $el.hasClass("kksr-disabled")) {
                return;
            }
            options.isBusy = !0;
            $.ajax({
                type: "POST",
                url: kk_star_ratings.endpoint,
                data: Object.assign({ nonce: kk_star_ratings.nonce, action: kk_star_ratings.action }, data),
                error: errorCallback,
                success: successCallback,
                complete: function () {
                    options.isBusy = !1;
                },
            });
        }
        function onClick(e) {
            var $star = $(this);
            ajax(
                { id: $el.data("id"), slug: $el.data("slug"), score: $star.data("star"), best: $("[data-star]", $el).length },
                function (response, status, xhr) {
                    var $newEl = $(response);
                    $newEl.addClass($el.attr("class"));
                    $el.replaceWith($newEl);
                    destroy();
                    apply($newEl, options);
                },
                function (xhr, status, err) {
                    if (xhr.responseJSON && xhr.responseJSON.error) {
                        console.error(xhr.responseJSON.error);
                    }
                }
            );
        }
        function destroy() {
            $("[data-star]", $el).each(function () {
                $(this).off("click", onClick);
            });
            $el.remove();
        }
        $("[data-star]", $el).each(function () {
            $(this).on("click", onClick);
        });
    }
    $(".kk-star-ratings").each(function () {
        apply($(this));
    });
});
var mailchimp,
    mailchimp_cart,
    mailchimp_billing_email,
    mailchimp_username_email,
    mailchimp_registration_email,
    mailchimp_submitted_email = !1,
    mailchimpReady = function (e) {
        /in/.test(document.readyState) ? setTimeout("mailchimpReady(" + e + ")", 9) : e();
    };
function mailchimpGetCurrentUserByHash(e) {
    try {
        var i = mailchimp_public_data.ajax_url + "?action=mailchimp_get_user_by_hash&hash=" + e,
            a = new XMLHttpRequest();
        a.open("POST", i, !0),
            (a.onload = function () {
                if (a.status >= 200 && a.status < 400) {
                    var e = JSON.parse(a.responseText);
                    if (!e) return;
                    mailchimp_cart.valueEmail(e.email) && mailchimp_cart.setEmail(e.email);
                }
            }),
            (a.onerror = function () {
                console.log("mailchimp.get_email_by_hash.request.error", a.responseText);
            }),
            a.setRequestHeader("Content-Type", "application/json"),
            a.setRequestHeader("Accept", "application/json"),
            a.send();
    } catch (e) {
        console.log("mailchimp.get_email_by_hash.error", e);
    }
}
function mailchimpHandleBillingEmail(e) {
    try {
        e || (e = "#billing_email");
        var i = document.querySelector(e),
            a = void 0 !== i ? i.value : "";
        if (!mailchimp_cart.valueEmail(a) || mailchimp_submitted_email === a) return !1;
        mailchimp_cart.setEmail(a);
        var t = mailchimp_public_data.ajax_url + "?action=mailchimp_set_user_by_email&email=" + a,
            n = new XMLHttpRequest();
        return (
            n.open("POST", t, !0),
            (n.onload = function () {
                var e = n.status >= 200 && n.status < 400,
                    i = e ? "mailchimp.handle_billing_email.request.success" : "mailchimp.handle_billing_email.request.error";
                e && (mailchimp_submitted_email = a), console.log(i, n.responseText);
            }),
            (n.onerror = function () {
                console.log("mailchimp.handle_billing_email.request.error", n.responseText);
            }),
            n.setRequestHeader("Content-Type", "application/json"),
            n.setRequestHeader("Accept", "application/json"),
            n.send(),
            !0
        );
    } catch (i) {
        console.log("mailchimp.handle_billing_email.error", i), (mailchimp_submitted_email = !1);
    }
}
!(function () {
    "use strict";
    var e,
        i,
        a,
        t = {
            extend: function (e, i) {
                for (var a in i || {}) i.hasOwnProperty(a) && (e[a] = i[a]);
                return e;
            },
            getQueryStringVars: function () {
                var e = window.location.search || "",
                    i = [],
                    a = {};
                if ((e = e.substr(1)).length)
                    for (var t in (i = e.split("&"))) {
                        var n = i[t];
                        if ("string" == typeof n) {
                            var l = n.split("="),
                                r = l[0],
                                m = l[1];
                            r.length && (void 0 === a[r] && (a[r] = []), a[r].push(m));
                        }
                    }
                return a;
            },
            unEscape: function (e) {
                return decodeURIComponent(e);
            },
            escape: function (e) {
                return encodeURIComponent(e);
            },
            createDate: function (e, i) {
                e || (e = 0);
                var a = new Date(),
                    t = i ? a.getDate() - e : a.getDate() + e;
                return a.setDate(t), a;
            },
            arrayUnique: function (e) {
                for (var i = e.concat(), a = 0; a < i.length; ++a) for (var t = a + 1; t < i.length; ++t) i[a] === i[t] && i.splice(t, 1);
                return i;
            },
            objectCombineUnique: function (e) {
                for (var i = e[0], a = 1; a < e.length; a++) {
                    var t = e[a];
                    for (var n in t) i[n] = t[n];
                }
                return i;
            },
        },
        n =
            ((e = document),
            ((a = function (e, i, t) {
                return 1 === arguments.length ? a.get(e) : a.set(e, i, t);
            }).get = function (i, t) {
                return e.cookie !== a._cacheString && a._populateCache(), null == a._cache[i] ? t : a._cache[i];
            }),
            (a.defaults = { path: "/" }),
            (a.set = function (t, n, l) {
                switch (
                    ((l = { path: (l && l.path) || a.defaults.path, domain: (l && l.domain) || a.defaults.domain, expires: (l && l.expires) || a.defaults.expires, secure: l && l.secure !== i ? l.secure : a.defaults.secure }),
                    n === i && (l.expires = -1),
                    typeof l.expires)
                ) {
                    case "number":
                        l.expires = new Date(new Date().getTime() + 1e3 * l.expires);
                        break;
                    case "string":
                        l.expires = new Date(l.expires);
                }
                return (
                    (t = encodeURIComponent(t) + "=" + (n + "").replace(/[^!#-+\--:<-\[\]-~]/g, encodeURIComponent)),
                    (t += l.path ? ";path=" + l.path : ""),
                    (t += l.domain ? ";domain=" + l.domain : ""),
                    (t += l.expires ? ";expires=" + l.expires.toGMTString() : ""),
                    (t += l.secure ? ";secure" : ""),
                    (e.cookie = t),
                    a
                );
            }),
            (a.expire = function (e, t) {
                return a.set(e, i, t);
            }),
            (a._populateCache = function () {
                a._cache = {};
                try {
                    a._cacheString = e.cookie;
                    for (var t = a._cacheString.split("; "), n = 0; n < t.length; n++) {
                        var l = t[n].indexOf("="),
                            r = decodeURIComponent(t[n].substr(0, l));
                        (l = decodeURIComponent(t[n].substr(l + 1))), a._cache[r] === i && (a._cache[r] = l);
                    }
                } catch (e) {
                    console.log(e);
                }
            }),
            (a.enabled = (function () {
                var e = "1" === a.set("cookies.js", "1").get("cookies.js");
                return a.expire("cookies.js"), e;
            })()),
            a);
    (mailchimp = { storage: n, utils: t }),
        (mailchimp_cart = new (function () {
            return (
                (this.email_types = "input[type=email]"),
                (this.regex_email = /^([A-Za-z0-9_+\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/),
                (this.current_email = null),
                (this.previous_email = null),
                (this.expireUser = function () {
                    (this.current_email = null), mailchimp.storage.expire("mailchimp.cart.current_email");
                }),
                (this.expireSaved = function () {
                    mailchimp.storage.expire("mailchimp.cart.items");
                }),
                (this.setEmail = function (e) {
                    if (!this.valueEmail(e)) return !1;
                    this.setPreviousEmail(this.getEmail()), mailchimp.storage.set("mailchimp.cart.current_email", (this.current_email = e));
                }),
                (this.getEmail = function () {
                    if (this.current_email) return this.current_email;
                    var e = mailchimp.storage.get("mailchimp.cart.current_email", !1);
                    return !(!e || !this.valueEmail(e)) && (this.current_email = e);
                }),
                (this.setPreviousEmail = function (e) {
                    if (!this.valueEmail(e)) return !1;
                    mailchimp.storage.set("mailchimp.cart.previous_email", (this.previous_email = e));
                }),
                (this.valueEmail = function (e) {
                    return this.regex_email.test(e);
                }),
                this
            );
        })());
})(),
    mailchimpReady(function () {
        if (void 0 === e) var e = { site_url: document.location.origin, defaulted: !0, ajax_url: document.location.origin + "/wp-admin?admin-ajax.php" };
        try {
            var i = mailchimp.utils.getQueryStringVars();
            void 0 !== i.mc_cart_id && mailchimpGetCurrentUserByHash(i.mc_cart_id),
                (mailchimp_username_email = document.querySelector("#username")),
                (mailchimp_billing_email = document.querySelector("#billing_email")),
                (mailchimp_registration_email = document.querySelector("#reg_email")),
                mailchimp_billing_email &&
                    ((mailchimp_billing_email.onblur = function () {
                        mailchimpHandleBillingEmail("#billing_email");
                    }),
                    (mailchimp_billing_email.onfocus = function () {
                        mailchimpHandleBillingEmail("#billing_email");
                    })),
                mailchimp_username_email &&
                    ((mailchimp_username_email.onblur = function () {
                        mailchimpHandleBillingEmail("#username");
                    }),
                    (mailchimp_username_email.onfocus = function () {
                        mailchimpHandleBillingEmail("#username");
                    })),
                mailchimp_registration_email &&
                    ((mailchimp_registration_email.onblur = function () {
                        mailchimpHandleBillingEmail("#reg_email");
                    }),
                    (mailchimp_registration_email.onfocus = function () {
                        mailchimpHandleBillingEmail("#reg_email");
                    }));
        } catch (e) {
            console.log("mailchimp ready error", e);
        }
    });
!(function (a) {
    a.fn.hoverIntent = function (e, t, n) {
        var o,
            r,
            v,
            i,
            u = { interval: 100, sensitivity: 6, timeout: 0 };
        u = "object" == typeof e ? a.extend(u, e) : a.isFunction(t) ? a.extend(u, { over: e, out: t, selector: n }) : a.extend(u, { over: e, out: e, selector: t });
        function s(e) {
            (o = e.pageX), (r = e.pageY);
        }
        function h(e) {
            var t = a.extend({}, e),
                n = this;
            n.hoverIntent_t && (n.hoverIntent_t = clearTimeout(n.hoverIntent_t)),
                "mouseenter" === e.type
                    ? ((v = t.pageX),
                      (i = t.pageY),
                      a(n).on("mousemove.hoverIntent", s),
                      n.hoverIntent_s ||
                          (n.hoverIntent_t = setTimeout(function () {
                              I(t, n);
                          }, u.interval)))
                    : (a(n).off("mousemove.hoverIntent", s),
                      n.hoverIntent_s &&
                          (n.hoverIntent_t = setTimeout(function () {
                              !(function (e, t) {
                                  (t.hoverIntent_t = clearTimeout(t.hoverIntent_t)), (t.hoverIntent_s = !1), u.out.apply(t, [e]);
                              })(t, n);
                          }, u.timeout)));
        }
        var I = function (e, t) {
            if (((t.hoverIntent_t = clearTimeout(t.hoverIntent_t)), Math.sqrt((v - o) * (v - o) + (i - r) * (i - r)) < u.sensitivity)) return a(t).off("mousemove.hoverIntent", s), (t.hoverIntent_s = !0), u.over.apply(t, [e]);
            (v = o),
                (i = r),
                (t.hoverIntent_t = setTimeout(function () {
                    I(e, t);
                }, u.interval));
        };
        return this.on({ "mouseenter.hoverIntent": h, "mouseleave.hoverIntent": h }, u.selector);
    };
})(jQuery);
/*!Max Mega Menu jQuery Plugin*/ (function ($) {
    "use strict";
    $.maxmegamenu = function (menu, options) {
        var plugin = this;
        var $menu = $(menu);
        var $toggle_bar = $menu.siblings(".mega-menu-toggle");
        var html_body_class_timeout;
        var defaults = {
            event: $menu.attr("data-event"),
            effect: $menu.attr("data-effect"),
            effect_speed: parseInt($menu.attr("data-effect-speed")),
            effect_mobile: $menu.attr("data-effect-mobile"),
            effect_speed_mobile: parseInt($menu.attr("data-effect-speed-mobile")),
            panel_width: $menu.attr("data-panel-width"),
            panel_inner_width: $menu.attr("data-panel-inner-width"),
            mobile_force_width: $menu.attr("data-mobile-force-width"),
            mobile_overlay: $menu.attr("data-mobile-overlay"),
            second_click: $menu.attr("data-second-click"),
            vertical_behaviour: $menu.attr("data-vertical-behaviour"),
            document_click: $menu.attr("data-document-click"),
            breakpoint: $menu.attr("data-breakpoint"),
            unbind_events: $menu.attr("data-unbind"),
            hover_intent_timeout: $menu.attr("data-hover-intent-timeout"),
            hover_intent_interval: $menu.attr("data-hover-intent-interval"),
        };
        plugin.settings = {};
        var items_with_submenus = $(
            "li.mega-menu-megamenu.mega-menu-item-has-children," +
                "li.mega-menu-flyout.mega-menu-item-has-children," +
                "li.mega-menu-tabbed > ul.mega-sub-menu > li.mega-menu-item-has-children," +
                "li.mega-menu-flyout li.mega-menu-item-has-children",
            menu
        );
        plugin.addAnimatingClass = function (element) {
            if (plugin.settings.effect === "disabled") {
                return;
            }
            $(".mega-animating").removeClass("mega-animating");
            var timeout = plugin.settings.effect_speed + parseInt(megamenu.timeout, 10);
            element.addClass("mega-animating");
            setTimeout(function () {
                element.removeClass("mega-animating");
            }, timeout);
        };
        plugin.hideAllPanels = function () {
            $(".mega-toggle-on > a.mega-menu-link", $menu).each(function () {
                plugin.hidePanel($(this), !1);
            });
        };
        plugin.hideSiblingPanels = function (anchor, immediate) {
            anchor
                .parent()
                .parent()
                .find(".mega-toggle-on")
                .children("a.mega-menu-link")
                .each(function () {
                    plugin.hidePanel($(this), immediate);
                });
        };
        plugin.isDesktopView = function () {
            return Math.max(window.outerWidth, $(window).width()) > plugin.settings.breakpoint;
        };
        plugin.isMobileView = function () {
            return !plugin.isDesktopView();
        };
        plugin.showPanel = function (anchor) {
            anchor.parent().triggerHandler("before_open_panel");
            anchor.attr("aria-expanded", "true");
            $(".mega-animating").removeClass("mega-animating");
            if (plugin.isMobileView() && anchor.parent().hasClass("mega-hide-sub-menu-on-mobile")) {
                return;
            }
            if (plugin.isDesktopView() && ($menu.hasClass("mega-menu-horizontal") || $menu.hasClass("mega-menu-vertical")) && !anchor.parent().hasClass("mega-collapse-children")) {
                plugin.hideSiblingPanels(anchor, !0);
            }
            if ((plugin.isMobileView() && $menu.hasClass("mega-keyboard-navigation")) || plugin.settings.vertical_behaviour === "accordion") {
                plugin.hideSiblingPanels(anchor, !1);
            }
            plugin.calculateDynamicSubmenuWidths(anchor);
            if (
                anchor.parent().hasClass("mega-collapse-children") ||
                plugin.settings.effect === "slide" ||
                (plugin.isMobileView() && (plugin.settings.effect_mobile === "slide" || plugin.settings.effect_mobile === "slide_left" || plugin.settings.effect_mobile === "slide_right"))
            ) {
                var speed = plugin.isMobileView() ? plugin.settings.effect_speed_mobile : plugin.settings.effect_speed;
                anchor
                    .siblings(".mega-sub-menu")
                    .css("display", "none")
                    .animate({ height: "show", paddingTop: "show", paddingBottom: "show", minHeight: "show" }, speed, function () {
                        $(this).css("display", "");
                    });
            }
            anchor.parent().addClass("mega-toggle-on").triggerHandler("open_panel");
        };
        plugin.hidePanel = function (anchor, immediate) {
            anchor.parent().triggerHandler("before_close_panel");
            anchor.attr("aria-expanded", "false");
            if (
                anchor.parent().hasClass("mega-collapse-children") ||
                (!immediate && plugin.settings.effect === "slide") ||
                (plugin.isMobileView() && (plugin.settings.effect_mobile === "slide" || plugin.settings.effect_mobile === "slide_left" || plugin.settings.effect_mobile === "slide_right"))
            ) {
                var speed = plugin.isMobileView() ? plugin.settings.effect_speed_mobile : plugin.settings.effect_speed;
                anchor.siblings(".mega-sub-menu").animate({ height: "hide", paddingTop: "hide", paddingBottom: "hide", minHeight: "hide" }, speed, function () {
                    anchor.siblings(".mega-sub-menu").css("display", "");
                    anchor.parent().removeClass("mega-toggle-on").triggerHandler("close_panel");
                });
                return;
            }
            if (immediate) {
                anchor
                    .siblings(".mega-sub-menu")
                    .css("display", "none")
                    .delay(plugin.settings.effect_speed)
                    .queue(function () {
                        $(this).css("display", "").dequeue();
                    });
            }
            anchor
                .siblings(".mega-sub-menu")
                .find(".widget_media_video video")
                .each(function () {
                    this.player.pause();
                });
            anchor.parent().removeClass("mega-toggle-on").triggerHandler("close_panel");
            plugin.addAnimatingClass(anchor.parent());
        };
        plugin.calculateDynamicSubmenuWidths = function (anchor) {
            if (anchor.parent().hasClass("mega-menu-megamenu") && anchor.parent().parent().hasClass("max-mega-menu") && plugin.settings.panel_width && $(plugin.settings.panel_width).length > 0) {
                if (plugin.isDesktopView()) {
                    var submenu_offset = $menu.offset();
                    var target_offset = $(plugin.settings.panel_width).offset();
                    anchor.siblings(".mega-sub-menu").css({ width: $(plugin.settings.panel_width).outerWidth(), left: target_offset.left - submenu_offset.left + "px" });
                } else {
                    anchor.siblings(".mega-sub-menu").css({ width: "", left: "" });
                }
            }
            if (anchor.parent().hasClass("mega-menu-megamenu") && anchor.parent().parent().hasClass("max-mega-menu") && plugin.settings.panel_inner_width && $(plugin.settings.panel_inner_width).length > 0) {
                var target_width = 0;
                if ($(plugin.settings.panel_inner_width).length) {
                    target_width = parseInt($(plugin.settings.panel_inner_width).width(), 10);
                } else {
                    target_width = parseInt(plugin.settings.panel_inner_width, 10);
                }
                var submenu_width = parseInt(anchor.siblings(".mega-sub-menu").innerWidth(), 10);
                if (plugin.isDesktopView() && target_width > 0 && target_width < submenu_width) {
                    anchor.siblings(".mega-sub-menu").css({ paddingLeft: (submenu_width - target_width) / 2 + "px", paddingRight: (submenu_width - target_width) / 2 + "px" });
                } else {
                    anchor.siblings(".mega-sub-menu").css({ paddingLeft: "", paddingRight: "" });
                }
            }
        };
        var bindClickEvents = function () {
            var dragging = !1;
            $(document).on({
                touchmove: function (e) {
                    dragging = !0;
                },
                touchstart: function (e) {
                    dragging = !1;
                },
            });
            $(document).on("click touchend", function (e) {
                if (!dragging && plugin.settings.document_click === "collapse" && !$(e.target).closest(".max-mega-menu li").length && !$(e.target).closest(".mega-menu-toggle").length) {
                    plugin.hideAllPanels();
                    plugin.hideMobileMenu();
                }
                dragging = !1;
            });
            var collapse_children_parents = $("li.mega-menu-megamenu li.mega-menu-item-has-children.mega-collapse-children > a.mega-menu-link");
            var clickable_parents = $("> a.mega-menu-link", items_with_submenus).add(collapse_children_parents);
            clickable_parents.on("touchend.megamenu", function (e) {
                plugin.unbindHoverEvents();
                plugin.unbindHoverIntentEvents();
            });
            clickable_parents.on("click.megamenu", function (e) {
                if (plugin.isDesktopView() && $(this).parent().hasClass("mega-toggle-on") && $(this).parent().parent().parent().hasClass("mega-menu-tabbed")) {
                    if (plugin.settings.second_click === "go") {
                        return;
                    } else {
                        e.preventDefault();
                        return;
                    }
                }
                if (dragging) {
                    return;
                }
                if (plugin.isMobileView() && $(this).parent().hasClass("mega-hide-sub-menu-on-mobile")) {
                    return;
                }
                if ((plugin.settings.second_click === "go" || $(this).parent().hasClass("mega-click-click-go")) && $(this).attr("href") !== undefined) {
                    if (!$(this).parent().hasClass("mega-toggle-on")) {
                        e.preventDefault();
                        plugin.showPanel($(this));
                    }
                } else {
                    e.preventDefault();
                    if ($(this).parent().hasClass("mega-toggle-on")) {
                        plugin.hidePanel($(this), !1);
                    } else {
                        plugin.showPanel($(this));
                    }
                }
            });
        };
        var bindHoverEvents = function () {
            items_with_submenus.on({
                "mouseenter.megamenu": function () {
                    plugin.unbindClickEvents();
                    if (!$(this).hasClass("mega-toggle-on")) {
                        plugin.showPanel($(this).children("a.mega-menu-link"));
                    }
                },
                "mouseleave.megamenu": function () {
                    if ($(this).hasClass("mega-toggle-on") && !$(this).hasClass("mega-disable-collapse") && !$(this).parent().parent().hasClass("mega-menu-tabbed")) {
                        plugin.hidePanel($(this).children("a.mega-menu-link"), !1);
                    }
                },
            });
        };
        var bindHoverIntentEvents = function () {
            items_with_submenus.hoverIntent({
                over: function () {
                    plugin.unbindClickEvents();
                    if (!$(this).hasClass("mega-toggle-on")) {
                        plugin.showPanel($(this).children("a.mega-menu-link"));
                    }
                },
                out: function () {
                    if ($(this).hasClass("mega-toggle-on") && !$(this).hasClass("mega-disable-collapse") && !$(this).parent().parent().hasClass("mega-menu-tabbed")) {
                        plugin.hidePanel($(this).children("a.mega-menu-link"), !1);
                    }
                },
                timeout: plugin.settings.hover_intent_timeout,
                interval: plugin.settings.hover_intent_interval,
            });
        };
        var bindKeyboardEvents = function () {
            var tab_key = 9;
            var escape_key = 27;
            var enter_key = 13;
            var left_arrow_key = 37;
            var right_arrow_key = 39;
            var space_key = 32;
            $menu.parent().on("keyup.megamenu", function (e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === tab_key) {
                    $menu.parent().addClass("mega-keyboard-navigation");
                }
            });
            $menu.parent().on("keydown.megamenu", function (e) {
                var keyCode = e.keyCode || e.which;
                var active_link = $(e.target);
                if (keyCode === space_key && active_link.is(".mega-menu-link") && $menu.parent().hasClass("mega-keyboard-navigation")) {
                    e.preventDefault();
                    if (active_link.parent().is(items_with_submenus)) {
                        if (active_link.parent().hasClass("mega-toggle-on") && !active_link.parent().parent().parent().hasClass("mega-menu-tabbed")) {
                            plugin.hidePanel(active_link);
                        } else {
                            plugin.showPanel(active_link);
                        }
                    }
                }
            });
            $menu.parent().on("keyup.megamenu", function (e) {
                var keyCode = e.keyCode || e.which;
                var active_link = $(e.target);
                if (keyCode === tab_key && $menu.parent().hasClass("mega-keyboard-navigation")) {
                    if (active_link.parent().is(items_with_submenus) && active_link.is("[href]") !== !1) {
                        plugin.showPanel(active_link);
                    } else {
                        if (!active_link.parent().parent().parent().hasClass("mega-menu-tabbed")) {
                            plugin.hideSiblingPanels(active_link);
                        }
                    }
                }
                if (keyCode === escape_key && $menu.parent().hasClass("mega-keyboard-navigation")) {
                    var submenu_open = $("> .mega-toggle-on", $menu).length !== 0;
                    $("> .mega-toggle-on > a.mega-menu-link", $menu).focus();
                    plugin.hideAllPanels();
                    if (plugin.isMobileView() && !submenu_open) {
                        plugin.hideMobileMenu();
                        $(".mega-menu-toggle-block, button.mega-toggle-animated", $toggle_bar).first().focus();
                    }
                }
                if (keyCode === enter_key && $menu.parent().hasClass("mega-keyboard-navigation")) {
                    if (active_link.hasClass("mega-menu-toggle-block")) {
                        if ($toggle_bar.hasClass("mega-menu-open")) {
                            plugin.hideMobileMenu();
                        } else {
                            plugin.showMobileMenu();
                        }
                    }
                    if (active_link.parent().is(items_with_submenus) && active_link.is("[href]") === !1) {
                        if (active_link.parent().hasClass("mega-toggle-on") && !active_link.parent().parent().parent().hasClass("mega-menu-tabbed")) {
                            plugin.hidePanel(active_link);
                        } else {
                            plugin.showPanel(active_link);
                        }
                    }
                }
                if (keyCode === right_arrow_key && plugin.isDesktopView() && $menu.parent().hasClass("mega-keyboard-navigation") && $menu.hasClass("mega-menu-horizontal")) {
                    var next_top_level_item = $("> .mega-toggle-on", $menu).nextAll("li.mega-menu-item:visible").find("> a.mega-menu-link, .mega-search input[type=text]").first();
                    if (next_top_level_item.length === 0) {
                        next_top_level_item = $(":focus", $menu).parent().nextAll("li.mega-menu-item:visible").find("> a.mega-menu-link, .mega-search input[type=text]").first();
                    }
                    next_top_level_item.focus();
                    if (next_top_level_item.parent().is(items_with_submenus) && next_top_level_item.is("[href]") !== !1) {
                        plugin.showPanel(next_top_level_item);
                    } else {
                        plugin.hideSiblingPanels(next_top_level_item);
                    }
                }
                if (keyCode === left_arrow_key && plugin.isDesktopView() && $menu.parent().hasClass("mega-keyboard-navigation") && $menu.hasClass("mega-menu-horizontal")) {
                    var prev_top_level_item = $("> .mega-toggle-on", $menu).prevAll("li.mega-menu-item:visible").find("> a.mega-menu-link, .mega-search input[type=text]").last();
                    if (prev_top_level_item.length === 0) {
                        prev_top_level_item = $(":focus", $menu).parent().prevAll("li.mega-menu-item:visible").find("> a.mega-menu-link, .mega-search input[type=text]").last();
                    }
                    prev_top_level_item.focus();
                    if (prev_top_level_item.parent().is(items_with_submenus) && prev_top_level_item.is("[href]") !== !1) {
                        plugin.showPanel(prev_top_level_item);
                    } else {
                        plugin.hideSiblingPanels(prev_top_level_item);
                    }
                }
            });
            $menu.parent().on("focusout.megamenu", function (e) {
                if ($menu.parent().hasClass("mega-keyboard-navigation")) {
                    setTimeout(function () {
                        var menu_has_focus = $menu.parent().find(":focus").length > 0;
                        if (!menu_has_focus) {
                            $menu.parent().removeClass("mega-keyboard-navigation");
                            plugin.hideAllPanels();
                            plugin.hideMobileMenu();
                        }
                    }, 10);
                }
            });
        };
        plugin.unbindAllEvents = function () {
            $("ul.mega-sub-menu, li.mega-menu-item, li.mega-menu-row, li.mega-menu-column, a.mega-menu-link, span.mega-indicator", menu).off().unbind();
        };
        plugin.unbindClickEvents = function () {
            $("> a.mega-menu-link", items_with_submenus).off("click.megamenu touchend.megamenu");
            if (plugin.isMobileView()) {
                var collapse_children_parents = $("li.mega-menu-megamenu li.mega-menu-item-has-children.mega-collapse-children > a.mega-menu-link");
                collapse_children_parents.off("click.megamenu touchend.megamenu");
            }
        };
        plugin.unbindHoverEvents = function () {
            items_with_submenus.unbind("mouseenter.megamenu mouseleave.megamenu");
        };
        plugin.unbindHoverIntentEvents = function () {
            items_with_submenus.unbind("mouseenter mouseleave").removeProp("hoverIntent_t").removeProp("hoverIntent_s");
        };
        plugin.unbindKeyboardEvents = function () {
            $menu.parent().off("keyup.megamenu keydown.megamenu focusout.megamenu");
        };
        plugin.unbindMegaMenuEvents = function () {
            if (plugin.settings.event === "hover_intent") {
                plugin.unbindHoverIntentEvents();
            }
            if (plugin.settings.event === "hover") {
                plugin.unbindHoverEvents();
            }
            plugin.unbindClickEvents();
            plugin.unbindKeyboardEvents();
        };
        plugin.bindMegaMenuEvents = function () {
            if (plugin.isDesktopView() && plugin.settings.event === "hover_intent") {
                bindHoverIntentEvents();
            }
            if (plugin.isDesktopView() && plugin.settings.event === "hover") {
                bindHoverEvents();
            }
            bindClickEvents();
            bindKeyboardEvents();
        };
        plugin.monitorView = function () {
            if (plugin.isDesktopView()) {
                $menu.data("view", "desktop");
            } else {
                $menu.data("view", "mobile");
                plugin.switchToMobile();
            }
            plugin.checkWidth();
            $(window).resize(function () {
                plugin.checkWidth();
            });
        };
        plugin.checkWidth = function () {
            if (plugin.isMobileView() && $menu.data("view") === "desktop") {
                $menu.data("view", "mobile");
                plugin.switchToMobile();
            }
            if (plugin.isDesktopView() && $menu.data("view") === "mobile") {
                $menu.data("view", "desktop");
                plugin.switchToDesktop();
            }
            plugin.calculateDynamicSubmenuWidths($("> li.mega-menu-megamenu > a.mega-menu-link", $menu));
        };
        plugin.reverseRightAlignedItems = function () {
            if (!$("body").hasClass("rtl")) {
                $menu.append($menu.children("li.mega-item-align-right").get().reverse());
            }
        };
        plugin.addClearClassesToMobileItems = function () {
            $(".mega-menu-row", $menu).each(function () {
                $("> .mega-sub-menu > .mega-menu-column:not(.mega-hide-on-mobile)", $(this)).filter(":even").addClass("mega-menu-clear");
            });
        };
        plugin.switchToMobile = function () {
            plugin.unbindMegaMenuEvents();
            plugin.bindMegaMenuEvents();
            plugin.reverseRightAlignedItems();
            plugin.addClearClassesToMobileItems();
            plugin.hideAllPanels();
        };
        plugin.switchToDesktop = function () {
            plugin.unbindMegaMenuEvents();
            plugin.bindMegaMenuEvents();
            plugin.reverseRightAlignedItems();
            plugin.hideAllPanels();
            $menu.css({ width: "", left: "", display: "" });
            $toggle_bar.removeClass("mega-menu-open");
        };
        plugin.initToggleBar = function () {
            $toggle_bar.on("click", function (e) {
                if (
                    $(e.target).is(
                        ".mega-menu-toggle, .mega-menu-toggle-block, .mega-menu-toggle-animated-block, .mega-menu-toggle-animated-block *, .mega-toggle-blocks-left, .mega-toggle-blocks-center, .mega-toggle-blocks-right, .mega-toggle-label, .mega-toggle-label span"
                    )
                ) {
                    if ($(this).hasClass("mega-menu-open")) {
                        plugin.hideMobileMenu();
                    } else {
                        plugin.showMobileMenu();
                    }
                }
            });
        };
        plugin.hideMobileMenu = function () {
            if (!$toggle_bar.is(":visible")) {
                return;
            }
            html_body_class_timeout = setTimeout(function () {
                $("body").removeClass($menu.attr("id") + "-mobile-open");
                $("html").removeClass($menu.attr("id") + "-off-canvas-open");
            }, plugin.settings.effect_speed_mobile);
            $(".mega-toggle-label, .mega-toggle-animated", $toggle_bar).attr("aria-expanded", "false");
            if (plugin.settings.effect_mobile === "slide") {
                $menu.animate({ height: "hide" }, plugin.settings.effect_speed_mobile, function () {
                    $menu.css({ width: "", left: "", display: "" });
                });
            }
            $toggle_bar.removeClass("mega-menu-open");
        };
        plugin.showMobileMenu = function () {
            if (!$toggle_bar.is(":visible")) {
                return;
            }
            clearTimeout(html_body_class_timeout);
            $("body").addClass($menu.attr("id") + "-mobile-open");
            if (plugin.settings.effect_mobile === "slide_left" || plugin.settings.effect_mobile === "slide_right") {
                $("html").addClass($menu.attr("id") + "-off-canvas-open");
            }
            $(".mega-toggle-label, .mega-toggle-animated", $toggle_bar).attr("aria-expanded", "true");
            plugin.toggleBarForceWidth();
            if (plugin.settings.effect_mobile === "slide") {
                $menu.animate({ height: "show" }, plugin.settings.effect_speed_mobile);
            }
            $toggle_bar.addClass("mega-menu-open");
        };
        plugin.toggleBarForceWidth = function () {
            if ($(plugin.settings.mobile_force_width).length && (plugin.settings.effect_mobile == "slide" || plugin.settings.effect_mobile == "disabled")) {
                var submenu_offset = $toggle_bar.offset();
                var target_offset = $(plugin.settings.mobile_force_width).offset();
                $menu.css({ width: $(plugin.settings.mobile_force_width).outerWidth(), left: target_offset.left - submenu_offset.left + "px" });
            }
        };
        plugin.init = function () {
            $menu.triggerHandler("before_mega_menu_init");
            plugin.settings = $.extend({}, defaults, options);
            $menu.removeClass("mega-no-js");
            plugin.initToggleBar();
            if (plugin.settings.unbind_events === "true") {
                plugin.unbindAllEvents();
            }
            $("span.mega-indicator", $menu).on("click.megamenu", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if ($(this).parent().parent().hasClass("mega-toggle-on")) {
                    if (!$(this).parent().parent().parent().parent().hasClass("mega-menu-tabbed") || plugin.isMobileView()) {
                        plugin.hidePanel($(this).parent(), !1);
                    }
                } else {
                    plugin.showPanel($(this).parent(), !1);
                }
            });
            $(window).on("load", function () {
                plugin.calculateDynamicSubmenuWidths($("> li.mega-menu-megamenu > a.mega-menu-link", $menu));
            });
            plugin.bindMegaMenuEvents();
            plugin.monitorView();
            $menu.triggerHandler("after_mega_menu_init");
        };
        plugin.init();
    };
    $.fn.maxmegamenu = function (options) {
        return this.each(function () {
            if (undefined === $(this).data("maxmegamenu")) {
                var plugin = new $.maxmegamenu(this, options);
                $(this).data("maxmegamenu", plugin);
            }
        });
    };
    $(function () {
        $(".max-mega-menu").maxmegamenu();
    });
})(jQuery);
function debounce(n, t, u) {
    var e;
    return function () {
        var i = this,
            o = arguments,
            a = function () {
                (e = null), u || n.apply(i, o);
            },
            c = u && !e;
        clearTimeout(e), (e = setTimeout(a, t)), c && n.apply(i, o);
    };
}
!(function (e, t) {
    var n = (function (e, t, n) {
        "use strict";
        var i, a;
        if (
            ((function () {
                var t,
                    n = {
                        lazyClass: "lazyload",
                        loadedClass: "lazyloaded",
                        loadingClass: "lazyloading",
                        preloadClass: "lazypreload",
                        errorClass: "lazyerror",
                        autosizesClass: "lazyautosizes",
                        srcAttr: "data-src",
                        srcsetAttr: "data-srcset",
                        sizesAttr: "data-sizes",
                        minSize: 40,
                        customMedia: {},
                        init: !0,
                        expFactor: 1.5,
                        hFac: 0.8,
                        loadMode: 2,
                        loadHidden: !0,
                        ricTimeout: 0,
                        throttleDelay: 125,
                    };
                for (t in ((a = e.lazySizesConfig || e.lazysizesConfig || {}), n)) t in a || (a[t] = n[t]);
            })(),
            !t || !t.getElementsByClassName)
        )
            return { init: function () {}, cfg: a, noSupport: !0 };
        var r = t.documentElement,
            s = e.HTMLPictureElement,
            o = e.addEventListener.bind(e),
            l = e.setTimeout,
            c = e.requestAnimationFrame || l,
            d = e.requestIdleCallback,
            u = /^picture$/i,
            f = ["load", "error", "lazyincluded", "_lazyloaded"],
            g = {},
            m = Array.prototype.forEach,
            v = function (e, t) {
                return g[t] || (g[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")), g[t].test(e.getAttribute("class") || "") && g[t];
            },
            y = function (e, t) {
                v(e, t) || e.setAttribute("class", (e.getAttribute("class") || "").trim() + " " + t);
            },
            h = function (e, t) {
                var n;
                (n = v(e, t)) && e.setAttribute("class", (e.getAttribute("class") || "").replace(n, " "));
            },
            z = function (e, t, n) {
                var i = n ? "addEventListener" : "removeEventListener";
                n && z(e, t),
                    f.forEach(function (n) {
                        e[i](n, t);
                    });
            },
            p = function (e, n, a, r, s) {
                var o = t.createEvent("Event");
                return a || (a = {}), (a.instance = i), o.initEvent(n, !r, !s), (o.detail = a), e.dispatchEvent(o), o;
            },
            b = function (t, n) {
                var i;
                !s && (i = e.picturefill || a.pf) ? (n && n.src && !t.getAttribute("srcset") && t.setAttribute("srcset", n.src), i({ reevaluate: !0, elements: [t] })) : n && n.src && (t.src = n.src);
            },
            A = function (e, t) {
                return (getComputedStyle(e, null) || {})[t];
            },
            C = function (e, t, n) {
                for (n = n || e.offsetWidth; n < a.minSize && t && !e._lazysizesWidth; ) (n = t.offsetWidth), (t = t.parentNode);
                return n;
            },
            E =
                ((ge = []),
                (me = []),
                (ve = ge),
                (ye = function () {
                    var e = ve;
                    for (ve = ge.length ? me : ge, ue = !0, fe = !1; e.length; ) e.shift()();
                    ue = !1;
                }),
                (he = function (e, n) {
                    ue && !n ? e.apply(this, arguments) : (ve.push(e), fe || ((fe = !0), (t.hidden ? l : c)(ye)));
                }),
                (he._lsFlush = ye),
                he),
            _ = function (e, t) {
                return t
                    ? function () {
                          E(e);
                      }
                    : function () {
                          var t = this,
                              n = arguments;
                          E(function () {
                              e.apply(t, n);
                          });
                      };
            },
            w = function (e) {
                var t,
                    i,
                    a = function () {
                        (t = null), e();
                    },
                    r = function () {
                        var e = n.now() - i;
                        e < 99 ? l(r, 99 - e) : (d || a)(a);
                    };
                return function () {
                    (i = n.now()), t || (t = l(r, 99));
                };
            },
            N =
                ((j = /^img$/i),
                (G = /^iframe$/i),
                (J = "onscroll" in e && !/(gle|ing)bot/.test(navigator.userAgent)),
                (K = 0),
                (Q = 0),
                (V = -1),
                (X = function (e) {
                    Q--, (!e || Q < 0 || !e.target) && (Q = 0);
                }),
                (Y = function (e) {
                    return null == U && (U = "hidden" == A(t.body, "visibility")), U || !("hidden" == A(e.parentNode, "visibility") && "hidden" == A(e, "visibility"));
                }),
                (Z = function (e, n) {
                    var i,
                        a = e,
                        s = Y(e);
                    for (P -= n, I += n, $ -= n, q += n; s && (a = a.offsetParent) && a != t.body && a != r; )
                        (s = (A(a, "opacity") || 1) > 0) && "visible" != A(a, "overflow") && ((i = a.getBoundingClientRect()), (s = q > i.left && $ < i.right && I > i.top - 1 && P < i.bottom + 1));
                    return s;
                }),
                (ee = function () {
                    var e,
                        n,
                        s,
                        o,
                        l,
                        c,
                        d,
                        u,
                        f,
                        g,
                        m,
                        v,
                        y = i.elements;
                    if ((D = a.loadMode) && Q < 8 && (e = y.length)) {
                        for (n = 0, V++; n < e; n++)
                            if (y[n] && !y[n]._lazyRace)
                                if (!J || (i.prematureUnveil && i.prematureUnveil(y[n]))) oe(y[n]);
                                else if (
                                    (((u = y[n].getAttribute("data-expand")) && (c = 1 * u)) || (c = K),
                                    g ||
                                        ((g = !a.expand || a.expand < 1 ? (r.clientHeight > 500 && r.clientWidth > 500 ? 500 : 370) : a.expand),
                                        (i._defEx = g),
                                        (m = g * a.expFactor),
                                        (v = a.hFac),
                                        (U = null),
                                        K < m && Q < 1 && V > 2 && D > 2 && !t.hidden ? ((K = m), (V = 0)) : (K = D > 1 && V > 1 && Q < 6 ? g : 0)),
                                    f !== c && ((H = innerWidth + c * v), (O = innerHeight + c), (d = -1 * c), (f = c)),
                                    (s = y[n].getBoundingClientRect()),
                                    (I = s.bottom) >= d && (P = s.top) <= O && (q = s.right) >= d * v && ($ = s.left) <= H && (I || q || $ || P) && (a.loadHidden || Y(y[n])) && ((F && Q < 3 && !u && (D < 3 || V < 4)) || Z(y[n], c)))
                                ) {
                                    if ((oe(y[n]), (l = !0), Q > 9)) break;
                                } else !l && F && !o && Q < 4 && V < 4 && D > 2 && (T[0] || a.preloadAfterLoad) && (T[0] || (!u && (I || q || $ || P || "auto" != y[n].getAttribute(a.sizesAttr)))) && (o = T[0] || y[n]);
                        o && !l && oe(o);
                    }
                }),
                (te = (function (e) {
                    var t,
                        i = 0,
                        r = a.throttleDelay,
                        s = a.ricTimeout,
                        o = function () {
                            (t = !1), (i = n.now()), e();
                        },
                        c =
                            d && s > 49
                                ? function () {
                                      d(o, { timeout: s }), s !== a.ricTimeout && (s = a.ricTimeout);
                                  }
                                : _(function () {
                                      l(o);
                                  }, !0);
                    return function (e) {
                        var a;
                        (e = !0 === e) && (s = 33), t || ((t = !0), (a = r - (n.now() - i)) < 0 && (a = 0), e || a < 9 ? c() : l(c, a));
                    };
                })(ee)),
                (ne = function (e) {
                    var t = e.target;
                    t._lazyCache ? delete t._lazyCache : (X(e), y(t, a.loadedClass), h(t, a.loadingClass), z(t, ae), p(t, "lazyloaded"));
                }),
                (ie = _(ne)),
                (ae = function (e) {
                    ie({ target: e.target });
                }),
                (re = function (e) {
                    var t,
                        n = e.getAttribute(a.srcsetAttr);
                    (t = a.customMedia[e.getAttribute("data-media") || e.getAttribute("media")]) && e.setAttribute("media", t), n && e.setAttribute("srcset", n);
                }),
                (se = _(function (e, t, n, i, r) {
                    var s, o, c, d, f, g;
                    (f = p(e, "lazybeforeunveil", t)).defaultPrevented ||
                        (i && (n ? y(e, a.autosizesClass) : e.setAttribute("sizes", i)),
                        (o = e.getAttribute(a.srcsetAttr)),
                        (s = e.getAttribute(a.srcAttr)),
                        r && (d = (c = e.parentNode) && u.test(c.nodeName || "")),
                        (g = t.firesLoad || ("src" in e && (o || s || d))),
                        (f = { target: e }),
                        y(e, a.loadingClass),
                        g && (clearTimeout(R), (R = l(X, 2500)), z(e, ae, !0)),
                        d && m.call(c.getElementsByTagName("source"), re),
                        o
                            ? e.setAttribute("srcset", o)
                            : s &&
                              !d &&
                              (G.test(e.nodeName)
                                  ? (function (e, t) {
                                        try {
                                            e.contentWindow.location.replace(t);
                                        } catch (n) {
                                            e.src = t;
                                        }
                                    })(e, s)
                                  : (e.src = s)),
                        r && (o || d) && b(e, { src: s })),
                        e._lazyRace && delete e._lazyRace,
                        h(e, a.lazyClass),
                        E(function () {
                            var t = e.complete && e.naturalWidth > 1;
                            (g && !t) ||
                                (t && y(e, "ls-is-cached"),
                                ne(f),
                                (e._lazyCache = !0),
                                l(function () {
                                    "_lazyCache" in e && delete e._lazyCache;
                                }, 9)),
                                "lazy" == e.loading && Q--;
                        }, !0);
                })),
                (oe = function (e) {
                    if (!e._lazyRace) {
                        var t,
                            n = j.test(e.nodeName),
                            i = n && (e.getAttribute(a.sizesAttr) || e.getAttribute("sizes")),
                            r = "auto" == i;
                        ((!r && F) || !n || (!e.getAttribute("src") && !e.srcset) || e.complete || v(e, a.errorClass) || !v(e, a.lazyClass)) &&
                            ((t = p(e, "lazyunveilread").detail), r && M.updateElem(e, !0, e.offsetWidth), (e._lazyRace = !0), Q++, se(e, t, r, i, n));
                    }
                }),
                (le = w(function () {
                    (a.loadMode = 3), te();
                })),
                (ce = function () {
                    3 == a.loadMode && (a.loadMode = 2), le();
                }),
                (de = function () {
                    F || (n.now() - k < 999 ? l(de, 999) : ((F = !0), (a.loadMode = 3), te(), o("scroll", ce, !0)));
                }),
                {
                    _: function () {
                        (k = n.now()),
                            (i.elements = t.getElementsByClassName(a.lazyClass)),
                            (T = t.getElementsByClassName(a.lazyClass + " " + a.preloadClass)),
                            o("scroll", te, !0),
                            o("resize", te, !0),
                            o("pageshow", function (e) {
                                if (e.persisted) {
                                    var n = t.querySelectorAll("." + a.loadingClass);
                                    n.length &&
                                        n.forEach &&
                                        c(function () {
                                            n.forEach(function (e) {
                                                e.complete && oe(e);
                                            });
                                        });
                                }
                            }),
                            e.MutationObserver
                                ? new MutationObserver(te).observe(r, { childList: !0, subtree: !0, attributes: !0 })
                                : (r.addEventListener("DOMNodeInserted", te, !0), r.addEventListener("DOMAttrModified", te, !0), setInterval(te, 999)),
                            o("hashchange", te, !0),
                            ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (e) {
                                t.addEventListener(e, te, !0);
                            }),
                            /d$|^c/.test(t.readyState) ? de() : (o("load", de), t.addEventListener("DOMContentLoaded", te), l(de, 2e4)),
                            i.elements.length ? (ee(), E._lsFlush()) : te();
                    },
                    checkElems: te,
                    unveil: oe,
                    _aLSL: ce,
                }),
            M =
                ((W = _(function (e, t, n, i) {
                    var a, r, s;
                    if (((e._lazysizesWidth = i), (i += "px"), e.setAttribute("sizes", i), u.test(t.nodeName || ""))) for (r = 0, s = (a = t.getElementsByTagName("source")).length; r < s; r++) a[r].setAttribute("sizes", i);
                    n.detail.dataAttr || b(e, n.detail);
                })),
                (S = function (e, t, n) {
                    var i,
                        a = e.parentNode;
                    a && ((n = C(e, a, n)), (i = p(e, "lazybeforesizes", { width: n, dataAttr: !!t })).defaultPrevented || ((n = i.detail.width) && n !== e._lazysizesWidth && W(e, a, i, n)));
                }),
                (B = w(function () {
                    var e,
                        t = x.length;
                    if (t) for (e = 0; e < t; e++) S(x[e]);
                })),
                {
                    _: function () {
                        (x = t.getElementsByClassName(a.autosizesClass)), o("resize", B);
                    },
                    checkElems: B,
                    updateElem: S,
                }),
            L = function () {
                !L.i && t.getElementsByClassName && ((L.i = !0), M._(), N._());
            };
        var x, W, S, B;
        var T, F, R, D, k, H, O, P, $, q, I, U, j, G, J, K, Q, V, X, Y, Z, ee, te, ne, ie, ae, re, se, oe, le, ce, de;
        var ue, fe, ge, me, ve, ye, he;
        return (
            l(function () {
                a.init && L();
            }),
            (i = { cfg: a, autoSizer: M, loader: N, init: L, uP: b, aC: y, rC: h, hC: v, fire: p, gW: C, rAF: E })
        );
    })(e, e.document, Date);
    (e.lazySizes = n), "object" == typeof module && module.exports && (module.exports = n);
})("undefined" != typeof window ? window : {});
/*!
 * modernizr v3.5.0
 * Build https://modernizr.com/download?-cssanimations-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvwunit-flexbox-fontface-objectfit-overflowscrolling-svg-domprefixes-mq-prefixed-setclasses-testallprops-testprop-dontmin
 * Build https://modernizr.com/download?-cssanimations-csstransforms-csstransforms3d-csstransitions-cssvhunit-cssvwunit-flexbox-fontface-objectfit-overflowscrolling-svg-domprefixes-mq-prefixed-setclasses-testallprops-testprop-dontmin
 *
 * Copyright (c)
 * Faruk Ates
 * Paul Irish
 * Alex Sexton
 * Ryan Seddon
 * Patrick Kettner
 * Stu Cox
 * Richard Herrera
 * MIT License
 */ !(function (e, t, n) {
    var r = [],
        s = [],
        i = {
            _version: "3.5.0",
            _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
            _q: [],
            on: function (e, t) {
                var n = this;
                setTimeout(function () {
                    t(n[e]);
                }, 0);
            },
            addTest: function (e, t, n) {
                s.push({ name: e, fn: t, options: n });
            },
            addAsyncTest: function (e) {
                s.push({ name: null, fn: e });
            },
        },
        o = function () {};
    function a(e, t) {
        return typeof e === t;
    }
    (o.prototype = i),
        /*!
{
"name": "SVG",
"property": "svg",
"caniuse": "svg",
"tags": ["svg"],
"authors": ["Erik Dahlstrom"],
"polyfills": [
"svgweb",
"raphael",
"amplesdk",
"canvg",
"svg-boilerplate",
"sie",
"dojogfx",
"fabricjs"
]
}
!*/ (o = new o()).addTest(
            "svg",
            !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect
        );
    var l = t.documentElement,
        f = "svg" === l.nodeName.toLowerCase();
    var u = i._config.usePrefixes ? "Moz O ms Webkit".toLowerCase().split(" ") : [];
    function d(e) {
        return e
            .replace(/([a-z])-([a-z])/g, function (e, t, n) {
                return t + n.toUpperCase();
            })
            .replace(/^-/, "");
    }
    i._domPrefixes = u;
    /*!
{
"name": "CSS Supports",
"property": "supports",
"caniuse": "css-featurequeries",
"tags": ["css"],
"builderAliases": ["css_supports"],
"notes": [{
"name": "W3 Spec",
"href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
},{
"name": "Related Github Issue",
"href": "https://github.com/Modernizr/Modernizr/issues/648"
},{
"name": "W3 Info",
"href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
}]
}
!*/ var c =
            "CSS" in e && "supports" in e.CSS,
        p = "supportsCSS" in e;
    function m(t, n, r) {
        var s;
        if ("getComputedStyle" in e) {
            s = getComputedStyle.call(e, t, n);
            var i = e.console;
            if (null !== s) r && (s = s.getPropertyValue(r));
            else if (i) i[i.error ? "error" : "log"].call(i, "getComputedStyle returning null, its possible modernizr test results are inaccurate");
        } else s = !n && t.currentStyle && t.currentStyle[r];
        return s;
    }
    function v() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : f ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments);
    }
    function h(e, n, r, s) {
        var i,
            o,
            a,
            u,
            d = "modernizr",
            c = v("div"),
            p = (function () {
                var e = t.body;
                return e || ((e = v(f ? "svg" : "body")).fake = !0), e;
            })();
        if (parseInt(r, 10)) for (; r--; ) ((a = v("div")).id = s ? s[r] : d + (r + 1)), c.appendChild(a);
        return (
            ((i = v("style")).type = "text/css"),
            (i.id = "s" + d),
            (p.fake ? p : c).appendChild(i),
            p.appendChild(c),
            i.styleSheet ? (i.styleSheet.cssText = e) : i.appendChild(t.createTextNode(e)),
            (c.id = d),
            p.fake && ((p.style.background = ""), (p.style.overflow = "hidden"), (u = l.style.overflow), (l.style.overflow = "hidden"), l.appendChild(p)),
            (o = n(c, e)),
            p.fake ? (p.parentNode.removeChild(p), (l.style.overflow = u), l.offsetHeight) : c.parentNode.removeChild(c),
            !!o
        );
    }
    o.addTest("supports", c || p);
    var g,
        y = (g = e.matchMedia || e.msMatchMedia)
            ? function (e) {
                  var t = g(e);
                  return (t && t.matches) || !1;
              }
            : function (t) {
                  var n = !1;
                  return (
                      h("@media " + t + " { #modernizr { position: absolute; } }", function (t) {
                          n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position;
                      }),
                      n
                  );
              };
    i.mq = y;
    var w,
        S,
        x,
        C = (i.testStyles = h);
    /*!
{
"name": "@font-face",
"property": "fontface",
"authors": ["Diego Perini", "Mat Marquis"],
"tags": ["css"],
"knownBugs": [
"False Positive: WebOS https://github.com/Modernizr/Modernizr/issues/342",
"False Postive: WP7 https://github.com/Modernizr/Modernizr/issues/538"
],
"notes": [{
"name": "@font-face detection routine by Diego Perini",
"href": "http://javascript.nwbox.com/CSSSupport/"
},{
"name": "Filament Group @font-face compatibility research",
"href": "https://docs.google.com/presentation/d/1n4NyG4uPRjAA8zn_pSQ_Ket0RhcWC6QlZ6LMjKeECo0/edit#slide=id.p"
},{
"name": "Filament Grunticon/@font-face device testing results",
"href": "https://docs.google.com/spreadsheet/ccc?key=0Ag5_yGvxpINRdHFYeUJPNnZMWUZKR2ItMEpRTXZPdUE#gid=0"
},{
"name": "CSS fonts on Android",
"href": "https://stackoverflow.com/questions/3200069/css-fonts-on-android"
},{
"name": "@font-face and Android",
"href": "http://archivist.incutio.com/viewlist/css-discuss/115960"
}]
}
!*/ ((w =
        navigator.userAgent),
    (S = w.match(/w(eb)?osbrowser/gi)),
    (x = w.match(/windows phone/gi) && w.match(/iemobile\/([0-9])+/gi) && parseFloat(RegExp.$1) >= 9),
    S || x)
        ? o.addTest("fontface", !1)
        : C('@font-face {font-family:"font";src:url("https://")}', function (e, n) {
              var r = t.getElementById("smodernizr"),
                  s = r.sheet || r.styleSheet,
                  i = s ? (s.cssRules && s.cssRules[0] ? s.cssRules[0].cssText : s.cssText || "") : "",
                  a = /src/i.test(i) && 0 === i.indexOf(n.split(" ")[0]);
              o.addTest("fontface", a);
          }),
        /*!
{
"name": "CSS vh unit",
"property": "cssvhunit",
"caniuse": "viewport-units",
"tags": ["css"],
"builderAliases": ["css_vhunit"],
"notes": [{
"name": "Related Modernizr Issue",
"href": "https://github.com/Modernizr/Modernizr/issues/572"
},{
"name": "Similar JSFiddle",
"href": "https://jsfiddle.net/FWeinb/etnYC/"
}]
}
!*/ C(
            "#modernizr { height: 50vh; }",
            function (t) {
                var n = parseInt(e.innerHeight / 2, 10),
                    r = parseInt(m(t, null, "height"), 10);
                o.addTest("cssvhunit", r == n);
            }
        ),
        /*!
{
"name": "CSS vw unit",
"property": "cssvwunit",
"caniuse": "viewport-units",
"tags": ["css"],
"builderAliases": ["css_vwunit"],
"notes": [{
"name": "Related Modernizr Issue",
"href": "https://github.com/Modernizr/Modernizr/issues/572"
},{
"name": "JSFiddle Example",
"href": "https://jsfiddle.net/FWeinb/etnYC/"
}]
}
!*/ C(
            "#modernizr { width: 50vw; }",
            function (t) {
                var n = parseInt(e.innerWidth / 2, 10),
                    r = parseInt(m(t, null, "width"), 10);
                o.addTest("cssvwunit", r == n);
            }
        );
    var b = i._config.usePrefixes ? "Moz O ms Webkit".split(" ") : [];
    i._cssomPrefixes = b;
    var T = function (t) {
        var n,
            r = prefixes.length,
            s = e.CSSRule;
        if (void 0 !== s) {
            if (!t) return !1;
            if ((n = (t = t.replace(/^@/, "")).replace(/-/g, "_").toUpperCase() + "_RULE") in s) return "@" + t;
            for (var i = 0; i < r; i++) {
                var o = prefixes[i];
                if (o.toUpperCase() + "_" + n in s) return "@-" + o.toLowerCase() + "-" + t;
            }
            return !1;
        }
    };
    function _(e, t) {
        return function () {
            return e.apply(t, arguments);
        };
    }
    i.atRule = T;
    var z = { elem: v("modernizr") };
    o._q.push(function () {
        delete z.elem;
    });
    var E = { style: z.elem.style };
    function P(e) {
        return e
            .replace(/([A-Z])/g, function (e, t) {
                return "-" + t.toLowerCase();
            })
            .replace(/^ms-/, "-ms-");
    }
    function N(t, n, r, s) {
        if (((s = !a(s, "undefined") && s), !a(r, "undefined"))) {
            var i = (function (t, n) {
                var r = t.length;
                if ("CSS" in e && "supports" in e.CSS) {
                    for (; r--; ) if (e.CSS.supports(P(t[r]), n)) return !0;
                    return !1;
                }
                if ("CSSSupportsRule" in e) {
                    for (var s = []; r--; ) s.push("(" + P(t[r]) + ":" + n + ")");
                    return h("@supports (" + (s = s.join(" or ")) + ") { #modernizr { position: absolute; } }", function (e) {
                        return "absolute" == m(e, null, "position");
                    });
                }
            })(t, r);
            if (!a(i, "undefined")) return i;
        }
        for (var o, l, f, u, c, p = ["modernizr", "tspan", "samp"]; !E.style && p.length; ) (o = !0), (E.modElem = v(p.shift())), (E.style = E.modElem.style);
        function g() {
            o && (delete E.style, delete E.modElem);
        }
        for (f = t.length, l = 0; l < f; l++)
            if (((u = t[l]), (c = E.style[u]), ~("" + u).indexOf("-") && (u = d(u)), void 0 !== E.style[u])) {
                if (s || a(r, "undefined")) return g(), "pfx" != n || u;
                try {
                    E.style[u] = r;
                } catch (e) {}
                if (E.style[u] != c) return g(), "pfx" != n || u;
            }
        return g(), !1;
    }
    o._q.unshift(function () {
        delete E.style;
    });
    i.testProp = function (e, t, n) {
        return N([e], void 0, t, n);
    };
    function j(e, t, n, r, s) {
        var i = e.charAt(0).toUpperCase() + e.slice(1),
            o = (e + " " + b.join(i + " ") + i).split(" ");
        return a(t, "string") || a(t, "undefined")
            ? N(o, t, r, s)
            : (function (e, t, n) {
                  var r;
                  for (var s in e) if (e[s] in t) return !1 === n ? e[s] : a((r = t[e[s]]), "function") ? _(r, n || t) : r;
                  return !1;
              })((o = (e + " " + u.join(i + " ") + i).split(" ")), t, n);
    }
    i.testAllProps = j;
    var R = (i.prefixed = function (e, t, n) {
        return 0 === e.indexOf("@") ? T(e) : (-1 != e.indexOf("-") && (e = d(e)), t ? j(e, t, n) : j(e, "pfx"));
    });
    /*!
{
"name": "CSS Object Fit",
"caniuse": "object-fit",
"property": "objectfit",
"tags": ["css"],
"builderAliases": ["css_objectfit"],
"notes": [{
"name": "Opera Article on Object Fit",
"href": "https://dev.opera.com/articles/css3-object-fit-object-position/"
}]
}
!*/ function k(
        e,
        t,
        n
    ) {
        return j(e, void 0, void 0, t, n);
    }
    o.addTest("objectfit", !!R("objectFit"), { aliases: ["object-fit"] }),
        (i.testAllProps = k),
        /*!
{
"name": "CSS Animations",
"property": "cssanimations",
"caniuse": "css-animation",
"polyfills": ["transformie", "csssandpaper"],
"tags": ["css"],
"warnings": ["Android < 4 will pass this test, but can only animate a single property at a time"],
"notes": [{
"name" : "Article: 'Dispelling the Android CSS animation myths'",
"href": "https://goo.gl/OGw5Gm"
}]
}
!*/ o.addTest(
            "cssanimations",
            k("animationName", "a", !0)
        ),
        /*!
{
"name": "Flexbox",
"property": "flexbox",
"caniuse": "flexbox",
"tags": ["css"],
"notes": [{
"name": "The _new_ flexbox",
"href": "http://dev.w3.org/csswg/css3-flexbox"
}],
"warnings": [
"A `true` result for this detect does not imply that the `flex-wrap` property is supported; see the `flexwrap` detect."
]
}
!*/ o.addTest(
            "flexbox",
            k("flexBasis", "1px", !0)
        ),
        /*!
{
"name": "CSS Overflow Scrolling",
"property": "overflowscrolling",
"tags": ["css"],
"builderAliases": ["css_overflow_scrolling"],
"warnings": ["Introduced in iOS5b2. API is subject to change."],
"notes": [{
"name": "Article on iOS overflow scrolling",
"href": "https://css-tricks.com/snippets/css/momentum-scrolling-on-ios-overflow-elements/"
}]
}
!*/ o.addTest(
            "overflowscrolling",
            k("overflowScrolling", "touch", !0)
        ),
        /*!
{
"name": "CSS Transforms",
"property": "csstransforms",
"caniuse": "transforms2d",
"tags": ["css"]
}
!*/ o.addTest("csstransforms", function () {
            return -1 === navigator.userAgent.indexOf("Android 2.") && k("transform", "scale(1)", !0);
        }),
        /*!
{
"name": "CSS Transforms 3D",
"property": "csstransforms3d",
"caniuse": "transforms3d",
"tags": ["css"],
"warnings": [
"Chrome may occassionally fail this test on some systems; more info: https://code.google.com/p/chromium/issues/detail?id=129004"
]
}
!*/ o.addTest(
            "csstransforms3d",
            function () {
                var e = !!k("perspective", "1px", !0),
                    t = o._config.usePrefixes;
                if (e && (!t || "webkitPerspective" in l.style)) {
                    var n;
                    o.supports ? (n = "@supports (perspective: 1px)") : ((n = "@media (transform-3d)"), t && (n += ",(-webkit-transform-3d)")),
                        C("#modernizr{width:0;height:0}" + (n += "{#modernizr{width:7px;height:18px;margin:0;padding:0;border:0}}"), function (t) {
                            e = 7 === t.offsetWidth && 18 === t.offsetHeight;
                        });
                }
                return e;
            }
        ),
        /*!
{
"name": "CSS Transitions",
"property": "csstransitions",
"caniuse": "css-transitions",
"tags": ["css"]
}
!*/ o.addTest("csstransitions", k("transition", "all", !0)),
        (function () {
            var e, t, n, i, l, f;
            for (var u in s)
                if (s.hasOwnProperty(u)) {
                    if (((e = []), (t = s[u]).name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))) for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
                    for (i = a(t.fn, "function") ? t.fn() : t.fn, l = 0; l < e.length; l++)
                        1 === (f = e[l].split(".")).length ? (o[f[0]] = i) : (!o[f[0]] || o[f[0]] instanceof Boolean || (o[f[0]] = new Boolean(o[f[0]])), (o[f[0]][f[1]] = i)), r.push((i ? "" : "no-") + f.join("-"));
                }
        })(),
        (function (e) {
            var t = l.className,
                n = o._config.classPrefix || "";
            if ((f && (t = t.baseVal), o._config.enableJSClass)) {
                var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
                t = t.replace(r, "$1" + n + "js$2");
            }
            o._config.enableClasses && ((t += " " + n + e.join(" " + n)), f ? (l.className.baseVal = t) : (l.className = t));
        })(r),
        delete i.addTest,
        delete i.addAsyncTest;
    for (var A = 0; A < o._q.length; A++) o._q[A]();
    e.Modernizr = o;
})(window, document);
!(function (e, t) {
    "function" == typeof define && define.amd
        ? define([], function () {
              return (e.svg4everybody = t());
          })
        : "object" == typeof module && module.exports
        ? (module.exports = t())
        : (e.svg4everybody = t());
})(this, function () {
    /*!svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody*/ function e(e, t, n) {
        if (n) {
            var i = document.createDocumentFragment(),
                a = !t.hasAttribute("viewBox") && n.getAttribute("viewBox");
            a && t.setAttribute("viewBox", a);
            for (var o = n.cloneNode(!0); o.childNodes.length; ) i.appendChild(o.firstChild);
            e.appendChild(i);
        }
    }
    function t(t) {
        (t.onreadystatechange = function () {
            if (4 === t.readyState) {
                var n = t._cachedDocument;
                n || (((n = t._cachedDocument = document.implementation.createHTMLDocument("")).body.innerHTML = t.responseText), (t._cachedTarget = {})),
                    t._embeds.splice(0).map(function (i) {
                        var a = t._cachedTarget[i.id];
                        a || (a = t._cachedTarget[i.id] = n.getElementById(i.id)), e(i.parent, i.svg, a);
                    });
            }
        }),
            t.onreadystatechange();
    }
    function n(e) {
        for (var t = e; "svg" !== t.nodeName.toLowerCase() && (t = t.parentNode); );
        return t;
    }
    return function (i) {
        var a,
            o = Object(i),
            r = window.top !== window.self;
        a =
            "polyfill" in o
                ? o.polyfill
                : /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent) ||
                  (navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/) || [])[1] < 10547 ||
                  (navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/) || [])[1] < 537 ||
                  (/\bEdge\/.(\d+)\b/.test(navigator.userAgent) && r);
        var d = {},
            u = window.requestAnimationFrame || setTimeout,
            c = document.getElementsByTagName("use"),
            s = 0;
        a &&
            (function i() {
                for (var r = 0; r < c.length; ) {
                    var g = c[r],
                        l = g.parentNode,
                        f = n(l),
                        m = g.getAttribute("xlink:href") || g.getAttribute("href");
                    if ((!m && o.attributeName && (m = g.getAttribute(o.attributeName)), f && m)) {
                        if (a)
                            if (!o.validate || o.validate(m, f, g)) {
                                l.removeChild(g);
                                var v = m.split("#"),
                                    b = v.shift(),
                                    h = v.join("#");
                                if (b.length) {
                                    var p = d[b];
                                    p || ((p = d[b] = new XMLHttpRequest()).open("GET", b), p.send(), (p._embeds = [])), p._embeds.push({ parent: l, svg: f, id: h }), t(p);
                                } else e(l, f, document.getElementById(h));
                            } else ++r, ++s;
                    } else ++r;
                }
                (!c.length || c.length - s > 0) && u(i, 67);
            })();
    };
});
function Util() {}
if (
    ((Util.hasClass = function (e, t) {
        return e.classList ? e.classList.contains(t) : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"));
    }),
    (Util.addClass = function (e, t) {
        var n = t.split(" ");
        e.classList ? e.classList.add(n[0]) : Util.hasClass(e, n[0]) || (e.className += " " + n[0]), n.length > 1 && Util.addClass(e, n.slice(1).join(" "));
    }),
    (Util.removeClass = function (e, t) {
        var n = t.split(" ");
        if (e.classList) e.classList.remove(n[0]);
        else if (Util.hasClass(e, n[0])) {
            var o = new RegExp("(\\s|^)" + n[0] + "(\\s|$)");
            e.className = e.className.replace(o, " ");
        }
        n.length > 1 && Util.removeClass(e, n.slice(1).join(" "));
    }),
    (Util.toggleClass = function (e, t, n) {
        n ? Util.addClass(e, t) : Util.removeClass(e, t);
    }),
    (Util.setAttributes = function (e, t) {
        for (var n in t) e.setAttribute(n, t[n]);
    }),
    (Util.getChildrenByClassName = function (e, t) {
        e.children;
        for (var n = [], o = 0; o < e.children.length; o++) Util.hasClass(e.children[o], t) && n.push(e.children[o]);
        return n;
    }),
    (Util.is = function (e, t) {
        if (t.nodeType) return e === t;
        for (var n = "string" == typeof t ? document.querySelectorAll(t) : t, o = n.length; o--; ) if (n[o] === e) return !0;
        return !1;
    }),
    (Util.setHeight = function (e, t, n, o, s) {
        var i = t - e,
            r = null,
            l = function (t) {
                r || (r = t);
                var a = t - r,
                    c = parseInt((a / o) * i + e);
                (n.style.height = c + "px"), a < o ? window.requestAnimationFrame(l) : s();
            };
        (n.style.height = e + "px"), window.requestAnimationFrame(l);
    }),
    (Util.scrollTo = function (e, t, n, o) {
        var s = o || window,
            i = s.scrollTop || document.documentElement.scrollTop,
            r = null;
        o || (i = window.scrollY || document.documentElement.scrollTop);
        var l = function (o) {
            r || (r = o);
            var a = o - r;
            a > t && (a = t);
            var c = Math.easeInOutQuad(a, i, e - i, t);
            s.scrollTo(0, c), a < t ? window.requestAnimationFrame(l) : n && n();
        };
        window.requestAnimationFrame(l);
    }),
    (Util.moveFocus = function (e) {
        e || (e = document.getElementsByTagName("body")[0]), e.focus(), document.activeElement !== e && (e.setAttribute("tabindex", "-1"), e.focus());
    }),
    (Util.getIndexInArray = function (e, t) {
        return Array.prototype.indexOf.call(e, t);
    }),
    (Util.cssSupports = function (e, t) {
        return "CSS" in window
            ? CSS.supports(e, t)
            : e.replace(/-([a-z])/g, function (e) {
                  return e[1].toUpperCase();
              }) in document.body.style;
    }),
    (Util.extend = function () {
        var e = {},
            t = !1,
            n = 0,
            o = arguments.length;
        "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && ((t = arguments[0]), n++);
        for (
            var s = function (n) {
                for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t && "[object Object]" === Object.prototype.toString.call(n[o]) ? (e[o] = extend(!0, e[o], n[o])) : (e[o] = n[o]));
            };
            n < o;
            n++
        ) {
            var i = arguments[n];
            s(i);
        }
        return e;
    }),
    (Util.osHasReducedMotion = function () {
        if (!window.matchMedia) return !1;
        var e = window.matchMedia("(prefers-reduced-motion: reduce)");
        return !!e && e.matches;
    }),
    Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector),
    Element.prototype.closest ||
        (Element.prototype.closest = function (e) {
            var t = this;
            if (!document.documentElement.contains(t)) return null;
            do {
                if (t.matches(e)) return t;
                t = t.parentElement || t.parentNode;
            } while (null !== t && 1 === t.nodeType);
            return null;
        }),
    "function" != typeof window.CustomEvent)
) {
    function CustomEvent(e, t) {
        t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
        var n = document.createEvent("CustomEvent");
        return n.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), n;
    }
    (CustomEvent.prototype = window.Event.prototype), (window.CustomEvent = CustomEvent);
}
(Math.easeInOutQuad = function (e, t, n, o) {
    return (e /= o / 2) < 1 ? (n / 2) * e * e + t : (-n / 2) * (--e * (e - 2) - 1) + t;
}),
    (function () {
        var e = document.getElementsByClassName("js-tab-focus");
        function t() {
            e.length > 0 && (o(!1), window.addEventListener("keydown", n)), window.removeEventListener("mousedown", t);
        }
        function n(e) {
            9 === e.keyCode && (o(!0), window.removeEventListener("keydown", n), window.addEventListener("mousedown", t));
        }
        function o(t) {
            for (var n = t ? "" : "none", o = 0; o < e.length; o++) e[o].style.setProperty("outline", n);
        }
        window.addEventListener("mousedown", t);
    })();
/*!
 * jQuery Accordion
 *
 * Copyright 2014 Web Agency Meta Line S.r.l.
 * Released under the MIT license
 */ !(function (t) {
    "use strict";
    t.ML || (t.ML = {});
    var o = {
            panelSelector: ".accordion-panel",
            titleSelector: ".accordion-title",
            contentSelector: ".accordion-content",
            activeClass: "active",
            duration: "slow",
            anchor: !0,
            openOnlyOne: !0,
            onOpen: function (t) {},
            onOpenComplete: function (t) {},
            levelString: "accordion-level",
        },
        n = {
            destroy: function () {
                return t(this).each(function () {
                    var o = t(this),
                        n = o.data("accordion"),
                        e = new RegExp(n.options.levelString + "\\d{1,3}");
                    n.panels.off("click", n.options.titleSelector, n.onTitleClick).removeClass(n.options.activeClass),
                        o
                            .find('[class*="' + n.options.levelString + '"]')
                            .removeAttr("style")
                            .removeClass(function () {
                                for (var t = [], o = this.className.split(" "), n = 0, i = o.length; n < i; n++) e.test(o[n]) && t.push(o[n]);
                                return t.join(" ");
                            }),
                        (n.status = "destroy");
                });
            },
            pause: function () {
                return t(this).each(function () {
                    var o = t(this).data("accordion");
                    o.panels.off("click", o.options.titleSelector, o.onTitleClick);
                });
            },
            restart: function () {
                return t(this).each(function () {
                    var o = t(this).data("accordion");
                    "pause" === o.status ? o.panels.on("click", o.options.titleSelector, o.onTitleClick) : o.init();
                });
            },
        };
    (t.ML.accordion = function (e, i) {
        var s = this;
        return (
            (s.el = e),
            (s.$el = t(e)),
            s.$el.data("accordion", s),
            n[i]
                ? n[i]()
                : ((s.init = function () {
                      var n;
                      (s.options = t.extend({}, o, i)),
                          (s.status = "run"),
                          (s.options.panelSelector = t.trim(s.options.panelSelector)),
                          (s.options.titleSelector = t.trim(s.options.titleSelector)),
                          (s.options.contentSelector = t.trim(s.options.contentSelector)),
                          (s.panels = s.$el.find(s.options.panelSelector)),
                          (s.contents = s.panels.find(s.options.contentSelector).each(function () {
                              var o = t(this),
                                  n = o.parents(s.options.panelSelector).length - 1;
                              o.addClass(s.options.levelString + n)
                                  .data(s.options.levelString, n)
                                  .hide();
                          })),
                          s.panels.on("click", s.options.titleSelector, s.onTitleClick),
                          s.options.anchor && window.location.hash
                              ? (n = s.$el.find(window.location.hash).closest(s.options.panelSelector)).addClass(s.options.activeClass)
                              : (n = s.$el.find(s.options.panelSelector + "." + s.options.activeClass)),
                          n.find(s.options.contentSelector).show();
                  }),
                  (s.onTitleClick = function (o) {
                      o.preventDefault();
                      var n,
                          e = t(this).closest(s.options.panelSelector),
                          i = e.find(s.options.contentSelector),
                          l = i.data(s.options.levelString);
                      s.options.onOpen(e),
                          (n = (n = s.options.openOnlyOne
                              ? 0 === i.data(s.options.levelString)
                                  ? s.$el.find("." + s.options.levelString + "0")
                                  : e.closest("." + s.options.levelString + (l - 1)).find("." + s.options.levelString + l)
                              : i).filter(":visible")),
                          t.when(i.slideDown(s.options.duration), n.slideUp(s.options.duration)).done(function () {
                              s.options.onOpenComplete(e);
                          }),
                          e.hasClass(s.options.activeClass) ? s.panels.removeClass(s.options.activeClass) : (s.panels.removeClass(s.options.activeClass), e.addClass(s.options.activeClass));
                  }),
                  s)
        );
    }),
        (t.fn.accordion = function (o) {
            return n[o]
                ? n[o].apply(this, Array.prototype.slice.call(arguments, 1))
                : this.each(function () {
                      new t.ML.accordion(this, o).init();
                  });
        });
})(jQuery);
/*!
 * FitVids 1.1
 *
 * Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
 * Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
 * Released under the WTFPL license - http://sam.zoy.org/wtfpl/
 *
 */ !(function (t) {
    "use strict";
    (t.fn.fitVids = function (e) {
        var i = { customSelector: null, ignore: null };
        if (!document.getElementById("fit-vids-style")) {
            var r = document.head || document.getElementsByTagName("head")[0],
                a = document.createElement("div");
            (a.innerHTML =
                '<p>x</p><style id="fit-vids-style">.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}</style>'),
                r.appendChild(a.childNodes[1]);
        }
        return (
            e && t.extend(i, e),
            this.each(function () {
                var e = ['iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed"];
                i.customSelector && e.push(i.customSelector);
                var r = ".fitvidsignore";
                i.ignore && (r = r + ", " + i.ignore);
                var a = t(this).find(e.join(","));
                (a = (a = a.not("object object")).not(r)).each(function () {
                    var e = t(this);
                    if (!(e.parents(r).length > 0 || ("embed" === this.tagName.toLowerCase() && e.parent("object").length) || e.parent(".fluid-width-video-wrapper").length)) {
                        e.css("height") || e.css("width") || (!isNaN(e.attr("height")) && !isNaN(e.attr("width"))) || (e.attr("height", 9), e.attr("width", 16));
                        var i =
                            ("object" === this.tagName.toLowerCase() || (e.attr("height") && !isNaN(parseInt(e.attr("height"), 10))) ? parseInt(e.attr("height"), 10) : e.height()) /
                            (isNaN(parseInt(e.attr("width"), 10)) ? e.width() : parseInt(e.attr("width"), 10));
                        if (!e.attr("name")) {
                            var a = "fitvid" + t.fn.fitVids._count;
                            e.attr("name", a), t.fn.fitVids._count++;
                        }
                        e
                            .wrap('<div class="fluid-width-video-wrapper"></div>')
                            .parent(".fluid-width-video-wrapper")
                            .css("padding-top", 100 * i + "%"),
                            e.removeAttr("height").removeAttr("width");
                    }
                });
            })
        );
    }),
        (t.fn.fitVids._count = 0);
})(window.jQuery || window.Zepto);
!(function (o) {
    "use strict";
    var e = { zoom: 7, zoomstyle: "DEFAULT", menustyle: "DEFAULT", type: "ROADMAP", icon: null, bounds: !1, alwayscenter: 1, centerprecision: { lat: 0, lng: 0 } };
    o.fn.googlemaps = function (t) {
        var n = o.extend({}, e, t);
        if (!google) throw "Google Maps is not loaded!";
        return this.each(function (e, t) {
            var l,
                a,
                i,
                s = o(t),
                r = s.children(),
                g = o.extend({}, n, s.data());
            if (
                (void 0 === g.centerlat &&
                    ((g.centerlat = 0),
                    r.each(function () {
                        g.centerlat += o(this).data("lat") || 0;
                    }),
                    (g.centerlat /= r.length)),
                void 0 === g.centerlng &&
                    ((g.centerlng = 0),
                    r.each(function () {
                        g.centerlng += o(this).data("lng") || 0;
                    }),
                    (g.centerlng /= r.length)),
                (l = {
                    draggable: !0,
                    zoom: g.zoom,
                    center: new google.maps.LatLng(g.centerlat + g.centerprecision.lat, g.centerlng + g.centerprecision.lng),
                    scrollwheel: !1,
                    mapTypeControl: !1,
                    mapTypeControlOptions: { style: google.maps.MapTypeControlStyle[g.menustyle], position: google.maps.ControlPosition.TOP_LEFT },
                    panControl: !0,
                    panControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },
                    streetViewControl: !1,
                    streetViewControlOptions: { position: google.maps.ControlPosition.LEFT_CENTER },
                    zoomControl: !0,
                    zoomControlOptions: { style: google.maps.ZoomControlStyle[g.zoomstyle], position: google.maps.ControlPosition.LEFT_CENTER },
                    mapTypeId: google.maps.MapTypeId[g.type],
                }),
                g.style)
            )
                switch (typeof g.style) {
                    case "string":
                        window[g.style] && (l.styles = window[g.style]);
                        break;
                    case "object":
                        l.styles = g.style;
                }
            (a = new google.maps.Map(t, l)),
                google.maps.event.addListenerOnce(a, "idle", function () {
                    (i = new google.maps.InfoWindow({ content: "loading\u2026", maxWidth: 310 })),
                        r.each(function () {
                            var e = o(this),
                                t = new google.maps.Marker({ position: new google.maps.LatLng(e.data("lat"), e.data("lng")), map: a, icon: e.data("icon") || n.icon, html: '<div class="infowindow">' + e.html() + "</div>" });
                            function l() {
                                i.setContent(t.html), i.open(a, t);
                            }
                            google.maps.event.addListener(t, "click", l), (s.data("openwindow") || e.data("openwindow")) && l();
                        });
                });
        });
    };
})(jQuery);
/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */ !(function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? e(require("jquery")) : e(window.jQuery || window.Zepto);
})(function (e) {
    var t,
        i,
        n,
        o,
        a,
        r,
        s = function () {},
        l = !!window.jQuery,
        c = e(window),
        p = function (e, i) {
            t.ev.on("mfp" + e + ".mfp", i);
        },
        d = function (t, i, n, o) {
            var a = document.createElement("div");
            return (a.className = "mfp-" + t), n && (a.innerHTML = n), o ? i && i.appendChild(a) : ((a = e(a)), i && a.appendTo(i)), a;
        },
        u = function (i, n) {
            t.ev.triggerHandler("mfp" + i, n), t.st.callbacks && ((i = i.charAt(0).toLowerCase() + i.slice(1)), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(n) ? n : [n]));
        },
        f = function (i) {
            return (i === r && t.currTemplate.closeBtn) || ((t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose))), (r = i)), t.currTemplate.closeBtn;
        },
        m = function () {
            e.magnificPopup.instance || ((t = new s()).init(), (e.magnificPopup.instance = t));
        };
    (s.prototype = {
        constructor: s,
        init: function () {
            var i = navigator.appVersion;
            (t.isLowIE = t.isIE8 = document.all && !document.addEventListener),
                (t.isAndroid = /android/gi.test(i)),
                (t.isIOS = /iphone|ipad|ipod/gi.test(i)),
                (t.supportsTransition = (function () {
                    var e = document.createElement("p").style,
                        t = ["ms", "O", "Moz", "Webkit"];
                    if (void 0 !== e.transition) return !0;
                    for (; t.length; ) if (t.pop() + "Transition" in e) return !0;
                    return !1;
                })()),
                (t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent)),
                (n = e(document)),
                (t.popupsCache = {});
        },
        open: function (i) {
            var o;
            if (!1 === i.isObj) {
                (t.items = i.items.toArray()), (t.index = 0);
                var r,
                    s = i.items;
                for (o = 0; o < s.length; o++)
                    if (((r = s[o]).parsed && (r = r.el[0]), r === i.el[0])) {
                        t.index = o;
                        break;
                    }
            } else (t.items = e.isArray(i.items) ? i.items : [i.items]), (t.index = i.index || 0);
            if (!t.isOpen) {
                (t.types = []),
                    (a = ""),
                    i.mainEl && i.mainEl.length ? (t.ev = i.mainEl.eq(0)) : (t.ev = n),
                    i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), (t.currTemplate = t.popupsCache[i.key])) : (t.currTemplate = {}),
                    (t.st = e.extend(!0, {}, e.magnificPopup.defaults, i)),
                    (t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos),
                    t.st.modal && ((t.st.closeOnContentClick = !1), (t.st.closeOnBgClick = !1), (t.st.showCloseBtn = !1), (t.st.enableEscapeKey = !1)),
                    t.bgOverlay ||
                        ((t.bgOverlay = d("bg").on("click.mfp", function () {
                            t.close();
                        })),
                        (t.wrap = d("wrap")
                            .attr("tabindex", -1)
                            .on("click.mfp", function (e) {
                                t._checkIfClose(e.target) && t.close();
                            })),
                        (t.container = d("container", t.wrap))),
                    (t.contentContainer = d("content")),
                    t.st.preloader && (t.preloader = d("preloader", t.container, t.st.tLoading));
                var l = e.magnificPopup.modules;
                for (o = 0; o < l.length; o++) {
                    var m = l[o];
                    (m = m.charAt(0).toUpperCase() + m.slice(1)), t["init" + m].call(t);
                }
                u("BeforeOpen"),
                    t.st.showCloseBtn &&
                        (t.st.closeBtnInside
                            ? (p("MarkupParse", function (e, t, i, n) {
                                  i.close_replaceWith = f(n.type);
                              }),
                              (a += " mfp-close-btn-in"))
                            : t.wrap.append(f())),
                    t.st.alignTop && (a += " mfp-align-top"),
                    t.fixedContentPos ? t.wrap.css({ overflow: t.st.overflowY, overflowX: "hidden", overflowY: t.st.overflowY }) : t.wrap.css({ top: c.scrollTop(), position: "absolute" }),
                    (!1 === t.st.fixedBgPos || ("auto" === t.st.fixedBgPos && !t.fixedContentPos)) && t.bgOverlay.css({ height: n.height(), position: "absolute" }),
                    t.st.enableEscapeKey &&
                        n.on("keyup.mfp", function (e) {
                            27 === e.keyCode && t.close();
                        }),
                    c.on("resize.mfp", function () {
                        t.updateSize();
                    }),
                    t.st.closeOnContentClick || (a += " mfp-auto-cursor"),
                    a && t.wrap.addClass(a);
                var g = (t.wH = c.height()),
                    v = {};
                if (t.fixedContentPos && t._hasScrollBar(g)) {
                    var h = t._getScrollbarSize();
                    h && (v.marginRight = h);
                }
                t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : (v.overflow = "hidden"));
                var C = t.st.mainClass;
                return (
                    t.isIE7 && (C += " mfp-ie7"),
                    C && t._addClassToMFP(C),
                    t.updateItemHTML(),
                    u("BuildControls"),
                    e("html").css(v),
                    t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)),
                    (t._lastFocusedEl = document.activeElement),
                    setTimeout(function () {
                        t.content ? (t._addClassToMFP("mfp-ready"), t._setFocus()) : t.bgOverlay.addClass("mfp-ready"), n.on("focusin.mfp", t._onFocusIn);
                    }, 16),
                    (t.isOpen = !0),
                    t.updateSize(g),
                    u("Open"),
                    i
                );
            }
            t.updateItemHTML();
        },
        close: function () {
            t.isOpen &&
                (u("BeforeClose"),
                (t.isOpen = !1),
                t.st.removalDelay && !t.isLowIE && t.supportsTransition
                    ? (t._addClassToMFP("mfp-removing"),
                      setTimeout(function () {
                          t._close();
                      }, t.st.removalDelay))
                    : t._close());
        },
        _close: function () {
            u("Close");
            var i = "mfp-removing mfp-ready ";
            if ((t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos)) {
                var o = { marginRight: "" };
                t.isIE7 ? e("body, html").css("overflow", "") : (o.overflow = ""), e("html").css(o);
            }
            n.off("keyup.mfp focusin.mfp"),
                t.ev.off(".mfp"),
                t.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                t.bgOverlay.attr("class", "mfp-bg"),
                t.container.attr("class", "mfp-container"),
                !t.st.showCloseBtn || (t.st.closeBtnInside && !0 !== t.currTemplate[t.currItem.type]) || (t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach()),
                t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(),
                (t.currItem = null),
                (t.content = null),
                (t.currTemplate = null),
                (t.prevHeight = 0),
                u("AfterClose");
        },
        updateSize: function (e) {
            if (t.isIOS) {
                var i = document.documentElement.clientWidth / window.innerWidth,
                    n = window.innerHeight * i;
                t.wrap.css("height", n), (t.wH = n);
            } else t.wH = e || c.height();
            t.fixedContentPos || t.wrap.css("height", t.wH), u("Resize");
        },
        updateItemHTML: function () {
            var i = t.items[t.index];
            t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
            var n = i.type;
            if ((u("BeforeChange", [t.currItem ? t.currItem.type : "", n]), (t.currItem = i), !t.currTemplate[n])) {
                var a = !!t.st[n] && t.st[n].markup;
                u("FirstMarkupParse", a), (t.currTemplate[n] = !a || e(a));
            }
            o && o !== i.type && t.container.removeClass("mfp-" + o + "-holder");
            var r = t["get" + n.charAt(0).toUpperCase() + n.slice(1)](i, t.currTemplate[n]);
            t.appendContent(r, n), (i.preloaded = !0), u("Change", i), (o = i.type), t.container.prepend(t.contentContainer), u("AfterChange");
        },
        appendContent: function (e, i) {
            (t.content = e),
                e ? (t.st.showCloseBtn && t.st.closeBtnInside && !0 === t.currTemplate[i] ? t.content.find(".mfp-close").length || t.content.append(f()) : (t.content = e)) : (t.content = ""),
                u("BeforeAppend"),
                t.container.addClass("mfp-" + i + "-holder"),
                t.contentContainer.append(t.content);
        },
        parseEl: function (i) {
            var n,
                o = t.items[i];
            if ((o.tagName ? (o = { el: e(o) }) : ((n = o.type), (o = { data: o, src: o.src })), o.el)) {
                for (var a = t.types, r = 0; r < a.length; r++)
                    if (o.el.hasClass("mfp-" + a[r])) {
                        n = a[r];
                        break;
                    }
                (o.src = o.el.attr("data-mfp-src")), o.src || (o.src = o.el.attr("href"));
            }
            return (o.type = n || t.st.type || "inline"), (o.index = i), (o.parsed = !0), (t.items[i] = o), u("ElementParse", o), t.items[i];
        },
        addGroup: function (e, i) {
            var n = function (n) {
                (n.mfpEl = this), t._openClick(n, e, i);
            };
            i || (i = {});
            var o = "click.magnificPopup";
            (i.mainEl = e), i.items ? ((i.isObj = !0), e.off(o).on(o, n)) : ((i.isObj = !1), i.delegate ? e.off(o).on(o, i.delegate, n) : ((i.items = e), e.off(o).on(o, n)));
        },
        _openClick: function (i, n, o) {
            if ((void 0 !== o.midClick ? o.midClick : e.magnificPopup.defaults.midClick) || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
                var a = void 0 !== o.disableOn ? o.disableOn : e.magnificPopup.defaults.disableOn;
                if (a)
                    if (e.isFunction(a)) {
                        if (!a.call(t)) return !0;
                    } else if (c.width() < a) return !0;
                i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), (o.el = e(i.mfpEl)), o.delegate && (o.items = n.find(o.delegate)), t.open(o);
            }
        },
        updateStatus: function (e, n) {
            if (t.preloader) {
                i !== e && t.container.removeClass("mfp-s-" + i), n || "loading" !== e || (n = t.st.tLoading);
                var o = { status: e, text: n };
                u("UpdateStatus", o),
                    (e = o.status),
                    (n = o.text),
                    t.preloader.html(n),
                    t.preloader.find("a").on("click", function (e) {
                        e.stopImmediatePropagation();
                    }),
                    t.container.addClass("mfp-s-" + e),
                    (i = e);
            }
        },
        _checkIfClose: function (i) {
            if (!e(i).hasClass("mfp-prevent-close")) {
                var n = t.st.closeOnContentClick,
                    o = t.st.closeOnBgClick;
                if (n && o) return !0;
                if (!t.content || e(i).hasClass("mfp-close") || (t.preloader && i === t.preloader[0])) return !0;
                if (i === t.content[0] || e.contains(t.content[0], i)) {
                    if (n) return !0;
                } else if (o && e.contains(document, i)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function (e) {
            t.bgOverlay.addClass(e), t.wrap.addClass(e);
        },
        _removeClassFromMFP: function (e) {
            this.bgOverlay.removeClass(e), t.wrap.removeClass(e);
        },
        _hasScrollBar: function (e) {
            return (t.isIE7 ? n.height() : document.body.scrollHeight) > (e || c.height());
        },
        _setFocus: function () {
            (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus();
        },
        _onFocusIn: function (i) {
            if (i.target !== t.wrap[0] && !e.contains(t.wrap[0], i.target)) return t._setFocus(), !1;
        },
        _parseMarkup: function (t, i, n) {
            var o;
            n.data && (i = e.extend(n.data, i)),
                u("MarkupParse", [t, i, n]),
                e.each(i, function (i, n) {
                    if (void 0 === n || !1 === n) return !0;
                    if ((o = i.split("_")).length > 1) {
                        var a = t.find(".mfp-" + o[0]);
                        if (a.length > 0) {
                            var r = o[1];
                            "replaceWith" === r ? a[0] !== n[0] && a.replaceWith(n) : "img" === r ? (a.is("img") ? a.attr("src", n) : a.replaceWith(e("<img>").attr("src", n).attr("class", a.attr("class")))) : a.attr(o[1], n);
                        }
                    } else t.find(".mfp-" + i).html(n);
                });
        },
        _getScrollbarSize: function () {
            if (void 0 === t.scrollbarSize) {
                var e = document.createElement("div");
                (e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"), document.body.appendChild(e), (t.scrollbarSize = e.offsetWidth - e.clientWidth), document.body.removeChild(e);
            }
            return t.scrollbarSize;
        },
    }),
        (e.magnificPopup = {
            instance: null,
            proto: s.prototype,
            modules: [],
            open: function (t, i) {
                return m(), ((t = t ? e.extend(!0, {}, t) : {}).isObj = !0), (t.index = i || 0), this.instance.open(t);
            },
            close: function () {
                return e.magnificPopup.instance && e.magnificPopup.instance.close();
            },
            registerModule: function (t, i) {
                i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t);
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0,
            },
        }),
        (e.fn.magnificPopup = function (i) {
            m();
            var n = e(this);
            if ("string" == typeof i)
                if ("open" === i) {
                    var o,
                        a = l ? n.data("magnificPopup") : n[0].magnificPopup,
                        r = parseInt(arguments[1], 10) || 0;
                    a.items ? (o = a.items[r]) : ((o = n), a.delegate && (o = o.find(a.delegate)), (o = o.eq(r))), t._openClick({ mfpEl: o }, n, a);
                } else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1));
            else (i = e.extend(!0, {}, i)), l ? n.data("magnificPopup", i) : (n[0].magnificPopup = i), t.addGroup(n, i);
            return n;
        });
    var g,
        v,
        h,
        C = function () {
            h && (v.after(h.addClass(g)).detach(), (h = null));
        };
    e.magnificPopup.registerModule("inline", {
        options: { hiddenClass: "hide", markup: "", tNotFound: "Content not found" },
        proto: {
            initInline: function () {
                t.types.push("inline"),
                    p("Close.inline", function () {
                        C();
                    });
            },
            getInline: function (i, n) {
                if ((C(), i.src)) {
                    var o = t.st.inline,
                        a = e(i.src);
                    if (a.length) {
                        var r = a[0].parentNode;
                        r && r.tagName && (v || ((g = o.hiddenClass), (v = d(g)), (g = "mfp-" + g)), (h = a.after(v).detach().removeClass(g))), t.updateStatus("ready");
                    } else t.updateStatus("error", o.tNotFound), (a = e("<div>"));
                    return (i.inlineElement = a), a;
                }
                return t.updateStatus("ready"), t._parseMarkup(n, {}, i), n;
            },
        },
    });
    var y,
        w = function () {
            y && e(document.body).removeClass(y);
        },
        b = function () {
            w(), t.req && t.req.abort();
        };
    e.magnificPopup.registerModule("ajax", {
        options: { settings: null, cursor: "mfp-ajax-cur", tError: '<a href="%url%">The content</a> could not be loaded.' },
        proto: {
            initAjax: function () {
                t.types.push("ajax"), (y = t.st.ajax.cursor), p("Close.ajax", b), p("BeforeChange.ajax", b);
            },
            getAjax: function (i) {
                y && e(document.body).addClass(y), t.updateStatus("loading");
                var n = e.extend(
                    {
                        url: i.src,
                        success: function (n, o, a) {
                            var r = { data: n, xhr: a };
                            u("ParseAjax", r),
                                t.appendContent(e(r.data), "ajax"),
                                (i.finished = !0),
                                w(),
                                t._setFocus(),
                                setTimeout(function () {
                                    t.wrap.addClass("mfp-ready");
                                }, 16),
                                t.updateStatus("ready"),
                                u("AjaxContentAdded");
                        },
                        error: function () {
                            w(), (i.finished = i.loadError = !0), t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src));
                        },
                    },
                    t.st.ajax.settings
                );
                return (t.req = e.ajax(n)), "";
            },
        },
    });
    var I,
        x = function (i) {
            if (i.data && void 0 !== i.data.title) return i.data.title;
            var n = t.st.image.titleSrc;
            if (n) {
                if (e.isFunction(n)) return n.call(t, i);
                if (i.el) return i.el.attr(n) || "";
            }
            return "";
        };
    e.magnificPopup.registerModule("image", {
        options: {
            markup:
                '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
            initImage: function () {
                var i = t.st.image,
                    n = ".image";
                t.types.push("image"),
                    p("Open" + n, function () {
                        "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor);
                    }),
                    p("Close" + n, function () {
                        i.cursor && e(document.body).removeClass(i.cursor), c.off("resize.mfp");
                    }),
                    p("Resize" + n, t.resizeImage),
                    t.isLowIE && p("AfterChange", t.resizeImage);
            },
            resizeImage: function () {
                var e = t.currItem;
                if (e && e.img && t.st.image.verticalFit) {
                    var i = 0;
                    t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - i);
                }
            },
            _onImageHasSize: function (e) {
                e.img && ((e.hasSize = !0), I && clearInterval(I), (e.isCheckingImgSize = !1), u("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), (e.imgHidden = !1)));
            },
            findImageSize: function (e) {
                var i = 0,
                    n = e.img[0],
                    o = function (a) {
                        I && clearInterval(I),
                            (I = setInterval(function () {
                                n.naturalWidth > 0 ? t._onImageHasSize(e) : (i > 200 && clearInterval(I), 3 === ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500));
                            }, a));
                    };
                o(1);
            },
            getImage: function (i, n) {
                var o = 0,
                    a = function () {
                        i &&
                            (i.img[0].complete
                                ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), (i.hasSize = !0), (i.loaded = !0), u("ImageLoadComplete"))
                                : ++o < 200
                                ? setTimeout(a, 100)
                                : r());
                    },
                    r = function () {
                        i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", s.tError.replace("%url%", i.src))), (i.hasSize = !0), (i.loaded = !0), (i.loadError = !0));
                    },
                    s = t.st.image,
                    l = n.find(".mfp-img");
                if (l.length) {
                    var c = document.createElement("img");
                    (c.className = "mfp-img"),
                        i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")),
                        (i.img = e(c).on("load.mfploader", a).on("error.mfploader", r)),
                        (c.src = i.src),
                        l.is("img") && (i.img = i.img.clone()),
                        (c = i.img[0]).naturalWidth > 0 ? (i.hasSize = !0) : c.width || (i.hasSize = !1);
                }
                return (
                    t._parseMarkup(n, { title: x(i), img_replaceWith: i.img }, i),
                    t.resizeImage(),
                    i.hasSize
                        ? (I && clearInterval(I), i.loadError ? (n.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", i.src))) : (n.removeClass("mfp-loading"), t.updateStatus("ready")), n)
                        : (t.updateStatus("loading"), (i.loading = !0), i.hasSize || ((i.imgHidden = !0), n.addClass("mfp-loading"), t.findImageSize(i)), n)
                );
            },
        },
    });
    var k;
    e.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (e) {
                return e.is("img") ? e : e.find("img");
            },
        },
        proto: {
            initZoom: function () {
                var e,
                    i = t.st.zoom,
                    n = ".zoom";
                if (i.enabled && t.supportsTransition) {
                    var o,
                        a,
                        r = i.duration,
                        s = function (e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                n = "all " + i.duration / 1e3 + "s " + i.easing,
                                o = { position: "fixed", zIndex: 9999, left: 0, top: 0, "-webkit-backface-visibility": "hidden" },
                                a = "transition";
                            return (o["-webkit-" + a] = o["-moz-" + a] = o["-o-" + a] = o[a] = n), t.css(o), t;
                        },
                        l = function () {
                            t.content.css("visibility", "visible");
                        };
                    p("BuildControls" + n, function () {
                        if (t._allowZoom()) {
                            if ((clearTimeout(o), t.content.css("visibility", "hidden"), !(e = t._getItemToZoom()))) return void l();
                            (a = s(e)).css(t._getOffset()),
                                t.wrap.append(a),
                                (o = setTimeout(function () {
                                    a.css(t._getOffset(!0)),
                                        (o = setTimeout(function () {
                                            l(),
                                                setTimeout(function () {
                                                    a.remove(), (e = a = null), u("ZoomAnimationEnded");
                                                }, 16);
                                        }, r));
                                }, 16));
                        }
                    }),
                        p("BeforeClose" + n, function () {
                            if (t._allowZoom()) {
                                if ((clearTimeout(o), (t.st.removalDelay = r), !e)) {
                                    if (!(e = t._getItemToZoom())) return;
                                    a = s(e);
                                }
                                a.css(t._getOffset(!0)),
                                    t.wrap.append(a),
                                    t.content.css("visibility", "hidden"),
                                    setTimeout(function () {
                                        a.css(t._getOffset());
                                    }, 16);
                            }
                        }),
                        p("Close" + n, function () {
                            t._allowZoom() && (l(), a && a.remove(), (e = null));
                        });
                }
            },
            _allowZoom: function () {
                return "image" === t.currItem.type;
            },
            _getItemToZoom: function () {
                return !!t.currItem.hasSize && t.currItem.img;
            },
            _getOffset: function (i) {
                var n,
                    o = (n = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem)).offset(),
                    a = parseInt(n.css("padding-top"), 10),
                    r = parseInt(n.css("padding-bottom"), 10);
                o.top -= e(window).scrollTop() - a;
                var s = { width: n.width(), height: (l ? n.innerHeight() : n[0].offsetHeight) - r - a };
                return void 0 === k && (k = void 0 !== document.createElement("p").style.MozTransform), k ? (s["-moz-transform"] = s.transform = "translate(" + o.left + "px," + o.top + "px)") : ((s.left = o.left), (s.top = o.top)), s;
            },
        },
    });
    var T = function (e) {
        if (t.currTemplate.iframe) {
            var i = t.currTemplate.iframe.find("iframe");
            i.length && (e || (i[0].src = "//about:blank"), t.isIE8 && i.css("display", e ? "block" : "none"));
        }
    };
    e.magnificPopup.registerModule("iframe", {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: { index: "youtube.com", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1" },
                vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
            },
        },
        proto: {
            initIframe: function () {
                t.types.push("iframe"),
                    p("BeforeChange", function (e, t, i) {
                        t !== i && ("iframe" === t ? T() : "iframe" === i && T(!0));
                    }),
                    p("Close.iframe", function () {
                        T();
                    });
            },
            getIframe: function (i, n) {
                var o = i.src,
                    a = t.st.iframe;
                e.each(a.patterns, function () {
                    if (o.indexOf(this.index) > -1) return this.id && (o = "string" == typeof this.id ? o.substr(o.lastIndexOf(this.id) + this.id.length, o.length) : this.id.call(this, o)), (o = this.src.replace("%id%", o)), !1;
                });
                var r = {};
                return a.srcAction && (r[a.srcAction] = o), t._parseMarkup(n, r, i), t.updateStatus("ready"), n;
            },
        },
    });
    var _ = function (e) {
            var i = t.items.length;
            return e > i - 1 ? e - i : e < 0 ? i + e : e;
        },
        P = function (e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i);
        };
    e.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%",
        },
        proto: {
            initGallery: function () {
                var i = t.st.gallery,
                    o = ".mfp-gallery";
                if (((t.direction = !0), !i || !i.enabled)) return !1;
                (a += " mfp-gallery"),
                    p("Open" + o, function () {
                        i.navigateByImgClick &&
                            t.wrap.on("click" + o, ".mfp-img", function () {
                                if (t.items.length > 1) return t.next(), !1;
                            }),
                            n.on("keydown" + o, function (e) {
                                37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next();
                            });
                    }),
                    p("UpdateStatus" + o, function (e, i) {
                        i.text && (i.text = P(i.text, t.currItem.index, t.items.length));
                    }),
                    p("MarkupParse" + o, function (e, n, o, a) {
                        var r = t.items.length;
                        o.counter = r > 1 ? P(i.tCounter, a.index, r) : "";
                    }),
                    p("BuildControls" + o, function () {
                        if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
                            var n = i.arrowMarkup,
                                o = (t.arrowLeft = e(n.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass("mfp-prevent-close")),
                                a = (t.arrowRight = e(n.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass("mfp-prevent-close"));
                            o.click(function () {
                                t.prev();
                            }),
                                a.click(function () {
                                    t.next();
                                }),
                                t.container.append(o.add(a));
                        }
                    }),
                    p("Change" + o, function () {
                        t._preloadTimeout && clearTimeout(t._preloadTimeout),
                            (t._preloadTimeout = setTimeout(function () {
                                t.preloadNearbyImages(), (t._preloadTimeout = null);
                            }, 16));
                    }),
                    p("Close" + o, function () {
                        n.off(o), t.wrap.off("click" + o), (t.arrowRight = t.arrowLeft = null);
                    });
            },
            next: function () {
                (t.direction = !0), (t.index = _(t.index + 1)), t.updateItemHTML();
            },
            prev: function () {
                (t.direction = !1), (t.index = _(t.index - 1)), t.updateItemHTML();
            },
            goTo: function (e) {
                (t.direction = e >= t.index), (t.index = e), t.updateItemHTML();
            },
            preloadNearbyImages: function () {
                var e,
                    i = t.st.gallery.preload,
                    n = Math.min(i[0], t.items.length),
                    o = Math.min(i[1], t.items.length);
                for (e = 1; e <= (t.direction ? o : n); e++) t._preloadItem(t.index + e);
                for (e = 1; e <= (t.direction ? n : o); e++) t._preloadItem(t.index - e);
            },
            _preloadItem: function (i) {
                if (((i = _(i)), !t.items[i].preloaded)) {
                    var n = t.items[i];
                    n.parsed || (n = t.parseEl(i)),
                        u("LazyLoad", n),
                        "image" === n.type &&
                            (n.img = e('<img class="mfp-img" />')
                                .on("load.mfploader", function () {
                                    n.hasSize = !0;
                                })
                                .on("error.mfploader", function () {
                                    (n.hasSize = !0), (n.loadError = !0), u("LazyLoadError", n);
                                })
                                .attr("src", n.src)),
                        (n.preloaded = !0);
                }
            },
        },
    });
    e.magnificPopup.registerModule("retina", {
        options: {
            replaceSrc: function (e) {
                return e.src.replace(/\.\w+$/, function (e) {
                    return "@2x" + e;
                });
            },
            ratio: 1,
        },
        proto: {
            initRetina: function () {
                if (window.devicePixelRatio > 1) {
                    var e = t.st.retina,
                        i = e.ratio;
                    (i = isNaN(i) ? i() : i) > 1 &&
                        (p("ImageHasSize.retina", function (e, t) {
                            t.img.css({ "max-width": t.img[0].naturalWidth / i, width: "100%" });
                        }),
                        p("ElementParse.retina", function (t, n) {
                            n.src = e.replaceSrc(n, i);
                        }));
                }
            },
        },
    }),
        m();
});
/*!
 * jquery.social.js
 *
 * @author Daniele De Nobili
 * @license MIT
 *
 * https://github.com/metaline/jquery-social
 */ !(function (t) {
    "use strict";
    function e(t, e) {
        var n = document.createElement("script"),
            o = document.getElementsByTagName("script")[0];
        if (e) {
            if (document.getElementById(e)) return;
            n.id = e;
        }
        (n.type = "text/javascript"), (n.async = !0), (n.src = t), o.parentNode.insertBefore(n, o);
    }
    function n(t) {
        return t >= 1e6 ? (t / 1e6).toFixed(1) + "M" : t >= 1e3 ? (t / 1e3).toFixed(1) + "k" : t;
    }
    function o() {
        var t,
            e = [];
        for (t = 0; t < 8; t++) e.push("abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789"[Math.floor(60 * Math.random())]);
        return e.join("");
    }
    function i(t) {
        var e;
        return t.is("a") ? (e = t) : 0 === (e = t.find("a")).length && (t.children().wrapAll("<a />"), (e = t.find("> a"))), e;
    }
    var a = {
            template: {
                "facebook-share": '<a href="#" class="social__link"><span class="social__icon"></span><span class="social__count">{total}</span></a>',
                twitter: '<a href="#" class="social__link"><span class="social__icon"></span><span class="social__count">Tweet</span></a>',
                googleplus: '<a href="#" class="social__link"><span class="social__icon"></span><span class="social__count">{total}</span></a>',
                pinterest: '<a href="#" class="social__link"><span class="social__icon"></span><span class="social__count">{total}</span></a>',
                linkedin: '<a href="#" class="social__link"><span class="social__icon"></span><span class="social__count">{total}</span></a>',
            },
            facebookAppId: "",
            countStatsUrl: "count-stats.php",
            lang: "en_US",
            enableTracking: !1,
            totalShareSelector: !1,
        },
        r = {
            "facebook-share": {
                load: function (t) {
                    if (!t.options.facebookAppId) throw "Il tracking degli eventi di Facebook \xe8 possibile solo impostando l\u2019opzione 'facebookAppId'";
                    if (window.fbAsyncInit) this.render(t);
                    else {
                        var n = this;
                        (window.fbAsyncInit = function () {
                            window.FB.init({ appId: t.options.facebookAppId, xfbml: !0, version: "v2.12" }),
                                t.options.enableTracking["facebook-comment"] &&
                                    window.FB.Event.subscribe("comment.create", function (e) {
                                        t.tracking("Facebook", "Comment", e, t.options.enableTracking["facebook-comment"]);
                                    }),
                                n.render(t);
                        }),
                            e("//connect.facebook.net/" + t.options.lang + "/sdk.js", "facebook-jssdk");
                    }
                },
                onClick: function (t) {
                    window.FB.ui({ method: "share", href: t.url }, function (e) {
                        e && !e.error_message && t.options.enableTracking["facebook-share"] && t.tracking("Facebook", "Share", t.url, t.options.enableTracking["facebook-share"], !0, !0);
                    });
                },
                render: function (t) {
                    t.hasShareCount("facebook-share")
                        ? t.countLoader(t.url, "facebook", function (e) {
                              t.renderNetwork("facebook-share", e);
                          })
                        : t.renderNetwork("facebook-share");
                },
            },
            googleplus: {
                load: function (t) {
                    t.hasShareCount("googleplus")
                        ? this.loadScript(function () {
                              var e = { nolog: !0, id: t.url, source: "widget", userId: "@viewer", groupId: "@self" };
                              window.gapi.client.rpcRequest("pos.plusones.get", "v1", e).execute(function (e) {
                                  e.result && e.result.metadata && e.result.metadata.globalCounts ? t.renderNetwork("googleplus", e.result.metadata.globalCounts.count || 0) : t.renderNetwork("googleplus", 0);
                              });
                          })
                        : t.renderNetwork("googleplus");
                },
                onClick: function (t) {
                    window.open("https://plus.google.com/share?hl=" + this.fixLang(t.options.lang) + "&url=" + encodeURIComponent(t.url), "", "toolbar=0, status=0, width=900, height=500"),
                        t.options.enableTracking.googleplus && t.tracking("Google", "+1", t.url, t.options.enableTracking.googleplus, !0, !1);
                },
                plusoneLoader: null,
                loaderPromise: null,
                loadScript: function (n) {
                    null === this.loaderPromise && ((this.plusoneLoader = t.Deferred()), (this.loaderPromise = t.when(this.plusoneLoader))),
                        this.loaderPromise.done(n),
                        (window._onGooglePlusLoad = function () {
                            r.googleplus.plusoneLoader.resolve();
                        }),
                        e("https://apis.google.com/js/client:plusone.js?onload=_onGooglePlusLoad");
                },
                fixLang: function (t) {
                    switch (t) {
                        case "en_GB":
                        case "en_US":
                        case "fr_CA":
                        case "pt_BR":
                        case "pt_PT":
                        case "zh_CN":
                        case "zh_HK":
                        case "zh_TW":
                            return t.replace("_", "-");
                        case "es_LA":
                            return "es-419";
                        case "he_IL":
                            return "iw";
                        case "nn_NO":
                            return "no";
                        case "tl_PH":
                            return "fil";
                    }
                    return t.substr(0, 2);
                },
            },
            twitter: {
                load: function (t) {
                    var e, n, o, i, a, r;
                    (t.renderNetwork("twitter"), window.twttr) ||
                        ((window.twttr =
                            ((e = document),
                            (n = "script"),
                            (o = "twitter-wjs"),
                            (a = e.getElementsByTagName(n)[0]),
                            (r = window.twttr || {}),
                            e.getElementById(o) ||
                                (((i = e.createElement(n)).id = o),
                                (i.src = "https://platform.twitter.com/widgets.js"),
                                a.parentNode.insertBefore(i, a),
                                (r._e = []),
                                (r.ready = function (t) {
                                    r._e.push(t);
                                })),
                            r)),
                        t.options.enableTracking.twitter &&
                            window.twttr.ready(function () {
                                window.twttr.events.bind("tweet", function (e) {
                                    e && "tweet" === e.type && t.tracking("Twitter", "Tweet", e.target.baseURI, t.options.enableTracking.twitter, !0, !0);
                                });
                            }));
                },
                onRender: function (t, e) {
                    var n = i(e),
                        o = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(t.url);
                    t.title && (o += "&text=" + encodeURIComponent(t.title)), t.options.twitterVia && (o += "&via=" + t.options.twitterVia), n.attr("href", o);
                },
            },
            pinterest: {
                load: function (n) {
                    if ((e("//assets.pinterest.com/js/pinit.js"), n.hasShareCount("pinterest"))) {
                        var i = "_PinterestCount" + o();
                        (window[i] = function (t) {
                            n.renderNetwork("pinterest", t.count);
                        }),
                            t.getScript("http://api.pinterest.com/v1/urls/count.json?url=" + encodeURIComponent(n.url) + "&callback=" + i);
                    } else n.renderNetwork("pinterest");
                },
                onRender: function (t, e) {
                    var n,
                        o = i(e);
                    (n = "https://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(t.url)),
                        t.title && (n += "&description=" + encodeURIComponent(t.title)),
                        o.attr("href", n),
                        o.attr("data-pin-custom", !0),
                        o.attr("data-pin-do", "buttonPin");
                },
                onClick: function (t) {
                    window.PinUtils && window.PinUtils.pinAny(), t.options.enableTracking.pinterest && t.tracking("Pinterest", "Pin It", t.url, t.options.enableTracking.pinterest, !0, !0);
                },
            },
            linkedin: {
                load: function (e) {
                    if (e.hasShareCount("linkedin")) {
                        var n = "_linkedInCount" + o();
                        (window[n] = function (t) {
                            e.renderNetwork("linkedin", t.count);
                        }),
                            t.getScript("https://www.linkedin.com/countserv/count/share?url=" + encodeURIComponent(e.url) + "&format=jsonp&callback=" + n);
                    } else e.renderNetwork("linkedin");
                },
                onClick: function (t) {
                    var e = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(t.url);
                    t.title && (e += "&title=" + encodeURIComponent(t.title)),
                        t.text && (e += "&summary=" + encodeURIComponent(t.text)),
                        window.open(e, "linkedin", "toolbar=no,width=550,height=550"),
                        t.options.enableTracking.linkedin && t.tracking("LinkedIn", "Share", t.url, t.options.enableTracking.linkedin, !0, !0);
                },
            },
        };
    function s(e, n) {
        (this.element = t(e)), (this.options = t.extend({}, a, n)), this.init();
    }
    (s.prototype = {
        init: function () {
            var e = this,
                n = 0;
            (this.networkButtons = {}),
                this.element.find("[data-network]").each(function () {
                    var o = t(this),
                        i = o.data("network");
                    (e.networkButtons[i] = o), n++;
                }),
                n &&
                    ((this.url = this.element.data("url") || t('meta[property="og:url"]').attr("content") || document.location.href),
                    (this.title = this.element.data("title") || t('meta[property="og:title"]').attr("content") || document.title),
                    (this.text = this.element.data("text") || t('meta[property="og:description"]').attr("content") || ""),
                    this.initTotal(),
                    this.load());
        },
        load: function () {
            var e = this;
            t.each(this.networkButtons, function (t) {
                r[t] && r[t].load(e);
            });
        },
        renderNetwork: function (t, e) {
            var n = this,
                o = this.networkButtons[t];
            (e = e || 0),
                o.data("share", e),
                r[t] &&
                    (n.renderButton(t, e),
                    r[t] && "function" == typeof r[t].onRender && r[t].onRender(n, o),
                    o.on("click", function (e) {
                        e.preventDefault();
                        var i = parseInt(o.data("share") || 0, 10) + 1;
                        o.data("share", i), n.renderButton(t, i), "function" == typeof r[t].onClick && r[t].onClick(n, o);
                    }));
        },
        renderButton: function (t, e) {
            this.networkButtons[t].html(this.options.template[t].replace("{total}", n(e))), this.updateTotal();
        },
        hasShareCount: function (t) {
            return -1 !== this.options.template[t].indexOf("{total}");
        },
        tracking: function (t, e, n, o, i, a) {
            window.ga && ((void 0 === i || i) && window.ga("send", "event", "Social", e + " (" + t + ")", n, o), (void 0 === a || a) && window.ga("send", "social", t, e, n, o));
        },
        _loaders: [],
        countLoader: function (e, n, o) {
            var i = this;
            return (
                "function" != typeof o && (o = t.noop()),
                (function (e) {
                    var n = t.grep(i._loaders, function (t) {
                        return t.url === e;
                    });
                    if (n.length) return n[0];
                    var o = new Promise(function (n) {
                        t.get(i.options.countStatsUrl, { url: e }, n);
                    });
                    return (o.url = e), i._loaders.push(o), o;
                })(e).then(function (t) {
                    if (!t || t.error) return t.message && console.error(t.message), void o(0);
                    void 0 !== t.share && void 0 !== t.share[n] ? o(t.share[n]) : o(0);
                })
            );
        },
        initTotal: function () {
            this.options.totalShareSelector && (this.$totalShare = t(this.options.totalShareSelector)), this.$totalShare && this.$totalShare.text(0);
        },
        updateTotal: function () {
            if (this.$totalShare) {
                var e = 0;
                t.each(this.networkButtons, function () {
                    e += parseInt(t(this).data("share") || 0, 10);
                }),
                    this.$totalShare.text(n(e));
            }
        },
    }),
        (t.fn.social = function (e) {
            return this.each(function () {
                t.data(this, "plugin_social") || t.data(this, "plugin_social", new s(this, e));
            });
        });
})(jQuery);
(function () {
    var t, i;
    (t = this.jQuery || window.jQuery),
        (i = t(window)),
        (t.fn.stick_in_parent = function (o) {
            var e, s, r, n, l, a, c, p, d, u, f, h, g;
            for (
                null == o && (o = {}),
                    u = o.sticky_class,
                    n = o.inner_scrolling,
                    d = o.recalc_every,
                    p = o.parent,
                    a = o.offset_top,
                    l = o.spacer,
                    r = o.bottoming,
                    null == a && (a = 0),
                    null == p && (p = void 0),
                    null == n && (n = !0),
                    null == u && (u = "is_stuck"),
                    e = t(document),
                    null == r && (r = !0),
                    c = function (t) {
                        var i, o;
                        return window.getComputedStyle
                            ? (t[0],
                              (i = window.getComputedStyle(t[0])),
                              (o = parseFloat(i.getPropertyValue("width")) + parseFloat(i.getPropertyValue("margin-left")) + parseFloat(i.getPropertyValue("margin-right"))),
                              "border-box" !== i.getPropertyValue("box-sizing") &&
                                  (o +=
                                      parseFloat(i.getPropertyValue("border-left-width")) +
                                      parseFloat(i.getPropertyValue("border-right-width")) +
                                      parseFloat(i.getPropertyValue("padding-left")) +
                                      parseFloat(i.getPropertyValue("padding-right"))),
                              o)
                            : t.outerWidth(!0);
                    },
                    f = function (o, s, f, h, g, y, k, m) {
                        var v, b, w, _, x, P, V, F, C, z, I, A;
                        if (!o.data("sticky_kit")) {
                            if ((o.data("sticky_kit", !0), (x = e.height()), (V = o.parent()), null != p && (V = V.closest(p)), !V.length)) throw "failed to find stick parent";
                            if (
                                ((w = !1),
                                (v = !1),
                                (I = null != l ? l && o.closest(l) : t("<div />")) && I.css("position", o.css("position")),
                                (F = function () {
                                    var t, i, r;
                                    if (!m)
                                        return (
                                            (x = e.height()),
                                            (t = parseInt(V.css("border-top-width"), 10)),
                                            (i = parseInt(V.css("padding-top"), 10)),
                                            (s = parseInt(V.css("padding-bottom"), 10)),
                                            (f = V.offset().top + t + i),
                                            (h = V.height()),
                                            w && ((w = !1), (v = !1), null == l && (o.insertAfter(I), I.detach()), o.css({ position: "", top: "", width: "", bottom: "" }).removeClass(u), (r = !0)),
                                            (g = o.offset().top - (parseInt(o.css("margin-top"), 10) || 0) - a),
                                            (y = o.outerHeight(!0)),
                                            (k = o.css("float")),
                                            I && I.css({ width: c(o), height: y, display: o.css("display"), "vertical-align": o.css("vertical-align"), float: k }),
                                            r ? A() : void 0
                                        );
                                })(),
                                y !== h)
                            )
                                return (
                                    (_ = void 0),
                                    (P = a),
                                    (z = d),
                                    (A = function () {
                                        var t, c, p, b, C, A;
                                        if (!m)
                                            return (
                                                (p = !1),
                                                null != z && (z -= 1) <= 0 && ((z = d), F(), (p = !0)),
                                                p || e.height() === x || (F(), (p = !0)),
                                                (b = i.scrollTop()),
                                                null != _ && (c = b - _),
                                                (_ = b),
                                                w
                                                    ? (r && ((C = b + y + P > h + f), v && !C && ((v = !1), o.css({ position: "fixed", bottom: "", top: P }).trigger("sticky_kit:unbottom"))),
                                                      b < g &&
                                                          ((w = !1),
                                                          (P = a),
                                                          null == l && (("left" !== k && "right" !== k) || o.insertAfter(I), I.detach()),
                                                          (t = { position: "", width: "", top: "" }),
                                                          o.css(t).removeClass(u).trigger("sticky_kit:unstick")),
                                                      n && ((A = i.height()), y + a > A && (v || ((P -= c), (P = Math.max(A - y, P)), (P = Math.min(a, P)), w && o.css({ top: P + "px" })))))
                                                    : b > g &&
                                                      ((w = !0),
                                                      ((t = { position: "fixed", top: P }).width = "border-box" === o.css("box-sizing") ? o.outerWidth() + "px" : o.width() + "px"),
                                                      o.css(t).addClass(u),
                                                      null == l && (o.after(I), ("left" !== k && "right" !== k) || I.append(o)),
                                                      o.trigger("sticky_kit:stick")),
                                                w && r && (null == C && (C = b + y + P > h + f), !v && C)
                                                    ? ((v = !0), "static" === V.css("position") && V.css({ position: "relative" }), o.css({ position: "absolute", bottom: s, top: "auto" }).trigger("sticky_kit:bottom"))
                                                    : void 0
                                            );
                                    }),
                                    (C = function () {
                                        return F(), A();
                                    }),
                                    (b = function () {
                                        if (
                                            ((m = !0),
                                            i.off("touchmove", A),
                                            i.off("scroll", A),
                                            i.off("resize", C),
                                            t(document.body).off("sticky_kit:recalc", C),
                                            o.off("sticky_kit:detach", b),
                                            o.removeData("sticky_kit"),
                                            o.css({ position: "", bottom: "", top: "", width: "" }),
                                            V.position("position", ""),
                                            w)
                                        )
                                            return null == l && (("left" !== k && "right" !== k) || o.insertAfter(I), I.remove()), o.removeClass(u);
                                    }),
                                    i.on("touchmove", A),
                                    i.on("scroll", A),
                                    i.on("resize", C),
                                    t(document.body).on("sticky_kit:recalc", C),
                                    o.on("sticky_kit:detach", b),
                                    setTimeout(A, 0)
                                );
                        }
                    },
                    h = 0,
                    g = this.length;
                h < g;
                h++
            )
                (s = this[h]), f(t(s));
            return this;
        });
}.call(this));
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : (e.Swiper = t());
})(this, function () {
    "use strict";
    var e =
            "undefined" == typeof document
                ? {
                      body: {},
                      addEventListener: function () {},
                      removeEventListener: function () {},
                      activeElement: { blur: function () {}, nodeName: "" },
                      querySelector: function () {
                          return null;
                      },
                      querySelectorAll: function () {
                          return [];
                      },
                      getElementById: function () {
                          return null;
                      },
                      createEvent: function () {
                          return { initEvent: function () {} };
                      },
                      createElement: function () {
                          return {
                              children: [],
                              childNodes: [],
                              style: {},
                              setAttribute: function () {},
                              getElementsByTagName: function () {
                                  return [];
                              },
                          };
                      },
                      location: { hash: "" },
                  }
                : document,
        t =
            "undefined" == typeof window
                ? {
                      document: e,
                      navigator: { userAgent: "" },
                      location: {},
                      history: {},
                      CustomEvent: function () {
                          return this;
                      },
                      addEventListener: function () {},
                      removeEventListener: function () {},
                      getComputedStyle: function () {
                          return {
                              getPropertyValue: function () {
                                  return "";
                              },
                          };
                      },
                      Image: function () {},
                      Date: function () {},
                      screen: {},
                      setTimeout: function () {},
                      clearTimeout: function () {},
                  }
                : window,
        i = function (e) {
            for (var t = 0; t < e.length; t += 1) this[t] = e[t];
            return (this.length = e.length), this;
        };
    function s(s, a) {
        var r = [],
            n = 0;
        if (s && !a && s instanceof i) return s;
        if (s)
            if ("string" == typeof s) {
                var o,
                    l,
                    d = s.trim();
                if (d.indexOf("<") >= 0 && d.indexOf(">") >= 0) {
                    var h = "div";
                    for (
                        0 === d.indexOf("<li") && (h = "ul"),
                            0 === d.indexOf("<tr") && (h = "tbody"),
                            (0 !== d.indexOf("<td") && 0 !== d.indexOf("<th")) || (h = "tr"),
                            0 === d.indexOf("<tbody") && (h = "table"),
                            0 === d.indexOf("<option") && (h = "select"),
                            (l = e.createElement(h)).innerHTML = d,
                            n = 0;
                        n < l.childNodes.length;
                        n += 1
                    )
                        r.push(l.childNodes[n]);
                } else for (o = a || "#" !== s[0] || s.match(/[ .<>:~]/) ? (a || e).querySelectorAll(s.trim()) : [e.getElementById(s.trim().split("#")[1])], n = 0; n < o.length; n += 1) o[n] && r.push(o[n]);
            } else if (s.nodeType || s === t || s === e) r.push(s);
            else if (s.length > 0 && s[0].nodeType) for (n = 0; n < s.length; n += 1) r.push(s[n]);
        return new i(r);
    }
    function a(e) {
        for (var t = [], i = 0; i < e.length; i += 1) -1 === t.indexOf(e[i]) && t.push(e[i]);
        return t;
    }
    (s.fn = i.prototype), (s.Class = i), (s.Dom7 = i);
    var r = {
        addClass: function (e) {
            if (void 0 === e) return this;
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s].classList && this[s].classList.add(t[i]);
            return this;
        },
        removeClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s].classList && this[s].classList.remove(t[i]);
            return this;
        },
        hasClass: function (e) {
            return !!this[0] && this[0].classList.contains(e);
        },
        toggleClass: function (e) {
            for (var t = e.split(" "), i = 0; i < t.length; i += 1) for (var s = 0; s < this.length; s += 1) void 0 !== this[s].classList && this[s].classList.toggle(t[i]);
            return this;
        },
        attr: function (e, t) {
            var i = arguments,
                s = this;
            if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
            for (var a = 0; a < this.length; a += 1)
                if (2 === i.length) s[a].setAttribute(e, t);
                else for (var r in e) (s[a][r] = e[r]), s[a].setAttribute(r, e[r]);
            return this;
        },
        removeAttr: function (e) {
            for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
            return this;
        },
        data: function (e, t) {
            var i;
            if (void 0 !== t) {
                for (var s = 0; s < this.length; s += 1) (i = this[s]).dom7ElementDataStorage || (i.dom7ElementDataStorage = {}), (i.dom7ElementDataStorage[e] = t);
                return this;
            }
            if ((i = this[0])) {
                if (i.dom7ElementDataStorage && e in i.dom7ElementDataStorage) return i.dom7ElementDataStorage[e];
                var a = i.getAttribute("data-" + e);
                return a || void 0;
            }
        },
        transform: function (e) {
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                (i.webkitTransform = e), (i.transform = e);
            }
            return this;
        },
        transition: function (e) {
            "string" != typeof e && (e += "ms");
            for (var t = 0; t < this.length; t += 1) {
                var i = this[t].style;
                (i.webkitTransitionDuration = e), (i.transitionDuration = e);
            }
            return this;
        },
        on: function () {
            for (var e, t = this, i = [], a = arguments.length; a--; ) i[a] = arguments[a];
            var r = i[0],
                n = i[1],
                o = i[2],
                l = i[3];
            function d(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if ((i.unshift(e), s(t).is(n))) o.apply(t, i);
                    else for (var a = s(t).parents(), r = 0; r < a.length; r += 1) s(a[r]).is(n) && o.apply(a[r], i);
                }
            }
            function h(e) {
                var t = (e && e.target && e.target.dom7EventData) || [];
                t.unshift(e), o.apply(this, t);
            }
            "function" == typeof i[1] && ((r = (e = i)[0]), (o = e[1]), (l = e[2]), (n = void 0)), l || (l = !1);
            for (var p, c = r.split(" "), u = 0; u < this.length; u += 1) {
                var v = t[u];
                if (n) for (p = 0; p < c.length; p += 1) v.dom7LiveListeners || (v.dom7LiveListeners = []), v.dom7LiveListeners.push({ type: r, listener: o, proxyListener: d }), v.addEventListener(c[p], d, l);
                else for (p = 0; p < c.length; p += 1) v.dom7Listeners || (v.dom7Listeners = []), v.dom7Listeners.push({ type: r, listener: o, proxyListener: h }), v.addEventListener(c[p], h, l);
            }
            return this;
        },
        off: function () {
            for (var e, t = this, i = [], s = arguments.length; s--; ) i[s] = arguments[s];
            var a = i[0],
                r = i[1],
                n = i[2],
                o = i[3];
            "function" == typeof i[1] && ((a = (e = i)[0]), (n = e[1]), (o = e[2]), (r = void 0)), o || (o = !1);
            for (var l = a.split(" "), d = 0; d < l.length; d += 1)
                for (var h = 0; h < this.length; h += 1) {
                    var p = t[h];
                    if (r) {
                        if (p.dom7LiveListeners)
                            for (var c = 0; c < p.dom7LiveListeners.length; c += 1)
                                n
                                    ? p.dom7LiveListeners[c].listener === n && p.removeEventListener(l[d], p.dom7LiveListeners[c].proxyListener, o)
                                    : p.dom7LiveListeners[c].type === l[d] && p.removeEventListener(l[d], p.dom7LiveListeners[c].proxyListener, o);
                    } else if (p.dom7Listeners)
                        for (var u = 0; u < p.dom7Listeners.length; u += 1)
                            n ? p.dom7Listeners[u].listener === n && p.removeEventListener(l[d], p.dom7Listeners[u].proxyListener, o) : p.dom7Listeners[u].type === l[d] && p.removeEventListener(l[d], p.dom7Listeners[u].proxyListener, o);
                }
            return this;
        },
        trigger: function () {
            for (var i = this, s = [], a = arguments.length; a--; ) s[a] = arguments[a];
            for (var r = s[0].split(" "), n = s[1], o = 0; o < r.length; o += 1)
                for (var l = 0; l < this.length; l += 1) {
                    var d = void 0;
                    try {
                        d = new t.CustomEvent(r[o], { detail: n, bubbles: !0, cancelable: !0 });
                    } catch (t) {
                        (d = e.createEvent("Event")).initEvent(r[o], !0, !0), (d.detail = n);
                    }
                    (i[l].dom7EventData = s.filter(function (e, t) {
                        return t > 0;
                    })),
                        i[l].dispatchEvent(d),
                        (i[l].dom7EventData = []),
                        delete i[l].dom7EventData;
                }
            return this;
        },
        transitionEnd: function (e) {
            var t,
                i = ["webkitTransitionEnd", "transitionend"],
                s = this;
            function a(r) {
                if (r.target === this) for (e.call(this, r), t = 0; t < i.length; t += 1) s.off(i[t], a);
            }
            if (e) for (t = 0; t < i.length; t += 1) s.on(i[t], a);
            return this;
        },
        outerWidth: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"));
                }
                return this[0].offsetWidth;
            }
            return null;
        },
        outerHeight: function (e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"));
                }
                return this[0].offsetHeight;
            }
            return null;
        },
        offset: function () {
            if (this.length > 0) {
                var i = this[0],
                    s = i.getBoundingClientRect(),
                    a = e.body,
                    r = i.clientTop || a.clientTop || 0,
                    n = i.clientLeft || a.clientLeft || 0,
                    o = i === t ? t.scrollY : i.scrollTop,
                    l = i === t ? t.scrollX : i.scrollLeft;
                return { top: s.top + o - r, left: s.left + l - n };
            }
            return null;
        },
        css: function (e, i) {
            var s,
                a = this;
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (s = 0; s < this.length; s += 1) for (var r in e) a[s].style[r] = e[r];
                    return this;
                }
                if (this[0]) return t.getComputedStyle(this[0], null).getPropertyValue(e);
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (s = 0; s < this.length; s += 1) a[s].style[e] = i;
                return this;
            }
            return this;
        },
        each: function (e) {
            if (!e) return this;
            for (var t = 0; t < this.length; t += 1) if (!1 === e.call(this[t], t, this[t])) return this;
            return this;
        },
        html: function (e) {
            if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
            for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
            return this;
        },
        text: function (e) {
            if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
            return this;
        },
        is: function (a) {
            var r,
                n,
                o = this[0];
            if (!o || void 0 === a) return !1;
            if ("string" == typeof a) {
                if (o.matches) return o.matches(a);
                if (o.webkitMatchesSelector) return o.webkitMatchesSelector(a);
                if (o.msMatchesSelector) return o.msMatchesSelector(a);
                for (r = s(a), n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
                return !1;
            }
            if (a === e) return o === e;
            if (a === t) return o === t;
            if (a.nodeType || a instanceof i) {
                for (r = a.nodeType ? [a] : a, n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
                return !1;
            }
            return !1;
        },
        index: function () {
            var e,
                t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
                return e;
            }
        },
        eq: function (e) {
            if (void 0 === e) return this;
            var t,
                s = this.length;
            return new i(e > s - 1 ? [] : e < 0 ? ((t = s + e) < 0 ? [] : [this[t]]) : [this[e]]);
        },
        append: function () {
            for (var t, s = this, a = [], r = arguments.length; r--; ) a[r] = arguments[r];
            for (var n = 0; n < a.length; n += 1) {
                t = a[n];
                for (var o = 0; o < this.length; o += 1)
                    if ("string" == typeof t) {
                        var l = e.createElement("div");
                        for (l.innerHTML = t; l.firstChild; ) s[o].appendChild(l.firstChild);
                    } else if (t instanceof i) for (var d = 0; d < t.length; d += 1) s[o].appendChild(t[d]);
                    else s[o].appendChild(t);
            }
            return this;
        },
        prepend: function (t) {
            var s, a;
            for (s = 0; s < this.length; s += 1)
                if ("string" == typeof t) {
                    var r = e.createElement("div");
                    for (r.innerHTML = t, a = r.childNodes.length - 1; a >= 0; a -= 1) this[s].insertBefore(r.childNodes[a], this[s].childNodes[0]);
                } else if (t instanceof i) for (a = 0; a < t.length; a += 1) this[s].insertBefore(t[a], this[s].childNodes[0]);
                else this[s].insertBefore(t, this[s].childNodes[0]);
            return this;
        },
        next: function (e) {
            return this.length > 0
                ? e
                    ? this[0].nextElementSibling && s(this[0].nextElementSibling).is(e)
                        ? new i([this[0].nextElementSibling])
                        : new i([])
                    : this[0].nextElementSibling
                    ? new i([this[0].nextElementSibling])
                    : new i([])
                : new i([]);
        },
        nextAll: function (e) {
            var t = [],
                a = this[0];
            if (!a) return new i([]);
            for (; a.nextElementSibling; ) {
                var r = a.nextElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), (a = r);
            }
            return new i(t);
        },
        prev: function (e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? (t.previousElementSibling && s(t.previousElementSibling).is(e) ? new i([t.previousElementSibling]) : new i([])) : t.previousElementSibling ? new i([t.previousElementSibling]) : new i([]);
            }
            return new i([]);
        },
        prevAll: function (e) {
            var t = [],
                a = this[0];
            if (!a) return new i([]);
            for (; a.previousElementSibling; ) {
                var r = a.previousElementSibling;
                e ? s(r).is(e) && t.push(r) : t.push(r), (a = r);
            }
            return new i(t);
        },
        parent: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) null !== this[i].parentNode && (e ? s(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return s(a(t));
        },
        parents: function (e) {
            for (var t = [], i = 0; i < this.length; i += 1) for (var r = this[i].parentNode; r; ) e ? s(r).is(e) && t.push(r) : t.push(r), (r = r.parentNode);
            return s(a(t));
        },
        closest: function (e) {
            var t = this;
            return void 0 === e ? new i([]) : (t.is(e) || (t = t.parents(e).eq(0)), t);
        },
        find: function (e) {
            for (var t = [], s = 0; s < this.length; s += 1) for (var a = this[s].querySelectorAll(e), r = 0; r < a.length; r += 1) t.push(a[r]);
            return new i(t);
        },
        children: function (e) {
            for (var t = [], r = 0; r < this.length; r += 1) for (var n = this[r].childNodes, o = 0; o < n.length; o += 1) e ? 1 === n[o].nodeType && s(n[o]).is(e) && t.push(n[o]) : 1 === n[o].nodeType && t.push(n[o]);
            return new i(a(t));
        },
        remove: function () {
            for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this;
        },
        add: function () {
            for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
            var i,
                a,
                r = this;
            for (i = 0; i < e.length; i += 1) {
                var n = s(e[i]);
                for (a = 0; a < n.length; a += 1) (r[r.length] = n[a]), (r.length += 1);
            }
            return r;
        },
        styles: function () {
            return this[0] ? t.getComputedStyle(this[0], null) : {};
        },
    };
    Object.keys(r).forEach(function (e) {
        s.fn[e] = r[e];
    });
    var n,
        o,
        l = {
            deleteProps: function (e) {
                var t = e;
                Object.keys(t).forEach(function (e) {
                    try {
                        t[e] = null;
                    } catch (e) {}
                    try {
                        delete t[e];
                    } catch (e) {}
                });
            },
            nextTick: function (e, t) {
                return void 0 === t && (t = 0), setTimeout(e, t);
            },
            now: function () {
                return Date.now();
            },
            getTranslate: function (e, i) {
                var s, a, r;
                void 0 === i && (i = "x");
                var n = t.getComputedStyle(e, null);
                return (
                    t.WebKitCSSMatrix
                        ? ((a = n.transform || n.webkitTransform).split(",").length > 6 &&
                              (a = a
                                  .split(", ")
                                  .map(function (e) {
                                      return e.replace(",", ".");
                                  })
                                  .join(", ")),
                          (r = new t.WebKitCSSMatrix("none" === a ? "" : a)))
                        : (s = (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(",")),
                    "x" === i && (a = t.WebKitCSSMatrix ? r.m41 : 16 === s.length ? parseFloat(s[12]) : parseFloat(s[4])),
                    "y" === i && (a = t.WebKitCSSMatrix ? r.m42 : 16 === s.length ? parseFloat(s[13]) : parseFloat(s[5])),
                    a || 0
                );
            },
            parseUrlQuery: function (e) {
                var i,
                    s,
                    a,
                    r,
                    n = {},
                    o = e || t.location.href;
                if ("string" == typeof o && o.length)
                    for (
                        r = (s = (o = o.indexOf("?") > -1 ? o.replace(/\S*\?/, "") : "").split("&").filter(function (e) {
                            return "" !== e;
                        })).length,
                            i = 0;
                        i < r;
                        i += 1
                    )
                        (a = s[i].replace(/#\S+/g, "").split("=")), (n[decodeURIComponent(a[0])] = void 0 === a[1] ? void 0 : decodeURIComponent(a[1]) || "");
                return n;
            },
            isObject: function (e) {
                return "object" == typeof e && null !== e && e.constructor && e.constructor === Object;
            },
            extend: function () {
                for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
                for (var i = Object(e[0]), s = 1; s < e.length; s += 1) {
                    var a = e[s];
                    if (null != a)
                        for (var r = Object.keys(Object(a)), n = 0, o = r.length; n < o; n += 1) {
                            var d = r[n],
                                h = Object.getOwnPropertyDescriptor(a, d);
                            void 0 !== h && h.enumerable && (l.isObject(i[d]) && l.isObject(a[d]) ? l.extend(i[d], a[d]) : !l.isObject(i[d]) && l.isObject(a[d]) ? ((i[d] = {}), l.extend(i[d], a[d])) : (i[d] = a[d]));
                        }
                }
                return i;
            },
        },
        d =
            ((o = e.createElement("div")),
            {
                touch: (t.Modernizr && !0 === t.Modernizr.touch) || !!("ontouchstart" in t || (t.DocumentTouch && e instanceof t.DocumentTouch)),
                pointerEvents: !(!t.navigator.pointerEnabled && !t.PointerEvent),
                prefixedPointerEvents: !!t.navigator.msPointerEnabled,
                transition: ((n = o.style), "transition" in n || "webkitTransition" in n || "MozTransition" in n),
                transforms3d:
                    (t.Modernizr && !0 === t.Modernizr.csstransforms3d) ||
                    (function () {
                        var e = o.style;
                        return "webkitPerspective" in e || "MozPerspective" in e || "OPerspective" in e || "MsPerspective" in e || "perspective" in e;
                    })(),
                flexbox: (function () {
                    for (
                        var e = o.style, t = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), i = 0;
                        i < t.length;
                        i += 1
                    )
                        if (t[i] in e) return !0;
                    return !1;
                })(),
                observer: "MutationObserver" in t || "WebkitMutationObserver" in t,
                passiveListener: (function () {
                    var e = !1;
                    try {
                        var i = Object.defineProperty({}, "passive", {
                            get: function () {
                                e = !0;
                            },
                        });
                        t.addEventListener("testPassiveListener", null, i);
                    } catch (e) {}
                    return e;
                })(),
                gestures: "ongesturestart" in t,
            }),
        h = function (e) {
            void 0 === e && (e = {});
            var t = this;
            (t.params = e),
                (t.eventsListeners = {}),
                t.params &&
                    t.params.on &&
                    Object.keys(t.params.on).forEach(function (e) {
                        t.on(e, t.params.on[e]);
                    });
        },
        p = { components: { configurable: !0 } };
    (h.prototype.on = function (e, t, i) {
        var s = this;
        if ("function" != typeof t) return s;
        var a = i ? "unshift" : "push";
        return (
            e.split(" ").forEach(function (e) {
                s.eventsListeners[e] || (s.eventsListeners[e] = []), s.eventsListeners[e][a](t);
            }),
            s
        );
    }),
        (h.prototype.once = function (e, t, i) {
            var s = this;
            if ("function" != typeof t) return s;
            return s.on(
                e,
                function i() {
                    for (var a = [], r = arguments.length; r--; ) a[r] = arguments[r];
                    t.apply(s, a), s.off(e, i);
                },
                i
            );
        }),
        (h.prototype.off = function (e, t) {
            var i = this;
            return (
                e.split(" ").forEach(function (e) {
                    void 0 === t
                        ? (i.eventsListeners[e] = [])
                        : i.eventsListeners[e].forEach(function (s, a) {
                              s === t && i.eventsListeners[e].splice(a, 1);
                          });
                }),
                i
            );
        }),
        (h.prototype.emit = function () {
            for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
            var i,
                s,
                a,
                r = this;
            if (!r.eventsListeners) return r;
            "string" == typeof e[0] || Array.isArray(e[0]) ? ((i = e[0]), (s = e.slice(1, e.length)), (a = r)) : ((i = e[0].events), (s = e[0].data), (a = e[0].context || r));
            var n = Array.isArray(i) ? i : i.split(" ");
            return (
                n.forEach(function (e) {
                    if (r.eventsListeners[e]) {
                        var t = [];
                        r.eventsListeners[e].forEach(function (e) {
                            t.push(e);
                        }),
                            t.forEach(function (e) {
                                e.apply(a, s);
                            });
                    }
                }),
                r
            );
        }),
        (h.prototype.useModulesParams = function (e) {
            var t = this;
            t.modules &&
                Object.keys(t.modules).forEach(function (i) {
                    var s = t.modules[i];
                    s.params && l.extend(e, s.params);
                });
        }),
        (h.prototype.useModules = function (e) {
            void 0 === e && (e = {});
            var t = this;
            t.modules &&
                Object.keys(t.modules).forEach(function (i) {
                    var s = t.modules[i],
                        a = e[i] || {};
                    s.instance &&
                        Object.keys(s.instance).forEach(function (e) {
                            var i = s.instance[e];
                            t[e] = "function" == typeof i ? i.bind(t) : i;
                        }),
                        s.on &&
                            t.on &&
                            Object.keys(s.on).forEach(function (e) {
                                t.on(e, s.on[e]);
                            }),
                        s.create && s.create.bind(t)(a);
                });
        }),
        (p.components.set = function (e) {
            this.use && this.use(e);
        }),
        (h.installModule = function (e) {
            for (var t = [], i = arguments.length - 1; i-- > 0; ) t[i] = arguments[i + 1];
            var s = this;
            s.prototype.modules || (s.prototype.modules = {});
            var a = e.name || Object.keys(s.prototype.modules).length + "_" + l.now();
            return (
                (s.prototype.modules[a] = e),
                e.proto &&
                    Object.keys(e.proto).forEach(function (t) {
                        s.prototype[t] = e.proto[t];
                    }),
                e.static &&
                    Object.keys(e.static).forEach(function (t) {
                        s[t] = e.static[t];
                    }),
                e.install && e.install.apply(s, t),
                s
            );
        }),
        (h.use = function (e) {
            for (var t = [], i = arguments.length - 1; i-- > 0; ) t[i] = arguments[i + 1];
            var s = this;
            return Array.isArray(e)
                ? (e.forEach(function (e) {
                      return s.installModule(e);
                  }),
                  s)
                : s.installModule.apply(s, [e].concat(t));
        }),
        Object.defineProperties(h, p);
    var c = {
        updateSize: function () {
            var e,
                t,
                i = this.$el;
            (e = void 0 !== this.params.width ? this.params.width : i[0].clientWidth),
                (t = void 0 !== this.params.height ? this.params.height : i[0].clientHeight),
                (0 === e && this.isHorizontal()) ||
                    (0 === t && this.isVertical()) ||
                    ((e = e - parseInt(i.css("padding-left"), 10) - parseInt(i.css("padding-right"), 10)),
                    (t = t - parseInt(i.css("padding-top"), 10) - parseInt(i.css("padding-bottom"), 10)),
                    l.extend(this, { width: e, height: t, size: this.isHorizontal() ? e : t }));
        },
        updateSlides: function () {
            var e = this.params,
                i = this.$wrapperEl,
                s = this.size,
                a = this.rtlTranslate,
                r = this.wrongRTL,
                n = i.children("." + this.params.slideClass),
                o = this.virtual && e.virtual.enabled ? this.virtual.slides.length : n.length,
                h = [],
                p = [],
                c = [],
                u = e.slidesOffsetBefore;
            "function" == typeof u && (u = e.slidesOffsetBefore.call(this));
            var v = e.slidesOffsetAfter;
            "function" == typeof v && (v = e.slidesOffsetAfter.call(this));
            var f = o,
                m = this.snapGrid.length,
                g = this.snapGrid.length,
                b = e.spaceBetween,
                w = -u,
                y = 0,
                x = 0;
            if (void 0 !== s) {
                var E, T;
                "string" == typeof b && b.indexOf("%") >= 0 && (b = (parseFloat(b.replace("%", "")) / 100) * s),
                    (this.virtualSize = -b),
                    a ? n.css({ marginLeft: "", marginTop: "" }) : n.css({ marginRight: "", marginBottom: "" }),
                    e.slidesPerColumn > 1 &&
                        ((E = Math.floor(o / e.slidesPerColumn) === o / this.params.slidesPerColumn ? o : Math.ceil(o / e.slidesPerColumn) * e.slidesPerColumn),
                        "auto" !== e.slidesPerView && "row" === e.slidesPerColumnFill && (E = Math.max(E, e.slidesPerView * e.slidesPerColumn)));
                for (var S, C = e.slidesPerColumn, M = E / C, z = M - (e.slidesPerColumn * M - o), P = 0; P < o; P += 1) {
                    T = 0;
                    var k = n.eq(P);
                    if (e.slidesPerColumn > 1) {
                        var $ = void 0,
                            L = void 0,
                            I = void 0;
                        "column" === e.slidesPerColumnFill
                            ? ((I = P - (L = Math.floor(P / C)) * C),
                              (L > z || (L === z && I === C - 1)) && (I += 1) >= C && ((I = 0), (L += 1)),
                              ($ = L + (I * E) / C),
                              k.css({ "-webkit-box-ordinal-group": $, "-moz-box-ordinal-group": $, "-ms-flex-order": $, "-webkit-order": $, order: $ }))
                            : (L = P - (I = Math.floor(P / M)) * M),
                            k
                                .css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== I && e.spaceBetween && e.spaceBetween + "px")
                                .attr("data-swiper-column", L)
                                .attr("data-swiper-row", I);
                    }
                    if ("none" !== k.css("display")) {
                        if ("auto" === e.slidesPerView) {
                            var D = t.getComputedStyle(k[0], null);
                            (T = this.isHorizontal()
                                ? k[0].getBoundingClientRect().width + parseFloat(D.getPropertyValue("margin-left")) + parseFloat(D.getPropertyValue("margin-right"))
                                : k[0].getBoundingClientRect().height + parseFloat(D.getPropertyValue("margin-top")) + parseFloat(D.getPropertyValue("margin-bottom"))),
                                e.roundLengths && (T = Math.floor(T));
                        } else (T = (s - (e.slidesPerView - 1) * b) / e.slidesPerView), e.roundLengths && (T = Math.floor(T)), n[P] && (this.isHorizontal() ? (n[P].style.width = T + "px") : (n[P].style.height = T + "px"));
                        n[P] && (n[P].swiperSlideSize = T),
                            c.push(T),
                            e.centeredSlides
                                ? ((w = w + T / 2 + y / 2 + b), 0 === y && 0 !== P && (w = w - s / 2 - b), 0 === P && (w = w - s / 2 - b), Math.abs(w) < 0.001 && (w = 0), x % e.slidesPerGroup == 0 && h.push(w), p.push(w))
                                : (x % e.slidesPerGroup == 0 && h.push(w), p.push(w), (w = w + T + b)),
                            (this.virtualSize += T + b),
                            (y = T),
                            (x += 1);
                    }
                }
                if (
                    ((this.virtualSize = Math.max(this.virtualSize, s) + v),
                    a && r && ("slide" === e.effect || "coverflow" === e.effect) && i.css({ width: this.virtualSize + e.spaceBetween + "px" }),
                    (d.flexbox && !e.setWrapperSize) || (this.isHorizontal() ? i.css({ width: this.virtualSize + e.spaceBetween + "px" }) : i.css({ height: this.virtualSize + e.spaceBetween + "px" })),
                    e.slidesPerColumn > 1 &&
                        ((this.virtualSize = (T + e.spaceBetween) * E),
                        (this.virtualSize = Math.ceil(this.virtualSize / e.slidesPerColumn) - e.spaceBetween),
                        this.isHorizontal() ? i.css({ width: this.virtualSize + e.spaceBetween + "px" }) : i.css({ height: this.virtualSize + e.spaceBetween + "px" }),
                        e.centeredSlides))
                ) {
                    S = [];
                    for (var O = 0; O < h.length; O += 1) h[O] < this.virtualSize + h[0] && S.push(h[O]);
                    h = S;
                }
                if (!e.centeredSlides) {
                    S = [];
                    for (var A = 0; A < h.length; A += 1) h[A] <= this.virtualSize - s && S.push(h[A]);
                    (h = S), Math.floor(this.virtualSize - s) - Math.floor(h[h.length - 1]) > 1 && h.push(this.virtualSize - s);
                }
                0 === h.length && (h = [0]),
                    0 !== e.spaceBetween && (this.isHorizontal() ? (a ? n.css({ marginLeft: b + "px" }) : n.css({ marginRight: b + "px" })) : n.css({ marginBottom: b + "px" })),
                    l.extend(this, { slides: n, snapGrid: h, slidesGrid: p, slidesSizesGrid: c }),
                    o !== f && this.emit("slidesLengthChange"),
                    h.length !== m && (this.params.watchOverflow && this.checkOverflow(), this.emit("snapGridLengthChange")),
                    p.length !== g && this.emit("slidesGridLengthChange"),
                    (e.watchSlidesProgress || e.watchSlidesVisibility) && this.updateSlidesOffset();
            }
        },
        updateAutoHeight: function (e) {
            var t,
                i = [],
                s = 0;
            if (("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed), "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1))
                for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                    var a = this.activeIndex + t;
                    if (a > this.slides.length) break;
                    i.push(this.slides.eq(a)[0]);
                }
            else i.push(this.slides.eq(this.activeIndex)[0]);
            for (t = 0; t < i.length; t += 1)
                if (void 0 !== i[t]) {
                    var r = i[t].offsetHeight;
                    s = r > s ? r : s;
                }
            s && this.$wrapperEl.css("height", s + "px");
        },
        updateSlidesOffset: function () {
            for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop;
        },
        updateSlidesProgress: function (e) {
            void 0 === e && (e = this.translate || 0);
            var t = this.params,
                i = this.slides,
                s = this.rtlTranslate;
            if (0 !== i.length) {
                void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                var a = -e;
                s && (a = e), i.removeClass(t.slideVisibleClass);
                for (var r = 0; r < i.length; r += 1) {
                    var n = i[r],
                        o = (a + (t.centeredSlides ? this.minTranslate() : 0) - n.swiperSlideOffset) / (n.swiperSlideSize + t.spaceBetween);
                    if (t.watchSlidesVisibility) {
                        var l = -(a - n.swiperSlideOffset),
                            d = l + this.slidesSizesGrid[r];
                        ((l >= 0 && l < this.size) || (d > 0 && d <= this.size) || (l <= 0 && d >= this.size)) && i.eq(r).addClass(t.slideVisibleClass);
                    }
                    n.progress = s ? -o : o;
                }
            }
        },
        updateProgress: function (e) {
            void 0 === e && (e = this.translate || 0);
            var t = this.params,
                i = this.maxTranslate() - this.minTranslate(),
                s = this.progress,
                a = this.isBeginning,
                r = this.isEnd,
                n = a,
                o = r;
            0 === i ? ((s = 0), (a = !0), (r = !0)) : ((a = (s = (e - this.minTranslate()) / i) <= 0), (r = s >= 1)),
                l.extend(this, { progress: s, isBeginning: a, isEnd: r }),
                (t.watchSlidesProgress || t.watchSlidesVisibility) && this.updateSlidesProgress(e),
                a && !n && this.emit("reachBeginning toEdge"),
                r && !o && this.emit("reachEnd toEdge"),
                ((n && !a) || (o && !r)) && this.emit("fromEdge"),
                this.emit("progress", s);
        },
        updateSlidesClasses: function () {
            var e,
                t = this.slides,
                i = this.params,
                s = this.$wrapperEl,
                a = this.activeIndex,
                r = this.realIndex,
                n = this.virtual && i.virtual.enabled;
            t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass),
                (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass),
                i.loop &&
                    (e.hasClass(i.slideDuplicateClass)
                        ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass)
                        : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
            var o = e
                .nextAll("." + i.slideClass)
                .eq(0)
                .addClass(i.slideNextClass);
            i.loop && 0 === o.length && (o = t.eq(0)).addClass(i.slideNextClass);
            var l = e
                .prevAll("." + i.slideClass)
                .eq(0)
                .addClass(i.slidePrevClass);
            i.loop && 0 === l.length && (l = t.eq(-1)).addClass(i.slidePrevClass),
                i.loop &&
                    (o.hasClass(i.slideDuplicateClass)
                        ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass)
                        : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass),
                    l.hasClass(i.slideDuplicateClass)
                        ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)
                        : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass));
        },
        updateActiveIndex: function (e) {
            var t,
                i = this.rtlTranslate ? this.translate : -this.translate,
                s = this.slidesGrid,
                a = this.snapGrid,
                r = this.params,
                n = this.activeIndex,
                o = this.realIndex,
                d = this.snapIndex,
                h = e;
            if (void 0 === h) {
                for (var p = 0; p < s.length; p += 1) void 0 !== s[p + 1] ? (i >= s[p] && i < s[p + 1] - (s[p + 1] - s[p]) / 2 ? (h = p) : i >= s[p] && i < s[p + 1] && (h = p + 1)) : i >= s[p] && (h = p);
                r.normalizeSlideIndex && (h < 0 || void 0 === h) && (h = 0);
            }
            if (((t = a.indexOf(i) >= 0 ? a.indexOf(i) : Math.floor(h / r.slidesPerGroup)) >= a.length && (t = a.length - 1), h !== n)) {
                var c = parseInt(this.slides.eq(h).attr("data-swiper-slide-index") || h, 10);
                l.extend(this, { snapIndex: t, realIndex: c, previousIndex: n, activeIndex: h }), this.emit("activeIndexChange"), this.emit("snapIndexChange"), o !== c && this.emit("realIndexChange"), this.emit("slideChange");
            } else t !== d && ((this.snapIndex = t), this.emit("snapIndexChange"));
        },
        updateClickedSlide: function (e) {
            var t = this.params,
                i = s(e.target).closest("." + t.slideClass)[0],
                a = !1;
            if (i) for (var r = 0; r < this.slides.length; r += 1) this.slides[r] === i && (a = !0);
            if (!i || !a) return (this.clickedSlide = void 0), void (this.clickedIndex = void 0);
            (this.clickedSlide = i),
                this.virtual && this.params.virtual.enabled ? (this.clickedIndex = parseInt(s(i).attr("data-swiper-slide-index"), 10)) : (this.clickedIndex = s(i).index()),
                t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide();
        },
    };
    var u = {
        getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            var t = this.params,
                i = this.rtlTranslate,
                s = this.translate,
                a = this.$wrapperEl;
            if (t.virtualTranslate) return i ? -s : s;
            var r = l.getTranslate(a[0], e);
            return i && (r = -r), r || 0;
        },
        setTranslate: function (e, t) {
            var i = this.rtlTranslate,
                s = this.params,
                a = this.$wrapperEl,
                r = this.progress,
                n = 0,
                o = 0;
            this.isHorizontal() ? (n = i ? -e : e) : (o = e),
                s.roundLengths && ((n = Math.floor(n)), (o = Math.floor(o))),
                s.virtualTranslate || (d.transforms3d ? a.transform("translate3d(" + n + "px, " + o + "px, 0px)") : a.transform("translate(" + n + "px, " + o + "px)")),
                (this.translate = this.isHorizontal() ? n : o);
            var l = this.maxTranslate() - this.minTranslate();
            (0 === l ? 0 : (e - this.minTranslate()) / l) !== r && this.updateProgress(e), this.emit("setTranslate", this.translate, t);
        },
        minTranslate: function () {
            return -this.snapGrid[0];
        },
        maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1];
        },
    };
    var v = {
        setTransition: function (e, t) {
            this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
                s = this.params,
                a = this.previousIndex;
            s.autoHeight && this.updateAutoHeight();
            var r = t;
            if ((r || (r = i > a ? "next" : i < a ? "prev" : "reset"), this.emit("transitionStart"), e && i !== a)) {
                if ("reset" === r) return void this.emit("slideResetTransitionStart");
                this.emit("slideChangeTransitionStart"), "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart");
            }
        },
        transitionEnd: function (e, t) {
            void 0 === e && (e = !0);
            var i = this.activeIndex,
                s = this.previousIndex;
            (this.animating = !1), this.setTransition(0);
            var a = t;
            if ((a || (a = i > s ? "next" : i < s ? "prev" : "reset"), this.emit("transitionEnd"), e && i !== s)) {
                if ("reset" === a) return void this.emit("slideResetTransitionEnd");
                this.emit("slideChangeTransitionEnd"), "next" === a ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd");
            }
        },
    };
    var f = {
        slideTo: function (e, t, i, s) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = this,
                r = e;
            r < 0 && (r = 0);
            var n = a.params,
                o = a.snapGrid,
                l = a.slidesGrid,
                h = a.previousIndex,
                p = a.activeIndex,
                c = a.rtlTranslate,
                u = a.$wrapperEl;
            if (a.animating && n.preventIntercationOnTransition) return !1;
            var v = Math.floor(r / n.slidesPerGroup);
            v >= o.length && (v = o.length - 1), (p || n.initialSlide || 0) === (h || 0) && i && a.emit("beforeSlideChangeStart");
            var f,
                m = -o[v];
            if ((a.updateProgress(m), n.normalizeSlideIndex)) for (var g = 0; g < l.length; g += 1) -Math.floor(100 * m) >= Math.floor(100 * l[g]) && (r = g);
            if (a.initialized && r !== p) {
                if (!a.allowSlideNext && m < a.translate && m < a.minTranslate()) return !1;
                if (!a.allowSlidePrev && m > a.translate && m > a.maxTranslate() && (p || 0) !== r) return !1;
            }
            return (
                (f = r > p ? "next" : r < p ? "prev" : "reset"),
                (c && -m === a.translate) || (!c && m === a.translate)
                    ? (a.updateActiveIndex(r), n.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), "slide" !== n.effect && a.setTranslate(m), "reset" !== f && (a.transitionStart(i, f), a.transitionEnd(i, f)), !1)
                    : (0 !== t && d.transition
                          ? (a.setTransition(t),
                            a.setTranslate(m),
                            a.updateActiveIndex(r),
                            a.updateSlidesClasses(),
                            a.emit("beforeTransitionStart", t, s),
                            a.transitionStart(i, f),
                            a.animating ||
                                ((a.animating = !0),
                                u.transitionEnd(function () {
                                    a && !a.destroyed && a.transitionEnd(i, f);
                                })))
                          : (a.setTransition(0), a.setTranslate(m), a.updateActiveIndex(r), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, s), a.transitionStart(i, f), a.transitionEnd(i, f)),
                      !0)
            );
        },
        slideToLoop: function (e, t, i, s) {
            void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === i && (i = !0);
            var a = e;
            return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, i, s);
        },
        slideNext: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params,
                a = this.animating;
            return s.loop ? !a && (this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft), this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i)) : this.slideTo(this.activeIndex + s.slidesPerGroup, e, t, i);
        },
        slidePrev: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.params,
                a = this.animating;
            return s.loop ? !a && (this.loopFix(), (this._clientLeft = this.$wrapperEl[0].clientLeft), this.slideTo(this.activeIndex - 1, e, t, i)) : this.slideTo(this.activeIndex - 1, e, t, i);
        },
        slideReset: function (e, t, i) {
            return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, i);
        },
        slideToClosest: function (e, t, i) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            var s = this.activeIndex,
                a = Math.floor(s / this.params.slidesPerGroup);
            if (a < this.snapGrid.length - 1) {
                var r = this.rtlTranslate ? this.translate : -this.translate,
                    n = this.snapGrid[a];
                r - n > (this.snapGrid[a + 1] - n) / 2 && (s = this.params.slidesPerGroup);
            }
            return this.slideTo(s, e, t, i);
        },
        slideToClickedSlide: function () {
            var e,
                t = this,
                i = t.params,
                a = t.$wrapperEl,
                r = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView,
                n = t.clickedIndex;
            if (i.loop) {
                if (t.animating) return;
                (e = parseInt(s(t.clickedSlide).attr("data-swiper-slide-index"), 10)),
                    i.centeredSlides
                        ? n < t.loopedSlides - r / 2 || n > t.slides.length - t.loopedSlides + r / 2
                            ? (t.loopFix(),
                              (n = a
                                  .children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")")
                                  .eq(0)
                                  .index()),
                              l.nextTick(function () {
                                  t.slideTo(n);
                              }))
                            : t.slideTo(n)
                        : n > t.slides.length - r
                        ? (t.loopFix(),
                          (n = a
                              .children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")")
                              .eq(0)
                              .index()),
                          l.nextTick(function () {
                              t.slideTo(n);
                          }))
                        : t.slideTo(n);
            } else t.slideTo(n);
        },
    };
    var m = {
        loopCreate: function () {
            var t = this,
                i = t.params,
                a = t.$wrapperEl;
            a.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
            var r = a.children("." + i.slideClass);
            if (i.loopFillGroupWithBlank) {
                var n = i.slidesPerGroup - (r.length % i.slidesPerGroup);
                if (n !== i.slidesPerGroup) {
                    for (var o = 0; o < n; o += 1) {
                        var l = s(e.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                        a.append(l);
                    }
                    r = a.children("." + i.slideClass);
                }
            }
            "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length),
                (t.loopedSlides = parseInt(i.loopedSlides || i.slidesPerView, 10)),
                (t.loopedSlides += i.loopAdditionalSlides),
                t.loopedSlides > r.length && (t.loopedSlides = r.length);
            var d = [],
                h = [];
            r.each(function (e, i) {
                var a = s(i);
                e < t.loopedSlides && h.push(i), e < r.length && e >= r.length - t.loopedSlides && d.push(i), a.attr("data-swiper-slide-index", e);
            });
            for (var p = 0; p < h.length; p += 1) a.append(s(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
            for (var c = d.length - 1; c >= 0; c -= 1) a.prepend(s(d[c].cloneNode(!0)).addClass(i.slideDuplicateClass));
        },
        loopFix: function () {
            var e,
                t = this.params,
                i = this.activeIndex,
                s = this.slides,
                a = this.loopedSlides,
                r = this.allowSlidePrev,
                n = this.allowSlideNext,
                o = this.snapGrid,
                l = this.rtlTranslate;
            (this.allowSlidePrev = !0), (this.allowSlideNext = !0);
            var d = -o[i] - this.getTranslate();
            if (i < a) (e = s.length - 3 * a + i), (e += a), this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d);
            else if (("auto" === t.slidesPerView && i >= 2 * a) || i > s.length - 2 * t.slidesPerView) {
                (e = -s.length + i + a), (e += a), this.slideTo(e, 0, !1, !0) && 0 !== d && this.setTranslate((l ? -this.translate : this.translate) - d);
            }
            (this.allowSlidePrev = r), (this.allowSlideNext = n);
        },
        loopDestroy: function () {
            var e = this.$wrapperEl,
                t = this.params,
                i = this.slides;
            e.children("." + t.slideClass + "." + t.slideDuplicateClass).remove(), i.removeAttr("data-swiper-slide-index");
        },
    };
    var g = {
        setGrabCursor: function (e) {
            if (!d.touch && this.params.simulateTouch) {
                var t = this.el;
                (t.style.cursor = "move"), (t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab"), (t.style.cursor = e ? "-moz-grabbin" : "-moz-grab"), (t.style.cursor = e ? "grabbing" : "grab");
            }
        },
        unsetGrabCursor: function () {
            d.touch || (this.el.style.cursor = "");
        },
    };
    var b = {
            appendSlide: function (e) {
                var t = this.$wrapperEl,
                    i = this.params;
                if ((i.loop && this.loopDestroy(), "object" == typeof e && "length" in e)) for (var s = 0; s < e.length; s += 1) e[s] && t.append(e[s]);
                else t.append(e);
                i.loop && this.loopCreate(), (i.observer && d.observer) || this.update();
            },
            prependSlide: function (e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && this.loopDestroy();
                var a = s + 1;
                if ("object" == typeof e && "length" in e) {
                    for (var r = 0; r < e.length; r += 1) e[r] && i.prepend(e[r]);
                    a = s + e.length;
                } else i.prepend(e);
                t.loop && this.loopCreate(), (t.observer && d.observer) || this.update(), this.slideTo(a, 0, !1);
            },
            removeSlide: function (e) {
                var t = this.params,
                    i = this.$wrapperEl,
                    s = this.activeIndex;
                t.loop && (this.loopDestroy(), (this.slides = i.children("." + t.slideClass)));
                var a,
                    r = s;
                if ("object" == typeof e && "length" in e) {
                    for (var n = 0; n < e.length; n += 1) (a = e[n]), this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1);
                    r = Math.max(r, 0);
                } else (a = e), this.slides[a] && this.slides.eq(a).remove(), a < r && (r -= 1), (r = Math.max(r, 0));
                t.loop && this.loopCreate(), (t.observer && d.observer) || this.update(), t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1);
            },
            removeAllSlides: function () {
                for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
                this.removeSlide(e);
            },
        },
        w = (function () {
            var i = t.navigator.userAgent,
                s = { ios: !1, android: !1, androidChrome: !1, desktop: !1, windows: !1, iphone: !1, ipod: !1, ipad: !1, cordova: t.cordova || t.phonegap, phonegap: t.cordova || t.phonegap },
                a = i.match(/(Windows Phone);?[\s\/]+([\d.]+)?/),
                r = i.match(/(Android);?[\s\/]+([\d.]+)?/),
                n = i.match(/(iPad).*OS\s([\d_]+)/),
                o = i.match(/(iPod)(.*OS\s([\d_]+))?/),
                l = !n && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            if (
                (a && ((s.os = "windows"), (s.osVersion = a[2]), (s.windows = !0)),
                r && !a && ((s.os = "android"), (s.osVersion = r[2]), (s.android = !0), (s.androidChrome = i.toLowerCase().indexOf("chrome") >= 0)),
                (n || l || o) && ((s.os = "ios"), (s.ios = !0)),
                l && !o && ((s.osVersion = l[2].replace(/_/g, ".")), (s.iphone = !0)),
                n && ((s.osVersion = n[2].replace(/_/g, ".")), (s.ipad = !0)),
                o && ((s.osVersion = o[3] ? o[3].replace(/_/g, ".") : null), (s.iphone = !0)),
                s.ios && s.osVersion && i.indexOf("Version/") >= 0 && "10" === s.osVersion.split(".")[0] && (s.osVersion = i.toLowerCase().split("version/")[1].split(" ")[0]),
                (s.desktop = !(s.os || s.android || s.webView)),
                (s.webView = (l || n || o) && i.match(/.*AppleWebKit(?!.*Safari)/i)),
                s.os && "ios" === s.os)
            ) {
                var d = s.osVersion.split("."),
                    h = e.querySelector('meta[name="viewport"]');
                s.minimalUi = !s.webView && (o || l) && (1 * d[0] == 7 ? 1 * d[1] >= 1 : 1 * d[0] > 7) && h && h.getAttribute("content").indexOf("minimal-ui") >= 0;
            }
            return (s.pixelRatio = t.devicePixelRatio || 1), s;
        })();
    function y(i) {
        var a = this.touchEventsData,
            r = this.params,
            n = this.touches;
        if (!this.animating || !r.preventIntercationOnTransition) {
            var o = i;
            if ((o.originalEvent && (o = o.originalEvent), (a.isTouchEvent = "touchstart" === o.type), (a.isTouchEvent || !("which" in o) || 3 !== o.which) && (!a.isTouched || !a.isMoved)))
                if (r.noSwiping && s(o.target).closest(r.noSwipingSelector ? r.noSwipingSelector : "." + r.noSwipingClass)[0]) this.allowClick = !0;
                else if (!r.swipeHandler || s(o).closest(r.swipeHandler)[0]) {
                    (n.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX), (n.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
                    var d = n.currentX,
                        h = n.currentY;
                    if (!(w.ios && !w.cordova && r.iOSEdgeSwipeDetection && d <= r.iOSEdgeSwipeThreshold && d >= t.screen.width - r.iOSEdgeSwipeThreshold)) {
                        if (
                            (l.extend(a, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }),
                            (n.startX = d),
                            (n.startY = h),
                            (a.touchStartTime = l.now()),
                            (this.allowClick = !0),
                            this.updateSize(),
                            (this.swipeDirection = void 0),
                            r.threshold > 0 && (a.allowThresholdMove = !1),
                            "touchstart" !== o.type)
                        ) {
                            var p = !0;
                            s(o.target).is(a.formElements) && (p = !1), e.activeElement && s(e.activeElement).is(a.formElements) && e.activeElement !== o.target && e.activeElement.blur(), p && this.allowTouchMove && o.preventDefault();
                        }
                        this.emit("touchStart", o);
                    }
                }
        }
    }
    function x(t) {
        var i = this.touchEventsData,
            a = this.params,
            r = this.touches,
            n = this.rtlTranslate,
            o = t;
        if ((o.originalEvent && (o = o.originalEvent), i.isTouched)) {
            if (!i.isTouchEvent || "mousemove" !== o.type) {
                var d = "touchmove" === o.type ? o.targetTouches[0].pageX : o.pageX,
                    h = "touchmove" === o.type ? o.targetTouches[0].pageY : o.pageY;
                if (o.preventedByNestedSwiper) return (r.startX = d), void (r.startY = h);
                if (!this.allowTouchMove) return (this.allowClick = !1), void (i.isTouched && (l.extend(r, { startX: d, startY: h, currentX: d, currentY: h }), (i.touchStartTime = l.now())));
                if (i.isTouchEvent && a.touchReleaseOnEdges && !a.loop)
                    if (this.isVertical()) {
                        if ((h < r.startY && this.translate <= this.maxTranslate()) || (h > r.startY && this.translate >= this.minTranslate())) return (i.isTouched = !1), void (i.isMoved = !1);
                    } else if ((d < r.startX && this.translate <= this.maxTranslate()) || (d > r.startX && this.translate >= this.minTranslate())) return;
                if (i.isTouchEvent && e.activeElement && o.target === e.activeElement && s(o.target).is(i.formElements)) return (i.isMoved = !0), void (this.allowClick = !1);
                if ((i.allowTouchCallbacks && this.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1))) {
                    (r.currentX = d), (r.currentY = h);
                    var p,
                        c = r.currentX - r.startX,
                        u = r.currentY - r.startY;
                    if (void 0 === i.isScrolling)
                        (this.isHorizontal() && r.currentY === r.startY) || (this.isVertical() && r.currentX === r.startX)
                            ? (i.isScrolling = !1)
                            : c * c + u * u >= 25 && ((p = (180 * Math.atan2(Math.abs(u), Math.abs(c))) / Math.PI), (i.isScrolling = this.isHorizontal() ? p > a.touchAngle : 90 - p > a.touchAngle));
                    if ((i.isScrolling && this.emit("touchMoveOpposite", o), "undefined" == typeof startMoving && ((r.currentX === r.startX && r.currentY === r.startY) || (i.startMoving = !0)), i.isScrolling)) i.isTouched = !1;
                    else if (i.startMoving) {
                        (this.allowClick = !1),
                            o.preventDefault(),
                            a.touchMoveStopPropagation && !a.nested && o.stopPropagation(),
                            i.isMoved ||
                                (a.loop && this.loopFix(),
                                (i.startTranslate = this.getTranslate()),
                                this.setTransition(0),
                                this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                                (i.allowMomentumBounce = !1),
                                !a.grabCursor || (!0 !== this.allowSlideNext && !0 !== this.allowSlidePrev) || this.setGrabCursor(!0),
                                this.emit("sliderFirstMove", o)),
                            this.emit("sliderMove", o),
                            (i.isMoved = !0);
                        var v = this.isHorizontal() ? c : u;
                        (r.diff = v), (v *= a.touchRatio), n && (v = -v), (this.swipeDirection = v > 0 ? "prev" : "next"), (i.currentTranslate = v + i.startTranslate);
                        var f = !0,
                            m = a.resistanceRatio;
                        if (
                            (a.touchReleaseOnEdges && (m = 0),
                            v > 0 && i.currentTranslate > this.minTranslate()
                                ? ((f = !1), a.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + v, m)))
                                : v < 0 && i.currentTranslate < this.maxTranslate() && ((f = !1), a.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - v, m))),
                            f && (o.preventedByNestedSwiper = !0),
                            !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
                            !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
                            a.threshold > 0)
                        ) {
                            if (!(Math.abs(v) > a.threshold || i.allowThresholdMove)) return void (i.currentTranslate = i.startTranslate);
                            if (!i.allowThresholdMove)
                                return (
                                    (i.allowThresholdMove = !0), (r.startX = r.currentX), (r.startY = r.currentY), (i.currentTranslate = i.startTranslate), void (r.diff = this.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
                                );
                        }
                        a.followFinger &&
                            ((a.freeMode || a.watchSlidesProgress || a.watchSlidesVisibility) && (this.updateActiveIndex(), this.updateSlidesClasses()),
                            a.freeMode &&
                                (0 === i.velocities.length && i.velocities.push({ position: r[this.isHorizontal() ? "startX" : "startY"], time: i.touchStartTime }),
                                i.velocities.push({ position: r[this.isHorizontal() ? "currentX" : "currentY"], time: l.now() })),
                            this.updateProgress(i.currentTranslate),
                            this.setTranslate(i.currentTranslate));
                    }
                }
            }
        } else i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", o);
    }
    function E(e) {
        var t = this,
            i = t.touchEventsData,
            s = t.params,
            a = t.touches,
            r = t.rtlTranslate,
            n = t.$wrapperEl,
            o = t.slidesGrid,
            d = t.snapGrid,
            h = e;
        if ((h.originalEvent && (h = h.originalEvent), i.allowTouchCallbacks && t.emit("touchEnd", h), (i.allowTouchCallbacks = !1), !i.isTouched))
            return i.isMoved && s.grabCursor && t.setGrabCursor(!1), (i.isMoved = !1), void (i.startMoving = !1);
        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        var p,
            c = l.now(),
            u = c - i.touchStartTime;
        if (
            (t.allowClick &&
                (t.updateClickedSlide(h),
                t.emit("tap", h),
                u < 300 &&
                    c - i.lastClickTime > 300 &&
                    (i.clickTimeout && clearTimeout(i.clickTimeout),
                    (i.clickTimeout = l.nextTick(function () {
                        t && !t.destroyed && t.emit("click", h);
                    }, 300))),
                u < 300 && c - i.lastClickTime < 300 && (i.clickTimeout && clearTimeout(i.clickTimeout), t.emit("doubleTap", h))),
            (i.lastClickTime = l.now()),
            l.nextTick(function () {
                t.destroyed || (t.allowClick = !0);
            }),
            !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate)
        )
            return (i.isTouched = !1), (i.isMoved = !1), void (i.startMoving = !1);
        if (((i.isTouched = !1), (i.isMoved = !1), (i.startMoving = !1), (p = s.followFinger ? (r ? t.translate : -t.translate) : -i.currentTranslate), s.freeMode)) {
            if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (p > -t.maxTranslate()) return void (t.slides.length < d.length ? t.slideTo(d.length - 1) : t.slideTo(t.slides.length - 1));
            if (s.freeModeMomentum) {
                if (i.velocities.length > 1) {
                    var v = i.velocities.pop(),
                        f = i.velocities.pop(),
                        m = v.position - f.position,
                        g = v.time - f.time;
                    (t.velocity = m / g), (t.velocity /= 2), Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0), (g > 150 || l.now() - v.time > 300) && (t.velocity = 0);
                } else t.velocity = 0;
                (t.velocity *= s.freeModeMomentumVelocityRatio), (i.velocities.length = 0);
                var b = 1e3 * s.freeModeMomentumRatio,
                    w = t.velocity * b,
                    y = t.translate + w;
                r && (y = -y);
                var x,
                    E = !1,
                    T = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                if (y < t.maxTranslate()) s.freeModeMomentumBounce ? (y + t.maxTranslate() < -T && (y = t.maxTranslate() - T), (x = t.maxTranslate()), (E = !0), (i.allowMomentumBounce = !0)) : (y = t.maxTranslate());
                else if (y > t.minTranslate()) s.freeModeMomentumBounce ? (y - t.minTranslate() > T && (y = t.minTranslate() + T), (x = t.minTranslate()), (E = !0), (i.allowMomentumBounce = !0)) : (y = t.minTranslate());
                else if (s.freeModeSticky) {
                    for (var S, C = 0; C < d.length; C += 1)
                        if (d[C] > -y) {
                            S = C;
                            break;
                        }
                    y = -(y = Math.abs(d[S] - y) < Math.abs(d[S - 1] - y) || "next" === t.swipeDirection ? d[S] : d[S - 1]);
                }
                if (0 !== t.velocity) b = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity);
                else if (s.freeModeSticky) return void t.slideToClosest();
                s.freeModeMomentumBounce && E
                    ? (t.updateProgress(x),
                      t.setTransition(b),
                      t.setTranslate(y),
                      t.transitionStart(!0, t.swipeDirection),
                      (t.animating = !0),
                      n.transitionEnd(function () {
                          t &&
                              !t.destroyed &&
                              i.allowMomentumBounce &&
                              (t.emit("momentumBounce"),
                              t.setTransition(s.speed),
                              t.setTranslate(x),
                              n.transitionEnd(function () {
                                  t && !t.destroyed && t.transitionEnd();
                              }));
                      }))
                    : t.velocity
                    ? (t.updateProgress(y),
                      t.setTransition(b),
                      t.setTranslate(y),
                      t.transitionStart(!0, t.swipeDirection),
                      t.animating ||
                          ((t.animating = !0),
                          n.transitionEnd(function () {
                              t && !t.destroyed && t.transitionEnd();
                          })))
                    : t.updateProgress(y),
                    t.updateActiveIndex(),
                    t.updateSlidesClasses();
            } else if (s.freeModeSticky) return void t.slideToClosest();
            (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses());
        } else {
            for (var M = 0, z = t.slidesSizesGrid[0], P = 0; P < o.length; P += s.slidesPerGroup)
                void 0 !== o[P + s.slidesPerGroup] ? p >= o[P] && p < o[P + s.slidesPerGroup] && ((M = P), (z = o[P + s.slidesPerGroup] - o[P])) : p >= o[P] && ((M = P), (z = o[o.length - 1] - o[o.length - 2]));
            var k = (p - o[M]) / z;
            if (u > s.longSwipesMs) {
                if (!s.longSwipes) return void t.slideTo(t.activeIndex);
                "next" === t.swipeDirection && (k >= s.longSwipesRatio ? t.slideTo(M + s.slidesPerGroup) : t.slideTo(M)), "prev" === t.swipeDirection && (k > 1 - s.longSwipesRatio ? t.slideTo(M + s.slidesPerGroup) : t.slideTo(M));
            } else {
                if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
                "next" === t.swipeDirection && t.slideTo(M + s.slidesPerGroup), "prev" === t.swipeDirection && t.slideTo(M);
            }
        }
    }
    function T() {
        var e = this.params,
            t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext,
                s = this.allowSlidePrev;
            if (((this.allowSlideNext = !0), (this.allowSlidePrev = !0), this.updateSize(), this.updateSlides(), e.freeMode)) {
                var a = Math.min(Math.max(this.translate, this.maxTranslate()), this.minTranslate());
                this.setTranslate(a), this.updateActiveIndex(), this.updateSlidesClasses(), e.autoHeight && this.updateAutoHeight();
            } else this.updateSlidesClasses(), ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0);
            (this.allowSlidePrev = s), (this.allowSlideNext = i);
        }
    }
    function S(e) {
        this.allowClick || (this.params.preventClicks && e.preventDefault(), this.params.preventClicksPropagation && this.animating && (e.stopPropagation(), e.stopImmediatePropagation()));
    }
    var C = {
        attachEvents: function () {
            var t = this.params,
                i = this.touchEvents,
                s = this.el,
                a = this.wrapperEl;
            (this.onTouchStart = y.bind(this)), (this.onTouchMove = x.bind(this)), (this.onTouchEnd = E.bind(this)), (this.onClick = S.bind(this));
            var r = "container" === t.touchEventsTarget ? s : a,
                n = !!t.nested;
            if (d.touch || (!d.pointerEvents && !d.prefixedPointerEvents)) {
                if (d.touch) {
                    var o = !("touchstart" !== i.start || !d.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                    r.addEventListener(i.start, this.onTouchStart, o), r.addEventListener(i.move, this.onTouchMove, d.passiveListener ? { passive: !1, capture: n } : n), r.addEventListener(i.end, this.onTouchEnd, o);
                }
                ((t.simulateTouch && !w.ios && !w.android) || (t.simulateTouch && !d.touch && w.ios)) &&
                    (r.addEventListener("mousedown", this.onTouchStart, !1), e.addEventListener("mousemove", this.onTouchMove, n), e.addEventListener("mouseup", this.onTouchEnd, !1));
            } else r.addEventListener(i.start, this.onTouchStart, !1), e.addEventListener(i.move, this.onTouchMove, n), e.addEventListener(i.end, this.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && r.addEventListener("click", this.onClick, !0), this.on("resize observerUpdate", T, !0);
        },
        detachEvents: function () {
            var t = this.params,
                i = this.touchEvents,
                s = this.el,
                a = this.wrapperEl,
                r = "container" === t.touchEventsTarget ? s : a,
                n = !!t.nested;
            if (d.touch || (!d.pointerEvents && !d.prefixedPointerEvents)) {
                if (d.touch) {
                    var o = !("onTouchStart" !== i.start || !d.passiveListener || !t.passiveListeners) && { passive: !0, capture: !1 };
                    r.removeEventListener(i.start, this.onTouchStart, o), r.removeEventListener(i.move, this.onTouchMove, n), r.removeEventListener(i.end, this.onTouchEnd, o);
                }
                ((t.simulateTouch && !w.ios && !w.android) || (t.simulateTouch && !d.touch && w.ios)) &&
                    (r.removeEventListener("mousedown", this.onTouchStart, !1), e.removeEventListener("mousemove", this.onTouchMove, n), e.removeEventListener("mouseup", this.onTouchEnd, !1));
            } else r.removeEventListener(i.start, this.onTouchStart, !1), e.removeEventListener(i.move, this.onTouchMove, n), e.removeEventListener(i.end, this.onTouchEnd, !1);
            (t.preventClicks || t.preventClicksPropagation) && r.removeEventListener("click", this.onClick, !0), this.off("resize observerUpdate", T);
        },
    };
    var M,
        z = {
            setBreakpoint: function () {
                var e = this.activeIndex,
                    t = this.loopedSlides;
                void 0 === t && (t = 0);
                var i = this.params,
                    s = i.breakpoints;
                if (s && (!s || 0 !== Object.keys(s).length)) {
                    var a = this.getBreakpoint(s);
                    if (a && this.currentBreakpoint !== a) {
                        var r = a in s ? s[a] : this.originalParams,
                            n = i.loop && r.slidesPerView !== i.slidesPerView;
                        l.extend(this.params, r),
                            l.extend(this, { allowTouchMove: this.params.allowTouchMove, allowSlideNext: this.params.allowSlideNext, allowSlidePrev: this.params.allowSlidePrev }),
                            (this.currentBreakpoint = a),
                            n && (this.loopDestroy(), this.loopCreate(), this.updateSlides(), this.slideTo(e - t + this.loopedSlides, 0, !1)),
                            this.emit("breakpoint", r);
                    }
                }
            },
            getBreakpoint: function (e) {
                if (e) {
                    var i = !1,
                        s = [];
                    Object.keys(e).forEach(function (e) {
                        s.push(e);
                    }),
                        s.sort(function (e, t) {
                            return parseInt(e, 10) - parseInt(t, 10);
                        });
                    for (var a = 0; a < s.length; a += 1) {
                        var r = s[a];
                        r >= t.innerWidth && !i && (i = r);
                    }
                    return i || "max";
                }
            },
        },
        P = {
            isIE: !!t.navigator.userAgent.match(/Trident/g) || !!t.navigator.userAgent.match(/MSIE/g),
            isSafari: ((M = t.navigator.userAgent.toLowerCase()), M.indexOf("safari") >= 0 && M.indexOf("chrome") < 0 && M.indexOf("android") < 0),
            isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent),
        };
    var k = {
            init: !0,
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            preventIntercationOnTransition: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: 0.02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            normalizeSlideIndex: !0,
            watchOverflow: !1,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: !0,
            allowTouchMove: !0,
            threshold: 0,
            touchMoveStopPropagation: !0,
            touchReleaseOnEdges: !1,
            uniqueNavElements: !0,
            resistance: !0,
            resistanceRatio: 0.85,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            loopFillGroupWithBlank: !1,
            allowSlidePrev: !0,
            allowSlideNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            noSwipingSelector: null,
            passiveListeners: !0,
            containerModifierClass: "swiper-container-",
            slideClass: "swiper-slide",
            slideBlankClass: "swiper-slide-invisible-blank",
            slideActiveClass: "swiper-slide-active",
            slideDuplicateActiveClass: "swiper-slide-duplicate-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slideDuplicateNextClass: "swiper-slide-duplicate-next",
            slidePrevClass: "swiper-slide-prev",
            slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
            wrapperClass: "swiper-wrapper",
            runCallbacksOnInit: !0,
        },
        $ = {
            update: c,
            translate: u,
            transition: v,
            slide: f,
            loop: m,
            grabCursor: g,
            manipulation: b,
            events: C,
            breakpoints: z,
            checkOverflow: {
                checkOverflow: function () {
                    var e = this.isLocked;
                    (this.isLocked = 1 === this.snapGrid.length), (this.allowTouchMove = !this.isLocked), e && e !== this.isLocked && ((this.isEnd = !1), this.navigation.update());
                },
            },
            classes: {
                addClasses: function () {
                    var e = this.classNames,
                        t = this.params,
                        i = this.rtl,
                        s = this.$el,
                        a = [];
                    a.push(t.direction),
                        t.freeMode && a.push("free-mode"),
                        d.flexbox || a.push("no-flexbox"),
                        t.autoHeight && a.push("autoheight"),
                        i && a.push("rtl"),
                        t.slidesPerColumn > 1 && a.push("multirow"),
                        w.android && a.push("android"),
                        w.ios && a.push("ios"),
                        P.isIE && (d.pointerEvents || d.prefixedPointerEvents) && a.push("wp8-" + t.direction),
                        a.forEach(function (i) {
                            e.push(t.containerModifierClass + i);
                        }),
                        s.addClass(e.join(" "));
                },
                removeClasses: function () {
                    var e = this.$el,
                        t = this.classNames;
                    e.removeClass(t.join(" "));
                },
            },
            images: {
                loadImage: function (e, i, s, a, r, n) {
                    var o;
                    function l() {
                        n && n();
                    }
                    e.complete && r ? l() : i ? (((o = new t.Image()).onload = l), (o.onerror = l), a && (o.sizes = a), s && (o.srcset = s), i && (o.src = i)) : l();
                },
                preloadImages: function () {
                    var e = this;
                    function t() {
                        null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")));
                    }
                    e.imagesToLoad = e.$el.find("img");
                    for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                        var s = e.imagesToLoad[i];
                        e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t);
                    }
                },
            },
        },
        L = {},
        I = (function (e) {
            function t() {
                for (var i, a, r, n = [], o = arguments.length; o--; ) n[o] = arguments[o];
                1 === n.length && n[0].constructor && n[0].constructor === Object ? (r = n[0]) : ((a = (i = n)[0]), (r = i[1])),
                    r || (r = {}),
                    (r = l.extend({}, r)),
                    a && !r.el && (r.el = a),
                    e.call(this, r),
                    Object.keys($).forEach(function (e) {
                        Object.keys($[e]).forEach(function (i) {
                            t.prototype[i] || (t.prototype[i] = $[e][i]);
                        });
                    });
                var h = this;
                void 0 === h.modules && (h.modules = {}),
                    Object.keys(h.modules).forEach(function (e) {
                        var t = h.modules[e];
                        if (t.params) {
                            var i = Object.keys(t.params)[0],
                                s = t.params[i];
                            if ("object" != typeof s) return;
                            if (!(i in r) || !("enabled" in s)) return;
                            !0 === r[i] && (r[i] = { enabled: !0 }), "object" != typeof r[i] || "enabled" in r[i] || (r[i].enabled = !0), r[i] || (r[i] = { enabled: !1 });
                        }
                    });
                var p = l.extend({}, k);
                h.useModulesParams(p), (h.params = l.extend({}, p, L, r)), (h.originalParams = l.extend({}, h.params)), (h.passedParams = l.extend({}, r)), (h.$ = s);
                var c = s(h.params.el);
                if ((a = c[0])) {
                    if (c.length > 1) {
                        var u = [];
                        return (
                            c.each(function (e, i) {
                                var s = l.extend({}, r, { el: i });
                                u.push(new t(s));
                            }),
                            u
                        );
                    }
                    (a.swiper = h), c.data("swiper", h);
                    var v,
                        f,
                        m = c.children("." + h.params.wrapperClass);
                    return (
                        l.extend(h, {
                            $el: c,
                            el: a,
                            $wrapperEl: m,
                            wrapperEl: m[0],
                            classNames: [],
                            slides: s(),
                            slidesGrid: [],
                            snapGrid: [],
                            slidesSizesGrid: [],
                            isHorizontal: function () {
                                return "horizontal" === h.params.direction;
                            },
                            isVertical: function () {
                                return "vertical" === h.params.direction;
                            },
                            rtl: "rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction"),
                            rtlTranslate: "horizontal" === h.params.direction && ("rtl" === a.dir.toLowerCase() || "rtl" === c.css("direction")),
                            wrongRTL: "-webkit-box" === m.css("display"),
                            activeIndex: 0,
                            realIndex: 0,
                            isBeginning: !0,
                            isEnd: !1,
                            translate: 0,
                            progress: 0,
                            velocity: 0,
                            animating: !1,
                            allowSlideNext: h.params.allowSlideNext,
                            allowSlidePrev: h.params.allowSlidePrev,
                            touchEvents:
                                ((v = ["touchstart", "touchmove", "touchend"]),
                                (f = ["mousedown", "mousemove", "mouseup"]),
                                d.pointerEvents ? (f = ["pointerdown", "pointermove", "pointerup"]) : d.prefixedPointerEvents && (f = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
                                (h.touchEventsTouch = { start: v[0], move: v[1], end: v[2] }),
                                (h.touchEventsDesktop = { start: f[0], move: f[1], end: f[2] }),
                                d.touch || !h.params.simulateTouch ? h.touchEventsTouch : h.touchEventsDesktop),
                            touchEventsData: {
                                isTouched: void 0,
                                isMoved: void 0,
                                allowTouchCallbacks: void 0,
                                touchStartTime: void 0,
                                isScrolling: void 0,
                                currentTranslate: void 0,
                                startTranslate: void 0,
                                allowThresholdMove: void 0,
                                formElements: "input, select, option, textarea, button, video",
                                lastClickTime: l.now(),
                                clickTimeout: void 0,
                                velocities: [],
                                allowMomentumBounce: void 0,
                                isTouchEvent: void 0,
                                startMoving: void 0,
                            },
                            allowClick: !0,
                            allowTouchMove: h.params.allowTouchMove,
                            touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
                            imagesToLoad: [],
                            imagesLoaded: 0,
                        }),
                        h.useModules(),
                        h.params.init && h.init(),
                        h
                    );
                }
            }
            e && (t.__proto__ = e), (t.prototype = Object.create(e && e.prototype)), (t.prototype.constructor = t);
            var i = { extendedDefaults: { configurable: !0 }, defaults: { configurable: !0 }, Class: { configurable: !0 }, $: { configurable: !0 } };
            return (
                (t.prototype.slidesPerViewDynamic = function () {
                    var e = this.params,
                        t = this.slides,
                        i = this.slidesGrid,
                        s = this.size,
                        a = this.activeIndex,
                        r = 1;
                    if (e.centeredSlides) {
                        for (var n, o = t[a].swiperSlideSize, l = a + 1; l < t.length; l += 1) t[l] && !n && ((r += 1), (o += t[l].swiperSlideSize) > s && (n = !0));
                        for (var d = a - 1; d >= 0; d -= 1) t[d] && !n && ((r += 1), (o += t[d].swiperSlideSize) > s && (n = !0));
                    } else for (var h = a + 1; h < t.length; h += 1) i[h] - i[a] < s && (r += 1);
                    return r;
                }),
                (t.prototype.update = function () {
                    var e = this;
                    e &&
                        !e.destroyed &&
                        (e.updateSize(),
                        e.updateSlides(),
                        e.updateProgress(),
                        e.updateSlidesClasses(),
                        e.params.freeMode
                            ? (t(), e.params.autoHeight && e.updateAutoHeight())
                            : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || t(),
                        e.emit("update"));
                    function t() {
                        var t = e.rtlTranslate ? -1 * e.translate : e.translate,
                            i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                        e.setTranslate(i), e.updateActiveIndex(), e.updateSlidesClasses();
                    }
                }),
                (t.prototype.init = function () {
                    this.initialized ||
                        (this.emit("beforeInit"),
                        this.params.breakpoints && this.setBreakpoint(),
                        this.addClasses(),
                        this.params.loop && this.loopCreate(),
                        this.updateSize(),
                        this.updateSlides(),
                        this.params.watchOverflow && this.checkOverflow(),
                        this.params.grabCursor && this.setGrabCursor(),
                        this.params.preloadImages && this.preloadImages(),
                        this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit),
                        this.attachEvents(),
                        (this.initialized = !0),
                        this.emit("init"));
                }),
                (t.prototype.destroy = function (e, t) {
                    void 0 === e && (e = !0), void 0 === t && (t = !0);
                    var i = this,
                        s = i.params,
                        a = i.$el,
                        r = i.$wrapperEl,
                        n = i.slides;
                    i.emit("beforeDestroy"),
                        (i.initialized = !1),
                        i.detachEvents(),
                        s.loop && i.loopDestroy(),
                        t &&
                            (i.removeClasses(),
                            a.removeAttr("style"),
                            r.removeAttr("style"),
                            n &&
                                n.length &&
                                n
                                    .removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" "))
                                    .removeAttr("style")
                                    .removeAttr("data-swiper-slide-index")
                                    .removeAttr("data-swiper-column")
                                    .removeAttr("data-swiper-row")),
                        i.emit("destroy"),
                        Object.keys(i.eventsListeners).forEach(function (e) {
                            i.off(e);
                        }),
                        !1 !== e && ((i.$el[0].swiper = null), i.$el.data("swiper", null), l.deleteProps(i)),
                        (i.destroyed = !0);
                }),
                (t.extendDefaults = function (e) {
                    l.extend(L, e);
                }),
                (i.extendedDefaults.get = function () {
                    return L;
                }),
                (i.defaults.get = function () {
                    return k;
                }),
                (i.Class.get = function () {
                    return e;
                }),
                (i.$.get = function () {
                    return s;
                }),
                Object.defineProperties(t, i),
                t
            );
        })(h),
        D = { name: "device", proto: { device: w }, static: { device: w } },
        O = { name: "support", proto: { support: d }, static: { support: d } },
        A = { name: "browser", proto: { browser: P }, static: { browser: P } },
        H = {
            name: "resize",
            create: function () {
                var e = this;
                l.extend(e, {
                    resize: {
                        resizeHandler: function () {
                            e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"));
                        },
                        orientationChangeHandler: function () {
                            e && !e.destroyed && e.initialized && e.emit("orientationchange");
                        },
                    },
                });
            },
            on: {
                init: function () {
                    t.addEventListener("resize", this.resize.resizeHandler), t.addEventListener("orientationchange", this.resize.orientationChangeHandler);
                },
                destroy: function () {
                    t.removeEventListener("resize", this.resize.resizeHandler), t.removeEventListener("orientationchange", this.resize.orientationChangeHandler);
                },
            },
        },
        N = {
            func: t.MutationObserver || t.WebkitMutationObserver,
            attach: function (e, t) {
                void 0 === t && (t = {});
                var i = this,
                    s = new (0, N.func)(function (e) {
                        e.forEach(function (e) {
                            i.emit("observerUpdate", e);
                        });
                    });
                s.observe(e, { attributes: void 0 === t.attributes || t.attributes, childList: void 0 === t.childList || t.childList, characterData: void 0 === t.characterData || t.characterData }), i.observer.observers.push(s);
            },
            init: function () {
                if (d.observer && this.params.observer) {
                    if (this.params.observeParents) for (var e = this.$el.parents(), t = 0; t < e.length; t += 1) this.observer.attach(e[t]);
                    this.observer.attach(this.$el[0], { childList: !1 }), this.observer.attach(this.$wrapperEl[0], { attributes: !1 });
                }
            },
            destroy: function () {
                this.observer.observers.forEach(function (e) {
                    e.disconnect();
                }),
                    (this.observer.observers = []);
            },
        },
        B = {
            name: "observer",
            params: { observer: !1, observeParents: !1 },
            create: function () {
                l.extend(this, { observer: { init: N.init.bind(this), attach: N.attach.bind(this), destroy: N.destroy.bind(this), observers: [] } });
            },
            on: {
                init: function () {
                    this.observer.init();
                },
                destroy: function () {
                    this.observer.destroy();
                },
            },
        },
        G = {
            update: function (e) {
                var t = this,
                    i = t.params,
                    s = i.slidesPerView,
                    a = i.slidesPerGroup,
                    r = i.centeredSlides,
                    n = t.virtual,
                    o = n.from,
                    d = n.to,
                    h = n.slides,
                    p = n.slidesGrid,
                    c = n.renderSlide,
                    u = n.offset;
                t.updateActiveIndex();
                var v,
                    f,
                    m,
                    g = t.activeIndex || 0;
                (v = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top"), r ? ((f = Math.floor(s / 2) + a), (m = Math.floor(s / 2) + a)) : ((f = s + (a - 1)), (m = a));
                var b = Math.max((g || 0) - m, 0),
                    w = Math.min((g || 0) + f, h.length - 1),
                    y = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);
                function x() {
                    t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load();
                }
                if ((l.extend(t.virtual, { from: b, to: w, offset: y, slidesGrid: t.slidesGrid }), o === b && d === w && !e)) return t.slidesGrid !== p && y !== u && t.slides.css(v, y + "px"), void t.updateProgress();
                if (t.params.virtual.renderExternal)
                    return (
                        t.params.virtual.renderExternal.call(t, {
                            offset: y,
                            from: b,
                            to: w,
                            slides: (function () {
                                for (var e = [], t = b; t <= w; t += 1) e.push(h[t]);
                                return e;
                            })(),
                        }),
                        void x()
                    );
                var E = [],
                    T = [];
                if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
                else for (var S = o; S <= d; S += 1) (S < b || S > w) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + S + '"]').remove();
                for (var C = 0; C < h.length; C += 1) C >= b && C <= w && (void 0 === d || e ? T.push(C) : (C > d && T.push(C), C < o && E.push(C)));
                T.forEach(function (e) {
                    t.$wrapperEl.append(c(h[e], e));
                }),
                    E.sort(function (e, t) {
                        return e < t;
                    }).forEach(function (e) {
                        t.$wrapperEl.prepend(c(h[e], e));
                    }),
                    t.$wrapperEl.children(".swiper-slide").css(v, y + "px"),
                    x();
            },
            renderSlide: function (e, t) {
                var i = this.params.virtual;
                if (i.cache && this.virtual.cache[t]) return this.virtual.cache[t];
                var a = i.renderSlide ? s(i.renderSlide.call(this, e, t)) : s('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
                return a.attr("data-swiper-slide-index") || a.attr("data-swiper-slide-index", t), i.cache && (this.virtual.cache[t] = a), a;
            },
            appendSlide: function (e) {
                this.virtual.slides.push(e), this.virtual.update(!0);
            },
            prependSlide: function (e) {
                if ((this.virtual.slides.unshift(e), this.params.virtual.cache)) {
                    var t = this.virtual.cache,
                        i = {};
                    Object.keys(t).forEach(function (e) {
                        i[e + 1] = t[e];
                    }),
                        (this.virtual.cache = i);
                }
                this.virtual.update(!0), this.slideNext(0);
            },
        },
        X = {
            name: "virtual",
            params: { virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null } },
            create: function () {
                l.extend(this, {
                    virtual: { update: G.update.bind(this), appendSlide: G.appendSlide.bind(this), prependSlide: G.prependSlide.bind(this), renderSlide: G.renderSlide.bind(this), slides: this.params.virtual.slides, cache: {} },
                });
            },
            on: {
                beforeInit: function () {
                    if (this.params.virtual.enabled) {
                        this.classNames.push(this.params.containerModifierClass + "virtual");
                        var e = { watchSlidesProgress: !0 };
                        l.extend(this.params, e), l.extend(this.originalParams, e), this.virtual.update();
                    }
                },
                setTranslate: function () {
                    this.params.virtual.enabled && this.virtual.update();
                },
            },
        },
        Y = {
            handle: function (i) {
                var s = this.rtlTranslate,
                    a = i;
                a.originalEvent && (a = a.originalEvent);
                var r = a.keyCode || a.charCode;
                if (!this.allowSlideNext && ((this.isHorizontal() && 39 === r) || (this.isVertical() && 40 === r))) return !1;
                if (!this.allowSlidePrev && ((this.isHorizontal() && 37 === r) || (this.isVertical() && 38 === r))) return !1;
                if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || (e.activeElement && e.activeElement.nodeName && ("input" === e.activeElement.nodeName.toLowerCase() || "textarea" === e.activeElement.nodeName.toLowerCase())))) {
                    if (this.params.keyboard.onlyInViewport && (37 === r || 39 === r || 38 === r || 40 === r)) {
                        var n = !1;
                        if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length) return;
                        var o = t.innerWidth,
                            l = t.innerHeight,
                            d = this.$el.offset();
                        s && (d.left -= this.$el[0].scrollLeft);
                        for (
                            var h = [
                                    [d.left, d.top],
                                    [d.left + this.width, d.top],
                                    [d.left, d.top + this.height],
                                    [d.left + this.width, d.top + this.height],
                                ],
                                p = 0;
                            p < h.length;
                            p += 1
                        ) {
                            var c = h[p];
                            c[0] >= 0 && c[0] <= o && c[1] >= 0 && c[1] <= l && (n = !0);
                        }
                        if (!n) return;
                    }
                    this.isHorizontal()
                        ? ((37 !== r && 39 !== r) || (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)), ((39 === r && !s) || (37 === r && s)) && this.slideNext(), ((37 === r && !s) || (39 === r && s)) && this.slidePrev())
                        : ((38 !== r && 40 !== r) || (a.preventDefault ? a.preventDefault() : (a.returnValue = !1)), 40 === r && this.slideNext(), 38 === r && this.slidePrev()),
                        this.emit("keyPress", r);
                }
            },
            enable: function () {
                this.keyboard.enabled || (s(e).on("keydown", this.keyboard.handle), (this.keyboard.enabled = !0));
            },
            disable: function () {
                this.keyboard.enabled && (s(e).off("keydown", this.keyboard.handle), (this.keyboard.enabled = !1));
            },
        },
        V = {
            name: "keyboard",
            params: { keyboard: { enabled: !1, onlyInViewport: !0 } },
            create: function () {
                l.extend(this, { keyboard: { enabled: !1, enable: Y.enable.bind(this), disable: Y.disable.bind(this), handle: Y.handle.bind(this) } });
            },
            on: {
                init: function () {
                    this.params.keyboard.enabled && this.keyboard.enable();
                },
                destroy: function () {
                    this.keyboard.enabled && this.keyboard.disable();
                },
            },
        };
    var R = {
            lastScrollTime: l.now(),
            event:
                t.navigator.userAgent.indexOf("firefox") > -1
                    ? "DOMMouseScroll"
                    : (function () {
                          var t = "onwheel" in e;
                          if (!t) {
                              var i = e.createElement("div");
                              i.setAttribute("onwheel", "return;"), (t = "function" == typeof i.onwheel);
                          }
                          return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")), t;
                      })()
                    ? "wheel"
                    : "mousewheel",
            normalize: function (e) {
                var t = 0,
                    i = 0,
                    s = 0,
                    a = 0;
                return (
                    "detail" in e && (i = e.detail),
                    "wheelDelta" in e && (i = -e.wheelDelta / 120),
                    "wheelDeltaY" in e && (i = -e.wheelDeltaY / 120),
                    "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120),
                    "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = i), (i = 0)),
                    (s = 10 * t),
                    (a = 10 * i),
                    "deltaY" in e && (a = e.deltaY),
                    "deltaX" in e && (s = e.deltaX),
                    (s || a) && e.deltaMode && (1 === e.deltaMode ? ((s *= 40), (a *= 40)) : ((s *= 800), (a *= 800))),
                    s && !t && (t = s < 1 ? -1 : 1),
                    a && !i && (i = a < 1 ? -1 : 1),
                    { spinX: t, spinY: i, pixelX: s, pixelY: a }
                );
            },
            handleMouseEnter: function () {
                this.mouseEntered = !0;
            },
            handleMouseLeave: function () {
                this.mouseEntered = !1;
            },
            handle: function (e) {
                var i = e,
                    s = this,
                    a = s.params.mousewheel;
                if (!s.mouseEntered && !a.releaseOnEdges) return !0;
                i.originalEvent && (i = i.originalEvent);
                var r = 0,
                    n = s.rtlTranslate ? -1 : 1,
                    o = R.normalize(i);
                if (a.forceToAxis)
                    if (s.isHorizontal()) {
                        if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
                        r = o.pixelX * n;
                    } else {
                        if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
                        r = o.pixelY;
                    }
                else r = Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
                if (0 === r) return !0;
                if ((a.invert && (r = -r), s.params.freeMode)) {
                    var d = s.getTranslate() + r * a.sensitivity,
                        h = s.isBeginning,
                        p = s.isEnd;
                    if (
                        (d >= s.minTranslate() && (d = s.minTranslate()),
                        d <= s.maxTranslate() && (d = s.maxTranslate()),
                        s.setTransition(0),
                        s.setTranslate(d),
                        s.updateProgress(),
                        s.updateActiveIndex(),
                        s.updateSlidesClasses(),
                        ((!h && s.isBeginning) || (!p && s.isEnd)) && s.updateSlidesClasses(),
                        s.params.freeModeSticky &&
                            (clearTimeout(s.mousewheel.timeout),
                            (s.mousewheel.timeout = l.nextTick(function () {
                                s.slideToClosest();
                            }, 300))),
                        s.emit("scroll", i),
                        s.params.autoplay && s.params.autoplayDisableOnInteraction && s.stopAutoplay(),
                        d === s.minTranslate() || d === s.maxTranslate())
                    )
                        return !0;
                } else {
                    if (l.now() - s.mousewheel.lastScrollTime > 60)
                        if (r < 0)
                            if ((s.isEnd && !s.params.loop) || s.animating) {
                                if (a.releaseOnEdges) return !0;
                            } else s.slideNext(), s.emit("scroll", i);
                        else if ((s.isBeginning && !s.params.loop) || s.animating) {
                            if (a.releaseOnEdges) return !0;
                        } else s.slidePrev(), s.emit("scroll", i);
                    s.mousewheel.lastScrollTime = new t.Date().getTime();
                }
                return i.preventDefault ? i.preventDefault() : (i.returnValue = !1), !1;
            },
            enable: function () {
                if (!R.event) return !1;
                if (this.mousewheel.enabled) return !1;
                var e = this.$el;
                return (
                    "container" !== this.params.mousewheel.eventsTarged && (e = s(this.params.mousewheel.eventsTarged)),
                    e.on("mouseenter", this.mousewheel.handleMouseEnter),
                    e.on("mouseleave", this.mousewheel.handleMouseLeave),
                    e.on(R.event, this.mousewheel.handle),
                    (this.mousewheel.enabled = !0),
                    !0
                );
            },
            disable: function () {
                if (!R.event) return !1;
                if (!this.mousewheel.enabled) return !1;
                var e = this.$el;
                return "container" !== this.params.mousewheel.eventsTarged && (e = s(this.params.mousewheel.eventsTarged)), e.off(R.event, this.mousewheel.handle), (this.mousewheel.enabled = !1), !0;
            },
        },
        F = {
            update: function () {
                var e = this.params.navigation;
                if (!this.params.loop) {
                    var t = this.navigation,
                        i = t.$nextEl,
                        s = t.$prevEl;
                    s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass), s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)),
                        i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass), i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass));
                }
            },
            init: function () {
                var e,
                    t,
                    i = this,
                    a = i.params.navigation;
                (a.nextEl || a.prevEl) &&
                    (a.nextEl && ((e = s(a.nextEl)), i.params.uniqueNavElements && "string" == typeof a.nextEl && e.length > 1 && 1 === i.$el.find(a.nextEl).length && (e = i.$el.find(a.nextEl))),
                    a.prevEl && ((t = s(a.prevEl)), i.params.uniqueNavElements && "string" == typeof a.prevEl && t.length > 1 && 1 === i.$el.find(a.prevEl).length && (t = i.$el.find(a.prevEl))),
                    e &&
                        e.length > 0 &&
                        e.on("click", function (e) {
                            e.preventDefault(), (i.isEnd && !i.params.loop) || i.slideNext();
                        }),
                    t &&
                        t.length > 0 &&
                        t.on("click", function (e) {
                            e.preventDefault(), (i.isBeginning && !i.params.loop) || i.slidePrev();
                        }),
                    l.extend(i.navigation, { $nextEl: e, nextEl: e && e[0], $prevEl: t, prevEl: t && t[0] }));
            },
            destroy: function () {
                var e = this.navigation,
                    t = e.$nextEl,
                    i = e.$prevEl;
                t && t.length && (t.off("click"), t.removeClass(this.params.navigation.disabledClass)), i && i.length && (i.off("click"), i.removeClass(this.params.navigation.disabledClass));
            },
        },
        W = {
            update: function () {
                var e = this.rtl,
                    t = this.params.pagination;
                if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var i,
                        a = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        r = this.pagination.$el,
                        n = this.params.loop ? Math.ceil((a - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                    if (
                        (this.params.loop
                            ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > a - 1 - 2 * this.loopedSlides && (i -= a - 2 * this.loopedSlides),
                              i > n - 1 && (i -= n),
                              i < 0 && "bullets" !== this.params.paginationType && (i = n + i))
                            : (i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0),
                        "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0)
                    ) {
                        var o,
                            l,
                            d,
                            h = this.pagination.bullets;
                        if (
                            (t.dynamicBullets &&
                                ((this.pagination.bulletSize = h.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                                r.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"),
                                t.dynamicMainBullets > 1 &&
                                    void 0 !== this.previousIndex &&
                                    ((this.pagination.dynamicBulletIndex += i - this.previousIndex),
                                    this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1
                                        ? (this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1)
                                        : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)),
                                (o = i - this.pagination.dynamicBulletIndex),
                                (d = ((l = o + (Math.min(h.length, t.dynamicMainBullets) - 1)) + o) / 2)),
                            h.removeClass(
                                t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"
                            ),
                            r.length > 1)
                        )
                            h.each(function (e, a) {
                                var r = s(a),
                                    n = r.index();
                                n === i && r.addClass(t.bulletActiveClass),
                                    t.dynamicBullets &&
                                        (n >= o && n <= l && r.addClass(t.bulletActiveClass + "-main"),
                                        n === o &&
                                            r
                                                .prev()
                                                .addClass(t.bulletActiveClass + "-prev")
                                                .prev()
                                                .addClass(t.bulletActiveClass + "-prev-prev"),
                                        n === l &&
                                            r
                                                .next()
                                                .addClass(t.bulletActiveClass + "-next")
                                                .next()
                                                .addClass(t.bulletActiveClass + "-next-next"));
                            });
                        else if ((h.eq(i).addClass(t.bulletActiveClass), t.dynamicBullets)) {
                            for (var p = h.eq(o), c = h.eq(l), u = o; u <= l; u += 1) h.eq(u).addClass(t.bulletActiveClass + "-main");
                            p
                                .prev()
                                .addClass(t.bulletActiveClass + "-prev")
                                .prev()
                                .addClass(t.bulletActiveClass + "-prev-prev"),
                                c
                                    .next()
                                    .addClass(t.bulletActiveClass + "-next")
                                    .next()
                                    .addClass(t.bulletActiveClass + "-next-next");
                        }
                        if (t.dynamicBullets) {
                            var v = Math.min(h.length, t.dynamicMainBullets + 4),
                                f = (this.pagination.bulletSize * v - this.pagination.bulletSize) / 2 - d * this.pagination.bulletSize,
                                m = e ? "right" : "left";
                            h.css(this.isHorizontal() ? m : "top", f + "px");
                        }
                    }
                    if (("fraction" === t.type && (r.find("." + t.currentClass).text(i + 1), r.find("." + t.totalClass).text(n)), "progressbar" === t.type)) {
                        var g = (i + 1) / n,
                            b = g,
                            w = 1;
                        this.isHorizontal() || ((w = g), (b = 1)),
                            r
                                .find("." + t.progressbarFillClass)
                                .transform("translate3d(0,0,0) scaleX(" + b + ") scaleY(" + w + ")")
                                .transition(this.params.speed);
                    }
                    "custom" === t.type && t.renderCustom ? (r.html(t.renderCustom(this, i + 1, n)), this.emit("paginationRender", this, r[0])) : this.emit("paginationUpdate", this, r[0]),
                        r[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass);
                }
            },
            render: function () {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length,
                        i = this.pagination.$el,
                        s = "";
                    if ("bullets" === e.type) {
                        for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1)
                            e.renderBullet ? (s += e.renderBullet.call(this, r, e.bulletClass)) : (s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">");
                        i.html(s), (this.pagination.bullets = i.find("." + e.bulletClass));
                    }
                    "fraction" === e.type && ((s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>'), i.html(s)),
                        "progressbar" === e.type && ((s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>'), i.html(s)),
                        "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0]);
                }
            },
            init: function () {
                var e = this,
                    t = e.params.pagination;
                if (t.el) {
                    var i = s(t.el);
                    0 !== i.length &&
                        (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && 1 === e.$el.find(t.el).length && (i = e.$el.find(t.el)),
                        "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
                        i.addClass(t.modifierClass + t.type),
                        "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"), (e.pagination.dynamicBulletIndex = 0), t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                        t.clickable &&
                            i.on("click", "." + t.bulletClass, function (t) {
                                t.preventDefault();
                                var i = s(this).index() * e.params.slidesPerGroup;
                                e.params.loop && (i += e.loopedSlides), e.slideTo(i);
                            }),
                        l.extend(e.pagination, { $el: i, el: i[0] }));
                }
            },
            destroy: function () {
                var e = this.params.pagination;
                if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                    var t = this.pagination.$el;
                    t.removeClass(e.hiddenClass), t.removeClass(e.modifierClass + e.type), this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass), e.clickable && t.off("click", "." + e.bulletClass);
                }
            },
        },
        q = {
            setTranslate: function () {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.rtlTranslate,
                        i = this.progress,
                        s = e.dragSize,
                        a = e.trackSize,
                        r = e.$dragEl,
                        n = e.$el,
                        o = this.params.scrollbar,
                        l = s,
                        h = (a - s) * i;
                    t ? ((h = -h) > 0 ? ((l = s - h), (h = 0)) : -h + s > a && (l = a + h)) : h < 0 ? ((l = s + h), (h = 0)) : h + s > a && (l = a - h),
                        this.isHorizontal()
                            ? (d.transforms3d ? r.transform("translate3d(" + h + "px, 0, 0)") : r.transform("translateX(" + h + "px)"), (r[0].style.width = l + "px"))
                            : (d.transforms3d ? r.transform("translate3d(0px, " + h + "px, 0)") : r.transform("translateY(" + h + "px)"), (r[0].style.height = l + "px")),
                        o.hide &&
                            (clearTimeout(this.scrollbar.timeout),
                            (n[0].style.opacity = 1),
                            (this.scrollbar.timeout = setTimeout(function () {
                                (n[0].style.opacity = 0), n.transition(400);
                            }, 1e3)));
                }
            },
            setTransition: function (e) {
                this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e);
            },
            updateSize: function () {
                if (this.params.scrollbar.el && this.scrollbar.el) {
                    var e = this.scrollbar,
                        t = e.$dragEl,
                        i = e.$el;
                    (t[0].style.width = ""), (t[0].style.height = "");
                    var s,
                        a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
                        r = this.size / this.virtualSize,
                        n = r * (a / this.size);
                    (s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10)),
                        this.isHorizontal() ? (t[0].style.width = s + "px") : (t[0].style.height = s + "px"),
                        (i[0].style.display = r >= 1 ? "none" : ""),
                        this.params.scrollbarHide && (i[0].style.opacity = 0),
                        l.extend(e, { trackSize: a, divider: r, moveDivider: n, dragSize: s }),
                        e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass);
                }
            },
            setDragPosition: function (e) {
                var t,
                    i = this.scrollbar,
                    s = this.rtlTranslate,
                    a = i.$el,
                    r = i.dragSize,
                    n = i.trackSize;
                (t =
                    ((this.isHorizontal()
                        ? "touchstart" === e.type || "touchmove" === e.type
                            ? e.targetTouches[0].pageX
                            : e.pageX || e.clientX
                        : "touchstart" === e.type || "touchmove" === e.type
                        ? e.targetTouches[0].pageY
                        : e.pageY || e.clientY) -
                        a.offset()[this.isHorizontal() ? "left" : "top"] -
                        r / 2) /
                    (n - r)),
                    (t = Math.max(Math.min(t, 1), 0)),
                    s && (t = 1 - t);
                var o = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
                this.updateProgress(o), this.setTranslate(o), this.updateActiveIndex(), this.updateSlidesClasses();
            },
            onDragStart: function (e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar,
                    s = this.$wrapperEl,
                    a = i.$el,
                    r = i.$dragEl;
                (this.scrollbar.isTouched = !0),
                    e.preventDefault(),
                    e.stopPropagation(),
                    s.transition(100),
                    r.transition(100),
                    i.setDragPosition(e),
                    clearTimeout(this.scrollbar.dragTimeout),
                    a.transition(0),
                    t.hide && a.css("opacity", 1),
                    this.emit("scrollbarDragStart", e);
            },
            onDragMove: function (e) {
                var t = this.scrollbar,
                    i = this.$wrapperEl,
                    s = t.$el,
                    a = t.$dragEl;
                this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1), t.setDragPosition(e), i.transition(0), s.transition(0), a.transition(0), this.emit("scrollbarDragMove", e));
            },
            onDragEnd: function (e) {
                var t = this.params.scrollbar,
                    i = this.scrollbar.$el;
                this.scrollbar.isTouched &&
                    ((this.scrollbar.isTouched = !1),
                    t.hide &&
                        (clearTimeout(this.scrollbar.dragTimeout),
                        (this.scrollbar.dragTimeout = l.nextTick(function () {
                            i.css("opacity", 0), i.transition(400);
                        }, 1e3))),
                    this.emit("scrollbarDragEnd", e),
                    t.snapOnRelease && this.slideToClosest());
            },
            enableDraggable: function () {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar,
                        i = this.touchEvents,
                        s = this.touchEventsDesktop,
                        a = this.params,
                        r = t.$el[0],
                        n = !(!d.passiveListener || !a.passiveListener) && { passive: !1, capture: !1 },
                        o = !(!d.passiveListener || !a.passiveListener) && { passive: !0, capture: !1 };
                    d.touch || (!d.pointerEvents && !d.prefixedPointerEvents)
                        ? (d.touch && (r.addEventListener(i.start, this.scrollbar.onDragStart, n), r.addEventListener(i.move, this.scrollbar.onDragMove, n), r.addEventListener(i.end, this.scrollbar.onDragEnd, o)),
                          ((a.simulateTouch && !w.ios && !w.android) || (a.simulateTouch && !d.touch && w.ios)) &&
                              (r.addEventListener("mousedown", this.scrollbar.onDragStart, n), e.addEventListener("mousemove", this.scrollbar.onDragMove, n), e.addEventListener("mouseup", this.scrollbar.onDragEnd, o)))
                        : (r.addEventListener(s.start, this.scrollbar.onDragStart, n), e.addEventListener(s.move, this.scrollbar.onDragMove, n), e.addEventListener(s.end, this.scrollbar.onDragEnd, o));
                }
            },
            disableDraggable: function () {
                if (this.params.scrollbar.el) {
                    var t = this.scrollbar,
                        i = this.touchEvents,
                        s = this.touchEventsDesktop,
                        a = this.params,
                        r = t.$el[0],
                        n = !(!d.passiveListener || !a.passiveListener) && { passive: !1, capture: !1 },
                        o = !(!d.passiveListener || !a.passiveListener) && { passive: !0, capture: !1 };
                    d.touch || (!d.pointerEvents && !d.prefixedPointerEvents)
                        ? (d.touch && (r.removeEventListener(i.start, this.scrollbar.onDragStart, n), r.removeEventListener(i.move, this.scrollbar.onDragMove, n), r.removeEventListener(i.end, this.scrollbar.onDragEnd, o)),
                          ((a.simulateTouch && !w.ios && !w.android) || (a.simulateTouch && !d.touch && w.ios)) &&
                              (r.removeEventListener("mousedown", this.scrollbar.onDragStart, n), e.removeEventListener("mousemove", this.scrollbar.onDragMove, n), e.removeEventListener("mouseup", this.scrollbar.onDragEnd, o)))
                        : (r.removeEventListener(s.start, this.scrollbar.onDragStart, n), e.removeEventListener(s.move, this.scrollbar.onDragMove, n), e.removeEventListener(s.end, this.scrollbar.onDragEnd, o));
                }
            },
            init: function () {
                if (this.params.scrollbar.el) {
                    var e = this.scrollbar,
                        t = this.$el,
                        i = this.params.scrollbar,
                        a = s(i.el);
                    this.params.uniqueNavElements && "string" == typeof i.el && a.length > 1 && 1 === t.find(i.el).length && (a = t.find(i.el));
                    var r = a.find("." + this.params.scrollbar.dragClass);
                    0 === r.length && ((r = s('<div class="' + this.params.scrollbar.dragClass + '"></div>')), a.append(r)), l.extend(e, { $el: a, el: a[0], $dragEl: r, dragEl: r[0] }), i.draggable && e.enableDraggable();
                }
            },
            destroy: function () {
                this.scrollbar.disableDraggable();
            },
        },
        j = {
            setTransform: function (e, t) {
                var i = this.rtl,
                    a = s(e),
                    r = i ? -1 : 1,
                    n = a.attr("data-swiper-parallax") || "0",
                    o = a.attr("data-swiper-parallax-x"),
                    l = a.attr("data-swiper-parallax-y"),
                    d = a.attr("data-swiper-parallax-scale"),
                    h = a.attr("data-swiper-parallax-opacity");
                if (
                    (o || l ? ((o = o || "0"), (l = l || "0")) : this.isHorizontal() ? ((o = n), (l = "0")) : ((l = n), (o = "0")),
                    (o = o.indexOf("%") >= 0 ? parseInt(o, 10) * t * r + "%" : o * t * r + "px"),
                    (l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px"),
                    null != h)
                ) {
                    var p = h - (h - 1) * (1 - Math.abs(t));
                    a[0].style.opacity = p;
                }
                if (null == d) a.transform("translate3d(" + o + ", " + l + ", 0px)");
                else {
                    var c = d - (d - 1) * (1 - Math.abs(t));
                    a.transform("translate3d(" + o + ", " + l + ", 0px) scale(" + c + ")");
                }
            },
            setTranslate: function () {
                var e = this,
                    t = e.$el,
                    i = e.slides,
                    a = e.progress,
                    r = e.snapGrid;
                t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
                    e.parallax.setTransform(i, a);
                }),
                    i.each(function (t, i) {
                        var n = i.progress;
                        e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (n += Math.ceil(t / 2) - a * (r.length - 1)),
                            (n = Math.min(Math.max(n, -1), 1)),
                            s(i)
                                .find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]")
                                .each(function (t, i) {
                                    e.parallax.setTransform(i, n);
                                });
                    });
            },
            setTransition: function (e) {
                void 0 === e && (e = this.params.speed);
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function (t, i) {
                    var a = s(i),
                        r = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (r = 0), a.transition(r);
                });
            },
        },
        K = {
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var t = e.targetTouches[0].pageX,
                    i = e.targetTouches[0].pageY,
                    s = e.targetTouches[1].pageX,
                    a = e.targetTouches[1].pageY;
                return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2));
            },
            onGestureStart: function (e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    a = i.gesture;
                if (((i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1), !d.gestures)) {
                    if ("touchstart" !== e.type || ("touchstart" === e.type && e.targetTouches.length < 2)) return;
                    (i.fakeGestureTouched = !0), (a.scaleStart = K.getDistanceBetweenTouches(e));
                }
                (a.$slideEl && a.$slideEl.length) ||
                ((a.$slideEl = s(e.target).closest(".swiper-slide")),
                0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)),
                (a.$imageEl = a.$slideEl.find("img, svg, canvas")),
                (a.$imageWrapEl = a.$imageEl.parent("." + t.containerClass)),
                (a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || t.maxRatio),
                0 !== a.$imageWrapEl.length)
                    ? (a.$imageEl.transition(0), (this.zoom.isScaling = !0))
                    : (a.$imageEl = void 0);
            },
            onGestureChange: function (e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!d.gestures) {
                    if ("touchmove" !== e.type || ("touchmove" === e.type && e.targetTouches.length < 2)) return;
                    (i.fakeGestureMoved = !0), (s.scaleMove = K.getDistanceBetweenTouches(e));
                }
                s.$imageEl &&
                    0 !== s.$imageEl.length &&
                    (d.gestures ? (this.zoom.scale = e.scale * i.currentScale) : (i.scale = (s.scaleMove / s.scaleStart) * i.currentScale),
                    i.scale > s.maxRatio && (i.scale = s.maxRatio - 1 + Math.pow(i.scale - s.maxRatio + 1, 0.5)),
                    i.scale < t.minRatio && (i.scale = t.minRatio + 1 - Math.pow(t.minRatio - i.scale + 1, 0.5)),
                    s.$imageEl.transform("translate3d(0,0,0) scale(" + i.scale + ")"));
            },
            onGestureEnd: function (e) {
                var t = this.params.zoom,
                    i = this.zoom,
                    s = i.gesture;
                if (!d.gestures) {
                    if (!i.fakeGestureTouched || !i.fakeGestureMoved) return;
                    if ("touchend" !== e.type || ("touchend" === e.type && e.changedTouches.length < 2 && !w.android)) return;
                    (i.fakeGestureTouched = !1), (i.fakeGestureMoved = !1);
                }
                s.$imageEl &&
                    0 !== s.$imageEl.length &&
                    ((i.scale = Math.max(Math.min(i.scale, s.maxRatio), t.minRatio)),
                    s.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + i.scale + ")"),
                    (i.currentScale = i.scale),
                    (i.isScaling = !1),
                    1 === i.scale && (s.$slideEl = void 0));
            },
            onTouchStart: function (e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image;
                i.$imageEl &&
                    0 !== i.$imageEl.length &&
                    (s.isTouched ||
                        (w.android && e.preventDefault(),
                        (s.isTouched = !0),
                        (s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX),
                        (s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY)));
            },
            onTouchMove: function (e) {
                var t = this.zoom,
                    i = t.gesture,
                    s = t.image,
                    a = t.velocity;
                if (i.$imageEl && 0 !== i.$imageEl.length && ((this.allowClick = !1), s.isTouched && i.$slideEl)) {
                    s.isMoved ||
                        ((s.width = i.$imageEl[0].offsetWidth),
                        (s.height = i.$imageEl[0].offsetHeight),
                        (s.startX = l.getTranslate(i.$imageWrapEl[0], "x") || 0),
                        (s.startY = l.getTranslate(i.$imageWrapEl[0], "y") || 0),
                        (i.slideWidth = i.$slideEl[0].offsetWidth),
                        (i.slideHeight = i.$slideEl[0].offsetHeight),
                        i.$imageWrapEl.transition(0),
                        this.rtl && ((s.startX = -s.startX), (s.startY = -s.startY)));
                    var r = s.width * t.scale,
                        n = s.height * t.scale;
                    if (!(r < i.slideWidth && n < i.slideHeight)) {
                        if (
                            ((s.minX = Math.min(i.slideWidth / 2 - r / 2, 0)),
                            (s.maxX = -s.minX),
                            (s.minY = Math.min(i.slideHeight / 2 - n / 2, 0)),
                            (s.maxY = -s.minY),
                            (s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX),
                            (s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY),
                            !s.isMoved && !t.isScaling)
                        ) {
                            if (this.isHorizontal() && ((Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x) || (Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)))
                                return void (s.isTouched = !1);
                            if (!this.isHorizontal() && ((Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y) || (Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)))
                                return void (s.isTouched = !1);
                        }
                        e.preventDefault(),
                            e.stopPropagation(),
                            (s.isMoved = !0),
                            (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
                            (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
                            s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
                            s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
                            s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
                            s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
                            a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x),
                            a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y),
                            a.prevTime || (a.prevTime = Date.now()),
                            (a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2),
                            (a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2),
                            Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0),
                            Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0),
                            (a.prevPositionX = s.touchesCurrent.x),
                            (a.prevPositionY = s.touchesCurrent.y),
                            (a.prevTime = Date.now()),
                            i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)");
                    }
                }
            },
            onTouchEnd: function () {
                var e = this.zoom,
                    t = e.gesture,
                    i = e.image,
                    s = e.velocity;
                if (t.$imageEl && 0 !== t.$imageEl.length) {
                    if (!i.isTouched || !i.isMoved) return (i.isTouched = !1), void (i.isMoved = !1);
                    (i.isTouched = !1), (i.isMoved = !1);
                    var a = 300,
                        r = 300,
                        n = s.x * a,
                        o = i.currentX + n,
                        l = s.y * r,
                        d = i.currentY + l;
                    0 !== s.x && (a = Math.abs((o - i.currentX) / s.x)), 0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
                    var h = Math.max(a, r);
                    (i.currentX = o), (i.currentY = d);
                    var p = i.width * e.scale,
                        c = i.height * e.scale;
                    (i.minX = Math.min(t.slideWidth / 2 - p / 2, 0)),
                        (i.maxX = -i.minX),
                        (i.minY = Math.min(t.slideHeight / 2 - c / 2, 0)),
                        (i.maxY = -i.minY),
                        (i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX)),
                        (i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY)),
                        t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)");
                }
            },
            onTransitionEnd: function () {
                var e = this.zoom,
                    t = e.gesture;
                t.$slideEl &&
                    this.previousIndex !== this.activeIndex &&
                    (t.$imageEl.transform("translate3d(0,0,0) scale(1)"), t.$imageWrapEl.transform("translate3d(0,0,0)"), (t.$slideEl = void 0), (t.$imageEl = void 0), (t.$imageWrapEl = void 0), (e.scale = 1), (e.currentScale = 1));
            },
            toggle: function (e) {
                var t = this.zoom;
                t.scale && 1 !== t.scale ? t.out() : t.in(e);
            },
            in: function (e) {
                var t,
                    i,
                    a,
                    r,
                    n,
                    o,
                    l,
                    d,
                    h,
                    p,
                    c,
                    u,
                    v,
                    f,
                    m,
                    g,
                    b = this.zoom,
                    w = this.params.zoom,
                    y = b.gesture,
                    x = b.image;
                (y.$slideEl || ((y.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex)), (y.$imageEl = y.$slideEl.find("img, svg, canvas")), (y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass))),
                y.$imageEl && 0 !== y.$imageEl.length) &&
                    (y.$slideEl.addClass("" + w.zoomedSlideClass),
                    void 0 === x.touchesStart.x && e
                        ? ((t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX), (i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY))
                        : ((t = x.touchesStart.x), (i = x.touchesStart.y)),
                    (b.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
                    (b.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio),
                    e
                        ? ((m = y.$slideEl[0].offsetWidth),
                          (g = y.$slideEl[0].offsetHeight),
                          (a = y.$slideEl.offset().left + m / 2 - t),
                          (r = y.$slideEl.offset().top + g / 2 - i),
                          (l = y.$imageEl[0].offsetWidth),
                          (d = y.$imageEl[0].offsetHeight),
                          (h = l * b.scale),
                          (p = d * b.scale),
                          (v = -(c = Math.min(m / 2 - h / 2, 0))),
                          (f = -(u = Math.min(g / 2 - p / 2, 0))),
                          (n = a * b.scale) < c && (n = c),
                          n > v && (n = v),
                          (o = r * b.scale) < u && (o = u),
                          o > f && (o = f))
                        : ((n = 0), (o = 0)),
                    y.$imageWrapEl.transition(300).transform("translate3d(" + n + "px, " + o + "px,0)"),
                    y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + b.scale + ")"));
            },
            out: function () {
                var e = this.zoom,
                    t = this.params.zoom,
                    i = e.gesture;
                i.$slideEl || ((i.$slideEl = this.clickedSlide ? s(this.clickedSlide) : this.slides.eq(this.activeIndex)), (i.$imageEl = i.$slideEl.find("img, svg, canvas")), (i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass))),
                    i.$imageEl &&
                        0 !== i.$imageEl.length &&
                        ((e.scale = 1),
                        (e.currentScale = 1),
                        i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                        i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
                        i.$slideEl.removeClass("" + t.zoomedSlideClass),
                        (i.$slideEl = void 0));
            },
            enable: function () {
                var e = this.zoom;
                if (!e.enabled) {
                    e.enabled = !0;
                    var t = !("touchstart" !== this.touchEvents.start || !d.passiveListener || !this.params.passiveListeners) && { passive: !0, capture: !1 };
                    d.gestures
                        ? (this.$wrapperEl.on("gesturestart", ".swiper-slide", e.onGestureStart, t),
                          this.$wrapperEl.on("gesturechange", ".swiper-slide", e.onGestureChange, t),
                          this.$wrapperEl.on("gestureend", ".swiper-slide", e.onGestureEnd, t))
                        : "touchstart" === this.touchEvents.start &&
                          (this.$wrapperEl.on(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t),
                          this.$wrapperEl.on(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t),
                          this.$wrapperEl.on(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)),
                        this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove);
                }
            },
            disable: function () {
                var e = this.zoom;
                if (e.enabled) {
                    this.zoom.enabled = !1;
                    var t = !("touchstart" !== this.touchEvents.start || !d.passiveListener || !this.params.passiveListeners) && { passive: !0, capture: !1 };
                    d.gestures
                        ? (this.$wrapperEl.off("gesturestart", ".swiper-slide", e.onGestureStart, t),
                          this.$wrapperEl.off("gesturechange", ".swiper-slide", e.onGestureChange, t),
                          this.$wrapperEl.off("gestureend", ".swiper-slide", e.onGestureEnd, t))
                        : "touchstart" === this.touchEvents.start &&
                          (this.$wrapperEl.off(this.touchEvents.start, ".swiper-slide", e.onGestureStart, t),
                          this.$wrapperEl.off(this.touchEvents.move, ".swiper-slide", e.onGestureChange, t),
                          this.$wrapperEl.off(this.touchEvents.end, ".swiper-slide", e.onGestureEnd, t)),
                        this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove);
                }
            },
        },
        U = {
            loadInSlide: function (e, t) {
                void 0 === t && (t = !0);
                var i = this,
                    a = i.params.lazy;
                if (void 0 !== e && 0 !== i.slides.length) {
                    var r = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e),
                        n = r.find("." + a.elementClass + ":not(." + a.loadedClass + "):not(." + a.loadingClass + ")");
                    !r.hasClass(a.elementClass) || r.hasClass(a.loadedClass) || r.hasClass(a.loadingClass) || (n = n.add(r[0])),
                        0 !== n.length &&
                            n.each(function (e, n) {
                                var o = s(n);
                                o.addClass(a.loadingClass);
                                var l = o.attr("data-background"),
                                    d = o.attr("data-src"),
                                    h = o.attr("data-srcset"),
                                    p = o.attr("data-sizes");
                                i.loadImage(o[0], d || l, h, p, !1, function () {
                                    if (null != i && i && (!i || i.params) && !i.destroyed) {
                                        if (
                                            (l
                                                ? (o.css("background-image", 'url("' + l + '")'), o.removeAttr("data-background"))
                                                : (h && (o.attr("srcset", h), o.removeAttr("data-srcset")), p && (o.attr("sizes", p), o.removeAttr("data-sizes")), d && (o.attr("src", d), o.removeAttr("data-src"))),
                                            o.addClass(a.loadedClass).removeClass(a.loadingClass),
                                            r.find("." + a.preloaderClass).remove(),
                                            i.params.loop && t)
                                        ) {
                                            var e = r.attr("data-swiper-slide-index");
                                            if (r.hasClass(i.params.slideDuplicateClass)) {
                                                var s = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                                i.lazy.loadInSlide(s.index(), !1);
                                            } else {
                                                var n = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                                i.lazy.loadInSlide(n.index(), !1);
                                            }
                                        }
                                        i.emit("lazyImageReady", r[0], o[0]);
                                    }
                                }),
                                    i.emit("lazyImageLoad", r[0], o[0]);
                            });
                }
            },
            load: function () {
                var e = this,
                    t = e.$wrapperEl,
                    i = e.params,
                    a = e.slides,
                    r = e.activeIndex,
                    n = e.virtual && i.virtual.enabled,
                    o = i.lazy,
                    l = i.slidesPerView;
                function d(e) {
                    if (n) {
                        if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0;
                    } else if (a[e]) return !0;
                    return !1;
                }
                function h(e) {
                    return n ? s(e).attr("data-swiper-slide-index") : s(e).index();
                }
                if (("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility))
                    t.children("." + i.slideVisibleClass).each(function (t, i) {
                        var a = n ? s(i).attr("data-swiper-slide-index") : s(i).index();
                        e.lazy.loadInSlide(a);
                    });
                else if (l > 1) for (var p = r; p < r + l; p += 1) d(p) && e.lazy.loadInSlide(p);
                else e.lazy.loadInSlide(r);
                if (o.loadPrevNext)
                    if (l > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
                        for (var c = o.loadPrevNextAmount, u = l, v = Math.min(r + u + Math.max(c, u), a.length), f = Math.max(r - Math.max(u, c), 0), m = r + l; m < v; m += 1) d(m) && e.lazy.loadInSlide(m);
                        for (var g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g);
                    } else {
                        var b = t.children("." + i.slideNextClass);
                        b.length > 0 && e.lazy.loadInSlide(h(b));
                        var w = t.children("." + i.slidePrevClass);
                        w.length > 0 && e.lazy.loadInSlide(h(w));
                    }
            },
        },
        _ = {
            LinearSpline: function (e, t) {
                var i,
                    s,
                    a,
                    r,
                    n,
                    o = function (e, t) {
                        for (s = -1, i = e.length; i - s > 1; ) e[(a = (i + s) >> 1)] <= t ? (s = a) : (i = a);
                        return i;
                    };
                return (
                    (this.x = e),
                    (this.y = t),
                    (this.lastIndex = e.length - 1),
                    (this.interpolate = function (e) {
                        return e ? ((n = o(this.x, e)), (r = n - 1), ((e - this.x[r]) * (this.y[n] - this.y[r])) / (this.x[n] - this.x[r]) + this.y[r]) : 0;
                    }),
                    this
                );
            },
            getInterpolateFunction: function (e) {
                this.controller.spline || (this.controller.spline = this.params.loop ? new _.LinearSpline(this.slidesGrid, e.slidesGrid) : new _.LinearSpline(this.snapGrid, e.snapGrid));
            },
            setTranslate: function (e, t) {
                var i,
                    s,
                    a = this,
                    r = a.controller.control;
                function n(e) {
                    var t = a.rtlTranslate ? -a.translate : a.translate;
                    "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e), (s = -a.controller.spline.interpolate(-t))),
                        (s && "container" !== a.params.controller.by) || ((i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate())), (s = (t - a.minTranslate()) * i + e.minTranslate())),
                        a.params.controller.inverse && (s = e.maxTranslate() - s),
                        e.updateProgress(s),
                        e.setTranslate(s, a),
                        e.updateActiveIndex(),
                        e.updateSlidesClasses();
                }
                if (Array.isArray(r)) for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof I && n(r[o]);
                else r instanceof I && t !== r && n(r);
            },
            setTransition: function (e, t) {
                var i,
                    s = this,
                    a = s.controller.control;
                function r(t) {
                    t.setTransition(e, s),
                        0 !== e &&
                            (t.transitionStart(),
                            t.$wrapperEl.transitionEnd(function () {
                                a && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(), t.transitionEnd());
                            }));
                }
                if (Array.isArray(a)) for (i = 0; i < a.length; i += 1) a[i] !== t && a[i] instanceof I && r(a[i]);
                else a instanceof I && t !== a && r(a);
            },
        },
        Z = {
            makeElFocusable: function (e) {
                return e.attr("tabIndex", "0"), e;
            },
            addElRole: function (e, t) {
                return e.attr("role", t), e;
            },
            addElLabel: function (e, t) {
                return e.attr("aria-label", t), e;
            },
            disableEl: function (e) {
                return e.attr("aria-disabled", !0), e;
            },
            enableEl: function (e) {
                return e.attr("aria-disabled", !1), e;
            },
            onEnterKey: function (e) {
                var t = this.params.a11y;
                if (13 === e.keyCode) {
                    var i = s(e.target);
                    this.navigation &&
                        this.navigation.$nextEl &&
                        i.is(this.navigation.$nextEl) &&
                        ((this.isEnd && !this.params.loop) || this.slideNext(), this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)),
                        this.navigation &&
                            this.navigation.$prevEl &&
                            i.is(this.navigation.$prevEl) &&
                            ((this.isBeginning && !this.params.loop) || this.slidePrev(), this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)),
                        this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click();
                }
            },
            notify: function (e) {
                var t = this.a11y.liveRegion;
                0 !== t.length && (t.html(""), t.html(e));
            },
            updateNavigation: function () {
                if (!this.params.loop) {
                    var e = this.navigation,
                        t = e.$nextEl,
                        i = e.$prevEl;
                    i && i.length > 0 && (this.isBeginning ? this.a11y.disableEl(i) : this.a11y.enableEl(i)), t && t.length > 0 && (this.isEnd ? this.a11y.disableEl(t) : this.a11y.enableEl(t));
                }
            },
            updatePagination: function () {
                var e = this,
                    t = e.params.a11y;
                e.pagination &&
                    e.params.pagination.clickable &&
                    e.pagination.bullets &&
                    e.pagination.bullets.length &&
                    e.pagination.bullets.each(function (i, a) {
                        var r = s(a);
                        e.a11y.makeElFocusable(r), e.a11y.addElRole(r, "button"), e.a11y.addElLabel(r, t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1));
                    });
            },
            init: function () {
                this.$el.append(this.a11y.liveRegion);
                var e,
                    t,
                    i = this.params.a11y;
                this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
                    this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
                    e && (this.a11y.makeElFocusable(e), this.a11y.addElRole(e, "button"), this.a11y.addElLabel(e, i.nextSlideMessage), e.on("keydown", this.a11y.onEnterKey)),
                    t && (this.a11y.makeElFocusable(t), this.a11y.addElRole(t, "button"), this.a11y.addElLabel(t, i.prevSlideMessage), t.on("keydown", this.a11y.onEnterKey)),
                    this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.on("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey);
            },
            destroy: function () {
                var e, t;
                this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(),
                    this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
                    this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
                    e && e.off("keydown", this.a11y.onEnterKey),
                    t && t.off("keydown", this.a11y.onEnterKey),
                    this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey);
            },
        },
        Q = {
            init: function () {
                if (this.params.history) {
                    if (!t.history || !t.history.pushState) return (this.params.history.enabled = !1), void (this.params.hashNavigation.enabled = !0);
                    var e = this.history;
                    (e.initialized = !0),
                        (e.paths = Q.getPathValues()),
                        (e.paths.key || e.paths.value) && (e.scrollToSlide(0, e.paths.value, this.params.runCallbacksOnInit), this.params.history.replaceState || t.addEventListener("popstate", this.history.setHistoryPopState));
                }
            },
            destroy: function () {
                this.params.history.replaceState || t.removeEventListener("popstate", this.history.setHistoryPopState);
            },
            setHistoryPopState: function () {
                (this.history.paths = Q.getPathValues()), this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1);
            },
            getPathValues: function () {
                var e = t.location.pathname
                        .slice(1)
                        .split("/")
                        .filter(function (e) {
                            return "" !== e;
                        }),
                    i = e.length;
                return { key: e[i - 2], value: e[i - 1] };
            },
            setHistory: function (e, i) {
                if (this.history.initialized && this.params.history.enabled) {
                    var s = this.slides.eq(i),
                        a = Q.slugify(s.attr("data-history"));
                    t.location.pathname.includes(e) || (a = e + "/" + a);
                    var r = t.history.state;
                    (r && r.value === a) || (this.params.history.replaceState ? t.history.replaceState({ value: a }, null, a) : t.history.pushState({ value: a }, null, a));
                }
            },
            slugify: function (e) {
                return e
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]+/g, "")
                    .replace(/--+/g, "-")
                    .replace(/^-+/, "")
                    .replace(/-+$/, "");
            },
            scrollToSlide: function (e, t, i) {
                if (t)
                    for (var s = 0, a = this.slides.length; s < a; s += 1) {
                        var r = this.slides.eq(s);
                        if (Q.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
                            var n = r.index();
                            this.slideTo(n, e, i);
                        }
                    }
                else this.slideTo(0, e, i);
            },
        },
        J = {
            onHashCange: function () {
                var t = e.location.hash.replace("#", "");
                t !== this.slides.eq(this.activeIndex).attr("data-hash") && this.slideTo(this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index());
            },
            setHash: function () {
                if (this.hashNavigation.initialized && this.params.hashNavigation.enabled)
                    if (this.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || "");
                    else {
                        var i = this.slides.eq(this.activeIndex),
                            s = i.attr("data-hash") || i.attr("data-history");
                        e.location.hash = s || "";
                    }
            },
            init: function () {
                if (!(!this.params.hashNavigation.enabled || (this.params.history && this.params.history.enabled))) {
                    this.hashNavigation.initialized = !0;
                    var i = e.location.hash.replace("#", "");
                    if (i)
                        for (var a = 0, r = this.slides.length; a < r; a += 1) {
                            var n = this.slides.eq(a);
                            if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
                                var o = n.index();
                                this.slideTo(o, 0, this.params.runCallbacksOnInit, !0);
                            }
                        }
                    this.params.hashNavigation.watchState && s(t).on("hashchange", this.hashNavigation.onHashCange);
                }
            },
            destroy: function () {
                this.params.hashNavigation.watchState && s(t).off("hashchange", this.hashNavigation.onHashCange);
            },
        },
        ee = {
            run: function () {
                var e = this,
                    t = e.slides.eq(e.activeIndex),
                    i = e.params.autoplay.delay;
                t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
                    (e.autoplay.timeout = l.nextTick(function () {
                        e.params.autoplay.reverseDirection
                            ? e.params.loop
                                ? (e.loopFix(), e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
                                : e.isBeginning
                                ? e.params.autoplay.stopOnLastSlide
                                    ? e.autoplay.stop()
                                    : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay"))
                                : (e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay"))
                            : e.params.loop
                            ? (e.loopFix(), e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"))
                            : e.isEnd
                            ? e.params.autoplay.stopOnLastSlide
                                ? e.autoplay.stop()
                                : (e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay"))
                            : (e.slideNext(e.params.speed, !0, !0), e.emit("autoplay"));
                    }, i));
            },
            start: function () {
                return void 0 === this.autoplay.timeout && !this.autoplay.running && ((this.autoplay.running = !0), this.emit("autoplayStart"), this.autoplay.run(), !0);
            },
            stop: function () {
                return (
                    !!this.autoplay.running &&
                    void 0 !== this.autoplay.timeout &&
                    (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout), (this.autoplay.timeout = void 0)), (this.autoplay.running = !1), this.emit("autoplayStop"), !0)
                );
            },
            pause: function (e) {
                var t = this;
                t.autoplay.running &&
                    (t.autoplay.paused ||
                        (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
                        (t.autoplay.paused = !0),
                        0 !== e && t.params.autoplay.waitForTransition
                            ? t.$wrapperEl.transitionEnd(function () {
                                  t && !t.destroyed && ((t.autoplay.paused = !1), t.autoplay.running ? t.autoplay.run() : t.autoplay.stop());
                              })
                            : ((t.autoplay.paused = !1), t.autoplay.run())));
            },
        },
        te = {
            setTranslate: function () {
                for (var e = this.slides, t = 0; t < e.length; t += 1) {
                    var i = this.slides.eq(t),
                        s = -i[0].swiperSlideOffset;
                    this.params.virtualTranslate || (s -= this.translate);
                    var a = 0;
                    this.isHorizontal() || ((a = s), (s = 0));
                    var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                    i.css({ opacity: r }).transform("translate3d(" + s + "px, " + a + "px, 0px)");
                }
            },
            setTransition: function (e) {
                var t = this,
                    i = t.slides,
                    s = t.$wrapperEl;
                if ((i.transition(e), t.params.virtualTranslate && 0 !== e)) {
                    var a = !1;
                    i.transitionEnd(function () {
                        if (!a && t && !t.destroyed) {
                            (a = !0), (t.animating = !1);
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) s.trigger(e[i]);
                        }
                    });
                }
            },
        },
        ie = {
            setTranslate: function () {
                var e,
                    t = this.$el,
                    i = this.$wrapperEl,
                    a = this.slides,
                    r = this.width,
                    n = this.height,
                    o = this.rtlTranslate,
                    l = this.size,
                    d = this.params.cubeEffect,
                    h = this.isHorizontal(),
                    p = this.virtual && this.params.virtual.enabled,
                    c = 0;
                d.shadow &&
                    (h
                        ? (0 === (e = i.find(".swiper-cube-shadow")).length && ((e = s('<div class="swiper-cube-shadow"></div>')), i.append(e)), e.css({ height: r + "px" }))
                        : 0 === (e = t.find(".swiper-cube-shadow")).length && ((e = s('<div class="swiper-cube-shadow"></div>')), t.append(e)));
                for (var u = 0; u < a.length; u += 1) {
                    var v = a.eq(u),
                        f = u;
                    p && (f = parseInt(v.attr("data-swiper-slide-index"), 10));
                    var m = 90 * f,
                        g = Math.floor(m / 360);
                    o && ((m = -m), (g = Math.floor(-m / 360)));
                    var b = Math.max(Math.min(v[0].progress, 1), -1),
                        w = 0,
                        y = 0,
                        x = 0;
                    f % 4 == 0 ? ((w = 4 * -g * l), (x = 0)) : (f - 1) % 4 == 0 ? ((w = 0), (x = 4 * -g * l)) : (f - 2) % 4 == 0 ? ((w = l + 4 * g * l), (x = l)) : (f - 3) % 4 == 0 && ((w = -l), (x = 3 * l + 4 * l * g)),
                        o && (w = -w),
                        h || ((y = w), (w = 0));
                    var E = "rotateX(" + (h ? 0 : -m) + "deg) rotateY(" + (h ? m : 0) + "deg) translate3d(" + w + "px, " + y + "px, " + x + "px)";
                    if ((b <= 1 && b > -1 && ((c = 90 * f + 90 * b), o && (c = 90 * -f - 90 * b)), v.transform(E), d.slideShadows)) {
                        var T = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top"),
                            S = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                        0 === T.length && ((T = s('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>')), v.append(T)),
                            0 === S.length && ((S = s('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>')), v.append(S)),
                            T.length && (T[0].style.opacity = Math.max(-b, 0)),
                            S.length && (S[0].style.opacity = Math.max(b, 0));
                    }
                }
                if (
                    (i.css({ "-webkit-transform-origin": "50% 50% -" + l / 2 + "px", "-moz-transform-origin": "50% 50% -" + l / 2 + "px", "-ms-transform-origin": "50% 50% -" + l / 2 + "px", "transform-origin": "50% 50% -" + l / 2 + "px" }),
                    d.shadow)
                )
                    if (h) e.transform("translate3d(0px, " + (r / 2 + d.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                    else {
                        var C = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
                            M = 1.5 - (Math.sin((2 * C * Math.PI) / 360) / 2 + Math.cos((2 * C * Math.PI) / 360) / 2),
                            z = d.shadowScale,
                            k = d.shadowScale / M,
                            $ = d.shadowOffset;
                        e.transform("scale3d(" + z + ", 1, " + k + ") translate3d(0px, " + (n / 2 + $) + "px, " + -n / 2 / k + "px) rotateX(-90deg)");
                    }
                var L = P.isSafari || P.isUiWebView ? -l / 2 : 0;
                i.transform("translate3d(0px,0," + L + "px) rotateX(" + (this.isHorizontal() ? 0 : c) + "deg) rotateY(" + (this.isHorizontal() ? -c : 0) + "deg)");
            },
            setTransition: function (e) {
                var t = this.$el;
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
                    this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e);
            },
        },
        se = {
            setTranslate: function () {
                for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                    var a = e.eq(i),
                        r = a[0].progress;
                    this.params.flipEffect.limitRotation && (r = Math.max(Math.min(a[0].progress, 1), -1));
                    var n = -180 * r,
                        o = 0,
                        l = -a[0].swiperSlideOffset,
                        d = 0;
                    if ((this.isHorizontal() ? t && (n = -n) : ((d = l), (l = 0), (o = -n), (n = 0)), (a[0].style.zIndex = -Math.abs(Math.round(r)) + e.length), this.params.flipEffect.slideShadows)) {
                        var h = this.isHorizontal() ? a.find(".swiper-slide-shadow-left") : a.find(".swiper-slide-shadow-top"),
                            p = this.isHorizontal() ? a.find(".swiper-slide-shadow-right") : a.find(".swiper-slide-shadow-bottom");
                        0 === h.length && ((h = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>')), a.append(h)),
                            0 === p.length && ((p = s('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>')), a.append(p)),
                            h.length && (h[0].style.opacity = Math.max(-r, 0)),
                            p.length && (p[0].style.opacity = Math.max(r, 0));
                    }
                    a.transform("translate3d(" + l + "px, " + d + "px, 0px) rotateX(" + o + "deg) rotateY(" + n + "deg)");
                }
            },
            setTransition: function (e) {
                var t = this,
                    i = t.slides,
                    s = t.activeIndex,
                    a = t.$wrapperEl;
                if ((i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e)) {
                    var r = !1;
                    i.eq(s).transitionEnd(function () {
                        if (!r && t && !t.destroyed) {
                            (r = !0), (t.animating = !1);
                            for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1) a.trigger(e[i]);
                        }
                    });
                }
            },
        },
        ae = {
            setTranslate: function () {
                for (
                    var e = this.width,
                        t = this.height,
                        i = this.slides,
                        a = this.$wrapperEl,
                        r = this.slidesSizesGrid,
                        n = this.params.coverflowEffect,
                        o = this.isHorizontal(),
                        l = this.translate,
                        h = o ? e / 2 - l : t / 2 - l,
                        p = o ? n.rotate : -n.rotate,
                        c = n.depth,
                        u = 0,
                        v = i.length;
                    u < v;
                    u += 1
                ) {
                    var f = i.eq(u),
                        m = r[u],
                        g = ((h - f[0].swiperSlideOffset - m / 2) / m) * n.modifier,
                        b = o ? p * g : 0,
                        w = o ? 0 : p * g,
                        y = -c * Math.abs(g),
                        x = o ? 0 : n.stretch * g,
                        E = o ? n.stretch * g : 0;
                    Math.abs(E) < 0.001 && (E = 0), Math.abs(x) < 0.001 && (x = 0), Math.abs(y) < 0.001 && (y = 0), Math.abs(b) < 0.001 && (b = 0), Math.abs(w) < 0.001 && (w = 0);
                    var T = "translate3d(" + E + "px," + x + "px," + y + "px)  rotateX(" + w + "deg) rotateY(" + b + "deg)";
                    if ((f.transform(T), (f[0].style.zIndex = 1 - Math.abs(Math.round(g))), n.slideShadows)) {
                        var S = o ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
                            C = o ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
                        0 === S.length && ((S = s('<div class="swiper-slide-shadow-' + (o ? "left" : "top") + '"></div>')), f.append(S)),
                            0 === C.length && ((C = s('<div class="swiper-slide-shadow-' + (o ? "right" : "bottom") + '"></div>')), f.append(C)),
                            S.length && (S[0].style.opacity = g > 0 ? g : 0),
                            C.length && (C[0].style.opacity = -g > 0 ? -g : 0);
                    }
                }
                (d.pointerEvents || d.prefixedPointerEvents) && (a[0].style.perspectiveOrigin = h + "px 50%");
            },
            setTransition: function (e) {
                this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
            },
        },
        re = [
            D,
            O,
            A,
            H,
            B,
            X,
            V,
            {
                name: "mousewheel",
                params: { mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarged: "container" } },
                create: function () {
                    l.extend(this, {
                        mousewheel: {
                            enabled: !1,
                            enable: R.enable.bind(this),
                            disable: R.disable.bind(this),
                            handle: R.handle.bind(this),
                            handleMouseEnter: R.handleMouseEnter.bind(this),
                            handleMouseLeave: R.handleMouseLeave.bind(this),
                            lastScrollTime: l.now(),
                        },
                    });
                },
                on: {
                    init: function () {
                        this.params.mousewheel.enabled && this.mousewheel.enable();
                    },
                    destroy: function () {
                        this.mousewheel.enabled && this.mousewheel.disable();
                    },
                },
            },
            {
                name: "navigation",
                params: { navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock" } },
                create: function () {
                    l.extend(this, { navigation: { init: F.init.bind(this), update: F.update.bind(this), destroy: F.destroy.bind(this) } });
                },
                on: {
                    init: function () {
                        this.navigation.init(), this.navigation.update();
                    },
                    toEdge: function () {
                        this.navigation.update();
                    },
                    fromEdge: function () {
                        this.navigation.update();
                    },
                    destroy: function () {
                        this.navigation.destroy();
                    },
                    click: function (e) {
                        var t = this.navigation,
                            i = t.$nextEl,
                            a = t.$prevEl;
                        !this.params.navigation.hideOnClick || s(e.target).is(a) || s(e.target).is(i) || (i && i.toggleClass(this.params.navigation.hiddenClass), a && a.toggleClass(this.params.navigation.hiddenClass));
                    },
                },
            },
            {
                name: "pagination",
                params: {
                    pagination: {
                        el: null,
                        bulletElement: "span",
                        clickable: !1,
                        hideOnClick: !1,
                        renderBullet: null,
                        renderProgressbar: null,
                        renderFraction: null,
                        renderCustom: null,
                        type: "bullets",
                        dynamicBullets: !1,
                        dynamicMainBullets: 1,
                        bulletClass: "swiper-pagination-bullet",
                        bulletActiveClass: "swiper-pagination-bullet-active",
                        modifierClass: "swiper-pagination-",
                        currentClass: "swiper-pagination-current",
                        totalClass: "swiper-pagination-total",
                        hiddenClass: "swiper-pagination-hidden",
                        progressbarFillClass: "swiper-pagination-progressbar-fill",
                        clickableClass: "swiper-pagination-clickable",
                        lockClass: "swiper-pagination-lock",
                    },
                },
                create: function () {
                    l.extend(this, { pagination: { init: W.init.bind(this), render: W.render.bind(this), update: W.update.bind(this), destroy: W.destroy.bind(this), dynamicBulletIndex: 0 } });
                },
                on: {
                    init: function () {
                        this.pagination.init(), this.pagination.render(), this.pagination.update();
                    },
                    activeIndexChange: function () {
                        (this.params.loop || void 0 === this.snapIndex) && this.pagination.update();
                    },
                    snapIndexChange: function () {
                        this.params.loop || this.pagination.update();
                    },
                    slidesLengthChange: function () {
                        this.params.loop && (this.pagination.render(), this.pagination.update());
                    },
                    snapGridLengthChange: function () {
                        this.params.loop || (this.pagination.render(), this.pagination.update());
                    },
                    destroy: function () {
                        this.pagination.destroy();
                    },
                    click: function (e) {
                        this.params.pagination.el &&
                            this.params.pagination.hideOnClick &&
                            this.pagination.$el.length > 0 &&
                            !s(e.target).hasClass(this.params.pagination.bulletClass) &&
                            this.pagination.$el.toggleClass(this.params.pagination.hiddenClass);
                    },
                },
            },
            {
                name: "scrollbar",
                params: { scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag" } },
                create: function () {
                    l.extend(this, {
                        scrollbar: {
                            init: q.init.bind(this),
                            destroy: q.destroy.bind(this),
                            updateSize: q.updateSize.bind(this),
                            setTranslate: q.setTranslate.bind(this),
                            setTransition: q.setTransition.bind(this),
                            enableDraggable: q.enableDraggable.bind(this),
                            disableDraggable: q.disableDraggable.bind(this),
                            setDragPosition: q.setDragPosition.bind(this),
                            onDragStart: q.onDragStart.bind(this),
                            onDragMove: q.onDragMove.bind(this),
                            onDragEnd: q.onDragEnd.bind(this),
                            isTouched: !1,
                            timeout: null,
                            dragTimeout: null,
                        },
                    });
                },
                on: {
                    init: function () {
                        this.scrollbar.init(), this.scrollbar.updateSize(), this.scrollbar.setTranslate();
                    },
                    update: function () {
                        this.scrollbar.updateSize();
                    },
                    resize: function () {
                        this.scrollbar.updateSize();
                    },
                    observerUpdate: function () {
                        this.scrollbar.updateSize();
                    },
                    setTranslate: function () {
                        this.scrollbar.setTranslate();
                    },
                    setTransition: function (e) {
                        this.scrollbar.setTransition(e);
                    },
                    destroy: function () {
                        this.scrollbar.destroy();
                    },
                },
            },
            {
                name: "parallax",
                params: { parallax: { enabled: !1 } },
                create: function () {
                    l.extend(this, { parallax: { setTransform: j.setTransform.bind(this), setTranslate: j.setTranslate.bind(this), setTransition: j.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        this.params.parallax.enabled && (this.params.watchSlidesProgress = !0);
                    },
                    init: function () {
                        this.params.parallax && this.parallax.setTranslate();
                    },
                    setTranslate: function () {
                        this.params.parallax && this.parallax.setTranslate();
                    },
                    setTransition: function (e) {
                        this.params.parallax && this.parallax.setTransition(e);
                    },
                },
            },
            {
                name: "zoom",
                params: { zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } },
                create: function () {
                    var e = this,
                        t = {
                            enabled: !1,
                            scale: 1,
                            currentScale: 1,
                            isScaling: !1,
                            gesture: { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 },
                            image: {
                                isTouched: void 0,
                                isMoved: void 0,
                                currentX: void 0,
                                currentY: void 0,
                                minX: void 0,
                                minY: void 0,
                                maxX: void 0,
                                maxY: void 0,
                                width: void 0,
                                height: void 0,
                                startX: void 0,
                                startY: void 0,
                                touchesStart: {},
                                touchesCurrent: {},
                            },
                            velocity: { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 },
                        };
                    "onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out".split(" ").forEach(function (i) {
                        t[i] = K[i].bind(e);
                    }),
                        l.extend(e, { zoom: t });
                },
                on: {
                    init: function () {
                        this.params.zoom.enabled && this.zoom.enable();
                    },
                    destroy: function () {
                        this.zoom.disable();
                    },
                    touchStart: function (e) {
                        this.zoom.enabled && this.zoom.onTouchStart(e);
                    },
                    touchEnd: function (e) {
                        this.zoom.enabled && this.zoom.onTouchEnd(e);
                    },
                    doubleTap: function (e) {
                        this.params.zoom.enabled && this.zoom.enabled && this.params.zoom.toggle && this.zoom.toggle(e);
                    },
                    transitionEnd: function () {
                        this.zoom.enabled && this.params.zoom.enabled && this.zoom.onTransitionEnd();
                    },
                },
            },
            {
                name: "lazy",
                params: {
                    lazy: {
                        enabled: !1,
                        loadPrevNext: !1,
                        loadPrevNextAmount: 1,
                        loadOnTransitionStart: !1,
                        elementClass: "swiper-lazy",
                        loadingClass: "swiper-lazy-loading",
                        loadedClass: "swiper-lazy-loaded",
                        preloaderClass: "swiper-lazy-preloader",
                    },
                },
                create: function () {
                    l.extend(this, { lazy: { initialImageLoaded: !1, load: U.load.bind(this), loadInSlide: U.loadInSlide.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        this.params.lazy.enabled && this.params.preloadImages && (this.params.preloadImages = !1);
                    },
                    init: function () {
                        this.params.lazy.enabled && !this.params.loop && 0 === this.params.initialSlide && this.lazy.load();
                    },
                    scroll: function () {
                        this.params.freeMode && !this.params.freeModeSticky && this.lazy.load();
                    },
                    resize: function () {
                        this.params.lazy.enabled && this.lazy.load();
                    },
                    scrollbarDragMove: function () {
                        this.params.lazy.enabled && this.lazy.load();
                    },
                    transitionStart: function () {
                        this.params.lazy.enabled && (this.params.lazy.loadOnTransitionStart || (!this.params.lazy.loadOnTransitionStart && !this.lazy.initialImageLoaded)) && this.lazy.load();
                    },
                    transitionEnd: function () {
                        this.params.lazy.enabled && !this.params.lazy.loadOnTransitionStart && this.lazy.load();
                    },
                },
            },
            {
                name: "controller",
                params: { controller: { control: void 0, inverse: !1, by: "slide" } },
                create: function () {
                    l.extend(this, {
                        controller: { control: this.params.controller.control, getInterpolateFunction: _.getInterpolateFunction.bind(this), setTranslate: _.setTranslate.bind(this), setTransition: _.setTransition.bind(this) },
                    });
                },
                on: {
                    update: function () {
                        this.controller.control && this.controller.spline && ((this.controller.spline = void 0), delete this.controller.spline);
                    },
                    resize: function () {
                        this.controller.control && this.controller.spline && ((this.controller.spline = void 0), delete this.controller.spline);
                    },
                    observerUpdate: function () {
                        this.controller.control && this.controller.spline && ((this.controller.spline = void 0), delete this.controller.spline);
                    },
                    setTranslate: function (e, t) {
                        this.controller.control && this.controller.setTranslate(e, t);
                    },
                    setTransition: function (e, t) {
                        this.controller.control && this.controller.setTransition(e, t);
                    },
                },
            },
            {
                name: "a11y",
                params: {
                    a11y: {
                        enabled: !0,
                        notificationClass: "swiper-notification",
                        prevSlideMessage: "Previous slide",
                        nextSlideMessage: "Next slide",
                        firstSlideMessage: "This is the first slide",
                        lastSlideMessage: "This is the last slide",
                        paginationBulletMessage: "Go to slide {{index}}",
                    },
                },
                create: function () {
                    var e = this;
                    l.extend(e, { a11y: { liveRegion: s('<span class="' + e.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>') } }),
                        Object.keys(Z).forEach(function (t) {
                            e.a11y[t] = Z[t].bind(e);
                        });
                },
                on: {
                    init: function () {
                        this.params.a11y.enabled && (this.a11y.init(), this.a11y.updateNavigation());
                    },
                    toEdge: function () {
                        this.params.a11y.enabled && this.a11y.updateNavigation();
                    },
                    fromEdge: function () {
                        this.params.a11y.enabled && this.a11y.updateNavigation();
                    },
                    paginationUpdate: function () {
                        this.params.a11y.enabled && this.a11y.updatePagination();
                    },
                    destroy: function () {
                        this.params.a11y.enabled && this.a11y.destroy();
                    },
                },
            },
            {
                name: "history",
                params: { history: { enabled: !1, replaceState: !1, key: "slides" } },
                create: function () {
                    l.extend(this, {
                        history: { init: Q.init.bind(this), setHistory: Q.setHistory.bind(this), setHistoryPopState: Q.setHistoryPopState.bind(this), scrollToSlide: Q.scrollToSlide.bind(this), destroy: Q.destroy.bind(this) },
                    });
                },
                on: {
                    init: function () {
                        this.params.history.enabled && this.history.init();
                    },
                    destroy: function () {
                        this.params.history.enabled && this.history.destroy();
                    },
                    transitionEnd: function () {
                        this.history.initialized && this.history.setHistory(this.params.history.key, this.activeIndex);
                    },
                },
            },
            {
                name: "hash-navigation",
                params: { hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } },
                create: function () {
                    l.extend(this, { hashNavigation: { initialized: !1, init: J.init.bind(this), destroy: J.destroy.bind(this), setHash: J.setHash.bind(this), onHashCange: J.onHashCange.bind(this) } });
                },
                on: {
                    init: function () {
                        this.params.hashNavigation.enabled && this.hashNavigation.init();
                    },
                    destroy: function () {
                        this.params.hashNavigation.enabled && this.hashNavigation.destroy();
                    },
                    transitionEnd: function () {
                        this.hashNavigation.initialized && this.hashNavigation.setHash();
                    },
                },
            },
            {
                name: "autoplay",
                params: { autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1 } },
                create: function () {
                    l.extend(this, { autoplay: { running: !1, paused: !1, run: ee.run.bind(this), start: ee.start.bind(this), stop: ee.stop.bind(this), pause: ee.pause.bind(this) } });
                },
                on: {
                    init: function () {
                        this.params.autoplay.enabled && this.autoplay.start();
                    },
                    beforeTransitionStart: function (e, t) {
                        this.autoplay.running && (t || !this.params.autoplay.disableOnInteraction ? this.autoplay.pause(e) : this.autoplay.stop());
                    },
                    sliderFirstMove: function () {
                        this.autoplay.running && (this.params.autoplay.disableOnInteraction ? this.autoplay.stop() : this.autoplay.pause());
                    },
                    destroy: function () {
                        this.autoplay.running && this.autoplay.stop();
                    },
                },
            },
            {
                name: "effect-fade",
                params: { fadeEffect: { crossFade: !1 } },
                create: function () {
                    l.extend(this, { fadeEffect: { setTranslate: te.setTranslate.bind(this), setTransition: te.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        if ("fade" === this.params.effect) {
                            this.classNames.push(this.params.containerModifierClass + "fade");
                            var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                            l.extend(this.params, e), l.extend(this.originalParams, e);
                        }
                    },
                    setTranslate: function () {
                        "fade" === this.params.effect && this.fadeEffect.setTranslate();
                    },
                    setTransition: function (e) {
                        "fade" === this.params.effect && this.fadeEffect.setTransition(e);
                    },
                },
            },
            {
                name: "effect-cube",
                params: { cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: 0.94 } },
                create: function () {
                    l.extend(this, { cubeEffect: { setTranslate: ie.setTranslate.bind(this), setTransition: ie.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        if ("cube" === this.params.effect) {
                            this.classNames.push(this.params.containerModifierClass + "cube"), this.classNames.push(this.params.containerModifierClass + "3d");
                            var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 };
                            l.extend(this.params, e), l.extend(this.originalParams, e);
                        }
                    },
                    setTranslate: function () {
                        "cube" === this.params.effect && this.cubeEffect.setTranslate();
                    },
                    setTransition: function (e) {
                        "cube" === this.params.effect && this.cubeEffect.setTransition(e);
                    },
                },
            },
            {
                name: "effect-flip",
                params: { flipEffect: { slideShadows: !0, limitRotation: !0 } },
                create: function () {
                    l.extend(this, { flipEffect: { setTranslate: se.setTranslate.bind(this), setTransition: se.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        if ("flip" === this.params.effect) {
                            this.classNames.push(this.params.containerModifierClass + "flip"), this.classNames.push(this.params.containerModifierClass + "3d");
                            var e = { slidesPerView: 1, slidesPerColumn: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !0 };
                            l.extend(this.params, e), l.extend(this.originalParams, e);
                        }
                    },
                    setTranslate: function () {
                        "flip" === this.params.effect && this.flipEffect.setTranslate();
                    },
                    setTransition: function (e) {
                        "flip" === this.params.effect && this.flipEffect.setTransition(e);
                    },
                },
            },
            {
                name: "effect-coverflow",
                params: { coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: !0 } },
                create: function () {
                    l.extend(this, { coverflowEffect: { setTranslate: ae.setTranslate.bind(this), setTransition: ae.setTransition.bind(this) } });
                },
                on: {
                    beforeInit: function () {
                        "coverflow" === this.params.effect &&
                            (this.classNames.push(this.params.containerModifierClass + "coverflow"),
                            this.classNames.push(this.params.containerModifierClass + "3d"),
                            (this.params.watchSlidesProgress = !0),
                            (this.originalParams.watchSlidesProgress = !0));
                    },
                    setTranslate: function () {
                        "coverflow" === this.params.effect && this.coverflowEffect.setTranslate();
                    },
                    setTransition: function (e) {
                        "coverflow" === this.params.effect && this.coverflowEffect.setTransition(e);
                    },
                },
            },
        ];
    return void 0 === I.use && ((I.use = I.Class.use), (I.installModule = I.Class.installModule)), I.use(re), I;
});
!(function (e) {
    e(".js-modal-albo").magnificPopup({ type: "inline", fixedContentPos: !1, fixedBgPos: !0, overflowY: "auto", closeBtnInside: !1, preloader: !1, midClick: !0, removalDelay: 300, mainClass: "mfp-slide-bottom" }),
        e(document).on("click", ".popup-modal-dismiss", function (n) {
            n.preventDefault(), e.magnificPopup.close();
        });
})(jQuery),
    (function (e, n) {
        var o = n.querySelector(".js-filter-region"),
            i = n.querySelector(".js-filter-province");
        o &&
            i &&
            e.filterProvinces &&
            o.addEventListener("change", function () {
                i.innerHTML = (function (n) {
                    n = parseInt(n, 10);
                    var o = '<option value="">Qualsiasi</option>';
                    return (
                        e.filterProvinces.forEach(function (e) {
                            (n && n !== parseInt(e.region, 10)) || (o += '<option value="' + e.id + '">' + e.name + "</option>");
                        }),
                        o
                    );
                })(this.value);
            });
    })(window, document);
!(function (e) {
    "use strict";
    var t = e.calculator;
    if (t) {
        var o = e.querySelector(".c-app-results");
        t.querySelectorAll("[checked]").forEach(n),
            t.querySelectorAll("[data-gender-class]").forEach(function (e) {
                (e.originalClassName = e.className), i(e);
            }),
            t.querySelectorAll("[data-gender-text]").forEach(l),
            t.querySelectorAll("img[data-gender-src]").forEach(a),
            t.querySelectorAll("input[data-gender-value]").forEach(s),
            t.addEventListener("submit", function (i) {
                var l;
                i.preventDefault(),
                    (l = !0),
                    ["height", "age", "weight", "gender", "lifestyle", "fm", "target"].forEach(function (e) {
                        r(t[e]) || (l = !1);
                    }),
                    l &&
                        (function () {
                            console.clear();
                            var i,
                                l = parseInt(t.height.value, 10),
                                a = parseInt(t.age.value, 10),
                                s = parseInt(t.weight.value, 10),
                                n = t.gender.value,
                                r = t.lifestyle.value,
                                c = t.person.value,
                                h = parseInt(t.fm.value, 10),
                                p = (s * (100 - h)) / 100,
                                d = t.target.value;
                            console.log("Altezza: " + l + " cm"),
                                console.log("Et\xe0: " + a + " anni"),
                                console.log("Peso: " + s + " Kg"),
                                console.log("Sesso: " + n),
                                console.log("Attivit\xe0: " + r),
                                console.log("Struttura corporea: " + c),
                                console.log("Massa grassa: " + h + "%"),
                                console.log("Obiettivo: " + d),
                                console.log("Massa magra: " + p + " Kg"),
                                ("male" === n && h <= 15) || ("female" === n && h <= 20)
                                    ? ((i = 500 + 22 * p), console.log("BMR: " + i + " kcal (fino al 15% di massa grassa, Cunningham)"))
                                    : ((i = "male" === n ? 10 * s + 6.25 * l - 5 * a + 5 : 10 * s + 6.25 * l - 5 * a - 161), console.log("BMR: " + i + " kcal (sopra il 15% di massa grassa, Mifflin St. Jeor)")),
                                (i *= { inactive: { male: 1.2, female: 1.1 }, lowActive: { male: 1.4, female: 1.3 }, active: { male: 1.6, female: 1.5 }, veryActive: { male: 1.8, female: 1.7 }, pro: { male: 2, female: 1.9 } }[r][n]),
                                console.log("TDEE: " + i + " kcal");
                            var u = {
                                aggressiveWeightLoss: { male: -750, female: -500 },
                                moderateWeightLoss: { male: -500, female: -300 },
                                maintenance: { male: 0, female: 0 },
                                moderateMuscle: { male: 350, female: 250 },
                                aggressiveMuscle: { male: 550, female: 450 },
                            };
                            u[d] && u[d][n] && (i += u[d][n]), console.log("calorie definitive: " + i + " kcal"), (i = Math.floor(i)), console.log("calorie giornaliere arrotondate per difetto: " + i + " kcal");
                            var g = {
                                    protein: {
                                        ectomorph: { male: { weightLoss: 2.5, maintenance: 2, muscle: 2.5 }, female: { weightLoss: 2.2, maintenance: 1.8, muscle: 2.2 } },
                                        mesomorph: { male: { weightLoss: 2.5, maintenance: 2, muscle: 2.2 }, female: { weightLoss: 2, maintenance: 1.8, muscle: 2 } },
                                        endomorph: { male: { weightLoss: 2.2, maintenance: 2, muscle: 2.2 }, female: { weightLoss: 2, maintenance: 1.8, muscle: 2 } },
                                    },
                                    fat: { weightLoss: { min: 0.5, max: 1 }, maintenance: { min: 0.6, max: 1.2 }, muscle: { min: 0.8, max: 1.5 } },
                                },
                                f = { aggressiveWeightLoss: "weightLoss", moderateWeightLoss: "weightLoss", maintenance: "maintenance", moderateMuscle: "muscle", aggressiveMuscle: "muscle" }[d],
                                v = g.protein[c][n][f] * s,
                                y = 4 * v,
                                b = g.fat[f].min * s,
                                w = g.fat[f].max * s,
                                S = 9 * b,
                                E = 9 * w,
                                L = i - E - y,
                                q = i - S - y,
                                I = L / 4,
                                A = q / 4;
                            console.log(`Proteine: ${v} gr / ${y} kcal`),
                                console.log(`Grassi: ${b} / ${w} gr \u2013 ${S} / ${E} kcal`),
                                console.log(`Carboidrati: ${I} / ${A} gr \u2013 ${L} / ${q} kcal`),
                                m(e.querySelector(".js-result-daily"), i),
                                m(e.querySelector(".js-result-weekly"), 7 * i),
                                m(e.querySelector(".js-protein-gr"), v),
                                m(e.querySelector(".js-protein-cal"), y),
                                m(e.querySelector(".js-fat-gr-min"), b),
                                m(e.querySelector(".js-fat-gr-max"), w),
                                m(e.querySelector(".js-fat-cal-min"), S),
                                m(e.querySelector(".js-fat-cal-max"), E),
                                m(e.querySelector(".js-carbo-gr-min"), I),
                                m(e.querySelector(".js-carbo-gr-max"), A),
                                m(e.querySelector(".js-carbo-cal-min"), L),
                                m(e.querySelector(".js-carbo-cal-max"), q),
                                Util.addClass(o, "-show"),
                                (window.location.hash = "anchor-app-results");
                        })();
            }),
            t.addEventListener("change", function (e) {
                "radio" === e.target.type && n(e.target);
            }),
            t.addEventListener("change", function (e) {
                "gender" === e.target.name &&
                    (t.querySelectorAll("[data-gender-class]").forEach(i),
                    t.querySelectorAll("[data-gender-text]").forEach(l),
                    t.querySelectorAll("img[data-gender-src]").forEach(a),
                    t.querySelectorAll("input[data-gender-value]").forEach(s));
            }),
            t.addEventListener("change", function (e) {
                r(e.target), Util.removeClass(o, "-show");
            });
    }
    function i(e) {
        var o = JSON.parse(e.dataset.genderClass),
            i = e.originalClassName;
        o[t.gender.value] && (i += " " + o[t.gender.value]), (e.className = i);
    }
    function l(e) {
        var o = JSON.parse(e.dataset.genderText);
        e.innerText = o[t.gender.value];
    }
    function a(e) {
        var o = JSON.parse(e.dataset.genderSrc);
        o[t.gender.value] && (e.src = o[t.gender.value]);
    }
    function s(e) {
        var o = JSON.parse(e.dataset.genderValue);
        e.value = o[t.gender.value] || "";
    }
    function n(e) {
        e
            .closest(".c-app-form__field")
            .querySelectorAll("label")
            .forEach(function (e) {
                Util.removeClass(e, "-checked");
            }),
            Util.addClass(e.closest("label"), "-checked");
    }
    function r(e) {
        var t = e.value;
        return e instanceof NodeList && (e = e[0]), ("range" !== e.type && "number" !== e.type) || (t = parseInt(t, 10)), Util.toggleClass(e.closest(".c-app-form__field"), "c-app-form__field--error", !t), !!t;
    }
    function c(e) {
        return Math.round(e).toLocaleString(void 0);
    }
    function m(e, t) {
        var o,
            i = 0,
            l = t / 50;
        o = setInterval(function () {
            if (i >= t) return clearInterval(o), void (e.innerText = c(t));
            (e.innerText = c(i)), (i += l);
        }, 30);
    }
})(document),
    (function () {
        var e = function (e) {
            (this.element = e),
                (this.tooltip = !1),
                (this.tooltipIntervalId = !1),
                (this.tooltipContent = this.element.getAttribute("title")),
                (this.tooltipPosition = this.element.getAttribute("data-tooltip-position") ? this.element.getAttribute("data-tooltip-position") : "top"),
                (this.tooltipId = "js-tooltip-element"),
                (this.tooltipDelay = 300),
                (this.tooltipDelta = 10),
                this.initTooltip();
        };
        (e.prototype.initTooltip = function () {
            this.element.removeAttribute("title"), this.element.setAttribute("tabindex", "0"), this.element.addEventListener("mouseenter", this), this.element.addEventListener("focus", this);
        }),
            (e.prototype.removeTooltipEvents = function () {
                this.element.removeEventListener("mouseleave", this), this.element.removeEventListener("blur", this);
            }),
            (e.prototype.handleEvent = function (e) {
                switch (e.type) {
                    case "mouseenter":
                    case "focus":
                        this.showTooltip(e);
                        break;
                    case "mouseleave":
                    case "blur":
                        this.hideTooltip();
                }
            }),
            (e.prototype.showTooltip = function (e) {
                var t = this;
                this.tooltipIntervalId ||
                    (this.element.addEventListener("mouseleave", this),
                    this.element.addEventListener("blur", this),
                    (this.tooltipIntervalId = setTimeout(function () {
                        t.createTooltip();
                    }, t.tooltipDelay)));
            }),
            (e.prototype.createTooltip = function (e) {
                (this.tooltip = document.getElementById(this.tooltipId)),
                    this.tooltip || ((this.tooltip = document.createElement("div")), document.body.appendChild(this.tooltip)),
                    Util.setAttributes(this.tooltip, { id: this.tooltipId, class: "c-tooltip c-tooltip--is-hidden js-tooltip", role: "tooltip" }),
                    (this.tooltip.innerHTML = this.tooltipContent),
                    this.element.setAttribute("aria-describedby", this.tooltipId),
                    this.placeTooltip(),
                    Util.removeClass(this.tooltip, "c-tooltip--is-hidden");
            }),
            (e.prototype.placeTooltip = function () {
                var e = [this.tooltip.offsetHeight, this.tooltip.offsetWidth],
                    t = this.element.getBoundingClientRect(),
                    o = [],
                    i = window.scrollY || window.pageYOffset;
                (o.top = [t.top - e[0] - this.tooltipDelta + i, t.right / 2 + t.left / 2 - e[1] / 2]),
                    (o.bottom = [t.bottom + this.tooltipDelta + i, t.right / 2 + t.left / 2 - e[1] / 2]),
                    (o.left = [t.top / 2 + t.bottom / 2 - e[0] / 2 + i, t.left - e[1] - this.tooltipDelta]),
                    (o.right = [t.top / 2 + t.bottom / 2 - e[0] / 2 + i, t.right + this.tooltipDelta]);
                var l = this.tooltipPosition;
                "top" === l && o.top[0] < i
                    ? (l = "bottom")
                    : "bottom" === l && o.bottom[0] + this.tooltipDelta + e[0] > i + window.innerHeight
                    ? (l = "top")
                    : "left" === l && o.left[1] < 0
                    ? (l = "right")
                    : "right" === l && o.right[1] + e[1] > window.innerWidth && (l = "left"),
                    ("top" !== l && "bottom" !== l) || (o[l][1] < 0 && (o[l][1] = 0), o[l][1] + e[1] > window.innerWidth && (o[l][1] = window.innerWidth - e[1])),
                    (this.tooltip.style.top = o[l][0] + "px"),
                    (this.tooltip.style.left = o[l][1] + "px"),
                    Util.addClass(this.tooltip, "c-tooltip--" + l);
            }),
            (e.prototype.hideTooltip = function () {
                clearInterval(this.tooltipIntervalId), (this.tooltipIntervalId = !1), this.tooltip && (this.removeTooltip(), this.removeTooltipEvents());
            }),
            (e.prototype.removeTooltip = function (e) {
                Util.addClass(this.tooltip, "c-tooltip--is-hidden"), (this.tooltip = !1), this.element.removeAttribute("aria-describedby");
            });
        var t = document.getElementsByClassName("js-tooltip-trigger");
        if (t.length > 0)
            for (var o = 0; o < t.length; o++)
                !(function (o) {
                    new e(t[o]);
                })(o);
    })();
!(function (e) {
    "use strict";
    var o, a;
    if (
        ("function" == typeof onCookiePolicyAccepted &&
            window.onCookiePolicyAccepted(function () {
                "undefined" != typeof fbAppId &&
                    e(".js-share").social({
                        template: {
                            "facebook-share":
                                '<a href="#" class="social__link"><span class="social__icon"><svg title="Facebook"><use xlink:href="#icons--facebook"></use></svg></span><span class="social__count"><span>{total}</span></span></a>',
                            twitter: '<a href="#" class="social__link"><span class="social__icon"><svg title="Twitter"><use xlink:href="#icons--twitter"></use></svg></span><span class="social__count"><span>TW</span></span></a>',
                            linkedin: '<a href="#" class="social__link"><span class="social__icon"><svg title="Google Plus"><use xlink:href="#icons--linkedin"></use></svg></span><span class="social__count"><span>IN</span></span></a>',
                        },
                        totalShareSelector: "#js-share-count",
                        lang: fbLang || "en_US",
                        facebookAppId: fbAppId || "",
                        countStatsUrl: templateUrl + "/share-count/count-stats.php",
                        enableTracking: { "facebook-share": 10, "facebook-comment": 10, twitter: 10, linkedin: 10 },
                    });
            }),
        e(".woocommerce-product-gallery__image").magnificPopup({
            delegate: "a",
            type: "image",
            closeOnContentClick: !1,
            closeBtnInside: !1,
            mainClass: "mfp-with-zoom mfp-img-mobile",
            image: { verticalFit: !0 },
            zoom: {
                enabled: !0,
                duration: 300,
                opener: function (e) {
                    return e.find("img");
                },
            },
        }),
        e(".js-videopopup").magnificPopup({
            type: "iframe",
            removalDelay: 500,
            mainClass: "mfp-fade",
            preloader: !1,
            fixedContentPos: !0,
            iframe: {
                patterns: {
                    youtube: { index: "youtube.com/", id: "v=", src: "//www.youtube.com/embed/%id%?autoplay=1&autohide=1&border=0&wmode=opaque&controls=1&showinfo=0&rel=0&hd=1" },
                    vimeo: { index: "vimeo.com/", id: "/", src: "//player.vimeo.com/video/%id%?autoplay=1" },
                },
            },
        }),
        new Swiper(".js-carousel", {
            slidesPerView: "auto",
            spaceBetween: "3.597%",
            freeMode: !0,
            watchSlidesVisibility: !0,
            pagination: { el: ".js-carouselPagination", clickable: !0 },
            preloadImages: !1,
            lazy: { elementClass: "lazyload" },
        }),
        (o = e(".js-videoimage")),
        (a = e(".js-videoiframe")),
        o.on("click", function () {
            var i = "";
            o.hide(),
                (i =
                    "vimeo" === a.data("source")
                        ? "https://player.vimeo.com/video/" + a.data("video-id") + "?autoplay=1&byline=0&badge=0&title=0&loop=1"
                        : "https://www.youtube.com/embed/" + a.data("video-id") + "?showinfo=0&rel=0&autoplay=1&autohide=1&color=white");
            var t = e('<iframe width="1200" height="675" src="' + i + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            t.attr("data-title", a.data("title")), a.html(t).show();
        }),
        "function" == typeof onCookiePolicyAccepted &&
            window.onCookiePolicyAccepted(function () {
                e("iframe")
                    .attr("src", function () {
                        return e(this).data("src");
                    })
                    .addClass("lazyload"),
                    e('.single__body iframe[data-src*="youtube"], .single__body iframe[data-src*="vimeo"]').parent().fitVids();
            }),
        document.querySelectorAll(".js-search-form").forEach(function (e) {
            e.addEventListener("submit", function (o) {
                o.preventDefault();
                var a = e.action + "search/" + encodeURI(e.s.value).replace(/%20/g, "+") + "/",
                    i = "";
                e.querySelectorAll("input, select, textarea").forEach(function (o) {
                    "s" !== o.name && (i += o.name + "=" + encodeURI(e[o.name].value) + "&");
                }),
                    i && (a += "?" + (i = i.substr(0, i.length - 1))),
                    (window.location = a);
            });
        }),
        "function" == typeof onCookiePolicyAccepted)
    ) {
        var i = e(".js-gmap");
        if (!i.length) return;
        window.onCookiePolicyAccepted(function () {
            var e,
                o,
                a,
                i = document,
                t = "script";
            (e = "//maps.googleapis.com/maps/api/js?key=" + gApiKey + "&v=3.exp&callback=initialize"), (o = i.createElement(t)), (a = i.getElementsByTagName(t)[0]), (o.src = e), (o.async = 1), a.parentNode.insertBefore(o, a);
        }),
            (window.initialize = function () {
                i.googlemaps();
            });
    }
})(jQuery);
!(function (e) {
    "use strict";
    if (jQuery(".js-mailchimp").length) {
        !(function (e, t, r) {
            (function () {
                var e = t.createElement("input");
                return (
                    "validity" in e &&
                    "badInput" in e.validity &&
                    "patternMismatch" in e.validity &&
                    "rangeOverflow" in e.validity &&
                    "rangeUnderflow" in e.validity &&
                    "stepMismatch" in e.validity &&
                    "tooLong" in e.validity &&
                    "tooShort" in e.validity &&
                    "typeMismatch" in e.validity &&
                    "valid" in e.validity &&
                    "valueMissing" in e.validity
                );
            })() ||
                Object.defineProperty(HTMLInputElement.prototype, "validity", {
                    get: function () {
                        return (function (e) {
                            var r = e.getAttribute("type") || input.nodeName.toLowerCase(),
                                i = "number" === r || "range" === r,
                                a = e.value.length,
                                n = !0;
                            if ("radio" === e.type && e.name) {
                                var o = t.getElementsByName(e.name);
                                if (o.length > 0)
                                    for (var s = 0; s < o.length; s++)
                                        if (o[s].form === e.form && e.checked) {
                                            e = o[s];
                                            break;
                                        }
                            }
                            var l = {
                                badInput: i && a > 0 && !/[-+]?[0-9]/.test(e.value),
                                patternMismatch: e.hasAttribute("pattern") && a > 0 && !1 === new RegExp(e.getAttribute("pattern")).test(e.value),
                                rangeOverflow: e.hasAttribute("max") && i && e.value > 0 && Number(e.value) > Number(e.getAttribute("max")),
                                rangeUnderflow: e.hasAttribute("min") && i && e.value > 0 && Number(e.value) < Number(e.getAttribute("min")),
                                stepMismatch: i && ((e.hasAttribute("step") && "any" !== e.getAttribute("step") && Number(e.value) % Number(e.getAttribute("step")) != 0) || (!e.hasAttribute("step") && Number(e.value) % 1 != 0)),
                                tooLong: e.hasAttribute("maxLength") && e.getAttribute("maxLength") > 0 && a > parseInt(e.getAttribute("maxLength"), 10),
                                tooShort: e.hasAttribute("minLength") && e.getAttribute("minLength") > 0 && a > 0 && a < parseInt(e.getAttribute("minLength"), 10),
                                typeMismatch:
                                    a > 0 &&
                                    (("email" === r &&
                                        !/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(
                                            e.value
                                        )) ||
                                        ("url" === r &&
                                            !/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,5})?(?:[\/?#]\S*)?$/.test(
                                                e.value
                                            ))),
                                valueMissing:
                                    e.hasAttribute("required") &&
                                    ((("checkbox" === r || "radio" === r) && !e.checked) || ("select" === r && e.options[e.selectedIndex].value < 1) || ("checkbox" !== r && "radio" !== r && "select" !== r && a < 1)),
                            };
                            for (var u in l)
                                if (l.hasOwnProperty(u) && l[u]) {
                                    n = !1;
                                    break;
                                }
                            return (l.valid = n), l;
                        })(this);
                    },
                    configurable: !0,
                });
        })(window, document);
        var t = function (e) {
                if (!e.disabled && "file" !== e.type && "reset" !== e.type && "submit" !== e.type && "button" !== e.type) {
                    var t = e.validity;
                    if (!t.valid) {
                        if (t.valueMissing) return "Perfavore compila questo campo.";
                        if (t.typeMismatch) {
                            if ("email" === e.type) return "Si prega di inserire un indirizzo email.";
                            if ("url" === e.type) return "Si prega di inserire un URL.";
                        }
                        return t.tooShort
                            ? "Si prega di allungare questo testo a " + e.getAttribute("minLength") + " caratteri o pi\xf9. Attualmente stai utilizzando " + e.value.length + " caratteri."
                            : t.tooLong
                            ? "Si prega di accorciare questo testo a " + e.getAttribute("maxLength") + " caratteri. Attualmente stai utilizzando " + e.value.length + " caratteri."
                            : t.patternMismatch
                            ? e.hasAttribute("title")
                                ? e.getAttribute("title")
                                : "Si prega di abbinare il formato richiesto."
                            : t.badInput
                            ? "Per favore inserisci un numero."
                            : t.stepMismatch
                            ? "Si prega di selezionare un valore valido."
                            : t.rangeOverflow
                            ? "Si prega di inserire un valore inferiore a " + e.getAttribute("max") + "."
                            : t.rangeUnderflow
                            ? "Si prega di inserire un valore superiore a " + e.getAttribute("min") + "."
                            : "Il valore inserito per questo campo non \xe8 valido.";
                    }
                }
            },
            r = function (e, t) {
                if ((Util.addClass(e, "error"), "radio" === e.type && e.name)) {
                    var r = e.form.querySelectorAll('[name="' + e.name + '"]');
                    if (r.length > 0) {
                        for (var i = 0; i < r.length; i++) Util.addClass(r[i], "error");
                        e = r[r.length - 1];
                    }
                }
                var a = e.id || e.name;
                if (a) {
                    var n,
                        o = e.form.querySelector(".error-message#error-for-" + a);
                    if (!o)
                        ((o = document.createElement("div")).className = "error-message"),
                            (o.id = "error-for-" + a),
                            ("radio" !== e.type && "checkbox" !== e.type) || ((n = e.form.querySelector('label[for="' + a + '"]') || e.parentNode) && n.parentNode.insertBefore(o, n.nextSibling)),
                            n || e.parentNode.insertBefore(o, e.nextSibling);
                    e.setAttribute("aria-describedby", "error-for-" + a), (o.innerHTML = t), (o.style.display = "block"), (o.style.visibility = "visible");
                }
            },
            i = function (e) {
                if ((Util.removeClass(e, "error"), e.removeAttribute("aria-describedby"), "radio" === e.type && e.name)) {
                    var t = e.form.querySelectorAll('[name="' + e.name + '"]');
                    if (t.length > 0) {
                        for (var r = 0; r < t.length; r++) Util.removeClass(t[r], "error");
                        e = t[t.length - 1];
                    }
                }
                var i = e.id || e.name;
                if (i) {
                    var a = e.form.querySelector(".error-message#error-for-" + i);
                    a && ((a.innerHTML = ""), (a.style.display = "none"), (a.style.visibility = "hidden"));
                }
            };
        window.displayMailChimpStatus = function (e) {
            if (e.result && e.msg && mcStatus) {
                if (((mcStatus.innerHTML = e.msg), "error" === e.result)) return Util.removeClass(mcStatus, "success-message"), void Util.addClass(mcStatus, "error-message");
                Util.removeClass(mcStatus, "error-message"), Util.addClass(mcStatus, "success-message");
            }
        };
        for (
            var a = function (e) {
                    var t = e.getAttribute("action");
                    (t = t.replace("/post?u=", "/post-json?u=")),
                        (t +=
                            (function (e) {
                                var t = "";
                                for (s = 0; s < e.elements.length; s++) {
                                    var r = e.elements[s];
                                    r.name &&
                                        !r.disabled &&
                                        "file" !== r.type &&
                                        "reset" !== r.type &&
                                        "submit" !== r.type &&
                                        "button" !== r.type &&
                                        (("checkbox" !== r.type && "radio" !== r.type) || r.checked) &&
                                        (t += "&" + encodeURIComponent(r.name) + "=" + encodeURIComponent(r.value));
                                }
                                return t;
                            })(e) + "&c=displayMailChimpStatus");
                    var r = window.document.getElementsByTagName("script")[0],
                        i = window.document.createElement("script");
                    (i.src = t),
                        (window.mcStatus = e.querySelector(".mc-status")),
                        r.parentNode.insertBefore(i, r),
                        (i.onload = function () {
                            this.remove();
                        });
                },
                n = function (e) {
                    for (var t = e.querySelectorAll(".gdpr"), a = !0, n = 0; n < t.length; n++) t[n].checked && (a = !1);
                    return a ? r(t[t.length - 1], "Seleziona almeno un\u2019opzione") : i(t[t.length - 1]), !a;
                },
                o = document.querySelectorAll(".validate"),
                s = 0;
            s < o.length;
            s++
        ) {
            var l = o[s];
            l.setAttribute("novalidate", !0),
                l.addEventListener(
                    "blur",
                    function (e) {
                        if (Util.hasClass(e.target.form, "validate")) {
                            var a = t(e.target);
                            a ? r(e.target, a) : i(e.target);
                        }
                    },
                    !0
                ),
                l.addEventListener("change", function (e) {
                    Util.hasClass(e.target, "gdpr") && n(e.target.form);
                }),
                l.addEventListener(
                    "submit",
                    function (e) {
                        if (Util.hasClass(e.target, "validate")) {
                            e.preventDefault();
                            for (var i, o, s = e.target.elements, l = 0; l < s.length; l++) (i = t(s[l])) && (r(s[l], i), o || (o = s[l]));
                            o && o.focus();
                            var u = n(e.target);
                            !o && u && a(e.target);
                        }
                    },
                    !1
                );
        }
    }
})();
!(function (t) {
    "use strict";
    t(".single-post__body table").each(function () {
        var e = t(this),
            n = e.find("thead th"),
            i = [];
        n.each(function () {
            i.push(t(this).text());
        }),
            e.find("tbody tr").each(function () {
                var e = t(this).find("td");
                i.map(function (t, n) {
                    e.eq(n).attr("data-label", t);
                });
            });
    });
    var e = t(".js-share-sticky");
    t(window).scroll(function () {
        var n = t(this).scrollTop();
        e.toggleClass("is-show", n >= 200);
    });
    var n = t(".js-sticky_column");
    function i() {
        Modernizr.mq("(min-width: 900px)") ? n.stick_in_parent({ parent: ".js-sticky_parent", offset_top: 60 }) : n.trigger("sticky_kit:detach");
    }
    i();
    var c = debounce(function () {
        i();
    }, 250);
    window.addEventListener("resize", c);
    var o = t("#js-comment"),
        s = t("#js-comment-limit"),
        a = t("#js-comment-submit");
    s.text(700),
        a.hide(),
        o.bind("keyup", function () {
            var e = 700 - t(this).val().length;
            s.text(e), e > 0 && a.show();
        }),
        t(".js-accordion").accordion({ panelSelector: ".c-accordion__item", titleSelector: ".c-accordion__header", contentSelector: ".c-accordion__content", activeClass: "is-open" });
})(jQuery);
!(function (e, i) {
    "use strict";
    var n;
    (n = e(".js-submenu")),
        e('<svg class="submenu__accordion"><use xlink:href="#icons--chevron-right"></use></svg>').appendTo(n.find(".submenu__dropdown").children(".submenu__link")),
        n.find(".submenu__item--parent").addClass("submenu__item--open"),
        n.find(".submenu__item--active").addClass("submenu__item--open"),
        n.accordion({ panelSelector: ".submenu__dropdown", titleSelector: "> .submenu__link .submenu__accordion", contentSelector: ".submenu__sub", activeClass: "submenu__item--open" }),
        (function () {
            var n = { $window: e(window), $swiper: e(".js-mostviewed"), $swiperElements: e(".js-mostviewed, .swiper-wrapper, .swiper-slide") };
            if (n.$swiper.length) {
                var s,
                    t = {
                        swiper: !1,
                        setOrGetDevice: function (e) {
                            void 0 === e && (e = i.mq("only screen and (min-width: 1200px)") ? "desktop" : "mobile");
                            return e;
                        },
                        device: function () {
                            return t.setOrGetDevice();
                        },
                    },
                    r = {
                        init: function () {
                            r.swiper();
                        },
                        swiper: function () {
                            "desktop" !== t.device() || t.swiper
                                ? "mobile" === t.device() && t.swiper && (s.destroy(), (s = void 0), n.$swiperElements.removeAttr("style"), (t.swiper = !1))
                                : ((s = new Swiper(n.$swiper.get(0), {
                                      slidesPerView: 1,
                                      slidesPerColumn: 4,
                                      spaceBetween: 0,
                                      watchSlidesVisibility: !0,
                                      pagination: { el: ".js-mostviewedPagination", clickable: !0 },
                                      preloadImages: !1,
                                      lazy: { elementClass: "lazyload" },
                                  })),
                                  (t.swiper = !0));
                        },
                    };
                e(function () {
                    r.init();
                }),
                    n.$window.on("resize", function () {
                        var e = i.mq("only screen and (min-width: 1200px)") ? "desktop" : "mobile";
                        t.setOrGetDevice(e), r.init();
                    });
            }
        })();
})(jQuery, Modernizr);
svg4everybody(),
    (function (t) {
        "use strict";
        "function" == typeof onCookiePolicyAccepted &&
            window.onCookiePolicyAccepted(function () {
                t("iframe")
                    .attr("src", function () {
                        return t(this).data("src");
                    })
                    .addClass("lazyload");
            });
    })(jQuery),
    "function" == typeof onCookiePolicyAccepted &&
        window.onCookiePolicyAccepted(function () {
            "undefined" != typeof fbLang &&
                document.addEventListener("lazybeforeunveil", function (t) {
                    t.target.getAttribute("data-lazyfb") &&
                        ((window.fbAsyncInit = function () {
                            FB.init({ appId: fbAppId, autoLogAppEvents: !0, xfbml: !0, version: "v3.2" }), (fbApiInit = !0);
                        }),
                        loadScript("https://connect.facebook.net/" + fbLang + "/sdk.js"));
                });
        });
!(function (a) {
    "use strict";
    a(".variations_form").each(function () {
        var t = a(this).find("table.variations"),
            i = t.find("select"),
            e = a('<div class="subscription-variations" />');
        i.find("option").each(function () {
            var t = a(this);
            if (t.attr("value")) {
                var n = a(
                    '<div class="subscription-variations__item"><label><input type="radio" name="' +
                        i.attr("name") +
                        '" value="' +
                        t.attr("value") +
                        '"' +
                        (t.prop("selected") ? " checked>" : ">") +
                        "<span>" +
                        t.text() +
                        "</span></label></div>"
                );
                n.appendTo(e),
                    n.on("change", function () {
                        i.val(t.attr("value")).trigger("change");
                    });
            }
        }),
            e.insertAfter(t),
            t.hide();
    });
})(jQuery);
!(function (e) {
    var t, o, a;
    "function" == typeof define && define.amd && (define(e), (t = !0)),
        "object" == typeof exports && ((module.exports = e()), (t = !0)),
        t ||
            ((o = window.Cookies),
            ((a = window.Cookies = e()).noConflict = function () {
                return (window.Cookies = o), a;
            }));
})(function () {
    function f() {
        for (var e = 0, t = {}; e < arguments.length; e++) {
            var o = arguments[e];
            for (var a in o) t[a] = o[a];
        }
        return t;
    }
    return (function e(_) {
        function h(e, t, o) {
            if ("undefined" != typeof document) {
                if (1 < arguments.length) {
                    "number" == typeof (o = f({ path: "/" }, h.defaults, o)).expires && (o.expires = new Date(+new Date() + 864e5 * o.expires)), (o.expires = o.expires ? o.expires.toUTCString() : "");
                    try {
                        var a = JSON.stringify(t);
                        /^[\{\[]/.test(a) && (t = a);
                    } catch (e) {}
                    (t = _.write ? _.write(t, e) : encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)),
                        (e = encodeURIComponent(String(e))
                            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
                            .replace(/[\(\)]/g, escape));
                    var s = "";
                    for (var n in o) o[n] && ((s += "; " + n), !0 !== o[n] && (s += "=" + o[n].split(";")[0]));
                    return (document.cookie = e + "=" + t + s);
                }
                function c(e) {
                    return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
                }
                for (var r = {}, p = document.cookie ? document.cookie.split("; ") : [], i = 0; i < p.length; i++) {
                    var l = p[i].split("="),
                        d = l.slice(1).join("=");
                    this.json || '"' !== d.charAt(0) || (d = d.slice(1, -1));
                    try {
                        var u = c(l[0]),
                            d = (_.read || _)(d, u) || c(d);
                        if (this.json)
                            try {
                                d = JSON.parse(d);
                            } catch (e) {}
                        if (((r[u] = d), e === u)) break;
                    } catch (e) {}
                }
                return e ? r[e] : r;
            }
        }
        return (
            ((h.set = h).get = function (e) {
                return h.call(h, e);
            }),
            (h.getJSON = function () {
                return h.apply({ json: !0 }, arguments);
            }),
            (h.remove = function (e, t) {
                h(e, "", f(t, { expires: -1 }));
            }),
            (h.defaults = {}),
            (h.withConverter = e),
            h
        );
    })(function () {});
});
var cpro_cookies = "",
    cProAdBlockEnabled = !1,
    image_on_ready = void 0 === cp_ajax.image_on_ready ? 0 : cp_ajax.image_on_ready;
jQuery,
    (cpro_cookies = {
        set: function (e, t, o) {
            var a,
                s = o ? ((a = new Date()).setTime(a.getTime() + 24 * o * 60 * 60 * 1e3), "; expires=" + a.toGMTString()) : "";
            document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + s + "; path=/";
        },
        get: function (e) {
            for (var t = encodeURIComponent(e) + "=", o = document.cookie.split(";"), a = 0; a < o.length; a++) {
                for (var s = o[a]; " " === s.charAt(0); ) s = s.substring(1, s.length);
                if (0 === s.indexOf(t)) return decodeURIComponent(s.substring(t.length, s.length));
            }
            return null;
        },
        remove: function (e) {
            this.set(e, "", -1);
        },
    }),
    (global_cp_cookies = "undefined" != typeof Cookies ? Cookies.noConflict() : null);
var ConvertProPopup = "",
    global_cp_cookies = null !== global_cp_cookies ? global_cp_cookies : cpro_cookies,
    initConvertPro = {},
    cppPopupsData = {},
    cppGmt = 1e3 * new Date().getTime(),
    cppPageStartTime = Date.now(),
    cppInactivityTime = cp_pro.inactive_time || 60,
    ab_test = "undefined" != typeof cp_v2_ab_tests ? cp_v2_ab_tests.cp_v2_ab_tests_object : "",
    t_id = -1;
!(function (j) {
    jQuery.fn.cp_center_modal = function () {
        var e = j(this),
            t = Math.max(0, (j(window).height() - e.outerHeight()) / 2) + "px",
            o = Math.max(0, (j(window).width() - e.outerWidth()) / 2) + "px";
        return e.css("top", t), e.css("left", o), e.css("transform", ""), e;
    };
    var e,
        t = function () {
            var e = j("[data-cp-src]");
            0 < e.length &&
                e.each(function (e) {
                    var t,
                        o = this,
                        a = j(o),
                        s = a.attr("data-module-type"),
                        n = !0,
                        c = a.attr("data-cp-src"),
                        r = a.closest(".cp-popup-container").find(".cp-popup-content"),
                        p = r.attr("data-mobile-responsive"),
                        i = parseInt(r.attr("data-mobile-break-pt")),
                        l = j(window).width();
                    if (void 0 !== c && "" != c) {
                        try {
                            var d = jQuery.parseJSON(c);
                        } catch (e) {
                            n = !1;
                        }
                        n && (c = i < l || "no" == p ? d[0] : d[1]),
                            void 0 === c ||
                                ((c = 0 == (t = c.split("|"))[0] ? cp_ajax.assets_url + t[1] : void 0 !== t[1] ? t[1] : t[0]) &&
                                    ("IMG" === o.tagName
                                        ? (o.src = c)
                                        : "info_bar" == s || "welcome_mat" == s || "full_screen" == s
                                        ? a.closest(".cp-popup").css("background-image", "url(" + c + ")")
                                        : (o.style.backgroundImage = "url(" + c + ")")));
                    }
                });
        },
        o = function () {
            j(".cp-popup-container").each(function (e) {
                var w = j(this),
                    k = w.attr("data-module-type");
                w.find(".cp-popup-content").each(function (e) {
                    var t = j(this);
                    if (!t.hasClass("toggle_active") && 0 < t.find(".cp-toggle-type-sticky").length) return !0;
                    var o = t.attr("data-mobile-responsive"),
                        a = parseInt(t.attr("data-mobile-break-pt")),
                        s = parseInt(t.attr("data-width")),
                        n = parseInt(t.attr("data-height")),
                        c = parseInt(t.attr("data-mobile-width")),
                        r = t.attr("data-popup-position"),
                        p = j(window).width(),
                        i = p,
                        l = 1,
                        d = 0.1;
                    ("before_after" != k && "inline" != k && "widget" != k) || ((i = w.closest(".cp-popup-container").parent().width()), (d = 0)), "yes" != o || a < p ? i < s && (l = i / s - d) : i < c && (l = i / c - d);
                    var u,
                        _,
                        h,
                        f = "",
                        m = "",
                        g = "",
                        b = "",
                        v = "",
                        y = "",
                        C = "";
                    1 != l && 0 < l
                        ? ("modal_popup" == k || "welcome_mat" == k || "full_screen" == k
                              ? ((f = "translateX(-50%) translateY(-50%) scale(" + l + ")"), (b = g = "50%"), (y = v = "auto"))
                              : "slide_in" == k
                              ? ((f = "top center" == r || "bottom center" == r ? "translateX(-50%) scale(" + l + ")" : "center left" == r || "center right" == r ? "translateY(-50%) scale(" + l + ")" : "scale(" + l + ")"), (m = r))
                              : "info_bar" == k
                              ? ((b = "50%"), (f = "translateX(-50%) scale(" + l + ")"))
                              : ("before_after" != k && "inline" != k && "widget" != k) ||
                                ((f = "translateX(-50%) scale(" + l + ")"), (b = "50%"), (m = "center top"), (u = t.closest(".cpro-form")), (_ = t.height()), (h = Math.round(l * _)), u.css("height", h + "px")),
                          t.css({ transform: f, "transform-origin": m, right: v, bottom: y, top: g, left: b }))
                        : (t.css({ transform: f, "transform-origin": m, right: v, bottom: y, top: g, left: b }), ("modal_popup" != k && "full_screen" != k && "welcome_mat" != k) || t.cp_center_modal()),
                        "widget" == k && (1 != l && (C = n * l + "px"), t.closest(".cpro-form").css({ height: C }));
                });
            });
        },
        a = function () {
            var e;
            function t() {
                clearTimeout(e),
                    (e = setTimeout(function () {
                        j(document).trigger("cpinactivebrowser");
                    }, cppInactivityTime));
            }
            void 0 !== cppInactivityTime &&
                ((cppInactivityTime = 1e3 * parseInt(cppInactivityTime)),
                window.addEventListener("load", function (e) {}),
                (document.onmousemove = t),
                (document.onkeypress = t),
                (document.onmousemove = t),
                (document.onmousedown = t),
                (document.ontouchstart = t),
                (document.onclick = t),
                (document.onscroll = t),
                (document.onkeypress = t));
        },
        m = function (e) {
            e.find(".cpro-overlay-field").each(function () {
                var e = jQuery(this).attr("id"),
                    t = jQuery("#wpadminbar").outerHeight();
                jQuery("#" + e).css("margin-top", t + "px");
            });
        },
        g = function () {
            jQuery(".cp-popup-container").each(function (e, t) {
                var o = jQuery(t),
                    a = o.find(".cp-popup-wrapper"),
                    s = o.find(".cp-popup-content").outerHeight(),
                    n = jQuery(window).height();
                jQuery(this).hasClass("cpro-open") &&
                    (n < s
                        ? a.each(function (e, t) {
                              !jQuery(t).closest(".cp-popup-container").hasClass("cpro-open") ||
                                  jQuery(t).closest(".cp-popup-container").hasClass("cp-module-before_after") ||
                                  jQuery(t).closest(".cp-popup-container").hasClass("cp-module-inline") ||
                                  jQuery(t).closest(".cp-popup-container").hasClass("cp-module-widget") ||
                                  jQuery("html").addClass("cpro-exceed-viewport"),
                                  jQuery("html").removeClass("cp-window-viewport");
                          })
                        : jQuery("html").removeClass("cpro-exceed-viewport"));
            });
        },
        s = function () {
            j(".cp-popup-content").each(function (e) {
                var s = [],
                    t = j(this),
                    o = t.find(".cpro-form-container");
                t.find(".cp-form-field").each(function (e) {
                    var t = j(this),
                        o = parseInt(t.closest(".cp-field-html-data").css("top")),
                        a = t.closest(".cp-field-html-data").attr("id");
                    s.push([a, o]);
                }),
                    s.sort(function (e, t) {
                        return e[1] != t[1] ? e[1] - t[1] : parseInt(j("#" + e[0]).css("left")) - parseInt(j("#" + t[0]).css("left"));
                    }),
                    t.find(".cp-button-field").each(function (e) {
                        var t = j(this),
                            o = parseInt(t.closest(".cp-field-html-data").css("top")),
                            a = t.closest(".cp-field-html-data").attr("id");
                        s.push([a, o]);
                    });
                for (var a = s.length, n = 0; n < a; n++) {
                    var c = s[n][0];
                    t.find("#" + c).appendTo(o);
                }
            });
        },
        b = function (e) {
            var t,
                o,
                a,
                s,
                n,
                c,
                r,
                p = e.find(".cp-popup");
            p.hasClass("cp-top")
                ? ((t = 0),
                  (o = p.find(".infobar-settings").val()),
                  (a = p.find(".infobar-sticky-settings").val()),
                  (s = p.find(".infobar-toggle-settings").val()),
                  0 < jQuery("#wpadminbar").length && (t += jQuery("#wpadminbar").outerHeight()),
                  p.css("top", t + "px"),
                  "1" == a && (p.css("position", "absolute"), jQuery("body").css("position", "unset")),
                  "1" != o ||
                      (1 == s && !p.find(".cp-popup-content").hasClass("infobar_toggle_active")) ||
                      ((n = p.find(".cp-popup-content").outerHeight()),
                      0 < jQuery("#wpadminbar").length && (n += jQuery("#wpadminbar").outerHeight()),
                      jQuery("html").addClass("cpro-ib-open"),
                      (c = e.closest(".cp-popup-container").data("style")),
                      jQuery(".cp-ib-push-style[data-id='" + c + "']").remove(),
                      (r = "<style type='text/css' data-id='" + c + "' class='cp-ib-push-style'>html.cpro-ib-open { margin-top: " + n + "px !important; } </style>"),
                      jQuery("head").append(r)))
                : e.hasClass("cp-ifb-scroll")
                ? (jQuery("body").parent("html").outerHeight(!0), p.find(".cp-popup").outerHeight())
                : p.css("top", "auto");
        },
        v = function (e) {
            var t = e.data("class-id");
            jQuery(".cp-popup-container[data-style='cp_style_" + t + "']")
                .find(".cp-popup")
                .hasClass("cp-top") &&
                (jQuery("html").css("transition", "margin 1s ease-in-out"),
                jQuery("html").removeClass("cpro-ib-open"),
                setTimeout(function () {
                    jQuery("html").css("transition", "");
                }, 1200));
        },
        y = function (e) {
            var t,
                o = e.find(".cp-popup .cp-popup-content");
            (o.hasClass("top-left") || o.hasClass("top-center") || o.hasClass("top-right")) && ((t = 0) < jQuery("#wpadminbar").length && (t += jQuery("#wpadminbar").outerHeight()), o.css("margin-top", t + "px"));
        },
        n = function () {
            jQuery.each(ab_test, function (e, t) {
                var o,
                    a,
                    s,
                    n = JSON.stringify(t);
                null != global_cp_cookies.get("cp_v2_ab_test-" + e)
                    ? ((a = jQuery.parseJSON(global_cp_cookies.get("cp_v2_ab_test_completed-" + e))),
                      (s = jQuery.parseJSON(global_cp_cookies.get("cp_v2_ab_test_pending-" + e))),
                      !a || (0 != a.length && 0 != s.length)
                          ? ((o = Math.floor(Math.random() * s.length)), global_cp_cookies.set("cp_v2_ab_test_show-" + e, s[o], { expires: 365 }))
                          : (global_cp_cookies.set("cp_v2_ab_test-" + e, n, { expires: 365 }),
                            global_cp_cookies.set("cp_v2_ab_test_completed-" + e, new Array(), { expires: 365 }),
                            global_cp_cookies.set("cp_v2_ab_test_pending-" + e, n, { expires: 365 }),
                            (o = Math.floor(Math.random() * t.length)),
                            global_cp_cookies.set("cp_v2_ab_test_show-" + e, t[o], { expires: 365 })))
                    : (global_cp_cookies.set("cp_v2_ab_test-" + e, n, { expires: 365 }),
                      global_cp_cookies.set("cp_v2_ab_test_completed-" + e, new Array(), { expires: 365 }),
                      global_cp_cookies.set("cp_v2_ab_test_pending-" + e, n, { expires: 365 }),
                      (o = Math.floor(Math.random() * t.length)),
                      global_cp_cookies.set("cp_v2_ab_test_show-" + e, t[o], { expires: 365 })),
                    global_cp_cookies.set("cp_v2_ab_test_display-" + e, !1, { expires: 365 });
            });
        },
        c = function () {
            j(".cp-popup-container").each(function (e, t) {
                j(t)
                    .find(".cp-popup-content")
                    .find(":input")
                    .each(function (e, t) {
                        var o,
                            a,
                            s = j(this),
                            n = j("head"),
                            c = "",
                            r = "",
                            p = "";
                        s.hasClass("cp-button") &&
                            ((o = s.closest(".cp-field-html-data").data("type")),
                            (a = s.closest(".cp-field-html-data").attr("id")),
                            "cp_button" == o
                                ? ((c = s.css("background-color")),
                                  (r = s.css("color")),
                                  (p = s.css("border-color")),
                                  n.append('<style type="text/css"> #' + a + " .cp_loader_container {border-left-color:" + r + ";}</style>"),
                                  n.append('<style type="text/css"> #' + a + " .cp_loader_container.cp_success_loader_container {border-color:" + r + ";}</style>"),
                                  n.append('<style type="text/css"> #' + a + " i.cp-button-loader-style.draw.success-loader-style {color:" + r + ";}</style>"),
                                  s.closest(".cp_loader_container") &&
                                      (n.append('<style type="text/css"> #' + a + " .cp-target.cp-field-element.cp-button-field.cp-button-loading:hover {background:" + c + ";}</style>"),
                                      n.append('<style type="text/css"> #' + a + " .cp-target.cp-field-element.cp-button-field.cp-button-loading:hover {border-color:" + p + ";}</style>")))
                                : "cp_gradient_button" == o &&
                                  ((c = s.css("background-color")),
                                  (r = s.css("color")),
                                  (p = s.css("border-color")),
                                  n.append('<style type="text/css"> #' + a + " .cp_loader_container {border-left-color:" + r + ";}</style>"),
                                  n.append('<style type="text/css"> #' + a + " .cp_loader_container.cp_success_loader_container {border-color:" + r + ";}</style>"),
                                  n.append('<style type="text/css"> #' + a + " i.cp-button-loader-style.draw.success-loader-style {color:" + r + ";}</style>")));
                    });
            });
        };
    (ConvertProPopup = function () {
        (this.currentID = 0),
            (this.popups = {}),
            (this.configure = {}),
            (this.pageStartTime = cppPageStartTime),
            (this.logMessages = []),
            (this.init = function (e) {
                this.setInitSettings(e), this.setSessions(), this.setCookies(), this.execute();
            }),
            (this.getTimestampNow = function () {
                return Date.now();
            }),
            (this.isFirstTimeVisitor = function () {
                return void 0 !== global_cp_cookies.get("cppro-ft") && void 0 !== global_cp_cookies.get("cppro-ft-style");
            }),
            (this.isReturningVisitor = function () {
                return void 0 !== global_cp_cookies.get("cppro-ft") && void 0 === global_cp_cookies.get("cppro-ft-style");
            }),
            (this.setSetting = function (e, t) {
                return (this.popups[e] = t), !0;
            }),
            (this.getSetting = function (e) {
                return this.popups[e];
            }),
            (this.getConfigure = function (e) {
                return this.getSetting("configure")[e];
            }),
            (this.browserCookies = function () {
                for (var e = {}, t = document.cookie.split(";"), o = 0; o < t.length; o++) {
                    var a = t[o].split("=");
                    (a[0] = a[0].replace(/^ /, "")), (e[decodeURIComponent(a[0])] = decodeURIComponent(a[1]));
                }
                return e;
            }),
            (this.setInitSettings = function (e) {
                this.currentID = e.popup_id;
                var t = "cp_style_" + e.popup_id;
                (this.popups = { id: e.popup_id, type: e.popup_type, wrap: e.popup_wrap, normal_cookie: t, temp_cookie: "temp_" + t, live: !1 }),
                    !(cppPopupsData[e.popup_id] = { type: e.popup_type, live: !1 }) !== e.popup_wrap &&
                        ((this.popups.configure = jQuery.parseJSON(e.popup_wrap.find(".panel-settings").val())), (this.popups.rulesets = jQuery.parseJSON(e.popup_wrap.find(".panel-rulesets").val())));
            }),
            (this.setSessions = function () {
                if ("object" == typeof localStorage)
                    try {
                        null === sessionStorage.getItem("cp-pro-session-init") && sessionStorage.setItem("cp-pro-session-init", this.getTimestampNow());
                        var e = sessionStorage.getItem("cp-pro-page-views");
                        null === e ? sessionStorage.setItem("cp-pro-page-views", 1) : sessionStorage.setItem("cp-pro-page-views", ++e);
                    } catch (e) {
                        (Storage.prototype._setItem = Storage.prototype.setItem),
                            (Storage.prototype.setItem = function () {}),
                            console.log(
                                'Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.'
                            );
                    }
            }),
            (this.setCookies = function () {
                global_cp_cookies.get("cppro-ft") || (global_cp_cookies.set("cppro-ft", !0, { expires: 2601 }), global_cp_cookies.set("cppro-ft-style", !0), global_cp_cookies.set("cppro-ft-style-temp", !0, { expires: 1 })),
                    global_cp_cookies.get("cppro-ft-style-temp") || global_cp_cookies.remove("cppro-ft-style");
                var e = this.getSetting("temp_cookie");
                global_cp_cookies.remove(e);
            }),
            (this.execute = function () {
                var e = this.getSetting("type");
                ("modal_popup" != e && "info_bar" != e && "slide_in" != e && "welcome_mat" != e && "full_screen" != e) || this.parseRules();
            }),
            (this.createExitEvent = function (e) {
                var t = this,
                    o = "mouseleave." + t.currentID + "." + e;
                j(document)
                    .off(o)
                    .on(o, function (e) {
                        20 < e.clientY || (t.canShow() && t.invokePopup());
                    });
            }),
            (this.destroyExitEvent = function (e) {
                var t = "mouseleave." + this.currentID + "." + e;
                j(document).off(t);
            }),
            (this.createInactiveEvent = function (e) {
                var t = this,
                    o = "cpinactivebrowser." + t.currentID + "." + e;
                j(document)
                    .off(o)
                    .on(o, function (e) {
                        t.canShow() && t.invokePopup();
                    });
            }),
            (this.destroyInactiveEvent = function (e) {
                var t = "cpinactivebrowser." + this.currentID + "." + e;
                j(document).off(t);
            }),
            (this._isOnScreen = function (e) {
                var t = jQuery(window),
                    o = { top: t.scrollTop(), left: t.scrollLeft() };
                (o.right = o.left + t.width()), (o.bottom = o.top + t.height());
                var a = e.offset();
                return (a.right = a.left + e.outerWidth()), (a.bottom = a.top + e.outerHeight()), !(o.right < a.left || o.left > a.right || o.bottom < a.top || o.top > a.bottom);
            }),
            (this.createScrollEvent = function (_, e) {
                var h = this,
                    f = h.currentID,
                    t = "scroll." + f + "." + e,
                    m = j(window),
                    g = j(document);
                j(document)
                    .off(t)
                    .on(t, function (e) {
                        var t, o, a, s, n, c, r, p, i, l, d, u;
                        h.canShow() &&
                            ((t = "cp_popup_id_" + f),
                            (a = (100 * (o = m.scrollTop())) / (g.height() - m.height())),
                            (s = !1),
                            (n = parseInt(_.close_after_scroll)),
                            (c = parseInt(_.load_after_scroll)),
                            (r = jQuery("#" + t).attr("data-module-type")),
                            "1" == _.autoload_on_scroll
                                ? isNaN(n)
                                    ? a > _.load_after_scroll && (s = !0)
                                    : c <= n
                                    ? c <= a && a <= n
                                        ? ("info_bar" == r ? jQuery("#" + t + " .cp-open-infobar-toggle").css("display", "block") : "slide_in" == r && jQuery("#" + t + " .cp-open-toggle").css("display", "block"), (s = !0))
                                        : (jQuery("#" + t).removeClass("cpro-open"),
                                          "info_bar" == r ? jQuery("#" + t + " .cp-open-infobar-toggle").css("display", "none") : "slide_in" == r && jQuery("#" + t + " .cp-open-toggle").css("display", "none"))
                                    : c <= a && n <= a && (s = !0)
                                : "1" == _.enable_after_post
                                ? 0 < (p = j(".cp-load-after-post")).length && ((i = p.offset().top - 30), (i -= (50 * m.height()) / 100) <= o && (s = !0))
                                : "1" == _.enable_custom_scroll && (void 0 === (l = _.enable_scroll_class) || "" === l || (void 0 !== (u = (d = j(l)).position()) && " " !== u && (s = h._isOnScreen(d)))),
                            s && ("1" == _.modal_exit_intent ? h.createExitEvent(_.hash) : h.invokePopup()));
                    });
            }),
            (this.destroyScrollEvent = function (e) {
                var t = "scroll." + this.currentID + "." + e;
                j(document).off(t);
            }),
            (this.createCustomLinkEvent = function (e, t) {
                var a = this,
                    o = a.currentID,
                    s = this.getSetting("type"),
                    n = "click." + o + "." + t,
                    c = ".manual_trigger_" + o;
                "" != e.custom_class && (c = c + "," + e.custom_class),
                    j(document)
                        .off(n)
                        .on(n, c, function (e) {
                            e.preventDefault();
                            var t = a._openABDesignByClick(),
                                o = !1,
                                o = "modal_popup" != s || a._isOtherModalOpen(s);
                            !t && o && a.invokePopup();
                        });
            }),
            (this._isOtherModalOpen = function (e) {
                var t = this.getSetting("wrap");
                if ("full_screen" != e && "welcome_mat" != e)
                    return jQuery(".cp-module-modal_popup.cpro-open").length <= 0 && jQuery(".cp-module-full_screen.cpro-open").length <= 0 && jQuery(".cp-module-welcome_mat.cpro-open").length <= 0 && !t.hasClass("cpro-visited-popup");
                var o =
                        jQuery(".cp-popup-container.cpro-open.cp-module-info_bar").length <= 0 ||
                        jQuery(".cp-popup-container.cpro-open.cp-module-slide_in").length <= 0 ||
                        jQuery(".cp-popup-container.cpro-open.cp-module-modal_popup").length <= 0,
                    a = !1;
                return (
                    "full_screen" == e && jQuery(".cp-popup-container.cpro-open.cp-module-welcome_mat").length <= 0 && jQuery(".cp-popup-container.cpro-open.cp-module-modal_popup").length <= 0 && (a = !0),
                    "welcome_mat" == e && jQuery(".cp-popup-container.cpro-open.cp-module-full_screen").length <= 0 && jQuery(".cp-popup-container.cpro-open.cp-module-modal_popup").length <= 0 && (a = !0),
                    a && o
                );
            }),
            (this._stripTrailingSlash = function (e) {
                return "/" === e.substr(-1) ? e.substr(0, e.length - 1) : e;
            }),
            (this.getReferrer = function () {
                var e = document.referrer.toLowerCase();
                return (e = (e = e.replace("http:", "")).replace("https:", "")), (e = (e = (e = this._stripTrailingSlash(e.replace(/.*?:\/\//g, ""))).replace(/\/{2,}/g, "")).replace("www.", ""));
            }),
            (this.referrerDisplayHide = function (e, s) {
                var n = this,
                    c = n.getReferrer(),
                    r = !0,
                    t = e.split(",");
                return (
                    jQuery.each(t, function (e, t) {
                        t = n._stripTrailingSlash(t);
                        var o = (t = (t = (t = (t = n._stripTrailingSlash(t.replace(/.*?:\/\//g, ""))).replace("www.", "")).replace("http:", "")).replace("https:", "")).split("*");
                        -1 !== c.indexOf("t.co") && (c = "twitter.com"), -1 !== c.indexOf("plus.google.co") ? (c = "plus.google.com") : -1 !== c.indexOf("google.co") && (c = "google.com");
                        var a = o[0],
                            a = n._stripTrailingSlash(a);
                        if ("display" == s) {
                            if (-1 !== t.indexOf("*")) return a == c || -1 !== c.indexOf(a) ? !(r = !0) : (r = !1);
                            if (t == c) return !(r = !0);
                            r = !1;
                        } else if ("hide" == s) {
                            if (-1 !== t.indexOf("*")) return a == c || -1 !== c.indexOf(a) ? (r = !1) : !(r = !0);
                            if (t == c || -1 !== c.indexOf(a)) return (r = !1);
                            r = !0;
                        }
                    }),
                    r
                );
            }),
            (this.isScheduled = function (e) {
                var t = "",
                    o = !1,
                    a = new Date();
                if (void 0 === e.start_date || void 0 === e.end_date) return !0;
                var s = e.start_date,
                    n = e.end_date,
                    s = Date.parse(s),
                    n = Date.parse(n);
                return s <= (t = Date.parse(a)) && t <= n && (o = !0), o;
            }),
            (this.canShow = function () {
                for (
                    var e,
                        t,
                        o = this.getSetting("id"),
                        a = this.getSetting("normal_cookie"),
                        s = this.getSetting("temp_cookie"),
                        n = decodeURIComponent(window.location.search.substring(1)).split("&"),
                        c = parseInt(cp_pro_url_cookie.days),
                        r = 0;
                    r < n.length;
                    r++
                )
                    "cph" === (e = n[r].split("="))[0] && (t = void 0 === e[1] || e[1]);
                if (null != t)
                    if (0 != t) for (var p = ("" + t).split(","), i = p.length - 1; 0 <= i; i--) global_cp_cookies.set("cp_style_" + p[i], !1, { expires: c }), global_cp_cookies.set("temp_cp_style_" + p[i], !1, { expires: c });
                    else 0 == t && global_cp_cookies.set("cp_global_hide", !0, { expires: c });
                var l,
                    d = this.getSetting("wrap"),
                    u = this.getSetting("type"),
                    _ = this.getConfigure("cookies_enabled"),
                    h = global_cp_cookies.get(a),
                    f = global_cp_cookies.get(s),
                    m = global_cp_cookies.get("cp_global_hide"),
                    g = this._getCurrentABTest(),
                    b = !1,
                    v = !0,
                    y = !1;
                "1" == _ ? h && (b = !0) : f && (b = !0),
                    (1 != m && "true" != m) || (b = !0),
                    (y = ("modal_popup" != u && "full_screen" != u && "welcome_mat" != u) || this._isOtherModalOpen(u)),
                    -1 != g &&
                        (null != global_cp_cookies.get("cp_v2_ab_test-" + g) &&
                            ((l = jQuery.parseJSON(global_cp_cookies.get("cp_v2_ab_test_completed-" + g))), (v = parseInt(global_cp_cookies.get("cp_v2_ab_test_show-" + g)) == o && !(0 <= jQuery.inArray(o, l)))),
                        "modal_popup" != u && "full_screen" != u && (y = this._isOtherModalOpen(u)));
                var C = !0;
                return d.parent().hasClass("cp_template_html") && (C = !1), !b && y && v && C;
            }),
            (this.invokePopup = function () {
                var e = this.getSetting("wrap"),
                    t = j(window),
                    o = e.find(".cp-popup-wrapper"),
                    a = this.getSetting("id"),
                    s = this.getSetting("type");
                e.hasClass("cpro-open") ||
                    ("welcome_mat" == s ? this._displayWelcomeMat(o, s, a) : e.addClass("cpro-open"),
                    o.removeClass("cp-close"),
                    this.setSetting("live", !0),
                    t.trigger("update_test_status", [a]),
                    t.trigger("cp_after_popup_open", [o, s, a]));
            }),
            (this.parseRules = function () {
                var c,
                    t,
                    e,
                    r,
                    p,
                    o,
                    i,
                    a = this.getSetting("rulesets");
                void 0 !== a &&
                    null != a &&
                    (void 0 === a.length &&
                        (a = j.map(a, function (e, t) {
                            return e;
                        })),
                    a.length < 1 ||
                        ((e = (c = this).getEnabledRulesets(a)),
                        (r = this.prepareRulesets(e)),
                        (p = this.getSetting("live")),
                        (o = function () {
                            p = c.getSetting("live");
                            var e = c.mapRulesets(r),
                                o = {},
                                a = {},
                                s = {},
                                n = {};
                            e.map(
                                function (e, t) {
                                    return (
                                        (o[e.hash] = !1),
                                        "1" == e.modal_exit_intent &&
                                            e.allPassed &&
                                            (e.allPassed
                                                ? "1" == e.autoload_on_scroll || "1" == e.enable_after_post || "1" == e.enable_custom_scroll
                                                    ? (c.createScrollEvent(e, e.hash), (a[e.hash] = !0))
                                                    : (c.createExitEvent(e.hash), (o[e.hash] = !0))
                                                : e.allRulesPassed || (c.destroyExitEvent(e.hash), (o[e.hash] = !1))),
                                        o
                                    );
                                }.bind(this)
                            ),
                                e.map(
                                    function (e, t) {
                                        return (
                                            (a[e.hash] = !1),
                                            ("1" != e.autoload_on_scroll && "1" != e.enable_after_post && "1" != e.enable_custom_scroll) ||
                                                (e.allPassed ? (c.createScrollEvent(e, e.hash), (a[e.hash] = !0)) : e.allRulesPassed || (c.destroyScrollEvent(e.hash), (a[e.hash] = !1))),
                                            a
                                        );
                                    }.bind(this)
                                ),
                                e.map(
                                    function (e, t) {
                                        return (n[e.hash] = !1), "1" == e.inactivity && (e.allPassed ? (c.createInactiveEvent(e.hash), (n[e.hash] = !0)) : e.allRulesPassed || (c.destroyInactiveEvent(e.hash), (n[e.hash] = !1))), n;
                                    }.bind(this)
                                ),
                                e.map(
                                    function (e, t) {
                                        return (s[e.hash] = !1), "1" == e.enable_custom_class && (c.createCustomLinkEvent(e, e.hash), (s[e.hash] = !0)), s;
                                    }.bind(this)
                                );
                            (t = e.filter(function (e) {
                                return e.allPassed && "1" != e.modal_exit_intent && "1" != e.autoload_on_scroll && "1" != e.enable_after_post && "1" != e.enable_custom_scroll && "1" != e.enable_custom_class && "1" != e.inactivity;
                            })),
                                (r = e.filter(function (e) {
                                    return !e.allPassed && e.keepAlive && "1" !== e.enable_custom_class;
                                })),
                                0 < t.length && c.canShow() && c.invokePopup(),
                                0 === r.length && clearInterval(i);
                        })(),
                        (i = setInterval(function () {
                            p || r.length < 1 ? clearInterval(i) : o();
                        }, 500))));
            }),
            (this.getEnabledRulesets = function (e) {
                return e.filter(function (e) {
                    return (
                        "1" == e.autoload_on_duration ||
                        "1" == e.autoload_on_scroll ||
                        "1" == e.enable_after_post ||
                        "1" == e.enable_custom_class ||
                        "1" == e.enable_custom_scroll ||
                        "1" == e.enable_scroll_class ||
                        "1" == e.enable_custom_cookies ||
                        "1" == e.enable_cookies_class ||
                        "1" == e.inactivity ||
                        "1" == e.modal_exit_intent ||
                        "1" == e.enable_scheduler ||
                        "1" == e.enable_visitors ||
                        "1" == e.enable_referrer ||
                        "1" == e.enable_adblock_detection
                    );
                });
            }),
            (this.prepareRulesets = function (e) {
                return e.map(
                    function (e) {
                        return (e.hash = (Math.random() + 1).toString(36).slice(2, 12)), (e.keepAlive = this.keepRulsetAlive(e)), e;
                    }.bind(this)
                );
            }),
            (this.mapRulesets = function (e) {
                return e.map(
                    function (e) {
                        return "1" == e.enable_custom_class ? (e.allPassed = !0) : (e.allPassed = this.verifyRules(e)), e;
                    }.bind(this)
                );
            }),
            (this.verifyRules = function (i) {
                var l = this,
                    d = {},
                    u = {},
                    e = !0;
                for (var t in (j.each(i, function (e, t) {
                    switch (e) {
                        case "autoload_on_duration":
                            var o;
                            "1" == t && ((d.autoload_on_duration = !0), (u.autoload_on_duration = !1), (o = 1e3 * parseInt(i.load_on_duration)), l.pageStartTime + o <= Date.now() && (u.autoload_on_duration = !0));
                            break;
                        case "enable_custom_cookies":
                            if ("1" == t) {
                                (d.enable_custom_cookies = !0), (u.enable_custom_cookies = !1);
                                var a,
                                    s = i.enable_cookies_class,
                                    n = [];
                                if ("" != s.trim() && null != s.trim()) {
                                    a = s.split(",");
                                    for (var c = 0; c < a.length; c++) n[c] = a[c].toString();
                                    var r = l.browserCookies();
                                    for (var p in r) n.includes(p) && (u.enable_custom_cookies = !0);
                                }
                            }
                            break;
                        case "enable_visitors":
                            "1" == t &&
                                ((d.enable_visitors = !0), (u.enable_visitors = !1), (("first-time" == i.visitor_type && l.isFirstTimeVisitor()) || ("returning" == i.visitor_type && l.isReturningVisitor())) && (u.enable_visitors = !0));
                            break;
                        case "enable_referrer":
                            "1" == t &&
                                ((d.enable_referrer = !0),
                                (u.enable_referrer = !1),
                                "display-to" === i.referrer_type && "" !== i.display_to
                                    ? l.referrerDisplayHide(i.display_to, "display") && (u.enable_referrer = !0)
                                    : "hide-from" === i.referrer_type && "" !== i.hide_from && l.referrerDisplayHide(i.hide_from, "hide") && (u.enable_referrer = !0));
                            break;
                        case "enable_scheduler":
                            "1" == t && ((d.enable_scheduler = !0), (u.enable_scheduler = !1), l.isScheduled(i) && (u.enable_scheduler = !0));
                            break;
                        case "enable_adblock_detection":
                            "1" == t && ((d.enable_adblock_detection = !0), (u.enable_adblock_detection = !1), cProAdBlockEnabled && (u.enable_adblock_detection = !0));
                    }
                }),
                d))
                    !0 !== u[t] && (e = !1);
                return e;
            }),
            (this.anyRulesetsPassed = function (e) {
                var o = !1;
                return (
                    j.each(e, function (e, t) {
                        !0 !== t.allPassed || (o = !0);
                    }),
                    o
                );
            }),
            (this.keepRulsetAlive = function (e) {
                var t = !1;
                return (
                    ("1" != e.autoload_on_duration && "1" != e.modal_exit_intent && "1" != e.autoload_on_scroll && "1" != e.enable_after_post && "1" != e.enable_custom_scroll && "1" != e.inactivity && "1" != e.enable_adblock_detection) ||
                        (t = !0),
                    t
                );
            }),
            (this._setCookie = function (e) {
                var t = global_cp_cookies,
                    o = e.closest(".cp-popup-container").data("style"),
                    a = jQuery.parseJSON(e.closest(".cp-popup-container").find(".panel-settings[data-section='configure']").val()),
                    s = parseInt(a.conversion_cookie),
                    n = parseInt(a.cookies_enabled_submit),
                    c = t.get(o);
                if ((c || (s && t.set(o, !0, { expires: s })), n && ((s = parseInt(a.conversion_cookie_submit)), "" != (o = a.enable_cookies_class_submit).trim() && null != o.trim())))
                    for (var r = o.split(","), p = 0; p < r.length; p++) (c = t.get(r[p])) || (s && t.set(r[p], !0, { expires: s }));
                var i = e.closest(".cp-popup-container").data("class-id"),
                    l = parseInt(a.cookies_enabled),
                    d = -1;
                if (
                    (jQuery.each(ab_test, function (e, t) {
                        0 <= jQuery.inArray(i, t) && (d = e);
                    }),
                    "1" == l && !c && s && -1 != d && null != t.get("cp_v2_ab_test-" + d))
                )
                    for (var u = jQuery.parseJSON(t.get("cp_v2_ab_test-" + d)), _ = 0; _ < u.length; _++) t.set("cp_style_" + u[_], !0, { expires: s });
            }),
            (this._closepopupEvent = function () {
                var e = this.getSetting("wrap"),
                    t = e.find(".cpro-animate-container"),
                    o = e.find(".cp-popup-content"),
                    a = o.data("entry-animation"),
                    s = o.data("exit-animation"),
                    n = this.getConfigure("cookies_enabled"),
                    c = this.getSetting("normal_cookie"),
                    r = this.getSetting("temp_cookie"),
                    p = parseInt(this.getConfigure("closed_cookie")),
                    i = this.getSetting("type");
                global_cp_cookies.set(r, !0, { expires: 1 });
                var l = global_cp_cookies.get(c);
                "welcome_mat" == i && (s = "cp-slideOutUp"), "1" != n || l || global_cp_cookies.set(c, !0, { expires: p });
                var d = this._getCurrentABTest();
                if ("1" == n && !l && -1 != d && null != global_cp_cookies.get("cp_v2_ab_test-" + d))
                    for (var u = jQuery.parseJSON(global_cp_cookies.get("cp_v2_ab_test-" + d)), _ = 0; _ < u.length; _++) global_cp_cookies.set("cp_style_" + u[_], !0, { expires: p });
                var h = this.getConfigure("cookies_enabled_closed"),
                    f = parseInt(this.getConfigure("closed_cookie_new")),
                    m = this.getConfigure("enable_cookies_class_closed");
                if ("1" == h && "" != m.trim() && null != m.trim()) for (var g = m.split(","), b = 0; b < g.length; b++) global_cp_cookies.get(g[b]) || (f && global_cp_cookies.set(g[b], !0, { expires: f }));
                t.addClass(a),
                    t.addClass(s),
                    j(".cpro-wel-mat-open").css("padding-top", ""),
                    setTimeout(function () {
                        j("html").removeClass("cpro-exceed-viewport cp-modal-popup-open cp-disable-scroll"),
                            e.removeClass("cpro-open"),
                            e.find(".cp-popup-wrapper").addClass("cpro-visited-popup"),
                            t.removeClass(s),
                            "welcome_mat" == i && (j("body").removeClass("cpro-wel-mat-open"), j("html").removeClass("cpro-overflow-mat"), j(window).scrollTop(0));
                    }, 500),
                    "info_bar" == i && v(e);
            }),
            (this._getCurrentABTest = function () {
                var o = this.getSetting("id"),
                    a = -1;
                return (
                    jQuery.each(ab_test, function (e, t) {
                        0 <= jQuery.inArray(o, t) && (a = e);
                    }),
                    a
                );
            }),
            (this._openABDesignByClick = function () {
                var e,
                    t,
                    o = this._getCurrentABTest(),
                    a = !1;
                return (
                    -1 != o &&
                        ((a = !0),
                        (e = this.getSetting("id")),
                        (t = jQuery.parseJSON(global_cp_cookies.get("cp_v2_ab_test_completed-" + o))),
                        parseInt(global_cp_cookies.get("cp_v2_ab_test_show-" + o)) == e && !(0 <= jQuery.inArray(e, t)) && (0 < jQuery(".cp-popup-container.cpro-open").length || (this.invokePopup(), n()))),
                    a
                );
            }),
            (this._displayWelcomeMat = function (e, t, o) {
                var a = this,
                    s = j(window).height(),
                    n = e.closest(".cp-popup-container");
                j(window).scrollTop(0),
                    j("body").addClass("cpro-wel-mat-open"),
                    j("html").addClass("cpro-overflow-mat"),
                    j(".cpro-wel-mat-open").css("padding-top", s + "px"),
                    n.find(".cp-popup").addClass("cp-animated cp-slideInDown"),
                    n.addClass("cpro-open"),
                    j(window).scroll(function () {
                        a._closeWelcomeMat();
                    });
            }),
            (this._closeWelcomeMat = function () {
                var e,
                    t = j(".cp-module-welcome_mat.cpro-open");
                0 < t.length &&
                    ((e = t.find(".cp-popup")),
                    this._isOnScreen(e) ||
                        (this._setCookie(e),
                        j("html").removeClass("cp-disable-scroll cpro-exceed-viewport cp-window-viewport cpro-overflow-mat"),
                        j(".cpro-wel-mat-open").css("padding-top", ""),
                        t.removeClass("cpro-open"),
                        j("body").removeClass("cpro-wel-mat-open"),
                        j(window).scrollTop(0)));
            });
    }),
        j(document).ready(function () {
            var e = document.createElement("div");
            (e.innerHTML = "&nbsp;"),
                (e.className = "adsbox"),
                document.body.appendChild(e),
                window.setTimeout(function () {
                    0 === e.offsetHeight && (cProAdBlockEnabled = !0), cProAdBlockEnabled && e.remove();
                }, 100),
                setTimeout(function () {
                    e.remove();
                }, 400),
                (cppPageStartTime = Date.now()),
                j(".cp-popup-container").each(function (e) {
                    var t,
                        o = j(this),
                        a = o.data("class-id"),
                        s = o.data("module-type"),
                        n = o.find(".cp-date-field");
                    0 < n.length &&
                        j(function () {
                            j(n).each(function (e, n) {
                                var c = j(n).data("date-format");
                                new Pikaday({
                                    field: n,
                                    container: o.find("[data-type='cp_date']"),
                                    onSelect: function (e) {
                                        var t = e.getFullYear(),
                                            o = e.getMonth() + 1,
                                            a = e.getDate(),
                                            s = [];
                                        switch (c) {
                                            case "MM/DD":
                                                s = [o < 10 ? "0" + o : o, a < 10 ? "0" + a : a].join("/");
                                                break;
                                            case "MM/DD/YYYY":
                                                s = [o < 10 ? "0" + o : o, a < 10 ? "0" + a : a, t].join("/");
                                                break;
                                            case "MM-DD-YYYY":
                                                s = [o < 10 ? "0" + o : o, a < 10 ? "0" + a : a, t].join("-");
                                                break;
                                            case "DD/MM/YYYY":
                                                s = [a < 10 ? "0" + a : a, o < 10 ? "0" + o : o, t].join("/");
                                                break;
                                            case "DD-MM-YYYY":
                                                s = [a < 10 ? "0" + a : a, o < 10 ? "0" + o : o, t].join("-");
                                        }
                                        j(n).val(s);
                                    },
                                });
                            });
                        }),
                        "widget" == s || "inline" == s || "before_after" == s
                            ? ((t = o.find(".cp-popup-content")), j(document).trigger("cp-load-field-animation", [t]))
                            : ((initConvertPro[a] = new ConvertProPopup()), initConvertPro[a].init({ popup_id: a, popup_type: s, popup_wrap: o }));
                }),
                o(),
                s(),
                c(),
                navigator.userAgent.match(/iPhone|iPad|iPod/i) && j("html").addClass("cpro-ios-device"),
                "1" == image_on_ready && t();
        }),
        n(),
        j(window).on("load", function () {
            "1" !== image_on_ready && t(), a();
        }),
        j(window).resize(function () {
            g(),
                clearTimeout(e),
                (e = setTimeout(o(), 100)),
                j(window).outerWidth() <= 768
                    ? j(".cp-popup-container").each(function (e) {
                          j(this).hasClass("cpro-open") && j(this).hasClass("cp-module-modal_popup") && j("html").addClass("cp-disable-scroll");
                      })
                    : j("html").removeClass("cp-disable-scroll");
        }),
        j(document).on("click", ".cp-open-toggle", function () {
            var e = j(this),
                t = e.closest(".cp-open-toggle-wrap"),
                o = e.closest(".cp-popup-container"),
                a = o.data("class-id"),
                s = o.find(".cp-popup-content"),
                n = e.data("position"),
                c = e.data("type"),
                r = "";
            if ((s.toggleClass("toggle_active"), "hide_on_click" == c)) {
                switch (n) {
                    case "bottom-right":
                    case "bottom-left":
                        t.addClass("cp-animated cp-slideOutDown"), (r = "translateY(0)");
                        break;
                    case "bottom-center":
                        t.addClass("cp-animated cp-slideOutDown"), (r = "translateY(0) translateX(-50%)");
                        break;
                    case "top-left":
                    case "top-right":
                        t.addClass("cp-animated cp-slideOutUp"), (r = "translateY(0)");
                        break;
                    case "top-center":
                        t.addClass("cp-animated cp-slideOutUp"), (r = "translateX(-50%) translateY(0)");
                        break;
                    case "center-left":
                        t.addClass("cp-animated cp-slideOutLeft"), (r = "translateX(0)  translateY(-50%)");
                        break;
                    case "center-right":
                        t.addClass("cp-animated cp-slideOutRight"), (r = "translateX(0)  translateY(-50%)");
                }
                j(window).outerWidth() <= 768 && "top-center" != n && "bottom-center" != n
                    ? "bottom-right" == n || "bottom-left" == n || "top-left" == n || "top-right" == n
                        ? s.css({ transform: r + "translateX(-50%)" })
                        : s.css({ transform: r + "translateX(0)" })
                    : s.css({ transform: r }),
                    jQuery(".cp-module-slide_in.cp_style_" + a + ".cp_has_toggle .cp-popup").css("display", "block"),
                    t.removeClass(e.attr("data-anim-class")),
                    t.css({ "-webkit-animation-delay": "0s", "animation-delay": "0s" }).addClass(e.attr("data-exit-anim-class")),
                    "cp-none" == e.attr("data-exit-anim-class") && t.hide(),
                    o.addClass("cpro-open"),
                    jQuery(window).trigger("update_test_status", [a]);
            } else {
                o.addClass("cpro-open"),
                    o.data("slide-toggle-type", "sticky"),
                    o.data("slide-toggle-position", n),
                    s.hasClass("toggle_active")
                        ? jQuery(".cp-module-slide_in.cp_style_" + a + ".cp_has_toggle_sticky .cp-popup-content").css("visibility", "visible")
                        : s.hasClass("toggle_active") ||
                          setTimeout(function () {
                              jQuery(".cp-module-slide_in.cp_style_" + a + ".cp_has_toggle_sticky .cp-popup-content").css("visibility", "hidden");
                          }, 700);
                j(window).trigger("cp_after_popup_open", [o, "slide_in", a]);
            }
        }),
        j(document).on("click", ".cp-open-infobar-toggle", function () {
            var e = j(this),
                t = e.closest(".cp-open-infobar-toggle-wrap"),
                o = e.closest(".cp-popup-container"),
                a = o.data("class-id"),
                s = o.find(".cp-popup-content"),
                n = e.data("position"),
                c = "";
            switch ((s.addClass("infobar_toggle_active"), n)) {
                case "bottom":
                    t.addClass("cp-animated cp-slideOutDown"), (c = "translateY(0) translateX(0)");
                    break;
                case "top":
                    t.addClass("cp-animated cp-slideOutUp"), (c = "translateX(0) translateY(0)");
            }
            t.removeClass(e.attr("data-anim-class")),
                t.css({ "-webkit-animation-delay": "0s", "animation-delay": "0s" }).addClass(e.attr("data-exit-anim-class")),
                "cp-none" == e.attr("data-exit-anim-class") && t.hide(),
                o.addClass("cpro-open"),
                jQuery(".cp-module-info_bar.cp_style_" + a + " .cp-popup-wrapper .cp-popup").css({ transform: c, display: "block" }),
                jQuery(window).trigger("update_test_status", [a]),
                b(o.closest(".cp-popup-container").find(".cp-popup-wrapper"));
        }),
        j(document).on("cp-shrink-popup", function () {
            o();
        }),
        j(document).on("cp-load-popup-images", function () {
            t();
        }),
        j(document).on("cp-load-field-animation", function (e, t) {
            t.find(".cp-field-html-data").each(function (e, t) {
                var o = jQuery(this),
                    a = o.attr("data-anim-duration"),
                    s = o.attr("data-anim-delay"),
                    n = "cp-animated " + (void 0 !== o.attr("data-animation") ? o.attr("data-animation") : "");
                o.css({ "-webkit-animation-delay": s, "-webkit-animation-duration": a, "animation-delay": s, "animation-duration": a }), o.addClass(n);
            });
        }),
        j(document).on("closePopup", function (e, t, o) {
            var a = t.data("class-id"),
                s = jQuery(".cp-popup-container[data-style='cp_style_" + a + "']"),
                n = s.attr("data-module-type"),
                c = s.find(".cp-popup-content"),
                r = "",
                p = "",
                i = "",
                l = "",
                d = "";
            if (s.hasClass("cp_has_toggle") && !s.hasClass("cp_has_toggle_sticky")) {
                switch (((p = (r = s.find(".cp-open-toggle")).closest(".cp-open-toggle-wrap")), (i = r.data("position")))) {
                    case "bottom-right":
                    case "bottom-left":
                    case "bottom-center":
                        (l = " cp-slideInUp"), (d = "cp-slideOutDown");
                        break;
                    case "top-left":
                    case "top-right":
                    case "top-center":
                        (l = " cp-slideInDown"), (d = "cp-slideOutUp");
                        break;
                    case "center-left":
                        (d = "cp-slideOutLeft"), (l = " cp-slideInLeft");
                        break;
                    case "center-right":
                        (d = "cp-slideOutRight"), (l = " cp-slideInRight");
                }
                r.css("display", "block"),
                    s.find(".cp-popup").addClass(d),
                    setTimeout(function () {
                        s.removeClass("cpro-open"), s.find(".cp-popup").removeClass(d).addClass(l);
                    }, 500),
                    p.removeClass(d).addClass("cp-animated " + l);
            }
            if ((c.hasClass("toggle_active") && "slide_in" == n && s.hasClass("cp_has_toggle_hide_on_click") && c.removeClass("toggle_active"), "slide_in" == n && s.hasClass("cp_has_toggle_sticky"))) {
                (p = (r = s.find(".cp-open-toggle")).closest(".cp-open-toggle-wrap")), (i = r.data("position"));
                var u = s.find(".cp-popup-content");
                switch (i) {
                    case "top-left":
                    case "top-center":
                    case "top-right":
                        l = " cp-slideOutUp";
                        break;
                    case "bottom-left":
                    case "bottom-center":
                    case "bottom-right":
                        l = " cp-slideOutDown";
                        break;
                    case "center-left":
                        l = " cp-slideOutLeft";
                        break;
                    case "center-right":
                        l = " cp-slideOutRight";
                }
                u.css("display", "none"), s.find(".cp-popup").removeClass("cp-none").addClass(l);
            }
            if (s.hasClass("cp_has_infobar_toggle") && "info_bar" == n) {
                r = s.find(".cp-open-infobar-toggle");
                var _ = s.find(".cp_infobar_toggle"),
                    p = r.closest(".cp-open-infobar-toggle-wrap");
                switch ((i = r.data("position"))) {
                    case "bottom":
                        (l = " cp-slideInUp"), (d = "cp-slideOutDown");
                        break;
                    case "top":
                        (l = " cp-slideInDown"), (d = "cp-slideOutUp");
                }
                jQuery(this).find(".cp-popup-content").removeClass("infobar_toggle_active"), _.css("display", "none"), r.css("display", "block"), s.removeClass("cpro-open"), p.removeClass(d).addClass("cp-animated " + l), v(s);
            }
            !t.hasClass("cpro-onload") || s.hasClass("cp_has_toggle") || s.hasClass("cp_has_infobar_toggle") || initConvertPro[a]._closepopupEvent();
        }),
        j(document).on("click", ".cpro-overlay", function (e) {
            var t = j(this).closest(".cp-popup-container").find("input[name=style_id]").val(),
                o = j(".cpro-onload[data-class-id=" + t + "]"),
                a = j(".cp_style_" + t).find(".cp-popup-content");
            (target = j(e.target)), 0 != j(".cp-popup-content").has(target).length || target.hasClass("cp-popup-content") || (void 0 !== a && 1 == a.data("overlay-click") && jQuery(document).trigger("closePopup", [o, t]));
        }),
        j(window).on("update_test_status", function (e, t) {
            var o = [],
                a = [],
                s = initConvertPro[t]._getCurrentABTest();
            -1 != s &&
                ((o = jQuery.parseJSON(global_cp_cookies.get("cp_v2_ab_test_completed-" + s))),
                (a = jQuery.parseJSON(global_cp_cookies.get("cp_v2_ab_test_pending-" + s))),
                0 <= jQuery.inArray(t, a) &&
                    ((a = jQuery.grep(a, function (e) {
                        return e != t;
                    })),
                    o && (o.push(t), global_cp_cookies.set("cp_v2_ab_test_completed-" + s, o, { expires: 365 })),
                    global_cp_cookies.set("cp_v2_ab_test_pending-" + s, a, { expires: 365 })),
                global_cp_cookies.set("cp_v2_ab_test_display-" + s, !0, { expires: 365 }));
        }),
        j(window).on("cp_after_popup_open", function (e, t, o, a) {
            j(window).outerWidth() <= 500 &&
                j(".cp_style_" + a).hasClass("cpro-open") &&
                (j(".cp_style_" + a).hasClass("cp-module-modal_popup") || j(".cp_style_" + a).hasClass("cp-module-full_screen")) &&
                j("html").addClass("cp-disable-scroll"),
                "full_screen" == o ? j("html").addClass("cpro-exceed-viewport") : "welcome_mat" != o && g(),
                "modal_popup" == o && jQuery("html").addClass("cp-modal-popup-open"),
                "info_bar" == o && jQuery("body").hasClass("admin-bar") && t.find(".cp-popup").hasClass("cp-top") && m(t);
            var s = t.data("close-btnonload-delay");
            (s = Math.round(1e3 * s)) &&
                setTimeout(function () {
                    t.find(".cp-close-container").removeClass("cp-hide-close");
                }, s);
            var n = t.find(".cp-popup-content"),
                c = t.find(".cpro-animate-container"),
                r = n.data("entry-animation"),
                p = c.data("disable-animationwidth"),
                i = "",
                l = "",
                d = "",
                u = "",
                _ = "";
            if (
                ((t.closest(".cp-popup-container").hasClass("cp_has_infobar_toggle") && t.closest(".cp-popup-container").hasClass("cp_has_toggle")) ||
                    ((p <= j(window).width() || void 0 === p) && void 0 !== r && j(c).addClass("cp-animated " + r)),
                t.closest(".cp-popup-container").hasClass("cp_has_infobar_toggle"))
            ) {
                if (((i = t.closest(".cp-popup-container").find(".cp-open-infobar-toggle").attr("data-position")), (l = "translateY(0)"), n.hasClass("toggle_active")))
                    switch (i) {
                        case "bottom":
                        case "top":
                            l = "translateX(-50%) translateY(0)";
                    }
                else
                    switch (i) {
                        case "bottom":
                            l = "translateX(-50%) translateY(100%)";
                            break;
                        case "top":
                            l = "translateX(-50%) translateY(-100%)";
                    }
                null != i &&
                    (0 < jQuery("#wpadminbar").length && i.includes("top")
                        ? ((d = jQuery("#wpadminbar").height()),
                          t.closest(".cp-popup-container").find(".cp-open-infobar-toggle").css("margin-top", d),
                          t.closest(".cp-popup-container").find(".cp-open-infobar-toggle-wrap.cp-top").addClass("cp-animated").addClass("cp-slideInDown"))
                        : i.includes("top")
                        ? t.closest(".cp-popup-container").find(".cp-open-infobar-toggle-wrap.cp-top").addClass("cp-animated").addClass("cp-slideInDown")
                        : t.closest(".cp-popup-container").find(".cp-open-infobar-toggle-wrap.cp-bottom").addClass("cp-animated").addClass("cp-slideInUp")),
                    "cp-fadeInScale" != r && "cp-fadeIn" != r && jQuery(".cp_style_" + a + ".cp-module-info_bar .cp-popup-wrapper .cp-popup").css({ transform: l });
            } else if (t.closest(".cp-popup-container").hasClass("cp_has_toggle")) {
                if (((i = t.closest(".cp-popup-container").find(".cp-open-toggle").attr("data-position")), n.hasClass("toggle_active")))
                    switch (i) {
                        case "bottom-right":
                        case "bottom-left":
                        case "top-left":
                        case "top-right":
                            l = "translateY(0)";
                            break;
                        case "bottom-center":
                        case "top-center":
                            l = "translateX(-50%) translateY(0)";
                            break;
                        case "center-left":
                            l = "translateX(0%) translateY(-50%)";
                            break;
                        case "center-right":
                            l = "translateY(-50%) translateX(0%)";
                    }
                else
                    switch (i) {
                        case "bottom-right":
                        case "bottom-left":
                            l = "translateY(100%)";
                            break;
                        case "bottom-center":
                            l = "translateX(-50%) translateY(100%)";
                            break;
                        case "top-left":
                        case "top-right":
                            l = "translateY(-100%)";
                            break;
                        case "top-center":
                            l = "translateX(-50%) translateY(-100%)";
                            break;
                        case "center-left":
                            l = "translateY(-50%) translateX(-100%)";
                            break;
                        case "center-right":
                            l = "translateY(-50%) translateX(100%)";
                    }
                if (null != i) {
                    var h = t.closest(".cp-popup-container").find(".cp-open-toggle").data("position");
                    if (0 < jQuery("#wpadminbar").length && i.includes("top")) {
                        d = jQuery("#wpadminbar").height();
                        var f = t.closest(".cp-popup-container").find(".cp-open-toggle");
                        "sticky" == f.data("type") && t.closest(".cp-popup-container").find(".cp-open-toggle-wrap, .cp-popup").addClass("cp-animated").addClass("cp-slideInDown"),
                            "hide_on_click" == f.data("type") &&
                                (("top-left" != h && "top-right" != h && "top-center" != h) || t.closest(".cp-popup-container").find(".cp-open-toggle-wrap, .cp-popup").addClass("cp-animated").addClass("cp-slideInDown"),
                                t.closest(".cp-popup-container").find(".cp-open-toggle").css("margin-top", d),
                                t.closest(".cp-popup-container").find(".cp-open-toggle-wrap").addClass("cp-animated").addClass("cp-slideInDown"));
                    } else
                        switch (h) {
                            case "bottom-right":
                            case "bottom-left":
                            case "bottom-center":
                                t.closest(".cp-popup-container").find(".cp-open-toggle-wrap, .cp-popup").addClass("cp-animated").addClass("cp-slideInUp");
                                break;
                            case "top-left":
                            case "top-right":
                            case "top-center":
                                t.closest(".cp-popup-container").find(".cp-open-toggle-wrap, .cp-popup").addClass("cp-animated").addClass("cp-slideInDown");
                                break;
                            case "center-left":
                                t.closest(".cp-popup-container").find(".cp-open-toggle-wrap, .cp-popup").addClass("cp-animated").addClass("cp-slideInLeft");
                                break;
                            case "center-right":
                                t.closest(".cp-popup-container").find(".cp-open-toggle-wrap, .cp-popup").addClass("cp-animated").addClass("cp-slideInRight");
                        }
                }
                "bottom-center" == h
                    ? jQuery(".cp-open-toggle-wrap.cp-toggle-type-sticky .cp-open-toggle.cp-toggle-bottom-center").css({ visibility: "visible", left: "50%", top: "auto", right: "auto", transform: "translateX(-50%)" })
                    : "top-center" == h
                    ? ((u = jQuery(".cp_style_" + a + " .cp-popup-content.cp-slide_in." + h)),
                      (_ = ".cp-open-toggle-wrap.cp-toggle-type-sticky .cp-open-toggle.cp-toggle-" + h),
                      u.each(function (e) {
                          var t = jQuery(this).attr("data-height"),
                              o = jQuery(this).attr("data-step");
                          jQuery(".cp_style_" + a + " .cp-panel-" + o + " " + _).css({ visibility: "visible", left: "50%", top: t + "px", bottom: "auto", right: "auto", transform: "translateX(-50%)" });
                      }))
                    : "top-left" == h || "top-right" == h
                    ? ((u = jQuery(".cp_style_" + a + " .cp-popup-content.cp-slide_in." + h)),
                      (_ = ".cp-open-toggle-wrap.cp-toggle-type-sticky .cp-open-toggle.cp-toggle-" + h),
                      u.each(function (e) {
                          var t = jQuery(this).attr("data-height"),
                              o = jQuery(this).attr("data-step");
                          jQuery(".cp_style_" + a + " .cp-panel-" + o + " " + _).css({ visibility: "visible", top: t + "px" });
                      }))
                    : jQuery(".cp-open-toggle-wrap.cp-toggle-type-sticky .cp-open-toggle").css({ visibility: "visible" }),
                    !(768 <= j(window).outerWidth() && "top-center" != i && "bottom-center" != i) && j(window).outerWidth() <= 768
                        ? "bottom-left" == h || "bottom-right" == h
                            ? (n.css({ transform: l + "translateX(-50%)" }),
                              jQuery(".cp-open-toggle-wrap.cp-toggle-type-sticky .cp-open-toggle.cp-toggle-" + h).css({ visibility: "visible", left: "50%", top: "auto", right: "auto", transform: "translateX(-50%)" }))
                            : "top-center" == h || "top-left" == h || "top-right" == h
                            ? ((u = jQuery(".cp_style_" + a + " .cp-popup-content.cp-slide_in." + h)),
                              (_ = ".cp-open-toggle-wrap.cp-toggle-type-sticky .cp-open-toggle.cp-toggle-" + h),
                              "top-center" == h ? n.css({ transform: l }) : n.css({ transform: l + "translateX(-50%)" }),
                              u.each(function (e) {
                                  var t = jQuery(this).attr("data-mobile-height"),
                                      o = jQuery(this).attr("data-step");
                                  jQuery(".cp_style_" + a + " .cp-panel-" + o + " " + _).css({ visibility: "visible", left: "50%", top: t + "px", bottom: "auto", right: "auto", transform: "translateX(-50%)" });
                              }))
                            : n.css({ transform: l })
                        : n.css({ transform: l });
            }
            "info_bar" == o && b(t),
                "slide_in" == o && y(t),
                setTimeout(function () {
                    j(document).trigger("cp-load-field-animation", [t]);
                }, 1e3);
        }),
        jQuery(document).on("cp-trigger-design", function (e, t) {
            void 0 !== initConvertPro[t] && initConvertPro[t].invokePopup();
        });
})(jQuery),
    (function (x, Q, I) {
        x(Q).ready(function () {
            var e = x('.cpro-form input[name="style_id"]').val();
            function k(e, t, o) {
                for (param_index = 0; param_index < e.length; ++param_index) {
                    var a;
                    "" == e[param_index].value || "param[date]" == e[param_index].name || "action" == e[param_index].name || "style_id" == e[param_index].name
                        ? delete e[param_index]
                        : ((a = (a = e[param_index].name.replace("param[", "")).substring(0, a.length - 1)), (e[param_index].name = a));
                }
                e = e.filter(function (e) {
                    return "" !== e;
                });
                return (e = jQuery.param(e)), 1 == o && (t = 1 == t.split("?").length ? t + "?" + e : t + "&" + e), t;
            }
            function j(e, t, o) {
                0 < e.closest(".cp-popup").find(".cp-popup-content.cp-panel-" + o).length &&
                    (e
                        .closest(".cp-popup")
                        .find(".cp-popup-content.cp-panel-" + t)
                        .removeClass("cpro-active-step"),
                    e
                        .closest(".cp-popup")
                        .find(".cp-popup-content.cp-panel-" + o)
                        .addClass("cpro-active-step"));
            }
            function S(e) {
                var t = e.lastIndexOf("/") + 1,
                    o = e.substr(t),
                    a = x("<a>");
                a.attr("href", e),
                    a.attr("download", o),
                    a.text("cpro_anchor_link"),
                    a.addClass("cpro_dummy_anchor"),
                    x("body").append(a),
                    x(".cpro_dummy_anchor")[0].click(),
                    setTimeout(function () {
                        x(".cpro_dummy_anchor").remove();
                    }, 500);
            }
            (styleIdSelctor = "cp_popup_style_" + e),
                x(document).on("click", ".cp-target.cp-button-field", function () {
                    var e = x(this);
                    e.closest(".cp-field-html-data").data("action");
                    x(".cp-current-clicked-btn").removeClass("cp-current-clicked-btn"), e.closest(".cp-field-html-data").addClass("cp-current-clicked-btn");
                }),
                x(document).on("click", ".cp-field-html-data.cp-shapes-wrap", function () {
                    var e = x(this),
                        t = e.closest(".cp-field-html-data").data("action");
                    ("submit" != t && "submit_n_close" != t && "submit_n_goto_step" != t && "submit_n_goto_url" != t) ||
                        (0 == x(".cp_shape_submit_hidden").length && e.find(".cp_shape_submit_label").append('<input type="submit" class="cp_shape_submit_hidden">')),
                        x(".cp-current-clicked-shape").removeClass("cp-current-clicked-shape"),
                        e.closest(".cp-field-html-data").addClass("cp-current-clicked-shape");
                }),
                jQuery(document).on("submit", "form.cpro-form", function (e) {
                    e.preventDefault();
                    var l = !1,
                        d = !1,
                        a = jQuery(this);
                    jQuery(document).trigger("cp_before_form_submit", [jQuery(this)]);
                    var s = !0;
                    if (
                        (jQuery(this)
                            .find(".cpro-checkbox-required")
                            .each(function (e, t) {
                                var o = jQuery(this);
                                if (
                                    (setTimeout(function () {
                                        o.find("input[type=checkbox]").removeAttr("required");
                                    }, 2e3),
                                    0 == jQuery(this).find("input[type=checkbox]:checked").length)
                                )
                                    return jQuery(this).find("input[type=checkbox]:first").attr("required", "required"), a[0].reportValidity(), (s = !1);
                            }),
                        !!s)
                    ) {
                        var u,
                            o,
                            n,
                            c,
                            r,
                            p,
                            i,
                            _,
                            h,
                            f,
                            m = jQuery(this),
                            t = m.closest(".cp-popup-container").data("style").replace("cp_style_", ""),
                            g = m.closest(".cp-popup-container").data("styleslug"),
                            b = m.find(".cp-form-input-field").css("text-transform");
                        ("uppercase" != b && "lowercase" != b && "capitalize" != b) ||
                            m
                                .closest(".cp-popup-container")
                                .find(".cp-form-field")
                                .each(function () {
                                    var e, t;
                                    (o = jQuery(this).attr("name")),
                                        (r = m.find('[name="' + o + '"]')),
                                        (i = r.attr("class")),
                                        I != i &&
                                            -1 != i.indexOf("cp-dropdown-field") &&
                                            ("uppercase" == b
                                                ? (_ = x('select[name="' + o + '"] option:selected')
                                                      .val()
                                                      .toUpperCase())
                                                : "lowercase" == b
                                                ? (_ = x('select[name="' + o + '"] option:selected')
                                                      .val()
                                                      .toLowerCase())
                                                : "capitalize" == b &&
                                                  (_ = x('select[name="' + o + '"] option:selected')
                                                      .val()
                                                      .toLowerCase()
                                                      .replace(/\b[a-z]/g, function (e) {
                                                          return e.toUpperCase();
                                                      })),
                                            x('select[name="' + o + '"] option:selected').attr("value", _)),
                                        I == i &&
                                            ((e = x(".cp-radio-field").length),
                                            (t = x(".cp-checkbox-field").length),
                                            0 < e &&
                                                jQuery(this)
                                                    .find("input:radio")
                                                    .each(function () {
                                                        (n = jQuery(this).attr("name")),
                                                            "uppercase" == b
                                                                ? (h = x('input[name="' + n + '"]:checked')
                                                                      .val()
                                                                      .toUpperCase())
                                                                : "lowercase" == b
                                                                ? (h = x('input[name="' + n + '"]:checked')
                                                                      .val()
                                                                      .toLowerCase())
                                                                : "capitalize" == b &&
                                                                  (h = x('input[name="' + n + '"]:checked')
                                                                      .val()
                                                                      .toLowerCase()
                                                                      .replace(/\b[a-z]/g, function (e) {
                                                                          return e.toUpperCase();
                                                                      })),
                                                            x('input[name="' + n + '"]:checked').attr("value", h);
                                                    }),
                                            0 < t &&
                                                jQuery(this)
                                                    .find("input:checkbox")
                                                    .each(function () {
                                                        (c = jQuery(this).attr("name")),
                                                            1 == x('input[name="' + c + '"]').is(":checked") &&
                                                                ("uppercase" == b
                                                                    ? (f = x('input[name="' + c + '"]:checked')
                                                                          .val()
                                                                          .toUpperCase())
                                                                    : "lowercase" == b
                                                                    ? (f = x('input[name="' + c + '"]:checked')
                                                                          .val()
                                                                          .toLowerCase())
                                                                    : "capitalize" == b &&
                                                                      (f = x('input[name="' + c + '"]:checked')
                                                                          .val()
                                                                          .toLowerCase()
                                                                          .replace(/\b[a-z]/g, function (e) {
                                                                              return e.toUpperCase();
                                                                          })),
                                                                x('input[name="' + c + '"]:checked').attr("value", f));
                                                    })),
                                        I != i &&
                                            ("param[email]" == o
                                                ? (p = r.val().toLowerCase())
                                                : "uppercase" == b
                                                ? (p = r.val().toUpperCase())
                                                : "lowercase" == b
                                                ? (p = r.val().toLowerCase())
                                                : "capitalize" == b &&
                                                  (p = r
                                                      .val()
                                                      .toLowerCase()
                                                      .replace(/\b[a-z]/g, function (e) {
                                                          return e.toUpperCase();
                                                      })),
                                            jQuery(this).attr("value", p));
                                });
                        var v = m.serialize();
                        m.closest(".cpro-form-container");
                        (redirectdata = m.data("redirect-lead-data")),
                            (currentBtn = m.find(".cp-current-clicked-btn")),
                            (currentShape = m.find(".cp-current-clicked-shape")),
                            (currentBtnAction = currentBtn.closest(".cp-field-html-data").data("action")),
                            (success_message = currentBtn.find(".cp-button-field").data("success-message")),
                            (currentShpAction = currentShape.closest(".cp-field-html-data").data("action")),
                            (success_message_shp = currentShape.data("success-message")),
                            (loader_style = "loader_1"),
                            (currObj = ""),
                            (u = currentBtn.find(".cp-button-field").html()),
                            (shape_old_text = currentShape.html());
                        var y = currentBtn.find(".cp-button-field"),
                            C = a.find(".g-recaptcha");
                        if (0 < C.length) {
                            if (0 === a.find('[name="g-recaptcha-response"]').val().length) return a.find(".recaptcha-msg-error").text("reCAPTCHA is Mandatory"), void (C.hasClass("error") || C.addClass("error"));
                            a.find(".recaptcha-msg-error").text(""), C.removeClass("error");
                        }
                        ("cp_button" != currentBtn.attr("data-type") && "cp_gradient_button" != currentBtn.attr("data-type")) ||
                            ((currObj = currentBtn),
                            y.removeClass("cp-tooltip cp-tooltip-top cp-tooltip-bottom cp-loader"),
                            y.find(".cp_loader_container").removeClass("cp_success_loader_container"),
                            currentBtn.hasClass("cp-state-loading") ||
                                currentBtn.hasClass("cp-state-success") ||
                                currentBtn.hasClass("cp-state-error") ||
                                (currentBtn.addClass("cp-state-loading"),
                                y.addClass("cp-loader cp-button-loading"),
                                currentBtn.find(".cp-loader").css("text-align", "center"),
                                y.html("<div class='cp_loader_container'><i class='cp-button-loader-style draw " + loader_style + "'></i></div>"),
                                ("submit_n_close" != currentBtnAction && "submit" != currentBtnAction && "submit_n_goto_url" != currentBtnAction) ||
                                    ("" != success_message.trim() &&
                                        null != success_message.trim() &&
                                        (y.addClass("cp-button-tooltip"),
                                        setTimeout(function () {
                                            y.removeClass("cp-button-tooltip");
                                        }, 5e3))))),
                            "cp_shape" == currentShape.attr("data-type") &&
                                ((currObj = currentShape),
                                currentShape.find(".cp-shape-container").removeClass("cp-tooltip-top cp-tooltip-bottom"),
                                currentShape.removeClass("cp-shape-submit-loading cp-state-success cp-error-tooltip"),
                                currentShape.hasClass("cp-state-loading") ||
                                    currentShape.hasClass("cp-state-success") ||
                                    currentShape.hasClass("cp-state-error") ||
                                    (currentShape.addClass("cp-shape-submit-loading"),
                                    ("submit_n_close" != currentShpAction && "submit" != currentShpAction && "submit_n_goto_url" != currentShpAction) || currentShape.find(".cp-shape-submit-loading").addClass("cp-shapes-tooltip"))),
                            void 0 !== cp_ajax.ajax_nonce && (v += "&_nonce=" + cp_ajax.ajax_nonce),
                            void 0 !== cp_ajax.cpro_mx_valid && (v += "&mx_valid=" + cp_ajax.cpro_mx_valid),
                            (close_span = '<span class="cp-tooltip-close">&times;</span>');
                        var w = a.find('[name="param[email]"]').val();
                        jQuery.ajax({
                            url: cp_ajax.url,
                            data: v,
                            type: "POST",
                            dataType: "json",
                            success: function (e) {
                                var t = currentBtn.closest(".cp-popup-wrapper").find("input[name=style_id]").val(),
                                    o = x(".cpro-onload[data-class-id=" + t + "]"),
                                    a = currentBtn.find(".cp-button-field");
                                if (
                                    (a.find(".cp_loader_container").addClass("cp_success_loader_container"),
                                    a.find(".cp-button-loader-style").removeClass(loader_style).addClass("success-loader-style"),
                                    (result = e.data),
                                    (error_msg = cp_ajax.not_connected_to_mailer),
                                    currentBtn.find(".cp-target").hasClass("cp-button-field")
                                        ? (90 < currentBtn.find(".cp-button-field").offset().top - x(Q).scrollTop()
                                              ? currentBtn.find(".cp-button-field").addClass("cp-tooltip-top")
                                              : currentBtn.find(".cp-button-field").addClass("cp-tooltip-bottom"),
                                          currentBtn.removeClass("cp-state-loading").addClass("cp-state-success").attr("style", "z-index: 999 !important"))
                                        : currentShape.hasClass("cp-shapes-wrap") &&
                                          (90 < currentShape.offset().top - x(Q).scrollTop() ? currentShape.find(".cp-shape-container").addClass("cp-tooltip-top") : currentShape.find(".cp-shape-container").addClass("cp-tooltip-bottom"),
                                          currentShape.removeClass("cp-state-loading").addClass("cp-state-success").attr("style", "z-index: 999 !important")),
                                    0 === e)
                                )
                                    (l = !1),
                                        currentBtn.find(".cp-target").hasClass("cp-button")
                                            ? (currentBtn.removeClass("cp-current-clicked-btn").addClass("cp-error-tooltip"), currentBtn.find(".cp-btn-tooltip").html('<div class="cp-error-tip-content">' + error_msg + close_span + "</div>"))
                                            : currentShape.hasClass("cp-shapes-wrap") &&
                                              (currentShape.removeClass("cp-current-clicked-shape").addClass("cp-error-tooltip"),
                                              currentShape.find(".cp-shape-tooltip").html('<div class="cp-error-tip-content">' + error_msg + close_span + "</div>"));
                                else if ((console.log(e), 0 != result.error))
                                    "Invalid email address." == result.error && ((error_msg = cp_ajax.invalid_email_id), (d = !0)),
                                        1 == result.error && (error_msg = "Google Recaptcha Secret Key Not Valid!!!! Please contact web administrator."),
                                        (l = !1),
                                        currentBtn.find(".cp-target").hasClass("cp-button")
                                            ? (currentBtn.removeClass("cp-current-clicked-btn").removeClass("cp-state-success").addClass("cp-error-tooltip"),
                                              currentBtn.find(".cp-button-field").find(".cp_success_loader_container").remove(),
                                              jQuery("<div/>", { addClass: "cp_loader_container cp_error_loader_container" }).appendTo(currentBtn.find(".cp-button-field")),
                                              currentBtn.find(".cp_error_loader_container").append("<i class='dashicons-no-alt dashicons'></i>"),
                                              jQuery("<div/>", { class: "cp-error-tip-content" }).appendTo(currentBtn.find(".cp-btn-tooltip")),
                                              currentBtn.find(".cp-error-tip-content").append(error_msg + close_span))
                                            : currentShape.hasClass("cp-shapes-wrap") &&
                                              (currentShape.removeClass("cp-current-clicked-shape").removeClass("cp-state-success").addClass("cp-error-tooltip"),
                                              currentShape.find(".cp-shape-tooltip").html('<div class="cp-error-tip-content">' + error_msg + close_span + "</div>"),
                                              currentShape.find(".cp-button-field").html("<div class='cp_loader_container cp_error_loader_container'><i class='dashicons-no-alt dashicons'></i></div>"));
                                else {
                                    if (((l = !0), 0 == result.error))
                                        if (currentBtn.find(".cp-target").hasClass("cp-button"))
                                            switch (
                                                (currentBtn.removeClass("cp-error-tooltip").addClass("cp-state-success"),
                                                currentBtn.find(".cp-button-field").attr("data-content", success_message),
                                                currentBtn.find(".cp-button-field").attr("disabled", !0),
                                                currentBtnAction)
                                            ) {
                                                case "submit_n_close":
                                                    setTimeout(function () {
                                                        jQuery(document).trigger("closePopup", [o, t]);
                                                    }, 1200);
                                                    break;
                                                case "submit_n_goto_step":
                                                    var s = currentBtn.closest(".cp-field-html-data").data("step");
                                                    (i = currentBtn.closest(".cp-popup-content").data("step")) != s &&
                                                        setTimeout(function () {
                                                            j(currentBtn, i, s);
                                                        }, 1200);
                                                    break;
                                                case "submit_n_goto_url":
                                                    var n = currentBtn.closest(".cp-field-html-data").data("redirect"),
                                                        c = currentBtn.closest(".cp-field-html-data").data("redirect-target"),
                                                        r = currentBtn.find(".cp-target").data("get-param"),
                                                        p = currentBtn.closest(".cpro-form").serializeArray();
                                                    (n = k(p, n, r)),
                                                        setTimeout(function () {
                                                            (void 0 !== c && "" != c) || (c = "_self"),
                                                                "" !== n && ("_self" !== c ? Q.open(n, c) : 0 < n.indexOf(".pdf") ? S(n) : (Q.location = n), "_blank" == c && jQuery(document).trigger("closePopup", [o, t]));
                                                        }, 1200);
                                            }
                                        else if (currentShape.hasClass("cp-shapes-wrap"))
                                            switch (
                                                (currentShape.removeClass("cp-error-tooltip").removeClass("cp-shape-submit-loading").addClass("cp-state-success"),
                                                currentShape.attr("style", "z-index: 35 !important"),
                                                currentShape.find(".cp-shape-container").attr("data-content", success_message_shp),
                                                currentShpAction)
                                            ) {
                                                case "submit_n_close":
                                                    (t = currentShape.closest(".cp-popup-wrapper").find("input[name=style_id]").val()), (o = x(".cpro-onload[data-class-id=" + t + "]"));
                                                    setTimeout(function () {
                                                        jQuery(document).trigger("closePopup", [o, t]);
                                                    }, 1200);
                                                    break;
                                                case "submit_n_goto_step":
                                                    currentShape.find(".cp-shape-container").removeClass("cp-tooltip-top").removeClass("cp-tooltip-bottom");
                                                    var i,
                                                        s = currentShape.closest(".cp-field-html-data").data("step");
                                                    (i = currentShape.closest(".cp-popup-content").data("step")) != s &&
                                                        setTimeout(function () {
                                                            j(currentShape, i, s);
                                                        }, 1200);
                                                    break;
                                                case "submit_n_goto_url":
                                                    (n = currentShape.closest(".cp-field-html-data").data("redirect")),
                                                        (c = currentShape.closest(".cp-field-html-data").data("redirect-target")),
                                                        (r = currentShape.closest(".cp-field-html-data").data("get-param")),
                                                        (p = currentShape.closest(".cpro-form").serializeArray());
                                                    (n = k(p, n, r)),
                                                        setTimeout(function () {
                                                            (void 0 !== c && "" != c) || (c = "_self"),
                                                                "" !== n && ("_self" !== c ? Q.open(n, c) : 0 < n.indexOf(".pdf") ? S(n) : (Q.location = n), "_blank" == c && jQuery(document).trigger("closePopup", [o, t]));
                                                        }, 1200);
                                            }
                                        else
                                            currentBtn.find(".cp-target").hasClass("cp-button")
                                                ? (currentBtn.addClass("cp-error-tooltip"), currentBtn.find(".cp-button-field").attr("data-content", result.error))
                                                : currentShape.hasClass("cp-shapes-wrap") &&
                                                  (currentShape.removeClass("cp-current-clicked-shape").addClass("cp-error-tooltip"), currentShape.find(".cp-shape-container").attr("data-content", result.error));
                                    new ConvertProPopup()._setCookie(currObj);
                                }
                                setTimeout(function () {
                                    d &&
                                        (0 < currentBtn.length &&
                                            (currentBtn.find(".cp-button-field").html(u),
                                            currentBtn.find(".cp-button-field").removeClass("cp-tooltip-top cp-tooltip-bottom"),
                                            currentBtn.closest(".cp-field-html-data").find(".cp-error-tip-content").remove()),
                                        0 < currentShape.length &&
                                            (currentShape.find(".cp-shape-container").html(shape_old_text),
                                            currentShape.find(".cp-shape-container").removeClass("cp-tooltip-top cp-tooltip-bottom"),
                                            currentShape.closest(".cp-field-html-data").find(".cp-error-tip-content").remove()));
                                }, 1500),
                                    setTimeout(function () {
                                        currentBtn.find(".cp-target .cp_loader_container").hasClass("cp_success_loader_container")
                                            ? currentBtn.find(".cp-button-field").removeClass("cp-tooltip-top cp-tooltip-bottom")
                                            : currentShape.hasClass("cp-shapes-wrap") && !currentShape.hasClass("cp-error-tooltip") && currentShape.find(".cp-shape-container").removeClass("cp-tooltip-top cp-tooltip-bottom");
                                    }, 5e3),
                                    currentBtn.removeClass("cp-current-clicked-btn"),
                                    currentShape.removeClass("cp-current-clicked-shape"),
                                    d || jQuery(document).trigger("cp_after_form_submit", [jQuery(this), e, g, w]);
                            },
                            error: function (e) {
                                (l = !1), currentBtn.find(".cp-button-field").attr("data-content", e);
                            },
                        });
                    }
                    d || jQuery(document).trigger("cp_after_submit_action", [jQuery(this), t, l]), e.preventDefault();
                }),
                x(document).on("click", ".cp-tooltip-close", function (e) {
                    var t = x(this),
                        o = t.closest("form.cpro-form");
                    o.find(".cp-current-clicked-btn"), o.find(".cp-current-clicked-shape");
                    t.closest(".cp-error-tip-content").remove(), o.find(".cp-button-field").removeClass("cp-button-tooltip"), o.find(".cp-shape-container").removeClass("cp-tooltip-top");
                }),
                x(document).on("click", ".cp-field-html-data", function () {
                    var e = x(this),
                        t = e.data("action");
                    !(function (e, t) {
                        var o = e.closest(".cp-popup-content").data("step"),
                            a = e.closest(".cp-popup-wrapper").find("input[name=style_id]").val(),
                            s = x(".cpro-onload[data-class-id=" + a + "]"),
                            n = e.hasClass("cpro_count_conversion");
                        {
                            var c, r;
                            x(document).trigger("cpro_before_field_actions", [e, a]),
                                n &&
                                    ((c = cp_ga_object.ga_category_name),
                                    (r = e.closest(".cp-popup-container").data("styleslug")),
                                    "function" == typeof cpCreateGoogleAnalyticEvent && cpCreateGoogleAnalyticEvent(c, "conversion", r),
                                    new ConvertProPopup()._setCookie(e));
                        }
                        switch (t) {
                            case "close":
                                x(document).trigger("closePopup", [s, a]);
                                break;
                            case "close_tab":
                                Q.top.close();
                                break;
                            case "goto_step":
                                var p = e.closest(".cp-field-html-data").data("step");
                                if (o != p) {
                                    var i = e.closest(".cpro-form-container").find("input, select, textarea");
                                    e.closest(".cpro-form-container")
                                        .find(".cpro-checkbox-required")
                                        .each(function (e, t) {
                                            var o = jQuery(this),
                                                a = jQuery(this).find("input[type=checkbox]:checked").length;
                                            if (
                                                (setTimeout(function (e) {
                                                    o.find("input[type=checkbox]").removeAttr("required");
                                                }, 2e3),
                                                0 == a)
                                            ) {
                                                var s = jQuery(this).find("input[type=checkbox]:first");
                                                if (void 0 !== s) return s.attr("required", "required"), s[0].reportValidity(), !1;
                                            }
                                        });
                                    var l,
                                        d = e.closest(".cpro-form-container").find(".g-recaptcha");
                                    if (0 < d.length) {
                                        if (0 === e.closest(".cpro-form-container").find('[name="g-recaptcha-response"]').val().length)
                                            return e.closest(".cpro-form-container").find(".recaptcha-msg-error").text("reCAPTCHA is Mandatory"), d.hasClass("error") || d.addClass("error");
                                        e.closest(".cpro-form-container").find(".recaptcha-msg-error").text(""), d.removeClass("error");
                                    }
                                    0 < i.length
                                        ? ((l = !0),
                                          o < p &&
                                              x.each(i, function (e, t) {
                                                  if (!t.checkValidity()) return (l = !1), t.reportValidity(), !1;
                                              }),
                                          l && j(e, o, p))
                                        : j(e, o, p);
                                }
                                break;
                            case "goto_url":
                                var u = e.data("redirect");
                                (void 0 !== (_ = e.data("redirect-target")) && "" != _) || (_ = "_self"), "" !== u && ("_self" !== _ ? Q.open(u, _) : 0 < u.indexOf(".pdf") ? S(u) : (Q.location = u));
                                break;
                            case "close_n_goto_url":
                                var _,
                                    u = e.data("redirect");
                                (void 0 !== (_ = e.data("redirect-target")) && "" != _) || (_ = "_self"),
                                    "" !== u && ("_self" !== _ ? Q.open(u, _) : 0 < u.indexOf(".pdf") ? S(u) : (Q.location = u), x(document).trigger("closePopup", [s, a]));
                        }
                    })(e, t),
                        "cp_button" !== jQuery(this).data("type") && "cp_gradient_button" !== jQuery(this).data("type") && e.removeClass("cp-current-clicked-btn"),
                        "cp_shape" !== jQuery(this).data("type") && e.removeClass("cp-current-clicked-shape");
                });
        });
    })(jQuery, window);
var CProVideo = "";
!(function (n) {
    (CProVideo = {
        init: function (e, t, o) {
            n(window).on("cp_after_popup_open", this._playVideo), n(document).on("closePopup", this._stopVideo);
        },
        _playVideo: function (e, t, o, a) {
            t.find(".cpro-video-container").each(function () {
                var e = jQuery(this).closest(".cp-field-html-data"),
                    t = e.data("autoplay"),
                    o = e.data("src"),
                    a = e.find("iframe"),
                    s = a.attr("src");
                a.attr("id");
                switch (o) {
                    case "youtube":
                        t && ((s = s.replace("&autoplay=0", "")), (s += "&autoplay=1"), a.attr("src", s));
                        break;
                    case "vimeo":
                        t && ((s += "?autoplay=1"), a.attr("src", s));
                        break;
                    case "custom_url":
                        t &&
                            setTimeout(function () {
                                e.find(".cpro-video-iframe")[0].play();
                            }, 500);
                }
            });
        },
        _stopVideo: function (e, t, o) {
            n(".cp_style_" + o)
                .find(".cp-video-wrap")
                .each(function () {
                    var e = n(this),
                        t = e.data("src"),
                        o = e.find("iframe"),
                        a = o.attr("src");
                    switch (t) {
                        case "youtube":
                            var s = a.replace("autoplay=1", "autoplay=0");
                            o.attr("src", s);
                            break;
                        case "vimeo":
                            o.prop("src", "").prop("src", a.replace("?autoplay=1", ""));
                            break;
                        case "custom_url":
                            e.find("video")[0].pause();
                    }
                });
        },
    }).init();
})(jQuery);
jQuery(document).on("cp_after_form_submit", function (e, element, response, style_slug) {
    if (!1 == response.data.error) {
        if ("undefined" !== typeof response.data.cfox_data) {
            var form_data = JSON.parse(response.data.cfox_data);
            form_data.overwrite_tags = !1;
            if ("undefined" !== typeof convertfox) {
                convertfox.identify(form_data);
            }
        }
    }
});
