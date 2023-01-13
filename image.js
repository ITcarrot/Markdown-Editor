const hint="<!-- the following content is the JSON form of the BASE64-encoded image array which could be used in this file. ";
var image_set=[];

function imgExtract(content)
{
	image_set=[];
	updateImgPool();
	if(result = /<!-- the following content is the JSON form of the BASE64-encoded image array which could be used in this file. (\S+) -->$/.exec(content)){
		try{
			image_set=JSON.parse(result[1]);
		}catch{
			return content;
		}
		content=content.slice(0,result['index']);
		updateImgPool();
	}
	return content;
}

function getImgStr()
{
	if(image_set.length>0)
		return hint+JSON.stringify(image_set)+' -->';
	return '';
}

function imgParseHtml(article)
{
	var ParseEntry = FileEntry;
	ParseEntry = ParseEntry.replaceAll('\\','/');
	ParseEntry = /.*\//.exec(ParseEntry)[0];
	article.find('img').each(function(){
		var src=$(this).attr('src');
		if(/^\.{1,2}\//.test(src))
			$(this).attr('src',ParseEntry + src);
		else{
			id=/localimg([0-9]+)/.exec(src);
			if(id && !isNaN(id[1]) && id[1]<image_set.length)
				$(this).attr('src',image_set[id[1]]);
		}
	});
}

function updateImgPool()
{
	if(!$('#img-pool')[0]) return;
	$('#img-pool').html('');
	set_saved(false);
	for(i=0;i<image_set.length;i++)
		if(image_set[i].length>0)
			$('#img-pool').append('<img src="'+image_set[i]+'" onclick="delImg('+i+')" title="localimg'+i+'" />');
}

function delImg(id)
{
	if(confirm('确认删除这张图片吗？')){
		image_set[id]='';
		while(image_set.length>0 && image_set[image_set.length-1]=='')
			image_set.pop();
		updateImgPool();
	}
}