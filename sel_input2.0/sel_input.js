require('./sel_input.less');
function SelInput(param) {
    var self = this;
    self.change = function () {};
    var inputParam = param.input,
        selParam = param.select,
        optionParam = selParam.option;

    var select = $('<select class="form-select form-control"></select>');
    var input = $('<input type="text" class="form-control" placeholder="'+inputParam.placeholder+'">');
    var formGroup = $('<div class="formGroup"></div>');
    var button = $('<button type="button" class="btn search"></button>');
    button.append('<i class="fa fa-search"></i>');

    if(selParam.isPlace){/*select 占位符*/
        select.append('<option value="0" style="display:none;">'+selParam.placeholder+'</option>');
    }

    for(var k in optionParam){
        select.append('<option value="'+k+'">'+optionParam[k]+'</option>');
    }
    formGroup.append(select).append(input).append(button);

    if(inputParam.isSearch){
        button.css({'display':'inline-block'});
    }
    self.content = formGroup;
    self.getValue = function () {
        var obj = {};
        obj['select'] = select.val();
        obj['input'] = input.val();
        return obj;
    };

    button.click(function(){
        self.change();
    });
    return self;
}

module.exports=SelInput;