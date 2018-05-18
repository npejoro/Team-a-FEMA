from flask import Flask, render_template, jsonify, send_from_directory, redirect
from flask_pymongo import PyMongo
import scrape_fema

from flask_assets import Bundle, Environment

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