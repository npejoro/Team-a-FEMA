import os

import pandas as pd
import numpy as np

# import sqlalchemy
# from sqlalchemy.ext.automap import automap_base
# from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, request, redirect

app = Flask(__name__)
# engine = create_engine("sqlite:///noaa.sqlite")
# Base = automap_base()
# Base.prepare(engine, reflect = True)

# Disaster= Base.classes.Disaster
# session = Session(engine)

df = pd.read_csv("noaadata.csv")
Cost = df["Cost"].tolist()
Deaths = df["Deaths"].tolist()
Name = df["Name"].tolist()
Year = df["Year"].tolist()
Disaster = df["Disaster"].tolist()
disasterType = df["disasterType"].tolist()
impactScale = df["impactScale"].tolist()

@app.route("/")
def index():
    return render_template('index.html')



@app.route("/future")
def future():
    data=[{
        "Cost": Cost,
        "Deaths":Deaths,
        "Name": Name,
        "Year": Year,
        "Disaster": Disaster,
        "disasterType": disasterType,
        "impactScale": impactScale,
    }]

    for i in (data[0]['Deaths']):
        # print (type(i))
        if not isinstance(i,int):
            print (i)
        # print(data[0]['Deaths'])
    return jsonify(data)


if __name__ == "__main__":
     app.run(debug=True)


  
# df=pd.read_csv("data.csv")
# Disaster = df["Disaster"].tolist()
# Name = df["Name"].tolist()
# Cost = df["Cost"].tolist()
# Deaths = df["Deaths"].tolist()
# Year = df["Year"].tolist()  

# @app.route("/impacts")
# def impacts():
#     data = [{
#         "Cost": df["Cost"].index.values.tolist(),
#         "Deaths": df["Deaths"].index.values.tolist(),
#         "Name": df["Name"].index.values.tolist(),
#         "Year": df["Year"].index.values.tolist(),
#         "Disaster": df["Disaster"].index.values.tolist()
#     }]
    # data = [
    #     # {
    #     #     "x": Cost,
    #     #     "y": Deaths,
    #     #     "mode": "markers",
    #     #     "type": "scatter",
    #     #     "text": Name
    #     # },
    #     {
    #         "Cost": Cost,
    #         "Deaths": Deaths,
    #         "Year": Year,
    #         "Name": Name,
    #         "Disaster": Disaster
    #     }
    # ]

    # return jsonify(data)
    # return jsonify(data)

# @app.route('/impacts')
# def data():
#     results = session.query(Disaster.id, Disaster.Name, Disaster.Disaster, Disaster.Cost, Disaster.Deaths, Disaster.Year).all()

#     # Create a dictionary entry for each row of metadata information
#     data = []
#     for result in results:
#         disasters={}
#         disasters['id'] = result[0]
#         disasters['Name']=result[1]
#         disasters['Disaster'] = result[2]
#         disasters['Cost'] = result[3]
#         disasters['Deaths'] = result[4]
#         disasters['Year'] = result[5]
#         data.append(disasters)
#     return jsonify(data)