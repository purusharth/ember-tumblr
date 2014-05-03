App = Ember.Application.create();
var posts=[];

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

var consumerkey = "JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As";


