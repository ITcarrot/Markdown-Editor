var MathConfig = {
  delimiters: [
    { left: "$$", right: "$$", display: true },
    { left: "$", right: "$", display: false },
    { left: "\\(", right: "\\)", display: false },
    { left: "\\[", right: "\\]", display: true },
  ],
  throwOnError: false,
};

function RenderMarkdown(dest, content) {
  dest.html(marked.parse(content));
  dest.find("code").each(function () {
    if ($(this).hasClass("language-c++"))
      $(this).removeClass("language-c++").addClass("language-cpp");
  });
  dest.find("table").each(function () {
    $(this).addClass(
      "table table-bordered table-hover table-striped table-text-center"
    );
    $(this).wrap('<div class="table-responsive"></div>');
  });
  imgParseHtml(dest);
  Prism.highlightAll();
  renderMathInElement(dest[0], MathConfig);
}
