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
      }
    },
    settings: {},
    init: function (options) {
      this.settings = $.extend(true, {}, this.defaults, options);
      return this;
    },
    flash: function (type, messages) {
      if (type in this.settings) {
        var config = this.settings[type];
        var plugin = config.plugin;
        var options = config.options;

        if (plugin === 'toast') {
          messages.forEach(msg => {
            var opPlugin = $.extend(true, {}, this.settings[type].options, options);
            toastr[type](msg, opPlugin.title);
          });
        } else if (plugin === 'sweetalert') {
          var opPlugin = $.extend(true, {}, this.settings[type].options, { ...options, text: messages.join('<br />') });
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
    toast: function (type, messages) {
      if (this.settings[type].plugin === 'toast') {
        this.flash(type, messages);
      }
    },
    sweetalert: function (type, messages) {
      if (this.settings[type].plugin === 'sweetalert') {
        this.flash(type, messages);
      }
    }
  };
})(jQuery);