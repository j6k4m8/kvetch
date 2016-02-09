//
// SyncedCron.add({
//     name: 'Check endpoints',
//     schedule: function(parser) {
//         return parser.text('every 30 seconds');
//     },
//     job: function() {
//         var pt = HTTP.get('http://openconnecto.me/ocp/ca/public_tokens/');
//         return pt.data.length > 1;
//     }
// });

SyncedCron.start();
