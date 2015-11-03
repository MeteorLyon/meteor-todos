Template.listsShowLayout.helpers({
    // We use #each on an array of one item so that the "list" template is
    // removed and a new copy is added when changing lists, which is
    // important for animation purposes. #each looks at the _id property of it's
    // items to know when to insert a new item and when to update an old one.
    thisArray: function() {
        //return [this];
        var data = Lists.findOne({_id: FlowRouter.getParam('id')}, {fields: {_id: 1, name: 1, incompleteCount: 1}});
        console.info('data', data);
        return [data];
    }
});