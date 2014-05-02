App = Ember.Application.create();

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});


// Return model
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});


App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

Ember.Handlebars.helper('format-timestamp', function(ts) {
  return moment.unix(ts).fromNow();
});

var posts = [{
  id: '1',
  title: "Rails is Omakase",
  author: { name: "d2h" },
  date: "2013-07-09 22:09:47 GMT",
  timestamp: 1298665620,
  excerpt: "There are lots of à la carte software environments in this world. Places where in order to eat, you must first carefully look over the menu of options to order exactly what you want.",
  body: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
}, {
  id: '2',
  title: "The Parley Letter",
  author: { name: "d2h" },
  date: new Date('12-24-2012'),
  timestamp: 1310249387,
  excerpt: "My [appearance on the Ruby Rogues podcast](http://rubyrogues.com/056-rr-david-heinemeier-hansson/) recently came up for discussion again on the private Parley mailing list.",
  body: "A long list of topics were raised and I took a time to ramble at large about all of them at once. Apologies for not taking the time to be more succinct, but at least each topic has a header so you can skip stuff you don't care about.\n\n### Maintainability\n\nIt's simply not true to say that I don't care about maintainability. I still work on the oldest Rails app in the world."  
}, {
	"blog_name": "citriccomics",
    "id": 3507845453,
    "post_url": "http:\/\/citriccomics.tumblr.com\/post\/3507845453",
    "type": "text",
    "date": "2011-02-25 20:27:00 GMT",
    "timestamp": 1298665620,
    "state": "published",
    "format": "html",
    "reblog_key": "b0baQtsl",
    "tags": [
        "tumblrize",
        "milky dog",
        "mini comic"
    ],
    "note_count": 14,
    "title": "Milky Dog",
    "body": "<p><img src=\"http://media.tumblr.com/tumblr_lh6x8d7LBB1qa6gy3.jpg\"/><a href=\"http://citriccomics.com/blog/?p=487\" target=\"_blank\">TO READ THE REST CLICK HERE</a><br/>\n\nMilky Dog was inspired by something <a href=\"http:\/\/gunadie.com\/naomi\" target=\"_blank\">Naomi Gee<\/a> wrote on twitter, I really liked the hash tag <a href=\"http:\/\/twitter.com\/ search?q=%23MILKYDOG\" target=\"_blank\">#milkydog<\/a> and quickly came up with a little comic about it. You can (and should) follow Naomi on twitter <a href=\"http:\/\ /twitter.com\/ngun\" target=\"_blank\">@ngun<\/a> I'm on twitter as well <a href=\"http:\/\/twitter.com\ /weflewairplanes\"target=\"_blank\">@weflewairplanes<\/a> <\/p>\n\nAlso, if you are a Reddit user (or even if you're not) I submitted this there, if you could up vote it I'd be super grateful just <a href=\"http:\/\ /tinyurl.com\/5wj3tqz\" target=\"_blank\">CLICK HERE<\/a>"

}];
