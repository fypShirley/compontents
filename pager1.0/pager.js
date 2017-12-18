/**
 * Created by bk on 2017/11/23.
 */
var tplPager = require('./pager.html');
require ('./pager.less');
function Pager(param){  /*{pages:0,current:1,total:0,node:0};*/
  var self = this;
  self.info = param;
  var Info = self.info;
  self.change = function () {};
  self.getNumValue= function(num){
    Info.current = num;self.update(Info);
    return num;
  };
  self.getPreValue = function(){
    Info.current = Info.current-1;self.update(Info);
    return Info.current;
  }
  self.getNextValue = function(){
    Info.current = Info.current+1;self.update(Info);
    return Info.current;
  }

  var pageBox = $(tplPager);
  var pageCount = pageBox.find('.pageCount');
  var pageCounts = pageBox.find('.pageCounts');

  /*上一页下一页*/

  var prev = $('<span class="prev"> <i class="fa fa-lg fa-angle-left"></i></span>');
  var next = $('<span class="next"> <i class="fa fa-lg fa-angle-right"></i></span>');
  if(Info.current == 1){
    prev.css("cursor","not-allowed");
  }

  if(Info.current == Info.pages){
    next.css("cursor","not-allowed");
  }

  prev[0].onclick = function(){
    if(Info.current > 1){
      self.change(self.getPreValue());
    }

  };
  next[0].onclick = function(){
    if(Info.current < Info.pages){
      self.change(self.getNextValue());
    }

  };
  /*数字首尾*/
  var firstSpan = $('<span value="1">1..</span>');
  var lastSpan = $('<span value='+Info.pages+'>..'+Info.pages+'</span>');

  var span = '';
  var SpanParam = $('<div style="display: inline-block">');

  self.update = function(Info){
    if(Info.pages <= 5){//前五页
      for(var i=1;i<=Info.pages;i++){
        span = $('<span value="'+i+'">' + i + '</span>');
        if(i == Info.current){
          span.addClass('active');
        }
        SpanParam.append(span);
      }

    }else if(Info.pages > 5){//大于5页

      if(Info.current <=3 ){//前三个
        for(var j=1;j<=5;j++){
          span = $('<span value=' + j + '>' + j + '</span>');
          if(j == Info.current){
            span.addClass('active');
          }
          SpanParam.append(span);
        }
        SpanParam.append(lastSpan);
      }

      else if((Info.pages-3)< Info.current){//后三页
        SpanParam.append(firstSpan);

        for(var m = (Info.pages-4); m <= Info.pages; m++) {
          span = $('<span value=' + m + '>' + m + '</span>');
          if(m == Info.current){
            span.addClass('active');
          }
          SpanParam.append(span);
        }
      }

      else{//中间
        SpanParam.append(firstSpan);
        SpanParam.append(
          '<span value='+(Info.current-2)+'>'+(Info.current-2)+'</span>'+
          '<span value='+(Info.current-1)+'>'+(Info.current-1)+'</span>'+
          '<span class="active" value='+Info.current+'>'+Info.current+'</span>'+
          '<span value='+(Info.current+1)+'>'+(Info.current+1)+'</span>'+
          '<span value='+(Info.current+2)+'>'+(Info.current+2)+'</span>'
        );

        SpanParam.append(lastSpan);
      }
    }
  };
  pageCount.append(prev);
  pageCount.append(SpanParam);
  pageCount.append(next);
  pageCount.append(
    '跳转至第'+
    '<input type="text" class="pagerInput"/>页'+
    '<button class="btn btn-default btn-sm">确定</button>'
  );
  pageCounts.html(
    '总计：'+ '<span>'+Info.total+'</span>'
  );

  self.content = pageBox;
  /*数字按钮事件*/
  SpanParam.on('click','span',function(){
    var Number = $(this).attr('value');
    self.change(self.getNumValue(Number));
  });


  pageCount.find('.btn').on('click',function(){
    var target =  $(this).prev().val();//页数
    if(parseInt(target)){
      if(target<1){
        target = 1;
      }else if(target > Info.pages){
        target = Info.pages;
      }
      self.change(self.getNumValue(target));
    }

  });


  self.update(Info);
  return self;

}
/*function Pager(table) {
  var Pagination = table.Pagination;
  var content = table.content;
  var tfoot = content.find('#tfoot');
  //tfoot.empty();

  var pageBox = $(tplPage);
  var pageCount = pageBox.find('#pageCount');
  var pageCounts = pageBox.find('#pageCounts');

  /!*上一页下一页*!/
  var prev = $('<span class="prev"> <i class="fa fa-lg fa-angle-left"></i></span>');
  var next = $('<span class="next"> <i class="fa fa-lg fa-angle-right"></i></span>');
  if (Pagination.current == 1) {
    prev.css("cursor", "not-allowed");
  }
  if (Pagination.current == Pagination.pages) {
    next.css("cursor", "not-allowed");
  }
  prev.click(function () {
    if (Pagination.current > 1) {
      Pagination.current -= 1;
      table.update();
    }
  });
  next.click(function () {
    if (Pagination.current < Pagination.pages) {
      Pagination.current += 1;
      table.update();
    }
  });
  /!*数字首尾*!/
  var firstSpan = $('<span value="1">1..</span>');
  var lastSpan = $('<span value=' + Pagination.pages + '>..' + Pagination.pages + '</span>');


  var span = '';
  var SpanParam = $('<div style="display: inline-block">');

  if (Pagination.pages <= 5) {//前五页
    for (var i = 1; i <= Pagination.pages; i++) {
      span = $('<span value="' + i + '">' + i + '</span>');
      if (i == Pagination.current) {
        span.addClass('active');
      }
      SpanParam.append(span);

    }
  } else if (Pagination.pages > 5) {//大于5页

    if (Pagination.current <= 3) {//前三个
      for (var j = 1; j <= 5; j++) {
        span = $('<span value=' + j + '>' + j + '</span>');
        if (j == Pagination.current) {
          span.addClass('active');
        }
        SpanParam.append(span);
      }
      SpanParam.append(lastSpan);
    }

    else if ((Pagination.pages - 3) < Pagination.current) {//后三页
      SpanParam.append(firstSpan);

      for (var m = (Pagination.pages - 4); m <= Pagination.pages; m++) {
        span = $('<span value=' + m + '>' + m + '</span>');
        if (m == Pagination.current) {
          span.addClass('active');
        }
        SpanParam.append(span);
      }
    }

    else {//中间
      SpanParam.append(firstSpan);
      SpanParam.append(
        '<span value=' + (Pagination.current - 2) + '>' + (Pagination.current - 2) + '</span>' +
        '<span value=' + (Pagination.current - 1) + '>' + (Pagination.current - 1) + '</span>' +
        '<span class="active" value=' + Pagination.current + '>' + Pagination.current + '</span>' +
        '<span value=' + (Pagination.current + 1) + '>' + (Pagination.current + 1) + '</span>' +
        '<span value=' + (Pagination.current + 2) + '>' + (Pagination.current + 2) + '</span>'
      );

      SpanParam.append(lastSpan);
    }
  }
  pageCount.append(prev);
  pageCount.append(SpanParam);
  pageCount.append(next);
  pageCount.append(
    '跳转至第' +
    '<input type="text" class="pagerInput"/>页' +
    '<button class="btn btn-default btn-sm">确定</button>'
  );
  pageCounts.html(
    '总计：' + '<span>' + Pagination.total + '</span>'
  );

  var tr = $('<tr>');
  var td = $('<td colspan="' + table['HeadParam'].length + '">');

  td.append(pageBox);
  tr.append(td);
  tfoot.append(tr);

  /!*数字按钮事件*!/
  var SpanParamSigle = SpanParam.find('span');
  for (var s = 0; s < SpanParamSigle.length; s++) {
    $(SpanParamSigle[s]).click(function () {
      Pagination.current = $(this).attr('value');
      table.update();
    });
  }
  pageCount.find('.btn').click(function () {
    var target = $(this).prev().val();//页数
    if (target < 1) {
      target = 1;
    } else if (target > Pagination.pages) {
      target = Pagination.pages;
    }
    Pagination.current = target;
    table.update();
  })


}*/
module.exports = Pager;