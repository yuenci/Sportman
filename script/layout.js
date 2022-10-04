
class Layout {
    constructor() {
        this.init();
    }
    init() {
        $(document).ready(function () {
            Layout.changeLayout();
        });


        $(window).resize(function () {
            Layout.changeLayout();
        });
    }

    static changeLayout() {
        if (document.body.clientWidth < 780) {
            $("#container").removeClass("container-grib");
            $("#container").addClass("container-flex");
            $("#sidebox").hide();
            $("#brand").hide();
            $("#container").css("width", "100%");
            $("#inbox").css("width", "95%");
            $("#content").css("position", "relative");
            $("#content").css("top", "180px");

        } else {
            $("#sidebox").show();

        }
    }
}


export { Layout };