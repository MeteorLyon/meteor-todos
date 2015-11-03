FlowRouter.notFound = {
  action: function() {
    console.log('render notfound');
    BlazeLayout.render('appBody', {
      mainZone: "appNotFound",
    });
  }
};

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();
}

FlowRouter.route('/join', {
  name: "join",
  action: function() {
    console.log('render join');
    BlazeLayout.render("appBody", {
      mainZone: "join",
    });
  }
});

FlowRouter.route('/signin', {
  name: "signin",
  action: function() {
    console.log('render signin');
    BlazeLayout.render("appBody", {
      mainZone: "signin",
    });
  }
});

FlowRouter.route('/lists/:id', {
  name: 'listsShow',
  subscriptions: function(params, queryParams) {
    this.register('publicLists', Meteor.subscribe('publicLists'));
    this.register('privateLists', Meteor.subscribe('privateLists'));
  },
  action: function () {
    console.log('render lists/:id');
    Tracker.autorun(function(computation) {
      console.log('re-render lists/:id', FlowRouter.getParam('id'));
      if (FlowRouter.subsReady("publicLists") && FlowRouter.subsReady("privateLists")) {
        dataReadyHold.release();

        console.log('re-render lists/:id inside',  FlowRouter.getParam('id'));

        BlazeLayout.render('appBody', {
          mainZone: "listsShow",
        });

        computation.stop();
      }
    });

    BlazeLayout.render('appBody', {
      mainZone: "loading",
    });
  }
});

FlowRouter.route('/', {
  name: 'home',
  subscriptions: function(params, queryParams) {
    this.register('publicLists', Meteor.subscribe('publicLists'));
    this.register('privateLists', Meteor.subscribe('privateLists'));
  },
  action: function() {
    console.log('render home');
    Tracker.autorun(function(computation) {
      console.log('re-render home');
      if (FlowRouter.subsReady("publicLists") || FlowRouter.subsReady("privateLists")) {
        FlowRouter.go('listsShow', {id: Lists.findOne()._id});
        computation.stop();
      }
    });
  }
});
