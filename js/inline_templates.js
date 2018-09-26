/*
	add:
	<link rel="stylesheet" type="text/css" media="screen" title="default" href="css/inline_templates.css" />
	<script type="text/javascript" src="js/inline_templates.js"></script>

	inline template format:

	<div class="inline-templates" id="exampleTpl">
		<b>template content</b>
	</div>

	call acquireInlineTemplates(); on page init
	
	call fetchTemplate( 'exampleTpl' ); to fetch template
	
	please be aware that acquireInlineTemplates() uses jQuery's
	html() function, which in turn uses the native innerHtml()
	function, which does not necessarily returns the literal
	content of an element: IE sometimes adds extra quotes, FF
	converts html-attributes to lowercase. be sure to take this
	into account when rendering your template, for instance by
	using (the slower)
		.replace(/%TAG%/i, 'value')
	rather than the regular
		.replace('%TAG%', 'value') 
	when appropriate.
	
	you can enclose the actual template with <!-- and -->; these
	wil be removed automatically.

	it seems that some broswers (FF) remove at least some tags
	(table, tr, td) of incomplete html-structures when reading 
	the template. to avoid, use fake html tags with square brackets
	and give the inline-templates div the attribute 'fake-html="1"'.

*/


var inline_templates=Array();

function acquireInlineTemplates()
{
	$( '.inline-templates' ).each(function()
	{
		var content=$(this).html().trim();
		
		var cStart='<!--';
		var cEnd='-->';

		if (content.indexOf(cStart)===0 && content.substring(content.length-cEnd.length)==cEnd)
		{
			content=content.substring(cStart.length,content.length-cEnd.length);
		}
		
		if ($(this).attr('fake-html')==true)
		{
			content=renderFakeHtml( $(this).html() );
		}
		
		content=content.trim();
		inline_templates.push({id:$(this).attr('id'),tpl:content,use:0});
	});
}

function fetchTemplate( name )
{
	var template="";

	$.each(inline_templates, function( index, value )
	{
		if( value && value.id==name )
		{
			template=value.tpl;
			inline_templates[index].use++;
		}
	});

	return template;
}

function renderFakeHtml( content )
{
	return content.replace(/\[(td|tr|table|ul|li)\]/ig,"<"+"$1"+">").replace(/\[\/(td|tr|table|ul|li)\]/ig,"</"+"$1"+">");
}
