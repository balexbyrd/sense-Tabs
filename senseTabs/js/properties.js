define(["qlik", 'ng!$q'], function ( qlik, $q) {
	//'use strict';

	var app = qlik.currApp(this);


	// ****************************************************************************************
	// Properties Definition
	// ****************************************************************************************


	var getMasterObjectList = function () {

		var defer = $q.defer();

		app.getAppObjectList( 'masterobject', function ( data ) {
			var masterobject = [];
			var sortedData = _.sortBy( data.qAppObjectList.qItems, function ( item ) {
				return item.qData.rank;
			} );
			_.each( sortedData, function ( item ) {
				masterobject.push( {
					value: item.qInfo.qId,
					label: item.qMeta.title
				} );
			} );
			return defer.resolve( masterobject );
		} );

		return defer.promise;
	};


    //Number of Tabs
  	var num_of_tabs = {
		ref : "props.numTabs",
		label	 : "# of Tabs",
		type : "string",
		defaultValue : "3",
		component : "dropdown",
		options: [{
					value: "1",
					label: "1"
				}, {
					value: "2",
					label: "2"
				}, {
					value: "3",
					label: "3"
				}, {
					value: "4",
					label: "4"
				}, {
					value: "5",
					label: "5"
				}
				]
	};

/* =================1==================== */ 
	// OBJECT
  	var obj_for_tab1 = {
		ref : "props.obj1",
		label : "Tab object #1",
		component : "dropdown",
		type : "string",
        options: function () {
			return getMasterObjectList().then( function ( items ) {
				return items;
			} );
		}
	};

	// TAB TITLE
  	var title_for_tab1 = {
		ref : "props.title1",
		label : "Tab title:",
		type : "string",
		defaultValue : "Title - 1"
	};	

	// TAB TITLE FONT SIZE
	var sizeFont_for_tab1 = {
		type: "integer",
		label: "Tab title font size (px):",
		ref: "props.fontSize1",
		expression: "optional",
		defaultValue: 12
	};	
	
	// SHOW ICON
  	var showIcon_for_tab1 = {
		ref : "props.showIcon1",
		label : "Show tab icon?",
		type : "boolean",
		defaultValue : true
	};	
	
	// ICON
  	var icon_for_tab1 = {
		ref : "props.icon1",
		label : "Font Awesome icon",
		type : "string",
		defaultValue : "fa fa-thumbs-o-up"
	};	

	// TOOLTIP
  	var tooltip_for_tab1 = {
		ref : "props.tool1",
		label : "Tooltip text",
		type : "string",
		defaultValue : "I love tabs!"
	};
	
	// EXPORT
  	var export_for_tab1 = {
		ref : "props.export1",
		label : "Export to Excel?",
		type : "boolean",
		defaultValue : true
	};
	
	
	
/* ====================================== */ 	
/* =================2==================== */ 
	// OBJECT
  	var obj_for_tab2 = {
		ref : "props.obj2",
		label : "Tab object #2",
		component : "dropdown",
		type : "string",
        options: function () {
			return getMasterObjectList().then( function ( items ) {
				return items;
			} );
		}
	};

	// TITLE
  	var title_for_tab2 = {
		ref : "props.title2",
		label : "Title:",
		type : "string",
		defaultValue : "Title - 2"
	};	
	
	// SHOW ICON
  	var showIcon_for_tab2 = {
		ref : "props.showIcon2",
		label : "Show tab icon?",
		type : "boolean",
		defaultValue : true
	};	
	
	// ICON
  	var icon_for_tab2 = {
		ref : "props.icon2",
		label : "Font Awesome icon",
		type : "string",
		defaultValue : "fa fa-thumbs-o-up"
	};	
	
	// TOOLTIP
  	var tooltip_for_tab2 = {
		ref : "props.tool2",
		label : "Tooltip text",
		type : "string",
		defaultValue : "I love tabs!"
	};	
	// EXPORT
  	var export_for_tab2 = {
		ref : "props.export2",
		label : "Export to Excel?",
		type : "boolean",
		defaultValue : true
	};
	
/* ====================================== */ 	
/* =================3==================== */ 
	// OBJECT
  	var obj_for_tab3 = {
		ref : "props.obj3",
		label : "Tab object #3",
		component : "dropdown",
		type : "string",
        options: function () {
			return getMasterObjectList().then( function ( items ) {
				return items;
			} );
		}
	};

	// TITLE
  	var title_for_tab3 = {
		ref : "props.title3",
		label : "Title:",
		type : "string",
		defaultValue : "Title - 3"
	};	
	
	// SHOW ICON
  	var showIcon_for_tab3 = {
		ref : "props.showIcon3",
		label : "Show tab icon?",
		type : "boolean",
		defaultValue : true
	};

	// TOOLTIP
  	var tooltip_for_tab3 = {
		ref : "props.tool3",
		label : "Tooltip text",
		type : "string",
		defaultValue : "I love tabs!"
	};
	
	// ICON
  	var icon_for_tab3 = {
		ref : "props.icon3",
		label : "Font Awesome icon",
		type : "string",
		defaultValue : "fa fa-thumbs-o-up"
	};	
	
	// EXPORT
  	var export_for_tab3 = {
		ref : "props.export3",
		label : "Export to Excel?",
		type : "boolean",
		defaultValue : true
	};
	
/* ====================================== */ 	
/* =================4==================== */ 
	// OBJECT
  	var obj_for_tab4 = {
		ref : "props.obj4",
		label : "Tab object #4",
		component : "dropdown",
		type : "string",
        options: function () {
			return getMasterObjectList().then( function ( items ) {
				return items;
			} );
		}
	};

	// TITLE
  	var title_for_tab4 = {
		ref : "props.title4",
		label : "Title:",
		type : "string",
		defaultValue : "Title - 4"
	};	
	
	// SHOW ICON
  	var showIcon_for_tab4 = {
		ref : "props.showIcon4",
		label : "Show tab icon?",
		type : "boolean",
		defaultValue : true
	};

	// TOOLTIP
  	var tooltip_for_tab4 = {
		ref : "props.tool4",
		label : "Tooltip text",
		type : "string",
		defaultValue : "I love tabs!"
	};
	
	// ICON
  	var icon_for_tab4 = {
		ref : "props.icon4",
		label : "Font Awesome icon",
		type : "string",
		defaultValue : "fa fa-thumbs-o-up"
	};	
	
	// EXPORT
  	var export_for_tab4 = {
		ref : "props.export4",
		label : "Export to Excel?",
		type : "boolean",
		defaultValue : true
	};
	
/* ====================================== */ 	
/* =================5==================== */ 
	// OBJECT
  	var obj_for_tab5 = {
		ref : "props.obj5",
		label	 : "Tab object #5",
		component : "dropdown",
		type : "string",
        options: function () {
			return getMasterObjectList().then( function ( items ) {
				return items;
			} );
		}
	};

	// TITLE
  	var title_for_tab5 = {
		ref : "props.title5",
		label: "Title:",
		type : "string",
		defaultValue : "Title - 5"
	};	
	
	// SHOW ICON
  	var showIcon_for_tab5 = {
		ref : "props.showIcon5",
		label : "Show tab icon?",
		type : "boolean",
		defaultValue : true
	};

	// TOOLTIP
  	var tooltip_for_tab5 = {
		ref : "props.tool5",
		label : "Tooltip text",
		type : "string",
		defaultValue : "I love tabs!"
	};
	
	// ICON
  	var icon_for_tab5 = {
		ref : "props.icon5",
		label : "Font Awesome icon",
		type : "string",
		defaultValue : "fa fa-thumbs-o-up"
	};	
	
	// EXPORT
  	var export_for_tab5 = {
		ref : "props.export5",
		label : "Export to Excel?",
		type : "boolean",
		defaultValue : true
	};
	
/* ====================================== */ 
	
	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************
	// Settings -Properties 
	var myCustomSection = {
		component : "expandable-items",
		label : "Config",
		items : {
			header1 : {
				type : "items",
				label : "General Settings",
				items : {
					num_of_tabs : num_of_tabs,
					sizeFont_for_tab1 : sizeFont_for_tab1				
				}
			}			
		}
	};
	var myCustomSection2 = {
		component : "expandable-items",
		label : "Tab Properties",
		items : {
			header1 : {
				type : "items",
				label : "Tab #1",
				items : {
					obj_for_tab1 : obj_for_tab1,
					title_for_tab1 : title_for_tab1,
					tooltip_for_tab1 : tooltip_for_tab1,
					export_for_tab1 : export_for_tab1,
					showIcon_for_tab1 : showIcon_for_tab1,
					icon_for_tab1 : icon_for_tab1				
				}
			},
			header2 : {
				type : "items",
				label : "Tab #2",
				items : {
					obj_for_tab2 : obj_for_tab2,
					title_for_tab2 : title_for_tab2,
					tooltip_for_tab2 : tooltip_for_tab2,
					export_for_tab2 : export_for_tab2,
					showIcon_for_tab2 : showIcon_for_tab2,
					icon_for_tab2 : icon_for_tab2					
				}
			},
			header3 : {
				type : "items",
				label : "Tab #3",
				items : {
					obj_for_tab3 : obj_for_tab3,
					title_for_tab3 : title_for_tab3,
					tooltip_for_tab3 : tooltip_for_tab3,					
					export_for_tab3 : export_for_tab3,
					showIcon_for_tab3 : showIcon_for_tab3,
					icon_for_tab3 : icon_for_tab3					
				}
			},
			header4 : {
				type : "items",
				label : "Tab #4",
				items : {									
					obj_for_tab4 : obj_for_tab4,
					title_for_tab4 : title_for_tab4,
					tooltip_for_tab4 : tooltip_for_tab4,					
					export_for_tab4 : export_for_tab4,
					showIcon_for_tab4 : showIcon_for_tab4,
					icon_for_tab4 : icon_for_tab4				
				}
			},
			header5 : {
				type : "items",
				label : "Tab #5",
				items : {
					obj_for_tab5 : obj_for_tab5,
					title_for_tab5 : title_for_tab5,
					tooltip_for_tab5 : tooltip_for_tab5,					
					export_for_tab5 : export_for_tab5,
					showIcon_for_tab5 : showIcon_for_tab5,
					icon_for_tab5 : icon_for_tab5					
				}
			}			
		}
	};

	//Return values
	return {
		type : "items",
		component : "accordion",
		items : {
			customSection : myCustomSection,
			customSection2 : myCustomSection2
		}
	};
});
