var info = {};
$(function(){
    if(!window.File) {
        alert("このブラウザは使用できません");
    }
    //csvファイルの中身を取得
    $.ajax({
        url: "./data/data.csv",
        type: "GET",
        dataType: "text",
        async: false,
        success: function(result) {
            var records = result.split("\r\n");
            $.each(records, function(value,record){
                var data = record.split(",");
                var name = data[0];
                info[name] = createObject(data);
                var option = document.createElement("option");
                option.value = name;
                option.text = name;
                $("#select").append(option);
            });
        },
        error: function(data) {
            console.log("error");
        }
    });
});

//取得したデータを変数にセットする
function show() {
    var name = $("select").val();
    var data = info[name];
    showBasicData(data);
    showGraph(data);
}

//セットしたcsvデータを表示させる
function showBasicData(data) {
    $("#photo").attr("src", "./img/" + data["name"] + ".png");　//写真
    $("#name").text(data["name"]);                              //名前
    $("#yomi").text("("+ data["yomi"] +")");                    //仮名
    $("#sex").text(data["sex"]);                                //性別
    $("#graduate").text(data["graduate"]);                      //大学
    $("#nearest").text(data["nearest"]);                        //最寄
    $("#skills").text(data["skills"]);                          //経歴
    $("#personality").text(data["personality"]);                //性格
}

