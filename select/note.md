#select组件


1.使用方法：

    (1)引入组件:

       var select = require(..../components/select/select.js)

    (2)实例化表格:

        var emplate = new select(param)#传参数

    (3)初始化表格:

        emplate.change = function(value){
             var obj = {};                  #给表格传入一个对象
             obj['type'] = value;           #select筛选器的筛选键值对
             obj['action'] = 'all';         #额外的筛选条件（多个筛选条件时，实例化select筛选器时，只需要传一次,初始化表格传过就不用传了）
             Table.update(obj);             #更新table
        };

    (4)渲染页面:

        $('#id').append(emplate.content)    #将筛选器拼接到页面上

    (5)更新option:

        $('#id').click(function(){
          emplate.update(
            {                               #对应option的value值和显示的文字
              'key1':'value1',
              'key2':'value2',
              'key3':'value3',
            }
          )
        })

2.参数结构：

    var params = {
        span:{isShow:false,text:'请选择'},   #文字描述部分，是否需要显示，以及现实的文字
        select:{
          isPlace:true,
          placeholder:'请筛选'               #筛选框是否需要占位符，占位符的文字文字描述
          option:{                          #对应option的value值和文字显示部分，value值是请求接口时传给后端的数据
                    0:'全部',
                    1:'专家',
                    2:'扫描'
                  }
          },

    };

