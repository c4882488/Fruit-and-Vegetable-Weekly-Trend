import json,requests,sys
from datetime import datetime, timedelta

try:
    #算7天
    nowDate = datetime.now()
    yea = int(datetime.strftime(nowDate,"%Y"))-1911
    startDate = str(yea)+datetime.strftime(nowDate + timedelta(days=-9),".%m.%d")
    endDate = str(yea)+nowDate.strftime(".%m.%d")
    if nowDate.strftime("%a") == "Mon":
        endDate = str(yea)+datetime.strftime(nowDate + timedelta(days=-1),".%m.%d")
    #+sys.argv[1]
    url = 'https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx?$top=100&$skip=0&StartDate='+startDate+'&EndDate='+endDate+'&Market=%e9%ab%98%e9%9b%84%e5%b8%82&CropCode='+sys.argv[1]
    reqs = requests.get(url)
    doc = json.loads(reqs.text)

    #日期排序
    doc = sorted(doc, key=lambda k: k['交易日期'])

    date = []
    pric = 0.0;
    quantity = 0.0;

    for d in doc:
        date.append({
            '交易日期':d['交易日期'],
            '作物代號':d['作物代號'],
            '作物名稱':d['作物名稱'],
            '平均價':d['平均價'],
            '交易量':d['交易量'],
            '相較前天價格':round(d['平均價'] - pric,1),
            '相較前天交易':round(d['交易量'] - quantity,1),
        })
        pric = float(d['平均價'])
        quantity = d['交易量']

    del date[0]
    print(json.dumps(date))
    with open("outprint.json", "w") as oute:
        json.dump(date,oute)
except IndexError:
    print('API connect Error')
except:
    print('Program execution Error')