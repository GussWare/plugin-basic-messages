(function($) {
    $.BasicMessage = {
      defaults: {
        success: {
          plugin: 'toast',
          toastOptions: {},
          sweetAlertOptions: {}
        },
        error: {
          plugin: 'sweetalert',
          toastOptions: {},
          sweetAlertOptions: {}
        },
        info: {
          plugin: 'toast',
          toastOptions: {},
          sweetAlertOptions: {}
        },
        warning: {
          plugin: 'sweetalert',
          toastOptions: {},
          sweetAlertOptions: {}
        }
      },
      settings: {},
      init: function(options) {
        this.settings = $.extend(true, {}, this.defaults, options);
        return this;
      },
      flash: function(type, messages) {
        if (type in this.settings) {
          var plugin = this.settings[type].plugin;
          if (plugin === 'toast') {
            messages.forEach(msg => {
                $.toast($.extend(true, {}, this.settings[type].toastOptions, {
                    text:msg
                  }));
            });
          } else if (plugin === 'sweetalert') {
            new Swal($.extend(true, {}, this.settings[type].sweetAlertOptions, {
              title: type.charAt(0).toUpperCase() + type.slice(1),
              text: messages.join('\n')
            }));
          }
        }
      },
      success: function(messages) {
        this.flash('success', messages);
      },
      error: function(messages) {
        this.flash('error', messages);
      },
      info: function(messages) {
        this.flash('info', messages);
      },
      warning: function(messages) {
        this.flash('warning', messages);
      },
      toast: function(type, messages) {
        if (this.settings[type].plugin === 'toast') {
          this.flash(type, messages);
        }
      },
      sweetalert: function(type, messages) {
        if (this.settings[type].plugin === 'sweetalert') {
          this.flash(type, messages);
        }
      }
    };
  })(jQuery);