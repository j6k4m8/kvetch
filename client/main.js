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
    },

    'change input, keyup input': function() {
        $('#form-submit').addClass('loading');
        _th_retryNewEndpoint();
    }
});

retryNewEndpoint = function() {
    Meteor.call('testEndpoint', $('#form-endpoint').val(), function(err, val) {
        if (!!val) {
            $('#form-submit').removeClass('yellow loading').addClass('green');
        } else {
            $('#form-submit').removeClass('green loading').addClass('red');
        }
    })
};
var _th_retryNewEndpoint = _.throttle(retryNewEndpoint, 2000);
