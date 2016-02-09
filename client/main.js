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
});

Template.status_card.events({
    'click .js-status-button': function(ev) {
        $(ev.target).addClass('loading')
            .parents('.js-status-button')
            .find('a')
            .animate({width:'toggle'},350);

        Meteor.call('refreshEndpoints', function(err, val) {
            $(ev.target).removeClass('loading')
                .parents('.js-status-button')
                .find('a')
                .animate({width:'toggle'},350);
        });
    },

    'click .delete.icon': function() {
        Meteor.call('deleteEndpoint', this._id);
    }
});


Template.new_status.events({
    'click #form-submit': function() {
        Meteor.call('newEndpoint', $('#form-name').val(), $('#form-endpoint').val(), $('#form-condition').val(), $('#form-arg').val())
    }
});
