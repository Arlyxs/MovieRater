var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },
  //toggle function
  toggleLike: function() {
    this.set('like', !this.get('like'));
    this.display();
  },//toggle like ends

  //display liked and up / down images
  display: function(){
    debugger;
    if (this.like === true) {
      this.showLiked();      
    } else {
      this.hideLiked();
    } //if else ends
  },
//hides Liked 
hideLiked: function(e){
  e = $('#likes');
  e.className='hidden';
  //test for revised data output
  console.log(e);
  this.like = true;
}, //hides liked ends
//shows liked
showLiked: function(e){
  e = $('likes');
  e.className = 'unhidden';
  //test for revised data output
  console.log(e);
  this.like = false;
},//show liked ends 

});//backbone model ends

//define the collection here - to hold the individual models
var Movies = Backbone.Collection.extend({

  model: Movie,
  comparator: 'title',

  initialize: function() {
    //add handlers
  },

  sortByField: function(field) {
    // your code here
	this.comparator = field;
	this.sort();
	console.log("we desperate");
  }

});


//define the main interface view here
var AppView = Backbone.View.extend({

  events: {
    'click form input': 'handleClick'
  },


  handleClick: function(e) {
    //write code here
	var field = e.target.value;
	this.collection.sortByField(field);
	this.render();
  },

  render: function() {
    new MoviesView({
      el: this.$('#movies'),
      collection: this.collection
    }).render();
  }

});


//define the view/interface for the individual movies
var MovieView = Backbone.View.extend({

  template: _.template('<div class="movie"> '+
                          '<div class="like">'+
                            '<button><img src="images/<%- like ? \'up\' : \'down\' %>.jpg"></button>'+
                          '</div>' +
                          '<span class="title"><%- title %></span>'+
                          '<span class="year">(<%- year %>)</span>'+
                          '<div class="rating">Fan rating: <%- rating %> of 10  '+
                          '<span id="likes" class="hidden"><%- liked %></span>'+
                        '</div>'),

  initialize: function() {
    // your code here
    //this.rende();
    this.model.on('toggle:like', this.render, this);
  },

  //bind the event to its handler function
  events: {
    
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
    this.model.toggleLike();
      
      this.render();
    },
    
    


  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }

});



//
var MoviesView = Backbone.View.extend({

  initialize: function() {
    // your code here
  },

  render: function() {
    this.$el.empty();
    this.collection.forEach(this.renderMovie, this);
  },

  renderMovie: function(movie) {
    var movieView = new MovieView({model: movie});
    this.$el.append(movieView.render());
  }

});
