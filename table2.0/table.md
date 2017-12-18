#table组件


(增加了thead筛选器)

1.使用方法：

    (1)引入组件:

        var Table = require(..../components/table/table.js)

    (2)实例化表格:

        var table = new Table(parameter)#传参数

    (3)初始化表格:

        table.update();

    (4)渲染页面:

        $('#id').append(table.content)

    (5)更新table
            #更新update时传入的值必须是键值对对象

        table.update({search:'ss',key:'漏洞',...})

    (4)thead分页器

         table.Filter(
                8,              #第几列
                {               #下拉菜单的对应的键值对
                    0:'全部',
                    1:'未复查',
                    2:'未修复',
                    3:'已修复',
                    4:'已关站'
                },
                callback        更新对应的列
         );


         #institutions{'成都':[],'上海':[]}
         #table.Filter(2,obj, function (value) {
         #       table.Filter(3, institutions[value])
         #});


2.parameter参数结构：

    var inventory = {
            url: "/api/admins",    #api接口
            header: [
                {
                    title: "编号",                                                #特殊列，排序为第一列
                    output: function (num) {
                      return num = num + 1;
                    }
                },
                {
                    title: "题目",                                                      #title必填
                    key: "title",                                                       #key必填
                    style: {width: "80", className: 'aa'}, #宽，或者class控制            #style选填 默认空
                    output: function (key,list) {                                       #output选填 超链接
                      var link = $('<a href="/report/listDetail.html?nid="'+list['_id']+' target="_blank">'+list.title+'</a>')
                      return link;                         #对当前列的操作，key是data对应属性，list是整行数据
                    }
                },


            ],
            showPager: true                                                               #是否需要分页
        }
