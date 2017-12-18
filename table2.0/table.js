
var tplTable = require('./table.html');
var Pager = require('../pager/pager');
var upDown = require('../selThead/selThead');
require ('./table.less');

function assembleFilter(table) {//{}
  var params = table._FilterParam;//外部的筛选器

  var param = table.FilterParam;//内部的筛选器

  var queryString = [];

  for(var k in params) {//外部的筛选器
    queryString.push(k + "=" + params[k]);
  }
  for(var e in  param) {//内部的筛选器
    queryString.push(e + "=" + param[e]);
  }

  return queryString.join("&");
}


function Table(table_params) {
  var table = this;
  table.FilterParam = {};//内部筛选器
  table._FilterParam = {};//外部筛选器
  table.Pagination = {/*分页信息*/
    pages:0,
    current:1,
    total:0,
    node:0
  };


  var template = $(tplTable);
  var thead =   template.find('#thead');
  var tbody =   template.find('#tbody');
  var tfoot =   template.find('#tfoot');


/**********  列表所有信息  ***********/
  var Header = table_params['header'];
  table.HeadParam = [];
/*初始化*/
  for(var j=0;j<Header.length;j++){
    var HeaderSigle = Header[j];//{}
    table['HeadParam'][j] = {
      title:'',
      key:false,
      style:{width:'',className:''},
      output:function(key, list){
        return list[key];
      }
    };
    for(var k in HeaderSigle){
      table['HeadParam'][j][k] = HeaderSigle[k];
    }
  }

  /*  拼接thead  */
  var theadTr = $('<tr>');
  for(var i=0 ;i<table['HeadParam'].length;i++){
    var item = table['HeadParam'][i];
    var th = $('<th>');
    item.dom = th[0];
    th.html(item.title);
    th.addClass(item['style']['className'])
        .width(item['style']['width']);
    theadTr.append(th);
  }

  thead.append(theadTr);

/**********  thead筛选器  ***********/
  table.Filter = function(num,obj,callback)  {//第几列，筛选器对象
    var filterObj = {
      title:table.HeadParam[num].title,
      key:table.HeadParam[num]['key'],
      option:obj || {'0':'全部'}
    };

    var TH = table.HeadParam[num].dom;
    $(TH).empty();

    var  DownFilter= new upDown(filterObj);
    $(TH).append(DownFilter.content);

    DownFilter.change = function(value){
      var result = {};
      result[filterObj['key']] = value;
      table.update(result);
      if(callback){
        callback(value);/*改变目标的option*/
      }

    };
  };

/**********  刷新列表  ***********/
  table.update = function (filter) {//{key:value,...}
    /*loading()*/

    tbody.empty();
    tfoot.empty();
    tbody.append(loading(table['HeadParam'].length));

    /*外部筛选器*/
    for(var f in filter){
      table['_FilterParam'][f] = filter[f];
    }

    /* page加到内部筛选器中 作为内部的筛选器*/
    if(table_params.showPager){
      table['FilterParam'].page = table['Pagination'].current;
    }

    /*ajax请求*/
    $.ajax({
      url: table_params.url,
      data: assembleFilter(table),
      success: function (data) {
        tbody.empty();
        var List = data.data;
        var Page = data.page;
        table['Pagination'].current = Page.current;
        table['Pagination'].node = Page.node;
        table['Pagination'].total = Page.total;
        table['Pagination'].pages = Math.ceil(Page.total/Page.node);

        if(table_params.showPager){ /*new Pager(table);*/
          var tr = $('<tr>');
          var td = $('<td colspan="'+table['HeadParam'].length+'">');
          var  pager= new Pager(table.Pagination);
          td.append(pager.content);
          tr.append(td);
          tfoot.append(tr);
          pager.change = function(value){
            console.log(value);
            table['Pagination'].current = value;
            table.update();
          };
        }

        if(List.length == 0){
          blankTable(tbody,table.HeadParam.length);
        }else{
          List.every(function (list,index) {
            var tr = $('<tr>');
            table.HeadParam.every(function (header) {
              var td = $('<td>');
              var row = '';
              if(!header['key']){
                row = header['output'](index);
              }else{
                row = header['output'](header['key'],list);
              }
              td.append(row)
                  .addClass(header['style']['className'])
                  .width(header['style']['width']);
              tr.append(td);
              return true;
            });
            tbody.append(tr);
            return true;
          });

        }
        //option.success()
      }
    })
  };

/**********  列表DOM  ***********/
  table.content = template;

  return table
}
module.exports = Table;
