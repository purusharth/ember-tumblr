App = Ember.Application.create();
var posts=[];

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});




App.PostsRoute = Ember.Route.extend({
  model: function(params) {
    //console.log("Getting All Posts");
    return Ember.$.getJSON('http://api.tumblr.com/v2/blog/puru-prakash.tumblr.com/posts/text?api_key=JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As&callback=?').then(function(data) {
      posts = data.response.posts;
      //console.log(posts);
      //console.log("Finished All Posts");
      return posts;
    });
  }
});


App.PostRoute = Ember.Route.extend({
  model: function(params) {
    //console.log("Getting Single Post");
    //console.log(params.post_id);
    //console.log(posts);
    var output = posts.findBy('id', parseInt(params.post_id));
    //console.log(output)
    //console.log("Finished Single Post");
    return output;
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
    //this.get('store').commit();
    console.log(this.get('title'));
    console.log(this.get('id'));
    console.log(this.get('body'));

    /*
     // does not work due to same origin policy (http://en.wikipedia.org/wiki/Same_origin_policy}
    $.ajax({
      type: 'POST', 
      url: 'http://api.tumblr.com/v2/blog/puru-prakash.tumblr.com/post/edit',
      data: { 
        'id': this.get('id'),
        'type': 'text',
        'title': this.get('title'), 
        'body': this.get('body'),
        'api_key': 'JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As'
      },
      success: function(msg){
        alert('Success: ' + msg);
      }
    });
    */
  }
});


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

Ember.Handlebars.helper('format-ts', function(ts) {
  return moment.unix(ts).format('MMMM Do YYYY, h:mm:ss a');
});

var consumerkey = "JOVD2WEweNIi3KL3id2xwx43kPAJN4MAbvSBhvPOjIf4y028As";


