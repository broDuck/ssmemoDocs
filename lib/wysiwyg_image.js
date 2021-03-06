﻿(function () {
    var toolbar_id;

    (function ($) {
        var selRange;
        var methods;
        methods = {
            edit: function (isEditing) {
                return this.each(function () {
                    return $(this).attr("contentEditable", isEditing || false);
                });
            },
            save: function (callback) {
                return this.each(function () {
                    return callback($(this).attr('id'), $(this).html());
                });
            },
            createlink: function () {
                var urlPrompt;
                urlPrompt = prompt("Enter URL:", "http://");
                return document.execCommand("createlink", false, urlPrompt);
            },
            unlink: function () {
                return document.execCommand("unlink", false, null);
            },
            insertimage: function () {
                var urlPrompt;
                urlPrompt = prompt("Enter Image URL:", "http://");
                return document.execCommand("insertimage", false, urlPrompt);
            },
            formatblock: function (block) {
                return document.execCommand("formatblock", null, block);
            },
            init: function (opts) {
                var $toolbar, button, command, commands, excludes, font, font_list, fontnames, fontsize, fontsizes, fontinfos, font_info, finfo, group, groups, options, shortcuts, size_list, _i, _j, _k, _l, _m, _len, _len2, _len3, _len4, _len5;
                options = opts || {};
                groups = [
                  [
                    {
                        name: 'bold',
                        label: "<i class='fa fa-bold'></i>",
                        title: '진하게 (Ctrl+B)',
                        classname: 'toolbar_bold'
                    }, {
                        name: 'italic',
                        label: "<i class='fa fa-italic'></i>",
                        title: '기울임 (Ctrl+I)',
                        classname: 'toolbar_italic'
                    }
                  ], [
                    {
                        name: 'fontname',
                        label: "<i class='fa fa-font'></i><span class='caret'></span>",
                        title: '글꼴',
                        classname: 'toolbar_fontname dropdown-toggle',
                        dropdown: true
                    }
                  ], [
                    {
                        name: 'FontSize',
                        label: "<i class='fa fa-text-height'></i><span class='caret'></span>",
                        title: '글자크기',
                        classname: 'toolbar_fontsize dropdown-toggle',
                        dropdown: true
                    }
                  ],
                    [
                    {
                        name: 'forecolor',
                        label: "<div style='color:#000000;'>M<span class='caret'></span></div>",
                        title: '이동',
                        classname: 'toolbar_forecolor dropdown-toggle',
                        dropdown: true
                    }
                  ],
                    // [
                  //  {
                  //      name: 'backcolor',
                  //      label: "<div style='display:inline-block;width:15px;height:12px;background-color:#000000;'></div> <span class='caret'></span>",
                  //      title: '글 배경색',
                  //      classname: 'toolbar_bgcolor dropdown-toggle',
                  //      dropdown: true
                  //  }
                  //],
                    [
                    {
                        name: 'justifyleft',
                        label: "<i class='fa fa-align-left'></i>",
                        title: '왼쪽 정렬',
                        classname: 'toolbar_justifyleft'
                    }, {
                        name: 'justifycenter',
                        label: "<i class='fa fa-align-center'></i>",
                        title: '가운데 정렬',
                        classname: 'toolbar_justifycenter'
                    }, {
                        name: 'justifyright',
                        label: "<i class='fa fa-align-right'></i>",
                        title: '오른쪽 정렬',
                        classname: 'toolbar_justifyright'
                    }, {
                        name: 'justifyfull',
                        label: "<i class='fa fa-align-justify'></i>",
                        title: '양쪽 정렬',
                        classname: 'toolbar_justifyfull'
                    }
                  ]
                ];
                if (options.toolbar_selector != null) {
                    $toolbar = $(options.toolbar_selector);
                    toolbar_id = $toolbar.attr('id');
                } else {
                    $(this).before("<div id='editor-toolbar'></div>");
                    $toolbar = $('#editor-toolbar');
                }
                $toolbar.addClass('wysiwyg-toolbar');
                $toolbar.append("<div class='btn-toolbar'></div>");
                excludes = options.excludes || [];
                for (_i = 0, _len = groups.length; _i < _len; _i++) {
                    commands = groups[_i];
                    group = '';
                    for (_j = 0, _len2 = commands.length; _j < _len2; _j++) {
                        command = commands[_j];
                        if (jQuery.inArray(command.name, excludes) < 0) {
                            button = "<a href='#' class='btn btn-sm btn-white toolbar-btn toolbar-cmd " + command.classname + "' title='" + command.title + "' command='" + command.name + "'";
                            if (command.userinput != null) {
                                button += " userinput='" + command.userinput + "'";
                            }
                            if (command.block != null) {
                                button += " block='" + command.block + "'";
                            }
                            if (command.dropdown) {
                                button += " data-toggle='dropdown'";
                            }
                            button += ">" + command.label + "</a>";
                            group += button;
                        }
                    }
                    $('.btn-toolbar', $toolbar).append("<div class='btn-group'>" + group + "</div>");
                }
                $('.btn-toolbar', $toolbar).append("<div class='btn-group'>" + group + "</div>");
                $("[data-toggle='dropdown']").removeClass('toolbar-cmd');
                //if (jQuery.inArray('fontname', excludes) < 0) {
                //    fontnames = ["돋움체", "바탕체", "굴림체", "궁서체", "고딕체", "Arial", "Arial Black", "Comic Sans MS", "Courier New", "Georgia", "Helvetica", "Sans Serif"];
                //    font_list = '';
                //    for (_k = 0, _len3 = fontnames.length; _k < _len3; _k++) {
                //        font = fontnames[_k];
                //        font_list += "<li><a href='#' class='fontname-option' style='font-family:" + font + ";'>" + font + "</a></li>";
                //    }
                //    $('#' + toolbar_id + ' .toolbar_fontname').after("<ul class='dropdown-menu'>" + font_list + "</ul>");
                //    $('.fontname-option').on('click', function () {
                //        document.execCommand("fontname", false, $(this).text());
                //        $(this).closest('.btn-group').removeClass('open');
                //        return false;
                //    });
                //}
                //if (jQuery.inArray('FontSize', excludes) < 0) {
                //    fontsizes = [
                //      {
                //          size: '가나다라',
                //          point: 1
                //      }, {
                //          size: '가나다라',
                //          point: 2
                //      }, {
                //          size: '가나다라',
                //          point: 3
                //      }, {
                //          size: '가나다라',
                //          point: 4
                //      }, {
                //          size: '가나다라',
                //          point: 5
                //      }, {
                //          size: '가나다라',
                //          point: 6
                //      }, {
                //          size: '가나다라',
                //          point: 7
                //      }
                //    ];
                //    size_list = '';
                //    for (_l = 0, _len4 = fontsizes.length; _l < _len4; _l++) {
                //        fontsize = fontsizes[_l];
                //        size_list += "<li><a href='#' class='font-option fontsize-option' fontsize='" + fontsize.point + "'><font size='" + fontsize.point + "'>" + fontsize.size + "(" + fontsize.point + ")</font></a></li>";
                //    }
                //    $('.toolbar_fontsize').after("<ul class='dropdown-menu'>" + size_list + "</ul>");
                //    $('a.fontsize-option').on('click', function () {
                //        document.execCommand("FontSize", false, $(this).attr('fontsize'));
                //        $(this).closest('.btn-group').removeClass('open');
                //        return false;
                //    });
                //}

                //if (jQuery.inArray('forecolor', excludes) < 0) {
                //    $('#' + toolbar_id + ' a.toolbar_forecolor').after("<ul class='dropdown-menu colorpanel'><input type='text' id='forecolor-input' value='#000000' /><div id='forecolor-picker'></div></ul>");
                //    $('.colorpanel').click(function (e) {
                //        e.stopPropagation();
                //    });
                //    $('#' + toolbar_id + ' #forecolor-picker').farbtastic(function (color) {
                //        $('#forecolor-input').val(color);
                //        document.execCommand("forecolor", false, color);
                //        return false;
                //    });
                //}
                //if (jQuery.inArray('backcolor', excludes) < 0) {
                //    $('#' + toolbar_id + ' a.toolbar_bgcolor').after("<ul class='dropdown-menu colorpanel'><input type='text' id='bgcolor-input' value='#000000' /><div id='bgcolor-picker'></div></ul>");
                //    $('.colorpanel').click(function (e) {
                //        e.stopPropagation();
                //    });
                //    $('#' + toolbar_id + ' #bgcolor-picker').farbtastic(function (color) {
                //        $('#bgcolor-input').val(color);
                //        document.execCommand("backcolor", false, color);
                //        return false;
                //    });
                //}
                $(this).on('focus', function () {
                    var $this;
                    $this = $(this);
                    $this.data('before', $this.html());
                    return $this;
                }).on('blur keyup paste', function () {
                    var $this;
                    $this = $(this);
                    if ($this.data('before') !== $this.html()) {
                        $this.data('before', $this.html());
                        $this.trigger('change');
                    }
                    return $this;
                });
                $("a.toolbar-cmd").on('click', function () {
                    var ceNode, cmd, dummy, range;
                    cmd = $(this).attr('command');
                    if ($(this).attr('userinput') === 'yes') {
                        methods[cmd].apply(this);
                    } else if ($(this).attr('block')) {
                        methods['formatblock'].apply(this, ["<" + ($(this).attr('block')) + ">"]);
                    } else {
                        if ((cmd === 'justifyright') || (cmd === 'justifyleft') || (cmd === 'justifycenter') || (cmd === 'justifyfull')) {
                            try {
                                document.execCommand(cmd, false, null);
                            } catch (e) {
                                if (e && e.result === 2147500037) {
                                    range = window.getSelection().getRangeAt(0);
                                    dummy = document.createElement('br');
                                    ceNode = range.startContainer.parentNode;
                                    while ((ceNode != null) && ceNode.contentEditable !== 'true') {
                                        ceNode = ceNode.parentNode;
                                    }
                                    if (!ceNode) {
                                        throw 'not editable';
                                    }
                                    ceNode.insertBefore(dummy, ceNode.childNodes[0]);
                                    document.execCommand(cmd, false, null);
                                    dummy.parentNode.removeChild(dummy);
                                } else if (console && console.log) {
                                    console.log(e);
                                }
                            }
                        } else {
                            document.execCommand(cmd, false, null);
                        }
                    }
                    return false;
                });
                shortcuts = [];
                $.each(shortcuts, function (index, elem) {
                    return shortcut.add(elem.keys, function () {
                        elem.method();
                        return false;
                    }, {
                        'type': 'keydown',
                        'propagate': false
                    });
                });
                return this.each(function () {
                    var $this, data, tooltip;
                    $this = $(this);
                    data = $this.data('wysiwyg');
                    tooltip = $('<div/>', {
                        text: $this.attr('title')
                    });
                    if (!data) {
                        return $(this).data('wysiwyg', {
                            target: $this,
                            tooltip: tooltip
                        });
                    }
                });
            }
        };
        return $.fn.wysiwyg = function (method) {
            if (methods[method]) {
                methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                methods.init.apply(this, arguments);
            } else {
                $.error('Method ' + method + ' error');
            }
        };

    })(jQuery);
}).call(this);
