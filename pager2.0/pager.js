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
    Info.current = num;
    self.update(Info);
    return num;
  };
  self.getPreValue = function(){
    Info.current = Info.current-1;
    self.update(Info);
    return Info.current;
  };
  self.getNextValue = function(){
    Info.current = Info.current+1;
    self.update(Info);
    return Info.current;
  };

  var pageBox = $(tplPager);
  var pagInfo = pageBox.find('.pagination-info');
  var prev = pageBox.find('.btn-pre');
  var next = pageBox.find('.btn-next') ;
  var btnInfo = pageBox.find('.btn-info') ;
  var Input = pageBox.find('.form-control') ;
  var Button = pageBox.find('.btn') ;

  if(Info.current == 1){
    prev.css("cursor","not-allowed");
  }

  if(Info.current == Info.pages){
    next.css("cursor","not-allowed");
  }

  prev[0].onclick = function(){
    console.log('点击');
    if(Info.current > 1){
      self.change(self.getPreValue());
    }

  };
  next[0].onclick = function(){
    if(Info.current < Info.pages){
      self.change(self.getNextValue());
    }

  };

  Button.on('click',function(){
    var target =  Input.val();//页数
    if(parseInt(target)){
      if(target<1){
        target = 1;
      }else if(target > Info.pages){
        target = Info.pages;
      }
      self.change(self.getNumValue(target));
    }

  });

  self.update = function(Info){
    pagInfo.append(
        '<span class="data-sum">共有'+Info.total+'条</span> ,'+
        '<span class="page_node">每页显示：'+Info.node+'条</span>'
    );

    var show_pages =0;
    if(Info.pages == 0){
      show_pages = 20;
    }else{
      show_pages = Info.pages;
    }
    btnInfo.append(Info.current+'/'+show_pages);
  };

  self.content = pageBox;


  self.update(Info);
  return self;

}

module.exports = Pager;