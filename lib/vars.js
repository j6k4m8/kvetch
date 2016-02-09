Statuses = new Meteor.Collection('statuses');

conditions = {
    CONTAINS_VALUE: function(val, needle) {
        return !!~val.data.indexOf(needle);
    },

    STATUS_CODE: function(val, code) {
        return val.statusCode == code;
    }
};

Meteor.methods({
    createNewCron: function(name, url, condition, arg) {
        SyncedCron.add({
            name: 'Check endpoints',
            schedule: function(parser) {
                return parser.text('every 30 seconds');
            },
            job: function() {
                var pt = HTTP.get(url);
                var val = condition(pt, arg);
                Statuses.update({
                    name: name
                }, {$set: {
                    status: val
                }});
            }
        });

        Statuses.insert({
            name: name,
            url: url,
            status: false
        });
    }
});
