#selThead���

#3.0������update��

1.ʹ�÷�����

    (1)�������:

        var upDown = require('../selThead/selThead');

    (2)ʵ�������:

        var DownFilter = new upDown(parameter)#������

    (3)��Ⱦҳ��:

        $(TH).append(DownFilter.content);

    (4)�б�¶�ĺ���:

        1��self.change = function () {
            #ִ�к���
        };

        2��self.getValue();���li����data-numֵ,��ɸѡֵ

        3��self.update  = function(option){
            #���������˵�,option{key,value}
        }
2.parameter�����ṹ��

    var parameter = {
          title:table.HeadParam[num].title,
          option:obj || {'0':'ȫ��'}
    };


