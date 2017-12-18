require('./selThead.less')
function Select(param) {
    var self = this;
    var titleParam = param.title,
        keyParam = param['key'],
        optionParam = param.option;
    self.change = function () {};

    var dropdown = $('<div class="dropdown"></div>');
    var ul = $('<ul  class="dropdown-menu"></ul>');
    var linkA = $('<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown"></a>');
    var titleSpan = $('<span>'+titleParam+'</span>');
    var filterSpan = $('<span id="saleTitle">(全部)</span>');
    var caretSpan = $('<span class="caret"></span>');
    for(var k in optionParam){
        ul.append(
            '<li class="sel" data-num="'+k+'">'+
            '<a href="javascript:">'+
            '<span>'+optionParam[k]+'</span>'+
            '</a>'+
            '</li>'
        );
    }
    linkA.append(titleSpan)
        .append(filterSpan)
        .append(caretSpan);

    dropdown.append(linkA)
        .append(ul);
    self.content = dropdown;
    self.getValue = function (num) {
        return  num;
    };
    ul.on('click','li',function(){
        var li_val = $(this).attr('data-num');
        self.change(self.getValue(li_val));
    });

    /*更新下拉菜单项*/
    self.update = function(option){
        ul.empty();
        for(var key in option){
            ul.append(
                '<li class="sel" data-num="'+key+'">'+
                '<a href="javascript:">'+
                '<span>'+option[k]+'</span>'+
                '</a>'+
                '</li>'
            );
        }
    };
    return self;

}

module.exports=Select;