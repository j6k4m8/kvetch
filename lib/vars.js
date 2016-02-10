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
    newEndpoint: function(name, url, condition, arg) {
        Statuses.insert({
            name: name,
            url: url,
            status: false,
            condition: condition,
            arg: arg
        });
    },

    deleteEndpoint: function(id) {
        return Statuses.remove(id);
    }
});
