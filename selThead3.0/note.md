#selThead组件

#3.0（增加update）

1.使用方法：

    (1)引入组件:

        var upDown = require('../selThead/selThead');

    (2)实例化表格:

        var DownFilter = new upDown(parameter)#传参数

    (3)渲染页面:

        $(TH).append(DownFilter.content);

    (4)列表暴露的函数:

        1、self.change = function () {
            #执行函数
        };

        2、self.getValue();获得li里存的data-num值,即筛选值

        3、self.update  = function(option){
            #更新下拉菜单,option{key,value}
        }
2.parameter参数结构：

    var parameter = {
          title:table.HeadParam[num].title,
          option:obj || {'0':'全部'}
    };


