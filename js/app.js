App = Ember.Application.create();
var posts=[];
/*
var posts = [{
  id: '1',
  title: "Rails is Omakase",
  author: { name: "d2h" },
  date: new Date('12-27-2012'),
  excerpt: "There are lots of à la carte software environments in this world. Places where in order to eat, you must first carefully look over the menu of options to order exactly what you want.",
  body: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nRails is not that. Rails is omakase."
}, {
  id: '2',
  title: "The Parley Letter",
  author: { name: "d2h" },
  date: new Date('12-24-2012'),
  excerpt: "My [appearance on the Ruby Rogues podcast](http://rubyrogues.com/056-rr-david-heinemeier-hansson/) recently came up for discussion again on the private Parley mailing list.",
  body: "A long list of topics were raised and I took a time to ramble at large about all of them at once. Apologies for not taking the time to be more succinct, but at least each topic has a header so you can skip stuff you don't care about.\n\n### Maintainability\n\nIt's simply not true to say that I don't care about maintainability. I still work on the oldest Rails app in the world."  
}];
*/

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});


// Return model
/*
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});
*/

/*
App.PostsRoute = Ember.Route.extend({
  model: function() {
    return App.TumblrPosts.findAll();
  }
});

App.TumblrPosts = Ember.Object.extend({});  //create a blank class
App.TumblrPosts.reopenClass({  //add a class method 'findAll' to the new class
    findAll: function() {
        posts = [];        
        $.ajax({ //use jquery to get the json from the api
            method: 'get',
            url: "http://api.tumblr.com/v2/blog/puru-prakash.tumblr.com/posts/text?api_key=JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As",
            dataType: 'jsonp', //use jsonp because of the same domain limitation
            success: function(response) {
                console.log("success");
                response.response.posts.forEach(function (child) {
                        posts.pushObject(App.TumblrPosts.create(child));
                        //console.log(child);
                });            
            }        
        });
        console.log('Retrieved All posts');
        //console.log(posts); //see that we instaniated the new objects from the GuardianLink class
        return posts;     
    }
});
*/


App.PostsRoute = Ember.Route.extend({
  model: function(params) {
    console.log("Getting All Posts");
    return Ember.$.getJSON('http://api.tumblr.com/v2/blog/puru-prakash.tumblr.com/posts/text?api_key=JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As&callback=?').then(function(data) {
      posts = data.response.posts;
      console.log(posts);
      console.log("Finished All Posts");
      return posts;
    });
  }
});


App.PostRoute = Ember.Route.extend({
  model: function(params) {
    console.log("Getting Single Post");
    console.log(params.post_id);
    console.log(posts);
    var output = posts.findBy('id', parseInt(params.post_id));
    console.log(output)
    console.log("Finished Single Post");
    return output;
  }
});

/*
App.PostRoute = Ember.Route.extend({
  model: function(params) {
    console.log("Getting Single Post");
    console.log(params.post_id);
    return Ember.$.getJSON('http://api.tumblr.com/v2/blog/puru-prakash.tumblr.com/posts?id='+params.post_id+'api_key=JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As&callback=?').then(function(data) {
      console.log(data);
      return data.response.posts;
    });
  }
});
*/

/*
App.AboutRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('http://api.tumblr.com/v2/blog/puru-prakash.tumblr.com/info?api_key=JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As&callback=?').then(function(data) {
      return data;
    });
  }
});
*/

App.AboutRoute = Ember.Route.extend({
  model: function() {
    return Ember.$.getJSON('http://api.tumblr.com/v2/blog/puru-prakash.tumblr.com/info?api_key=JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As&callback=?').then(function(data) {
      return data;
    });
  }
});


Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});

Ember.Handlebars.helper('format-timestamp', function(ts) {
  return moment.unix(ts).fromNow();
});

var info ={
    "meta": {
        "status": 200,
        "msg": "OK"
    },
    "response": {
        "blog": {
            "title": "Puru's Blog",
            "name": "puru-prakash",
            "posts": 2,
            "url": "http://puru-prakash.tumblr.com/",
            "updated": 1399070138,
            "description": "Coding Views & Insights",
            "ask": false,
            "ask_page_title": "Ask me anything",
            "ask_anon": false,
            "is_nsfw": false,
            "share_likes": true,
            "likes": 0
        }
    }
};

var tumblrposts = {
    "meta": {
        "status": 200,
        "msg": "OK"
    },
    "response": {
        "blog": {
            "title": "Puru's Blog",
            "name": "puru-prakash",
            "posts": 2,
            "url": "http://puru-prakash.tumblr.com/",
            "updated": 1399070138,
            "description": "Coding Views & Insights",
            "ask": false,
            "ask_page_title": "Ask me anything",
            "ask_anon": false,
            "is_nsfw": false,
            "share_likes": true,
            "likes": 0
        },
        "posts": [
            {
                "blog_name": "puru-prakash",
                "id": 84558269006,
                "post_url": "http://puru-prakash.tumblr.com/post/84558269006/ember-js",
                "slug": "ember-js",
                "type": "text",
                "date": "2014-05-02 22:35:38 GMT",
                "timestamp": 1399070138,
                "state": "published",
                "format": "html",
                "reblog_key": "ZRu8x8fR",
                "tags": [],
                "short_url": "http://tmblr.co/ZI9Cdn1Em4CfE",
                "highlighted": [],
                "note_count": 0,
                "title": "Ember.js",
                "body": "<p><a href=\"http://emberjs.com/\">Ember.js</a> is an open-source client-side JavaScript web application framework based on the model-view-controller (MVC) software architectural pattern. It allows developers to create scalable single-page applications by incorporating common idioms and best practices into a framework that provides a rich object model, declarative two-way data binding, computed properties, automatically-updating templates powered by <a href=\"http://handlebarsjs.com/\">Handlebars.js</a>, and a router for managing application state.</p>"
            },
            {
                "blog_name": "puru-prakash",
                "id": 84558081996,
                "post_url": "http://puru-prakash.tumblr.com/post/84558081996/first-post",
                "slug": "first-post",
                "type": "text",
                "date": "2014-05-02 22:33:24 GMT",
                "timestamp": 1399070004,
                "state": "published",
                "format": "html",
                "reblog_key": "8cnvaWPs",
                "tags": [],
                "short_url": "http://tmblr.co/ZI9Cdn1Em3U-C",
                "highlighted": [],
                "note_count": 0,
                "title": "First Post",
                "body": "<p>This is the <strong>First Post</strong> of my newly created blog.</p>"
            }
        ],
        "total_posts": 2
    }
};

var consumerkey = "JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As";


