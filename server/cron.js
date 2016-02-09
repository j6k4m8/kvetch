refreshEndpoints = function() {
    var sts = Statuses.find().fetch();
    for (var i = 0; i < sts.length; i++) {
        var st = sts[i];
        var pt = HTTP.get(st.url);
        var val = conditions[st.condition](pt, st.arg);
        Statuses.update(st._id, {$set: { status: val }});
    }
};

SyncedCron.add({
    name: 'Check endpoints',
    schedule: function(parser) {
        return parser.text('every 10 seconds');
    },
    job: function() {
        refreshEndpoints();
    }
});

SyncedCron.start();
