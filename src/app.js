var Movie = Backbone.Model.extend({

  defaults: {
    like: true
  },

  toggleLike: function() {
    this.set('like', !this.get('like'));
  }

});


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
  },

  //bind the event to its handler function
  events: {
    'click button': 'handleClick'
  },

  handleClick: function() {
    // your code here
	
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
