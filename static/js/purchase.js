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

       self.get_users = function () {
         $.getJSON(get_users_url, function(data){
           self.vue.users = data.users;
           enumerate(self.vue.users);
         })
       };

    // Extends an array
/*    self.extend = function(a, b) {
        for (var i = 0; i < b.length; i++) {
            a.push(b[i]);
        }
    };
    self.adding_memo = function() {
        self.vue.is_adding_memo = !self.vue.is_adding_memo;
            self.vue.form_title = "";
            self.vue.form_memo = "";
    }
    self.submit_memo = function() {
        $.post(add_memo_url,
            {
                title: self.vue.form_title,
                memo: self.vue.form_memo,
            },
        function (data) {
            self.vue.memos.unshift(data.memo);
            enumerate(self.vue.memos);
            self.vue.is_adding_memo = false;
            self.vue.form_title = "";
            self.vue.form_memo = "";
        });
    };
    self.delete_memo = function(track_idx) {
        $.post(delete_memo_url,
            {
                track_id: self.vue.memos[track_idx].id
            },
            function () {
                self.vue.memos.splice(track_idx, 1);
                enumerate(self.vue.memos);
            })
    };
    self.editing_memo = function(track_idx) {
        $.post(edit_memo_url,
            {
                track_id: self.vue.memos[track_idx].id,
                title: self.vue.form_title1,
                memo: self.vue.form_memo1,
            },
            function () {
                self.vue.is_edit = false;
                self.vue.memos[track_idx].memo = self.vue.form_memo1;
                self.vue.memos[track_idx].title = self.vue.form_title1;
            })
    }
    self.edit_memo = function(_idx) {
        self.vue.edit_idx = _idx;
        self.vue.is_edit = !self.vue.is_edit;
        if (self.vue.is_edit) {
            self.vue.form_title1 = self.vue.memos[_idx].title;
            self.vue.form_memo1 = self.vue.memos[_idx].memo;
        }
    }
    self.toggle_public = function (_idx) {
        self.vue.select_idx = _idx;
        $.post(toggle_public_url,
            {
                memo_id: self.vue.memos[_idx].id,
            },
            function (data) {
                self.vue.toggled = !self.vue.toggled;
                self.vue.memos[_idx] = data.memo;
                enumerate(self.vue.memos);
            })
    }
    */

    function get_sorted_high_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return sorted_high_tickets_url + "?" + $.param(pp);
    }

    self.get_tickets_sorted_high = function () {
        var num_tickets = self.vue.tickets.length;
        self.vue.is_sorted_high = true;
        self.vue.is_sorted_low = false;
        self.vue.is_sorted_date = false;
        $.getJSON(get_sorted_high_url(0, num_tickets + 10), function (data) {
            self.vue.has_more = data.has_more;
            //self.vue.logged_in = data.logged_in;
            self.vue.logged_email = data.logged_email;
            self.vue.tickets = data.tickets;
            enumerate(self.vue.tickets);

        })
    }

    function get_sorted_low_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return sorted_low_tickets_url + "?" + $.param(pp);
    }

    self.get_tickets_sorted_low = function () {
        var num_tickets = self.vue.tickets.length;
        self.vue.is_sorted_high = false;
        self.vue.is_sorted_date = false;
        self.vue.is_sorted_low = true;
        $.getJSON(get_sorted_low_url(0, num_tickets + 10), function (data) {
            self.vue.has_more = data.has_more;
            //self.vue.logged_in = data.logged_in;
            self.vue.logged_email = data.logged_email;
            self.vue.tickets = data.tickets;
            enumerate(self.vue.tickets);

        })
    }


  /*  self.sort_price = function(){
      for (var i = 0; i < self.vue.tickets.length; i++){
            var  value = self.vue.tickets[i];
            var test_slot = i - 1;
            while( test_slot > -1 && self.vue.tickets[test_slot].price > value.price){
                self.vue.tickets[test_slot + 1] = self.vue.tickets[test_slot];
                test_slot = test_slot - 1;
              }
            self.vue.tickets[test_slot + 1] = value;
          }
    }
    */

    self.editing_ticket = function(_idx) {
        $.post(edit_ticket_url,
            {
                _id: self.vue.tickets[_idx].id,
                title: self.vue.form_title_edit,
                price: self.vue.form_price_edit,
                description: self.vue.form_description_edit,
                event_date: self.vue.form_event_date_edit,
                genre: self.vue.form_genre_edit,
                event_location: self.vue.form_location_edit,
            },
            function () {
                self.vue.tickets[_idx].is_edit = false;
                self.vue.tickets[_idx].title = self.vue.form_title_edit;
                self.vue.tickets[_idx].price = self.vue.form_price_edit;
                self.vue.tickets[_idx].genre = self.vue.form_genre_edit;
                self.vue.tickets[_idx].event_location = self.vue.form_location_edit;
                self.vue.tickets[_idx].description = self.vue.form_description_edit;
                self.vue.tickets[_idx].event_date = self.vue.form_event_date_edit;
                self.vue.form_title_edit = null;
                self.vue.form_price_edit = null;
                self.vue.form_genre_edit = null;
                self.vue.form_description_edit = null;
                self.vue.form_event_date_edit = null;
                self.vue.form_location_edit = null;
            })
    }
    self.edit_ticket_button = function(_idx) {
        //self.vue.edit_idx = _idx;
        self.vue.tickets[_idx].is_edit = !self.vue.tickets[_idx].is_edit;
        if (self.vue.tickets[_idx].is_edit) {
            self.vue.form_title_edit = self.vue.tickets[_idx].title;
            self.vue.form_price_edit = self.vue.tickets[_idx].price;
            self.vue.form_description_edit = self.vue.tickets[_idx].description;
            self.vue.form_event_date_edit = self.vue.tickets[_idx].event_date;
            self.vue.form_genre_edit = self.vue.tickets[_idx].genre;
            self.vue.form_location_edit = self.vue.tickets[_idx].event_location;
        }
    }

    function get_tickets_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return tickets_url + "?" + $.param(pp);
    }

    self.get_tickets = function () {
        var num_tickets = self.vue.tickets.length;
        if(self.vue.is_sorted_low){
          $.getJSON(get_sorted_low_url(num_tickets, num_tickets + 10), function (data) {
              self.vue.has_more = data.has_more;
              //self.vue.logged_in = data.logged_in;
              self.vue.logged_email = data.logged_email;
              self.extend(self.vue.tickets, data.tickets);
              enumerate(self.vue.tickets);
              })
        }else if(self.vue.is_sorted_high){
          $.getJSON(get_sorted_high_url(num_tickets, num_tickets + 10), function (data) {
              self.vue.has_more = data.has_more;
              //self.vue.logged_in = data.logged_in;
              self.vue.logged_email = data.logged_email;
              self.extend(self.vue.tickets, data.tickets);
              enumerate(self.vue.tickets);
              })
        }else if(self.vue.is_sorted_date){
          $.getJSON(get_sorted_low_date_url(num_tickets, num_tickets + 10), function (data) {
              self.vue.has_more = data.has_more;
              //self.vue.logged_in = data.logged_in;
              self.vue.logged_email = data.logged_email;
              self.extend(self.vue.tickets, data.tickets);
              enumerate(self.vue.tickets);
              })
        }else{
        $.getJSON(get_tickets_url(num_tickets, num_tickets + 10), function (data) {
            self.vue.has_more = data.has_more;
            //self.vue.logged_in = data.logged_in;
            self.vue.logged_email = data.logged_email;
            self.extend(self.vue.tickets, data.tickets);
            enumerate(self.vue.tickets);

        })
      }
    }

    self.get_start_tickets = function (){
      var num_tickets = self.vue.tickets.length;
      self.vue.is_sorted_date = false;
      self.vue.is_sorted_low = false;
      self.vue.is_sorted_high = false;
      $.getJSON(get_tickets_url(0, num_tickets + 10), function (data) {
          self.vue.has_more = data.has_more;
          //self.vue.logged_in = data.logged_in;
          self.vue.logged_email = data.logged_email;
          self.vue.tickets = data.tickets;
          enumerate(self.vue.tickets);

      })
    }


    function get_sorted_low_date_url(start_idx, end_idx) {
        var pp = {
            start_idx: start_idx,
            end_idx: end_idx
        };
        return Event_date_tickets_url + "?" + $.param(pp);
    }

    self.get_ticket_date = function () {
        var num_tickets = self.vue.tickets.length;
        self.vue.is_sorted_date = true;
        self.vue.is_sorted_low = false;
        self.vue.is_sorted_high = false;
          $.getJSON(get_sorted_low_date_url(0, num_tickets + 10), function (data) {
              self.vue.has_more = data.has_more;
              //self.vue.logged_in = data.logged_in;
              self.vue.logged_email = data.logged_email;
            self.vue.tickets = data.tickets;
              enumerate(self.vue.tickets);
              })
    }

    self.sell_tickets = function() {
        $.post(sell_ticket_url,
            {
                title: self.vue.form_title,
                price: self.vue.form_price,
                date: self.vue.form_date,
                description: self.vue.form_description,
                genre: self.vue.form_genre,
                event_location: self.vue.form_location,

            },
        function (data) {
            self.vue.tickets.unshift(data.listing);
            //self.vue.form_title = "";
            //self.vue.form_price = "";
            enumerate(self.vue.tickets);
          //  self.vue.is_adding_memo = false;
            self.vue.form_title = null;
            self.vue.form_price = null;
            self.vue.form_description = null;
            self.vue.form_date = null;
            self.vue.form_title_edit = null;
            self.vue.form_price_edit = null;
            self.vue.form_description_edit = null;
            self.vue.form_event_date_edit = null;
            self.vue.form_genre = null;
            self.vue.form_location = null;
        });
    };

    self.delete_ticket_button = function(_idx) {
        $.post(delete_ticket_url,
            {
                _id: self.vue.tickets[_idx].id
            },
            function () {
                self.vue.tickets.splice(_idx, 1);
                enumerate(self.vue.tickets);
            })
    };

    self.filter_post = function(){

      self.vue.is_filtered = true;

    }

    self.filter_none = function(){
      self.vue.is_filtered = false;
      //self.vue.filter_genre = null;

    }

    self.get_events = function() {
      $.getJSON(songkick_url, function (data) {
        var events_array = data.resultsPage.results.calendarEntry;
        console.log(events_array);

        events_array.forEach(function(item) {
          self.vue.events.push(item);
          enumerate(self.vue.events);

        });
        console.log(self.vue.events[0].event.displayName);
      });
    };

    self.get_products = function () {
        // Gets new products in response to a query, or to an initial page load.
        $.getJSON(products_url, $.param({q: self.vue.product_search}), function(data) {
            self.vue.tickets = data.products;
            enumerate(self.vue.tickets);
        });
    };

    self.display_profile = function (id) {
      self.vue.show_profile = true;
      self.vue.show_id = id;
    }

    self.close_profile = function(){
      self.vue.show_profile = false;
      self.vue.show_id = null;
    }


     self.send_messages = function() {
        $.post(send_message_url,
            {
                to_id: self.vue.show_id,
                subject: self.vue.form_subject,
                body_text: self.vue.form_body_text,
                contact_info: self.vue.form_contact_info,
            },
        function (data) {
            self.vue.messages.unshift(data.private_message);
            //self.vue.form_title = "";
            //self.vue.form_price = "";
            enumerate(self.vue.messages);
            self.vue.form_subject = null;
            self.vue.form_body_text = null;
            self.vue.form_contact_info = null;

        });
    };

    // Complete as needed.
    self.vue = new Vue({
        el: "#vue-div",
        delimiters: ['${', '}'],
        unsafeDelimiters: ['!{', '}'],
        data: {
            tickets: [],
            users: [],
            //is_adding_memo: false,
            form_title: null,
            form_price: null,
            form_genre: null,
            form_description: null,
            form_date: null,
            logged_email: null,
            form_title_edit: null,
            form_location: null,
            form_location_edit: null,

            form_price_edit: null,
            form_genre_edit: null,
            form_description_edit: null,
            form_event_date_edit: null,
            is_sorted_high: false,
            is_sorted_low: false,
            is_sorted_date: false,
            is_filtered: false,
            has_more: false,
            filter_genre: null,
            events: [],
            product_search: null,
            show_profile: false,
            show_id: null,

            messages: [],
            form_subject: null,
            form_body_text: null,
            form_contact_info: null,
            logged_email: null,
            has_more: false,


        },
        methods: {
            sell_tickets: self.sell_tickets,
            sell_ticket_event: self.sell_ticket_event,
            edit_ticket_button: self.edit_ticket_button,
            editing_ticket: self.editing_ticket,
            delete_ticket_button: self.delete_ticket_button,
          //  sort_price: self.sort_price,
            get_tickets_sorted_high: self.get_tickets_sorted_high,
            get_tickets_sorted_low: self.get_tickets_sorted_low,
            get_tickets: self.get_tickets,
            filter_post: self.filter_post,
              filter_none: self.filter_none,
              get_events: self.get_events,
              get_ticket_date: self.get_ticket_date,
              get_start_tickets: self.get_start_tickets,
              get_products: self.get_products,
              get_users: self.get_users,
              display_profile: self.display_profile,
              close_profile: self.close_profile,
              send_messages: self.send_messages,

          /*  submit_memo: self.submit_memo,
            delete_memo: self.delete_memo,
            editing_memo: self.editing_memo,
            edit_memo: self.edit_memo,
            get_more: self.get_more,
            toggle_public: self.toggle_public, */

        }

    });

    self.get_users();
    self.get_tickets();
    self.get_events();
    $("#vue-div").show();
    return self;
};

var APP = null;

// This will make everything accessible from the js console;
// for instance, self.x above would be accessible as APP.x
jQuery(function(){APP = app();});