function showGraph(data){
    var java = data["java"];
    var lineChart = {
            type: "line",
            data: {
                labels :["第1回","第2回","第3回","第4回","第5回","第6回","第7回"],
                datasets: [
                    {
                        borderColor: "rgba(200, 220, 220, 1)",
                        backgroundColor: "rgba(200, 220, 220, 1)",
                        fill: false,
                        data: [java[0]["q1"], java[1]["q1"], java[2]["q1"], java[3]["q1"], java[4]["q1"], java[5]["q1"], java[6]["q1"]],
                        label: "q1"
                    },
                    {
                        borderColor: "rgba(255, 255, 0, 1)",
                        backgroundColor: "rgba(255, 255, 0, 1)",
                        fill: false,
                        data: [java[0]["q2"], java[1]["q2"], java[2]["q2"], java[3]["q2"], java[4]["q2"], java[5]["q2"], java[6]["q2"]],
                        label: "q2"
                    },
                    {
                        borderColor: "rgba(0, 255, 255, 1)",
                        backgroundColor: "rgba(0, 255, 255, 1)",
                        fill: false,
                        data: [java[0]["q3"], java[1]["q3"], java[2]["q3"], java[3]["q3"], java[4]["q3"], java[5]["q3"], java[6]["q3"]],
                        label: "q3"
                    },
                    {
                        borderColor: "rgba(255, 0, 255, 1)",
                        backgroundColor: "rgba(255, 0, 255, 1)",
                        fill: false,
                        data: [java[0]["q4"], java[1]["q4"], java[2]["q4"], java[3]["q4"], java[4]["q4"], java[5]["q4"], java[6]["q4"]],
                        label: "q4"
                    },
                    {
                        borderColor: "rgba(0, 0, 255, 1)",
                        backgroundColor: "rgba(0, 0, 255, 1)",
                        fill: false,
                        data: [java[0]["q5"], java[1]["q5"], java[2]["q5"], java[3]["q5"], java[4]["q5"], java[5]["q5"], java[6]["q5"]],
                        label: "q5"
                    }
                ]
            },
            options: {
                scaleOverride: true,
                scaleLabel : "理解度/満足度",
                bezierCurve : false,
                responsive: false,
                title: {
                    display: true,
                    fontSize: 10,
                    text: "Java勉強会アンケート結果"
                },
                scales: {
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: "理解度/満足度",
                            fontSize: 18
                        },
                        ticks: {
                            min: 1,
                            max: 5,
                        },
                    }]
                }
            }
    };

    var JavaradarChart = {
            type: "radar",
            data: {
                labels  : ["q1","q2","q3","q4","q5"],
                datasets: [
                    {
                        borderColor: "rgba(200, 220, 220, 1)",
                        backgroundColor: "rgba(200, 220, 220, 1)",
                        fill: false,
                        // data: [java[0]["q1"],java[0]["q2"],java[0]["q3"],java[0]["q4"],java[0]["q5"]],
                        data: [3,5,1,3,5],
                        label: "q1"
                    },
                    {
                        borderColor: "rgba(255, 255, 0, 1)",
                        backgroundColor: "rgba(255, 255, 0, 1)",
                        fill: false,
                        data: [java[1]["q1"],java[1]["q2"],java[1]["q3"],java[1]["q4"],java[1]["q5"]],
                        label: "q2"
                    // },
                    // {
                    //     borderColor: "rgba(0, 255, 255, 1)",
                    //     backgroundColor: "rgba(0, 255, 255, 1)",
                    //     fill: false,
                    //     data: [java[2]["q1"],java[2]["q2"],java[2]["q3"],java[2]["q4"],java[2]["q5"]],
                    //     label: "q3"
                    // },
                    // {
                    //     borderColor: "rgba(255, 0, 255, 1)",
                    //     backgroundColor: "rgba(255, 0, 255, 1)",
                    //     fill: false,
                    //     data: [java[3]["q1"],java[3]["q2"],java[3]["q3"],java[3]["q4"],java[3]["q5"]],
                    //     label: "q4"
                    // },
                    // {
                    //     borderColor: "rgba(0, 0, 255, 1)",
                    //     backgroundColor: "rgba(0, 0, 255, 1)",
                    //     fill: false,
                    //     data: [java[4]["q1"],java[4]["q2"],java[4]["q3"],java[4]["q4"],java[4]["q5"]],
                    //     label: "q5"
                    }
                ]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    fontSize: 10,
                    text: "Java質問毎アンケート結果"
                },
                scale:{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 6,
                        stepSize: 1
                    }
                }
            }
    };

    var linuxradarChart = {
            type: "radar",
            data: {
                labels  : ["q1","q2","q3","q4","q5"],
                datasets: [
                    {
                        borderColor: "rgba(200, 220, 220, 1)",
                        backgroundColor: "rgba(200, 220, 220, 1)",
                        fill: false,
                        // data: [linux[0]["q1"],linux[0]["q2"],linux[0]["q3"],linux[0]["q4"],linux[0]["q5"]],
                        data: [6,5,3,1,5],
                        label: "q1"
                    }
                ]
            },
            options: {
                responsive: false,
                title: {
                    display: true,
                    fontSize: 10,
                    text: "Linux質問毎アンケート結果"
                },
                scale:{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 6,
                        stepSize: 1
                    }
                }
            }
    };

    var ctx = $('#graph1')[0].getContext("2d");
    // var ctx2 = $('#graph2')[0].getContext("2d");
    var ctx2 = $('#graph2')[0].getContext("2d");
    var chart = new Chart(ctx, lineChart);
    // var chart2 = new Chart(ctx2, lineChart);
    var chart2 = new Chart(ctx2, JavaradarChart);

    var ctx3 = $('#graph3')[0].getContext("2d");
    // var ctx4 = $('#graph4')[0].getContext("2d");
    var ctx4 = $('#graph4')[0].getContext("2d");
    var chart3 = new Chart(ctx3, lineChart);
    // var chart4 = new Chart(ctx4, lineChart);
    var chart4 = new Chart(ctx4, linuxradarChart);
    $("#graph1").addClass("display-visible");
    $("#graph2").addClass("display-visible");
    $("#graph3").addClass("display-visible");
    $("#graph4").addClass("display-visible");
}

function createObject(data) {
    var obj = {};
    obj["name"] = data[0];
    obj["yomi"] = data[1];
    obj["sex"] = data[2];
    obj["graduate"] = data[3];
    obj["nearest"] = data[4];
    obj["skills"] = data[5];
    obj["personality"] = data[6];
    obj["java"] = [
				    {q1: data[7], q2: data[8], q3: data[9], q4: data[10], q5: data[11]},
	                {q1: data[12], q2: data[13], q3: data[14], q4: data[15], q5: data[16]},
                    {q1: data[17], q2: data[18], q3: data[19], q4: data[20], q5: data[21]},
				    {q1: data[22], q2: data[23], q3: data[24], q4: data[25], q5: data[26]},
				    {q1: data[27], q2: data[28], q3: data[29], q4: data[30], q5: data[31]},
				    {q1: data[32], q2: data[33], q3: data[34], q4: data[35], q5: data[36]},
				    {q1: data[37], q2: data[38], q3: data[39], q4: data[40], q5: data[41]}
			];
    obj["linux"] = [
                    {q1: data[42], q2: data[43], q3: data[44], q4: data[45], q5: data[46]},
                    {q1: data[47], q2: data[48], q3: data[49], q4: data[50], q5: data[51]}
    ]
    return obj;
}
