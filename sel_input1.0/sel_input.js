require('./sel_input.less');
function SelInput(param) {
    var self = this;
    var inputParam = param.input,
        selParam = param.select,
        optionParam = selParam.option;

    var select = $('<select class="form-select form-control"></select>');
    var input = $('<input type="text" class="form-control" placeholder="'+inputParam.placeholder+'">');
    var formGroup = $('<div class="form-group"></div>');

    if(selParam.isPlace){/*select 占位符*/
        select.append('<option value="0" style="display:none;">'+selParam.placeholder+'</option>');
    }

    for(var k in optionParam){
        select.append('<option value="'+k+'">'+optionParam[k]+'</option>');
    }
    formGroup.append(select).append(input);
    self.content = formGroup;
    self.change = function () {
        var obj = {};
        obj['select'] = select.val();
        obj['input'] = input.val();
        return obj;
    };
    return self;

}

module.exports=SelInput;