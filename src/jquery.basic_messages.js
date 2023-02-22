(function ($) {
  $.BasicMessage = {
    defaults: {
      success: {
        plugin: 'toast',
        options: {
          title: "¡Exito!"
        }
      },
      error: {
        plugin: 'sweetalert',
        options: {
          title: "!Error!"
        }
      },
      info: {
        plugin: 'sweetalert',
        options: {
          title: "!Info!"
        }
      },
      warning: {
        plugin: 'sweetalert',
        options: {
          title: "!Warning!"
        }
      },
      toast: {

      },
      sweetalert:{

      }
    },
    settings: {},
    init: function (options) {
      this.settings = $.extend(true, {}, this.defaults, options);
      return this;
    },
    flash: function (type, messages) {
      var self = this;

      if (type in this.settings) {
        var config = this.settings[type];
        var plugin = config.plugin;
        var options = config.options;

        if (plugin === 'toast') {
          messages.forEach(msg => {
            var opPlugin = $.extend(true, {}, this.settings[type].options, options);
            self.toast(type, opPlugin.title, msg);
          });
        } else if (plugin === 'sweetalert') {
          var opPlugin = $.extend(true, {}, this.settings[type].options, { ...options, icon: type, text: messages.join('<br />') });
          new Swal(opPlugin);
        }
      }

      return $(this);
    },
    success: function (messages) {
      this.flash('success', messages);
    },
    error: function (messages) {
      this.flash('error', messages);
    },
    info: function (messages) {
      this.flash('info', messages);
    },
    warning: function (messages) {
      this.flash('warning', messages);
    },
    toast: function (type, title, messages) {
      toastr[type](messages, title);
    },
    sweetalert: function (type, title, messages) {
      if (typeof type === "object") {
        new Swal(title);
      } else {

        var options = {
          title: title,
          icon: type,
          showCancelButton: true,
          text: messages.join('<br />')
        };

        new Swal(options);
      }

    }
  };
})(jQuery);