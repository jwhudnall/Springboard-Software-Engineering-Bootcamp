import bcrypt

salt = bcrypt.gensalt()
password = b'monkeypepper78' # byte string
hashed_pw = bcrypt.hashpw(password, salt) # byte string hash result
