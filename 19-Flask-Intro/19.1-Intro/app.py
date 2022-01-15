from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
  html = '''
  <html>
    <body>
    <h1>Welcome</h1>
    <p>This is the home page</p>
    <a href="/hello">Go to Hello</a>
    </body>
  </html>
  '''
  return html

@app.route('/hello')
def say_hello():
  html = '''
  <html>
    <body>
    <h1>Hello!</h1>
    <p>This is the hello page</p>
    </body>
  </html>
  '''

  return html

@app.route('/goodbye')
def say_bye():
  return "Goodbye!"

@app.route('/search')
def search():
  term = request.args["name"]
  return f"<h1>Search Results for {term}</h1>"

# @app.route('/post', methods=['POST'])
# def post_demo():
#   # topic = request.args['topic']
#   return f'<h1>You made a post request!<h1>'

@app.route('/add-comment')
def add_comment_form():
  return '''
  <h1>Add Comment</h1>
  <form method="POST">
    <input type='text' placeholder='comment' name='comment'>
    <button>Submit</button>
  </form>
  '''

@app.route('/add-comment', methods=["POST"])
def save_comment():
  comment = request.form["comment"]
  return f'''
  <h1>Saved Your Comment</h1>
  <p>{comment}</p>
  '''

@app.route('/r/<subreddit>')
def show_subreddit(subreddit):
  return f"""<h1>Browsing the {subreddit} Subreddit</h1>"""

POSTS = {
  1: 'I like chicken',
  2: 'I like dogs',
  3: 'Dude, where\'s my car?'
}

@app.route('/posts/<int:id>')
def show_posts(id):
  # return POSTS.get(id, 'Does not exist')
  post =  POSTS.get(id, 'Post Not Found')
  return f'<p>{post}</p>'