from flask import Flask, request, render_template
import os

app = Flask(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/webcam')
def webcam_demo():
    return render_template('webcam-demo.html')

if __name__ == '__main__':
  app.run(debug=True, host="0.0.0.0")