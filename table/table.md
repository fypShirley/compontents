#table���

1.ʹ�÷�����

    (1)�������:

        var Table = require(..../components/table/table.js)

    (2)ʵ�������:

        var table = new Table(parameter)#������

    (3)��ʼ�����:

        table.update();
        #����updateʱ�����ֵ�����Ǽ�ֵ�Զ���
        #table.update({search:'ss',key:'©��',...})

    (4)��Ⱦҳ��:

        $('#id').append(table.content)

2.parameter�����ṹ��

    var inventory = {
            url: "/api/admins",    #api�ӿ�
            header: [
                {
                    title: "���",                                        #�����У�����Ϊ��һ��
                    output: function (num) {
                      return num = num + 1;
                    }
                },
                {
                    title: "��Ŀ",
                    key: "title",
                    output: function (key,list) {                        #������
                      var link = $('<a href="/report/listDetail.html?nid="'+list['_id']+' target="_blank">'+list.title+'</a>')
                      return link;
                    }
                },
                {title: "��������", key: "firm"},                         #�������ݸ�ʽ
                {
                    title:'Σ���ȼ�',
                    key:'level',
                    output:function(key,list){
                        var obj = {0: '��', '1': '��',2:'��'};
                        var item = obj[list[key]];
                        return item;
                    }
                },
                {
                    title: "����",                                        #��ͷ
                    key: "id",                                           #api�ӿڶ�Ӧ������keyֵ
                    style: {width: "80", className: 'aa'},               #�еĿ��class��
                    output: function (key,list) {                        #��Ӧ�е����ݵĵ���������
                                                                         #key�ǵ�ǰ�е�key,list��ÿ�е���������
                        var line =
                            '<span id="' + list[key] + '" class="cursor delete">ɾ��</span>' +
                            '<a href="www.baidu.cn?id=' + list[key] + '" class="cursor detail">����</a>';
                        return line;
                    }
                }
            ],
            showPager: true                                     #�Ƿ���Ҫ��ҳ
        }
