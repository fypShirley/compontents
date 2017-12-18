#pager组件

1.使用方法：

    (1)引入组件:

        var Pager = require(..../pager/pager)

    (2)实例化表格:

        var template = new Table(parameter)                  #传参数

    (3)渲染页面:

        elem.append(template.content)

    (4)初始化表格:

        pager.change = function(value){                      #分页返回的值
                         #以下是对分页返回的值的一系列操作
                         table['Pagination'].current = value;#更新列表当前页数
                         table.update();                     #更新列表
                       };
2.参数结构：

      {
          pages:0,   #总页数，
          current:1, #当前页数
          total:0,   #总数量
          node:0     #每页的数量
      }