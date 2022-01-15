from flask import Flask, request
from operations import *

app = Flask(__name__)

@app.route('/')
def home():
  return "Welcome to Calc"

@app.route('/math/<operation>')
def handle_math(operation):
  operations = {
    'add': add,
    'sub': sub,
    'mult': mult,
    'div' :div
  }

  a = int(request.args.get('a'))
  b = int(request.args.get('b'))
  res = operations[operation](a, b)
  return str(res)


# @app.route('/add')
# def add_val():
#   a = request.args['a']
#   b = request.args['b']
#   res = add(int(a), int(b))
#   return str(res)

# @app.route('/sub')
# def sub_val():
#   a = request.args['a']
#   b = request.args['b']
#   res = sub(int(a), int(b))
#   return str(res)

# @app.route('/mult')
# def mult_val():
#   a = request.args['a']
#   b = request.args['b']
#   res = mult(int(a), int(b))
#   return str(res)

# @app.route('/div')
# def div_val():
#   a = request.args['a']
#   b = request.args['b']
#   res = div(int(a), int(b))
#   return str(res)