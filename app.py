from flask import Flask, render_template, jsonify, send_from_directory, request, redirect
from flask_pymongo import PyMongo
import scrape_fema
from flask_assets import Bundle, Environment

import os
import pandas as import pd
import numpy as np

app = Flask(__name__, static_folder='static')
mongo = PyMongo(app)

js = Bundle('jquery.easing.1.3.js','jquery.fancybox.pack.js','jquery.magnific-popup.js','jquery.masonry.min.js','jquery.mixitup.min.js','main.js','plugins.js', output = 'gen/mymain.js')
css = Bundle('bootstrap.min.css', 'font-awesome.min.css','fonticons.css','jquery.fancybox.css','magnific-popup.css','plugins.css','responsive.css','style.css',output = 'gen/mymain.css')

assets = Environment(app)
assets.register('mymain_js',js)
assets.register('mymain_css',css)

@app.route('/home')
def index():
    fema = mongo.db.fema.find_one()
    print(fema)
    return render_template("index.html",fema = fema)

@app.route('/scrape')
def scrape():
    fema = mongo.db.fema
    fema_data = scrape_fema.scrape()
    fema.update(
        {},
        fema_data,
        upsert=True
    )

    return redirect("http://localhost:5000/home", code=302)

if __name__ == "__main__":
    app.run(debug=True)


# victoria
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