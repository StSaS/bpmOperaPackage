define("UsrOperas21Page", ["ProcessModuleUtilities"], function(ProcessModuleUtilities) {
	return {
		entitySchemaName: "UsrOperas2",
		messages: {
			 
			"NewUserDetail": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE 
			}
		}, 
		attributes: {
			"maxNumberOfProgramm": {
				dataValueType: Terrasoft.DataValueType.INTEGER,
				value: 5 
			},
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "UsrOperas2File",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "UsrOperas2"
				}
			},
			"UsrSchema2Detail6521e86e": {
				"schemaName": "UsrSchema2Detail",
				"entitySchemaName": "UsrPerformance",
				"filter": {
					"detailColumn": "UsrOpera",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			init : function() {
				this.callParent(arguments);
				this.Terrasoft.SysSettings.querySysSettingsItem("maxNumberOfProgramm",
														function(value) {
															this.set("maxNumberOfProgramm", value);
															
															//debugger;
															}, this);
				
				
				//this.sandbox.registerMessages(this.messages);
				
				this.sandbox.subscribe("NewUserDetail", this.onNewUserDetail, this);
				
													
			},
			onNewUserDetail: function() {
				//debugger;
				 this.updateDetails();
				 // this.updateDetail({detail: "UsrSchema3Detail5184daf4"});
			},
			
			save : function(parameter) {
				
			
				var active = this.$UsrActive;
				var period = this.$UsrPeriod.value;
				
				//debugger;
				if ( active === true && period === "6f59cd1d-23e5-4574-992b-1380f212193c") {
				//if (period === "6f59cd1d-23e5-4574-992b-1380f212193c") {
							if (parameter === true) { 
								this.callParent(arguments);
							} else {
							
								this.checkMaxNumberOfProgramm();
							}
				} else {
					this.callParent(arguments);
				}
				
				
				//debugger;
				
			},
			checkMaxNumberOfProgramm : function() {
				
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "UsrOperas2"
				});
				
				esq.addColumn("UsrPeriod", "UsrActive");
			
				var esqFirstFilter = esq.createColumnFilterWithParameter(
													Terrasoft.ComparisonType.EQUAL, 
														"UsrPeriod", 
														"6F59CD1D-23E5-4574-992B-1380F212193C"); //Ежедневно
				
				var esqSecondFilter = esq.createColumnFilterWithParameter(
													Terrasoft.ComparisonType.EQUAL, 
														"UsrActive", 
														1);										
				
				esq.filters.add("firstFilter", esqFirstFilter);
				esq.filters.add("secondFilter", esqSecondFilter);
				
				esq.getEntityCollection(function(result) {
					
					var n =  result.collection.collection.length;
					var max = this.get("maxNumberOfProgramm");
					
					if ( n >= max ) {
						//ошибка
						this.showInformationDialog("Нельзя сохранить. Допускается не более " + max + " программ");
						//debugger;
					} else {
						this.save(true);
					}
					
				},this);
				
				
			},
			addRecordsDetail: function()  {
				//debugger;
				var currentId = this.$Id; 
				var period = this.$UsrPeriod.value;
				var periodCode = 0; // 0 - Ежедневно; 1- Еженедельно; 2 - Ежемесячно 
				
				
				switch(period) {
					case "6F59CD1D-23E5-4574-992B-1380F212193C".toLowerCase(): //Ежедневно
						periodCode = 0;
						break;
					case "6EC36EAA-9092-4CAC-9B3B-35330EA6822E".toLowerCase(): //Еженедельно
						periodCode = 1;
						break;
					case "13F74B20-75A0-4F2F-8617-E64265823EBC".toLowerCase(): ///Ежемесячно
						periodCode = 2;
						break;
					default:
						break;
				}
				
				var args = {
					// Имя процесса, который необходимо запустить.
					sysProcessName: "UsrProcessOperaDetail",
					// Объект со значением входящего параметра ContactParameter для процесса CustomProcess.
					parameters: {
						ProcessSchemaParameterID: currentId,
						ProcessSchemaPeriodical: periodCode
					}
				};
				// Запуск пользовательского бизнес-процесса.
				ProcessModuleUtilities.executeProcess(args);
			},
			getActions: function() {
				var parentActions =  this.callParent(arguments);
				
				parentActions.addItem(this.getButtonMenuItem({
					"Visible": true,
					"Caption": {"bindTo": "Resources.Strings.addRecordsDetail"},
					"Enabled": true,
					"Tag": "addRecordsDetail",
					//"Click": {"bindTo": "addRecordsDetail"}
				}));
				
				return parentActions;
			}
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
			{
				"operation": "insert",
				"name": "UsrName17651051-0542-46a7-9750-69f65633dee0",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUP51b31822-b326-4db9-b19f-b98ef9427e97",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCollective",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "INTEGERc4d2b520-90cb-47d3-86f6-e3dab740efad",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrCode",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "LOOKUP0a00b81e-d8da-4b5d-a3eb-692a6c371f49",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrPeriod",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "LOOKUP036f085c-e69c-4f52-9755-101b3d0ab66e",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrResponsible",
					"enabled": true,
					"contentType": 5
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "STRING09fa2753-e698-4696-b0c5-a427042257b1",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 5,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrComment",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "BOOLEANdddb0cc5-8ba9-49f3-895d-087eb7039919",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "UsrActive",
					"enabled": true
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 6
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "UsrNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "UsrSchema2Detail6521e86e",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			}
		]/**SCHEMA_DIFF*/
	};
});
