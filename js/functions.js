function getText(tag)
{
  if (texts[currentLanguage] && texts[currentLanguage][tag])
  {
    return texts[currentLanguage][tag];
  }
  return tag;
}

function setIsMobile()
{
  isMobile = (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function setRequireAuthorization()
{
  requireAuthorization = apiUrl.indexOf("/auth")>-1; 
}

function myParamName()
{
    // https://github.com/enyo/dropzone/issues/901
    return "image";
}

function makeJQueryResistantId(id)
{
	return id.replace("@","--");
}

function printPredictions()
{
	var certainty=false;
	var buffer=Array();
	var vals=Array();
	var taxonIds=[];

	for(var i=0;i<lastResults.predictions.length;i++)
	{
		var s=lastResults.predictions[i];

		taxonIds.push(s.taxon.id);

		if (s.alternate_taxon_ids)
		{
			for(var j=0;j<s.alternate_taxon_ids.length;j++)
			{
				if (s.alternate_taxon_ids[j].indexOf('@NSR')>-1)
				{
					var nsrId = s.alternate_taxon_ids[j].split('@')[0];
					break;
				}
			}
		}

		var gaugeTpl=fetchTemplate('gaugeTpl');
		var resultRowTpl=fetchTemplate('resultRowTpl');
		var nsrTpl=nsrId ? fetchTemplate('nsrLinkTpl').replace(/%taxon_id%/g,nsrId) : "" ;

		buffer.push(
			resultRowTpl
				.replace("%gauge%",gaugeTpl)
				.replace(/%id%/g,i)
				.replace(/%probability%/g,s.probability)
				.replace(/%vernacular_name%/g,'') // filled in taxonLookup()-callback
				.replace(/%taxon_name%/g,s.taxon.name)
				.replace(/%taxon_id%/g,s.taxon.id.replace(/@(.*)/,''))
				.replace("%nsr_link%",nsrTpl)
				.replace(/%lookup_id%/g,makeJQueryResistantId(s.taxon.id))
		);
			
		vals.push(Number(s.probability));

		if (Number(s.probability) > 0.95 && s.taxon_name_id != "OUTLIER") break;
		if (i+1>=maxResults) break
	}

	$("#message").toggle(false);
	$("#results").html(fetchTemplate('resultTableTpl').replace('%body%',buffer.join("\n")));

	for(var i=0;i<taxonIds.length;i++)
	{
		taxonLookup(taxonIds[i]);
	}

    $('#results text').each(function()
    {
		$(this).replaceWith(getText($(this).text()));
    });

	for (var i=0;i<vals.length;i++)
	{
		var a =  newAngles(0,vals[i]);
		colorCircle('gauge-'+i,vals[i],a);
	}
}

function taxonLookup(id) 
{
	$.ajax({
		method: "GET",
		url: taxonIdentUrl,
		data: { id: id }
	})
	.done( function( data )
	{
		var name="";

		if (data.taxa && data.taxa[0] && data.taxa[0]["vernacular_names"])
		{
			if (data.taxa[0]["vernacular_names"][currentLanguage])
			{
				name = data.taxa[0]["vernacular_names"][currentLanguage];
			}
			else
			{
				for (var prop in data.taxa[0]["vernacular_names"][currentLanguage])
				{
					name = prop;
					break;
				}
			}
		}

		var lookupId = makeJQueryResistantId(id);

		if (name.length>0)
		{
			$('#vernacular-' + lookupId).html(name);
		}
		else
		{
			$('#vernacular-' + lookupId).html($('#scientific-' + lookupId).html()).addClass("italic");
			$('#scientific-' + lookupId).remove();
		}
	});
}

function newAngles(probability1,probability2)
{
	if (probability1 > 0.99) probability1=0.99;
	if (probability2 > 0.99) probability2=0.99;

	var angle1 = (probability1 * 2.0 * Math.PI);
	var x1 = Math.cos(angle1);
    var y1 = Math.sin(angle1);

    var angle2 = (probability2 * 2.0 * Math.PI);
    var x2 = Math.cos(angle2);
    var y2 = -Math.sin(angle2);

	var outerRadius = 40.0;
	var innerRadius = 20.0;

	var X1 = (x1 * outerRadius) + outerRadius;
	var Y1 = (y1 * outerRadius) + outerRadius;
        x1 = (x1 * innerRadius) + outerRadius;
        y1 = (y1 * innerRadius) + outerRadius;

	var s1 = (probability2 - probability1) > 0.5 ? 1 : 0;

	var X2 = (x2 * outerRadius) + outerRadius;
	var Y2 = (y2 * outerRadius) + outerRadius;
        x2 = (x2 * innerRadius) + outerRadius;
        y2 = (y2 * innerRadius) + outerRadius;

    return {innerRadius:innerRadius,outerRadius:outerRadius,x1:x1,y1:y1,x2:x2,y2:y2,X1:X1,Y1:Y1,X2:X2,Y2:Y2,s1:s1};
}

var gaugeColors=["#cc0021", "#cc001c", "#cc0018", "#cc0014", "#cc000f", "#cc000b", "#cc0006", "#cc0002", "#cc0200", "#cc0700", "#cc0b00", "#cc1000", "#cc1400", "#cc1800", "#cc1d00", "#cc2100", "#cc2600", "#cc2a00", "#cc2f00", "#cc3300", "#cc3700", "#cc3c00", "#cc4000", "#cc4500", "#cc4900", "#cc4e00", "#cc5200", "#cc5600", "#cc5b00", "#cc5f00", "#cc6400", "#cc6800", "#cc6d00", "#cc7100", "#cc7500", "#cc7a00", "#cc7e00", "#cc8300", "#cc8700", "#cc8c00", "#cc9000", "#cc9400", "#cc9900", "#cc9d00", "#cca200", "#cca600", "#ccab00", "#ccaf00", "#ccb300", "#ccb800", "#ccbc00", "#ccc100", "#ccc500", "#ccca00", "#cacc00", "#c6cc00", "#c1cc00", "#bdcc00", "#b8cc00", "#b4cc00", "#afcc00", "#abcc00", "#a7cc00", "#a2cc00", "#9ecc00", "#99cc00", "#95cc00", "#90cc00", "#8ccc00", "#88cc00", "#83cc00", "#7fcc00", "#7acc00", "#76cc00", "#71cc00", "#6dcc00", "#69cc00", "#64cc00", "#60cc00", "#5bcc00", "#57cc00", "#52cc00", "#4ecc00", "#4acc00", "#45cc00", "#41cc00", "#3ccc00", "#38cc00", "#33cc00", "#2fcc00", "#2bcc00", "#26cc00", "#22cc00", "#1dcc00", "#19cc00", "#14cc00", "#10cc00", "#0ccc00", "#07cc00", "#03cc00", "#00cc02"];

function colorCircle(ele,prob,a)
{
	var ele=$('#'+ele);
	var d = $(ele).attr("d");
	var path = (
		[
  	 		["M",a.X1,a.Y1].join(" "),
			["A",a.outerRadius,a.outerRadius,0,a.s1,0,a.X2,a.Y2].join(" "),
			["L",a.x2,a.y2].join(" "),
			["A",a.innerRadius,a.innerRadius,0,a.s1,1,a.x1,a.y1].join(" "),
			["L",a.X1,a.Y1].join(" ")
		].join(" "));
	$(ele).attr("d",path);
	$(ele).attr("fill",gaugeColors[Math.round(prob*100)]);
}

function clearAll() 
{
    zone.removeAllFiles();
    $('.dropzone .clear').toggle(false);
    $("#results").html("");
    $("#message").toggle(false);
}

function checkCredentials()
{
	if (credentials.user==null || credentials.password==null)
	{
		showAuthorizationDialog();
		return false;
	}
	else
	{
		return true;  	
	}
}

function setCredentials()
{
	credentials.user=$('#auth_username').val();
	credentials.password=$('#auth_password').val();
	zone.options.headers = { "Authorization": "Basic " + btoa(credentials.user + ":" + credentials.password)};
	setLoginLinkToLogout();
	$('#auth_username').val("");
	$('#auth_password').val("");
}

function resetCredentials()
{
	credentials = { user: null, password: null };
}

function doLogin()
{
	apiUrl = apiUrl.replace("/auth","") + "/auth";
	zone.options.url = apiUrl;
	setRequireAuthorization();
	runRequireAuthorization();
	setLoginLinkToLogout();
}

function setLoginLinkToLogout()
{
	$("#login-link").on("click",function() { doLogout() });
	$("#login-link").html("Logout");
}

function doLogout()
{
	apiUrl = apiUrl.replace("/auth","");
	zone.options.url = apiUrl;
	setRequireAuthorization();
	runRequireAuthorization();
	$("#login-link").on("click",function() { doLogin() });
	$("#login-link").html("Login");
    resetCredentials();
}

function runRequireAuthorization()
{
	if (requireAuthorization)
	{
		$('#auth_username, #auth_password').on( "keydown", function(event)
		{
			if (event.which==13)
			{
				$('.ui-button:contains("Login")').click();
			}
		});
		checkCredentials();
	}
}

function showAuthorizationDialog()
{
	$( "#dialog" ).dialog({
	  resizable: false,
	  height: "auto",
	  width: 300,
	  modal: true,
	  position: { my: "center", at: "top+30%", of: window },
	  buttons: {
	    "Login": function() {
	      setCredentials();
	      $( this ).dialog( "close" );
	    },
	    "Cancel": function() {
	      $( this ).dialog( "close" );
	    }
	  }
	});
}
