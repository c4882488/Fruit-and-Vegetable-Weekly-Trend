$(function(){
    let select = [['胡蘿蔔','SB1'],['馬鈴薯','SC1'],['洋蔥','SD1'],['青蔥','SE3'],['韭菜','SF1'],['大蒜','SG2'],['薑','SP2'],['小白菜','LB11'],['青江白菜','LD1'],['芹菜','LG3'],['萵苣菜','LI1'],['油菜','LN1'],['九層塔','LP1'],['花椰菜','FB11'],['絲瓜','FF1'],['苦瓜','FG1'],['茄子','FI2'],['番茄','FJ3'],['香蕉','A1'],['鳳梨','B2'],['奇異果','G49'],['木瓜','I1'],['荔枝','J1'],['番石榴','P1'],['蓮霧','Q1'],['芒果','R1'],['葡萄','S1'],['西瓜','T1'],['桃子','Y1'],['椰子','11'],['百香果','51'],['聖女小番茄','72'],['櫻桃','839'],['火龍果','811'],['Test','python']];
    var allData;
    var pric = [];
    var quantity = [];
    var week = [];
    var ctx = document.getElementById('myChart').getContext('2d');
    var ctx1 = document.getElementById('myChart1').getContext('2d');

    $('#load').modal({
        backdrop:false,
        keyboard:false
    });

    function clears(){
        console.log(quantity);
        var x = quantity.length;
        for(var i = 0; i <= x; i++){
            quantity.pop();
            week.pop();
            pric.pop();
        }
        $('#tbody').html('');
        chart.update();
        chart1.update(); 
    }

    function requ(){
        $.ajax({
            type:'GET',
            url:'./back.php',
            dateType:'json',
            data:{
                values:$('#select').val(),
            },
            success:function(data){
                clears();
                allData = data;
                data.forEach(function(val,index){
                    week.push(data[index]['交易日期']);
                    pric.push(data[index]['平均價']);
                    quantity.push(data[index]['交易量']);
                    chart.update();
                    chart1.update(); 
                    let text = "<tr>";
                    text += "<th scope='row'>"+data[index]['交易日期']+"</th>";
                    text += "<th>"+data[index]['平均價']+"</th>";
                    text += "<th>"+data[index]['交易量']+"</th>";
                    if (data[index]['相較前天價格'] > 0){
                        text += "<th class='text-success'>"+data[index]['相較前天價格']+"</th>";
                    }else{
                        text += "<th class='text-danger'>"+data[index]['相較前天價格']+"</th>";
                    }
                    if(data[index]['相較前天交易'] > 0){
                        text += "<th class='text-success'>"+data[index]['相較前天交易']+"</th>";
                    }else{
                        text += "<th class='text-danger'>"+data[index]['相較前天交易']+"</th>";
                    }
                    
                    $('#tbody').append(text)
                })
                $('#load').modal('hide');
            },
            error:function(e){
                $('#load').modal('hide');
                $('.toast').toast('show');
                $('.toast-body').html(e['responseText']+',Please try again later');
                //console.log('err');
                //console.log(e);
            }
        })
    };
    select.forEach(function(val,index){
            //console.log(select[index][0]);
            $('#select').append('<option value="'+select[index][1]+'">'+select[index][0]+'</option>')
        }
    );
    
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: week,
            datasets: [{
                label: '平均價格',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: pric,
            }]
        },
        options: {
        }
    });
    var chart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: week,
            datasets: [{
                label: '交易量',
                backgroundColor: ['rgb(255, 205, 86)','rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'],
                borderColor: 'rgb(255, 205, 86)',                
                data: quantity,
            }]
        },
        options: {
        }
    });
    

    $('#button').click(function(){
        $('#load').modal('show');
        requ();
    });
    $('#load').modal('show');
    requ();
})


