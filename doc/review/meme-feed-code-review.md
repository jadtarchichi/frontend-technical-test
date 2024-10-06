Meme feed page:
* The problem in this page was loading all the meme data of all pages plus their comments of all pages and the author of each comment.
* To much calls at one time.
* Therefor, I added a simple pagination for the meme feed, plus I load the comments data with their author only when user open the comment section for each meme card. I could also add a pagination in the comments section (Show more for example)
* Moreover, I restructure the code by seperating each section in a folders and sub folders (pages, helpers, services....)
s
I did not change the use of the context. I prefer to use a state managment like mobx for example.