var ci = require("cla/ci");
ci.createRole("ControlM");
ci.createClass("controlMServer", {
    form: '/plugin/cla-controlm-plugin/form/controlm-form.js',
    icon: '/plugin/cla-controlm-plugin/icon/controlm.svg',
    roles: ["ControlM", "ClariveSE"],
    has: {
        username: {
            is: "rw",
            isa: "Str",
            required: true
        },
        password: {
            is: "rw",
            isa: "Str",
            required: true
        },
        urlBase: {
            is: "rw",
            isa: "Str",
            required: true
        },
        port: {
            is: "rw",
            isa: "Int",
            required: true
         },
        acceptAnyCert: {
            is: "rw",
            isa: "Bool",
            required: true
        }
    }
});