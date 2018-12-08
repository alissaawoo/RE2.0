// This is the js for the default/index.html view.

var app = function() {

    var self = {};

    Vue.config.silent = false; // show all warnings

    // Enumerates an array
    var enumerate = function(v) { var k = 0; return v.map(function (e) {
        e._idx = k++;});};




    self.extend = function(a, b) {
           for (var i = 0; i < b.length; i++) {
               a.push(b[i]);
           }
       };


     function get_messages_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return messages_url + "?" + $.param(pp);
    }

    self.get_messages = function () {
//        var num_messages = self.vue.messages.length;
        $.getJSON(get_messages_url(0, 10), function (data) {
            self.vue.has_more = data.has_more;
            //self.vue.logged_in = data.logged_in;
            self.vue.logged_id = data.logged_id;
            self.extend(self.vue.messages, data.messages);
            enumerate(self.vue.messages);
        })
      }

//    self.send_messages = function() {
//        $.post(send_message_url,
//            {
//                subject: self.vue.form_subject,
//                body_text: self.vue.form_body_text,
//                contact_info: self.vue.form_contact_info,
//            },
//        function (data) {
//            self.vue.messages.unshift(data.private_message);
//            //self.vue.form_title = "";
//            //self.vue.form_price = "";
//            enumerate(self.vue.messages);
//            self.vue.form_subject = null;
//            self.vue.form_body_text = null;
//            self.vue.form_contact_info = null;
//
//        });
//    };


     self.get_users = function () {
        $.getJSON(get_user_url, function(data) {
            self.vue.user_name = data.users;
            enumerate(self.vue.user_name);
        })
    };



    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            messages: [],
//            form_subject: null,
//            form_body_text: null,
//            form_contact_info: null,
//            logged_email: null,
//            has_more: false,
            logged_id: null,
            user_name: [],


        },
        methods: {
           get_messages: self.get_messages,
//           send_messages: self.send_messages,

        }

    });

    self.get_users();
    self.get_messages();
    $("#vue-div").show();
    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
