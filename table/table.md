#table组件

1.使用方法：

    (1)引入组件:

        var Table = require(..../components/table/table.js)

    (2)实例化表格:

        var table = new Table(parameter)#传参数

    (3)初始化表格:

        table.update();
        #更新update时传入的值必须是键值对对象
        #table.update({search:'ss',key:'漏洞',...})

    (4)渲染页面:

        $('#id').append(table.content)

2.parameter参数结构：

    var inventory = {
            url: "/api/admins",    #api接口
            header: [
                {
                    title: "编号",                                        #特殊列，排序为第一列
                    output: function (num) {
                      return num = num + 1;
                    }
                },
                {
                    title: "题目",
                    key: "title",
                    output: function (key,list) {                        #超链接
                      var link = $('<a href="/report/listDetail.html?nid="'+list['_id']+' target="_blank">'+list.title+'</a>')
                      return link;
                    }
                },
                {title: "厂商名称", key: "firm"},                         #基础数据格式
                {
                    title:'危害等级',
                    key:'level',
                    output:function(key,list){
                        var obj = {0: '低', '1': '中',2:'高'};
                        var item = obj[list[key]];
                        return item;
                    }
                },
                {
                    title: "操作",                                        #表头
                    key: "id",                                           #api接口对应的数据key值
                    style: {width: "80", className: 'aa'},               #列的宽和class名
                    output: function (key,list) {                        #对应列的数据的单独处理函数
                                                                         #key是当前列的key,list是每行的所有数据
                        var line =
                            '<span id="' + list[key] + '" class="cursor delete">删除</span>' +
                            '<a href="www.baidu.cn?id=' + list[key] + '" class="cursor detail">详情</a>';
                        return line;
                    }
                }
            ],
            showPager: true                                     #是否需要分页
        }
