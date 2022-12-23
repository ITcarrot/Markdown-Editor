onload = function() {
	$('textarea').autosize();
	init_editor();
	sh_highlightDocument();
	MathJax.typesetPromise();
	$('#button-image-selector').click(function() {
		$('#div-image-selector').toggle('fast');
	});
	$("#openImg").change(function(evt) {
		fs.readFile($(this).val(), function (err, data) {
			if (err) {
			  alert("Read failed: " + err);
			}
			data = 'data:image;base64,' + new Buffer(data).toString('base64');
			for(i=0;i<image_set.length;i++)
				if(image_set[i]==''){
					image_set[i]=data;
					updateImgPool();
					return;
				}
			image_set.push(data);
			updateImgPool();
		});
	});
	$('#paste-img')[0].addEventListener("paste", function (e){
		e.preventDefault();
		if ( !(e.clipboardData && e.clipboardData.files[0]) ) {
			return;
		}
		var reader = new FileReader();
		reader.readAsDataURL(e.clipboardData.files[0]);
		reader.onload = function(evt) {
			var data = evt.target.result;
			for(i=0;i<image_set.length;i++)
				if(image_set[i]==''){
					image_set[i]=data;
					updateImgPool();
					return;
				}
			image_set.push(data);
			updateImgPool();
		}
	});
};

before_window_unload_message = null;
$(window).on('beforeunload', function() {
	if (before_window_unload_message !== null) {
	    return before_window_unload_message;
	}
});

var fs=require("fs");
var editor;
var preview_timer = -1;
var FileEntry = null;
var saved;

function set_saved(val)
{
	saved=val;
	if(val){
		before_window_unload_message = null;
		$('#save-tag').hide();
	}else{
		before_window_unload_message = '您所编辑的内容尚未保存';
		$('#save-tag').show();
	}
}

function save()
{
	fs.writeFile(FileEntry, editor.getValue()+getImgStr(), function (err) {
		if (err) {
		  alert("Write failed: " + err);
		  return;
		}
	});
	set_saved(true);
}

function init_editor() {
	editor=CodeMirror($('#editor')[0], {
		mode: 'markdown',
		theme: 'default',
		indentUnit: 4,
		indentWithTabs: true,
		lineWrapping: true,
		lineNumbers: true,
		autoCloseBrackets: true,
		autoCloseTags: true,
		matchBrackets: true,
		matchTags: true,
		foldGutter: true,
		gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
		scrollPastEnd: true,
		highlightSelectionMatches: {annotateScrollbar: true},
		styleActiveLine: {nonEmpty: true},
		extraKeys:{
			"Ctrl-S": function(cm) {
				$('#save').click();
			},
			"Ctrl-/": "toggleComment",
			"Enter": "newlineAndIndentContinueMarkdownList",
			"Ctrl-F": "findPersistent"
		}
	});
	set_saved(false);
	editor.on('change', function() {
		set_saved(false);
		clearTimeout(preview_timer);
		preview_timer=setTimeout(function(){
			$('#editor-preview').html(marked.parse(editor.getValue(),{langPrefix: 'sh_'}));
			imgParseHtml($('#editor-preview'));
			sh_highlightDocument($('#editor-preview')[0]);
			MathJax.typesetPromise();
		},500);
	});
	$('#new').click(function(){
		var x = window.screenX + 10;
		var y = window.screenY + 10;
		window.open('index.html', '_blank', 'screenX=' + x + ',screenY=' + y);
	});
	$('#open').click(function(){
		if(!saved && !confirm('您所编辑的内容尚未保存，是否继续？'))
			return;
		$("#openFile").trigger("click");
	});
	$("#openFile").change(function(evt) {
		FileEntry = $(this).val();
		fs.readFile(FileEntry, function (err, data) {
			if (err) {
			  alert("Read failed: " + err);
			}
			document.title = FileEntry;
			$('#filename').text(FileEntry);
			data=imgExtract(String(data));
			editor.setValue(data);
			set_saved(true);
		});
	});
	$('#save').click(function(){
		if(FileEntry)
			save();
		else
			$("#saveFile").trigger("click");
	});
	$("#saveFile").change(function(evt) {
		FileEntry=$(this).val();
		document.title = FileEntry;
		$('#filename').text(FileEntry);
		save();
	});
	$('#print').click(function(){
		if(!saved){
			alert('请先保存');
			return;
		}
		window.open('print.html?'+encodeURI(FileEntry));
	});
}