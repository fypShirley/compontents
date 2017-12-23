require('./select.less');
function Select(param) {
    var self = this;
    var spanParam = param.span,
        selParam = param.select,
        optionParam = selParam.option;
    self.change = function () {};
    var select = $('<select class="form-select form-control"></select>');
    var span = '';
    var formGroup = $('<div class="form-group"></div>');
    if(spanParam.isShow){
        span = $('<span class="sel-title">'+spanParam.text+':</span>')
    }
    if(selParam.isPlace){
        select.append('<option value="0" style="display:none;">'+selParam.placeholder+'</option>');
    }

    for(var k in optionParam){
        select.append('<option value="'+k+'">'+optionParam[k]+'</option>');
    }
    formGroup.append(span).append(select);

    self.content = formGroup;
    self.getValue = function () {
        return  select.val();
    };
    select[0].onchange = function () {
        self.change(self.getValue());
    };

    self.update = function(option){
        select.empty();
        for(var key in option){
            select.append('<option value="'+key+'">'+option[key]+'</option>');
        }
    };
    return self;



    
}

module.exports=Select;