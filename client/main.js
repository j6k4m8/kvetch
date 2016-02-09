Template.main.helpers({
    'statuses': function() {
        return Statuses.find();
    }
});

Template.status_card.helpers({
    'color': function() {
        return ['red', 'green'][this.status * 1];
    },
    'health': function() {
        return ['Broken', 'Healthy'][this.status * 1];
    },
})
