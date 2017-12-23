#select组件

#2.0（增加搜索按钮选项（可选可不选））

1.使用方法：

    (1)引入组件:

       var selInput = require(..../components/sel_input/sel_input.js)

    (2)实例化组件:

        var emplate = new selInput(param)#传参数

    (3)渲染页面:
        $('#id').append(emplate.content)    #将筛选器拼接到页面上

    (4)使用组件:

        selNotice.getValue() 返回值{select:'',input:''}
        selNotice.change() = function(){}  筛选按钮事件


2.参数结构：

    var params = {
          input:{
            placeholder:'请输入',            #输入框的placeholder
            isSearch:true,                  #是否显示筛选按钮
          },
          select:{
            isPlace:false,                  #下拉菜单是否需要placeholder
            placeholder:'请筛选',            #下拉菜单placeholder的文字描述
            option: {                       #对应option的value值和文字显示部分，value值是请求接口时传给后端的数据
              'tag':'标签',
              'title': '题目',
              'cue.id': 'CVE_ID'
            }
          }

    };
