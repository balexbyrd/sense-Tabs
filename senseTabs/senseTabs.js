//http://fontawesome.io/icons/
//https://github.com/mcgovey/Namespaced-Bootstrap
//http://getbootstrap.com/
//https://github.com/mhamano/Qlik-Sense-Tabs
//
define( [
		"qlik"
		,"jquery"		
		,"./js/properties"
		,"text!./css/scoped-bootstrap.css"
		,"text!./css/style.css"		
],
function ( qlik, $, props, boot, cssContent ) {
	var app = qlik.currApp(this); //App object
	var repeated = 1;	//Rendering repeat count
	var act;
	
	// Bootstrap.js CDN
	$( '<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js">' ).appendTo( 'body' ); // Bootstrap.js CDN
	$( '<style>' ).html( boot ).appendTo( 'head' ); // Adding scoped bootstrap to head		
	$( '<style>' ).html( cssContent ).appendTo( 'head' ); // Adding scopped style to head
	
	// Font Awesome CDN
	if(!$("link[id='FA']").length > 0){
		$( '<link id="FA" rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css">' ).appendTo( 'head' ); // Font Awesome CDN		
	};
	
	// JQUERY CDN
	$( '<script type="text/javascript" src="//code.jquery.com/jquery-3.1.1.min.js">' ).appendTo( 'body' ); // Bootstrap.js CDN
	

	
	//Function to create the new tab content
	function createTabContent(tab_id,object_id,enable_export) {
		var tab_content = '';
		tab_content += 		'<section id="panel-' + tab_id + '-' + object_id + '">';
		tab_content += 			'<main class="panel-content fade in" ><div class="row">';
		if(enable_export) {
			tab_content +=		'<i id="export-' + tab_id + '-' + object_id + '" title="Export to Excel" class="fa fa-file-excel-o pull-right text-success" aria-hidden="true"></i>';
		}
		tab_content += 				'<div id="viz' + tab_id + '-' + object_id + '" class=""></div></div>';
		tab_content += 			'</main>';
		tab_content += 		'</section>';	

		return tab_content;	
	}
	
	// Populate the tab with the Sense object 
	function createObject(tab_id,object_id,layout) {
	  	var next = app.getObject( 'viz' + tab_id + '-' + object_id, eval("layout.props.obj" + tab_id));
		next.then(function(){					
			// required to see the visual - do not remove
			var obHt = $('#'+object_id).height()-48;
			$('#'+object_id+" .qv-object-content-container").css({"height": obHt+"px", width: '100%'});
		})			
	}

	// For export event
	function createExportEvent(tab_id,object_id,layout){
		var object = app.getObject( 'viz' + tab_id + '-' + object_id, eval("layout.props.obj" + tab_id));

		//Add excel download event to the button			  		  
		object.then(function(model) {       
   			var table = new qlik.table(model);  
        	$('#export-' + tab_id + '-' + object_id ).on('click', function(e) {  
		  		e.preventDefault(); 
         		table.exportData({download: true});  
       		})       
		}) 
	}

	return {
		initialProperties : {
			version : 1.0
		},
	  	definition: ( props )
	  	,
		snapshot: {
			canTakeSnapshot: true
		},
		paint: function ($element, layout) {

			$element.empty();
			var html = "";
			var num_of_tabs = layout.props.numTabs;
			var object_id = layout.qInfo.qId; //Get this extension's ID --> !important
			
			// Create scoped bootstrap div
			var $bootstrapStyle = $( '#' + object_id );
			$bootstrapStyle = $( document.createElement( 'div' ) );
			$bootstrapStyle.attr( 'id', object_id  );
			$bootstrapStyle.addClass( 'bootstrap_inside' );
			
			$element.html( $bootstrapStyle );

			// Create tabs
			html += '<ul class="nav nav-tabs nav-justified" role="tablist">';
			for (i=1; i<=num_of_tabs; i++) {				
				
				// Activate first tab
				if(i===1){
					var act = 'class="active"';
				}else{
					var act = '';
				}
				
				html += '<li id="li-for-panel-' + i + '-' +  object_id +'" role="presentation" '+act+'>';
				html +=		'<a href="#panel-' + i + '-' + object_id + '" aria-controls=""panel-' + i + '-' + object_id + '" role="tab" data-toggle="tab" title="'+eval("layout.props.tool" + i)+'" id="tabText-'+i+'">';
				html +=			'<i id="ic'+i+'" class="'+eval("layout.props.icon"+i)+'" aria-hidden="true"></i>&nbsp;&nbsp;'+ eval("layout.props.title" + i);
				html +=		'</a>';
				html +=	'</li>';
			}	    
			html += '</ul>';

			// Create tab contents 
			html += '<article id="panels" class="tab-content">';
			html += 	'<div class="container">';
				for (i=1; i<=num_of_tabs; i++) {
					if(eval("layout.props.obj" + i)) {	
						html += createTabContent(i,object_id,eval("layout.props.export" + i));
						
						if(eval("layout.props.export" + i)) {
							createExportEvent(i,object_id,layout);
						}
					}
				}
			html += 	'</div>';
			html += '</article>';

			$bootstrapStyle.html(html);
			$element.append($bootstrapStyle); //Insert HTML into scoped bootstrap
			
			// Resize to see visual --> !important
			if(repeated==1){
				qlik.resize();
			}
						
			// Initial rendering (no clicks made or on screen resize)
			if(layout.props.obj1 && repeated > 1) {				
				// Hide residual tabs - only showing first tab
				$('#'+object_id+" section[id*="+ object_id + "]:not(#"+object_id+" #panel-1-"+object_id+")").css("display","none");
				for (i=1; i<=num_of_tabs; i++) {					
					// set tab font size
					$('#'+object_id+' #tabText-'+i).css('font-size',layout.props.fontSize1+"px");					
					// remove title icon
					if(!eval("layout.props.showIcon"+i)){
						$('#'+object_id+' #ic'+i).remove();
					}
					// remove export icon
					if(!eval("layout.props.export"+i)){
						$('#'+object_id+' #export-'+i).remove();
					}
				}					
				createObject("1", object_id, layout); // Build initial tab contents 
			}
						
			repeated += 1; // counter --> !important
			
			// On tab click
			$('#'+object_id+' li[id*="' + object_id + '"]').on('click', function (e) {
				// Hides the current tab contents				
				$('#'+object_id+" section[id*="+ object_id + "]").css("display","none");

				var tab_name = e.currentTarget.id; //Get the id element of the new tab
				var tab_id = tab_name.replace("li-for-panel-","").replace("-" + object_id,""); //Get the id of the new tab

				//Display the new panel
				$('#'+object_id+" #panel-" + tab_id + '-' + object_id).css("display","block");
				
				// Build tab contents visual if object ID exists
				if(eval("layout.props.obj" + tab_id)) {					  
					createObject(tab_id,object_id,layout);
				} else {}
			});
		}
	};

} );
