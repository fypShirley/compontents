#table组件

#3.0（再次解耦）

1.使用方法：

    (1)引入组件:

        var Table = require(..../components/table/table.js)

    (2)实例化表格:

        var table = new Table(parameter)#传参数

    (3)渲染页面:

        $('#id').append(table.content)

    (4)列表暴露的函数:

        1、table.update(data);            #传入值{data:[],page:{}}

        2、table.getFilters(table);
            #传入值table,搜集page,和thead筛选条件
            #返回值:  {page:1,city:'',area:''}

        3、table.onPager = function(){ c
             #点击分页 ，执行loadList();
        };

        4、table.onFilter = function(){
             #点击thead筛选 ，执行loadList();
        };

        5、table.setFilter(num1,num2,num3)
            #设置thead下拉菜单
            #num1, 第几列，只传数字，默认下拉菜单是{0：全部}
            #num2, 下拉菜单值obj : {key ：value,...}
            #num3, 更新别的列的筛选器 obj : {num:3,obj:{}}
                #num:更细第几列
                #obj:当前列作为key的对象{'上海':[区,区,],...}

2.parameter参数结构：

    var inventory = {
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

#使用方法

    1、var TABLE = require('.../table');   #引用
    2、var table =  new TABLE(param);      #实例化
    3、$('id').append(table.content);      #渲染页面
    4、table.setFilter(num,{});            #添加thead筛选器（可选）
    5、#获取table所有的筛选项
        function getTableFilters() {
              var value = selInput.getValue();//{select:'',input:''} #外部筛选器
              var filterData = scanTable.getFilters(scanTable);
              if(value.select){
                  filterData['index'] = value.select;
              }
              if(value.input){
                  filterData['search'] = value.input;
              }
              return filterData
        }
    6、#加载列表函数
        function loadList(){
                var DATA =  getTableFilters();
                $.ajax({
                    url: '/api/target/list',
                    data: DATA,
                    success: function (data) {
                        table.update(data);
                    }
                });
        }
    7、loadList() #初始化列表
    8、#点击分页
          scanTable.onPager = function () {
              loadList();
          };
    9、#点击thead筛选器
        scanTable.onFilter = function() {
                loadList();
        };
    10、#点击外部筛选器
        selInput.change = function(){
                loadList();
        };


#前端分页

    6、加载列表函数
        function loadList(OBJ){
            var number = table['Pagination'].current;
            var obj = window.list;
            var every = 5;
            var List = {page:{},data:[]};
            List.page = {
                current : number,
                node : every,
                total : obj.length
            };

            List.data = obj.slice((number-1)*every,number*every);
            var count = 0;
            if(OBJ){ #筛选
                for(var k in OBJ){
                    count++;
                }
                var filterData = [];
                if(count == 2){
                    //单选项
                    console.log(OBJ)
                    List.data.every(function (item) {
                        if(item[OBJ.key] == OBJ.value) {
                            filterData.push(item);
                        }
                        return true;
                    });


                }else{//筛选条件{select:'上海市',input}双选项
                    #依情况定，暂时不写

                }

                List.data = filterData;
            }

            table.update(List);
        }
    7、ajax请求数据
         $.ajax({
            url: '/api/firms',
            data: getTableFilters(),
            success: function (data) {
                window.list = data.data; #存数据
                loadList();
            }
         });
    8、外部筛选器
        selNotice.change = function(){
            var value = selNotice.getValue();
            var obj = {
                index:value.select,
                search:value.input
            };
            console.log(obj)
            #obj依情况定
            loadList(obj);
        };
    9、thead筛选器
        table.onFilter = function(value) {

            #具体情况具体计算

            //ajax    var c1 = {0:'未复查', 1:'未修复', 2:'已修复', 3:'已关站'];}

            //下拉菜单 var c2 = {0:'全部',1:'未复查',2:'未修复', 3:'已修复', 4:'已关站'}

            var d = {1:0,2:1,3:2,4:3}; //c1,c2对应关系
            var obj = {};
            if(value.value == '0'){
                loadList();
            }else{
                obj.value = d[value['value']];
                obj.key = value['key'];
                loadList(obj);
            }
       };
    10、#点击分页
                scanTable.onPager = function () {
                    loadList();
                };
