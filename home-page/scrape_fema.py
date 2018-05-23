from bs4 import BeautifulSoup as bs
import requests
import pymongo
import pandas as pd
from env import path
from splinter import Browser
import time


def init_browser():
    executable_path = {"executable_path":path}
    return Browser("chrome", **executable_path, headless=False)



def scrape():
    browser = init_browser()
    fema_data = {}
    
    #retrive data from URL
    fema_url = "https://www.fema.gov/"
    browser.visit(fema_url)
    fema_html = browser.html
    fema_soup = bs(fema_html,'html.parser')
    #main image
    main_img = fema_soup.find("img")["src"]
    fema_data["main_img"] = main_img

    #latest title
    latest_title = fema_soup.find("h2","unicorn-home-page-feature-title").text
    fema_data["latest_title"]=latest_title

    #latest description 
    latest_description = fema_soup.find("p").text
    fema_data["latest_description"] = latest_description

    browser.quit()

    return fema_data

