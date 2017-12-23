
var tplTable = require('./table.html');
var Pager = require('../pager/pager');
var upDown = require('../selThead/selThead');
require ('./table.less');


function Table(table_params) {
  var table = this;
  table.FilterParam = {};//内部筛选器
  table._FilterParam = {};//外部筛选器
  table.HeadParam = [];
  table.Pagination = {/*分页信息*/
    pages:0,
    current:1,
    total:0,
    node:0
  };
  table.theadFilter = {};
  table.showPager = table_params.showPager;

  var template = $(tplTable);
  var thead =   template.find('.theadPart');
  var tbody =   template.find('.tbodyPart');
  var tfoot =   template.find('.tfootPart');

/**********  列表所有信息  ***********/
  var Header = table_params['header'];

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

  table.onPager = function () {};
  table.onFilter = function () {};
/**********  thead筛选器  ***********/
  /**
   *
   * @param num
   * @param obj
   * @param callback
   * @constructor
   */
  table.setFilter = function(num,obj,callback)  {
    var filterObj = {
      title:table.HeadParam[num].title,
      key:table.HeadParam[num]['key'],
      option:obj || {'0':'全部'}
    };

    var TH = table.HeadParam[num].dom;
    $(TH).empty();

    var  DownFilter= new upDown(filterObj);
    $(TH).append(DownFilter.content);

    /*保存筛选器*/
    table['theadFilter'][num] = DownFilter;

    DownFilter.change = function(value){ /*value值*/

      table['FilterParam'][filterObj['key']] = value;

      var thead_filter = {};
      thead_filter.key = filterObj['key'];
      thead_filter.value = value;
      table.onFilter(thead_filter);

      /*更新别的列项*/
      if(callback){

        var num = callback.num;
        var bkObj = callback.obj;
        var upDownFilter = table['theadFilter'][num];

        upDownFilter.update(bkObj[value])

      }

    };
  };

/**********  刷新列表  ***********/
  table.update = function (DATA) {//{key:value,...}
    /*TABLE*/
    tbody.empty();
    tfoot.empty();
    tbody.append(loading(table['HeadParam'].length));

    /*ajax请求*/
      tbody.empty();
      var List = DATA.data;
      var Page = {};

      if(table_params.showPager){ /*new Pager(table);*/
        Page = DATA.page;
        table['Pagination'].current = Page.current || 1;/*上次无数据时，下次为 1*/
        table['Pagination'].node = Page.node;
        table['Pagination'].total = Page.total;
        table['Pagination'].pages = Math.ceil(Page.total/Page.node);

        var tr = $('<tr>');
        var td = $('<td colspan="'+table['HeadParam'].length+'">');
        var  pager= new Pager(table.Pagination);
        td.append(pager.content);
        tr.append(td);
        tfoot.append(tr);
        pager.change = function(value){
          table['Pagination'].current = value;
          table.onPager();
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


  };

  table.getFilters = function (Table){//{}

    var queryString = {};
    var param = Table.FilterParam;

    if(table.showPager){
      queryString.page = Table['Pagination'].current;
    }

    for(var k in  param) {//内部的筛选器
      queryString[k] = param[k];
    }
    return queryString;
  };
/**********  列表DOM  ***********/
  table.content = template;

  return table
}
module.exports = Table;
