# PythonAPI
Python API connect

文件說明
使用行政院農委會的蔬菜水果開放資料，條件輸入完即會跑出結果，與JSON格式網址
https://data.coa.gov.tw/Query/AdvSearch.aspx?id=037
這邊我都使用高雄以及計算7天的蔬菜稅果價格，然後再算出相較前天的交易量與平均價相差，最後匯出"outprint.json"檔案

使用範例
		可直接上：https://pythonhomework-1080606.herokuapp.com/#
不然需使用到Xampp，裡面包含” back.php”,” index.html”,” jquery.js”,” mine.py”,” outprint.json”，丟到伺服器開啟index.html即可。
到畫面可選擇想觀看的蔬菜水果，按下查詢即可跳出進7天資料。
