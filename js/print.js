var fs = require("fs");
onload = function () {
  FileEntry = decodeURI(location.search.substring(1));
  fs.readFile(FileEntry, function (err, data) {
    if (err) {
      alert("Read failed: " + err);
    }
    data = imgExtract(String(data));
    RenderMarkdown($("#content"), data);
  });
  if ($.cookie("page_size") == "a3") {
    $("#page_size").attr("checked", "checked");
    $("body").css("width", "1123px");
  }
  $("#page_size").bootstrapSwitch({
    state: $.cookie("page_size") == "a3",
    onText: "A3",
    onColor: "primary",
    offText: "A4",
    offColor: "primary",
    labelText: "纸张大小",
    handleWidth: 100,
  });
  $("#page_size").on("switchChange.bootstrapSwitch", function (e, state) {
    if (state) {
      $.cookie("page_size", "a3", { path: "/" });
      $("body").css("width", "1123px");
    } else {
      $.removeCookie("page_size", { path: "/" });
      $("body").css("width", "794px");
    }
  });
  $("#print_button").on("click", function () {
    window.print();
  });
};
