require('./selThead.less')
function Select(param) {
    var self = this;
    var titleParam = param.title,
        keyParam = param['key'],
        optionParam = param.option;
    self.change = function () {};

    var dropdown = $('<div class="dropdown open"></div>');
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
    /*self.getValue = function () {
        return  select.val();
    };*/
    /*select[0].onchange = function () {
        self.change(self.getValue());
    };*/
    return self;

}

module.exports=Select;