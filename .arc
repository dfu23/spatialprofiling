@app
spatial

@domain
spatialprofiling.com

@html
get /
get /page/:page
post /count
get /wtf
get /login
get /protected
get /logout

@tables
posts
  postID *String
  #slug
  #title
  #body
  #tags
  #ts

reactions
  postID *String
  emoji **String
  #count
