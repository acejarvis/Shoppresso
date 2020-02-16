#!/usr/bin/python
import urllib
from bs4 import BeautifulSoup
import requests
import webbrowser
import json
import sys, getopt 
import urllib.request


uurl = 'https://www.google.ca/search?hl=en-CA&tbm=shop&q=gpu&tbs=vw:l,mr:1,merchagg:m123763737%7Cm119761588'
uurl1 = 'https://www.google.ca/search?tbm=shop&q='
uurl2 = '&tbs=vw:l,mr:1,merchagg:g7187155%7Cm117298448%7Cm119761588%7Cm8635309%7Cm123763737'
uurl3_apparel = '%m9345150%7Cm128518690%7Cm102309770%7Cm9349630%7Cm136984915%7Cm12892061%7Cm8936877%7Cm119612963'
##def download(t_url):
##    response =  
##



def main(argv):


    message = argv[0]

    print(parse_and_generate_json(message))

    #urllib.request.urlretrieve(uurl, 'test123')

    

#    r = requests.get(uurl)
#    with open('file.txt','wb') as f:
#        f.write(r.content)

#debugging layer
#    with open('file2.txt','wb') as f:
#        f.write(response.content)



def parse_and_generate_json(message):
    #getting response from google        
    response = requests.get(uurl1 + message + uurl2 + uurl3_apparel)

    html_as_string = response.text
    soup= BeautifulSoup(html_as_string,'html.parser')

    #where algorithm begins
    Outarry = []
    
    for link in soup.find_all("div",attrs={'xcR77'}):
        temp={}
        m_storename=''
        m_price=''
        m_link=''
        m_img=''
        m_oname=''
        m_img=link.find('img')
        
        if(m_img is not None):
            m_img=m_img.get('src')
        m_info=link.find_all('div','dD8iuc')

        for item in m_info:
            if(item is None):
                continue
            m_text=item.text
            if("from" not in m_text):
                continue
            else:
                m_storename = m_text.split(" from ",1)[1]


        
        
        m_price=link.find('span','HRLxBb')
        #print(m_info)
        if(m_price is not None):
            m_price = m_price.string
        m_name=link.find('div','rgHvZc')
        if (m_name is not None):
            m_name=m_name.find('a')
            m_oname = m_name.string
        m_link=link.find('div','p9MVp')
        if (m_link is not None):
            m_link= "https://www.google.com" + m_link.find('a').get('href')
            #print(m_link)

        if(m_oname is None):
            m_oname=''
        if(m_storename is None):
            m_storename=''
        if(m_price is None):
            m_price=''
        if(m_img is None):
            m_img=''
        if(m_link is None):
            m_link=''

        
        temp['name'] = m_oname
        temp['store'] = m_storename
        temp['price']= m_price
        temp['img'] = m_img
        temp['link'] = m_link
        
        Outarry.append(temp)
##    for g in soup.find_all("a"):
##        print(g.text)
##        print('-----')


    #json_data = json.dumps(Outarry)
    return Outarry


def send_data_over_get(jsonobj,host):
    if(requests.get(jsonobj,host)):
        if(res):
            print("sucessful")

        else:
            print("something is wrong please check")
            
        
    
if __name__ == '__main__':
    main(sys.argv[1:])
